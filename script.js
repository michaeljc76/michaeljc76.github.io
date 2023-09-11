import "./css.css"
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/* SPLASHSCREEN */

var splashScreen = document.querySelector(".splash");
function hideSplashScreen() {
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add("hidden")
  }, 610)
}

setTimeout(hideSplashScreen, 1000);

/*
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  }, 610)
})
*/

/* THREE JS */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

const planeGeo = new THREE.PlaneGeometry(140, 65);
const planeMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const onMouseMove = (event) => {
  pointer.x = (event.clientX/window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY/window.innerHeight) * 2 + 1;
  
  plane.rotation.y = pointer.x/20;
  plane.rotation.x = -pointer.y/20;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  console.log(pointer.x)
  console.log(pointer.y)
  console.log(plane.rotation.x)
  console.log(plane.rotation.y)
  console.log("SPLIT")

  // for(let i = 0; i < intersects.length; i++){
  //   console.log(intersects);
  // }
}

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