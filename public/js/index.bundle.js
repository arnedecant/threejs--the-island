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

var _grassland = __webpack_require__(2);

var _grassland2 = _interopRequireDefault(_grassland);

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
								// default: { x: -5, y: 6, z: 8 },
								default: { x: -1.25, y: 1.5, z: 2 },
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
						this.createGrassland();

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
				key: 'createGrassland',
				value: function createGrassland() {

						// create new object
						this.grassland = new _grassland2.default();

						// add the grassland to the scene
						this.scene.add(this.grassland.mesh);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grassland = function () {
		function Grassland() {
				_classCallCheck(this, Grassland);

				// set properties
				// ...

				// create an empty container that will hold the different parts of the grassland
				this.mesh = new THREE.Object3D();
				this.meshes = [];

				// init
				this.init();
		}

		_createClass(Grassland, [{
				key: 'init',
				value: function init() {
						var _this = this;

						this.materials = {
								grass: new THREE.MeshPhongMaterial({
										color: COLORS.greenLight,
										flatShading: true
								}),
								river: new THREE.MeshPhongMaterial({
										color: COLORS.blue,
										flatShading: true
								})
						};

						this.createGrass();
						this.createRiver();

						this.meshes.forEach(function (obj) {

								obj.mesh.castShadow = true;
								obj.mesh.receiveShadow = true;

								_this.mesh.add(obj.mesh);
						});
				}
		}, {
				key: 'createGrass',
				value: function createGrass() {

						this.grass = new THREE.Geometry();

						this.createGrassLeft();
						this.createGrassBack();
						this.createRiverBed();
						this.createGrassRight();
				}
		}, {
				key: 'createGrassLeft',
				value: function createGrassLeft() {

						var geometry = new THREE.BoxGeometry(2, 0.2, 2);
						var grassLeft = new THREE.Mesh(geometry, this.materials.grass);

						grassLeft.position.set(-1, 0.1, 0);

						this.meshes.push({ type: 'grass', mesh: grassLeft });
				}
		}, {
				key: 'createGrassBack',
				value: function createGrassBack() {

						var geometry = new THREE.BoxGeometry(1, 0.2, 0.2);
						var grassBack = new THREE.Mesh(geometry, this.materials.grass);

						grassBack.position.set(0.5, 0.1, -0.9);

						this.meshes.push({ type: 'grass', mesh: grassBack });
				}
		}, {
				key: 'createRiverBed',
				value: function createRiverBed() {

						var geometry = new THREE.BoxGeometry(1, 0.05, 2);
						var riverbed = new THREE.Mesh(geometry, this.materials.grass);

						riverbed.position.set(0.5, 0.025, 0);

						this.meshes.push({ type: 'grass', mesh: riverbed });
				}
		}, {
				key: 'createGrassRight',
				value: function createGrassRight() {

						var geometry = new THREE.BoxGeometry(1, 0.2, 2);
						var grassRight = new THREE.Mesh(geometry, this.materials.grass);

						grassRight.position.set(1.5, 0.1, 0);

						this.meshes.push({ type: 'grass', mesh: grassRight });
				}
		}, {
				key: 'createRiver',
				value: function createRiver() {

						var geometry = new THREE.BoxGeometry(1, 0.15, 2);
						var river = new THREE.Mesh(geometry, this.materials.river);

						river.position.set(0.5, 0.1, 0);

						this.meshes.push({ type: 'river', mesh: river });
				}
		}]);

		return Grassland;
}();

exports.default = Grassland;

/***/ })
/******/ ]);