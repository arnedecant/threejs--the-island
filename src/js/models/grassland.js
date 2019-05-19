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

	createRiver() {

		let geometry = new THREE.BoxGeometry(1, 0.15, 2)
		let mesh = new THREE.Mesh(geometry, this.materials.river)

		mesh.position.set(0.5, 0.1, 0)

		this.meshes.push({type: 'river', mesh: mesh})

	}

	createGrass() {

		let geometry = new THREE.Geometry()
		let meshes = []

		meshes.push(this.createGrassLeft())
		meshes.push(this.createGrassBack())
		meshes.push(this.createRiverBed())
		meshes.push(this.createGrassRight())

		meshes.forEach((obj) => {

			obj.mesh.updateMatrix()
			geometry.merge(obj.mesh.geometry, obj.mesh.matrix);

		})

		let mesh = new THREE.Mesh(geometry, this.materials.grass)

		this.meshes.push({ type: 'grass', mesh: mesh })

	}

	createGrassLeft() {

		let geometry = new THREE.BoxGeometry(2, 0.2, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(-1, 0.1, 0)

		return { type: 'grass', mesh: mesh }

	}

	createGrassBack() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 0.2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(0.5, 0.1, -0.9)

		return { type: 'grass', mesh: mesh }

	}

	createRiverBed() {

		let geometry = new THREE.BoxGeometry(1, 0.05, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(0.5, 0.025, 0)

		return {type: 'grass', mesh: mesh}

	}

	createGrassRight() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(1.5, 0.1, 0)

		return {type: 'grass', mesh: mesh}

	}

}
