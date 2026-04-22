import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function runDungeon() {

// Scene setup
const scene = new THREE.Scene();

// Camera setup
let frustumSize = 10;
const aspect = window.innerWidth / window.innerHeight;

const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
  0.1,
  1000
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Canvas setup
const canvas = document.getElementById("dungeonCanvas");

const dungeonCanvas = document.getElementById("dungeonCanvas");
const roomCanvas = document.getElementById("threeCanvas");
const toggleBtn = document.getElementById("toggleViewBtn");
const toggleCircle = document.querySelector(".toggle-circle");

function isDungeonActive() {
  return document.body.dataset.view === "dungeon";
}

function showDungeon() {
  dungeonCanvas.style.display = "block";
  roomCanvas.style.display = "none";
  document.body.dataset.view = "dungeon";
  if (toggleCircle) toggleCircle.classList.remove("slide");
}

function showRoom() {
  dungeonCanvas.style.display = "none";
  roomCanvas.style.display = "block";
  document.body.dataset.view = "room";
  if (toggleCircle) toggleCircle.classList.add("slide");
}

if (!document.body.dataset.view) {
  showDungeon();
}

toggleBtn?.addEventListener("click", () => {
  if (document.body.dataset.view === "dungeon") {
    showRoom();
  } else {
    showDungeon();
  }
});

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

// Render light in model
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;


renderer.shadowMap.enabled = true;


console.log(renderer.domElement )

/* 
* Lights
*/
// Low light for moody atmosphere,
// with a directional light to cast shadows and add depth.

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.17);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Model Group
const roomGroup = new THREE.Group();
scene.add(roomGroup);

// Clickable objects list
const interactive = [];

// Load GLTF model
const loader = new GLTFLoader();

/*
 * (PUT YOUR MODEL HERE)
 */
loader.load('model/DungeonIsometric-withLights.gltf', function (gltf) {
  const model = gltf.scene;
  if (!model || model.children.length === 0) {
    console.error('GLTF loaded but scene is empty. Re-export from Blender with selected objects and mesh data.');
    return;
  }

  let lightCount = 0;
  const meshNames = new Set();

  // Track which mesh types have already been registered to avoid flooding the interactive list
  let cylinderRegistered = false;
  let cubeRegistered = false;
  let circleRegistered = false;
  let planeRegistered = false;

  model.traverse(function (child) {
    if (child.isMesh) {
      meshNames.add(child.name);
      console.log('Mesh name:', child.name);

      child.castShadow = true;
      child.receiveShadow = true;

      const meshName = child.name.toLowerCase();

      // Cylinders — About Me - register for every cylinder mesh
      if (meshName.startsWith("cylinder")) {
        child.userData = {
          title: "About Me",
          body: `
            <p><strong>Name:</strong> Anton McMilan</p>
            <p><strong>Program:</strong> Computation Arts</p>
            <p><strong>Focus:</strong> Creative coding, 3D design, interactive web experiences</p>
            <p><strong>Project:</strong> Project Secundus explores two contrasting isometric worlds: a dungeon and a room.</p>
          `
        };
        interactive.push(child);
      }

      // Cube — Skills - register for every cube mesh
      else if (meshName.startsWith ("cube")) {
        child.userData = {
          title: "Skills",
          body: `
            <p>• Three.js & WebGL</p>
            <p>• HTML / CSS / JavaScript</p>
            <p>• Blender to web workflow</p>
            <p>• Interactive environment design</p>
            <p>• Photomanipulation</p>
          `
        };
        interactive.push(child);
      }

      // Circle — Concept - register for every circle mesh
      else if (meshName.startsWith("circle")) {
        child.userData = {
          title: "Idea & Concept",
          body: `
            <p>This project contrasts comfort and darkness through two isometric environments.</p>
            <p>The interaction is intentionally simple: click to discover, drag to explore, and toggle to shift worlds.</p>
          `
        };
        interactive.push(child);
      }

      // Plane — The Dungeon - register for every plane mesh
      else if (meshName.startsWith("plane")) {
        child.userData = {
          title: "The Dungeon",
          body: `
            <p>The dungeon represents the unknown, filled with shadows and secrets.</p>
            <p>It invites exploration and discovery, embodying the mysterious aspects of the project.</p>
          `
        };
        interactive.push(child);
    }

    if (child.isLight) {
      lightCount += 1;
      child.visible = true;
      if ('castShadow' in child) {
        child.castShadow = true;
      }
    }
    }
    });

  console.log('Unique mesh names:', [...meshNames]);



  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());

  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= center.y;

  roomGroup.add(model);
}, undefined, function (error) {
  console.error('Failed to load GLTF:', error);
});

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!isDungeonActive()) return;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});


renderer.domElement.addEventListener("click", () => {
  if (!isDungeonActive()) return;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactive, true);

    if (hits.length > 0) {
        const obj = hits[0].object;
        opentPanel(obj.userData.title, obj.userData.body);
    }
});

    // Zoom controls
    const zoomSpeed = 0.5;
    const minZoom = 2;
    const maxZoom = 20;

    function updateZoom(size) {
      frustumSize = size;
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = (frustumSize * aspect) / -2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
    }

    renderer.domElement.addEventListener("wheel", (event) => {
      if (!isDungeonActive()) return;
      event.preventDefault();
      const nextSize = frustumSize + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed);
      updateZoom(THREE.MathUtils.clamp(nextSize, minZoom, maxZoom));
    }, { passive: false });


// Limited drag rotation
let dragging = false;
let dragX = 0
let targetRotationY = 0;
let currentRotationY = 0;
const maxRotation = 0.35

renderer.domElement.addEventListener("pointerdown", (event) => {
  if (!isDungeonActive()) return;
    dragging = true;
    dragX = event.clientX;
});

window.addEventListener("pointerup", () => {
    dragging = false;
});

window.addEventListener("pointermove", (event) => {
  if (!dragging || !isDungeonActive()) return;

    const deltaX = event.clientX - dragX;
    dragX = event.clientX;

    targetRotationY += deltaX * 0.005;
    targetRotationY = THREE.MathUtils.clamp(targetRotationY, -maxRotation, maxRotation);
});

//Panel
const panel = document.getElementById('panel');
const panelTitle = document.getElementById('panelTitle');
const panelBody = document.getElementById('panelBody');
const closePanel = document.getElementById('closePanel');

function opentPanel(title, body) {
    panelTitle.textContent = title;
    panelBody.innerHTML = body;
    panel.classList.remove('hidden');
}

closePanel.addEventListener('click', () => {
    panel.classList.add('hidden');
});


// Animate
function animate() {
    requestAnimationFrame(animate);

    currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.1);
    roomGroup.rotation.y += (currentRotationY - roomGroup.rotation.y) * 0.1;

    renderer.render(scene, camera);
}

animate();

//Resize
function resizeCamera() {
  updateZoom(frustumSize);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", () => {
    resizeCamera();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

resizeCamera();
  
}

runDungeon();