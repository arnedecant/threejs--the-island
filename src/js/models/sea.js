'use strict'

export default class Sea {

	constructor(color) {

		// set properties
		this.color = color
		this.waves = []

		// init
		this.init()

	}

	init() {

		// create the shape
		this.geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10)

		// create the matrix to rotate the shape on the x-axis
		this.matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2)

		// apply the matrix to the shape
		this.geometry.applyMatrix(this.matrix)

		// by merging vertices we ensure the continuity of the waves
		this.geometry.mergeVertices()

		// store vertices data
		for (let i = 0, v; v = this.geometry.vertices[i]; i++) {

			this.waves.push({
				x: v.x,
				y: v.y,
				z: v.z,
				angle: Math.random() * Math.PI * 2,		// a random angle
				amplitude: 5 + Math.random() * 15,		// a random distance
				speed: 0.016 + Math.random() * 0.032	// a random speed, between 0.016 and 0.048 radians / frame
			})

		}

		// create the material
		this.material = new THREE.MeshPhongMaterial({
			color: this.color,
			transparent: true,
			opacity: 0.8,
			flatShading: true
		})

		// createthe mesh
		this.mesh = new THREE.Mesh(this.geometry, this.material)

		// allow shadows
		this.mesh.receiveShadow = true

	}

	moveWaves() {

		// get all vertices
		let vertices = this.mesh.geometry.vertices

		// manipulate vertices
		for (let i = 0, v; v = vertices[i]; i++) {

			// get data associated to the vertex
			let vprops = this.waves[i]

			// update vertex position
			v.x = vprops.x + Math.cos(vprops.angle) * vprops.amplitude
			v.y = vprops.y + Math.sin(vprops.angle) * vprops.amplitude

			// increment the angle for the next frame
			vprops.angle += vprops.speed

		}

		// tell the renderer that the geometry of the sea has changed
		this.mesh.geometry.verticesNeedUpdate = true

		// rotate sea
		this.mesh.rotation.z += 0.005

	}

}
