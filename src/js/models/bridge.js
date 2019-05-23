'use strict'

import { shadow } from '../utilities/three.js'

export default class Bridge {

	constructor(animation = true) {

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

		this.init(animation)

	}

	init(animation) {

		this.createRails()
		this.createBase(500)

		this.meshes.forEach((obj) => {

			if (!obj.delay) obj.delay = 0

			obj.mesh.castShadow = true
			obj.mesh.receiveShadow = true

			setTimeout(() => {

				this.mesh.add(obj.mesh)
				if (obj.animate) TweenMax.to(obj.mesh.position, 0.2, obj.animate.position)

			}, obj.delay)

		})

	}

	createBase(baseDelay) {

		for (let i = 0; i < 6; i++) {

			let mesh = new THREE.Mesh(this.geometries.plank, this.materials.wood)

			mesh.position.set(0.2 * i, 1.72, 0.2)

			this.meshes.push({
				type: 'block',
				mesh: mesh,
				delay: baseDelay + (i * 150),
				animate: {
					position: { x: 0.2 * i, y: 0.21, z: 0.2 }
				}
			})

		}

	}

	createRails() {

		let rails = []

		rails.push(this.addRail())
		rails.push(this.addRail(0, 0, -0.4))

		rails.forEach((obj, index) => {

			console.log(obj, index)

			obj.delay = index * 250
			obj.animate = {
				position: {x: obj.mesh.position.x, y: obj.mesh.position.y, z: obj.mesh.position.z}
			}

			obj.mesh.position.y += 1.5

			this.meshes.push(obj)

			console.log(obj)

		})

		// shadow1 = shadow(rail1.mesh, 0.2)
		// shadow2 = shadow(rail2.mesh, 0.2)

		// this.meshes.push(shadow1)
		// this.meshes.push(shadow2)

	}

	addRail(x = 0, y = 0, z = 0) {

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
		mesh.position.set(x, y, z)

		return { type: 'rail', mesh: mesh }

	}

}
