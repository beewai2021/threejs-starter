import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

let scene, ambientLight, camera, renderer, controls

const initScene = () => {
  const canvas = document.querySelector("canvas#webgl")

  const gui = new dat.GUI()
  const materialConfig = {
    materialColor: 0xf795f7,
  }

  // scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x2f2f2f)

  // axes helper
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

  // lights
  ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
  scene.add(ambientLight)
  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  spotLight.position.set(3, 3, 3)
  scene.add(spotLight)

  // camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(2.5, 2.5, 4)

  // basic sphere
  const sphereGeometry = new THREE.SphereBufferGeometry(2, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({ flatShading: true })
  sphereMaterial.color.set(materialConfig.materialColor)
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  scene.add(sphere)

  // renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas })
  renderer.antialias = window.devicePixelRatio < 2 ? true : false
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  
  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement)

  // gui controller
  const materialFolder = gui.addFolder("Sphere Material")
  materialFolder.open()
  materialFolder.add(sphereMaterial, "wireframe")
  materialFolder
    .addColor(materialConfig, "materialColor")
    .onChange(() => sphereMaterial.color.set(materialConfig.materialColor))
  materialFolder
    .add(sphereMaterial, "flatShading")
    .onChange(() => (sphereMaterial.needsUpdate = true))

  // resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
