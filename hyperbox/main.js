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
var color = [0xd35400,0xe74c3c,0x17202a,0xabb2b9,0x85c1e9 ,0x3498db];
var geometry = new THREE.BoxGeometry(1, 1, 3);
//var mesh = new THREE.Mesh(geometry, material);
// console.log(material.color);
//scene.add(mesh);
meshX = -10;
for(var i = 0; i<10000;i++) {
    var material = new THREE.MeshLambertMaterial({
      color: getRandomColor(getRandomInt(0,5)),
      aoMapIntensity: 1,
      alphaMap: 0});
    var mesh = new THREE.Mesh(geometry, material);
    // console.log(material.color);
    mesh.position.x = (Math.random() - 0.5) * 100;
    mesh.position.y = (Math.random() - 0.5) * 100;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    scene.add(mesh);
    meshX+=1;
}


var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var render = function() {
    requestAnimationFrame(render);
    camera.position.z -= 1;
    // console.log(camera.position.z);
    if(camera.position.z < -500){
      // console.log("reset camera");
      camera.position.z = 10;
    }
    renderer.render(scene, camera);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor(num){
  switch(num){
    case 0:
        return color[0];
        break;
    case 1:
        return color[1];
        break;
    case 2:
        return color[2];
        break;
    case 3:
        return color[3];
        break;
    case 4:
        return color[4];
        break;
    case 5:
        return color[5];
        break;
  }
}
// function onMouseMove(event) {
//     // event.preventDefault();
//
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//
//     raycaster.setFromCamera(mouse, camera);
//
//     var intersects = raycaster.intersectObjects(scene.children, true);
//     for (var i = 0; i < intersects.length; i++) {
//         this.tl = new TimelineMax();
//         // this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut}).delay(.3)
//         // this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut}).delay(.3)
//         // this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}).delay(.3)
//         this.tl.to(intersects[i].object.position, .5, {z: getRandomInt(-3,3) * 10, ease: Expo.easeOut})
//     }
// }

// window.addEventListener('mousemove', onMouseMove);

render();
