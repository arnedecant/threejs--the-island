// -------------------------------------------------------------------
// :: APP
// -------------------------------------------------------------------

// import * as data from '../assets/data.json'
import { normalize } from './utilities/math.js'
import Island from './models/island.js'

class App {

	constructor() {

		window.COLORS = {
			cyan: 0x248079,
			brown: 0xA98F78,
			brownDark: 0x9A6169,
			green: 0x65BB61,
			greenLight: 0xABD66A,
			blue: 0x6BC6FF
		}

		// set properties

		this.config = {
			debug: false,
			camera: {
				zpf: 5, // zoom per frame
				default: { x: -2.5, y: 3, z: 4 },
				// default: { x: -1.25, y: 1.5, z: 2 },
				// default: { x: -2.5, y: 3, z: 2 },
				min: { x: 0, y: 0, z: 0 },
				max: { x: 0, y: 1000, z: 1000 }
			}
		}

		this.zoom = 1
		this.scrollSpeed = 0
		this.mouse = new THREE.Vector2()
		this.raycaster = new THREE.Raycaster()

		// init

		this.init()

	}

	init() {

		// set up scene, camera and renderer

		this.createScene()

		// add lights

		this.createLights()

		// add objects

		this.createIsland()

		// add events

		window.addEventListener('resize', this.resize.bind(this), false)
		window.addEventListener('click', this.click.bind(this), false)
		window.addEventListener('mousemove', this.mousemove.bind(this), false)
		window.addEventListener('mousedown', this.mousedown.bind(this), false)
		window.addEventListener('mouseup', this.mouseup.bind(this), false)
		window.addEventListener('mousewheel', this.scroll.bind(this), { passive: true })

		// render

		this.render()

	}

	createScene() {

		// set width & height

		this.height = window.innerHeight
		this.width = window.innerWidth

		// create new scene

		this.scene = window.SCENE = new THREE.Scene()

		// add fog to the scene

		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

		// create the camera

		this.createCamera()

		// create the renderer

		this.createRenderer()

		// add debug helpers

		if (this.config.debug) this.initDebug()

	}

	initDebug() {

		let axesHelper = new THREE.AxesHelper(5)
		this.scene.add(axesHelper)

	}

	createCamera() {

		// set values to init the camera

		this.aspectRatio = this.width / this.height
		this.fieldOfView = 60
		this.nearPlane = 1
		this.farPlane = 10000

		// create a new camera

		this.camera = new THREE.PerspectiveCamera(
			this.fieldOfView,
			this.aspectRatio,
			this.nearPlane,
			this.farPlane
		)

		// set camera position

		this.camera.position.x = this.config.camera.default.x
		this.camera.position.y = this.config.camera.default.y
		this.camera.position.z = this.config.camera.default.z

		// point the camera to the center

		this.camera.lookAt(new THREE.Vector3(0,0,0))

	}

	createRenderer() {

		// create new renderer

		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		})

		// set the size

		this.renderer.setSize(this.width, this.height)

		// enable shadowMap

		this.renderer.shadowMap.enabled = true

		// support for HDPI displays

		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

		// append to DOM

		this.container = document.querySelector('#world')
		this.container.appendChild(this.renderer.domElement)

	}

	createLights() {

		// create a new ambient light

		this.light = new THREE.AmbientLight(0xffffff, 0.5)

		// create a new shadow light

		this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.5)
		this.shadowLight.position.set(200, 200, 200)
		this.shadowLight.castShadow = true

		// create a new back light

		this.backLight = new THREE.DirectionalLight(0xffffff, 0.2)
		this.backLight.position.set(-100, 200, 50)
		this.backLight.castShadow = true

		// add lights to the scene

		this.scene.add(this.light)
		this.scene.add(this.shadowLight)
		this.scene.add(this.backLight)

	}

	createIsland() {

		// create new object

		this.island = new Island()

		// add the island to the scene

		this.scene.add(this.island.mesh)
		this.scene.updateMatrixWorld(true)

	}

	updateZoom() {

		// no need to zoom when scrollSpeed hasn't been updated

		if (this.scrollSpeed == 0) return

		// zoom per frame

		let zpf = this.config.camera.zpf

		// min & max values

		let zMin = this.config.camera.min.z,
			zMax = this.config.camera.max.z

		// smoother scrolling at the end of the animation
		// prevents zooms very small values, for example 1.2 ...

		if (Math.abs(this.scrollSpeed) < (2 * zpf)) {
			zpf = zpf / 2
		}

		// redefine the zoom per frame

		if (this.scrollSpeed > 0) {

			// zoom out

			if (this.scrollSpeed < zpf) {
				zpf = this.scrollSpeed
				this.scrollSpeed = 0
			} else {
				this.scrollSpeed -= zpf
			}

		} else if (this.scrollSpeed < 0) {

			// zoom in

			if (this.scrollSpeed > -zpf) {
				zpf = this.scrollSpeed
				this.scrollSpeed = 0
			} else {
				this.scrollSpeed += zpf
				zpf = -zpf
			}

		}

		// get new z-pos

		let z = this.camera.position.z + zpf

		// set boundaries for z-pos

		z = (z > zMin) ? z : zMin
		z = (z < zMax) ? z : zMax

		// apply position if it's above threshold

		this.camera.position.z = z

	}

	scroll(e) {

		// only store the scroll value
		// zoom will be handled in the render function

		this.scrollSpeed = e.deltaY / 2

	}

	click(e) {

		e.preventDefault()

		// update the picking ray with the camera and mouse position

		this.raycaster.setFromCamera(this.mouse, this.camera)

		// calculate objects intersecting the picking ray

		// let intersects = this.raycaster.intersectObjects(this.island.mesh.children)
		let intersects = this.raycaster.intersectObjects(this.scene.children, true)
		let foundTree = false

		console.log(intersects)

		intersects.forEach((intersect) => {

			let obj = intersect.object.parent
			if (obj.name != 'tree' || foundTree) return

			foundTree = true

			let tree = this.island.trees.find((t) => t.uuid == obj.uuid)
			let index = this.island.trees.findIndex((t) => t.uuid == obj.uuid)

			tree.despawn()

			SCENE.remove(SCENE.getObjectById(tree.mesh.id))
			this.island.trees.splice(index, 1)

		})

	}

	mousemove(e) {

		e.preventDefault()

		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components

		this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
		this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1

		// console.log({ x: this.mouse.x, y: this.mouse.y })

	}

	mousedown(e) {

		this.shooting = true

	}

	mouseup(e) {

		this.shooting = false

	}

	resize(e) {

		// set canvas dimensions

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// set renderer dimensions

		this.renderer.setSize(this.width, this.height)

		// set camera

		this.aspectRatio = this.width / this.height
		this.camera.aspect = this.aspectRatio
		this.camera.updateProjectionMatrix()

		// render

		// this.render()

	}

	render() {

		// update zoom

		this.updateZoom()

		// render

		this.island.render()
  		this.renderer.render(this.scene, this.camera);

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()
