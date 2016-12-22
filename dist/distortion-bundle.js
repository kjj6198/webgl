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
	
	var _webgl = __webpack_require__(1);
	
	var WebGL = _interopRequireWildcard(_webgl);
	
	var _distoration = __webpack_require__(2);
	
	var _distoration2 = _interopRequireDefault(_distoration);
	
	var _vertex = __webpack_require__(3);
	
	var _vertex2 = _interopRequireDefault(_vertex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var canvas = document.getElementById('distortion');
	
	var gl = WebGL.initGL(canvas);
	var program = WebGL.createProgram(gl, _vertex2.default, _distoration2.default);
	
	var time = gl.getUniformLocation(program, 'u_time');
	var resolution = gl.getUniformLocation(program, 'u_resolution');
	gl.uniform2f(resolution, canvas.width, canvas.height);
	var textureCoords = gl.getAttribLocation(program, 'a_textureCoords');
	var position = gl.getAttribLocation(program, 'a_position');
	var pointSize = gl.getAttribLocation(program, 'a_pointSize');
	
	var textures = [0, 0, 1, 0, 0, 1, 1, 1];
	
	var vertices = [-0.8, -0.8, 0.8, -0.8, -0.8, 0.8, 0.8, 0.8];
	
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
	
	gl.enableVertexAttribArray(textureCoords);
	gl.vertexAttribPointer(textureCoords, 2, gl.FLOAT, false, 0, 0);
	
	var positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 4);
	
	var bindLoadedImage = function bindLoadedImage(gl) {
		return function (img) {
			WebGL.createTexture(gl, img);
			draw(0);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		};
	};
	
	WebGL.loadImage('../../avatar.jpg', bindLoadedImage(gl));
	
	var curTime = 0;
	var lastTime = 0;
	
	function draw(elapsed) {
		requestAnimationFrame(draw);
	
		var delta = elapsed - lastTime;
		lastTime = elapsed;
	
		var step = delta / (1000 / 60);
		curTime += step;
	
		gl.uniform1f(time, curTime);
	
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getContext = getContext;
	exports.initGL = initGL;
	exports.createShader = createShader;
	exports.createProgram = createProgram;
	exports.createTexture = createTexture;
	exports.loadImage = loadImage;
	function getContext(canvas) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var contexts = ["webgl", "experimental-webgl"];
	  var context = null;
	
	  contexts.some(function (name) {
	    try {
	      context = canvas.getContext(name, options);
	    } catch (e) {};
	
	    return context != null;
	  });
	
	  if (context == null) {
	    document.body.classList.add("no-webgl");
	  }
	
	  return context;
	}
	
	function initGL(canvas) {
	  var gl = getContext(canvas);
	  // const width = window.innerWidth;
	  // const height = window.innerHeight;
	
	  // canvas.width = width;
	  // canvas.height = height;
	  gl.enable(gl.DEPTH_TEST);
	  gl.viewport(0, 0, canvas.width, canvas.height);
	  gl.clearColor(0, 1, 1, 1);
	
	  // window.addEventListener('resize', function() {
	  //   gl.viewport(0,0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	  // });
	
	  return gl;
	}
	
	function createShader(gl, type, shaderScript) {
	  var shader;
	
	  switch (type) {
	    case 'fragment':
	      shader = gl.createShader(gl.FRAGMENT_SHADER);
	      break;
	    case 'vertex':
	      shader = gl.createShader(gl.VERTEX_SHADER);
	      break;
	  }
	
	  gl.shaderSource(shader, shaderScript);
	  gl.compileShader(shader);
	
	  return shader;
	}
	
	function createProgram(gl, vertexScript, fragScript) {
	  var vertexShader = createShader(gl, 'vertex', vertexScript);
	  var fragShader = createShader(gl, 'fragment', fragScript);
	  var program = gl.createProgram();
	
	  gl.attachShader(program, vertexShader);
	  gl.attachShader(program, fragShader);
	  gl.linkProgram(program);
	  gl.useProgram(program);
	
	  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	  console.info('current program linked status:', linked);
	
	  if (!linked) {
	    var lastError = gl.getProgramInfoLog(program);
	
	    gl.deleteProgram(program);
	    return null;
	  }
	
	  return program;
	}
	
	function createTexture(gl, source) {
	  var wrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	  if (wrap == null) wrap = gl.CLAMP_TO_EDGE;
	  var texture = gl.createTexture();
	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
	  // Set the parameters so we can render any size image.
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	
	  return texture;
	}
	
	function loadImage(src, imageLoadedFunc) {
	  var img = new Image();
	
	  img.addEventListener('load', function () {
	    imageLoadedFunc.call(this, img);
	  });
	  img.crossOrigin = '';
	  img.src = src;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\n\nvarying vec2 v_textureCoords;\n\nuniform float u_time; // pass time to animate.\nuniform sampler2D u_sampler;\nuniform vec2 u_resolution;\n\n\nvec2 pixel() {\n  return 1.0 / u_resolution;\n}\n\n// make position distortion by sin func.\nfloat distortion(float point,float freq, float speed) {\n  return sin(point * freq + ((3.1415/2.0) * u_time * speed));\n}\n\nvec2 distortions(vec2 pos) {\n\tvec2 intensity = vec2(2.0,1.0) * pixel();\n\n  vec2 waves = vec2(\n    distortion(pos.y,190.0,0.35),\n    distortion(pos.x,100.0,0.4)\n  );\n\n  return pos + (waves * intensity * 1.0);\n}\n\nvoid main() {\n\tvec2 distortions = distortions(v_textureCoords);\n\n\tvec4 testColor = vec4(1.0,0.0,0.0,1.0);\n\n\tgl_FragColor = texture2D(u_sampler, distortions);\n\t// gl_FragColor = testColor;\n\t// gl_PointSize = 10.0;\n}"

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "attribute vec2 a_textureCoords;\nattribute vec4 a_position;\n\n\n\nvarying vec2 v_textureCoords;\n\nattribute float a_pointSize;\n\n// convert position to mapping -1 ~ 1\n// vec2 convertCoords(vec2 position, vec2 resolution) {\n// \tvec2 toOne = (position / resolution) * 2.0;\n// \tvec2 clipSpace = toOne - 1.0;\n\n// \treturn clipSpace;\n// }\n\nvoid main() {\n\t// vec2 converted = convertCoords(a_position, u_resolution);\n\t\n\tgl_Position = a_position;\n\tgl_PointSize = 10.0;\n\tv_textureCoords = a_textureCoords;\n}"

/***/ }
/******/ ]);
//# sourceMappingURL=distortion-bundle.js.map