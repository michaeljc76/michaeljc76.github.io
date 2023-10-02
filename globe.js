import '/css.css'
import * as THREE from '/node_modules/three/build/three.module.js';
import {OrbitControls} from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

let earth;
loader.load( '/3Dmodels/wireframe_earth.glb', function ( gltf ) {
    earth = gltf;

    const mesh = gltf.scene
    mesh.scale.set(15, 15, 15);
    scene.add( mesh );
    
}, undefined, function ( error ) {

	console.error( error );

} );

//window.addEventListener('mousemove', onMouseMove);

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