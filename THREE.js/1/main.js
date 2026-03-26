// librart ref
import * as THREE from "three";

//Prepare for scene, camera, and renderer

// create a scene
const scene = new THREE.Scene();

//texture
const loader = new THREE.TextureLoader();

const water_texture = await loader.loadAsync( 'texture/Ice002_1K-JPG_Color.jpg' );
//need to ensure that the textures are encoded correctly - mapping the colors correctly.
water_texture.colorSpace = THREE.SRGBColorSpace;

// A: the geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// B: the material
// const material = new THREE.MeshBasicMaterial({ color: 0x800080 })
// C: put together
// const mesh = new THREE.Mesh(geometry, material)
// D: ADD TO THE SCENE
// scene.add(mesh)

// const mesh_2 = new THREE.Mesh(geometry, material)
// scene.add(mesh_2)
// mesh_2.position.x = 1.5
// mesh_2.position.y = 1.25
// mesh_2.position.z = -1

const sizes = {
    width: 800,
    height: 600
}

// //Scale the mesh
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5

// //Rotation
// mesh.rotation.x = Math.PI * 1
// mesh.rotation.y = Math.PI * 0.25


// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

//Move Camera
//Z-axis - forward and backward
camera.position.z = 3
//X-axis - left and right
camera.position.x = 0
//Y-axis - up and down
camera.position.y = 0.5



// camera.lookAt(new THREE.Vector3(0, 0, 0))

//MATERIALS
// const material = new THREE.MeshBasicMaterial()

//   const material = new THREE.MeshBasicMaterial({
//     map: water_texture
// })

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// )
// sphere.position.x = - 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.5, 0.3, 16, 32),
//     material
// )
// torus.position.x = 1.5

// scene.add(sphere, plane, torus)


//GROUPS
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe: true })
// )
// cube1.position.x = 1.5
// group.add(cube1)
// /*https://threejs.org/docs/#SphereGeometry*/
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry( .75, 32 , 16 ),
//   new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true})
// )
// sphere.position.y = 1.5
// sphere.position.x = 3
// group.add(sphere)

// material.color = new THREE.Color('#36c6ff') 

// material.wireframe = true

//ANIMATION
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry_2 = new THREE.SphereGeometry(1, 32, 32)
const material_2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const mesh_2 = new THREE.Mesh(geometry_2, material_2)
scene.add(mesh_2)


//TURN ON AXES HELPER
//https://threejs.org/docs/?q=Axes#AxesHelper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
//move it 
axesHelper.position.x = -1;
axesHelper.position.y = -1;


//Access the Canvas
const canvas = document.querySelector('canvas#three-ex')
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//give it the size
renderer.setSize(sizes.width, sizes.height)

//render:
// renderer.render(scene, camera)

window.requestAnimationFrame(animate)

let elaspedTime = 0;
function animate(timer){
    
    let deltaTime = timer - elaspedTime
    elaspedTime = timer
    console.log(deltaTime)
    mesh.rotation.y+=0.01*deltaTime
    mesh.rotation.x+=0.01*deltaTime
    mesh.rotation.z+=0.01*deltaTime

    
    camera.position.x = Math.cos(elaspedTime/1000)
    camera.position.y = Math.sin(elaspedTime/1000)
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)

    mesh_2.position.y+=Math.cos(timer*0.001)*deltaTime*0.01
    mesh_2.position.x+=Math.sin(timer*0.001)*deltaTime*0.01

}

