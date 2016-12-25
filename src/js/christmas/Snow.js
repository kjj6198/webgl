import snowFrag from '../../shader/snow.frag';
import snowVert from '../../shader/snow.vert';

var texture = THREE.ImageUtils.loadTexture( '../../../assets/snowflake.png' );
var clock = new THREE.Clock();
export default function SnowSystem() {
	var numParticles = 1000,
			width = 100,
			height = window.innerHeight,
			depth = 20,
			parameters = {
					color: 0xFFFFFF,
					height: height,
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
						color:  { type: 'c', value: new THREE.Color( parameters.color ) },
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
				vertexShader: snowVert,
				fragmentShader: snowFrag,
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthTest: false
	});


	function rand( v ) {
		return (v * (Math.random() - 0.5));
	}
	for( var i = 0; i < numParticles; i++ ) {
				var vertex = new THREE.Vector3(
				rand( width ),
				Math.random() * height,
				rand( depth )
			);
		systemGeometry.vertices.push( vertex );
	}
	systemGeometry.verticesNeedUpdate = true;
	const particleSystem = new THREE.Points( systemGeometry, systemMaterial );
	particleSystem.position.y = -100;

	this.particles = particleSystem;


	this.update = function() {
		const delta = clock.getDelta();
		const elapsedTime = clock.getElapsedTime();
		particleSystem.material.uniforms.elapsedTime.value = elapsedTime * 10;

		return particleSystem;
	}	

	return this;

}