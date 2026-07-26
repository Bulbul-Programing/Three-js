import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create Scene
const scene = new THREE.Scene()

// Create loader for texture load
const textureLoader = new THREE.TextureLoader()

// load gras texture
const grasAlbedo = textureLoader.load("static\textures\whispy-grass-meadow-bl\wispy-grass-meadow_albedo.png")

// Create geometry
const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
const sphereGeometry = new THREE.SphereGeometry(1, 32, 16)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 16)

// create Material 
const material = new THREE.MeshBasicMaterial({ color: "red" })

// Create Mesh
const cubeMesh = new THREE.Mesh(boxGeometry, material)
const sphereMesh = new THREE.Mesh(sphereGeometry, material)
sphereMesh.position.x = 3
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material)
cylinderMesh.position.x = -3

// Add this cube mesh in scene
scene.add(cubeMesh, sphereMesh, cylinderMesh)

// add axes helper for better showing.
const axesHelper = new THREE.AxesHelper(4)
cubeMesh.add(axesHelper)

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)
camera.position.z = 5

// target canvas
const canvas = document.querySelector("canvas.webgl")

// canvas render
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

// define render screen size
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)
console.log(renderer.getPixelRatio());
// init orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.3
controls.maxDistance = 10
controls.minDistance = 3

// Add event listener for responsive
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

const clock = new THREE.Clock()
let previousTime = 0

// create loop function for loop every movement
const renderLoop = () => {
    const currentTime = clock.getElapsedTime()
    const delta = currentTime - previousTime
    previousTime = currentTime

    // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 60

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop)
}

renderLoop()




