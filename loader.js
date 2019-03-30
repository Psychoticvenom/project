function loadTexture(  mesh , url ) {

	// instantiate a loader
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  // load a resource
  loader.load(
    url, 
	
    function (texture) {   // Function when resource is loaded
	  texture.wrapS = THREE.RepeatWrapping; 
	  texture.wrapT = THREE.RepeatWrapping;
      console.log ('texture loaded ...');
      mesh.material = new THREE.MeshLambertMaterial( { map: texture});
      
    },   
    function(xhr) {   // Function called when download progresses
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },   
    function(xhr) {   // Function called when download errors
      console.log('An error happened');
    }
  );
 
}

function loadRepeatTexture( size , url ){
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-size/2, size/2, 0),
		new THREE.Vector3(-size/2, -size/2, 0),
		new THREE.Vector3(size/2, -size/2, 0),
		new THREE.Vector3(size/2, size/2, 0)
	);

	var face;
	face = new THREE.Face3(0, 1, 2);
	face.materialIndex = 0;
	geometry.faces.push(face);
	face = new THREE.Face3(0, 2, 3);
	face.materialIndex = 0;
	geometry.faces.push(face);

    geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)]);
    geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)]);

    geometry.computeBoundingSphere();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // CORS:
    // http://stackoverflow.com/questions/24087757/three-js-and-loading-a-cross-domain-image
  
    THREE.ImageUtils.crossOrigin = '';
    texture = THREE.ImageUtils.loadTexture(url);
    texture.repeat.set(16, 16);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    //texture.minFilter = THREE.LinearFilter;

   return new THREE.Mesh(geometry,
    new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide
    }));	
}