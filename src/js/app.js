// -------------------------------------------------------------------
// :: APP
// -------------------------------------------------------------------

// import * as data from '../assets/data.json'
import { normalize } from './utilities/math.js'
import Airplane from './models/airplane.js'
import Sea from './models/sea.js'
import Sky from './models/sky.js'
import Bullet from './models/bullet.js'

class App {

	constructor() {

		const url = new URL(window.location.href)

		// set properties
		this.config = {
			debug: false,
			camera: {
				zpf: 5, // zoom per frame
				default: { x: 0, y: 100, z: 200 },
				min: { x: 0, y: 100, z: 50 },
				max: { x: 0, y: 100, z: 200 }
			}
		}

		this.zoom = url.searchParams.get('zoom') || 1
		this.scrollSpeed = 0
		this.shooting = false
		this.bullets = []

		this.colors = {
			black: 0x23190f,
			brown: 0x59332e,
			red: 0xf25346,
			orange: 0xF5986E,
			blue: 0x68c3c0,
			white: 0xd8d0d1
		}

		this.mouse = { x: 0, y: 0 }

		// init
		this.init()

	}

	init() {

		// skip if there's no THREE
		if (!THREE) return

		// set up scene, camera and renderer
		this.createScene()

		// add lights
		this.createLights()

		// add objects
		this.createAirplane()
		this.createSea()
		this.createSky()

		// add events
		window.addEventListener('resize', this.resize.bind(this), false)
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
		this.scene = new THREE.Scene()

		// add fog to the scene
		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

		// create the camera
		this.createCamera()

		// create the renderer
		this.createRenderer()

		// add debug helpers
		if (this.config.debug) initDebug()

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

		// create a new hemisphere light (a gradient colored light)
		this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

		// create a new directional light (a light that shines from a specific direction)
		this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)

		// create a new ambient light (a light that modifies the global color of a scene and makes the shadows softer)
		this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.3)

		// set the direction of the light
		this.shadowLight.position.set(150, 350, 350)

		// allow shadow casting
		this.shadowLight.castShadow = true

		// set visible area of the projected shadow
		this.shadowLight.shadow.camera.left = -400;
		this.shadowLight.shadow.camera.right = 400;
		this.shadowLight.shadow.camera.top = 400;
		this.shadowLight.shadow.camera.bottom = -400;
		this.shadowLight.shadow.camera.near = 1;
		this.shadowLight.shadow.camera.far = 1000;

		// set the resolution fo the shadow
		this.shadowLight.shadow.mapSize.width = 2048
		this.shadowLight.shadow.mapSize.height = 2048

		// add lights to the scene
		this.scene.add(this.hemisphereLight)
		this.scene.add(this.shadowLight)
		this.scene.add(this.ambientLight)

	}

	createAirplane() {

		// create new object
		this.airplane = new Airplane(this.colors)

		// set position and scale
		this.airplane.mesh.position.y = 100
		this.airplane.mesh.scale.set(0.25, 0.25, 0.25)

		// add the airplane to the scene
		this.scene.add(this.airplane.mesh)
		this.scene.updateMatrixWorld(true)

	}

	createSea() {

		// create new object
		this.sea = new Sea(this.colors.blue)

		// push it down
		this.sea.mesh.position.y = -600

		// add the sea to the scene
		this.scene.add(this.sea.mesh)

	}

	createSky() {

		// create new object
		this.sky = new Sky(20)

		// push it down
		this.sky.mesh.position.y = -600

		// add the sky to the scene
		this.scene.add(this.sky.mesh)

	}

	spawnBullets() {

		// get airplane position
		let position = new THREE.Vector3()
		position.setFromMatrixPosition(this.airplane.mesh.matrixWorld)

		// create a new object
		let bullet = new Bullet(this.colors.black, position)

		// add bullet to scene and bullet array
		this.scene.add(bullet.mesh)
		this.bullets.push(bullet)

	}

	updateAirplane() {

		/*
			allowed positions for the airplane
			x: between -100 and 100
			y: between 25 and 175

			==> depends on mouse position (between -1 and 1)
		*/

		// calculate position based on normalize function (utils.js)
		let targetX = normalize(this.mouse.x, -1, 1, -100, 100)
		let targetY = normalize(this.mouse.y, -1, 1, 25, 175)

		// update airplane position
		// move the plane at each frame by adding a fraction of the remaining distance
		this.airplane.mesh.position.x += (targetX - this.airplane.mesh.position.x) * 0.1;
		this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.1;

		// rotate the plane proportionally to the remaining distance
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.0128;
		this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.0064;

		// rotate propeller
		this.airplane.propeller.rotation.x += 0.3

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

	mousemove(e) {

		// convert mouse position to a normalized value between -1 and 1
		let tx = -1 + (e.clientX / this.width) * 2		// x-axis
		let ty = 1 - (e.clientY / this.height) * 2		// y-axis

		// apply converted values
		this.mouse = {
			x: tx,
			y: ty
		}

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

		// rotate sky
		this.sky.mesh.rotation.z += 0.01

		// update the airplane
		this.updateAirplane()

		// update the waves
		this.sea.moveWaves()

		// animate pilot hair
		this.airplane.pilot.updateHairs()

		// if shooting: spawn bullets
		// if (this.shooting) this.spawnBullets()

		// render
  		this.renderer.render(this.scene, this.camera);

		// add self to the requestAnimationFrame
		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()
