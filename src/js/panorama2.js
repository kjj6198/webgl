

const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(5, 60, 40);
geometry.scale(-1, 1, 1);

const loader = new THREE.TextureLoader();
loader.load(
  './panorama.jpg',
  (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
  }
);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor({ color: 0x00000 });
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

function render(){
  requestAnimationFrame(render);
  renderer.render(scene,camera);
  controls.update();
}
render();
