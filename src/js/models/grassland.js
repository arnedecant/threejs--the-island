'use strict'

export default class Grassland {

	constructor() {

		// set properties
		// ...

		// create an empty container that will hold the different parts of the grassland
		this.mesh = new THREE.Object3D()
		this.meshes = []

		// init
		this.init()

	}

	init() {

		this.materials = {
			grass: new THREE.MeshPhongMaterial({
				color: COLORS.greenLight,
				flatShading: true
			}),
			river: new THREE.MeshPhongMaterial({
				color: COLORS.blue,
				flatShading: true
			})
		}

		this.createGrass()
		this.createRiver()

		this.meshes.forEach((obj) => {

			obj.mesh.castShadow = true
			obj.mesh.receiveShadow = true

			this.mesh.add(obj.mesh)

		})

	}

	createGrass() {

		this.grass = new THREE.Geometry()

		this.createGrassLeft()
		this.createGrassBack()
		this.createRiverBed()
		this.createGrassRight()
		
	}

	createGrassLeft() {

		let geometry = new THREE.BoxGeometry(2, 0.2, 2)
		let grassLeft = new THREE.Mesh(geometry, this.materials.grass)

		grassLeft.position.set(-1, 0.1, 0)

		this.meshes.push({type: 'grass', mesh: grassLeft})

	}

	createGrassBack() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 0.2)
		let grassBack = new THREE.Mesh(geometry, this.materials.grass)

		grassBack.position.set(0.5, 0.1, -0.9)

		this.meshes.push({type: 'grass', mesh: grassBack})

	}

	createRiverBed() {

		let geometry = new THREE.BoxGeometry(1, 0.05, 2)
		let riverbed = new THREE.Mesh(geometry, this.materials.grass)

		riverbed.position.set(0.5, 0.025, 0)

		this.meshes.push({type: 'grass', mesh: riverbed})

	}

	createGrassRight() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 2)
		let grassRight = new THREE.Mesh(geometry,this.materials.grass)

		grassRight.position.set(1.5, 0.1, 0)

		this.meshes.push({type: 'grass', mesh: grassRight})

	}

	createRiver() {

		let geometry = new THREE.BoxGeometry(1, 0.15, 2)
		let river = new THREE.Mesh(geometry, this.materials.river)

		river.position.set(0.5, 0.1, 0)

		this.meshes.push({type: 'river', mesh: river})

	}

}
