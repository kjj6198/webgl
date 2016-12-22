/*
 * [TODO] make this function more reusable.
 * you can extract it to interface like createProgram
 * combine program... etc.
*/
import * as WebGL from '../webgl-util/webgl.js';

import frag from '../../shader/distoration.frag';
import vertex from '../../shader/vertex.vert';

export default function distortion(canvas, imageURL) {
	const gl = WebGL.initGL(canvas);
	const program = WebGL.createProgram(gl, vertex, frag);

	const time = gl.getUniformLocation(program, 'u_time');
	const resolution    = gl.getUniformLocation(program, 'u_resolution');
	gl.uniform2f(resolution, canvas.width, canvas.height);
	const textureCoords = gl.getAttribLocation(program, 'a_textureCoords');
	const position      = gl.getAttribLocation(program, 'a_position');
	const pointSize     = gl.getAttribLocation(program, 'a_pointSize');

	const textures = [
	  0, 0,
	  1, 0,
	  0, 1,
	  1, 1,
	];

	const vertices = [
	  -0.8, -0.8,
	  0.8, -0.8,
	  -0.8, 0.8,
	  0.8, 0.8,
	];

	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);

	gl.enableVertexAttribArray(textureCoords);
	gl.vertexAttribPointer(textureCoords, 2, gl.FLOAT, false, 0, 0);


	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 4);


	const bindLoadedImage = (gl) => (img) => {
		WebGL.createTexture(gl, img);
		draw(0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	WebGL.loadImage(
		imageURL,
		bindLoadedImage(gl)
	);

	let curTime = 0;
	let lastTime = 0;

	function draw(elapsed) {
		requestAnimationFrame(draw);
		
		let delta = elapsed - lastTime;
		lastTime = elapsed;

		let step = delta / (1000 / 60);
		curTime += step;

		gl.uniform1f(time, curTime);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	}			
}