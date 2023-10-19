import '/css.css'
import * as THREE from '/node_modules/three/build/three.module.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import GLOBE from '/models/wireframe_earth.glb'
import COMPUTER from '/models/computer.glb'

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

let computer;
loader.load( COMPUTER , function ( glb ) {
    computer = glb;
    const mesh = glb.scene
    mesh.scale.set(3, 3, 3);
    mesh.position.set(0, 100, 0);
    //mesh.rotation.set(Math.PI / 10, -Math.PI / 6, 0)
    scene.add( mesh );
}, undefined, function ( error ) {
	console.error( error );
} );

const blink = document.getElementById('blink');
const videoTexture = new THREE.VideoTexture(blink);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.encoding = THREE.sRGBEncoding;

const videoMat = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
});

const videoGeo = new THREE.PlaneGeometry(27.5, 15.46875);
const videoScreen = new THREE.Mesh(videoGeo, videoMat);

scene.add(videoScreen);
videoScreen.position.set(0, 100, -0.6);

const ambientlight = new THREE.AmbientLight( 0xffffff, 0.2);
scene.add( ambientlight );

// SCRIPTS TO SHOW AND HIDE GLOBE

const homeButton = document.querySelector('.homebutton');
const contactButton = document.querySelector('.contactbutton');
const projectsButton = document.querySelector('.projectsbutton');
const resumeButton = document.querySelector('.resumebutton');


homeButton.addEventListener( 'click', () => {
  hideGlobe();
  hideComputer();
}, false );

contactButton.addEventListener( 'click', () => {
  showGlobe();
  hideComputer();
}, false );

projectsButton.addEventListener( 'click', () => {
  hideGlobe();
  showComputer();
}, false );

resumeButton.addEventListener( 'click', () => {
  hideGlobe();
  hideComputer();
}, false );

function showGlobe(){
  gsap.to(earth.scene.position, {y: 0, duration: 0.5});
  controls.reset();
}

function hideGlobe(){
  gsap.to(earth.scene.position, {y: 100, duration: 0.5});
}

function showComputer(){
  gsap.to(computer.scene.position, {y: -8, duration: 0.5});
  controls.reset();
  camera.rotation.set(-Math.PI/6, Math.PI/10, 0);
  camera.position.set(17, 22, 40);
  gsap.to(videoScreen.position, {y: 3.1, duration: 0.5});
} 

function hideComputer(){
  gsap.to(computer.scene.position, {y: 100, duration: 0.5});
  gsap.to(videoScreen.position, {y: 100, duration: 0.5});

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