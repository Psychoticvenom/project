function createPlayer(){

	for (var i = 0; i < 5; i++) {
		var row = [] ;
		for (var j = 0; j < 5; j++)
		  row.push(new THREE.Vector2(j * 0.25, 1 - 0.25 * i));
		stArray.push(row);
	}
	  
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-5, -8, 0),
		new THREE.Vector3(5, -8, 0),
		new THREE.Vector3(5, 8, 0),
		new THREE.Vector3(-5, 8, 0)
	);

	var face;
	geometry.faces.push( new THREE.Face3(0, 1, 2) );
	geometry.faces.push( new THREE.Face3(0, 2, 3));
		  
	geometry.faceVertexUvs[0][0] = [stArray[4][0].clone(), stArray[4][1].clone(), stArray[3][1].clone()] ;
	geometry.faceVertexUvs[0][1] = [stArray[4][0].clone(), stArray[3][1].clone(), stArray[3][0].clone()] ;

	  
	ruby = new THREE.Mesh(geometry ) ;
	ruby.name =  "Player";	
	
	// instantiate a loader	
	var loader = new THREE.TextureLoader();
	   loader.setCrossOrigin('');
		// load a resource
		loader.load(
			// resource URL	
		  'https://i.imgur.com/bw480oq.png',
		//'https://i.imgur.com/9zbS7mv.png',
		// Function when resource is loaded
			function ( texture ) {
				// do something with the texture
				//texture.wrapS = THREE.RepeatWrapping;;
				ruby.material = new THREE.MeshBasicMaterial( {
					map: texture,
					transparent: true,  // cutout texture: set transparent: true
					side: THREE.DoubleSide,
					opacity:1
				} );
			},
		// Function called when download progresses
		function ( xhr ) {
		  console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		// Function called when download errors
		function ( xhr ) {
		  console.log( 'An error happened' );
		}
	  );
	
	player.add(ruby) ;
	ruby.position.y = 8 ;
	
	obj.push(player);
	scene.add(player);
	
	
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(5, 0, 0),
		new THREE.Vector3(-5, 0, 0),
		new THREE.Vector3(0, 0, -10),
		new THREE.Vector3(0, 5, 0)
	);
	geometry.faces.push(
		new THREE.Face3(3, 0, 2),
		new THREE.Face3(3, 2, 1),
		new THREE.Face3(3, 1, 0),
		new THREE.Face3(2, 0, 1)
	);
	geometry.computeBoundingSphere();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var material = new THREE.MeshLambertMaterial({color:'#efe97a'}) ;
	
	playerIcon = new THREE.Mesh( geometry, material ) ;
	scene2.add(playerIcon);
	
	
	pos = new THREE.Vector3(130 , 0 , 130 );
	//pos = new THREE.Vector3( 20 , 0 , 70 );  // 測試獵人反應時的初始位置
	vel = new THREE.Vector3();
	force = new THREE.Vector3();
	// 玩家的pos , vel , force 初始化
	
}