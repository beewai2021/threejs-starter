import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

let renderer, scene, camera, light, controls

const init = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color("lightblue")

  light = new THREE.AmbientLight()
  scene.add(light)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.pixelRatio = window.devicePixelRatio
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  }

  window.addEventListener("resize", onWindowResize, false)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

init()
