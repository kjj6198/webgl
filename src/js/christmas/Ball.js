export default function Ball(size, color = 0xEE1212) {
	this.mesh = new THREE.Object3D();
	var geometry = new THREE.SphereGeometry( size, 19, 20 );
	var material = new THREE.MeshPhongMaterial( {color: color } );
	var sphere = new THREE.Mesh( geometry, material );

	this.mesh.add(sphere);

	return this;
}