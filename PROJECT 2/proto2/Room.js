import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";



// Scene setup
const scene = new THREE.Scene();
//scene.background = new THREE.Color();


const canvas = document.getElementById('threeCanvas');

// Camera setup
const frustumSize = 10;
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

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xF3E6CE, 1);
renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
dirLight.castShadow = true;
scene.add(dirLight);

// Model Group
const roomGroup = new THREE.Group();
scene.add(roomGroup);

// Clickable objects list
const interactive = [];

// Load GLTF model

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);


/*
 * (PUT YOUR MODEL HERE)
 */
loader.load('Jordan_Model/Room.gltf', function (gltf) {
  const model = gltf.scene;

  model.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      const meshName = child.name.toLowerCase();

      // Couch — Artist Statement
      if (meshName.includes("couch")) {
        child.userData = {
          title: "Artist Statement",
          body: `
            <p>This room represents a calm and personal space.</p>
            <p>It contrasts the dungeon by offering warmth, familiarity, and reflection.</p>
          `
        };
        interactive.push(child);
      }

      // Table — Project Info
      if (meshName.includes("table")) {
        child.userData = {
          title: "Project Info",
          body: `
            <p><strong>Course:</strong> Project 2</p>
            <p><strong>Theme:</strong> Two isometric environments with interactive storytelling</p>
            <p><strong>Tools:</strong> Blender, Three.js, HTML, CSS, JavaScript</p>
          `
        };
        interactive.push(child);
      }

      // Lamp — Inspiration
      if (meshName.includes("lamp")) {
        child.userData = {
          title: "Inspiration",
          body: `
            <p>The room is inspired by cozy digital spaces and miniature isometric dioramas.</p>
          `
        };
        interactive.push(child);
      }

      // TV & Screen — About Me
      if (meshName === "tv" || meshName === "tv.screen" || meshName === "screen") {
        child.userData = {
          title: "About Me",
          body: `
            <p><strong>Name:</strong> Anton McMilan</p>
            <p><strong>Program:</strong> Computation Arts</p>
            <p><strong>Focus:</strong> Creative coding, 3D design, interactive web experiences</p>
          `
        };
        interactive.push(child);
      }

      // GameCube / Controllers — Skills
      if (meshName.includes("gamecube") || meshName.includes("controller")) {
        child.userData = {
          title: "Skills",
          body: `
            <p>• Three.js & WebGL</p>
            <p>• HTML / CSS / JavaScript</p>
            <p>• Blender to web workflow</p>
            <p>• Interactive environment design</p>
          `
        };
        interactive.push(child);
      }

      // Shelf — Collections
      if (meshName.includes("shelf")) {
        child.userData = {
          title: "Collections",
          body: `
            <p>A shelf full of things that matter — books, memories, and favourite objects.</p>
          `
        };
        interactive.push(child);
      }

      // Plant (pot / leaf / dirt) — Nature
      if (meshName.includes("pot") || meshName.includes("leaf") || meshName.includes("dirt")) {
        child.userData = {
          title: "A Little Green",
          body: `
            <p>Even in digital spaces, a plant makes things feel alive.</p>
          `
        };
        interactive.push(child);
      }

      // Shake cup / drink — Lifestyle
      if (meshName.includes("shake_cup") || meshName.includes("cup")) {
        child.userData = {
          title: "Fuel",
          body: `
            <p>Every creative session runs on something. This one runs on shakes.</p>
          `
        };
        interactive.push(child);
      }

      // Book — Reading
      if (meshName.includes("book")) {
        child.userData = {
          title: "Reading List",
          body: `
            <p>Books on design, fiction, and the space between the two.</p>
          `
        };
        interactive.push(child);
      }

      // Trash can — Concept
      if (meshName.includes("trash")) {
        child.userData = {
          title: "The Process",
          body: `
            <p>Not every idea makes it. The trash can is part of the workflow too.</p>
          `
        };
        interactive.push(child);
      }

      // Window — Outside World
      if (meshName === "window" || meshName.includes("frameforwindow")) {
        child.userData = {
          title: "The Outside",
          body: `
            <p>Sometimes the best ideas come from looking out the window.</p>
          `
        };
        interactive.push(child);
      }
    }
  });

  console.log('Room interactive objects:', interactive.map(obj => obj.name));

  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());

  model.position.x -= center.x;
  model.position.y -= center.y;
  model.position.z -= center.z;

  roomGroup.add(model);
});


// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("pointermove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


window.addEventListener("click", () => {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactive, true);

    if (hits.length > 0) {
        const obj = hits[0].object;
        opentPanel(obj.userData.title, obj.userData.body);
    }
});


// Limited drag rotation
let dragging = false;
let dragX = 0
let targetRotationY = 0;
let currentRotationY = 0;
const maxRotation = 0.35


renderer.domElement.addEventListener("pointerdown", (event) => {
    dragging = true;
    dragX = event.clientX;
});

window.addEventListener("pointerup", () => {
    dragging = false;
});

window.addEventListener("pointermove", (event) => {
    if (!dragging) return;

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
window.requestAnimationFrame(animate);

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
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", () => {
    resizeCamera();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("resize", resizeCamera);


resizeCamera();