import '/css.css'
import * as THREE from '/node_modules/three/build/three.module.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import Swup from 'swup';
import bg from '/bg2.png';

const swup = new Swup();

/* THREE JS */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xe6e6e6, 1);
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

  plane.position.lerp(plane.position, 0.5);
  
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // for(let i = 0; i < intersects.length; i++){
  //   console.log(intersects);
  // }
}

// Texture mapping and geometry for plane
const bgTexture = new THREE.TextureLoader().load(bg);
// const planeGeo = new THREE.PlaneGeometry(window.innerWidth * 0.175, window.innerHeight * 0.175);
const planeGeo = new THREE.PlaneGeometry(320, 180);
const planeMat = new THREE.MeshBasicMaterial({map: bgTexture, transparent: true});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);

// Texture mapping and geometry for sphere
// const sphereGeo = new THREE.SphereGeometry(800);
// const sphereMat = new THREE.MeshNormalMaterial();
// const sphere = new THREE.Mesh(sphereGeo, sphereMat);
// scene.add(sphere);
// sphere.position.setZ();
// sphere.position.setX(-400);

// Mouse Tracking
window.addEventListener('mousemove', onMouseMove);

const homeButton = document.querySelector('.homebutton');
const contactButton = document.querySelector('.contactbutton');
const projectsButton = document.querySelector('.projectsbutton');
const resumeButton = document.querySelector('.resumebutton');

homeButton.addEventListener( 'click', () => {
  showPlane();
}, false );

contactButton.addEventListener( 'click', () => {
  hidePlane();
}, false );

projectsButton.addEventListener( 'click', () => {
  hidePlane();
}, false );

resumeButton.addEventListener( 'click', () => {
  hidePlane();
}, false );

function showPlane() {
  gsap.to(plane.position, {y: 0, duration: 0.5});
}

function hidePlane() {
  gsap.to(plane.position, {y: -250, duration: 0.5});
}

let knowPage = false;

function animate(){
  if (plane) {
    // Check if on contact or projects and load gltf
    if (knowPage == false) {
      checkPage();
      knowPage = true;
    }
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update;
}
animate();

function checkPage() {
  var page = window.location.pathname.split("/").pop();
  if(page == "index.html"){
    console.log("on home");
    showPlane();
  }
  else {
    console.log("off home");
    hidePlane();
  }
}


window.onresize = function(e){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}