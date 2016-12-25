/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Tree = __webpack_require__(5);
	
	var _Tree2 = _interopRequireDefault(_Tree);
	
	var _Ball = __webpack_require__(6);
	
	var _Ball2 = _interopRequireDefault(_Ball);
	
	var _Snow = __webpack_require__(7);
	
	var _Snow2 = _interopRequireDefault(_Snow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tree = new _Tree2.default();
	
	var musicBPM = 103;
	var perNote = 60000 / musicBPM;
	var sound = document.querySelector('audio');
	
	// sound.addEventListener('canplay', (e) => {
	// 	sound.play();
	// });
	
	var scene = new THREE.Scene();
	window.scene = scene;
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 40);
	
	function init() {
		renderer.shadowMap.enabled = true;
		var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
		var ambientLight = new THREE.AmbientLight(0xdc8874, .5);
		var light = new THREE.DirectionalLight(new THREE.Color('rgb(200,200,200)')); // soft white ligh t
	
		light.position.set(20, 10, 10);
		scene.add(light);
		scene.add(hemisphereLight);
		scene.add(ambientLight);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	}
	init();
	
	var loader = new THREE.OBJLoader();
	
	window.object = {};
	loader.load('../../assets/star.obj', function (obj) {
		object = obj;
		obj.children[2].position.set(0, 28, 5);
		obj.children[2].material = new THREE.MeshPhongMaterial({ color: 0xF3BB02 });
		scene.add(obj.children[2]);
		scene.add(tree.body);
		renderer.render(scene, camera);
		anime();
	});
	
	var animationID = void 0;
	function anime() {
		var star = scene.getObjectByName('tree.star');
		var tree = scene.getObjectByName('tree');
		tree.rotation.y += Math.PI / 500;
		star.rotation.y += Math.PI / 100;
	
		renderer.render(scene, camera);
	
		animationID = requestAnimationFrame(anime);
	}
	
	function stop() {
		cancelAnimationFrame(animationID);
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Tree;
	
	var _Ball = __webpack_require__(6);
	
	var _Ball2 = _interopRequireDefault(_Ball);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Tree() {
		this.body = new THREE.Object3D();
		this.body.castShadow = true;
		this.body.receiveShadow = true;
		this.body.name = 'tree';
	
		var geometry = new THREE.ConeGeometry(10, 20, 17);
	
		var material = new THREE.MeshPhongMaterial({ color: 0x0d7753, shading: THREE.FlatShading });
		var cone = new THREE.Mesh(geometry, material);
	
		for (var i = 0; i < 10; i++) {
			var redBall = new _Ball2.default(1);
	
			// redBall.mesh.rotation.y = Math.PI / 10 * i;
			this.body.add(redBall.mesh);
		}
	
		cone.receiveShadow = true;
		cone.receiveShadow = true;
		var cone2 = cone.clone();
		var cone3 = cone.clone();
		cone.name = 'tree';
		cone.position.set(0, 20, 0);
		cone2.scale.set(1.2, 1.2, 1.2);
		cone2.position.set(0, 10, 0);
	
		cone3.scale.set(1.5, 1.5, 1.5);
		cone3.position.set(0, 0, 0);
	
		this.body.add(cone);
		this.body.add(cone2);
		this.body.add(cone3);
	
		return this;
	}
	
	Tree.prototype.addBalls = function () {
		for (var i = 0; i < 10; i++) {
			var ball = new _Ball2.default();
			ball.mesh.position.y = i;
			ball.mesh.position.x = Math.sin(Math.PI / 2 * i) + 2;
			ball.mesh.position.z = 0;
	
			this.body.add(ball.mesh);
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ball;
	function Ball(size) {
		var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xEE1212;
	
		this.mesh = new THREE.Object3D();
		var geometry = new THREE.SphereGeometry(size, 19, 20);
		var material = new THREE.MeshPhongMaterial({ color: color });
		var sphere = new THREE.Mesh(geometry, material);
	
		this.mesh.add(sphere);
	
		return this;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _snow = __webpack_require__(8);
	
	var _snow2 = _interopRequireDefault(_snow);
	
	var _snow3 = __webpack_require__(9);
	
	var _snow4 = _interopRequireDefault(_snow3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var numParticles = 10000,
	    width = 100,
	    height = particleSystemHeight,
	    depth = 100,
	    parameters = {
			color: 0xFFFFFF,
			height: particleSystemHeight,
			radiusX: 2.5,
			radiusZ: 2.5,
			size: 100,
			scale: 4.0,
			opacity: 0.4,
			speedH: 1.0,
			speedV: 1.0
	},
	    systemGeometry = new THREE.Geometry(),
	    systemMaterial = new THREE.ShaderMaterial({
			uniforms: {
					color: { type: 'c', value: new THREE.Color(parameters.color) },
					height: { type: 'f', value: parameters.height },
					elapsedTime: { type: 'f', value: 0 },
					radiusX: { type: 'f', value: parameters.radiusX },
					radiusZ: { type: 'f', value: parameters.radiusZ },
					size: { type: 'f', value: parameters.size },
					scale: { type: 'f', value: parameters.scale },
					opacity: { type: 'f', value: parameters.opacity },
					texture: { type: 't', value: texture },
					speedH: { type: 'f', value: parameters.speedH },
					speedV: { type: 'f', value: parameters.speedV }
			},
			vertexShader: document.getElementById('step07_vs').textContent,
			fragmentShader: document.getElementById('step09_fs').textContent,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthTest: false
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "uniform vec3 color;\nuniform float opacity;\nuniform sampler2D texture;\nvoid main() {\n\tvec4 texColor = texture2D( texture, gl_PointCoord );\n\tgl_FragColor = texColor * vec4( color, opacity );\n}"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "uniform float radiusX;\nuniform float radiusZ;\nuniform float size;\nuniform float scale;\nuniform float height;\nuniform float elapsedTime;\nuniform float speedH;\nuniform float speedV;\nvoid main() {\n\tvec3 pos = position;\n\tpos.x += cos((elapsedTime + position.z) * 0.25 * speedH) * radiusX;\n\tpos.y = mod(pos.y - elapsedTime * speedV, height);\n\tpos.z += sin((elapsedTime + position.x) * 0.25 * speedH) * radiusZ;\n\tvec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );\n\tgl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n\tgl_Position = projectionMatrix * mvPosition;\n}"

/***/ }
/******/ ]);
//# sourceMappingURL=christmas-special-bundle.js.map