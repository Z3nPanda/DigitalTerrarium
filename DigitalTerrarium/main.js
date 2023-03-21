// Main scene

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
controls.enablePan = false;

// --------------------------
// Lighting Initializer 
// --------------------------

// Create a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 1;
pointLight.position.set(-10, 25, 25);
// Create ambient lighting
const ambientLight = new THREE.AmbientLight(0x606060);
ambientLight.intensity = 0.25;
scene.add(pointLight, ambientLight);
scene.add(pointLight);

// Point light helper
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper);


// Update light function
function updateLight(color) {
  // Determine the light color based on the color of the middle pixel on the screen
  const light_color = new THREE.Color(color);
  console.log(color)
  pointLight.color = light_color;
}


// --------------------------
// Terrarium model Assets
// --------------------------
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

// Floating island textures
const islandBaseColor = textureLoader.load('./textures/island/frozenIce.jpg');
const islandNormal = textureLoader.load('./textures/island/Rock_047_Normal.jpg');
const islandRough = textureLoader.load('./textures/island/Rock_047_Roughness.jpg');

// Load floating island model
var island;
loader.load("./models/floatingIsland.gltf", function (gltf) {
  // Rotate around x-axis by 90 degrees for initial view
  gltf.scene.rotation.y = Math.PI/3;
  
  // Create the island material from our textures 
  const islandMaterial = new THREE.MeshStandardMaterial({
    map: islandBaseColor,
    normalMap: islandNormal,
    roughnessMap: islandRough,
    roughness: 1,
  });

  // Loop through the children of the gltf.scene to apply mesh textures
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      // Assign the islandMaterial to the mesh and enable shadows
      child.material = islandMaterial;
      child.castShadow = true;
      // Clone the uv attribute and assign it to uv2
      child.geometry.setAttribute('uv2', child.geometry.attributes.uv.clone());
    }
  });
  
  // Add model to scene
  island = gltf.scene;
  scene.add(island);
});

// Tree textures
const treeBaseColor = textureLoader.load('./textures/tree/Bark_06_basecolor.jpg');
const treeNormal = textureLoader.load('./textures/tree/Bark_06_normal.jpg');
const treeRough = textureLoader.load('./textures/tree/Bark_06_roughness.jpg');

// Tree foliage textures
const foliageBaseColor = textureLoader.load('./textures/leaves/snow_003_COLOR.jpg');
const foliageNormal = textureLoader.load('./textures/leaves/snow_003_COLOR.jpg');

// Load tree model
var treeBase, treeFoliage;
// Tree base
loader.load("./models/treeBase.gltf", function (gltf) {
  // Rotate around x-axis by 90 degrees for initial view
  gltf.scene.rotation.y = Math.PI/3;

  // Create the tree material from our textures 
  const treeMaterial = new THREE.MeshStandardMaterial({
    map: treeBaseColor,
    normalMap: treeNormal,
    roughnessMap: treeRough,
    roughness: 0.5,
  });

  // Loop through the children of the gltf.scene to apply mesh textures
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      // Assign the treeMaterial to the mesh and enable shadows
      child.material = treeMaterial;
      child.castShadow = true;
    }
  });

  // Add tree to scene
  treeBase = gltf.scene;
  scene.add(treeBase);
});
// Tree foliage
loader.load("./models/treeLeaves.gltf", function (gltf) {
  // Rotate around x-axis by 90 degrees for initial view
  gltf.scene.rotation.y = Math.PI/3;

  // Create the foliage material from our textures 
  const foliageMaterial = new THREE.MeshStandardMaterial({
    map: foliageBaseColor,
    normalMap: foliageNormal,
  });

  // Loop through the children of the gltf.scene to apply mesh textures
  gltf.scene.traverse(child => {
    var count = 0
    if (child.isMesh) {
      console.log(count)
      // Assign the treeMaterial to the mesh and enable shadows
      child.material = foliageMaterial;
      child.castShadow = true;
      count += 1
    }
  });

  // Add tree to scene
  treeFoliage = gltf.scene;
  scene.add(treeFoliage);
});

// Rock pool textures
const rockPoolBaseColor = textureLoader.load('./textures/rockPool/stonePoolBase.jpg');
const rockPoolNormal = textureLoader.load('./textures/rockPool/Rock_044_Normal.jpg');
const rockPoolRough = textureLoader.load('./textures/rockPool/Rock_044_Roughness.jpg');

// water textures
const waterBaseColor = textureLoader.load('./textures/water/Water_002_COLOR.jpg');
const waterNormal = textureLoader.load('./textures/water/Water_002_NORM.jpg');
const waterRough = textureLoader.load('./textures/water/Water_002_ROUGH.jpg');
const waterDisp = textureLoader.load('./textures/water/Water_002_DISP.png');

// Load hotsprings rock pool
var rockPool, water;
// Rock Pool
loader.load("./models/rockPool.gltf", function (gltf) {
  // Rotate around x-axis by 90 degrees for initial view
  gltf.scene.rotation.y = Math.PI/3;

  // Create the tree material from our textures 
  const rockPoolMaterial = new THREE.MeshStandardMaterial({
    map: rockPoolBaseColor,
    normalMap: rockPoolNormal,
    roughnessMap: rockPoolRough,
    roughness: 1,
  });

  // Loop through the children of the gltf.scene to apply mesh textures
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      // Assign the treeMaterial to the mesh and enable shadows
      child.material = rockPoolMaterial;
      child.castShadow = true;
    }
  });

  // Add rockPool to scene
  rockPool = gltf.scene;
  scene.add(rockPool);
});

// Water
loader.load("./models/water.gltf", function (gltf) {
  // Rotate around x-axis by 90 degrees for initial view
  gltf.scene.rotation.y = Math.PI/3;

  // Create the water material from our textures 
  const waterMaterial = new THREE.MeshStandardMaterial({
    map: waterBaseColor,
    normalMap: waterNormal,
    roughnessMap: waterRough,
    roughness: 0.75,
    displacementMap: waterDisp,
    displacementScale: 0.024,
  });

  // Loop through the children of the gltf.scene to apply mesh textures
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      // Assign the treeMaterial to the mesh and enable shadows
      child.material = waterMaterial;
      child.castShadow = true;
    }
  });

  // Add water to scene
  water = gltf.scene;
  scene.add(water);
});

// Misc details
var bushes, rocks;
// Rocks that originally would have been bushes but look better as rocks
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
// Additional Scene Effects
// --------------------------


// Populate background with snow fall
function addSnow() 
{
  const geometry = new THREE.SphereGeometry(0.25, 16, 16);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const snow = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  snow.position.set(x,y,z);
  scene.add(snow);

  // Random fall speed for each snowflake
  snow.speed = THREE.MathUtils.randFloat(0.05, 0.1); 
}
// Add 200 petals
Array(250).fill().forEach(addSnow);


// --------------------------
// Animate Scene Elements
// --------------------------


// Animate function for our background and controls
function animate()
{
  requestAnimationFrame(animate); // Tells browser to animate the screen

  // Update background animation
  background_animate(background);

  // Update snow animation
  scene.children.forEach(child => {
    if (child.isMesh) {
      // Update snowflake position by its speed factor
      child.position.y -= child.speed;
      // If snowflake goes below the ground, reset position to the top
      if (child.position.y < -50) {
        child.position.y = THREE.MathUtils.randFloat(50, 100);
      }
    }
  });

  // Update lighting effect
  // updateLight();

  // Enable controls to update screen view
  controls.update();

  // Render to screen
  renderer.render(scene, camera);
}
export const updtLight = updateLight;
animate();