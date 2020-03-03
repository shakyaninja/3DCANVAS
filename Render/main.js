var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,5000)
camera.position.z = 500;
camera.position.y = 30;
camera.position.x = 500;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
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

function Planet(name,orbit_radiusx,orbit_radiusz,radius,color){
  this.orbit_radiusx = orbit_radiusx;
  this.orbit_radiusz = orbit_radiusz;
  this.radius = radius;
  this.color = color;
  this.name = name;
  this.radian = 0;
  this.velocity = 0.05;

  this.update = () =>{
    this.radian += this.velocity;
    this.orbit_radiusx += Math.cos(this.radian);
    this.orbit_radiusz += Math.sin(this.radian);
    this.draw();
  };

  this.draw = () =>{
    var geometry = new THREE.SphereGeometry( this.radius , 100, 100 );
    var material = new THREE.MeshPhongMaterial({
      // map : textureSun,
      color: this.planet_color
    });
    this.name = new THREE.Mesh(geometry, material);
    this.name.position.x = this.orbit_radiusx;
    this.name.position.y = 0;
    this.name.position.z= this.orbit_radiusz;
  }

}

function init(){
console.log("calls init")
// texture define
var textureSun = new THREE.TextureLoader().load( '../texture_solar_system/2k_sun.jpg');
var textureMercury = new THREE.TextureLoader().load( '../texture_solar_system/2k_mercury.jpg');
var textureVenus = new THREE.TextureLoader().load( '../texture_solar_system/2k_venus_atmosphere.jpg');
var textureEarth = new THREE.TextureLoader().load( '../texture_solar_system/2k_earth_daymap.jpg');
var textureMars = new THREE.TextureLoader().load( '../texture_solar_system/2k_mars.jpg');
var textureJupiter = new THREE.TextureLoader().load( '../texture_solar_system/2k_jupiter.jpg');
var textureSaturn = new THREE.TextureLoader().load( '../texture_solar_system/2k_saturn.jpg');
var textureSaturnring = new THREE.TextureLoader().load( '../texture_solar_system/2k_saturn_ring_alpha.png');
var textureUranus = new THREE.TextureLoader().load( '../texture_solar_system/2k_uranus.jpg');
var textureNeptune = new THREE.TextureLoader().load( '../texture_solar_system/2k_neptune.jpg');
var angle =0;
  var geometry = new THREE.SphereGeometry( 25, 100, 100 );
  var material = new THREE.MeshPhongMaterial({
    // map : textureSun,
    color: 0xcb571f,
    emissive: 0xd55214
  });

  var sun = new THREE.Mesh(geometry, material);
  sun.position.x = 0;
  sun.position.y = 0;
  sun.position.z= 0;
  scene.add(sun);

  var geometry2 = new THREE.SphereGeometry( 0.1, 32,32 );
  var material2 = new THREE.MeshPhongMaterial({
    // map : textureMercury,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0x78736e
  });
  var mercury = new THREE.Mesh(geometry2,material2);
  mercury.position.x = 20.81;
  mercury.position.y = 0;
  mercury.position.z= 20.81;
  scene.add(mercury);

  var geometry3 = new THREE.SphereGeometry( 0.4, 32,32 );
  var material3 = new THREE.MeshPhongMaterial({
    // map : textureVenus,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0xfc881a
  });
  var venus = new THREE.Mesh(geometry3,material3);
  venus.position.x = 38.83;
  venus.position.y = 0;
  venus.position.z= 38.83;
  scene.add(venus);

  var geometry4 = new THREE.SphereGeometry( 0.4, 32,32 );
  var material4 = new THREE.MeshPhongMaterial({
    // map : textureEarth,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color :0x144bdf
  });
  var earth = new THREE.Mesh(geometry4,material4);
  earth.position.x = 53.72;
  earth.position.y = 0;
  earth.position.z= 53.72;
  scene.add(earth);

  var geometry5 = new THREE.SphereGeometry( 0.2, 32,32 );
  var material5 = new THREE.MeshPhongMaterial({
    // map : textureMars,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0xb21e0c
  });
  var mars = new THREE.Mesh(geometry5,material5);
  mars.position.x = 81.84;
  mars.position.y = 0;
  mars.position.z= 81.84;
  scene.add(mars);

  var geometry6 = new THREE.SphereGeometry( 5.7, 32,32 );
  var material6 = new THREE.MeshPhongMaterial({
    // map : textureJupiter,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0xa09569
  });
  var jupiter = new THREE.Mesh(geometry6,material6);
  jupiter.position.x = 279.52;
  jupiter.position.y = 0;
  jupiter.position.z= 279.52;
  var orbit_radius = jupiter.position.x;
  scene.add(jupiter);

  var geometry7 = new THREE.SphereGeometry( 4.1, 32,32 );
  var material7 = new THREE.MeshPhongMaterial({
    // map : textureSaturn,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0xfab970
  });
  var saturn = new THREE.Mesh(geometry7,material7);
  saturn.position.x = 512.6;
  saturn.position.y = 0;
  saturn.position.z= 512.6;
  scene.add(saturn);

  var geometry10 = new THREE.RingGeometry( 4.3,5.4, 30, 30 );
  var material10 = new THREE.MeshPhongMaterial({
    // map : textureSaturnring,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0xd8c4ae
  });
  var saturnRing = new THREE.Mesh(geometry10,material10);
  saturnRing.position.x = 512.6;
  saturnRing.position.y = 0;
  saturnRing.position.z= 512.6;
  saturnRing.rotation.x = Math.PI*0.3;
  scene.add(saturnRing);

  var geometry8 = new THREE.SphereGeometry( 1.6, 32,32 );
  var material8 = new THREE.MeshPhongMaterial({
    // map : textureUranus,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0x2965b6
  });
  var uranus = new THREE.Mesh(geometry8,material8);
  uranus.position.x = 1031.07;
  uranus.position.y = 0;
  uranus.position.z= 1031.07;
  scene.add(uranus);

  var geometry9 = new THREE.SphereGeometry( 1.6, 32,32 );
  var material9 = new THREE.MeshPhongMaterial({
    // map : textureNeptune,
    // side : THREE.DoubleSide,
    // depthWrite : false,
    color: 0x0726a4
  });
  var neptune = new THREE.Mesh(geometry9,material9);
  neptune.position.x = 1616.45;
  neptune.position.y = 0;
  neptune.position.z= 1616.45;
  scene.add(neptune);

  function update(){
    jupiter.position.x= jupiter.position.x+ Math.cos(angle)*orbit_radius;
    jupiter.position.z= jupiter.position.z+ Math.sin(angle)*orbit_radius;
    angle+=0.1;
  }

  lights();

}


function lights(){
  console.log("calls lights")
  var light = new THREE.PointLight( 0xfdfbd3, 1,0,2 );
  light.position.set( 0, 0, 0 );
  scene.add( light );
  var light1 = new THREE.AmbientLight( 0xfdfbd3,1 ); // soft white light
  scene.add( light1);

}
// meshX = -10;
// for(var i = 0; i<3;i++) {
//     var mesh = new THREE.Mesh(geometry, material);
//     mesh.position.x = (Math.random() - 0.5) * 10;
//     mesh.position.y = (Math.random() - 0.5) * 10;
//     mesh.position.z = (Math.random() - 0.5) * 10;
//     scene.add(mesh);
//     sunX+=1;
// }



// var light = new THREE.PointLight(0xFFFFFF, 1, 100)
// light.position.set(0,0,0);
// scene.add(light);

// var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
// light.position.set(0,0,25);
// scene.add(light);


var render = function() {
  console.log("calls render")
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        // this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut}).delay(.3)
        // this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut}).delay(.3)
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*2, ease: Expo.easeOut})
        // this.tl.to(intersects[i].object.position, .5, {z: getRandomInt(-3,3) * 10, ease: Expo.easeOut})
    }
}

window.addEventListener('mousemove', onMouseMove);

init();
render();
