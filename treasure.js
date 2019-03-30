function setTreasures(){
	
	for (var i = 0; i < 6; i++) {
		var row = [] ;
		for (var j = 0; j < 6; j++)
			row.push(new THREE.Vector2(j * 0.2, 1 - 0.2 * i));
		treasuseSpriteArray.push(row);
	}
	
	for (var i = 0; i < 5; i++) {
		var row = [] ;
		for (var j = 0; j < 13; j++)
			row.push(new THREE.Vector2(j * 0.083, 1 - 0.25 * i));
		crystalSpriteArray.push(row);
	}
	
	//6.1
	var treasure1 = createTreasure( new THREE.Vector3( 70 , 6 , -70  )  , 1 ) ;
	var treasureIcon1 = createTreasureIcon( new THREE.Vector3( 70 , 6 , -70  ) ) ;
	var treasure2 = createTreasure( new THREE.Vector3( -170 , 6 , 60  ) , 2  ) ;
	var treasureIcon2 = createTreasureIcon( new THREE.Vector3( -170 , 6 , 60 ) ) ;
	var treasure3 = createTreasure( new THREE.Vector3( 50 , 6 , 70  ) , 3 ) ;
	var treasureIcon3 = createTreasureIcon( new THREE.Vector3( 50 , 6 , 70 ) ) ;
	var treasure4 = createTreasure( new THREE.Vector3( 120, 6 , -220  ) , 4 ) ;
	var treasureIcon4 = createTreasureIcon( new THREE.Vector3( 120, 6 , -220  ) ) ;
	
	
	treasures.push( treasure1 , treasure2  , treasure3,  treasure4 ) ;
	treasureIcons.push( treasureIcon1 , treasureIcon2 , treasureIcon3 , treasureIcon4 ) ;
	pickables.push( treasureIcon1 , treasureIcon2 , treasureIcon3 , treasureIcon4 );
}


function createTreasure( tPosition  , colorType ){
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-3, -6, 0),
		new THREE.Vector3(3, -6, 0),
		new THREE.Vector3(3, 6, 0),
		new THREE.Vector3(-3, 6, 0)
	);
	geometry.faces.push( new THREE.Face3(0, 1, 2));
	geometry.faces.push( new THREE.Face3(0, 2, 3) );
	
	
	geometry.faceVertexUvs[0][0] = [crystalSpriteArray[colorType][0].clone(), crystalSpriteArray[colorType][1].clone(), crystalSpriteArray[ colorType -1][1].clone()] ;
	geometry.faceVertexUvs[0][1] = [crystalSpriteArray[colorType][0].clone(), crystalSpriteArray[colorType - 1 ][1].clone(), crystalSpriteArray[colorType - 1][0].clone()] ;
	
	var treasure = new THREE.Mesh(  geometry  );
	treasure.name = "Treasure" + colorType ;
	treasure.obtain = false; 
	treasure.position.copy ( tPosition );
	scene.add(treasure);
	
	// instantiate a loader	
	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin('');
	
	// load a resource
	loader.load(
		// resource URL		
		'https://i.imgur.com/MarZVYv.png',
		// Function when resource is loaded
		function ( texture ) {
		// do something with the texture
		  //texture.wrapS = THREE.RepeatWrapping;;
			treasure.material = new THREE.MeshBasicMaterial( {
					map: texture,
					transparent: true,  // cutout texture: set transparent: true
					side: THREE.DoubleSide
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
	
	return treasure ; 
}
	
function createTreasureIcon( tPosition){
    
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-15, -15, 0),
		new THREE.Vector3(15, -15, 0),
		new THREE.Vector3(15, 15, 0),
		new THREE.Vector3(-15, 15, 0)
	);

	geometry.faces.push( new THREE.Face3(0, 1, 2));
	geometry.faces.push( new THREE.Face3(0, 2, 3) );
	  
	geometry.faceVertexUvs[0][0] = [treasuseSpriteArray[2][0].clone(), treasuseSpriteArray[2][1].clone(), treasuseSpriteArray[1][1].clone()] ;
	geometry.faceVertexUvs[0][1] = [treasuseSpriteArray[2][0].clone(), treasuseSpriteArray[1][1].clone(), treasuseSpriteArray[0][1].clone()] ;


	var treasureIcon = new THREE.Mesh(geometry ) ;
  
	// instantiate a loader	
	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin('');
	
	// load a resource
	loader.load(
		// resource URL		
		'https://i.imgur.com/xoX300r.png',
		// Function when resource is loaded
		function ( texture ) {
		// do something with the texture
		  //texture.wrapS = THREE.RepeatWrapping;;
			treasureIcon.material = new THREE.MeshBasicMaterial( {
					map: texture,
					transparent: true,  // cutout texture: set transparent: true
					side: THREE.DoubleSide
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
	
	treasureIcon.position.copy(tPosition);
	scene2.add(treasureIcon) ;
	treasureIcon.rotation.x = -Math.PI/2 ;
	return treasureIcon ; 
}

function spriteTreasure( index  , colorType ){
	
	var geometry = treasures[index].geometry;
 
	var st0 = crystalSpriteArray[ colorType ][  baseC].clone();
	var st1 = crystalSpriteArray[ colorType ][baseC + 1].clone();
	var st2 = crystalSpriteArray[ colorType - 1 ][baseC + 1].clone();
	var st3 = crystalSpriteArray[ colorType - 1 ][baseC].clone();

	geometry.faceVertexUvs[0][0][0].copy(st0);
	geometry.faceVertexUvs[0][0][1].copy(st1);
	geometry.faceVertexUvs[0][0][2].copy(st2);
  
	geometry.faceVertexUvs[0][1][0].copy(st0);
	geometry.faceVertexUvs[0][1][1].copy(st2);
	geometry.faceVertexUvs[0][1][2].copy(st3);
  
	geometry.uvsNeedUpdate = true;
  
	baseC = (baseC + 1) % 12 ;

	var geometry = treasureIcons[index].geometry;
 
	var st0 = treasuseSpriteArray[2][  baseT].clone();
	var st1 = treasuseSpriteArray[2][baseT + 1].clone();
	var st2 = treasuseSpriteArray[1][baseT + 1].clone();
	var st3 = treasuseSpriteArray[1][baseT].clone();

	geometry.faceVertexUvs[0][0][0].copy(st0);
	geometry.faceVertexUvs[0][0][1].copy(st1);
	geometry.faceVertexUvs[0][0][2].copy(st2);
  
	geometry.faceVertexUvs[0][1][0].copy(st0);
	geometry.faceVertexUvs[0][1][1].copy(st2);
	geometry.faceVertexUvs[0][1][2].copy(st3);
  
	geometry.uvsNeedUpdate = true;
  
	baseT = (baseT + 1) % 5 ;

}

function foundTreasure(theTreasure) {
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(5, 0, 0),
		new THREE.Vector3(0, 0, -8),
		new THREE.Vector3(-5, 0, 0)
	);
	geometry.faces.push(
		new THREE.Face3(0, 1, 2)
	);
	
	var material = new THREE.MeshBasicMaterial({color:"red"});
	var head = new THREE.Mesh(geometry, material);
	var body = new THREE.Mesh(new THREE.PlaneGeometry( 6, 5), material);
	head.position.z = -2;
	body.rotation.x = -Math.PI/2;
	body.position.z = .5;
	arrow.add(head);
	arrow.add(body);
	scene.add(arrow);
	
	hintTarget = theTreasure;
	
	var playerSight = new THREE.Vector3(0, 0 , -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle ).normalize();
	var xz = theTreasure.position.clone().sub(player.position);
	var crossY = playerSight.clone().cross(xz);
	var anglePT = playerSight.angleTo(xz); // 玩家視線與寶物間的角度關係
	
	$('#treasureInfo').css ('display', '');
	if(crossY.y > 0) {
	
		if(anglePT < 0.4) {
			$('#treasureInfo').text(
				'寶藏在您的前方'
			);
		}
		else if(anglePT >= 0.4  && anglePT <= 1.1) {
			$('#treasureInfo').text(
				'寶藏在您的左前方'
			);
		}
		else if(anglePT > 1.1 && anglePT < 1.9) {
			$('#treasureInfo').text(
				'寶藏在您的左方'
			);
		}
		else if(anglePT >= 1.9  && anglePT <= 2.6) {
			$('#treasureInfo').text(
				'寶藏在您的左後方'
			);
		}
		else if(anglePT > 2.6) {
			$('#treasureInfo').text(
				'寶藏在您的後方'
			);
		}
	}
	else if(crossY.y < 0) {
	
		if(anglePT < 0.4) {
			$('#treasureInfo').text(
				'寶藏在您的前方'
			);
		}
		else if(anglePT >= 0.4  && anglePT <= 1.1) {
			$('#treasureInfo').text(
				'寶藏在您的右前方'
			);
		}
		else if(anglePT > 1.1 && anglePT < 1.9) {
			$('#treasureInfo').text(
				'寶藏在您的右方'
			);
		}
		else if(anglePT >= 1.9  && anglePT <= 2.6) {
			$('#treasureInfo').text(
				'寶藏在您的右後方'
			);
		}
		else if(anglePT > 2.6) {
			$('#treasureInfo').text(
				'寶藏在您的後方'
			);
		}
	}
	setTimeout (function() {
		$('#treasureInfo').css ('display', 'none');
	},2000);
	
}

function theHint() {
	
	var playerSight = new THREE.Vector3(0, 0 , -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle ).normalize();
	var xz = hintTarget.position.clone().sub(player.position);
	var crossY = playerSight.clone().cross(xz);
	var anglePT = playerSight.angleTo(xz);
	
	if(crossY.y > 0) {
		
		arrow.rotation.y = playerSight.angleTo(xz) + angle;
		var hintOffset = player.localToWorld (new THREE.Vector3(-10 * Math.cos(anglePT - Math.PI/2), 1, 10 * Math.sin(anglePT - Math.PI/2)));
		arrow.position.copy(hintOffset);
	}
	else if(crossY.y < 0) {
	
		arrow.rotation.y = angle - playerSight.angleTo(xz);
		var hintOffset = player.localToWorld (new THREE.Vector3(10 * Math.cos(anglePT + Math.PI * 3/2), 1, 10 * Math.sin(anglePT + Math.PI * 3/2)));
		arrow.position.copy(hintOffset);
	}
}

function findMinTreasure(){
 
	var cameraOffset = player.localToWorld(new THREE.Vector3(0, 50, 1));
	camera2.position.copy(cameraOffset);

	var min ;
	var minDistance ;  
	for( var i  = 0 ; i < treasures.length ; i++ ){

		if( scene.getObjectByName( "Treasure" + (i + 1 ) ) !== undefined ){
			if( min === undefined ) {
				min = i;
				minDistance = treasures[i].position.clone().distanceTo( pos );
			}

			var tmp = treasures[i].position.clone().distanceTo( pos ) ;
			if( tmp < minDistance){
				min = i; 
				minDistance = tmp;
			}
		}
	}
	var findT = 5 ;

	if ( minDistance === undefined  ||  minDistance <= 70 ) findT = 4 ;
	else if ( minDistance <= 75 ) findT = 3.5 ;
	else if ( minDistance <= 90 ) findT = 3 ;
	else if ( minDistance <= 110 ) findT = 2.5 ;
	else if( minDistance <= 150 ) findT = 2  ;
	else findT = 1.5  ;

	var ww = $("#smallMap").innerWidth() ;
	var hh = $("#smallMap").innerHeight() ; 

	camera2.left = ww/- findT ;
	camera2.right = ww/ findT; 
	camera2.top = hh / findT ;
	camera2.bottom =  hh /- findT ;

	camera2.updateProjectionMatrix ();

	//camera2.up.set ( 0, 0, -1 );
	camera2.lookAt(playerIcon.position);
 
}