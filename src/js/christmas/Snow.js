import snowFrag from '../../shader/snow.frag';
import snowVert from '../../shader/snow.vert';

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
			vertexShader: document.getElementById( 'step07_vs' ).textContent,
			fragmentShader: document.getElementById( 'step09_fs' ).textContent,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthTest: false
});