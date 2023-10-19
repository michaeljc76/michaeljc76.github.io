import '/css.css'
import * as THREE from '/node_modules/three/build/three.module.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import GLOBE from '/models/wireframe_earth.glb'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#globe'),
});
const loader = new GLTFLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
camera.position.setZ(70);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;

let earth;
loader.load( GLOBE , function ( glb ) {
    earth = glb;

    const mesh = glb.scene
    mesh.scale.set(15, 15, 15);
    mesh.position.set(0, 100, 0);
    scene.add( mesh );
}, undefined, function ( error ) {

	console.error( error );

} );

 const ambientlight = new THREE.AmbientLight( 0xffffff, 0.2);
 //const light = new THREE.PointLight( 0xffffff, 10, 100)
 scene.add( ambientlight );
 //scene.add( light );

// window.addEventListener('mousemove', onMouseMove);

// SHOW AND HIDE GLOBE SCRIPTS

const hideButtons = document.getElementsByClassName('hideGlobe');
for(var i = 0; i < hideButtons.length; i++){
  hideButtons[i].addEventListener( 'click', hideGlobe, false );
}
//hideButton.addEventListener( 'click', hideGlobe, false );

const showButtons = document.getElementsByClassName('showGlobe');
for(var i = 0; i < showButtons.length; i++){
  showButtons[i].addEventListener( 'click', showGlobe, false );
}
//showButton.addEventListener( 'click', showGlobe, false );

function showGlobe(){
  gsap.to(earth.scene.position, {y: 0, duration: 0.5});
  //earth.scene.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
}

function hideGlobe(){
  gsap.to(earth.scene.position, {y: 100, duration: 0.5});
  //earth.scene.position.lerp(new THREE.Vector3(0, 100, 0), 0.1);
}

function animate(){
    if (earth) {
        earth.scene.rotation.y += 0.001;
    }

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