'use strict'

import Pilot from './pilot.js'

export default class Airplane {

	constructor(colors) {

		// set properties
		this.colors = colors

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D()

		// init
		this.init()

	}

	init() {

		this.createCabin()
		this.createEngine()
		this.createTail()
		this.createWing()
		this.createPropeller()
		this.createWheelsProtection()
		this.createWheels()

		this.createPilot()

		// this.mesh.castShadow = true
		// this.mesh.receiveShadow = true

	}

	createCabin() {

		let geometry = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		geometry.vertices[4].y -= 10
		geometry.vertices[4].z += 20
		geometry.vertices[5].y -= 10
		geometry.vertices[5].z -= 20
		geometry.vertices[6].y += 30
		geometry.vertices[6].z += 20
		geometry.vertices[7].y += 30
		geometry.vertices[7].z -= 20

		let cabin = new THREE.Mesh(geometry, material)

		cabin.castShadow = true
		cabin.receiveShadow = true

		this.mesh.add(cabin)

	}

	createEngine() {

		let geometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.white,
			flatShading: true
		})

		let engine = new THREE.Mesh(geometry, material)

		engine.position.x = 40

		engine.castShadow = true
		engine.receiveShadow = true

		this.mesh.add(engine)

	}

	createTail() {

		let geometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let tail = new THREE.Mesh(geometry, material)

		tail.position.set(-40, 20, 0)

		tail.castShadow = true
		tail.receiveShadow = true

		this.mesh.add(tail)

	}

	createWing() {

		let geometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let wing = new THREE.Mesh(geometry, material)

		wing.castShadow = true
		wing.receiveShadow = true

		this.mesh.add(wing)

	}

	createPropeller() {

		let geometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.brown,
			flatShading: true
		})

		this.propeller = new THREE.Mesh(geometry, material)

		let blade = this.createBlade()
		this.propeller.add(blade)

		this.propeller.position.set(50, 0, 0)

		this.mesh.add(this.propeller)

	}

	createBlade() {

		let geometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.black,
			flatShading: true
		})

		let blade = new THREE.Mesh(geometry, material)

		blade.position.set(8, 0, 0)

		blade.castShadow = true
		blade.receiveShadow = true

		return blade

	}

	createPilot() {

		// create new object
		this.pilot = new Pilot(this.colors)

		// set its position
		this.pilot.mesh.position.set(-10, 27, 0)

		// add the pilot to the mesh
		this.mesh.add(this.pilot.mesh)

	}

	createWheelsProtection() {

		let geometry = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1)
		let material = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		let protectionR = new THREE.Mesh(geometry, material)
		protectionR.position.set(25, -20, 25)

		let protectionL = protectionR.clone()
		protectionL.position.z = 0 - protectionR.position.z

		this.mesh.add(protectionR)
		this.mesh.add(protectionL)

	}

	createWheels() {

		// create new group
		let wheels = new THREE.Object3D()

		// create a tire
		let tireGeometry = new THREE.CylinderGeometry(12, 12, 6, 12)
		let tireMaterial = new THREE.MeshPhongMaterial({
			color: this.colors.black,
			flatShading: true
		})

		let tireR = new THREE.Mesh(tireGeometry, tireMaterial)
		tireR.position.set(25, -28, 25)
		tireR.rotation.x = Math.PI / 2

		// create a tire axis
		let axisGeometry = new THREE.CylinderGeometry(4, 4, 7, 12)
		let axisMaterial = new THREE.MeshPhongMaterial({
			color: this.colors.brown,
			flatShading: true
		})

		let axisR = new THREE.Mesh(axisGeometry, axisMaterial)

		// add axis to tire
		tireR.add(axisR)

		// add tire to group
		wheels.add(tireR)

		// clone a tire: left
		let tireL = tireR.clone()
		tireL.position.z = 0 - tireR.position.z
		wheels.add(tireL)

		// clone a tire: back
		let tireB = tireR.clone()
		tireB.scale.set(0.5, 0.5, 0.5)
		tireB.position.set(-35, -5, 0)
		wheels.add(tireB)

		// add back suspension
		let suspensionGeometry = new THREE.BoxGeometry(4, 20, 4)
		let suspensionMaterial = new THREE.MeshPhongMaterial({
			color: this.colors.red,
			flatShading: true
		})

		suspensionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0))

		let suspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial)

		suspension.position.set(-35,-5,0);
		suspension.rotation.z = -.3;

		// add suspension to group
		wheels.add(suspension);

		// add group to parent mesh
		this.mesh.add(wheels)

	}

}
