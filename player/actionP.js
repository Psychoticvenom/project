function move(){

	keyboard.update();
  
  
	for( var i  = 0 ; i < balls.length ; i++ ){
		
		if( scene.getObjectByName( "Ball" + (i + 1 ) ) !== undefined && balls[i].position.distanceTo(pos) <= 10 ) {
			scene.remove( balls[i] ) ;
			stamina = 100 ;
			ruby.material.color  = new THREE.Color("rgb(255, 255, 0)");
			getStrength = true ;
			var textarea = $('#messages').append("獲得了大力丸，5秒內無限體力且速度變快！\n");
			textarea.scrollTop(textarea[0].scrollHeight - textarea.height());
			
			var timer = setTimeout (function() {
				ruby.material.color = new THREE.Color("rgb(255, 255, 255)");
				getStrength = false ;
			},5000);
		}
		
	}
	
    if( stamina <= 0 )  rest = true ; // 體力低於0的話得休息一下
  
    if( stamina <= 40)
		ruby.material.opacity = 0.4 ; 
    else
		ruby.material.opacity = stamina / 100  ;
  
    if( stamina <= 30)
		$("#playerPhoto").attr("src","https://i.imgur.com/TCsC9xE.png");
    else
		$("#playerPhoto").attr("src","https://i.imgur.com/KnWf7hN.png");
		
		
	if( rest){
		stop  = true ; 
		if ( stamina <= 30)  stamina += 0.2 ;   // 休息時候必須要恢復到一定值（30）才能繼續行動
		else  rest = false ; 
	}
	else {
		
		if (keyboard.pressed("up") ) { // 前進中 減少體力
			stop  = false ; 
			if( stamina > 0 && !getStrength ) stamina -= 0.2 ; 
		}
		else{ // 沒有前進待在原地，隨時間恢復體力
			if( stamina < 100 ) stamina += 0.1 ;
			stop  = true ; 
		}
		
		if (keyboard.pressed("right")) { // 往右轉
			direction = -Math.PI/16;
			angle -= 0.05 ;   //5.7
		}
		else if (keyboard.pressed("left")) { // 往左轉
			direction = Math.PI/16;
			angle += 0.05 ;  //5.7
		}
		else 
			direction = 0; 
	}	
	
	pow = getStrength ? 400 : 200 ;
	  
	if (stop) {
		vel = new THREE.Vector3(0, 0, 0);
		force = new THREE.Vector3(0, 0, 0);
	} else {
		force = new THREE.Vector3(0 , 0 , -1 ).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle + direction ).multiplyScalar(pow);
		spriteCounter++ ;
		if( spriteCounter % 6 === 0 ) spriteAnimate();
	}
		
	var dt = clockA.getDelta(); // delta-time
	  
	 
	// resistance force 
	force.add(vel.clone().multiplyScalar(-2));
	// vel = vel + force/mass * dt
	vel.add(force.clone().multiplyScalar(dt / mass));  
	// pos = pos + vel * dt
	  
	//6.1
	for( var i = 0 ; i < obstacles.length ; i++ ){  // 碰撞偵測
		if( obstacles[i].pos.distanceTo(pos) <= obstacles[i].boundingCircleR + 6 ){
			vel = vel.clone().sub (collisionDetection( pos.x  , pos.z  , i  , 6 , vel )  );
			console.log( i + 1 );
			//collisionDetection( pos.x  , pos.z  , i  , 5 , vel );
		}
	}
	  
	  
	pos.add(vel.clone().multiplyScalar(dt));

	if (vel.length() > 0.001) {
		angle = Math.atan2(-vel.x, -vel.z);
	}
	
	// copy to cylinder
	player.position.copy(pos);
	player.rotation.y = angle;
	playerIcon.rotation.y = angle;
	playerIcon.position.copy(pos);
}

function spriteAnimate() {


  var geometry = ruby.geometry;

  var st0 = stArray[4][ baseS].clone();
  var st1 = stArray[4][baseS + 1].clone();
  var st2 = stArray[3][baseS + 1].clone();
  var st3 = stArray[3][baseS ].clone();

  geometry.faceVertexUvs[0][0][0].copy(st0);
  geometry.faceVertexUvs[0][0][1].copy(st1);
  geometry.faceVertexUvs[0][0][2].copy(st2);
  
  geometry.faceVertexUvs[0][1][0].copy(st0);
  geometry.faceVertexUvs[0][1][1].copy(st2);
  geometry.faceVertexUvs[0][1][2].copy(st3);
  
  geometry.uvsNeedUpdate = true;
  
  baseS = (baseS + 1) % 4 ;
 
}