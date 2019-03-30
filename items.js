function setBalls(){
	
  var geometry = new THREE.SphereGeometry(2, 20, 20);
  var mesh  = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color:0xffff00}));
 
  
  var ball1 = new THREE.Object3D();
  
  ball1.add(mesh) ;
  ball1.name = "Ball1" ;
  ball1.position.set( 30 , 3 , 30 ) ;
  scene.add(ball1) ;
  balls.push(ball1);	
  
  //6.1
  var geometry = new THREE.SphereGeometry(2, 20, 20);
  var mesh  = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color:0xffff00}));
  
  var ball2 = new THREE.Object3D(); 
  ball2.add(mesh) ;
  ball2.name = "Ball2" ;
  ball2.position.set( -230 , 3 , -230 ) ;
  scene.add(ball2) ;
  balls.push(ball2);	
	
}