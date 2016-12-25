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
	
	var scene = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.shadowMap.enabled = true;
	
	var light = new THREE.DirectionalLight(new THREE.Color('rgb(255,255,255)')); // soft white light
	console.log(light);
	
	var geometry = new THREE.SphereGeometry(6, 30, 30);
	var matertial = new THREE.MeshPhongMaterial({
		color: new THREE.Color('rgb(0,0,212)')
	});
	
	var mesh = new THREE.Mesh(geometry, matertial);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.position.set(0, 0, 0);
	
	renderer.setSize(640, 480);
	document.body.appendChild(renderer.domElement);
	
	var camera = new THREE.PerspectiveCamera(100, 640 / 480, 1, 10000);
	
	camera.position.y = 0.02;
	camera.position.z = 10;
	
	// scene.add(camera);
	scene.add(light);
	scene.add(mesh);
	
	renderer.render(scene, camera);
	
	function animate() {
		mesh.rotation.z += 0.05;
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
		requestAnimationFrame(animate);
	
		renderer.render(scene, camera);
	}
	
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=three-intro-bundle.js.map