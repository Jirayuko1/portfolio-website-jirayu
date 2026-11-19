"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { sound } from "@/lib/soundEffects";
import { Language, translations } from "@/lib/translations";

interface OfficeSceneProps {
  onSelectObject: (objectId: string) => void;
  onDiscoverObject?: (objectId: string) => void;
  hoveredObject: string | null;
  setHoveredObject: (name: string | null) => void;
  onLoaded?: () => void;
  onProgress?: (percent: number) => void;
  isModalOpen?: boolean;
  activeModal?: string | null;
  language: Language;
  isNightMode?: boolean;
  onCoffeeClick?: () => void;
  triggerFeedFishRef?: React.MutableRefObject<(() => void) | null>;
  triggerSnowfallRef?: React.MutableRefObject<(() => void) | null>;
  triggerToggleLampRef?: React.MutableRefObject<(() => void) | null>;
}

export default function OfficeScene({
  onSelectObject,
  onDiscoverObject,
  setHoveredObject,
  onLoaded,
  onProgress,
  isModalOpen = false,
  activeModal = null,
  language,
  isNightMode = false,
  onCoffeeClick,
  triggerFeedFishRef,
  triggerSnowfallRef,
  triggerToggleLampRef,
}: OfficeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stable callback refs
  const onSelectRef = useRef(onSelectObject);
  onSelectRef.current = onSelectObject;

  const onDiscoverRef = useRef(onDiscoverObject);
  onDiscoverRef.current = onDiscoverObject;

  const onHoverRef = useRef(setHoveredObject);
  onHoverRef.current = setHoveredObject;

  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const isModalOpenRef = useRef(isModalOpen);
  isModalOpenRef.current = isModalOpen;

  const activeModalRef = useRef(activeModal);
  activeModalRef.current = activeModal;

  const isNightModeRef = useRef(isNightMode);
  isNightModeRef.current = isNightMode;

  const onCoffeeClickRef = useRef(onCoffeeClick);
  onCoffeeClickRef.current = onCoffeeClick;

  const languageRef = useRef(language);
  languageRef.current = language;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#baa792"); // Warm cozy sandstone wall

    let width = container.clientWidth;
    let height = container.clientHeight;
    let aspect = width / height;

    const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 50);

    let defaultCameraZ = 4.8;
    let defaultCameraY = 0.08;

    // Dynamic Camera Framing ensuring room is closer and wall canvas has exact clean headroom
    const updateCameraFraming = (cam: THREE.PerspectiveCamera, w: number, h: number) => {
      const asp = w / h;
      cam.aspect = asp;

      if (asp < 0.65) {
        // Mobile Portrait (e.g. iPhone 8 [375x667], iPhone 14/15/16 [390x844], SE)
        // Dynamically compute FOV to guarantee full room width (~4.15m) fits without any clipping
        const targetWidthAtDesk = 4.15;
        const camZ = 7.35;
        const requiredFovRad = 2 * Math.atan((targetWidthAtDesk / (2 * camZ)) / asp);
        const dynamicFov = Math.min(60, Math.max(48, (requiredFovRad * 180) / Math.PI));

        cam.fov = dynamicFov;
        cam.position.set(0.0, 0.08, camZ);
      } else if (asp < 1.0) {
        // Tablet portrait
        cam.fov = 39;
        cam.position.set(0.0, 0.12, 6.0);
      } else if (asp < 1.4) {
        // Tablet landscape / small laptop
        cam.fov = 36;
        cam.position.set(0.0, 0.10, 5.2);
      } else {
        // Standard Desktop: Zoomed closer to desk (~4.8) with canvas art nicely framed with padding
        cam.fov = 35;
        cam.position.set(0.0, 0.08, 4.8);
      }

      defaultCameraZ = cam.position.z;
      defaultCameraY = cam.position.y;
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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.05);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.45);
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

    // Desk Lamp SpotLight (Positioned at lamp head pointing right toward laptop/keyboard)
    let lampIsOn = true;
    const lampLight = new THREE.SpotLight(0xffeedd, 3.4, 5.0, Math.PI / 3.8, 0.45, 1.2);
    lampLight.position.set(-1.10, -0.05, 0.20);
    lampLight.target.position.set(-0.60, -0.74, 0.35);
    scene.add(lampLight);
    scene.add(lampLight.target);

    // Night Mode Glowing Point Lights
    const laptopGlow = new THREE.PointLight(0x60a5fa, 0, 1.8);
    laptopGlow.position.set(-0.55, -0.42, 0.18);
    scene.add(laptopGlow);

    const aquariumGlow = new THREE.PointLight(0x38bdf8, 0, 2.2);
    aquariumGlow.position.set(1.05, -0.45, 0.15);
    scene.add(aquariumGlow);

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

    let laptopCanvas: HTMLCanvasElement | null = null;
    let laptopCtx: CanvasRenderingContext2D | null = null;
    let laptopTexture: THREE.CanvasTexture | null = null;
    let dynamicSnippetIndex = 0;

    const dynamicCodeLines = [
      { text: "// Mindset: Ask First, Code Later", color: "#9ca3af" },
      { text: "const app = await engineer.buildNextGenMobileApp();", color: "#38bdf8" },
      { text: "export function deployResilientSystem() {", color: "#facc15" },
      { text: "  return { uptime: '99.99%', latency: '<40ms' };", color: "#4ade80" },
      { text: "}", color: "#facc15" },
      { text: "console.log('🚀 Ready to ship high-impact software!');", color: "#fb923c" },
      { text: "await syncLocalSQLiteDatabase({ encrypted: true });", color: "#a3e635" },
      { text: "render60fpsSmoothInteractions(userTouch);", color: "#c084fc" },
      { text: "export const passion = 'Infinite';", color: "#f43f5e" },
    ];

    const typeNextCodeSnippet = () => {
      sound.playKeyboardClack();
      if (!laptopCtx || !laptopCanvas || !laptopTexture) return;

      const snippet = dynamicCodeLines[dynamicSnippetIndex % dynamicCodeLines.length];
      dynamicSnippetIndex++;

      const yPos = 80 + ((dynamicSnippetIndex % 14) * 34);
      laptopCtx.fillStyle = "#18181b";
      laptopCtx.fillRect(20, yPos - 22, 980, 32);

      laptopCtx.fillStyle = "#52525b";
      laptopCtx.font = "15px monospace";
      laptopCtx.fillText(String((dynamicSnippetIndex % 99) + 1).padStart(2, "0"), 25, yPos);

      laptopCtx.fillStyle = snippet.color;
      laptopCtx.font = "16px monospace";
      laptopCtx.fillText(snippet.text + " █", 65, yPos);

      laptopTexture.needsUpdate = true;
    };

    function createLaptopScreenTexture(): THREE.CanvasTexture {
      laptopCanvas = document.createElement("canvas");
      laptopCanvas.width = 1024;
      laptopCanvas.height = 640;
      laptopCtx = laptopCanvas.getContext("2d")!;

      laptopCtx.fillStyle = "#18181b";
      laptopCtx.fillRect(0, 0, laptopCanvas.width, laptopCanvas.height);

      laptopCtx.fillStyle = "#27272a";
      laptopCtx.fillRect(0, 0, laptopCanvas.width, 36);

      laptopCtx.fillStyle = "#ef4444";
      laptopCtx.beginPath();
      laptopCtx.arc(20, 18, 6, 0, Math.PI * 2);
      laptopCtx.fill();
      laptopCtx.fillStyle = "#f59e0b";
      laptopCtx.beginPath();
      laptopCtx.arc(38, 18, 6, 0, Math.PI * 2);
      laptopCtx.fill();
      laptopCtx.fillStyle = "#10b981";
      laptopCtx.beginPath();
      laptopCtx.arc(56, 18, 6, 0, Math.PI * 2);
      laptopCtx.fill();

      laptopCtx.fillStyle = "#18181b";
      laptopCtx.fillRect(80, 6, 170, 30);
      laptopCtx.fillStyle = "#a1a1aa";
      laptopCtx.font = "14px monospace";
      laptopCtx.fillText("JirayuWorkspace.tsx", 95, 26);

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
        laptopCtx!.fillStyle = "#52525b";
        laptopCtx!.font = "15px monospace";
        laptopCtx!.fillText(String(index + 1).padStart(2, "0"), 25, yPos);

        laptopCtx!.fillStyle = line.color;
        laptopCtx!.font = "16px monospace";
        laptopCtx!.fillText(line.text, 65, yPos);
        yPos += 34;
      });

      laptopTexture = new THREE.CanvasTexture(laptopCanvas);
      laptopTexture.colorSpace = THREE.SRGBColorSpace;
      laptopTexture.center.set(0.5, 0.5);
      laptopTexture.rotation = Math.PI;
      return laptopTexture;
    }

    // 4. Room Wall & Floor
    // Back Wall
    const wallGeo = new THREE.PlaneGeometry(16, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xbaa792,
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

    // 5. Wall Artworks (Existing Canvas Frames kept as requested)
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

    // 5.2 Portrait Canvas Painting on Wall (Jirayu in Black Shirt - Tarot IX Art)
    const textureLoader = new THREE.TextureLoader();
    const yellowArtMat = new THREE.MeshStandardMaterial({
      roughness: 0.55,
      metalness: 0.05,
    });

    const portraitTexture = textureLoader.load(
      "/images/portrait-tarot.webp?v=5",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        yellowArtMat.map = tex;
        yellowArtMat.needsUpdate = true;
      },
      undefined,
      (err) => console.error("Error loading portrait texture:", err)
    );
    yellowArtMat.map = portraitTexture;

    const yellowArt = new THREE.Mesh(
      new THREE.BoxGeometry(0.56, 0.80, 0.04),
      yellowArtMat
    );
    yellowArt.position.set(0.45, 1.12, -1.27);
    yellowArt.castShadow = true;
    yellowArt.receiveShadow = true;

    // Dark walnut gallery frame around the portrait
    const frameGeo = new THREE.BoxGeometry(0.59, 0.83, 0.036);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1f1713, roughness: 0.85 });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.005;
    yellowArt.add(frameMesh);

    scene.add(yellowArt);
    clickableObjects.push({ mesh: yellowArt, id: "yellow_vase", name: "Portrait & Bio (Jirayu)" });

    // 5.3 Collage of Aesthetic Cards on Wall (Red, Green, Blue Clusters)
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

    // 6. Interactive Systems (Snow, Fish Food)
    // 6.1 Snow Particle System
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
    snowParticles.raycast = () => {}; // Never intercept mouse raycasts
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

    // 6.2 Sinking Fish Food Pellets System
    const foodPellets: { mesh: THREE.Mesh; vy: number }[] = [];
    const feedFish = () => {
      sound.playFishBubble();
      for (let p = 0; p < 4; p++) {
        const pellet = new THREE.Mesh(
          new THREE.SphereGeometry(0.015, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0x92400e })
        );
        pellet.position.set(
          1.05 + (Math.random() - 0.5) * 0.35,
          -0.10,
          0.12 + (Math.random() - 0.5) * 0.25
        );
        scene.add(pellet);
        foodPellets.push({ mesh: pellet, vy: 0.005 + Math.random() * 0.004 });
      }
    };

    // 6.3 Aquarium Group & 3D Animated Fish System
    interface FishAgent {
      mesh: THREE.Object3D;
      speed: number;
      angle: number;
      baseY: number;
      rX: number;
      rZ: number;
      dir: number;
    }
    const fishList: FishAgent[] = [];
    const mixers: THREE.AnimationMixer[] = [];

    const aquariumGroup = new THREE.Group();
    const deskSurfaceY = -0.745;
    aquariumGroup.position.set(1.05, deskSurfaceY, 0.12);
    scene.add(aquariumGroup);

    // 6.4 Ceramic Coffee Mug & Animated Rising Steam Particles
    const coffeeGroup = new THREE.Group();
    // Positioned forward on the desk to the right of the mousepad, completely clear of the aquarium!
    coffeeGroup.position.set(0.57, deskSurfaceY, 0.52);

    // Warm cork coaster
    const coaster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.052, 0.006, 24),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9 })
    );
    coaster.position.y = 0.003;
    coaster.receiveShadow = true;
    coffeeGroup.add(coaster);

    const mugMat = new THREE.MeshStandardMaterial({
      color: 0xede0d4,
      roughness: 0.65,
      metalness: 0.05,
    });
    const mugMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.038, 0.085, 24),
      mugMat
    );
    mugMesh.position.y = 0.0455;
    mugMesh.castShadow = true;
    mugMesh.receiveShadow = true;
    coffeeGroup.add(mugMesh);

    const coffeeLiquid = new THREE.Mesh(
      new THREE.CircleGeometry(0.038, 24),
      new THREE.MeshStandardMaterial({ color: 0x1f1209, roughness: 0.15 })
    );
    coffeeLiquid.rotation.x = -Math.PI / 2;
    coffeeLiquid.position.y = 0.081;
    coffeeGroup.add(coffeeLiquid);

    const handleMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.022, 0.006, 8, 16, Math.PI),
      mugMat
    );
    handleMesh.rotation.z = -Math.PI / 2;
    handleMesh.position.set(0.044, 0.048, 0);
    coffeeGroup.add(handleMesh);

    // Rising Animated Steam Particles (NO raycasting to prevent blocking clicks)
    const steamCount = 18;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamSpeeds = new Float32Array(steamCount);
    const steamPhases = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.035;
      steamPositions[i * 3 + 1] = 0.08 + Math.random() * 0.16;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
      steamSpeeds[i] = 0.0006 + Math.random() * 0.0008;
      steamPhases[i] = Math.random() * Math.PI * 2;
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    steamParticles.raycast = () => {}; // Never intercept mouse raycasts
    coffeeGroup.add(steamParticles);

    scene.add(coffeeGroup);
    // ONLY the mugMesh itself is clickable, perfectly bounded without blocking any other items!
    clickableObjects.push({ mesh: mugMesh, id: "coffee", name: "Coffee Mug (Take a Sip!)" });

    // 7. GLTF 3D Model Loading Helper
    function createNormalizedModel(
      gltfScene: THREE.Group,
      options: {
        targetWidth?: number;
        targetHeight?: number;
        targetDepth?: number;
        rotationX?: number;
        rotationY?: number;
        rotationZ?: number;
        centerOrigin?: boolean;
      }
    ): THREE.Group {
      const wrapper = new THREE.Group();
      const inner = gltfScene;

      if (options.rotationX) inner.rotation.x = options.rotationX;
      if (options.rotationY) inner.rotation.y = options.rotationY;
      if (options.rotationZ) inner.rotation.z = options.rotationZ;

      inner.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(inner);
      const size = new THREE.Vector3();
      box.getSize(size);

      let scale = 1;
      if (options.targetWidth) scale = options.targetWidth / size.x;
      else if (options.targetHeight) scale = options.targetHeight / size.y;
      else if (options.targetDepth) scale = options.targetDepth / size.z;

      inner.scale.set(scale, scale, scale);
      inner.updateMatrixWorld(true);

      const scaledBox = new THREE.Box3().setFromObject(inner);
      const scaledCenter = new THREE.Vector3();
      scaledBox.getCenter(scaledCenter);

      inner.position.x = -scaledCenter.x;
      if (options.centerOrigin) {
        inner.position.y = -scaledCenter.y;
      } else {
        inner.position.y = -scaledBox.min.y;
      }
      inner.position.z = -scaledCenter.z;

      wrapper.add(inner);
      return wrapper;
    }

    // 8. Load All User GLTF Models via LoadingManager
    const loadingManager = new THREE.LoadingManager();
    const loader = new GLTFLoader(loadingManager);

    loadingManager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      const percent = Math.min(100, Math.round((itemsLoaded / itemsTotal) * 100));
      onProgressRef.current?.(percent);
    };

    loadingManager.onLoad = () => {
      onProgressRef.current?.(100);
      onLoadedRef.current?.();
    };

    // Fallback load trigger ensuring smooth experience
    const fallbackTimer = setTimeout(() => {
      onProgressRef.current?.(100);
      onLoadedRef.current?.();
    }, 4500);

    // 8.1 Realistic Wooden Desk Model (Desk.glb)
    loader.load(
      "/models/Desk.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scaleY = 1.35 / size.y;
        // Proportionally scale desk with width ~3.47m and height 1.35m
        model.scale.set(scaleY * 1.3, scaleY, scaleY * 1.25);
        model.updateMatrixWorld(true);
        const scaledBox = new THREE.Box3().setFromObject(model);
        model.position.set(0, -2.1 - scaledBox.min.y, 0.15);
        scene.add(model);
      },
      undefined,
      (err) => console.warn("Desk.glb", err)
    );

    // 8.2 Workstation Laptop (laptop.glb)
    loader.load(
      "/models/laptop.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            const mesh = c as THREE.Mesh;
            // Map IDE code screen texture directly onto laptop's native screen mesh
            if (mesh.material && (mesh.material as THREE.Material).name === "02___Default") {
              mesh.material = new THREE.MeshBasicMaterial({
                map: createLaptopScreenTexture(),
              });
            }
          }
        });
        // Rotated by PI/2 so screen is at back and keyboard is in front
        const laptopModel = createNormalizedModel(gltf.scene, {
          targetWidth: 0.95,
          rotationY: Math.PI / 2,
        });
        laptopModel.position.set(-0.55, deskSurfaceY, 0.05);

        scene.add(laptopModel);
        clickableObjects.push({ mesh: laptopModel, id: "laptop", name: "Laptop (Featured Case Studies)" });
      },
      undefined,
      (err) => console.warn("laptop.glb", err)
    );

    // 8.3 Mechanical Keyboard (mechanical keyboard.glb)
    loader.load(
      "/models/mechanical keyboard.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const keyboardModel = createNormalizedModel(gltf.scene, { targetWidth: 0.82 });
        keyboardModel.position.set(-0.55, deskSurfaceY, 0.45);
        scene.add(keyboardModel);
        clickableObjects.push({ mesh: keyboardModel, id: "keyboard", name: "Mechanical Keyboard (Click to Type Code!)" });
      },
      undefined,
      (err) => console.warn("mechanical keyboard.glb", err)
    );

    // 8.4 Mousepad (Mousepad.glb)
    loader.load(
      "/models/Mousepad.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) c.receiveShadow = true;
        });
        const padModel = createNormalizedModel(gltf.scene, { targetWidth: 0.65 });
        padModel.position.set(0.18, deskSurfaceY, 0.45);
        scene.add(padModel);
      },
      undefined,
      (err) => console.warn("Mousepad.glb", err)
    );

    // 8.5 Computer Mouse (Computer mouse.glb)
    loader.load(
      "/models/Computer mouse.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const mouseModel = createNormalizedModel(gltf.scene, { targetDepth: 0.17 });
        mouseModel.position.set(0.18, deskSurfaceY + 0.003, 0.45);

        // Ambient RGB glow ring under mouse
        const glow = new THREE.Mesh(
          new THREE.TorusGeometry(0.06, 0.006, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0xf43f5e })
        );
        glow.rotation.x = Math.PI / 2;
        glow.position.y = 0.005;
        mouseModel.add(glow);

        scene.add(mouseModel);
      },
      undefined,
      (err) => console.warn("Computer mouse.glb", err)
    );

    // 8.6 Smartphone on Stand (Phone.glb)
    loader.load(
      "/models/Phone.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const phoneStandGroup = new THREE.Group();
        phoneStandGroup.position.set(-0.06, deskSurfaceY, 0.12);

        // White stand base
        const standBase = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.02, 0.14),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
        );
        standBase.position.y = 0.01;
        standBase.castShadow = true;
        phoneStandGroup.add(standBase);

        const standPole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.01, 0.01, 0.16, 12),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
        );
        standPole.position.set(0, 0.09, 0);
        standPole.castShadow = true;
        phoneStandGroup.add(standPole);

        const phoneModel = createNormalizedModel(gltf.scene, { targetHeight: 0.24, rotationX: 0.35 });
        phoneModel.position.set(0, 0.14, 0);
        phoneStandGroup.add(phoneModel);

        scene.add(phoneStandGroup);
        clickableObjects.push({
          mesh: phoneStandGroup,
          id: "phone",
          name: "Smartphone (Mobile Apps & Direct Line)",
        });
      },
      undefined,
      (err) => console.warn("Phone.glb", err)
    );

    // 8.7 Desk Lamp (Desk lamp.glb - Inward from edge, facing right toward center desk)
    loader.load(
      "/models/Desk lamp.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        // Rotated by ~105° so lamp neck and shade face right toward laptop & keyboard
        const lampModel = createNormalizedModel(gltf.scene, {
          targetHeight: 0.85,
          rotationY: Math.PI / 2 + 0.20,
        });
        lampModel.position.set(-1.35, deskSurfaceY, 0.05);

        scene.add(lampModel);
        clickableObjects.push({ mesh: lampModel, id: "lamp", name: "Desk Lamp (Click to Toggle Light)" });
      },
      undefined,
      (err) => console.warn("Desk lamp.glb", err)
    );

    // 8.8 Knitted Christmas Tree (christmas tree.glb - Inward from left edge)
    loader.load(
      "/models/christmas tree.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const treeModel = createNormalizedModel(gltf.scene, { targetHeight: 0.65 });
        treeModel.position.set(-1.45, deskSurfaceY, 0.42);
        scene.add(treeModel);
        clickableObjects.push({ mesh: treeModel, id: "tree", name: "Christmas Tree (Click for Snowfall!)" });
      },
      undefined,
      (err) => console.warn("christmas tree.glb", err)
    );

    // 8.9 New Aquarium Tank (FishTankNew.glb)
    loader.load(
      "/models/FishTankNew.glb?v=2",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            const mesh = c as THREE.Mesh;
            // Ensure Glass material is beautifully translucent
            if (mesh.material && (mesh.material as THREE.Material).name === "Glass") {
              const m = mesh.material as THREE.MeshStandardMaterial;
              m.transparent = true;
              m.opacity = 0.35;
              m.roughness = 0.05;
              m.metalness = 0.1;
            }
          }
        });
        // Rotated by PI/2 so long panoramic side faces forward
        const tankModel = createNormalizedModel(gltf.scene, {
          targetWidth: 1.15,
          rotationY: Math.PI / 2,
        });
        aquariumGroup.add(tankModel);
        clickableObjects.push({ mesh: aquariumGroup, id: "aquarium", name: "Aquarium (Click to Feed the Fish!)" });
      },
      undefined,
      (err) => console.warn("FishTankNew.glb", err)
    );

    // 8.10 3D Animated Fish Models: Betta, Clownfish, Goldfish
    // Betta Fish with Skeletal Swimming Animation
    loader.load(
      "/models/Betta.glb?v=2",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const bettaModel = createNormalizedModel(gltf.scene, { targetDepth: 0.15, centerOrigin: true });
        aquariumGroup.add(bettaModel);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          const clip = gltf.animations.find((a) => a.name.includes("Swimming_Normal")) || gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
          mixers.push(mixer);
        }

        fishList.push({
          mesh: bettaModel,
          speed: 0.010,
          angle: 0.2,
          baseY: 0.42,
          rX: 0.36,
          rZ: 0.16,
          dir: 1,
        });
      },
      undefined,
      (err) => console.warn("Betta.glb", err)
    );

    // Clownfish with Skeletal Swimming Animation
    loader.load(
      "/models/Clownfish.glb?v=2",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const clownModel = createNormalizedModel(gltf.scene, { targetDepth: 0.13, centerOrigin: true });
        aquariumGroup.add(clownModel);

        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          const clip = gltf.animations.find((a) => a.name.includes("Swimming_Normal")) || gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
          mixers.push(mixer);
        }

        fishList.push({
          mesh: clownModel,
          speed: 0.013,
          angle: Math.PI * 0.75,
          baseY: 0.28,
          rX: 0.32,
          rZ: 0.14,
          dir: -1,
        });
      },
      undefined,
      (err) => console.warn("Clownfish.glb", err)
    );

    // Goldfish
    loader.load(
      "/models/Goldfish.glb?v=2",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const goldModel = createNormalizedModel(gltf.scene, { targetDepth: 0.14, centerOrigin: true });
        aquariumGroup.add(goldModel);

        fishList.push({
          mesh: goldModel,
          speed: 0.008,
          angle: Math.PI * 1.4,
          baseY: 0.18,
          rX: 0.30,
          rZ: 0.13,
          dir: 1,
        });
      },
      undefined,
      (err) => console.warn("Goldfish.glb", err)
    );

    // 8.11 Lush Fern on top of Aquarium (Fern.glb)
    loader.load(
      "/models/Fern.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const fernModel = createNormalizedModel(gltf.scene, { targetWidth: 1.12 });
        fernModel.position.set(0, 0.71, 0); // Sits right on top lid of the new Fish Tank
        aquariumGroup.add(fernModel);
      },
      undefined,
      (err) => console.warn("Fern.glb", err)
    );

    // 8.12 Retro Radio / Smart Speaker (Radio.glb - Facing forward towards user)
    loader.load(
      "/models/Radio.glb?v=2",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        // Rotated 180° so the front face with dials and speaker grille faces forward
        const radioModel = createNormalizedModel(gltf.scene, {
          targetWidth: 0.38,
          rotationY: Math.PI,
        });
        radioModel.position.set(0.18, deskSurfaceY, 0.06);

        scene.add(radioModel);
        clickableObjects.push({ mesh: radioModel, id: "speaker", name: "Smart Speaker (Click for Lo-Fi Beats)" });
      },
      undefined,
      (err) => console.warn("Radio.glb", err)
    );

    // 8.13 Large Floor Plant (Monstera Plant.glb)
    loader.load(
      "/models/Monstera Plant.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
        const plantModel = createNormalizedModel(gltf.scene, { targetHeight: 1.25 });
        plantModel.position.set(-1.88, -2.1, 0.65); // Sits gracefully beside desk legs, visible on mobile & desktop
        scene.add(plantModel);
      },
      undefined,
      (err) => console.warn("Monstera Plant.glb", err)
    );

    // 8.14 Wall Power Socket (Wall Socket.glb)
    loader.load(
      "/models/Wall Socket.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            c.receiveShadow = true;
            c.castShadow = true;
          }
        });
        const socketModel = createNormalizedModel(gltf.scene, {
          targetHeight: 0.17,
          rotationY: -Math.PI / 2, // Front faceplate faces forward directly toward camera
        });
        // Positioned neatly lower down above the radio, completely clear of post-it and aquarium!
        socketModel.position.set(0.28, -0.22, -1.26);
        scene.add(socketModel);
      },
      undefined,
      (err) => console.warn("Wall Socket.glb", err)
    );

    // 8.15 Yellow Sticky Note (Yellow Post-it.glb)
    loader.load(
      "/models/Yellow Post-it.glb",
      (gltf) => {
        gltf.scene.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) c.receiveShadow = true;
        });
        const postitModel = createNormalizedModel(gltf.scene, { targetWidth: 0.18, rotationZ: -0.04 });
        // Positioned higher up above laptop/phone to the left, well-spaced with zero overlap!
        postitModel.position.set(-0.24, 0.22, -1.27);
        scene.add(postitModel);
        clickableObjects.push({ mesh: postitModel, id: "postit", name: "Sticky Note (Rule #1)" });
      },
      undefined,
      (err) => console.warn("Yellow Post-it.glb", err)
    );

    // 9. Mouse Interaction & Raycasting
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.001 }; // Never let points cloud intercept object clicks
    const mouse = new THREE.Vector2();
    let targetCameraX = 0;
    let targetCameraY = 0.08;
    let currentHoveredId: string | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      if (isModalOpenRef.current) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetCameraX = mouse.x * 0.15;
      targetCameraY = defaultCameraY + mouse.y * 0.05;

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
            lampLight.intensity = lampIsOn ? (isNightModeRef.current ? 4.8 : 3.4) : 0.0;
            sound.playLampSwitch(lampIsOn);
            onDiscoverRef.current?.("lamp");
            return;
          }

          if (matched.id === "tree") {
            triggerSnowfall();
            onDiscoverRef.current?.("tree");
            return;
          }

          if (matched.id === "aquarium") {
            feedFish();
            onDiscoverRef.current?.("aquarium");
            return;
          }

          if (matched.id === "speaker") {
            sound.toggleLofiMusic();
            onDiscoverRef.current?.("speaker");
            return;
          }

          if (matched.id === "coffee") {
            sound.playCoffeeSip();
            onDiscoverRef.current?.("coffee");
            onCoffeeClickRef.current?.();
            return;
          }

          if (matched.id === "keyboard") {
            typeNextCodeSnippet();
            onDiscoverRef.current?.("keyboard");
            return;
          }

          sound.playObjectSound(matched.id);
          onSelectRef.current(matched.id);
        }
      }
    };

    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;
      if (e.key === "Escape" || e.key === "Tab" || e.key.startsWith("F") || e.metaKey || e.ctrlKey) return;
      typeNextCodeSnippet();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handlePhysicalKeyDown);

    // Imperative triggers for UI drawer
    if (triggerFeedFishRef) triggerFeedFishRef.current = feedFish;
    if (triggerSnowfallRef) triggerSnowfallRef.current = triggerSnowfall;
    if (triggerToggleLampRef) {
      triggerToggleLampRef.current = () => {
        lampIsOn = !lampIsOn;
        lampLight.intensity = lampIsOn ? (isNightModeRef.current ? 4.8 : 3.4) : 0.0;
        sound.playLampSwitch(lampIsOn);
        onDiscoverRef.current?.("lamp");
      };
    }

    // 10. Window Resize
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      updateCameraFraming(camera, width, height);
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 11. Main Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const cameraFoci: Record<string, { pos: THREE.Vector3; lookAt: THREE.Vector3 }> = {
      laptop: {
        pos: new THREE.Vector3(-0.55, -0.32, 2.3),
        lookAt: new THREE.Vector3(-0.55, -0.42, 0.1),
      },
      phone: {
        pos: new THREE.Vector3(-0.06, -0.35, 2.2),
        lookAt: new THREE.Vector3(-0.06, -0.45, 0.12),
      },
      green_art: {
        pos: new THREE.Vector3(-0.5, 0.45, 2.5),
        lookAt: new THREE.Vector3(-0.5, 0.45, -1.25),
      },
      yellow_vase: {
        pos: new THREE.Vector3(0.5, 0.45, 2.5),
        lookAt: new THREE.Vector3(0.5, 0.45, -1.25),
      },
      cards_red: {
        pos: new THREE.Vector3(0.9, 0.35, 2.6),
        lookAt: new THREE.Vector3(0.95, 0.4, -1.25),
      },
      cards_green: {
        pos: new THREE.Vector3(1.1, 0.55, 2.6),
        lookAt: new THREE.Vector3(1.1, 0.6, -1.25),
      },
      cards_blue: {
        pos: new THREE.Vector3(1.4, 0.45, 2.6),
        lookAt: new THREE.Vector3(1.45, 0.45, -1.25),
      },
      postit: {
        pos: new THREE.Vector3(-0.24, 0.22, 2.3),
        lookAt: new THREE.Vector3(-0.24, 0.22, -1.27),
      },
    };

    const currentLookAt = new THREE.Vector3(0, -0.12, 0);
    const targetLookAt = new THREE.Vector3(0, -0.12, 0);
    const targetCameraPos = new THREE.Vector3(0, 0.08, 4.8);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update skeletal swimming animations for Betta and Clownfish
      mixers.forEach((m) => m.update(delta));

      // Day & Night Lighting Transitions (Cozy visible midnight slate, never pitch black)
      const night = isNightModeRef.current;
      const targetBg = night ? new THREE.Color("#423c52") : new THREE.Color("#baa792");
      (scene.background as THREE.Color).lerp(targetBg, 0.05);
      wallMat.color.lerp(targetBg, 0.05);

      const targetAmb = night ? 0.68 : 1.05;
      ambientLight.intensity += (targetAmb - ambientLight.intensity) * 0.05;

      const targetSun = night ? 0.45 : 1.45;
      sunLight.intensity += (targetSun - sunLight.intensity) * 0.05;

      const targetSunCol = night ? new THREE.Color(0xa5c9ff) : new THREE.Color(0xffeedd);
      sunLight.color.lerp(targetSunCol, 0.05);

      // Spot light desk lamp
      if (lampIsOn) {
        const targetLamp = night ? 4.8 : 3.4;
        lampLight.intensity += (targetLamp - lampLight.intensity) * 0.05;
      } else {
        lampLight.intensity += (0 - lampLight.intensity) * 0.08;
      }

      // Laptop & Aquarium Glow
      const targetLapGlow = night ? 1.3 : 0.0;
      laptopGlow.intensity += (targetLapGlow - laptopGlow.intensity) * 0.04;

      const targetAquaGlow = night ? 2.2 : 0.0;
      aquariumGlow.intensity += (targetAquaGlow - aquariumGlow.intensity) * 0.04;

      // Cinematic Camera Focus Zoom
      const currentActive = activeModalRef.current;
      if (currentActive && cameraFoci[currentActive]) {
        targetCameraPos.copy(cameraFoci[currentActive].pos);
        targetLookAt.copy(cameraFoci[currentActive].lookAt);
      } else {
        targetCameraPos.set(targetCameraX, targetCameraY, defaultCameraZ);
        targetLookAt.set(0, -0.12, 0);
      }

      camera.position.lerp(targetCameraPos, 0.045);
      currentLookAt.lerp(targetLookAt, 0.045);
      camera.lookAt(currentLookAt);

      // Animate 3D Fish Swimming smoothly in tangent direction
      fishList.forEach((f) => {
        f.angle += f.speed * f.dir;
        f.mesh.position.x = Math.cos(f.angle) * f.rX;
        f.mesh.position.z = Math.sin(f.angle) * f.rZ;
        f.mesh.position.y = f.baseY + Math.sin(f.angle * 2.2) * 0.03;

        // Tangent heading angle
        const dx = -Math.sin(f.angle) * f.rX * f.dir;
        const dz = Math.cos(f.angle) * f.rZ * f.dir;
        f.mesh.rotation.y = Math.atan2(dx, dz);
      });

      // Update Rising Coffee Steam Wisps
      const steamPos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        steamPos[i * 3 + 1] += steamSpeeds[i];
        steamPos[i * 3] += Math.sin(elapsedTime * 2 + steamPhases[i]) * 0.0003;
        if (steamPos[i * 3 + 1] > 0.26) {
          steamPos[i * 3 + 1] = 0.08;
          steamPos[i * 3] = (Math.random() - 0.5) * 0.035;
          steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

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

    // 12. Cleanup
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handlePhysicalKeyDown);
      window.removeEventListener("resize", handleResize);
      if (triggerFeedFishRef) triggerFeedFishRef.current = null;
      if (triggerSnowfallRef) triggerSnowfallRef.current = null;
      if (triggerToggleLampRef) triggerToggleLampRef.current = null;
      cancelAnimationFrame(animId);
      if (snowTimer) clearTimeout(snowTimer);
      clearTimeout(fallbackTimer);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
}
