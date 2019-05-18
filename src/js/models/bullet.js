'use strict'

export default class Bullet {

	constructor(color, position) {

		// set properties
		this.color = color
		this.position = position || {
			x: 0,
			y: 0,
			z: 0
		}

		// init
		this.init()

	}

	init() {

		this.geometry = new THREE.BoxGeometry(3, 0.5, 0.5)
		this.material = new THREE.MeshPhongMaterial({
			color: this.color
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)

		let x = this.position.x,
			y = this.position.y,
			z = this.position.z

		this.mesh.position.set(x, y, z)

	}

	setPosition() {

	}

	render() {

		// nothing to see here

	}

}
