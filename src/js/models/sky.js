'use strict'

import Cloud from './cloud.js'

export default class Sky {

	constructor(nClouds = 20) {

		// set properties
		// ...

		// create an empty container
		this.mesh = new THREE.Object3D()

		// amount of clouds
		this.nClouds = nClouds

		// place clouds at an angle
		this.stepAngle = Math.PI * 2 / this.nClouds

		// init
		this.init()

	}

	init() {

		// generate clouds
		for (let i = 0; i < this.nClouds; i++) {

			// create new cloud
			let c = new Cloud()

			// set rotation and position using trigonometry
			let a = this.stepAngle * i
			let h = 750 + Math.random() * 200

			// convert polar coordinates (angle & distance) to Cartesian coordinates (x, y)
			c.mesh.position.x = Math.cos(a) * h
			c.mesh.position.y = Math.sin(a) * h

			// give cloud a random depth
			c.mesh.position.z = -400 - Math.random() * 400

			// rotate cloud according to its position
			c.mesh.rotation.z = a + Math.PI / 2

			// add random scale
			let s = 1 + Math.random() * 2
			c.mesh.scale.set(s, s, s)

			// apply the new mesh
			this.mesh.add(c.mesh)

		}

	}

}
