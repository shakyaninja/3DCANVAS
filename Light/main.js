var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 20;
camera.position.y = 0;
camera.position.x = 30;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 3);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7,aoMapIntensity: 1,alphaMap: 0});
var mesh = new THREE.Mesh(geometry, material);

var geometry1 = new THREE.BoxGeometry(5, 5, 5);
var mesh1 = new THREE.Mesh(geometry1, material);
mesh1.position.y = 1;
mesh1.position.z = 3;

var geometry2 = new THREE.BoxGeometry(1, 1, 3);
var mesh2 = new THREE.Mesh(geometry2, material);
mesh2.position.x = 0;
mesh2.position.y = 2;
mesh2.position.z = 0;

var geometry3 = new THREE.SphereGeometry(1, 32, 32);
var mesh3 = new THREE.Mesh(geometry3, material);
mesh3.position.x = 2;
mesh3.position.y = 2;
mesh3.position.z = 3;

var geometry4 = new THREE.SphereGeometry(1, 32, 32);
var mesh4 = new THREE.Mesh(geometry4, material);
mesh4.position.x = -2;
mesh4.position.y = 2;
mesh4.position.z = 3;

var geometry5 = new THREE.BoxGeometry(4, 4, 4);
var mesh5 = new THREE.Mesh(geometry5, material);
mesh5.position.y = -2;
mesh5.position.z = 3;

var geometry6 = new THREE.BoxGeometry(6, 8, 10);
var mesh6 = new THREE.Mesh(geometry6, material);
mesh6.position.y = -7;
mesh6.position.z = 5;

var geometry7 = new THREE.BoxGeometry(7, 6, 8);
var mesh7 = new THREE.Mesh(geometry7, material);
mesh7.position.y = -7;
mesh7.position.z = 5;

var geometry8 = new THREE.BoxGeometry(2, 2, 2);
var mesh8 = new THREE.Mesh(geometry8, material);
mesh8.position.y = -7;
mesh8.position.z = 10;

scene.add(mesh);
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);
scene.add(mesh6);
scene.add(mesh7);
scene.add(mesh8);

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

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    // console.log("called render:");
    // console.log(global_ambient_color)
    update_light(global_ambient_color);
    update_light_point();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

controls = new THREE.OrbitControls(camera, renderer.domElement); //controls

var ambientValue,x_pos,y_pos,z_pos;

// var diffuseValue,specValue;
function getvalueambient() {
    ambientValue = document.getElementById('ambient').value //get value of slider
   document.getElementById('ambientDisplay').innerHTML = ambientValue //displays this value to the html page
   // console.log(ambientValue)
}
function update_light_point(){
  x_pos = document.getElementById('xValue').value
  y_pos = document.getElementById('yValue').value
  z_pos = document.getElementById('zValue').value
  light1.position.set( x_pos, y_pos, z_pos );
}

  var light2 = new THREE.AmbientLight( 0x404040, 0.5 ); // soft white light
  var light1 = new THREE.PointLight( 0xfdfbd3, 1, 1000, 1 );

function set_light(){
  scene.add(light1);
  scene.add(light2);
}
var global_ambient_color = 0;
var color_choose;
function update_light( color_choose){
  scene.remove(light2);
  if(color_choose !== 0){
      global_ambient_color = color_choose;
  }
  switch (color_choose) {
    case 1:
      light2 = new THREE.AmbientLight( 0x00ff00, ambientValue );
      break;
    case 2:
      light2 = new THREE.AmbientLight( 0x0000ff, ambientValue );
      break;
    case 3:
      light2 = new THREE.AmbientLight( 0xff0000, ambientValue );
      break;
    case 4:
      light2 = new THREE.AmbientLight( 0xf0ed0c, ambientValue );
      break;
    case 5:
      light2 = new THREE.AmbientLight( 0x930cf0, ambientValue );
      break;
    case 6:
      light2 = new THREE.AmbientLight( 0xf07b0c, ambientValue );
      break;
    default:
      light2 = new THREE.AmbientLight( 0x404040, ambientValue );
  }
  scene.add(light2);
}

set_light();
render();
