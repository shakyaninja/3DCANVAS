var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 10;

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

var geometry = new THREE.BoxGeometry(1, 1, 3);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7,aoMapIntensity: 1,alphaMap: 0});
//var mesh = new THREE.Mesh(geometry, material);

//scene.add(mesh);

meshX = -10;
for(var i = 0; i<50;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}


// var light = new THREE.PointLight(0xFFFFFF, 1, 100)
// light.position.set(0,0,0);
// scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
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

function onMouseMove(event) {
    // event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        // this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut}).delay(.3)
        // this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut}).delay(.3)
        // this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}).delay(.3)
        this.tl.to(intersects[i].object.position, .5, {z: getRandomInt(-3,3) * 10, ease: Expo.easeOut})
    }
}

// function onScrollUp(event){
//   console.log("scrolling");
//   camera.position.x += 0.5;
//   camera.position.y += 0.5;
//   camera.position.z += 0.5;
// }
//
// function onScrollDown(event){
//   camera.position.x -= 0.5;
//   camera.position.y -= 0.5;
//   camera.position.z -= 0.5;
// }

window.onscroll = function() {scrollfunc()};
var position = 0;
function scrollfunc() {
  var scroll = window.scrollTop();
  if (scroll>position) {
    console.log("up");
  } else {
    console.log("down");
  }
}
window.addEventListener('mousemove', onMouseMove);
// // window.addEventListener('scroll',onScrollUp);
// window.addEventListener('scroll', function() {
//   // document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
//   console.log("scrolling");
// });
// // window.addEventListener('scrolldown',onScrollDown);

render();
