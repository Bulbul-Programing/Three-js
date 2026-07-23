import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const geometry = new THREE.BufferGeometry();
// create scene
const scene = new THREE.Scene()


//create geometry and material
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true })

// create mesh
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.rotation.y = 10

// Create BufferGeometry

const vertices = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  0, 1, 0
])

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({color: "red",wireframe: true})
const mesh  = new THREE.Mesh(geometry, material)



// cubeMesh.position.y = -1
// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
// cubeMesh2.position.x = 2
// const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial)
// cubeMesh3.position.x = -2

// const group = new THREE.Group()

// group.scale.setScalar(3)

// group.add(cubeMesh)
// group.add(cubeMesh2)
// group.add(cubeMesh3)

// scene.add(group)
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(4)
cubeMesh.add(axesHelper)

// camera create and set position
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)
camera.position.z = 5

// target canvas
const canvas = document.querySelector("canvas.webgl")

// canvas render
const renderer = new THREE.WebGLRenderer({ canvas }
)
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)

// init orbit controls
const controls = new OrbitControls(camera, canvas)
// controls.autoRotate = true
controls.autoRotateSpeed = 6
controls.enableDamping = true
controls.dampingFactor = 0.1
// controls.target.set(
//     2,
//     2,
//     2
// );
controls.maxDistance = 10
controls.minDistance = 3

// update render and camera aspect ration when screen is resize

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

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 60

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop)
}

renderLoop()


