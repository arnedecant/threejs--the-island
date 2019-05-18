'use strict'

export default class Cloud {

	constructor(color) {

		// set properties
		this.color = color

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D()

		// create one cube which will be duplicated to create the cloud
		this.geometry = new THREE.BoxGeometry(20, 20, 20)

		// create the material
		this.material = new THREE.MeshPhongMaterial({
			color: this.color
		})

		// init
		this.init()

	}

	init() {

		// define a random number of cubes
		const amount = 3 + Math.floor(Math.random() * 3)

		// duplicate the geometry
		for (let i = 0; i < amount; i++) {

			// create the mesh
			let mesh = new THREE.Mesh(this.geometry, this.material)

			// set position and rotation
			mesh.position.x = i * 15
			mesh.position.y = Math.random() * 10
			mesh.position.z = Math.random() * 10
			mesh.rotation.z = Math.random() * Math.PI * 2
			mesh.rotation.y = Math.random() * Math.PI * 2

			// set cube sizes
			let size = 0.1 + Math.random() * 0.9
			mesh.scale.set(size, size, size)

			// allow shadows
			mesh.castShadow = true
			mesh.receiveShadow = true

			this.mesh.add(mesh)

		}

	}

}
