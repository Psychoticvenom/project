function collisionDetection( positionX , positionZ,   index ,     radius  ,  velocity	) { // 偵測玩家或獵人是否有碰到障礙物
						 //   角色所在位置X,Z      障礙物的編號    角色半徑   角色速度
  var Rad2 = radius * radius; // 角色半徑的平方
  var Check_Intersect = false;   // 確認操作中的玩家是否有和任何障礙物接觸到
  
  var centerX = obstacles[index].pos.x; // 障礙物的中心位置X
  var centerZ = obstacles[index].pos.z; // 障礙物的中心位置Z
  var boxAngle = obstacles[index].angle; // 障礙物旋轉的角度
  var boxX = obstacles[index].boxX + 0.5; // 障礙物的長度
  var boxZ = obstacles[index].boxZ + 0.5; // 障礙物的寬度
  
  var C = new THREE.Vector3( positionX ,0 , positionZ);  
  var R = new THREE.Vector3( centerX ,0 , centerZ); //為了方便計算玩家到中心點的距離，忽略兩者之間的高度差 y統一為0
  
  var Cx = ( C.clone().sub(R) ).dot( new THREE.Vector3(1,0,0).applyAxisAngle( new THREE.Vector3(0,1,0) , boxAngle).normalize()  );
  
  var Cz = ( C.clone().sub(R) ).dot( new THREE.Vector3(0,0,1).applyAxisAngle( new THREE.Vector3(0,1,0) , boxAngle).normalize()  );
  
  //console.log(new THREE.Vector3(Cx, 0 , Cz));
  
  // 以下用來偵測玩家在障礙物的相對位置，若是碰觸到的話  Check_Intersect會轉為True 並給予前進中的角色一力量
   
  /* Translate coordinates, placing C at the origin. */
  var maxX = boxX / 2 - Cx;   
  var maxZ = boxZ / 2  - Cz;
  var minX = -( boxX / 2 ) - Cx;
  var minZ = -( boxZ / 2 ) - Cz; 

	if (maxX < 0){ /* R to left of circle center */
    
		if (maxZ < 0) {/* R in lower left corner */
			console.log("in lower left");
			Check_Intersect = ((maxX * maxX + maxZ * maxZ) < Rad2);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN1);
		}
		else if (minZ > 0) {/* R in upper left corner */
			console.log("in upper left");
			Check_Intersect = ((maxX * maxX + minZ * minZ) < Rad2);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN2);
		}
		else{ /* R due West of circle */
			console.log("middle");
			Check_Intersect = (Math.abs(maxX) < radius);
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN3) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN3);
		}
		
	}
	else if (minX > 0) { /* R to right of circle center */
    
		if (maxZ < 0){ /* R in lower right corner */
			Check_Intersect = ((minX * minX + maxZ * maxZ) < Rad2);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN1);
		}
		else if (minZ > 0){ /* R in upper right corner */
			Check_Intersect = ((minX * minX + minZ * minZ) < Rad2);
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN2);
		}
		else{ /* R due East of circle */
			Check_Intersect = (minX < radius);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN4) <= 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN4);
		}
	}
	else{ /* R on circle vertical centerline */
    
		if (maxZ < 0){ /* R due South of circle */
			Check_Intersect = (Math.abs(maxZ) < radius);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) < 0 ) 
				return velocity.clone().projectOnVector(obstacles[index].vectorN1);
			else if ( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN1) == 0 ) {
				return velocity.clone().projectOnVector(obstacles[index].vectorN3);
			}	
		}
		else if (minZ > 0){ /* R due North of circle */
			Check_Intersect = (minZ < radius);	
			if( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) < 0 )
				return velocity.clone().projectOnVector(obstacles[index].vectorN2);
			else if ( Check_Intersect && velocity.clone().dot(obstacles[index].vectorN2) == 0 ) 
				return velocity.clone().projectOnVector(obstacles[index].vectorN3);
		}
		else /* R contains circle centerpoint */
			Check_Intersect = true;
	} 

	return new THREE.Vector3(0,0,0);
	  
		
}