// Credit tutorial (https://www.youtube.com/watch?v=Q7AOvWpIVHU) for initial set-up

import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// --------------------------
// General scene set-up
// --------------------------

const scene = new THREE.Scene(); // Initialize our scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Establish camera perspective, the screen

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#bg') // Render background
  }
);

// Set our render to fit to screen from perspective of camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 10, 30);

renderer.render(scene, camera); // Render screen initial background


// Create texturized background
const backgroundTexture = new THREE.TextureLoader().load('./images/bamboo.jpg');
scene.background = backgroundTexture;

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
const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);


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


/*
// Model Loader
/*
function loadModel(m_name)
{
  const loader = new GLTFLoader();
  loader.load(m_name, (gltf) => {
    gltf.scene.traverse(c => {
      c.castShadow = true;
    });
    gltf.scene.rotation.y = Math.PI/3; // Rotate around x-axis by 90 degrees
    scene.add(gltf.scene);
  });
}

// Load complete model
loadModel("./models/treeBase.gltf"); // Tree base
loadModel("./models/treeLeaves.gltf"); // Tree leaves
loadModel("./models/floatingIsland.gltf"); // Floating Island
loadModel("./models/rockPool.gltf"); // Rock pool
loadModel("./models/smallRocks.gltf"); // Small rocks
loadModel("./models/bushes.gltf"); // Bushes
loadModel("./models/water.gltf"); // Water
*/

// --------------------------
// Additional Scene Effects
// --------------------------

/*
// Populate background with random cherry blossoms
// Idea: have the petals float across the screen
function addPetal() 
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xF8C8DC});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
// Add 200 petals
Array(200).fill().forEach(addPetal);
*/


// Animate function for our torus shape
function animate()
{
  requestAnimationFrame(animate); // Tells browser to animate the screen

  // Enable controls to update screen view
  controls.update();

  renderer.render(scene, camera); // Render to screen
}

animate();
