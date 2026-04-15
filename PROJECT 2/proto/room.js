import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function runRoom() {

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

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
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

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
loader.load('model/Room.gltf', function (gltf) {
  const model = gltf.scene;

  // Enable Shadows
  model.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

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

resizeCamera();

}

runRoom();