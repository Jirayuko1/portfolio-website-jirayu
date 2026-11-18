"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
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

  // Stable callback refs
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

  const languageRef = useRef(language);
  languageRef.current = language;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ede4d4"); // Warm cream wall

    let width = container.clientWidth;
    let height = container.clientHeight;
    let aspect = width / height;

    const camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 50);

    // Dynamic Camera Framing ensuring all wall art and desk items fit comfortably
    const updateCameraFraming = (cam: THREE.PerspectiveCamera, w: number, h: number) => {
      const asp = w / h;
      cam.aspect = asp;

      if (asp < 0.65) {
        // Tall smartphone (iPhone portrait)
        cam.fov = 40;
        cam.position.set(0.05, 0.35, 8.4);
      } else if (asp < 1.0) {
        // Tablet portrait
        cam.fov = 37;
        cam.position.set(0.0, 0.3, 7.2);
      } else if (asp < 1.4) {
        // Tablet landscape / small laptop
        cam.fov = 35;
        cam.position.set(0.0, 0.25, 6.4);
      } else {
        // Standard Desktop: Centered view with ample space above wall art
        cam.fov = 34;
        cam.position.set(0.0, 0.22, 5.8);
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.35);
    sunLight.position.set(-3.2, 5.2, 4.0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 18;
    sunLight.shadow.camera.left = -4;
    sunLight.shadow.camera.right = 4;
    sunLight.shadow.camera.top = 4;
    sunLight.shadow.camera.bottom = -4;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Desk Lamp SpotLight (Interactive toggle)
    let lampIsOn = true;
    const lampLight = new THREE.SpotLight(0xffeedd, 3.2, 5.0, Math.PI / 4, 0.45, 1.2);
    lampLight.position.set(-1.75, 0.1, 0.1);
    lampLight.target.position.set(-1.1, -0.75, 0.3);
    scene.add(lampLight);
    scene.add(lampLight.target);

    // Clickable interactive registry
    const clickableObjects: { mesh: THREE.Object3D; id: string; name: string }[] = [];

    // Helper: Canvas Textures for Art and Screens
    function createGreenArtTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 640;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#1e3a1e";
      ctx.fillRect(0, 0, c.width, c.height);

      const colors = ["#2d5a27", "#3f7a36", "#529845", "#70b85d", "#142814", "#8ed476"];
      for (let i = 0; i < 650; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        const x = Math.random() * c.width;
        const y = Math.random() * c.height;
        const r = 8 + Math.random() * 26;
        ctx.ellipse(x, y, r, r * 0.45, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createYellowVaseTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 640;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#eab308";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#ca8a04" : "#facc15";
        ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 40, 18);
      }

      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.ellipse(c.width / 2, 460, 55, 75, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#4d7c0f";
      ctx.lineWidth = 4;
      for (let j = 0; j < 14; j++) {
        ctx.beginPath();
        ctx.moveTo(c.width / 2, 430);
        ctx.quadraticCurveTo(
          c.width / 2 + (Math.random() - 0.5) * 80,
          320,
          c.width / 2 + (Math.random() - 0.5) * 160,
          220 + Math.random() * 80
        );
        ctx.stroke();
      }

      for (let k = 0; k < 45; k++) {
        const fx = c.width / 2 + (Math.random() - 0.5) * 180;
        const fy = 200 + Math.random() * 160;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(fx, fy, 9 + Math.random() * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(fx, fy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createLaptopScreenTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 640;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#27272a";
      ctx.fillRect(0, 0, c.width, 36);

      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(20, 18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(38, 18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(56, 18, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#18181b";
      ctx.fillRect(80, 6, 170, 30);
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "14px monospace";
      ctx.fillText("JirayuWorkspace.tsx", 95, 26);

      const codeLines = [
        { text: "import { FullStack, Mobile } from '@jirayu/core';", color: "#c084fc" },
        { text: "// Mindset: Ask First, Code Later", color: "#6b7280" },
        { text: "export async function deliverProject(requirements) {", color: "#38bdf8" },
        { text: "  const clarified = await interviewStakeholders(requirements);", color: "#facc15" },
        { text: "  if (!clarified.isClean) {", color: "#f43f5e" },
        { text: "    return refactorSpecifications(clarified); // Save 3 weeks", color: "#4ade80" },
        { text: "  }", color: "#f43f5e" },
        { text: "  const architecture = {", color: "#38bdf8" },
        { text: "    mobile: 'React Native + Offline SQLite Sync',", color: "#fb923c" },
        { text: "    web: 'Next.js 16 + TypeScript + Tailwind',", color: "#fb923c" },
        { text: "    performance: '60fps + Zero Slop',", color: "#a3e635" },
        { text: "  };", color: "#38bdf8" },
        { text: "  return shipWithPride(architecture);", color: "#38bdf8" },
        { text: "}", color: "#38bdf8" },
      ];

      let yPos = 80;
      codeLines.forEach((line, index) => {
        ctx.fillStyle = "#52525b";
        ctx.font = "15px monospace";
        ctx.fillText(String(index + 1).padStart(2, "0"), 25, yPos);

        ctx.fillStyle = line.color;
        ctx.font = "16px monospace";
        ctx.fillText(line.text, 65, yPos);
        yPos += 34;
      });

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    function createKeyboardTexture(): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext("2d")!;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, c.width, c.height);

      const rows = 5;
      const cols = 14;
      const kw = c.width / cols - 4;
      const kh = c.height / rows - 4;

      const pastelKeyColors = ["#fed7aa", "#bbf7d0", "#bae6fd", "#e9d5ff", "#fef08a", "#fbcfe8", "#ffffff"];

      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          const color = pastelKeyColors[(r * cols + k) % pastelKeyColors.length];
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(k * (kw + 4) + 2, r * (kh + 4) + 2, kw, kh, 3);
          ctx.fill();
        }
      }

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // 4. Room Wall & Desk
    // Back Wall
    const wallGeo = new THREE.PlaneGeometry(16, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xede4d4,
      roughness: 0.95,
      metalness: 0.0,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.z = -1.3;
    wall.receiveShadow = true;
    scene.add(wall);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(16, 10);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f1814,
      roughness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Main Desk with Black Tablecloth
    const deskGroup = new THREE.Group();
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.12, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85, metalness: 0.05 })
    );
    deskTop.position.set(0, -0.78, 0.2);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // Black drape front
    const drapeFront = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 1.25, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.9 })
    );
    drapeFront.position.set(0, -1.40, 1.25);
    drapeFront.castShadow = true;
    drapeFront.receiveShadow = true;
    deskGroup.add(drapeFront);

    scene.add(deskGroup);

    // 5. Wall Artworks (Positioned comfortably below screen top)
    // 5.1 Green Foliage Painting (Hard & Soft Skills)
    const greenArt = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.72, 0.04),
      new THREE.MeshStandardMaterial({ map: createGreenArtTexture(), roughness: 0.7 })
    );
    greenArt.position.set(-0.5, 1.05, -1.27);
    greenArt.castShadow = true;
    greenArt.receiveShadow = true;
    scene.add(greenArt);
    clickableObjects.push({ mesh: greenArt, id: "green_art", name: "Skills Matrix (Green Canvas)" });

    // 5.2 Yellow Flower Vase Painting (Contact & Bio)
    const yellowArt = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.76, 0.04),
      new THREE.MeshStandardMaterial({ map: createYellowVaseTexture(), roughness: 0.7 })
    );
    yellowArt.position.set(0.45, 1.12, -1.27);
    yellowArt.castShadow = true;
    yellowArt.receiveShadow = true;
    scene.add(yellowArt);
    clickableObjects.push({ mesh: yellowArt, id: "yellow_vase", name: "Contact & Bio (Yellow Vase)" });

    // 5.3 Wall Power Socket & Post-It Note
    const socketGroup = new THREE.Group();
    const socketPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.2, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
    );
    socketPlate.position.set(0.18, -0.05, -1.28);
    socketGroup.add(socketPlate);

    const postitMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8 })
    );
    postitMesh.position.set(-0.06, -0.03, -1.27);
    postitMesh.rotation.z = -0.04;
    socketGroup.add(postitMesh);
    scene.add(socketGroup);
    clickableObjects.push({ mesh: postitMesh, id: "postit", name: "Sticky Note (Rule #1)" });

    // 5.4 Collage of Aesthetic Cards on Wall (Red, Green, Blue Clusters)
    // Red Cluster (Top Right, work life)
    const cardsRedGroup = new THREE.Group();
    const redCardCoords = [
      { x: 1.25, y: 1.24, w: 0.22, h: 0.3, color: 0xfbcfe8 },
      { x: 1.52, y: 1.26, w: 0.22, h: 0.28, color: 0xfecdd3 },
      { x: 1.78, y: 1.3, w: 0.22, h: 0.3, color: 0xdcfce7 },
      { x: 1.52, y: 0.95, w: 0.22, h: 0.3, color: 0xfef08a },
      { x: 1.78, y: 0.98, w: 0.22, h: 0.3, color: 0xfed7aa },
    ];
    redCardCoords.forEach((pos) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(pos.w, pos.h),
        new THREE.MeshStandardMaterial({ color: pos.color, roughness: 0.8 })
      );
      card.position.set(pos.x, pos.y, -1.27);
      cardsRedGroup.add(card);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.013, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4, metalness: 0.3 })
      );
      pin.position.set(pos.x, pos.y + pos.h / 2 - 0.02, -1.25);
      cardsRedGroup.add(pin);
    });
    scene.add(cardsRedGroup);
    clickableObjects.push({ mesh: cardsRedGroup, id: "cards_red", name: "Work Life Snapshots (Red Pinboard)" });

    // Green Cluster (Center Left, pitch)
    const cardsGreenGroup = new THREE.Group();
    const greenCardCoords = [
      { x: 0.95, y: 0.85, w: 0.22, h: 0.3, color: 0xe9d5ff },
      { x: 1.22, y: 0.82, w: 0.24, h: 0.32, color: 0xfef3c7 },
      { x: 0.98, y: 0.52, w: 0.22, h: 0.3, color: 0xdbeafe },
      { x: 1.24, y: 0.48, w: 0.24, h: 0.28, color: 0xffedd5 },
    ];
    greenCardCoords.forEach((pos) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(pos.w, pos.h),
        new THREE.MeshStandardMaterial({ color: pos.color, roughness: 0.8 })
      );
      card.position.set(pos.x, pos.y, -1.27);
      cardsGreenGroup.add(card);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.013, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.4 })
      );
      pin.position.set(pos.x, pos.y + pos.h / 2 - 0.02, -1.25);
      cardsGreenGroup.add(pin);
    });
    scene.add(cardsGreenGroup);
    clickableObjects.push({ mesh: cardsGreenGroup, id: "cards_green", name: "Why Hire Jirayu (Green Pinboard)" });

    // Blue Cluster (Bottom Right, articles)
    const cardsBlueGroup = new THREE.Group();
    const blueCardCoords = [
      { x: 1.5, y: 0.62, w: 0.22, h: 0.3, color: 0xfbcfe8 },
      { x: 1.76, y: 0.65, w: 0.22, h: 0.28, color: 0xdcfce7 },
      { x: 1.76, y: 0.32, w: 0.22, h: 0.3, color: 0xe0e7ff },
    ];
    blueCardCoords.forEach((pos) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(pos.w, pos.h),
        new THREE.MeshStandardMaterial({ color: pos.color, roughness: 0.8 })
      );
      card.position.set(pos.x, pos.y, -1.27);
      cardsBlueGroup.add(card);

      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.013, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 })
      );
      pin.position.set(pos.x, pos.y + pos.h / 2 - 0.02, -1.25);
      cardsBlueGroup.add(pin);
    });
    scene.add(cardsBlueGroup);
    clickableObjects.push({ mesh: cardsBlueGroup, id: "cards_blue", name: "Engineering Articles (Blue Pinboard)" });

    // 6. Desk Items
    // 6.1 White Desk Lamp (Dome/bell shade)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-1.75, -0.72, 0.1);

    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.18, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4, metalness: 0.1 })
    );
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    const lampStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.6, 12),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    );
    lampStem.position.set(0, 0.3, 0);
    lampStem.rotation.z = -0.15;
    lampGroup.add(lampStem);

    // Smooth bell/dome shade
    const lampShade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.17, 0.22, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, side: THREE.DoubleSide })
    );
    lampShade.position.set(0.12, 0.58, 0);
    lampShade.rotation.z = -Math.PI / 3;
    lampShade.castShadow = true;
    lampGroup.add(lampShade);

    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
    const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), bulbMat);
    lampBulb.position.set(0.12, 0.58, 0);
    lampGroup.add(lampBulb);

    scene.add(lampGroup);
    clickableObjects.push({ mesh: lampGroup, id: "lamp", name: "Desk Lamp (Click to Toggle Light)" });

    // 6.2 Knitted Christmas Tree
    const treeGroup = new THREE.Group();
    treeGroup.position.set(-1.8, -0.72, 0.48);

    const treeTrunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 0.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 })
    );
    treeTrunk.position.y = 0.09;
    treeTrunk.castShadow = true;
    treeGroup.add(treeTrunk);

    const greenKnittedMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.95 });
    const tier1 = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.26, 16), greenKnittedMat);
    tier1.position.y = 0.24;
    tier1.castShadow = true;
    treeGroup.add(tier1);

    const tier2 = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.22, 16), greenKnittedMat);
    tier2.position.y = 0.38;
    tier2.castShadow = true;
    treeGroup.add(tier2);

    const tier3 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.18, 16), greenKnittedMat);
    tier3.position.y = 0.51;
    tier3.castShadow = true;
    treeGroup.add(tier3);

    const redBow = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 })
    );
    redBow.position.y = 0.62;
    treeGroup.add(redBow);

    scene.add(treeGroup);
    clickableObjects.push({ mesh: treeGroup, id: "tree", name: "Christmas Tree (Click for Snowfall!)" });

    // 6.3 Laptop & Mechanical Keyboard & Mouse
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.75, -0.72, 0.1);

    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.025, 0.64),
      new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.4, metalness: 0.6 })
    );
    laptopBase.position.y = 0.01;
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.02, -0.31);
    screenGroup.rotation.x = 0.26; // Open angle ~75°

    const lidMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.62, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.4, metalness: 0.6 })
    );
    lidMesh.position.y = 0.31;
    lidMesh.castShadow = true;
    screenGroup.add(lidMesh);

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.91, 0.58),
      new THREE.MeshBasicMaterial({ map: createLaptopScreenTexture() })
    );
    screenMesh.position.set(0, 0.31, 0.01);
    screenGroup.add(screenMesh);

    laptopGroup.add(screenGroup);

    // Mechanical Keyboard
    const keyboardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.03, 0.3),
      new THREE.MeshStandardMaterial({ map: createKeyboardTexture(), roughness: 0.6 })
    );
    keyboardMesh.position.set(0, 0.015, 0.52);
    keyboardMesh.castShadow = true;
    keyboardMesh.receiveShadow = true;
    laptopGroup.add(keyboardMesh);

    // Mousepad & RGB Gaming Mouse
    const mousepad = new THREE.Mesh(
      new THREE.PlaneGeometry(0.72, 0.58),
      new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 })
    );
    mousepad.rotation.x = -Math.PI / 2;
    mousepad.position.set(0.82, 0.005, 0.48);
    mousepad.receiveShadow = true;
    laptopGroup.add(mousepad);

    const mouseMesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.045, 0.085, 8, 12),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3, metalness: 0.2 })
    );
    mouseMesh.rotation.x = Math.PI / 2;
    mouseMesh.position.set(0.82, 0.04, 0.5);
    mouseMesh.castShadow = true;
    laptopGroup.add(mouseMesh);

    const mouseGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.007, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e })
    );
    mouseGlow.rotation.x = Math.PI / 2;
    mouseGlow.position.set(0.82, 0.015, 0.5);
    laptopGroup.add(mouseGlow);

    // White Phone Stand
    const phoneStand = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.26, 0.015),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    );
    phoneStand.position.set(0.48, 0.12, 0.12);
    phoneStand.rotation.x = 0.35;
    phoneStand.castShadow = true;
    laptopGroup.add(phoneStand);

    scene.add(laptopGroup);
    clickableObjects.push({ mesh: laptopGroup, id: "laptop", name: "Laptop (Featured Case Studies)" });

    // 6.4 Smart Speaker
    const speakerGroup = new THREE.Group();
    speakerGroup.position.set(0.25, -0.64, 0.05);

    const speakerBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.26, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4, metalness: 0.3 })
    );
    speakerBody.castShadow = true;
    speakerGroup.add(speakerBody);

    const speakerRim = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.28, 0.01),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 })
    );
    speakerRim.position.z = 0.055;
    speakerGroup.add(speakerRim);

    const ant1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.007, 0.22, 8),
      new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.8 })
    );
    ant1.position.set(-0.1, 0.21, 0);
    ant1.rotation.z = -0.15;
    speakerGroup.add(ant1);

    const ant2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.007, 0.22, 8),
      new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.8 })
    );
    ant2.position.set(0.1, 0.21, 0);
    ant2.rotation.z = 0.15;
    speakerGroup.add(ant2);

    scene.add(speakerGroup);
    clickableObjects.push({ mesh: speakerGroup, id: "speaker", name: "Smart Speaker (Click for Lo-Fi Beats)" });

    // 6.5 Luminous Aquarium with Fern (FIXED: Fish inside tank + Lush arching fern)
    const aquariumGroup = new THREE.Group();
    aquariumGroup.position.set(1.22, -0.42, 0.15);

    const tankWidth = 1.15;
    const tankHeight = 0.68;
    const tankDepth = 0.72;

    // Glass Tank Mesh
    const tankMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.45,
    });
    const tankMesh = new THREE.Mesh(new THREE.BoxGeometry(tankWidth, tankHeight, tankDepth), tankMat);
    aquariumGroup.add(tankMesh);

    // Glowing Water volume
    const waterMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const waterMesh = new THREE.Mesh(
      new THREE.BoxGeometry(tankWidth - 0.04, tankHeight - 0.08, tankDepth - 0.04),
      waterMat
    );
    waterMesh.position.y = -0.02;
    aquariumGroup.add(waterMesh);

    // Pebbles & Terracotta pipe at bottom
    const stoneColors = [0x94a3b8, 0x64748b, 0x475569, 0xd97706, 0xb45309];
    for (let st = 0; st < 12; st++) {
      const stone = new THREE.Mesh(
        new THREE.SphereGeometry(0.05 + Math.random() * 0.03, 8, 8),
        new THREE.MeshStandardMaterial({ color: stoneColors[st % stoneColors.length], roughness: 0.8 })
      );
      stone.position.set(
        (Math.random() - 0.5) * (tankWidth - 0.2),
        -tankHeight / 2 + 0.06,
        (Math.random() - 0.5) * (tankDepth - 0.2)
      );
      stone.scale.set(1.4, 0.7, 1.1);
      aquariumGroup.add(stone);
    }

    const pipeMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.22, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.85, side: THREE.DoubleSide })
    );
    pipeMesh.rotation.z = Math.PI / 2;
    pipeMesh.position.set(-0.25, -tankHeight / 2 + 0.09, 0.05);
    aquariumGroup.add(pipeMesh);

    // 3 Swimming Fish strictly inside local tank space
    const fishList: { mesh: THREE.Group; speed: number; angle: number; baseY: number }[] = [];
    const fishColors = [0xf97316, 0xa855f7, 0x06b6d4];

    for (let f = 0; f < 3; f++) {
      const fishGroup = new THREE.Group();

      // Fish Body (Torpedo/cone)
      const fishBody = new THREE.Mesh(
        new THREE.ConeGeometry(0.028, 0.08, 8),
        new THREE.MeshStandardMaterial({ color: fishColors[f], roughness: 0.3 })
      );
      fishBody.rotation.z = -Math.PI / 2;
      fishGroup.add(fishBody);

      // Tail fin
      const tailGeo = new THREE.BufferGeometry();
      const tailVertices = new Float32Array([
        -0.04, 0, 0,
        -0.08, 0.025, 0,
        -0.08, -0.025, 0,
      ]);
      tailGeo.setAttribute("position", new THREE.BufferAttribute(tailVertices, 3));
      const fishTail = new THREE.Mesh(
        tailGeo,
        new THREE.MeshBasicMaterial({ color: fishColors[f], side: THREE.DoubleSide })
      );
      fishGroup.add(fishTail);

      const baseY = -0.15 + f * 0.1;
      fishGroup.position.set(0, baseY, 0);
      aquariumGroup.add(fishGroup); // Child of aquariumGroup

      fishList.push({
        mesh: fishGroup,
        speed: 0.012 + Math.random() * 0.008,
        angle: (f / 3) * Math.PI * 2,
        baseY: baseY,
      });
    }

    // Lush Fern Plant on Top of Aquarium (Bushy, arching fronds)
    const fernGroup = new THREE.Group();
    fernGroup.position.set(0, tankHeight / 2 + 0.02, 0);

    const fernBase = new THREE.Mesh(
      new THREE.BoxGeometry(tankWidth - 0.15, 0.04, tankDepth - 0.15),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    );
    fernGroup.add(fernBase);

    // Multi-layered arching fern fronds
    const fernColors = [0x166534, 0x15803d, 0x14532d, 0x1e3a1e];
    const totalFronds = 24;

    for (let fr = 0; fr < totalFronds; fr++) {
      const frondGroup = new THREE.Group();
      const fAngle = (fr / totalFronds) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const frondColor = fernColors[fr % fernColors.length];
      const frondMat = new THREE.MeshStandardMaterial({ color: frondColor, side: THREE.DoubleSide, roughness: 0.6 });

      // Build an arching frond with curved segments
      const segCount = 6;
      const frondLength = 0.35 + Math.random() * 0.15;
      const archAngle = 0.5 + Math.random() * 0.4;

      for (let s = 0; s < segCount; s++) {
        const t = s / segCount;
        const width = 0.14 * (1 - t * 0.5);
        const length = frondLength / segCount;

        const leafSeg = new THREE.Mesh(new THREE.PlaneGeometry(width, length), frondMat);
        leafSeg.position.set(0, (s + 0.5) * length * 0.65, -(s * s) * 0.035);
        leafSeg.rotation.x = -t * archAngle;
        frondGroup.add(leafSeg);
      }

      frondGroup.position.set(Math.cos(fAngle) * 0.16, 0.02, Math.sin(fAngle) * 0.16);
      frondGroup.rotation.y = -fAngle;
      fernGroup.add(frondGroup);
    }
    aquariumGroup.add(fernGroup);

    scene.add(aquariumGroup);
    clickableObjects.push({ mesh: aquariumGroup, id: "aquarium", name: "Aquarium (Click to Feed the Fish!)" });

    // 7. Left Floor Plant (Potted Monstera)
    const floorPlantGroup = new THREE.Group();
    floorPlantGroup.position.set(-2.4, -1.8, 0.6);

    const plantPot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.18, 0.45, 16),
      new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.85 })
    );
    plantPot.castShadow = true;
    plantPot.receiveShadow = true;
    floorPlantGroup.add(plantPot);

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
    for (let lp = 0; lp < 8; lp++) {
      const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.55), leafMat);
      const lAngle = (lp / 8) * Math.PI * 2;
      leaf.position.set(Math.cos(lAngle) * 0.22, 0.35 + lp * 0.05, Math.sin(lAngle) * 0.22);
      leaf.rotation.y = -lAngle;
      leaf.rotation.x = 0.6;
      floorPlantGroup.add(leaf);
    }
    scene.add(floorPlantGroup);

    // 8. Snow Particle System
    const snowCount = 280;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowSpeeds = new Float32Array(snowCount);

    for (let s = 0; s < snowCount; s++) {
      snowPositions[s * 3] = (Math.random() - 0.5) * 8;
      snowPositions[s * 3 + 1] = 2.5 + Math.random() * 4;
      snowPositions[s * 3 + 2] = (Math.random() - 0.5) * 4;
      snowSpeeds[s] = 0.01 + Math.random() * 0.02;
    }

    snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.0,
    });
    const snowParticles = new THREE.Points(snowGeo, snowMat);
    scene.add(snowParticles);

    let isSnowing = false;
    let snowTimer: NodeJS.Timeout | null = null;

    const triggerSnowfall = () => {
      isSnowing = true;
      snowMat.opacity = 0.85;
      sound.playSnowChime();

      if (snowTimer) clearTimeout(snowTimer);
      snowTimer = setTimeout(() => {
        isSnowing = false;
        snowMat.opacity = 0.0;
      }, 7000);
    };

    // 9. Fish Food Pellets System
    const foodPellets: { mesh: THREE.Mesh; vy: number }[] = [];
    const feedFish = () => {
      sound.playFishBubble();
      for (let p = 0; p < 4; p++) {
        const pellet = new THREE.Mesh(
          new THREE.SphereGeometry(0.015, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0x92400e })
        );
        pellet.position.set(
          1.22 + (Math.random() - 0.5) * 0.35,
          -0.12,
          0.15 + (Math.random() - 0.5) * 0.25
        );
        scene.add(pellet);
        foodPellets.push({ mesh: pellet, vy: 0.005 + Math.random() * 0.004 });
      }
    };

    // Ready notification
    setTimeout(() => {
      onProgressRef.current?.(100);
      onLoadedRef.current?.();
    }, 200);

    // 10. Mouse Interaction & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetCameraX = 0;
    let targetCameraY = 0.22;
    let currentHoveredId: string | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetCameraX = mouse.x * 0.25;
      targetCameraY = 0.22 + mouse.y * 0.12;

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
          if (currentHoveredId !== matched.id) {
            currentHoveredId = matched.id;
            sound.playHover();
            const localized =
              translations[languageRef.current]?.objects[
                matched.id as keyof typeof translations["en"]["objects"]
              ] || matched.name;
            onHoverRef.current(localized);
          }
          container.style.cursor = "pointer";
          return;
        }
      }

      if (currentHoveredId !== null) {
        currentHoveredId = null;
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
          if (matched.id === "lamp") {
            lampIsOn = !lampIsOn;
            lampLight.intensity = lampIsOn ? 3.2 : 0.0;
            bulbMat.color.setHex(lampIsOn ? 0xfffaed : 0x475569);
            sound.playLampSwitch(lampIsOn);
            return;
          }

          if (matched.id === "tree") {
            triggerSnowfall();
            return;
          }

          if (matched.id === "aquarium") {
            feedFish();
            onSelectRef.current("aquarium");
            return;
          }

          if (matched.id === "speaker") {
            const isPlaying = sound.toggleLofiMusic();
            if (isPlaying) {
              speakerRim.material = new THREE.MeshStandardMaterial({ color: 0x22c55e });
            } else {
              speakerRim.material = new THREE.MeshStandardMaterial({ color: 0xef4444 });
            }
            onSelectRef.current("speaker");
            return;
          }

          sound.playObjectSound(matched.id);
          onSelectRef.current(matched.id);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    // 11. Window Resize
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      updateCameraFraming(camera, width, height);
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 12. Main Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Damping towards target
      if (!isModalOpenRef.current) {
        camera.position.x += (targetCameraX - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;
        camera.lookAt(0, 0.08, 0);
      }

      // Animate Swimming Fish strictly inside local tank bounds
      fishList.forEach((f, idx) => {
        f.angle += f.speed * (idx % 2 === 0 ? 1 : -1);
        f.mesh.position.x = Math.cos(f.angle) * 0.38;
        f.mesh.position.z = Math.sin(f.angle) * 0.20;
        f.mesh.position.y = f.baseY + Math.sin(f.angle * 2.5) * 0.04;
        f.mesh.rotation.y = -f.angle + (idx % 2 === 0 ? Math.PI / 2 : -Math.PI / 2);
      });

      // Animate Falling Snow
      if (isSnowing) {
        const positions = snowGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < snowCount; i++) {
          positions[i * 3 + 1] -= snowSpeeds[i];
          positions[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
          if (positions[i * 3 + 1] < -2.0) {
            positions[i * 3 + 1] = 2.5 + Math.random() * 2;
          }
        }
        snowGeo.attributes.position.needsUpdate = true;
      }

      // Animate Sinking Fish Food
      for (let fp = foodPellets.length - 1; fp >= 0; fp--) {
        const pellet = foodPellets[fp];
        pellet.mesh.position.y -= pellet.vy;
        if (pellet.mesh.position.y < -0.74) {
          scene.remove(pellet.mesh);
          foodPellets.splice(fp, 1);
        }
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
      if (snowTimer) clearTimeout(snowTimer);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
}
