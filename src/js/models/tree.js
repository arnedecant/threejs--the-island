'use strict'

export default class Tree {

	constructor(x = 0, y = 0, z = 0) {

		// set properties

		this.position = { x, y, z }

		this.materials = {
			trunk: new THREE.MeshLambertMaterial({ color: COLORS.brownDark }),
			leaves: new THREE.MeshLambertMaterial({ color: COLORS.green })
		}

		this.geometries = {
			trunk: new THREE.BoxGeometry(0.15, 0.15, 0.15),
			leaves: new THREE.BoxGeometry(0.25, 0.4, 0.25)
		}

		this.mesh = new THREE.Object3D()
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

	}

	createTrunk() {

		let mesh = new THREE.Mesh(this.geometries.trunk, this.materials.trunk)
  		mesh.position.set(this.position.x, 0.275, this.position.z)

		this.meshes.push({ type: 'trunk', mesh: mesh })

	}

	createLeaves() {

		let mesh = new THREE.Mesh(this.geometries.leaves, this.materials.leaves)
  		mesh.position.set(this.position.x, 0.55, this.position.z)

		this.meshes.push({ type: 'leaves', mesh: mesh })

	}

}
