var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1100);
camera.position.z = 20;

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById( 'panorama' );
var geometry = new THREE.SphereGeometry( 400, 70, 50 );


var textureLoader = new THREE.TextureLoader().load('panorama.jpg', draw);
geometry.scale( -1, 1, 1 );

var lontitude = 0;
var latitude = 0;
var pointerX = 0;
var pointerY = 0;

function registerInteractionEvents() {
	var on = document.addEventListener.bind(document);
	var isMousePressed = false;

	on('wheel', function(e) {
		camera.fov += e.deltaY  * 0.02;
	}, false);

	window.addEventListener('resize', function() {
		camera.aspect = window.innerWidth / window.innerHeight;

		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false);

	on('mousedown', function(e) {
		isMousePressed = true;
		pointerX = e.clientX;
		pointerY = e.clientY;
	}, false);

	on('mousemove', function(e) {
		if (isMousePressed) {
			lontitude = ( pointerX - e.clientX ) * 0.02 + lontitude;
			latitude = ( e.clientY - pointerY ) * 0.02 + latitude;
		} 

		return ;
	}, false);

	on('mouseup', function(e) {
		isMousePressed = false;
	}, false);
}

registerInteractionEvents();


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


function update() {
	lontitude += 0.1;
	var theta = THREE.Math.degToRad(lontitude);
	latitude = Math.max( -75, Math.min( 75, latitude ) );
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