// Credit tutorial (https://www.youtube.com/watch?v=Q7AOvWpIVHU) for initial set-up

import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {background, background_animate} from './background.js';

// --------------------------
// General scene set-up
// --------------------------

const scene = new THREE.Scene(); // Initialize our scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Establish camera perspective, the screen

// Initialize Renderer
const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg') // Render background
  }
);

// Set our render to fit to screen from perspective of camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 10, 30);

// Set background from background.js
scene.background = background;

// Enable user controls for the camera view
const controls = new OrbitControls(camera, renderer.domElement);

// --------------------------
// Lighting Initializer 
// --------------------------

// Create a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-10, 25, 25);
// Create ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Point light helper
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper);


// --------------------------
// Load complete model Assets
// --------------------------
const loader = new GLTFLoader();

// Load floating island
var island;
loader.load("./models/floatingIsland.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  island = gltf.scene;
  scene.add(island);
});

// Load tree model
var treeBase, treeLeaves;
// Tree base
loader.load("./models/treeBase.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  treeBase = gltf.scene;
  scene.add(treeBase);
});
// Tree Leaves
loader.load("./models/treeLeaves.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  treeLeaves = gltf.scene;
  scene.add(treeLeaves);
});

// Load hotsprings rock pool
var rockPool, water;
// Rock Pool
loader.load("./models/rockPool.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  rockPool = gltf.scene;
  scene.add(rockPool);
});
// Water
loader.load("./models/water.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  water = gltf.scene;
  scene.add(water);
});

// Misc details
var bushes, rocks;
// Bushes
loader.load("./models/bushes.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  bushes = gltf.scene;
  scene.add(bushes);
});
// Small rocks
loader.load("./models/smallRocks.gltf", function (gltf) {
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });
  gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
  rocks = gltf.scene;
  scene.add(rocks);
});

// --------------------------
// Animate Scene Elements
// --------------------------


// Animate function for our background and controls
function animate()
{
  requestAnimationFrame(animate); // Tells browser to animate the screen

  // Update background animation
  background_animate(background);

  // Enable controls to update screen view
  controls.update();

  // Render to screen
  renderer.render(scene, camera);
}

animate();