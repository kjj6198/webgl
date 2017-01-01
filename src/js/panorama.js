var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 20;

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById( 'panorama' );
var geometry = new THREE.SphereGeometry( 400, 60, 40 );


var textureLoader = new THREE.TextureLoader().load('panorama.jpg', draw);
geometry.scale( -1, 1, 1 );



function draw(texture) {
	var material = new THREE.MeshBasicMaterial( {
		map: texture
	} );
	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );
	update();
}
animate();

var lontitude = 0;
var latitude = 0;
function update() {
	lontitude += 0.1;
	var theta = THREE.Math.degToRad(lontitude);
	latitude = Math.max( - 85, Math.min( 85, latitude ) );
	var phi = THREE.Math.degToRad( 90 - latitude );
	
	camera.lookAt(
		new THREE.Vector3(
			500 * Math.sin( phi ) * Math.cos( theta ),
			500 * Math.cos( phi ),
			500 * Math.sin( phi ) * Math.sin( theta )
		)
	);




	renderer.render( scene, camera );

}