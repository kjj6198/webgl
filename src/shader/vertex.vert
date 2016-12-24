attribute vec2 a_textureCoords;
attribute vec4 a_position;

varying vec2 v_textureCoords;

attribute float a_pointSize;

void main() {
	gl_Position = a_position;
	gl_PointSize = 10.0;

	v_textureCoords = a_textureCoords;
}