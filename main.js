import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './style.css'
import gsap from 'gsap'

// Variables
const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Setting Scene
const scene = new THREE.Scene()

// Creating Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
const edges = new THREE.EdgesGeometry( geometry ); 
const lineMateria = new THREE.LineBasicMaterial({ 
  color: 0xfcffcf, 
  linewidth: 200,
})
const line = new THREE.LineSegments( edges, lineMateria );
scene.add(line)

// Setting Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100
)
camera.position.z = 5
scene.add(camera)

// Setting Orbital Controls
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas , antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.render( scene, camera )

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)

})

// Changing Box and Text Color
let rgb = []
setInterval(() => {
  rgb = [
    Math.floor(Math.random() * (255 - 2) + 1),
    Math.floor(Math.random() * (255 - 2) + 1),
    Math.floor(Math.random() * (255 - 2) + 1)
  ]
  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)

  gsap.to(line.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
}, 5000)

// animate loop
const loop = () => {
  controls.update()
  renderer.getPixelRatio(sizes.width, sizes.height)
  renderer.render(scene, camera)
  
  // Rotate Box
  line.rotation.x += 0.001
  line.rotation.y += 0.001
  line.rotation.z += 0.001

  window.requestAnimationFrame(loop)
}

loop()

// Timeline

const tl = gsap.timeline({ defaults: { duration: 1 } })

tl.fromTo('.title', {y: 100, opacity: 0}, {y: 0, opacity: 1})
tl.fromTo(line.scale, { z: 0, x: 0, y: 0 }, { z: 1 , x: 1, y: 1 })