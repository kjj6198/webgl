import Tree from  './christmas/Tree.js';
import Ball from './christmas/Ball.js';
import Snows from './christmas/Snow.js';
const tree = new Tree();
window.snows = new Snows();

const musicBPM = 103;
const perNote = 60000 / musicBPM;
const sound = document.querySelector('audio');


// sound.addEventListener('canplay', (e) => {
// 	sound.play();
// });

const scene = new THREE.Scene();
window.scene = scene;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0, 40);


function init() {	
	renderer.shadowMap.enabled = true;
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	var ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	var light = new THREE.DirectionalLight( new THREE.Color('rgb(200,200,200)') ); // soft white ligh t

	light.position.set(20, 10, 10);
	scene.add(light);
	scene.add(hemisphereLight);
	scene.add(ambientLight);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}
init();

const loader = new THREE.OBJLoader();

window.object = {};
loader.load('../../assets/star.obj', function(obj) {
	object = obj;

	obj.children[2].position.set(0, 28, 5);
	obj.children[2].material = new THREE.MeshPhongMaterial({ color: 0xF3BB02})
	scene.add(obj.children[2]);
	scene.add(tree.body);
	renderer.render(scene, camera);
	anime();
});


let animationID;
function anime() {
	const star = scene.getObjectByName('tree.star');
	const tree = scene.getObjectByName('tree');
	const particles = snows.update();
	scene.add(particles);
	tree.rotation.y += Math.PI / 500;
	star.rotation.y += Math.PI / 100;


	renderer.render( scene, camera );
	
	animationID = requestAnimationFrame(anime);
}

function stop() {
	cancelAnimationFrame(animationID);
}