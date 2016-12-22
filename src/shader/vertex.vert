attribute vec2 a_textureCoords;
attribute vec4 a_position;



varying vec2 v_textureCoords;

attribute float a_pointSize;

// convert position to mapping -1 ~ 1
// vec2 convertCoords(vec2 position, vec2 resolution) {
// 	vec2 toOne = (position / resolution) * 2.0;
// 	vec2 clipSpace = toOne - 1.0;

// 	return clipSpace;
// }

void main() {
	// vec2 converted = convertCoords(a_position, u_resolution);
	
	gl_Position = a_position;
	gl_PointSize = 10.0;
	v_textureCoords = a_textureCoords;
}