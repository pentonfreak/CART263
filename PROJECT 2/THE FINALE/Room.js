import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";



// Scene setup
const scene = new THREE.Scene();
//scene.background = new THREE.Color();


const canvas = document.getElementById('threeCanvas');
function isRoomActive() {
  return document.body.dataset.view === "room";
}

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
loader.load('Jordan_Model/RoomFinal.gltf', function (gltf) {
  const model = gltf.scene;

// Enable Shadows
    model.traverse(function (child) {
        if (child.isMesh) {
          console.log('Mesh found:', child.name);
            child.castShadow = true;
            child.receiveShadow = true;

            // Apply video texture to TVSCREEN
            if (child.name && child.name.trim() === 'TVSCREEN') {
                console.log('TVSCREEN found, setting up video texture');
                const video = document.getElementById('videoTexture');

                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.colorSpace = THREE.SRGBColorSpace;
                videoTexture.generateMipmaps = false;
                videoTexture.flipY = false;

                child.material = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                    side: THREE.DoubleSide
                });

                // Wait for video to be ready before playing
                video.addEventListener('canplay', () => {
                    console.log('Video can play, attempting to play');
                    video.play().catch(e => console.warn('Video play failed:', e));
                });
                video.addEventListener('error', (e) => {
                    console.error('Video load error:', e);
                });
                video.load();
            }
        }
    });

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
      if (meshName.startsWith("tv") || meshName.startsWith("tvscreen") || meshName.startsWith("screen")) {
        child.userData = {
          title: "About Me",
          body: `
            <p><strong>Name:</strong> Dan Basso</p>
            <p><strong>Program:</strong> Computation Arts</p>
            <p><strong>Focus:</strong> Creative coding, 3D design, interactive web experiences</p>
          `
        };
        interactive.push(child);
      }

      // GameCube / Controllers — Skills
      if (meshName.startsWith("cube018")) {
        child.userData = {
          title: "Skills",
          body: `
            <p>• Three.js & WebGL</p>
            <p>• HTML / CSS / JavaScript</p>
            <p>• Blender to web workflow</p>
            <p>• Interactive media arts</p>
          `
        };
        interactive.push(child);
      }

      // Shelf — Collections
      if (meshName.startsWith("shelf")) {
        child.userData = {
          title: "Collections",
          body: `
            <p>A shelf full of things that matter — books, memories, and favourite objects.</p>
          `
        };
        interactive.push(child);
      }

      // Plant (pot / leaf / dirt) — Nature
      if (meshName.startsWith("pot") || meshName.startsWith("leaf") || meshName.startsWith("dirt")) {
        child.userData = {
          title: "A Little Green",
          body: `
            <p>Even in digital spaces, a plant makes things feel alive.</p>
          `
        };
        interactive.push(child);
      }

      // Shake cup / drink — Lifestyle
      if (meshName.startsWith("cylinder005")) {
        child.userData = {
          title: "Fuel",
          body: `
            <p>Every creative session runs on something. This one runs on shakes.</p>
          `
        };
        interactive.push(child);
      }

      // Book — Reading
      if (meshName.startsWith("cube030")) {
        child.userData = {
          title: "Reading List",
          body: `
            <p>Books that inspire creativity and exploration.</p>
            <p>• "The Art of Game Design" by Jesse Schell</p>
            <p>• "Game Programming Patterns" by Robert Nystrom</p>
            <p>• "Chainsaw Man" by Tatsuki Fujimoto</p>
          `
        };
        interactive.push(child);
      }


      // Window — Outside World
      if (meshName.startsWith("window") || meshName.includes("frameforwindow")) {
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

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!isRoomActive()) return;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});


renderer.domElement.addEventListener("click", () => {
  if (!isRoomActive()) return;
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

const buttonIn = document.getElementById('buttonIn');
const buttonOut = document.getElementById('buttonOut');

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
  if (!isRoomActive()) return;
  event.preventDefault();
  const nextSize = frustumSize + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed);
  updateZoom(THREE.MathUtils.clamp(nextSize, minZoom, maxZoom));
}, { passive: false });


// Limited drag rotation
let dragging = false;
let dragX = 0;
let dragY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let targetRotationZ = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let currentRotationZ = 0;
const maxRotation = {
    x: 0.35,
    y: 0.35,
    z: 0.35
};


renderer.domElement.addEventListener("pointerdown", (event) => {
  if (!isRoomActive()) return;
    dragging = true;
    dragX = event.clientX;
    dragY = event.clientY;
});

window.addEventListener("pointerup", () => {
    dragging = false;
});

window.addEventListener("pointermove", (event) => {
  if (!dragging || !isRoomActive()) return;

    const deltaX = event.clientX - dragX;
    const deltaY = event.clientY - dragY;
    dragX = event.clientX;
     dragY = event.clientY;
    

      // X-axis rotation (vertical drag)
    targetRotationX += deltaY * 0.005;
    targetRotationX = THREE.MathUtils.clamp(targetRotationX, -maxRotation.x, maxRotation.x);

    // Y-axis rotation (horizontal drag)
   targetRotationY += deltaX * 0.005;
   targetRotationY = THREE.MathUtils.clamp(targetRotationY, -maxRotation.y, maxRotation.y);

    // Z-axis rotation (shift + horizontal drag)
    if (event.shiftKey) {
        targetRotationZ += deltaX * 0.005;
        targetRotationZ = THREE.MathUtils.clamp(targetRotationZ, -maxRotation.z, maxRotation.z);
    }
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

    currentRotationX = THREE.MathUtils.lerp(currentRotationX, targetRotationX, 0.1);
    currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.1);
      currentRotationZ = THREE.MathUtils.lerp(currentRotationZ, targetRotationZ, 0.1);
    roomGroup.rotation.x += (currentRotationX - roomGroup.rotation.x) * 0.1;
    roomGroup.rotation.y += (currentRotationY - roomGroup.rotation.y) * 0.1;
    roomGroup.rotation.z += (currentRotationZ - roomGroup.rotation.z) * 0.1;

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