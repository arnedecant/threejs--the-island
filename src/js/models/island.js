'use strict'

import Grassland from './grassland.js'
import Bridge from './bridge.js'
import Tree from './tree.js'
import Drop from './drop.js'
import { random } from '../utilities/math.js'

export default class Island {

	constructor() {

		// set properties

		this.materials = {}
		this.mesh = new THREE.Object3D()
		this.mesh.name = 'island'
		this.meshes = []
		this.drops = []
		this.count = 0
		this.delay = 200

		// init

		this.init()

	}

	init() {

		let amount = 10
		// let bridgeDelay = (amount + 1) * this.delay
		let bridgeDelay = 0

		this.createGrassland()
		this.createTrees(amount)
		this.createBridge(bridgeDelay)

	}

	createGrassland() {

		this.grassland = new Grassland()
		this.mesh.add(this.grassland.mesh)

	}

	createBridge(delay = 0) {

		setTimeout(() => {

			this.bridge = new Bridge()
			this.mesh.add(this.bridge.mesh)

		}, delay)

	}

	createTrees(amount = 10) {

		this.trees = []

		for (let i = 0; i < amount; i++) {

			setTimeout(() => {

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

				let tree = new Tree(pos, 0.2)
				tree.grow(scale)

				this.trees.push(tree)
				SCENE.add(tree.mesh)

			}, this.delay * i)

		}

	}

	render() {

		if (this.count % 5 == 0) {
			for (let i = 0; i < 5; i++) this.drops.push(new Drop())
		}

		this.count++

		this.drops.forEach((drop, index) => {

			drop.update()

			if (drop.lifespan > 0) return

			SCENE.remove(SCENE.getObjectById(drop.mesh.id))
			this.drops.splice(index, 1)

		})

	}

}
