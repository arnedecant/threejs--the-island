'use strict'

import { shadow } from '../utilities/three.js'

export default class Bridge {

	constructor() {

		// set properties

		this.materials = {
			wood: new THREE.MeshPhongMaterial({ color: COLORS.brown })
		}

		this.geometries = {
			block: new THREE.BoxGeometry(0.04, 0.3, 0.04),
			plank: new THREE.BoxGeometry(0.15, 0.02, 0.4),
			rail: new THREE.BoxGeometry(1.2, 0.04, 0.04)
		}

		this.mesh = new THREE.Object3D()
		this.meshes = []

		// init

		this.init()

	}

	init() {

		this.createBase()
		this.createRails()

		this.meshes.forEach((obj) => {

			obj.mesh.castShadow = true
			obj.mesh.receiveShadow = true

			this.mesh.add(obj.mesh)

		})

	}

	createBase() {

		for (let i = 0; i < 6; i++) {

			let mesh = new THREE.Mesh(this.geometries.plank, this.materials.wood)

			mesh.position.set(0.2 * i, 0.21, 0.2)

			this.meshes.push({ type: 'block', mesh: mesh })

		}

	}

	createRails() {

		let rail1 = this.addRail()
		let rail2 = this.addRail()

		rail2.mesh.position.set(0, 0, -0.4)

		// shadow1 = shadow(rail1.mesh, 0.2)
		// shadow2 = shadow(rail2.mesh, 0.2)

		this.meshes.push(rail1)
		this.meshes.push(rail2)
		// this.meshes.push(shadow1)
		// this.meshes.push(shadow2)

	}

	addRail() {

		let geometry = new THREE.Geometry()
		let meshes = []

		let block1 = new THREE.Mesh(this.geometries.block, this.materials.wood)
		let block2 = new THREE.Mesh(this.geometries.block, this.materials.wood)
		let rail = new THREE.Mesh(this.geometries.rail, this.materials.wood)

		block1.position.set(-0.1, 0.35, 0.4)
		block2.position.set(1.1, 0.35, 0.4)
		rail.position.set(0.5, 0.42, 0.4)

		meshes.push({ type: 'block', mesh: block1 })
		meshes.push({ type: 'block', mesh: block2 })
		meshes.push({ type: 'rail', mesh: rail })

		meshes.forEach((obj) => {

			obj.mesh.updateMatrix()
			geometry.merge(obj.mesh.geometry, obj.mesh.matrix);

		})

		let mesh = new THREE.Mesh(geometry, this.materials.wood)

		return { type: 'rail', mesh: mesh }

	}

}
