'use strict'

import Grassland from './grassland.js'
import Bridge from './bridge.js'
import Tree from './tree.js'
import { random } from '../utilities/math.js'

export default class Island {

	constructor() {

		// set properties

		this.materials = {}
		this.mesh = new THREE.Object3D()
		this.mesh.name = 'island'
		this.meshes = []

		// init

		this.init()

	}

	init() {

		this.createGrassland()
		this.createBridge()
		this.createTrees(10)

	}

	createGrassland() {

		this.grassland = new Grassland()
		this.mesh.add(this.grassland.mesh)

	}

	createBridge() {

		this.bridge = new Bridge()
		this.mesh.add(this.bridge.mesh)

	}

	createTrees(amount = 10) {

		this.trees = []

		for (let i = 0; i < amount; i++) {

			// x: random - between (-1.75 and -0.5) and (1.5 and 1.75)
			// y: fixed  - 0.275
			// z: random - between (-0.75 and 0.75)

			let pos = {
				x: random(-1.75, 1.75),
				y: 0.275,
				z: random(-0.75, 0.75)
			}

			let scale = random(0.75, 1.25)

			while (pos.x > -0.5 && pos.x < 1.5) pos.x = random(-1.75, 1.75)

			let tree = new Tree(pos, scale)

			this.trees.push(tree)
			this.mesh.add(tree.mesh)

		}

	}

}
