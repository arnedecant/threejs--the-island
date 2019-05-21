'use strict'

import { random } from '../utilities/math.js'

export default class Drop {

	constructor() {

		// set properties

		this.materials = {
			water: new THREE.MeshPhongMaterial({ color: COLORS.blue, transparent: true, opacity: 0.8 })
		}

		this.geometries = {
			drop: new THREE.BoxGeometry(0.1, 0.1, 0.05)
		}

		this.mesh = new THREE.Object3D()
		this.mesh.name = 'drop'
		this.meshes = []

		this.speed = 0
		this.lifespan = random(50, 100)

		// init

		this.init()

	}

	init() {

		this.mesh = new THREE.Mesh(this.geometries.drop, this.materials.water)

		let pos = {
			x: Math.random(0.1, 0.9),
			y: 0.1,
			z: 1 + (Math.random() - 0.5) * 0.1
		}

		this.mesh.position.set(pos.x, pos.y, pos.z)

		SCENE.add(this.mesh)

	}

	update() {

		this.speed += 0.0007
		this.lifespan--

		this.mesh.position.x += (0.5 - this.mesh.position.x) / 70
		this.mesh.position.y -= this.speed

		this.mesh.scale.x -= 0.002
		this.mesh.scale.y -= 0.002
		this.mesh.scale.z -= 0.002

	}

}
