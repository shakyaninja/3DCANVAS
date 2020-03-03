var scene = new THREE.Scene();
var objects = [];
var isShiftDown = false;
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

controls = new THREE.OrbitControls(camera, renderer.domElement); //controls

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function generate(){
  const lambert = "Mesh Lambert Material";
  const phong = "Mesh Phong Material";
  const shader = "Shader Material";
    var type = document.getElementById('materialType').value ;
    var x_pos = document.getElementById('xValue').value;
    var y_pos = document.getElementById('yValue').value;
    var z_pos = document.getElementById('zValue').value;
    console.log(type);
    console.log(x_pos);
    console.log(y_pos);
    console.log(z_pos);
    var geometry = new THREE.SphereGeometry( 2,32,32 );
    if(0 == lambert.localeCompare(type)){
          var material = new THREE.MeshLambertMaterial({
              color: 0xF7F7F7,
              aoMapIntensity: 1,
              alphaMap: 0
            });
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = x_pos;
          mesh.position.y = y_pos;
          mesh.position.z = z_pos;
          scene.add(mesh);
          objects.push(mesh);
    }
    else if (0 == phong.localeCompare(type)) {
          var material = new THREE.MeshPhongMaterial({
              color: 0xF7F7F7,
              aoMapIntensity: 1,
              alphaMap: 0
            });
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = x_pos;
          mesh.position.y = y_pos;
          mesh.position.z = z_pos;
          scene.add(mesh);
          objects.push(mesh);

    }
    else{
          var material = new THREE.MeshPhysicalMaterial({
              color: 0xF7F7F7,
              aoMapIntensity: 1,
              alphaMap: 0
            });
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = x_pos;
          mesh.position.y = y_pos;
          mesh.position.z = z_pos;
          scene.add(mesh);
          objects.push(mesh);

      }
}

//for menu toggling
var menu_visibility = true;
var menu = document.getElementById('formShow');
var hidetext = document.getElementById('hide');
function hide(){
  if(menu_visibility){
    menu_visibility = false;
    menu.style.display = "none";
    hidetext.innerHTML = "Show Menu";
  }
  else{
    menu_visibility = true;
    menu.style.display = "block";
    hidetext.innerHTML = "Hide Menu";
  }
}

var light = new THREE.PointLight(0xfdfbd3, 2, 100)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.AmbientLight( 0x4f4f4f ); // soft white light
scene.add( light );

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function onDocumentKeyDown( event ) {

	switch ( event.keyCode ) {

		case 16: isShiftDown = true;
              console.log("Shift is down");
            break;

	}

}

function onDocumentKeyUp( event ) {

	switch ( event.keyCode ) {

		case 16: isShiftDown = false;
              console.log("Shift is up");
              break;

	}

}

function onMouseClick(event) {
     event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    if(intersects.length > 0){
      var intersect = intersects[ 0 ];
      if(isShiftDown){
          console.log("delete");
          scene.remove(intersects.object);
          objects.splice( objects.indexOf( intersect.object ), 1 );
      }
    }
    // for (var i = 0; i < intersects.length; i++) {
    //     this.tl = new TimelineMax();
    //     // this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut}).delay(.3)
    //     // this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut}).delay(.3)
    //     // this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}).delay(.3)
    //     this.tl.to(intersects[i].object.position, .5, {z: getRandomInt(-3,3) * 10, ease: Expo.easeOut})
    // }
}
window.addEventListener('mousemove', onMouseClick);
document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );
render();
