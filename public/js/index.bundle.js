/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normalize = normalize;
exports.random = random;
function normalize(v, vmin, vmax, tmin, tmax) {

	var nv = Math.max(Math.min(v, vmax), vmin);
	var dv = vmax - vmin;
	var pc = (nv - vmin) / dv;
	var dt = tmax - tmin;
	var tv = tmin + pc * dt;

	return tv;
}
function random(min, max) {
	var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;


	return (Math.random() * (max - min) + min).toFixed(decimals);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -------------------------------------------------------------------
// :: APP
// -------------------------------------------------------------------

// import * as data from '../assets/data.json'


var _math = __webpack_require__(0);

var _island = __webpack_require__(2);

var _island2 = _interopRequireDefault(_island);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		window.COLORS = {
			cyan: 0x248079,
			brown: 0xA98F78,
			brownDark: 0x9A6169,
			green: 0x65BB61,
			greenLight: 0xABD66A,
			blue: 0x6BC6FF

			// set properties

		};this.config = {
			debug: true,
			camera: {
				zpf: 5, // zoom per frame
				default: { x: -2.5, y: 3, z: 4 },
				// default: { x: -1.25, y: 1.5, z: 2 },
				min: { x: 0, y: 0, z: 0 },
				max: { x: 0, y: 1000, z: 1000 }
			}
		};

		this.zoom = 1;
		this.scrollSpeed = 0;
		this.mouse = { x: 0, y: 0

			// init

		};this.init();
	}

	_createClass(App, [{
		key: 'init',
		value: function init() {

			// skip if there's no THREE

			if (!THREE) return;

			// set up scene, camera and renderer

			this.createScene();

			// add lights

			this.createLights();

			// add objects

			this.createIsland();

			// add events

			window.addEventListener('resize', this.resize.bind(this), false);
			window.addEventListener('mousemove', this.mousemove.bind(this), false);
			window.addEventListener('mousedown', this.mousedown.bind(this), false);
			window.addEventListener('mouseup', this.mouseup.bind(this), false);
			window.addEventListener('mousewheel', this.scroll.bind(this), { passive: true });

			// render

			this.render();
		}
	}, {
		key: 'createScene',
		value: function createScene() {

			// set width & height

			this.height = window.innerHeight;
			this.width = window.innerWidth;

			// create new scene

			this.scene = new THREE.Scene();

			// add fog to the scene

			this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

			// create the camera

			this.createCamera();

			// create the renderer

			this.createRenderer();

			// add debug helpers

			if (this.config.debug) this.initDebug();
		}
	}, {
		key: 'initDebug',
		value: function initDebug() {

			var axesHelper = new THREE.AxesHelper(5);
			this.scene.add(axesHelper);
		}
	}, {
		key: 'createCamera',
		value: function createCamera() {

			// set values to init the camera

			this.aspectRatio = this.width / this.height;
			this.fieldOfView = 60;
			this.nearPlane = 1;
			this.farPlane = 10000;

			// create a new camera

			this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearPlane, this.farPlane);

			// set camera position

			this.camera.position.x = this.config.camera.default.x;
			this.camera.position.y = this.config.camera.default.y;
			this.camera.position.z = this.config.camera.default.z;

			this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}
	}, {
		key: 'createRenderer',
		value: function createRenderer() {

			// create new renderer

			this.renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true
			});

			// set the size

			this.renderer.setSize(this.width, this.height);

			// enable shadowMap

			this.renderer.shadowMap.enabled = true;

			// support for HDPI displays

			this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

			// append to DOM

			this.container = document.querySelector('#world');
			this.container.appendChild(this.renderer.domElement);
		}
	}, {
		key: 'createLights',
		value: function createLights() {

			// create a new ambient light

			this.light = new THREE.AmbientLight(0xffffff, 0.5);

			// create a new shadow light

			this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
			this.shadowLight.position.set(200, 200, 200);
			this.shadowLight.castShadow = true;

			// create a new back light

			this.backLight = new THREE.DirectionalLight(0xffffff, 0.2);
			this.backLight.position.set(-100, 200, 50);
			this.backLight.castShadow = true;

			// add lights to the scene

			this.scene.add(this.light);
			this.scene.add(this.shadowLight);
			this.scene.add(this.backLight);
		}
	}, {
		key: 'createIsland',
		value: function createIsland() {

			// create new object

			this.island = new _island2.default();

			// add the island to the scene

			this.scene.add(this.island.mesh);
			this.scene.updateMatrixWorld(true);
		}
	}, {
		key: 'updateZoom',
		value: function updateZoom() {

			// no need to zoom when scrollSpeed hasn't been updated

			if (this.scrollSpeed == 0) return;

			// zoom per frame

			var zpf = this.config.camera.zpf;

			// min & max values

			var zMin = this.config.camera.min.z,
			    zMax = this.config.camera.max.z;

			// smoother scrolling at the end of the animation
			// prevents zooms very small values, for example 1.2 ...

			if (Math.abs(this.scrollSpeed) < 2 * zpf) {
				zpf = zpf / 2;
			}

			// redefine the zoom per frame

			if (this.scrollSpeed > 0) {

				// zoom out

				if (this.scrollSpeed < zpf) {
					zpf = this.scrollSpeed;
					this.scrollSpeed = 0;
				} else {
					this.scrollSpeed -= zpf;
				}
			} else if (this.scrollSpeed < 0) {

				// zoom in

				if (this.scrollSpeed > -zpf) {
					zpf = this.scrollSpeed;
					this.scrollSpeed = 0;
				} else {
					this.scrollSpeed += zpf;
					zpf = -zpf;
				}
			}

			// get new z-pos

			var z = this.camera.position.z + zpf;

			// set boundaries for z-pos

			z = z > zMin ? z : zMin;
			z = z < zMax ? z : zMax;

			// apply position if it's above threshold

			this.camera.position.z = z;
		}
	}, {
		key: 'scroll',
		value: function scroll(e) {

			// only store the scroll value
			// zoom will be handled in the render function

			this.scrollSpeed = e.deltaY / 2;
		}
	}, {
		key: 'mousemove',
		value: function mousemove(e) {

			// convert mouse position to a normalized value between -1 and 1

			var tx = -1 + e.clientX / this.width * 2; // x-axis
			var ty = 1 - e.clientY / this.height * 2; // y-axis

			// apply converted values

			this.mouse = {
				x: tx,
				y: ty
			};
		}
	}, {
		key: 'mousedown',
		value: function mousedown(e) {

			this.shooting = true;
		}
	}, {
		key: 'mouseup',
		value: function mouseup(e) {

			this.shooting = false;
		}
	}, {
		key: 'resize',
		value: function resize(e) {

			// set canvas dimensions

			this.width = window.innerWidth;
			this.height = window.innerHeight;

			// set renderer dimensions

			this.renderer.setSize(this.width, this.height);

			// set camera

			this.aspectRatio = this.width / this.height;
			this.camera.aspect = this.aspectRatio;
			this.camera.updateProjectionMatrix();

			// render

			// this.render()
		}
	}, {
		key: 'render',
		value: function render() {

			// update zoom

			this.updateZoom();

			// render

			this.renderer.render(this.scene, this.camera);

			// add self to the requestAnimationFrame

			window.requestAnimationFrame(this.render.bind(this));
		}
	}]);

	return App;
}();

exports.default = new App();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grassland = __webpack_require__(3);

var _grassland2 = _interopRequireDefault(_grassland);

var _bridge = __webpack_require__(4);

var _bridge2 = _interopRequireDefault(_bridge);

var _tree = __webpack_require__(6);

var _tree2 = _interopRequireDefault(_tree);

var _math = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Island = function () {
	function Island() {
		_classCallCheck(this, Island);

		// set properties

		this.materials = {};
		this.mesh = new THREE.Object3D();
		this.meshes = [];

		// init

		this.init();
	}

	_createClass(Island, [{
		key: 'init',
		value: function init() {

			this.createGrassland();
			this.createBridge();
			this.createTrees(10);
		}
	}, {
		key: 'createGrassland',
		value: function createGrassland() {

			this.grassland = new _grassland2.default();
			this.mesh.add(this.grassland.mesh);
		}
	}, {
		key: 'createBridge',
		value: function createBridge() {

			this.bridge = new _bridge2.default();
			this.mesh.add(this.bridge.mesh);
		}
	}, {
		key: 'createTrees',
		value: function createTrees(amount) {

			this.trees = [];

			for (var i = 0; i < amount; i++) {

				// x: random between (-1.75 and -0.5) and (1.5 and 1.75)
				// z: between (-0.75 and 0.75)

				var x = (0, _math.random)(-1.75, 1.75);
				var z = (0, _math.random)(-0.75, 0.75);

				while (x > -0.5 && x < 1.5) {
					x = (0, _math.random)(-1.75, 1.75);
				}var tree = new _tree2.default(x, 0.275, z);

				this.trees.push(tree);
				this.mesh.add(tree.mesh);
			}
		}
	}]);

	return Island;
}();

exports.default = Island;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grassland = function () {
	function Grassland() {
		_classCallCheck(this, Grassland);

		// set properties

		this.materials = {
			grass: new THREE.MeshPhongMaterial({ color: COLORS.greenLight }),
			river: new THREE.MeshPhongMaterial({ color: COLORS.blue })
		};

		this.mesh = new THREE.Object3D();
		this.meshes = [];

		// init

		this.init();
	}

	_createClass(Grassland, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.createGrass();
			this.createRiver();

			this.meshes.forEach(function (obj) {

				obj.mesh.castShadow = true;
				obj.mesh.receiveShadow = true;

				_this.mesh.add(obj.mesh);
			});
		}
	}, {
		key: 'createRiver',
		value: function createRiver() {

			var geometry = new THREE.BoxGeometry(1, 0.15, 2);
			var mesh = new THREE.Mesh(geometry, this.materials.river);

			mesh.position.set(0.5, 0.1, 0);

			this.meshes.push({ type: 'river', mesh: mesh });
		}
	}, {
		key: 'createGrass',
		value: function createGrass() {

			var geometry = new THREE.Geometry();
			var meshes = [];

			meshes.push(this.addGrassLeft());
			meshes.push(this.addGrassBack());
			meshes.push(this.addRiverbed());
			meshes.push(this.addGrassRight());

			meshes.forEach(function (obj) {

				obj.mesh.updateMatrix();
				geometry.merge(obj.mesh.geometry, obj.mesh.matrix);
			});

			var mesh = new THREE.Mesh(geometry, this.materials.grass);

			this.meshes.push({ type: 'grass', mesh: mesh });
		}
	}, {
		key: 'addGrassLeft',
		value: function addGrassLeft() {

			var geometry = new THREE.BoxGeometry(2, 0.2, 2);
			var mesh = new THREE.Mesh(geometry);

			mesh.position.set(-1, 0.1, 0);

			return { type: 'grass', mesh: mesh };
		}
	}, {
		key: 'addGrassBack',
		value: function addGrassBack() {

			var geometry = new THREE.BoxGeometry(1, 0.2, 0.2);
			var mesh = new THREE.Mesh(geometry);

			mesh.position.set(0.5, 0.1, -0.9);

			return { type: 'grass', mesh: mesh };
		}
	}, {
		key: 'addRiverbed',
		value: function addRiverbed() {

			var geometry = new THREE.BoxGeometry(1, 0.05, 2);
			var mesh = new THREE.Mesh(geometry);

			mesh.position.set(0.5, 0.025, 0);

			return { type: 'grass', mesh: mesh };
		}
	}, {
		key: 'addGrassRight',
		value: function addGrassRight() {

			var geometry = new THREE.BoxGeometry(1, 0.2, 2);
			var mesh = new THREE.Mesh(geometry);

			mesh.position.set(1.5, 0.1, 0);

			return { type: 'grass', mesh: mesh };
		}
	}]);

	return Grassland;
}();

exports.default = Grassland;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bridge = function () {
	function Bridge() {
		_classCallCheck(this, Bridge);

		// set properties

		this.materials = {
			wood: new THREE.MeshPhongMaterial({ color: COLORS.brown })
		};

		this.geometries = {
			block: new THREE.BoxGeometry(0.04, 0.3, 0.04),
			plank: new THREE.BoxGeometry(0.15, 0.02, 0.4),
			rail: new THREE.BoxGeometry(1.2, 0.04, 0.04)
		};

		this.mesh = new THREE.Object3D();
		this.meshes = [];

		// init

		this.init();
	}

	_createClass(Bridge, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.createBase();
			this.createRails();

			this.meshes.forEach(function (obj) {

				obj.mesh.castShadow = true;
				obj.mesh.receiveShadow = true;

				_this.mesh.add(obj.mesh);
			});
		}
	}, {
		key: 'createBase',
		value: function createBase() {

			for (var i = 0; i < 6; i++) {

				var mesh = new THREE.Mesh(this.geometries.plank, this.materials.wood);

				mesh.position.set(0.2 * i, 0.21, 0.2);

				this.meshes.push({ type: 'block', mesh: mesh });
			}
		}
	}, {
		key: 'createRails',
		value: function createRails() {

			var rail1 = this.addRail();
			var rail2 = this.addRail();

			rail2.mesh.position.set(0, 0, -0.4);

			// shadow1 = shadow(rail1.mesh, 0.2)
			// shadow2 = shadow(rail2.mesh, 0.2)

			this.meshes.push(rail1);
			this.meshes.push(rail2);

			// this.meshes.push(shadow1)
			// this.meshes.push(shadow2)
		}
	}, {
		key: 'addRail',
		value: function addRail() {

			var geometry = new THREE.Geometry();
			var meshes = [];

			var block1 = new THREE.Mesh(this.geometries.block, this.materials.wood);
			var block2 = new THREE.Mesh(this.geometries.block, this.materials.wood);
			var rail = new THREE.Mesh(this.geometries.rail, this.materials.wood);

			block1.position.set(-0.1, 0.35, 0.4);
			block2.position.set(1.1, 0.35, 0.4);
			rail.position.set(0.5, 0.42, 0.4);

			meshes.push({ type: 'block', mesh: block1 });
			meshes.push({ type: 'block', mesh: block2 });
			meshes.push({ type: 'rail', mesh: rail });

			meshes.forEach(function (obj) {

				obj.mesh.updateMatrix();
				geometry.merge(obj.mesh.geometry, obj.mesh.matrix);
			});

			var mesh = new THREE.Mesh(geometry, this.materials.wood);

			return { type: 'rail', mesh: mesh };
		}
	}]);

	return Bridge;
}();

exports.default = Bridge;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.shadow = shadow;
function shadow(opacity, target) {

		var materialShadow = new THREE.ShadowMaterial({ opacity: opacity });
		var meshShadow = new THREE.Mesh(target.geometry, materialShadow);

		meshShadow.position.set(target.position.x, target.position.y, target.position.z);
		meshShadow.receiveShadow = true;

		return meshShadow;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
	function Tree() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		_classCallCheck(this, Tree);

		// set properties

		this.position = { x: x, y: y, z: z };

		this.materials = {
			trunk: new THREE.MeshLambertMaterial({ color: COLORS.brownDark }),
			leaves: new THREE.MeshLambertMaterial({ color: COLORS.green })
		};

		this.geometries = {
			trunk: new THREE.BoxGeometry(0.15, 0.15, 0.15),
			leaves: new THREE.BoxGeometry(0.25, 0.4, 0.25)
		};

		this.mesh = new THREE.Object3D();
		this.meshes = [];

		// init

		this.init();
	}

	_createClass(Tree, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.createTrunk();
			this.createLeaves();

			this.meshes.forEach(function (obj) {

				obj.mesh.castShadow = true;
				obj.mesh.receiveShadow = true;

				_this.mesh.add(obj.mesh);
			});
		}
	}, {
		key: 'createTrunk',
		value: function createTrunk() {

			var mesh = new THREE.Mesh(this.geometries.trunk, this.materials.trunk);
			mesh.position.set(this.position.x, 0.275, this.position.z);

			this.meshes.push({ type: 'trunk', mesh: mesh });
		}
	}, {
		key: 'createLeaves',
		value: function createLeaves() {

			var mesh = new THREE.Mesh(this.geometries.leaves, this.materials.leaves);
			mesh.position.set(this.position.x, 0.55, this.position.z);

			this.meshes.push({ type: 'leaves', mesh: mesh });
		}
	}]);

	return Tree;
}();

exports.default = Tree;

/***/ })
/******/ ]);