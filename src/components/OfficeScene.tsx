"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { sound } from "@/lib/soundEffects";
import { Language, translations } from "@/lib/translations";

interface OfficeSceneProps {
  onSelectObject: (objectId: string) => void;
  hoveredObject: string | null;
  setHoveredObject: (name: string | null) => void;
  onLoaded?: () => void;
  onProgress?: (percent: number) => void;
  isModalOpen?: boolean;
  language: Language;
}

export default function OfficeScene({
  onSelectObject,
  setHoveredObject,
  onLoaded,
  onProgress,
  isModalOpen = false,
  language,
}: OfficeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stable callback refs to prevent Three.js scene remounting
  const languageRef = useRef(language);
  languageRef.current = language;
  const onSelectRef = useRef(onSelectObject);
  onSelectRef.current = onSelectObject;

  const onHoverRef = useRef(setHoveredObject);
  onHoverRef.current = setHoveredObject;

  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const isModalOpenRef = useRef(isModalOpen);
  isModalOpenRef.current = isModalOpen;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#2e2620");

    let width = container.clientWidth;
    let height = container.clientHeight;
    let aspect = width / height;

    const camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 50);

    // Dynamic Camera Framing for Mobile / Tablet / Desktop
    const updateCameraFraming = (cam: THREE.PerspectiveCamera, w: number, h: number) => {
      const asp = w / h;
      cam.aspect = asp;

      if (asp < 0.65) {
        // Tall smartphone (e.g. iPhone 390x844, Android 360x780)
        cam.fov = 34;
        cam.position.set(0.4, 0.2, 14.5);
      } else if (asp < 1.0) {
        // Tablet portrait or squarish foldable
        cam.fov = 32;
        cam.position.set(0.2, 0.15, 11.8);
      } else if (asp < 1.4) {
        // Tablet landscape / small laptop
        cam.fov = 30;
        cam.position.set(0.1, 0.15, 9.2);
      } else {
        // Standard wide desktop
        cam.fov = 30;
        cam.position.set(0, 0.15, 7.8);
      }

      cam.updateProjectionMatrix();
    };

    updateCameraFraming(camera, width, height);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 3. Lighting (Atmospheric Sunlight + Warm Fill)
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff6eb, 1.5);
    sunLight.position.set(-6, 7, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const warmFill = new THREE.DirectionalLight(0xe8b931, 0.5);
    warmFill.position.set(4, 2, 4);
    scene.add(warmFill);

    // 4. Room Geometry: Floor and Back Wall
    const floorGeo = new THREE.PlaneGeometry(30, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f1713,
      roughness: 0.85,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.9;
    floor.receiveShadow = true;
    scene.add(floor);

    const wallGeo = new THREE.PlaneGeometry(30, 20);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x2e2620,
      roughness: 0.95,
      metalness: 0.0,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.z = -1.1;
    wall.receiveShadow = true;
    scene.add(wall);

    // Clickable objects registry
    const clickableObjects: { mesh: THREE.Object3D; id: string; name: string }[] = [];

    // Helper functions for wall textures
    function createCorkboardTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 680;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#9b724c";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let i = 0; i < 20000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#7d5836" : "#b0855d";
        ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
      }

      ctx.strokeStyle = "#5a3a1f";
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, c.width - 14, c.height - 14);

      ctx.fillStyle = "#fffdf7";
      ctx.fillRect(70, 45, 170, 42);
      ctx.fillStyle = "#2e211c";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("Kind words", 92, 75);

      const notes = [
        { x: 70, y: 115, w: 250, h: 210, color: "#fef08a", rot: -0.04, text: "Clarifying specs upfront saved our team 3 weeks of rework!" },
        { x: 380, y: 110, w: 250, h: 210, color: "#bbf7d0", rot: 0.03, text: "Bridges Web and Mobile with pure craftsmanship." },
        { x: 690, y: 115, w: 250, h: 210, color: "#fed7aa", rot: -0.02, text: "High ownership and always eager to learn." },
        { x: 70, y: 390, w: 250, h: 210, color: "#e9d5ff", rot: 0.05, text: "Great eye for micro-interactions & user experience." },
        { x: 380, y: 380, w: 250, h: 210, color: "#bae6fd", rot: -0.03, text: "Zero drama, just resilient code and delivery." },
        { x: 690, y: 390, w: 250, h: 210, color: "#fecdd3", rot: 0.02, text: "Ask First, Code Later mindset is priceless." },
      ];

      notes.forEach((note) => {
        ctx.save();
        ctx.translate(note.x + note.w / 2, note.y + note.h / 2);
        ctx.rotate(note.rot);

        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(-note.w / 2 + 4, -note.h / 2 + 4, note.w, note.h);

        ctx.fillStyle = note.color;
        ctx.fillRect(-note.w / 2, -note.h / 2, note.w, note.h);

        ctx.beginPath();
        ctx.arc(0, -note.h / 2 + 16, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        ctx.fillStyle = "#2d2015";
        ctx.font = "italic 20px cursive, sans-serif";
        const words = note.text.split(" ");
        let line = "";
        let lineY = -note.h / 2 + 65;
        for (const w of words) {
          const test = line + w + " ";
          if (ctx.measureText(test).width > note.w - 32) {
            ctx.fillText(line, -note.w / 2 + 18, lineY);
            line = w + " ";
            lineY += 28;
          } else {
            line = test;
          }
        }
        ctx.fillText(line, -note.w / 2 + 18, lineY);
        ctx.restore();
      });

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createCashPosterTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 720;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#ede8de";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, c.width - 14, c.height - 14);

      ctx.fillStyle = "#111";
      ctx.font = "900 92px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CASH", c.width / 2, 115);

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(35, 135);
      ctx.lineTo(c.width - 35, 135);
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(c.width / 2, 320, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(c.width / 2 - 38, 355);
      ctx.lineTo(c.width / 2 + 38, 355);
      ctx.lineTo(c.width / 2 + 52, 530);
      ctx.lineTo(c.width / 2 - 52, 530);
      ctx.closePath();
      ctx.fill();

      ctx.fillRect(c.width / 2 - 42, 530, 28, 110);
      ctx.fillRect(c.width / 2 + 14, 530, 28, 110);

      ctx.beginPath();
      ctx.roundRect(c.width / 2 - 82, 420, 36, 150, 14);
      ctx.fill();

      ctx.font = "bold 18px monospace";
      ctx.fillText("MAN IN BLACK", c.width / 2, 680);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createPostcardTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 640;
      c.height = 420;
      const ctx = c.getContext("2d")!;

      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, "#f97316");
      grad.addColorStop(0.5, "#ec4899");
      grad.addColorStop(1, "#3b82f6");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fillRect(c.width / 2 - 50, 0, 100, 24);

      ctx.fillStyle = "#1e1b4b";
      ctx.beginPath();
      ctx.moveTo(0, c.height);
      ctx.lineTo(0, 280);
      ctx.lineTo(80, 280);
      ctx.lineTo(110, 175);
      ctx.lineTo(140, 280);
      ctx.lineTo(240, 280);
      ctx.lineTo(270, 130);
      ctx.lineTo(315, 130);
      ctx.lineTo(335, 280);
      ctx.lineTo(430, 280);
      ctx.lineTo(460, 185);
      ctx.lineTo(490, 280);
      ctx.lineTo(c.width, 280);
      ctx.lineTo(c.width, c.height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 46px serif";
      ctx.textAlign = "center";
      ctx.fillText("BANGKOK", c.width / 2, 80);

      ctx.font = "italic 22px cursive";
      ctx.fillText("Greetings from Thailand", c.width / 2, 118);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // 5. Mount Wall Posters & Pinboard
    const posterMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.95),
      new THREE.MeshStandardMaterial({ map: createCashPosterTexture(), roughness: 0.7 })
    );
    posterMesh.position.set(-3.1, 0.45, -1.05);
    posterMesh.castShadow = true;
    posterMesh.receiveShadow = true;
    scene.add(posterMesh);
    clickableObjects.push({ mesh: posterMesh, id: "poster", name: "Inspiration Poster" });

    const corkMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.65, 1.1),
      new THREE.MeshStandardMaterial({ map: createCorkboardTexture(), roughness: 0.85 })
    );
    corkMesh.position.set(-1.6, 0.35, -1.05);
    corkMesh.castShadow = true;
    corkMesh.receiveShadow = true;
    scene.add(corkMesh);
    clickableObjects.push({ mesh: corkMesh, id: "corkboard", name: "Kind Words & Testimonials" });

    const postcardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.48),
      new THREE.MeshStandardMaterial({ map: createPostcardTexture(), roughness: 0.7 })
    );
    postcardMesh.position.set(-0.25, 0.3, -1.05);
    postcardMesh.rotation.z = -0.06;
    postcardMesh.castShadow = true;
    scene.add(postcardMesh);
    clickableObjects.push({ mesh: postcardMesh, id: "postcard", name: "Bangkok Postcard" });

    // 6. Configure GLTF Loader with MeshoptDecoder & Progress Tracker
    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const totalModels = 3;
    let loadedModelsCount = 0;

    const checkAllLoaded = () => {
      loadedModelsCount++;
      const percent = Math.min(100, (loadedModelsCount / totalModels) * 100);
      onProgressRef.current?.(percent);

      if (loadedModelsCount >= totalModels) {
        setTimeout(() => {
          onLoadedRef.current?.();
        }, 300);
      }
    };

    // 7. Load Yellow Bookshelf
    gltfLoader.load(
      "/models/bookshelf.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1.9, -1.9, -0.4);
        model.scale.set(1.42, 1.42, 1.42);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const name = child.name.toLowerCase();
            if (name.includes("phone")) {
              clickableObjects.push({ mesh: child, id: "phone", name: "Vintage Phone / Contact" });
            } else if (name.includes("globe")) {
              clickableObjects.push({ mesh: child, id: "globe", name: "World Globe / Travels" });
            } else if (name.includes("chess")) {
              clickableObjects.push({ mesh: child, id: "chess", name: "Chess Board / Strategy" });
            } else if (name.includes("llama")) {
              clickableObjects.push({ mesh: child, id: "llama", name: "Llama Figurine" });
            } else if (name.includes("diploma")) {
              clickableObjects.push({ mesh: child, id: "diploma", name: "Degree & Certifications" });
            }
          }
        });

        scene.add(model);
        clickableObjects.push({ mesh: model, id: "bookshelf", name: "Case Studies Bookshelf" });
        checkAllLoaded();
      },
      undefined,
      (err) => {
        console.error("Error loading bookshelf.glb:", err);
        checkAllLoaded();
      }
    );

    // 8. Load Wall Shelf with Plant
    gltfLoader.load(
      "/models/wall-shelf.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(-2.1, 1.05, -0.8);
        model.scale.set(1.15, 1.15, 1.15);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        clickableObjects.push({ mesh: model, id: "plant", name: "Hanging Pothos Plant" });
        checkAllLoaded();
      },
      undefined,
      (err) => {
        console.error("Error loading wall-shelf.glb:", err);
        checkAllLoaded();
      }
    );

    // 9. Load Sitting Cat (Meshopt compressed)
    gltfLoader.load(
      "/models/cat.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(-0.6, -1.9, 0.4);
        model.scale.set(1.2, 1.2, 1.2);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        clickableObjects.push({ mesh: model, id: "cat", name: "Zuko the Office Cat" });
        checkAllLoaded();
      },
      undefined,
      (err) => {
        console.error("Error loading cat.glb:", err);
        checkAllLoaded();
      }
    );

    // 10. Mouse Interaction & Raycasting (No flicker)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetCameraX = 0;
    let targetCameraY = 0.15;
    let currentHoveredName: string | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      // Skip raycasting calculations if modal is open
      if (isModalOpenRef.current) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetCameraX = mouse.x * 0.25;
      targetCameraY = 0.15 + mouse.y * 0.15;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = clickableObjects.map((o) => o.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let matched = clickableObjects.find(
          (o) => o.mesh === hit || o.mesh.children.includes(hit)
        );
        if (!matched) {
          let parent = hit.parent;
          while (parent && !matched) {
            matched = clickableObjects.find((o) => o.mesh === parent);
            parent = parent.parent;
          }
        }

        if (matched) {
          if (currentHoveredName !== matched.id) {
            currentHoveredName = matched.id;
            sound.playHover();
            const localized = translations[languageRef.current]?.objects[matched.id as keyof typeof translations["en"]["objects"]] || matched.name;
            onHoverRef.current(localized);
          }
          container.style.cursor = "pointer";
          return;
        }
      }

      if (currentHoveredName !== null) {
        currentHoveredName = null;
        onHoverRef.current(null);
      }
      container.style.cursor = "default";
    };

    const handleClick = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = clickableObjects.map((o) => o.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let matched = clickableObjects.find(
          (o) => o.mesh === hit || o.mesh.children.includes(hit)
        );
        if (!matched) {
          let parent = hit.parent;
          while (parent && !matched) {
            matched = clickableObjects.find((o) => o.mesh === parent);
            parent = parent.parent;
          }
        }
        if (matched) {
          sound.playObjectSound(matched.id);
          onSelectRef.current(matched.id);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    // 11. Window Resize with Dynamic Camera Framing
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      updateCameraFraming(camera, width, height);
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 12. Main Animation Loop (Throttled when modal is open)
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Damp camera position towards mouse parallax target
      if (!isModalOpenRef.current) {
        camera.position.x += (targetCameraX - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;
        camera.lookAt(0, -0.15, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 13. Cleanup
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
}
