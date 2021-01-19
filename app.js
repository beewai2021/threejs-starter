import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

let scene, light, camera, renderer, controls

const initScene = () => {
  const canvas = document.querySelector("canvas#webgl")

  // scene
  scene = new THREE.Scene()

  // axes helper
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

  // lights
  light = new THREE.AmbientLight()
  scene.add(light)

  // camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(0, 0, 5)

  // basic plane
  const planeGeo = new THREE.PlaneGeometry(2, 2)
  const planeMat = new THREE.MeshNormalMaterial()
  const plane = new THREE.Mesh(planeGeo, planeMat)
  scene.add(plane)

  // renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.pixelRatio = Math.min(window.devicePixelRatio || 2)

  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement)

  // resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.pixelRatio = Math.min(window.devicePixelRatio || 2)
  }

  window.addEventListener("resize", onWindowResize, false)

  // animation loop
  const tick = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }

  tick()
}

window.addEventListener("load", () => initScene())
