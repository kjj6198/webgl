const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;

var light = new THREE.DirectionalLight( new THREE.Color('rgb(255,255,255)') ); // soft white light
console.log(light);


const geometry = new THREE.SphereGeometry(6, 30, 30);
const matertial = new THREE.MeshPhongMaterial({
	color: new THREE.Color('rgb(0,0,212)'),
});

const mesh = new THREE.Mesh(geometry, matertial);
mesh.castShadow = true;
mesh.receiveShadow = true;
mesh.position.set(0, 0, 0);


renderer.setSize(640,480)
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(100, 640 / 480, 1, 10000);

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