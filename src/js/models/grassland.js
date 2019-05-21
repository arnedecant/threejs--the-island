'use strict'

export default class Grassland {

	constructor() {

		// set properties

		this.materials = {
			grass: new THREE.MeshPhongMaterial({ color: COLORS.greenLight }),
			water: new THREE.MeshPhongMaterial({ color: COLORS.blue, transparent: true, opacity: 0.8 })
		}

		this.mesh = new THREE.Object3D()
		this.mesh.name = 'grassland'
		this.meshes = []

		// init

		this.init()

	}

	init() {

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
		let mesh = new THREE.Mesh(geometry, this.materials.water)

		mesh.position.set(0.5, 0.1, 0)
		mesh.name = 'grassland--river'

		this.meshes.push({type: 'river', mesh: mesh})

	}

	createGrass() {

		let geometry = new THREE.Geometry()
		let meshes = []

		meshes.push(this.addGrassLeft())
		meshes.push(this.addGrassBack())
		meshes.push(this.addRiverbed())
		meshes.push(this.addGrassRight())

		meshes.forEach((obj) => {

			obj.mesh.updateMatrix()
			geometry.merge(obj.mesh.geometry, obj.mesh.matrix);

		})

		let mesh = new THREE.Mesh(geometry, this.materials.grass)
		mesh.name = 'grassland--grass'

		this.meshes.push({ type: 'grass', mesh: mesh })

	}

	addGrassLeft() {

		let geometry = new THREE.BoxGeometry(2, 0.2, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(-1, 0.1, 0)

		return { type: 'grass', mesh: mesh }

	}

	addGrassBack() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 0.2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(0.5, 0.1, -0.9)

		return { type: 'grass', mesh: mesh }

	}

	addRiverbed() {

		let geometry = new THREE.BoxGeometry(1, 0.05, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(0.5, 0.025, 0)

		return {type: 'grass', mesh: mesh}

	}

	addGrassRight() {

		let geometry = new THREE.BoxGeometry(1, 0.2, 2)
		let mesh = new THREE.Mesh(geometry)

		mesh.position.set(1.5, 0.1, 0)

		return {type: 'grass', mesh: mesh}

	}

}
