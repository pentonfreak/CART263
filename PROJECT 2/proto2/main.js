import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8dfdf);

// Camera: orthographic for isometric look
const frustumSize = 10;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  (-frustumSize * aspect) / 2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  -frustumSize / 2,
  0.1,
  100
);

camera.position.set(8, 8, 8);
camera.lookAt(0, 1.6, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("app").appendChild(renderer.domElement);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(8, 10, 6);
dirLight.castShadow = true;
scene.add(dirLight);

// Room holder
const roomGroup = new THREE.Group();
scene.add(roomGroup);

// Materials
const matFloor = new THREE.MeshStandardMaterial({ color: 0xe7dcdc, roughness: 1 });
const matWall = new THREE.MeshStandardMaterial({ color: 0xdedcde, roughness: 1 });
const matTrim = new THREE.MeshStandardMaterial({ color: 0xd5c6c6, roughness: 1 });
const matWood = new THREE.MeshStandardMaterial({ color: 0xe3d0b2, roughness: 1 });
const matDark = new THREE.MeshStandardMaterial({ color: 0x534846, roughness: 1 });
const matWhite = new THREE.MeshStandardMaterial({ color: 0xf5f1ee, roughness: 1 });
const matPink = new THREE.MeshStandardMaterial({ color: 0xe6c1cb, roughness: 1 });
const matBlue = new THREE.MeshStandardMaterial({ color: 0xbcd2dc, roughness: 1 });
const matChair = new THREE.MeshStandardMaterial({ color: 0xe3c48b, roughness: 1 });
const matPlant = new THREE.MeshStandardMaterial({ color: 0x74a56d, roughness: 1 });
const matGlass = new THREE.MeshStandardMaterial({
  color: 0xbcdcea,
  transparent: true,
  opacity: 0.45,
  roughness: 0.2
});

// Helpers
function box(w, h, d, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cylinder(rt, rb, h, mat) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 24), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

const interactive = [];

// Base room
const floor = box(8, 0.35, 8, matFloor);
floor.position.y = -0.175;
roomGroup.add(floor);

const rug = box(2.2, 0.02, 1.6, matWall);
rug.position.set(1.2, 0.02, 2.3);
roomGroup.add(rug);

const wallA = box(8, 4, 0.22, matWall);
wallA.position.set(0, 2, -4);
roomGroup.add(wallA);

const wallB = box(0.22, 4, 8, matWall);
wallB.position.set(-4, 2, 0);
roomGroup.add(wallB);

const trimA = box(8.15, 0.18, 0.26, matTrim);
trimA.position.set(0, 4.05, -4);
roomGroup.add(trimA);

const trimB = box(0.26, 0.18, 8.15, matTrim);
trimB.position.set(-4, 4.05, 0);
roomGroup.add(trimB);

// Desk
const deskTop = box(3, 0.18, 1.3, matWood);
deskTop.position.set(-1.6, 1.15, 1.1);
roomGroup.add(deskTop);

const leg1 = box(0.15, 1.1, 0.15, matWhite);
leg1.position.set(-2.8, 0.55, 0.7);
roomGroup.add(leg1);

const leg2 = box(0.15, 1.1, 0.15, matWhite);
leg2.position.set(-0.4, 0.55, 1.8);
roomGroup.add(leg2);

// Monitor = About
const monitor = box(1.15, 0.65, 0.08, matDark);
monitor.position.set(-1.95, 1.72, 0.88);
monitor.userData = {
  title: "About Me",
  body: `
    <p>Hello! I'm a digital artist / designer creating interactive experiences.</p>
    <p>This room is my portfolio homepage. Each object reveals a different part of my work.</p>
  `
};
interactive.push(monitor);
roomGroup.add(monitor);

const screen = box(1.02, 0.54, 0.02, matPink);
screen.position.set(-1.95, 1.72, 0.94);
roomGroup.add(screen);

const stand = box(0.08, 0.35, 0.08, matWhite);
stand.position.set(-1.95, 1.38, 0.88);
roomGroup.add(stand);

const keyboard = box(0.72, 0.04, 0.28, matWhite);
keyboard.position.set(-1.6, 1.25, 1.45);
roomGroup.add(keyboard);

// Chair
const chairSeat = box(0.7, 0.18, 0.7, matChair);
chairSeat.position.set(-1.2, 0.72, 2.2);
roomGroup.add(chairSeat);

const chairBack = box(0.7, 0.7, 0.16, matChair);
chairBack.position.set(-1.55, 1.05, 2.2);
roomGroup.add(chairBack);

const chairStem = cylinder(0.06, 0.06, 0.5, matWhite);
chairStem.position.set(-1.2, 0.35, 2.2);
roomGroup.add(chairStem);

// Plant
const plantPot = cylinder(0.16, 0.19, 0.22, matWhite);
plantPot.position.set(-0.7, 1.2, 0.75);
roomGroup.add(plantPot);

for (let i = 0; i < 4; i++) {
  const leaf = box(0.12, 0.34, 0.04, matPlant);
  leaf.position.set(-0.7 + (i - 1.5) * 0.08, 1.38, 0.75);
  leaf.rotation.z = -0.4 + i * 0.25;
  roomGroup.add(leaf);
}

// Window
const windowFrame = box(0.9, 2.1, 0.06, matWhite);
windowFrame.position.set(-0.25, 2.2, -3.92);
roomGroup.add(windowFrame);

const windowInner = box(0.68, 1.85, 0.02, matWall);
windowInner.position.set(-0.25, 2.2, -3.87);
roomGroup.add(windowInner);

const windowBarV = box(0.08, 1.8, 0.04, matWhite);
windowBarV.position.set(-0.25, 2.2, -3.84);
roomGroup.add(windowBarV);

const windowBarH = box(0.68, 0.08, 0.04, matWhite);
windowBarH.position.set(-0.25, 2.2, -3.84);
roomGroup.add(windowBarH);

// Shelf + projects
const shelf = box(1.7, 0.08, 0.3, matWood);
shelf.position.set(2.1, 3.0, -2.75);
roomGroup.add(shelf);

const book1 = box(0.12, 0.42, 0.2, matBlue);
book1.position.set(1.5, 3.25, -2.75);
book1.userData = {
  title: "Project 1",
  body: `
    <p>A selected design or 3D work.</p>
    <p>You can replace this with your real project description, image, or link.</p>
  `
};
interactive.push(book1);
roomGroup.add(book1);

const book2 = box(0.12, 0.36, 0.2, matPink);
book2.position.set(1.66, 3.22, -2.75);
book2.userData = {
  title: "Project 2",
  body: `
    <p>Another featured project.</p>
    <p>This could open a case study, video, or gallery.</p>
  `
};
interactive.push(book2);
roomGroup.add(book2);

const frame = box(0.52, 0.72, 0.06, matWood);
frame.position.set(2.2, 2.4, -2.45);
frame.userData = {
  title: "Gallery",
  body: `
    <p>This wall frame can open your artwork gallery.</p>
    <p>Add thumbnails, render stills, or animation previews here.</p>
  `
};
interactive.push(frame);
roomGroup.add(frame);

const frameInner = box(0.38, 0.56, 0.02, matPink);
frameInner.position.set(2.2, 2.4, -2.39);
roomGroup.add(frameInner);

// Table
const tableTop = cylinder(0.5, 0.5, 0.12, matWood);
tableTop.position.set(0.25, 1.0, 0.7);
roomGroup.add(tableTop);

const tableStem = cylinder(0.08, 0.08, 0.7, matWood);
tableStem.position.set(0.25, 0.65, 0.7);
roomGroup.add(tableStem);

const tableBottom = cylinder(0.38, 0.38, 0.08, matWood);
tableBottom.position.set(0.25, 0.28, 0.7);
roomGroup.add(tableBottom);

// Aquarium / contact
const tankBase = box(2.3, 1.6, 1.1, matWood);
tankBase.position.set(2.2, 0.8, 1.25);
tankBase.userData = {
  title: "Contact",
  body: `
    <p>Email: yourname@email.com</p>
    <p>Instagram: @yourhandle</p>
    <p>Behance / ArtStation / LinkedIn links can go here.</p>
  `
};
interactive.push(tankBase);
roomGroup.add(tankBase);

const tankGlass = box(2.18, 1.3, 1.0, matGlass);
tankGlass.position.set(2.2, 1.15, 1.25);
roomGroup.add(tankGlass);

for (let i = 0; i < 6; i++) {
  const rock = box(
    0.25 + Math.random() * 0.2,
    0.14 + Math.random() * 0.18,
    0.2 + Math.random() * 0.2,
    matDark
  );
  rock.position.set(
    1.45 + Math.random() * 1.25,
    0.35 + Math.random() * 0.15,
    0.9 + Math.random() * 0.55
  );
  rock.rotation.y = Math.random() * Math.PI;
  roomGroup.add(rock);
}

// Panel UI
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelBody = document.getElementById("panelBody");
const closePanel = document.getElementById("closePanel");

function openPanel(title, body) {
  panelTitle.textContent = title;
  panelBody.innerHTML = body;
  panel.classList.remove("hidden");
}

closePanel.addEventListener("click", () => {
  panel.classList.add("hidden");
});

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;

function updatePointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("pointermove", updatePointer);

window.addEventListener("click", () => {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactive, false);

  if (hits.length > 0) {
    const obj = hits[0].object;
    openPanel(obj.userData.title, obj.userData.body);
  }
});

// Limited drag rotation
let dragging = false;
let lastX = 0;
let targetRotY = 0;
let currentRotY = 0;
const maxRot = 0.38;

renderer.domElement.addEventListener("pointerdown", (e) => {
  dragging = true;
  lastX = e.clientX;
});

window.addEventListener("pointerup", () => {
  dragging = false;
});

window.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;

  targetRotY += dx * 0.005;
  targetRotY = THREE.MathUtils.clamp(targetRotY, -maxRot, maxRot);
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  currentRotY = THREE.MathUtils.lerp(currentRotY, targetRotY, 0.08);
  roomGroup.rotation.y += (currentRotY - roomGroup.rotation.y) * 0.08;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactive, false);

  if (hovered && (!hits.length || hits[0].object !== hovered)) {
    hovered.scale.set(1, 1, 1);
    hovered = null;
    document.body.style.cursor = "default";
  }

  if (hits.length > 0) {
    const obj = hits[0].object;
    if (hovered !== obj) {
      if (hovered) hovered.scale.set(1, 1, 1);
      hovered = obj;
      hovered.scale.set(1.06, 1.06, 1.06);
      document.body.style.cursor = "pointer";
    }
  }

  renderer.render(scene, camera);
}

animate();

// Resize
function resizeCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", () => {
  resizeCamera();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

resizeCamera();