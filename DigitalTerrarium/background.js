// Day & Night Background
import * as THREE from 'three';
import {updtLight} from './main';
const TEXTURE_SIZE = 512;

// Initalize canvas element to generate a texture
const canvas = document.createElement('canvas');
canvas.width = TEXTURE_SIZE;
canvas.height = TEXTURE_SIZE;
const context = canvas.getContext('2d');
context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

// Create texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Animate texture function
function animateTexture() {
    // Get the canvas image data
    const imageData = context.getImageData(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
    const data = imageData.data;
  
    // Sin wave parameters
    const frequency = 0.005;
    const amplitude = 30;
    const phase = Date.now() * 0.0002;
  
    // Peak and trough colors for each sin wave
    //const peakColors = ['#d8aaff', '#cda1e6', '#c19ad9', '#b893cf']; // Purple/Pink gradient
    //const troughColors = ['#573d5c', '#4b3555', '#412d4e', '#372544']; // Purple/Pink gradient
    const peakColors = ['#6790c2', '#7da1d4', '#94b4e8', '#a6c4ff']; // Ice gradient
    const troughColors = ['#3b6475', '#325763', '#2a4761', '#223953']; // Ice gradient
  
    // Loop through each pixel of the canvas
    for (let i = 0; i < data.length; i += 4) {
      // Compute pixel coordinates
      const x = (i / 4) % TEXTURE_SIZE;
      const y = Math.floor(i / (4 * TEXTURE_SIZE));
  
      // Find sin wave value for the pixel's y coordinate
      const sinValue = Math.sin(y * frequency + phase);
  
      // Calculate the color value for the pixel based on the sin wave value
      let colorValue = Math.round(sinValue * amplitude);
  
      // Determine if the pixel is a peak or a trough
      const peak = sinValue > 0;
      const colors = peak ? peakColors : troughColors;
  
      // Determine the index of the color to use based on the sin wave value
      const colorIndex = Math.floor(Math.abs(sinValue) * colors.length);
  
      // Set the color values for the pixel based on the color index
      const color = colors[colorIndex];
      const [red, green, blue] = hexToRgb(color);
      data[i] = red + colorValue; // Red
      data[i + 1] = green + colorValue; // Green
      data[i + 2] = blue + colorValue; // Blue
    }

    var middle_color = getMiddleHexColor();

    updtLight(middle_color);
  
    // Put modified image data back on the canvas
    context.putImageData(imageData, 0, 0);
  
    // Update texture with modified canvas
    texture.needsUpdate = true;
  }
  
  // Helper function to convert hex color codes to RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }

  // Function for getting the color of the middle pixel's color
  function getMiddleHexColor() {
    // Get middle pixel data
    const imageData = context.getImageData(TEXTURE_SIZE / 2, TEXTURE_SIZE / 2, 1, 1);
    const data = imageData.data;

    // RGB values stored to array
    const red = data[0];
    const green = data[1];
    const blue = data[2];

    // Convert the color values to hex string
    const hex = rgbToHex(red, green, blue);
    return hex;
  }
  
  // RGB to Hex string function
  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

// Export the texture and animation functions
export const background = texture;
export const background_animate = animateTexture;