function dead() {
	
	var dead = new THREE.Object3D();
	
	sceneDead = new THREE.Scene();
	cameraDead = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 100);
	cameraDead.position.z = 5;
	cameraDead.lookAt(new THREE.Vector3(0, 0, 0));
	
	var sprite = new SpriteText2D( "Defeated", {
		align: textAlign.center,
		font: '80px 微軟體',
		fillStyle: '#ff0000',
		antialias: true
	});
	sprite.scale.set(0.03 , 0.03 , 0.03);
	sprite.position.y = 5;
	
	var curtain = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),
		new THREE.MeshBasicMaterial({
			color : 0x888888,
			transparent : true,
			opacity: 0.7
		})
	);
	
	dead.add(sprite);
	dead.add(curtain);
	
	sceneDead.add(dead);
	
}

function win() {
	
	var win = new THREE.Object3D();
	
	sceneWin = new THREE.Scene();
	cameraWin = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 100);
	cameraWin.position.z = 5;
	cameraWin.lookAt(new THREE.Vector3(0, 0, 0));
	
	var sprite = new SpriteText2D( "YOU WIN", {
		align: textAlign.center,
		font: '80px 微軟體',
		fillStyle: '#ff0000',
		antialias: true
	});
	sprite.scale.set(0.03 , 0.03 , 0.03);
	sprite.position.y = 5;
	
	var curtain = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),
		new THREE.MeshBasicMaterial({
			color : 0x888888,
			transparent : true,
			opacity: 0.7
		})
	);
	
	win.add(sprite);
	win.add(curtain);
	
	sceneWin.add(win);
	
}