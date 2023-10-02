import '/css.css'
import * as THREE from '/node_modules/three/build/three.module.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import Swup from 'swup';
import bg from '/bg.png';

const swup = new Swup();

/* THREE JS */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
camera.position.setZ(70);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const vec = new THREE.Vector3();

const onMouseMove = (event) => {
  pointer.x = (event.clientX/window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY/window.innerHeight) * 2 + 1;
  
  plane.rotation.y = pointer.x/20;
  plane.rotation.x = -pointer.y/20;

  vec.set(-pointer.x, -pointer.y, plane.position.z);

  plane.position.lerp(vec, 0.5);
  
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // for(let i = 0; i < intersects.length; i++){
  //   console.log(intersects);
  // }
}

// Texture mapping and background geometry
const bgTexture = new THREE.TextureLoader().load(bg);
const planeGeo = new THREE.PlaneGeometry(window.innerWidth * 0.175, window.innerHeight * 0.175);
const planeMat = new THREE.MeshBasicMaterial({map: bgTexture, transparent: true});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);

window.addEventListener('mousemove', onMouseMove);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update;
}
animate();

window.onresize = function(e){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// let oldx = 0;
// let oldy = 0;
// window.onmousemove = function(ev){
//   let changex = ev.x - oldx;
//   let changey = ev.y - oldy;
//   plane.rotation.x += changey/1000;
//   plane.rotation.y += changex/1000;

//   oldx = ev.x;
//   oldy = ev.y;
// }