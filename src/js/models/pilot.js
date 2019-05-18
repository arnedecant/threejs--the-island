'use strict'

export default class Pilot {

	constructor(colors) {

		// set properties
		this.colors = colors
		this.angleHair = 0

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D()
		this.mesh.name = 'pilot'

		// init
		this.init()

	}

	init() {

		this.createBody()
		this.createFace()

	}

	createBody() {

		let geometry = new THREE.BoxGeometry(15, 15, 15)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.brown,
			flatShading: true
		})

		let body = new THREE.Mesh(geometry, material)

		body.position.set(2, -12, 0)

		this.mesh.add(body)

	}

	createFace() {

		let geometry = new THREE.BoxGeometry(10, 10, 10)
		let material = new THREE.MeshLambertMaterial({
			color: this.colors.orange
		})

		let face = new THREE.Mesh(geometry, material)

		this.mesh.add(face)

		this.createHair()
		this.createGlasses()
		this.createEars(material)

	}

	createHair() {

		let geometry = new THREE.BoxGeometry(4, 4, 4)
		let material = new THREE.MeshLambertMaterial({
			color: this.colors.brown
		})

		let hair = new THREE.Mesh(geometry, material)

		// align the shape of the hair to its bottom boundary, that will make it easier to scale
		let matrix = new THREE.Matrix4().makeTranslation(0, 2, 0)
		hair.geometry.applyMatrix(matrix)

		// hair container
		let hairs = new THREE.Object3D()

		// animated hairs
		this.hairs = new THREE.Object3D()

		// create hairs at top of the head
		// and position them on a 3 x 4 grid
		for (let i = 0; i < 12; i++) {

			// clone a new hair
			let h = hair.clone()

			// determine row & column
			let col = i % 3,
				row = Math.floor(i / 3)

			// define start positions
			let startPos = {
				x: -4,
				z: -4
			}

			// calculate new positions
			let newPos = {
				x: startPos.x + row * 4,
				z: startPos.z + col * 4
			}

			// apply new positions
			h.position.set(newPos.x, 0, newPos.z)

			// add hair to the mesh
			this.hairs.add(h)

		}

		// add animatable hairs to the hair mesh
		hairs.add(this.hairs)

		hairs = this.addHairsSide(hairs, material)
		hairs = this.addHairsBack(hairs, material)

		hairs.position.set(-5, 5, 0)

		this.mesh.add(hairs)

	}

	addHairsSide(hairs, material) {

		let geometry = new THREE.BoxGeometry(12, 4, 2)

		let matrix = new THREE.Matrix4().makeTranslation(-6, 0, 0)
		geometry.applyMatrix(matrix)

		let r = new THREE.Mesh(geometry, material)
		let l = r.clone()

		r.position.set(8, -2, 6)
		l.position.set(8, -2, -6)

		hairs.add(r)
		hairs.add(l)

		return hairs

	}

	addHairsBack(hairs, material) {

		let geometry = new THREE.BoxGeometry(2, 8, 10)
		let hair = new THREE.Mesh(geometry, material)

		hair.position.set(-1, -4, 0)

		hairs.add(hair)

		return hairs

	}

	createGlasses() {

		let geometry = new THREE.BoxGeometry(5, 5, 5)
		let material = new THREE.MeshLambertMaterial({
			color: this.colors.brown
		})

		let glassR = new THREE.Mesh(geometry, material)
		let glassL = glassR.clone()

		glassR.position.set(6, 0, 3)
		glassL.position.set(6, 0, -3)

		let geometryGlassA = new THREE.BoxGeometry(11, 1, 11)
		let glassA = new THREE.Mesh(geometryGlassA, material)

		this.mesh.add(glassR)
		this.mesh.add(glassL)
		this.mesh.add(glassA)

	}

	createEars(material) {

		let geometry = new THREE.BoxGeometry(2, 3, 2)

		let earR = new THREE.Mesh(geometry, material)
		let earL = earR.clone()

		earR.position.set(0, 0, 6)
		earL.position.set(0, 0, -6)

		this.mesh.add(earR)
		this.mesh.add(earL)

	}

	updateHairs() {

		let hairs = this.hairs.children

		for (let i = 0, h; h = hairs[i]; i++) {
			h.scale.y = 0.75 + Math.cos(this.angleHair + i / 3) * 0.25
		}

		this.angleHair += 0.16

	}

}
