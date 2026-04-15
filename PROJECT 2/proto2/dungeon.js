import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function runDungeon() {

// Scene setup
const scene = new THREE.Scene();

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

// Canvas setup
const canvas = document.getElementById("dungeonCanvas");

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

  // Enable Shadows
  model.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }

    if (child.isLight) {
      lightCount += 1;
      child.visible = true;

      if ('castShadow' in child) {
        child.castShadow = true;
      }
    }
  });

  console.log('GLTF light count:', lightCount);

    // Center the model so rotation and framing happen around the scene origin.
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
// const panel = document.getElementById('panel');
// const panelTitle = document.getElementById('panelTitle');
// const panelBody = document.getElementById('panelBody');
// const closePanel = document.getElementById('closePanel');

// function opentPanel(title, body) {
//     panelTitle.textContent = title;
//     panelBody.innerHTML = body;
//     panel.classList.remove('hidden');
// }

// closePanel.addEventListener('click', () => {
//     panel.classList.add('hidden');
// });

// 

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