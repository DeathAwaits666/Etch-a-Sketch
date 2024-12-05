const gridContainer = document.getElementById("grid-container");
let currentColor = "#000000"; // Default color
let isRainbowMode = false;
let isMousePressed = false;
let isEraserActive = false; // New state for eraser mode

// Function to create the grid
function createGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  gridContainer.innerHTML = ""; // Clear previous grid
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    gridContainer.appendChild(cell);
  }
}

// Initialize the grid
createGrid(16);

// Event listener for grid size change
document.getElementById("grid-size").addEventListener("input", (event) => {
  createGrid(event.target.value);
});

// Clear Button
document.getElementById("clear-btn").addEventListener("click", () => {
  document
    .querySelectorAll(".grid-cell")
    .forEach((cell) => (cell.style.backgroundColor = ""));
});

// Mouse events for drawing and erasing
gridContainer.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    isMousePressed = true; // Start drawing or erasing
    colorCell(event.target);
  }
});

gridContainer.addEventListener("mousemove", (event) => {
  if (isMousePressed && event.target.classList.contains("grid-cell")) {
    colorCell(event.target);
  }
});

gridContainer.addEventListener("mouseup", () => {
  isMousePressed = false; // Stop drawing or erasing
});

gridContainer.addEventListener("mouseleave", () => {
  isMousePressed = false; // Stop drawing if mouse leaves grid
});

// Function to color or erase the cell
function colorCell(cell) {
  if (isEraserActive) {
    cell.style.backgroundColor = ""; // Erase the color (clear the background)
  } else {
    if (isRainbowMode) {
      cell.style.backgroundColor = getRandomColor(); // Rainbow color
    } else {
      cell.style.backgroundColor = currentColor; // Use selected color
    }
  }
}

// Update currentColor when the user selects a new color
document.getElementById("color-picker").addEventListener("input", (event) => {
  currentColor = event.target.value;
});

// Toggle Rainbow Mode
document.getElementById("rainbow-mode").addEventListener("click", () => {
  // Toggle rainbow mode and control sound
  if (isRainbowMode) {
    // Stop the rainbow sound when the button is toggled off
    rainbowSound.pause();
    rainbowSound.currentTime = 0; // Reset the sound
  } else {
    // Start the rainbow sound when the button is toggled on
    rainbowSound.play();
  }

  // Toggle rainbow mode state
  isRainbowMode = !isRainbowMode;
  document.getElementById("rainbow-mode").textContent = isRainbowMode
    ? "Rainbow Mode: ON"
    : "Rainbow Mode: OFF";
});

// Toggle Eraser Mode
document.getElementById("eraser-btn").addEventListener("click", () => {
  isEraserActive = !isEraserActive;

  if (isEraserActive) {
    document.getElementById("eraser-btn").textContent = "Eraser: ON";
    document.getElementById("eraser-btn").style.backgroundColor = "#ff0000"; // Red when ON
  } else {
    document.getElementById("eraser-btn").textContent = "Eraser: OFF";
    document.getElementById("eraser-btn").style.backgroundColor = ""; // Reset to default color when OFF
  }
});

// Helper function to generate random colors for Rainbow Mode
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

// Resize grid to full screen on window resize
document.getElementById("clear-btn").addEventListener("click", () => {
  confetti();
  document.querySelectorAll(".grid-cell").forEach((cell) => {
    cell.style.backgroundColor = "";
  });
});

// Grid resizing with window resize event
document.getElementById("grid-size").addEventListener("input", (event) => {
  gridContainer.style.transition = "all 0.5s ease";
  createGrid(event.target.value);
});

// SOUND EFFECTS

// Sounds for different actions
const drawSound = new Audio("sounds/draw-sound.mp3");
const eraseSound = new Audio("sounds/erase-sound.mp3");
const clearSound = new Audio("sounds/clear-sound.mp3");
const rainbowSound = new Audio("sounds/rainbow-sound.mp3");
const sizeChangeSound = new Audio("sounds/size-change-sound.mp3");
const buttonClickSound = new Audio("sounds/button-click-sound.mp3");

// Set loop for rainbow sound so it keeps playing when rainbow mode is on
rainbowSound.loop = true;

// Event listeners for each action

// Clear button sound
document.getElementById("clear-btn").addEventListener("click", () => {
  clearSound.play();
  document
    .querySelectorAll(".grid-cell")
    .forEach((cell) => (cell.style.backgroundColor = ""));
});

// Mouse down to start sound when drawing or erasing
gridContainer.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    drawSound.loop = true; // Loop the drawing sound as long as the mouse is down
    drawSound.play();
  }
});

// Mouse up to stop drawing sound
gridContainer.addEventListener("mouseup", () => {
  drawSound.pause();
  drawSound.currentTime = 0; // Reset sound to start from the beginning next time
});

// Mouse down to start eraser sound
document.getElementById("eraser").addEventListener("mousedown", () => {
  eraseSound.loop = true; // Loop the eraser sound as long as the mouse is down
  eraseSound.play();
});

// Mouse up to stop eraser sound
document.getElementById("eraser").addEventListener("mouseup", () => {
  eraseSound.pause();
  eraseSound.currentTime = 0; // Reset sound to start from the beginning next time
});

// Rainbow button sound and toggle
document.getElementById("rainbow-mode").addEventListener("click", () => {
  if (isRainbowMode) {
    // Stop the rainbow sound when the button is toggled off
    rainbowSound.pause();
    rainbowSound.currentTime = 0; // Reset the sound
  } else {
    // Start the rainbow sound when the button is toggled on
    rainbowSound.play();
  }

  // Toggle rainbow mode state
  isRainbowMode = !isRainbowMode;
  document.getElementById("rainbow-mode").textContent = isRainbowMode
    ? "Rainbow Mode: ON"
    : "Rainbow Mode: OFF";
});

// Grid size change sound
document.getElementById("grid-size").addEventListener("input", (event) => {
  sizeChangeSound.play();
});

// Button click sounds
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    buttonClickSound.play();
  });
});
