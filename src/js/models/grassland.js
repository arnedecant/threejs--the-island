'use strict'

export default class Grassland {

	constructor() {

		// set properties
		// ...

		// create an empty container that will hold the different parts of the island
		this.mesh = new THREE.Object3D()
		this.meshes = []

		// init
		this.init()

	}

	init() {

		this.material = new THREE.MeshPhongMaterial({
			color: COLORS.greenLight,
			flatShading: true
		})

		this.createGrassLeft()
		this.createRiverBed()
		this.createGrassRight()

		this.meshes.forEach((mesh) => {

			mesh.castShadow = true
			mesh.receiveShadow = true

			this.mesh.add(mesh)

		})

	}

	createGrassLeft() {

		let geometry = new THREE.BoxGeometry(2, 0.2, 2)
		let grassLeft = new THREE.Mesh(geometry, this.material)

		grassLeft.position.set(-1, 0.1, 0)

		this.meshes.push(grassLeft)

	}

	createRiverBed() {

		let geometry = new THREE.BoxGeometry(1, 0.05, 2)
		let riverbed = new THREE.Mesh(geometry, this.material)

		riverbed.position.set(0.5, 0.025, 0)

		this.meshes.push(riverbed)

	}

	createGrassRight() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 2)
		let grassRight = new THREE.Mesh(geometry,this.material)

		grassRight.position.set(1.5, 0.1, 0)

		this.meshes.push(grassRight)

	}

}
