precision mediump float;

varying vec2 v_textureCoords;

uniform float u_time; // pass time to animate.
uniform sampler2D u_sampler;
uniform vec2 u_resolution;


vec2 pixel() {
  return 1.0 / u_resolution;
}

// make position distortion by sin func.
float distortion(float point,float freq, float speed) {
  return sin(point * freq + ((3.1415/2.0) * u_time * speed));
}

vec2 distortions(vec2 pos) {
	vec2 intensity = vec2(2.0,1.0) * pixel();

  vec2 waves = vec2(
    distortion(pos.y,190.0,0.35),
    distortion(pos.x,100.0,0.4)
  );

  return pos + (waves * intensity * 1.0);
}

void main() {
	vec2 distortions = distortions(v_textureCoords);

	vec4 testColor = vec4(1.0,0.0,0.0,1.0);

	gl_FragColor = texture2D(u_sampler, vec2(distortions.x, v_textureCoords.y));
}