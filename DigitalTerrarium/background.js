// Day & Night Background
import * as THREE from 'three';

// Define the texture size
const TEXTURE_SIZE = 512;

// Create a canvas element to generate the texture
const canvas = document.createElement('canvas');
canvas.width = TEXTURE_SIZE;
canvas.height = TEXTURE_SIZE;
const context = canvas.getContext('2d');

// Define the gradient colors
const gradient = context.createLinearGradient(0, 0, 0, TEXTURE_SIZE);
gradient.addColorStop(0, '#582ca2'); // start color
gradient.addColorStop(0.25, '#5f2d9f');
gradient.addColorStop(0.5, '#672f9c');
gradient.addColorStop(0.75, '#703198');
gradient.addColorStop(1, '#783295'); // end color

// Fill the canvas with the gradient
context.fillStyle = gradient;
context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Define a function to animate the texture
function animateTexture() {
    // Get the canvas image data
    const imageData = context.getImageData(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
    const data = imageData.data;
  
    // Define the sin wave parameters
    const frequency = 0.005;
    const amplitude = 30;
    const phase = Date.now() * 0.0002;
  
    // Define the peak and trough colors for each sin wave
    const peakColors = ['#d8aaff', '#cda1e6', '#c19ad9', '#b893cf'];
    const troughColors = ['#573d5c', '#4b3555', '#412d4e', '#372544'];
  
    // Loop through each pixel of the canvas
    for (let i = 0; i < data.length; i += 4) {
      // Calculate the x and y coordinates of the pixel
      const x = (i / 4) % TEXTURE_SIZE;
      const y = Math.floor(i / (4 * TEXTURE_SIZE));
  
      // Calculate the sin wave value for the pixel's y coordinate
      const sinValue = Math.sin(y * frequency + phase);
  
      // Calculate the color value for the pixel based on the sin wave value
      let colorValue = Math.round(sinValue * amplitude);
  
      // Determine whether the pixel is a peak or a trough
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
  
    // Put the modified image data back on the canvas
    context.putImageData(imageData, 0, 0);
  
    // Update the texture with the modified canvas
    texture.needsUpdate = true;
  }
  
  // Helper function to convert hex color codes to RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }

// Export the texture and animation functions
export const background = texture;
export const background_animate = animateTexture;
