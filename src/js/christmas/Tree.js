import Ball from './Ball.js';


export default function Tree () {
	this.body = new THREE.Object3D();
	this.body.castShadow = true;
	this.body.receiveShadow = true;
	this.body.name = 'tree';

	var geometry = new THREE.ConeGeometry( 10, 20, 17 );
	var material = new THREE.MeshPhongMaterial({color: 0x0d7753, shading: THREE.FlatShading });
	var cone = new THREE.Mesh( geometry, material );

  var box = new THREE.BoxGeometry(2, 20, 1.5);
  var boxMaterial = new THREE.MeshPhongMaterial({ color: 0x743300});
	var boxMesh = new THREE.Mesh(box, boxMaterial);
	boxMesh.position.set(0,-20, 0);

	for(var i = 0; i < 10; i++) {
		var redBall = new Ball(1);
		
		redBall.mesh.rotation.y = Math.PI / 10 * i;
		this.body.add(redBall.mesh);
	}
	
	cone.receiveShadow = true;
	cone.receiveShadow = true;
	var cone2 = cone.clone();
	var cone3 = cone.clone();
	cone.name = 'tree';
	cone.position.set(0, 20, 0);
	cone2.scale.set(1.2, 1.2, 1.2);
	cone2.position.set(0, 10, 0);

	cone3.scale.set(1.5, 1.5, 1.5);
	cone3.position.set(0, 0, 0);

	this.body.add(boxMesh);
	this.body.add(cone);
	this.body.add(cone2);
	this.body.add(cone3);
	
	return this;
}

Tree.prototype.addBalls = function() {
	for(var i = 0; i < 10; i++) {
		let ball = new Ball();
		ball.mesh.position.y = i;
		ball.mesh.position.x = Math.sin(Math.PI / 2 * i) + 2;
		ball.mesh.position.z = 0;

		this.body.add(ball.mesh);
	}
}