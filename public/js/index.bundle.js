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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // -------------------------------------------------------------------
// :: APP
// -------------------------------------------------------------------

// import * as data from '../assets/data.json'


var _math = __webpack_require__(1);

var _airplane = __webpack_require__(2);

var _airplane2 = _interopRequireDefault(_airplane);

var _sea = __webpack_require__(4);

var _sea2 = _interopRequireDefault(_sea);

var _sky = __webpack_require__(5);

var _sky2 = _interopRequireDefault(_sky);

var _bullet = __webpack_require__(7);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		var url = new URL(window.location.href);

		// set properties
		this.config = {
			debug: false,
			camera: {
				zpf: 5, // zoom per frame
				default: { x: 0, y: 100, z: 200 },
				min: { x: 0, y: 100, z: 50 },
				max: { x: 0, y: 100, z: 200 }
			}
		};

		this.zoom = url.searchParams.get('zoom') || 1;
		this.scrollSpeed = 0;
		this.shooting = false;
		this.bullets = [];

		this.colors = {
			black: 0x23190f,
			brown: 0x59332e,
			red: 0xf25346,
			orange: 0xF5986E,
			blue: 0x68c3c0,
			white: 0xd8d0d1
		};

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
			this.createAirplane();
			this.createSea();
			this.createSky();

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
			if (this.config.debug) initDebug();
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

			// create a new hemisphere light (a gradient colored light)
			this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

			// create a new directional light (a light that shines from a specific direction)
			this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

			// create a new ambient light (a light that modifies the global color of a scene and makes the shadows softer)
			this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.3);

			// set the direction of the light
			this.shadowLight.position.set(150, 350, 350);

			// allow shadow casting
			this.shadowLight.castShadow = true;

			// set visible area of the projected shadow
			this.shadowLight.shadow.camera.left = -400;
			this.shadowLight.shadow.camera.right = 400;
			this.shadowLight.shadow.camera.top = 400;
			this.shadowLight.shadow.camera.bottom = -400;
			this.shadowLight.shadow.camera.near = 1;
			this.shadowLight.shadow.camera.far = 1000;

			// set the resolution fo the shadow
			this.shadowLight.shadow.mapSize.width = 2048;
			this.shadowLight.shadow.mapSize.height = 2048;

			// add lights to the scene
			this.scene.add(this.hemisphereLight);
			this.scene.add(this.shadowLight);
			this.scene.add(this.ambientLight);
		}
	}, {
		key: 'createAirplane',
		value: function createAirplane() {

			// create new object
			this.airplane = new _airplane2.default(this.colors);

			// set position and scale
			this.airplane.mesh.position.y = 100;
			this.airplane.mesh.scale.set(0.25, 0.25, 0.25);

			// add the airplane to the scene
			this.scene.add(this.airplane.mesh);
			this.scene.updateMatrixWorld(true);
		}
	}, {
		key: 'createSea',
		value: function createSea() {

			// create new object
			this.sea = new _sea2.default(this.colors.blue);

			// push it down
			this.sea.mesh.position.y = -600;

			// add the sea to the scene
			this.scene.add(this.sea.mesh);
		}
	}, {
		key: 'createSky',
		value: function createSky() {

			// create new object
			this.sky = new _sky2.default(20);

			// push it down
			this.sky.mesh.position.y = -600;

			// add the sky to the scene
			this.scene.add(this.sky.mesh);
		}
	}, {
		key: 'spawnBullets',
		value: function spawnBullets() {

			// get airplane position
			var position = new THREE.Vector3();
			position.setFromMatrixPosition(this.airplane.mesh.matrixWorld);

			// create a new object
			var bullet = new _bullet2.default(this.colors.black, position);

			// add bullet to scene and bullet array
			this.scene.add(bullet.mesh);
			this.bullets.push(bullet);
		}
	}, {
		key: 'updateAirplane',
		value: function updateAirplane() {

			/*
   	allowed positions for the airplane
   	x: between -100 and 100
   	y: between 25 and 175
   		==> depends on mouse position (between -1 and 1)
   */

			// calculate position based on normalize function (utils.js)
			var targetX = (0, _math.normalize)(this.mouse.x, -1, 1, -100, 100);
			var targetY = (0, _math.normalize)(this.mouse.y, -1, 1, 25, 175);

			// update airplane position
			// move the plane at each frame by adding a fraction of the remaining distance
			this.airplane.mesh.position.x += (targetX - this.airplane.mesh.position.x) * 0.1;
			this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.1;

			// rotate the plane proportionally to the remaining distance
			this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.0128;
			this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.0064;

			// rotate propeller
			this.airplane.propeller.rotation.x += 0.3;
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

			// rotate sky
			this.sky.mesh.rotation.z += 0.01;

			// update the airplane
			this.updateAirplane();

			// update the waves
			this.sea.moveWaves();

			// animate pilot hair
			this.airplane.pilot.updateHairs();

			// if shooting: spawn bullets
			// if (this.shooting) this.spawnBullets()

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normalize = normalize;
function normalize(v, vmin, vmax, tmin, tmax) {

	var nv = Math.max(Math.min(v, vmax), vmin);
	var dv = vmax - vmin;
	var pc = (nv - vmin) / dv;
	var dt = tmax - tmin;
	var tv = tmin + pc * dt;

	return tv;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pilot = __webpack_require__(3);

var _pilot2 = _interopRequireDefault(_pilot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Airplane = function () {
	function Airplane(colors) {
		_classCallCheck(this, Airplane);

		// set properties
		this.colors = colors;

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D();

		// init
		this.init();
	}

	_createClass(Airplane, [{
		key: 'init',
		value: function init() {

			this.createCabin();
			this.createEngine();
			this.createTail();
			this.createWing();
			this.createPropeller();
			this.createWheelsProtection();
			this.createWheels();

			this.createPilot();

			// this.mesh.castShadow = true
			// this.mesh.receiveShadow = true
		}
	}, {
		key: 'createCabin',
		value: function createCabin() {

			var geometry = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.red,
				flatShading: true
			});

			geometry.vertices[4].y -= 10;
			geometry.vertices[4].z += 20;
			geometry.vertices[5].y -= 10;
			geometry.vertices[5].z -= 20;
			geometry.vertices[6].y += 30;
			geometry.vertices[6].z += 20;
			geometry.vertices[7].y += 30;
			geometry.vertices[7].z -= 20;

			var cabin = new THREE.Mesh(geometry, material);

			cabin.castShadow = true;
			cabin.receiveShadow = true;

			this.mesh.add(cabin);
		}
	}, {
		key: 'createEngine',
		value: function createEngine() {

			var geometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.white,
				flatShading: true
			});

			var engine = new THREE.Mesh(geometry, material);

			engine.position.x = 40;

			engine.castShadow = true;
			engine.receiveShadow = true;

			this.mesh.add(engine);
		}
	}, {
		key: 'createTail',
		value: function createTail() {

			var geometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.red,
				flatShading: true
			});

			var tail = new THREE.Mesh(geometry, material);

			tail.position.set(-40, 20, 0);

			tail.castShadow = true;
			tail.receiveShadow = true;

			this.mesh.add(tail);
		}
	}, {
		key: 'createWing',
		value: function createWing() {

			var geometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.red,
				flatShading: true
			});

			var wing = new THREE.Mesh(geometry, material);

			wing.castShadow = true;
			wing.receiveShadow = true;

			this.mesh.add(wing);
		}
	}, {
		key: 'createPropeller',
		value: function createPropeller() {

			var geometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.brown,
				flatShading: true
			});

			this.propeller = new THREE.Mesh(geometry, material);

			var blade = this.createBlade();
			this.propeller.add(blade);

			this.propeller.position.set(50, 0, 0);

			this.mesh.add(this.propeller);
		}
	}, {
		key: 'createBlade',
		value: function createBlade() {

			var geometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.black,
				flatShading: true
			});

			var blade = new THREE.Mesh(geometry, material);

			blade.position.set(8, 0, 0);

			blade.castShadow = true;
			blade.receiveShadow = true;

			return blade;
		}
	}, {
		key: 'createPilot',
		value: function createPilot() {

			// create new object
			this.pilot = new _pilot2.default(this.colors);

			// set its position
			this.pilot.mesh.position.set(-10, 27, 0);

			// add the pilot to the mesh
			this.mesh.add(this.pilot.mesh);
		}
	}, {
		key: 'createWheelsProtection',
		value: function createWheelsProtection() {

			var geometry = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.red,
				flatShading: true
			});

			var protectionR = new THREE.Mesh(geometry, material);
			protectionR.position.set(25, -20, 25);

			var protectionL = protectionR.clone();
			protectionL.position.z = 0 - protectionR.position.z;

			this.mesh.add(protectionR);
			this.mesh.add(protectionL);
		}
	}, {
		key: 'createWheels',
		value: function createWheels() {

			// create new group
			var wheels = new THREE.Object3D();

			// create a tire
			var tireGeometry = new THREE.CylinderGeometry(12, 12, 6, 12);
			var tireMaterial = new THREE.MeshPhongMaterial({
				color: this.colors.black,
				flatShading: true
			});

			var tireR = new THREE.Mesh(tireGeometry, tireMaterial);
			tireR.position.set(25, -28, 25);
			tireR.rotation.x = Math.PI / 2;

			// create a tire axis
			var axisGeometry = new THREE.CylinderGeometry(4, 4, 7, 12);
			var axisMaterial = new THREE.MeshPhongMaterial({
				color: this.colors.brown,
				flatShading: true
			});

			var axisR = new THREE.Mesh(axisGeometry, axisMaterial);

			// add axis to tire
			tireR.add(axisR);

			// add tire to group
			wheels.add(tireR);

			// clone a tire: left
			var tireL = tireR.clone();
			tireL.position.z = 0 - tireR.position.z;
			wheels.add(tireL);

			// clone a tire: back
			var tireB = tireR.clone();
			tireB.scale.set(0.5, 0.5, 0.5);
			tireB.position.set(-35, -5, 0);
			wheels.add(tireB);

			// add back suspension
			var suspensionGeometry = new THREE.BoxGeometry(4, 20, 4);
			var suspensionMaterial = new THREE.MeshPhongMaterial({
				color: this.colors.red,
				flatShading: true
			});

			suspensionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));

			var suspension = new THREE.Mesh(suspensionGeometry, suspensionMaterial);

			suspension.position.set(-35, -5, 0);
			suspension.rotation.z = -.3;

			// add suspension to group
			wheels.add(suspension);

			// add group to parent mesh
			this.mesh.add(wheels);
		}
	}]);

	return Airplane;
}();

exports.default = Airplane;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pilot = function () {
	function Pilot(colors) {
		_classCallCheck(this, Pilot);

		// set properties
		this.colors = colors;
		this.angleHair = 0;

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D();
		this.mesh.name = 'pilot';

		// init
		this.init();
	}

	_createClass(Pilot, [{
		key: 'init',
		value: function init() {

			this.createBody();
			this.createFace();
		}
	}, {
		key: 'createBody',
		value: function createBody() {

			var geometry = new THREE.BoxGeometry(15, 15, 15);
			var material = new THREE.MeshPhongMaterial({
				color: this.colors.brown,
				flatShading: true
			});

			var body = new THREE.Mesh(geometry, material);

			body.position.set(2, -12, 0);

			this.mesh.add(body);
		}
	}, {
		key: 'createFace',
		value: function createFace() {

			var geometry = new THREE.BoxGeometry(10, 10, 10);
			var material = new THREE.MeshLambertMaterial({
				color: this.colors.orange
			});

			var face = new THREE.Mesh(geometry, material);

			this.mesh.add(face);

			this.createHair();
			this.createGlasses();
			this.createEars(material);
		}
	}, {
		key: 'createHair',
		value: function createHair() {

			var geometry = new THREE.BoxGeometry(4, 4, 4);
			var material = new THREE.MeshLambertMaterial({
				color: this.colors.brown
			});

			var hair = new THREE.Mesh(geometry, material);

			// align the shape of the hair to its bottom boundary, that will make it easier to scale
			var matrix = new THREE.Matrix4().makeTranslation(0, 2, 0);
			hair.geometry.applyMatrix(matrix);

			// hair container
			var hairs = new THREE.Object3D();

			// animated hairs
			this.hairs = new THREE.Object3D();

			// create hairs at top of the head
			// and position them on a 3 x 4 grid
			for (var i = 0; i < 12; i++) {

				// clone a new hair
				var h = hair.clone();

				// determine row & column
				var col = i % 3,
				    row = Math.floor(i / 3);

				// define start positions
				var startPos = {
					x: -4,
					z: -4

					// calculate new positions
				};var newPos = {
					x: startPos.x + row * 4,
					z: startPos.z + col * 4

					// apply new positions
				};h.position.set(newPos.x, 0, newPos.z);

				// add hair to the mesh
				this.hairs.add(h);
			}

			// add animatable hairs to the hair mesh
			hairs.add(this.hairs);

			hairs = this.addHairsSide(hairs, material);
			hairs = this.addHairsBack(hairs, material);

			hairs.position.set(-5, 5, 0);

			this.mesh.add(hairs);
		}
	}, {
		key: 'addHairsSide',
		value: function addHairsSide(hairs, material) {

			var geometry = new THREE.BoxGeometry(12, 4, 2);

			var matrix = new THREE.Matrix4().makeTranslation(-6, 0, 0);
			geometry.applyMatrix(matrix);

			var r = new THREE.Mesh(geometry, material);
			var l = r.clone();

			r.position.set(8, -2, 6);
			l.position.set(8, -2, -6);

			hairs.add(r);
			hairs.add(l);

			return hairs;
		}
	}, {
		key: 'addHairsBack',
		value: function addHairsBack(hairs, material) {

			var geometry = new THREE.BoxGeometry(2, 8, 10);
			var hair = new THREE.Mesh(geometry, material);

			hair.position.set(-1, -4, 0);

			hairs.add(hair);

			return hairs;
		}
	}, {
		key: 'createGlasses',
		value: function createGlasses() {

			var geometry = new THREE.BoxGeometry(5, 5, 5);
			var material = new THREE.MeshLambertMaterial({
				color: this.colors.brown
			});

			var glassR = new THREE.Mesh(geometry, material);
			var glassL = glassR.clone();

			glassR.position.set(6, 0, 3);
			glassL.position.set(6, 0, -3);

			var geometryGlassA = new THREE.BoxGeometry(11, 1, 11);
			var glassA = new THREE.Mesh(geometryGlassA, material);

			this.mesh.add(glassR);
			this.mesh.add(glassL);
			this.mesh.add(glassA);
		}
	}, {
		key: 'createEars',
		value: function createEars(material) {

			var geometry = new THREE.BoxGeometry(2, 3, 2);

			var earR = new THREE.Mesh(geometry, material);
			var earL = earR.clone();

			earR.position.set(0, 0, 6);
			earL.position.set(0, 0, -6);

			this.mesh.add(earR);
			this.mesh.add(earL);
		}
	}, {
		key: 'updateHairs',
		value: function updateHairs() {

			var hairs = this.hairs.children;

			for (var i = 0, h; h = hairs[i]; i++) {
				h.scale.y = 0.75 + Math.cos(this.angleHair + i / 3) * 0.25;
			}

			this.angleHair += 0.16;
		}
	}]);

	return Pilot;
}();

exports.default = Pilot;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sea = function () {
	function Sea(color) {
		_classCallCheck(this, Sea);

		// set properties
		this.color = color;
		this.waves = [];

		// init
		this.init();
	}

	_createClass(Sea, [{
		key: 'init',
		value: function init() {

			// create the shape
			this.geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

			// create the matrix to rotate the shape on the x-axis
			this.matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);

			// apply the matrix to the shape
			this.geometry.applyMatrix(this.matrix);

			// by merging vertices we ensure the continuity of the waves
			this.geometry.mergeVertices();

			// store vertices data
			for (var i = 0, v; v = this.geometry.vertices[i]; i++) {

				this.waves.push({
					x: v.x,
					y: v.y,
					z: v.z,
					angle: Math.random() * Math.PI * 2, // a random angle
					amplitude: 5 + Math.random() * 15, // a random distance
					speed: 0.016 + Math.random() * 0.032 // a random speed, between 0.016 and 0.048 radians / frame
				});
			}

			// create the material
			this.material = new THREE.MeshPhongMaterial({
				color: this.color,
				transparent: true,
				opacity: 0.8,
				flatShading: true
			});

			// createthe mesh
			this.mesh = new THREE.Mesh(this.geometry, this.material);

			// allow shadows
			this.mesh.receiveShadow = true;
		}
	}, {
		key: 'moveWaves',
		value: function moveWaves() {

			// get all vertices
			var vertices = this.mesh.geometry.vertices;

			// manipulate vertices
			for (var i = 0, v; v = vertices[i]; i++) {

				// get data associated to the vertex
				var vprops = this.waves[i];

				// update vertex position
				v.x = vprops.x + Math.cos(vprops.angle) * vprops.amplitude;
				v.y = vprops.y + Math.sin(vprops.angle) * vprops.amplitude;

				// increment the angle for the next frame
				vprops.angle += vprops.speed;
			}

			// tell the renderer that the geometry of the sea has changed
			this.mesh.geometry.verticesNeedUpdate = true;

			// rotate sea
			this.mesh.rotation.z += 0.005;
		}
	}]);

	return Sea;
}();

exports.default = Sea;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cloud = __webpack_require__(6);

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sky = function () {
	function Sky() {
		var nClouds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

		_classCallCheck(this, Sky);

		// set properties
		// ...

		// create an empty container
		this.mesh = new THREE.Object3D();

		// amount of clouds
		this.nClouds = nClouds;

		// place clouds at an angle
		this.stepAngle = Math.PI * 2 / this.nClouds;

		// init
		this.init();
	}

	_createClass(Sky, [{
		key: 'init',
		value: function init() {

			// generate clouds
			for (var i = 0; i < this.nClouds; i++) {

				// create new cloud
				var c = new _cloud2.default();

				// set rotation and position using trigonometry
				var a = this.stepAngle * i;
				var h = 750 + Math.random() * 200;

				// convert polar coordinates (angle & distance) to Cartesian coordinates (x, y)
				c.mesh.position.x = Math.cos(a) * h;
				c.mesh.position.y = Math.sin(a) * h;

				// give cloud a random depth
				c.mesh.position.z = -400 - Math.random() * 400;

				// rotate cloud according to its position
				c.mesh.rotation.z = a + Math.PI / 2;

				// add random scale
				var s = 1 + Math.random() * 2;
				c.mesh.scale.set(s, s, s);

				// apply the new mesh
				this.mesh.add(c.mesh);
			}
		}
	}]);

	return Sky;
}();

exports.default = Sky;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloud = function () {
	function Cloud(color) {
		_classCallCheck(this, Cloud);

		// set properties
		this.color = color;

		// create an empty container that will hold the different parts of the cloud
		this.mesh = new THREE.Object3D();

		// create one cube which will be duplicated to create the cloud
		this.geometry = new THREE.BoxGeometry(20, 20, 20);

		// create the material
		this.material = new THREE.MeshPhongMaterial({
			color: this.color
		});

		// init
		this.init();
	}

	_createClass(Cloud, [{
		key: 'init',
		value: function init() {

			// define a random number of cubes
			var amount = 3 + Math.floor(Math.random() * 3);

			// duplicate the geometry
			for (var i = 0; i < amount; i++) {

				// create the mesh
				var mesh = new THREE.Mesh(this.geometry, this.material);

				// set position and rotation
				mesh.position.x = i * 15;
				mesh.position.y = Math.random() * 10;
				mesh.position.z = Math.random() * 10;
				mesh.rotation.z = Math.random() * Math.PI * 2;
				mesh.rotation.y = Math.random() * Math.PI * 2;

				// set cube sizes
				var size = 0.1 + Math.random() * 0.9;
				mesh.scale.set(size, size, size);

				// allow shadows
				mesh.castShadow = true;
				mesh.receiveShadow = true;

				this.mesh.add(mesh);
			}
		}
	}]);

	return Cloud;
}();

exports.default = Cloud;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
	function Bullet(color, position) {
		_classCallCheck(this, Bullet);

		// set properties
		this.color = color;
		this.position = position || {
			x: 0,
			y: 0,
			z: 0

			// init
		};this.init();
	}

	_createClass(Bullet, [{
		key: 'init',
		value: function init() {

			this.geometry = new THREE.BoxGeometry(3, 0.5, 0.5);
			this.material = new THREE.MeshPhongMaterial({
				color: this.color
			});

			this.mesh = new THREE.Mesh(this.geometry, this.material);

			var x = this.position.x,
			    y = this.position.y,
			    z = this.position.z;

			this.mesh.position.set(x, y, z);
		}
	}, {
		key: 'setPosition',
		value: function setPosition() {}
	}, {
		key: 'render',
		value: function render() {

			// nothing to see here

		}
	}]);

	return Bullet;
}();

exports.default = Bullet;

/***/ })
/******/ ]);