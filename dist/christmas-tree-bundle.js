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
/***/ function(module, exports) {

	'use strict';
	
	var container;
	
	var camera, scene, renderer;
	
	var mouseX = 0,
	    mouseY = 0;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	init();
	animate();
	
	function init() {
	
		container = document.createElement('div');
		document.body.appendChild(container);
	
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
		camera.position.z = 20;
	
		// scene
	
		scene = new THREE.Scene();
	
		var ambient = new THREE.AmbientLight(0x101030);
		scene.add(ambient);
	
		var directionalLight = new THREE.DirectionalLight(0xffeedd);
		directionalLight.position.set(0, 0, 1);
		scene.add(directionalLight);
	
		// texture
	
		var manager = new THREE.LoadingManager();
		manager.onProgress = function (item, loaded, total) {
	
			console.log(item, loaded, total);
		};
	
		var texture = new THREE.Texture();
	
		var onProgress = function onProgress(xhr) {
			if (xhr.lengthComputable) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log(Math.round(percentComplete, 2) + '% downloaded');
			}
		};
	
		var onError = function onError(xhr) {};
	
		var loader = new THREE.ImageLoader(manager);
		loader.load('https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14305435_1044232042351132_2171601430048718173_o.jpg?oh=e5f4fd1ca577678383c574f2287a6d05&oe=58EACC82', function (image) {
	
			texture.image = image;
			texture.needsUpdate = true;
		});
	
		// model
	
		var loader = new THREE.OBJLoader(manager);
		loader.load('tree-toon.obj', function (object) {
	
			object.traverse(function (child) {
	
				if (child instanceof THREE.Mesh) {
	
					child.material.map = texture;
				}
			});
	
			object.position.y = -3;
			scene.add(object);
		}, onProgress, onError);
	
		//
	
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);
	
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//
		// //
		//
		// window.addEventListener( 'resize', onWindowResize, false );
	}
	
	function onWindowResize() {
	
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
	
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	function onDocumentMouseMove(event) {
	
		mouseX = (event.clientX - windowHalfX) / 2;
		mouseY = (event.clientY - windowHalfY) / 2;
	}
	
	//
	
	function animate() {
	
		requestAnimationFrame(animate);
		render();
	}
	
	function render() {
	
		camera.position.x += (mouseX - camera.position.x) * .05;
		camera.position.y += (-mouseY - camera.position.y) * .05;
	
		camera.lookAt(scene.position);
	
		renderer.render(scene, camera);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=christmas-tree-bundle.js.map