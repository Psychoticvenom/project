function collisionDetection( positionX , positionZ , index,     radius  ,  velocity	) { // 偵測玩家或獵人是否有碰到障礙物

  var Rad2 =  radius * radius; // 角色半徑的平方
  var Check_Intersect = false;   // 確認是否有和任何障礙物接觸到
  var C = new THREE.Vector3( positionX , 0 , positionZ) // 玩家角色位置
  //console.log(C);
  var centerX = obstacles[index].pos.x; // 障礙物的中心位置X
  var centerZ = obstacles[index].pos.z; // 障礙物的中心位置Z
  var center = new THREE.Vector3( centerX , 0 ,centerZ) ;
  
  var boxAngle = obstacles[index].angle; // 障礙物旋轉的角度
  var boxX = obstacles[index].boxX ; // 障礙物的長度
  var boxZ = obstacles[index].boxZ ; // 障礙物的寬度
  
  var R = new THREE.Vector3(centerX ,0 , centerZ);  
   
  /* 以障礙物的local+X軸當成主軸之一，與global+Y外積可的另一主軸 */
  var mainAxis1 = new THREE.Vector3( 1, 0 ,0 ).applyAxisAngle( new THREE.Vector3(0,1,0) , boxAngle ).normalize();
  var mainAxis2 = mainAxis1.clone().cross( new THREE.Vector3( 0 , 1 , 0 ) ).normalize() ;
  
  /* 計算障礙物四端點的世界座標 */
  var maxXminZ = obstacles[index].localToWorld( new THREE.Vector3( boxX/2,0,-boxZ/2) ); 
  var minXminZ = obstacles[index].localToWorld( new THREE.Vector3( -boxX/2,0,-boxZ/2) ) ;
  var maxXmaxZ = obstacles[index].localToWorld( new THREE.Vector3( boxX/2,0,boxZ/2) ) ;
  var minXmaxZ = obstacles[index].localToWorld( new THREE.Vector3( -boxX/2 ,0,boxZ/2) ) ; 

	// 以障礙物中心為原點，算出端點在障礙物的local座標，求出max & min
  var RminX = minXmaxZ.clone().sub(C.clone()).dot( mainAxis1.clone() ) ; 
  var RmaxX = maxXmaxZ.clone().sub(C.clone()).dot( mainAxis1.clone() )  ; 
  var RminZ = maxXminZ.clone().sub(C.clone()).dot( mainAxis2.clone() )  ; 
  var RmaxZ = maxXmaxZ.clone().sub(C.clone()).dot( mainAxis2.clone() )  ; 
  
  var newVel ;
  
 if (RmaxX < 0){ /* R to left of circle center */
		if (RmaxZ < 0) /* R in lower left corner */
			Check_Intersect = ((RmaxX * RmaxX + RmaxZ * RmaxZ) < Rad2);	
		else if (RminZ > 0) /* R in upper left corner */
			Check_Intersect = ((RmaxX * RmaxX + RminZ * RminZ) < Rad2);	
		else /* R due West of circle */
			Check_Intersect = (Math.abs(RmaxX) < radius);
			
		if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN3) <= 0 )
			newVel =  velocity.clone().projectOnVector(obstacles[index].vectorN3);
		else if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) <= 0 ) 
			newVel = velocity.clone().projectOnVector(obstacles[index].vectorN1);
		else if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) <= 0 ) 
			newVel =  velocity.clone().projectOnVector(obstacles[index].vectorN2); 

	}
	else if (RminX > 0) { /* R to right of circle center */
		 console.log("case2");
		if (RmaxZ < 0) /* R in lower right corner */
			Check_Intersect = ((RminX * RminX + RmaxZ * RmaxZ) < Rad2);	
		else if (RminZ > 0) /* R in upper right corner */
			Check_Intersect = ((RminX * RminX + RminZ * RminZ) < Rad2);
		else /* R due East of circle */
			Check_Intersect = (RminX < radius);	
		
		if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN4) <= 0 )
			newVel = velocity.clone().projectOnVector(obstacles[index].vectorN4);
		else if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) <= 0 ) 
			newVel = velocity.clone().projectOnVector(obstacles[index].vectorN1);
		else if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) <= 0 ) 
			newVel =  velocity.clone().projectOnVector(obstacles[index].vectorN2); 
	}
	else{ /* R on circle vertical centerline */
		console.log("case3");
		if (RmaxZ < 0){ /* R due South of circle */
			Check_Intersect = (Math.abs(RmaxZ) <  radius );	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) <= 0 ) 
				newVel = velocity.clone().projectOnVector(obstacles[index].vectorN1);
		}
		else if (RminZ > 0) {/* R due North of circle */
			Check_Intersect = (RminZ <  radius);
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) <= 0 ) 
				newVel =  velocity.clone().projectOnVector(obstacles[index].vectorN2);
		}
		else /* R contains circle centerpoint */
			Check_Intersect = true;
	} 
	//console.log(Check_Intersect);
	if( newVel !== undefined) return newVel ;
	else  return new THREE.Vector3(0,0,0);
}
