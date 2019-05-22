'use strict'

export default class Tree {

	constructor(position = { x: 0, y: 0, z: 0 }, scale = 1) {

		// set properties

		this.position = position
		this.scale = scale

		this.materials = {
			trunk: new THREE.MeshLambertMaterial({ color: COLORS.brownDark }),
			leaves: new THREE.MeshLambertMaterial({ color: COLORS.green })
		}

		this.geometries = {
			trunk: new THREE.BoxGeometry(0.15, 0.15, 0.15),
			leaves: new THREE.BoxGeometry(0.25, 0.4, 0.25)
		}

		this.mesh = new THREE.Object3D()
		this.mesh.name = 'tree'
		this.meshes = []

		// init

		this.init()

	}

	init() {

		this.createTrunk()
		this.createLeaves()

		this.meshes.forEach((obj) => {

			obj.mesh.castShadow = true
			obj.mesh.receiveShadow = true

			this.mesh.add(obj.mesh)

		})

		let { x, y, z } = this.position
		this.mesh.position.set(x, y, z)
		this.mesh.scale.set(this.scale, this.scale, this.scale)
		this.uuid = this.mesh.uuid

	}

	createTrunk() {

		let mesh = new THREE.Mesh(this.geometries.trunk, this.materials.trunk)
  		mesh.name = 'tree--trunk'

		this.meshes.push({ type: 'trunk', mesh: mesh })

	}

	createLeaves() {

		let mesh = new THREE.Mesh(this.geometries.leaves, this.materials.leaves)
  		mesh.position.y = 0.275
  		mesh.name = 'tree--leaves'

		this.meshes.push({ type: 'leaves', mesh: mesh })

	}

	grow(scale = 1) {

		TweenMax.to(this.mesh.scale, 0.5, { x: scale, y: scale, z: scale });

	}

	despawn() {

		// TODO: animation

	}

}
