import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

let renderer, scene, camera, light, controls

const init = () => {
  scene = new THREE.Scene()
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

  light = new THREE.AmbientLight()
  scene.add(light)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(2, 2, 5)

  const planeGeo = new THREE.PlaneGeometry(2, 2)
  const planeMat = new THREE.MeshNormalMaterial()
  const plane = new THREE.Mesh(planeGeo, planeMat)
  scene.add(plane)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.pixelRatio = window.devicePixelRatio
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener("resize", onWindowResize, false)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

init()
