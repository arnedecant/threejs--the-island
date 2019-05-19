'use strict'

import Grassland from './grassland.js'
import Bridge from './bridge.js'

export default class Island {

	constructor() {

		// set properties
		
		this.materials = {}
		this.mesh = new THREE.Object3D()
		this.meshes = []

		// init

		this.init()

	}

	init() {

		this.createGrassland()
		this.createBridge()

	}

	createGrassland() {

		this.grassland = new Grassland()
		this.mesh.add(this.grassland.mesh)

	}

	createBridge() {

		this.bridge = new Bridge()
		this.mesh.add(this.bridge.mesh)

	}

}
