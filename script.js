const gridContainer = document.getElementById("grid-container");
let currentColor = "#000000"; // Default color
let isRainbowMode = false;

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

document.getElementById("grid-size").addEventListener("input", (event) => {
  createGrid(event.target.value);
});

// Clear Button

document.getElementById("clear-btn").addEventListener("click", () => {
  document
    .querySelectorAll(".grid-cell")
    .forEach((cell) => (cell.style.backgroundColor = ""));
});

// Add hover effect

gridContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    event.target.style.backgroundColor = "black";
  }
});

// Update currentColor when the user selects a new color
document.getElementById("color-picker").addEventListener("input", (event) => {
  currentColor = event.target.value;
});
// Use the selected color on hover

gridContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    event.target.style.backgroundColor = currentColor;
  }
});

// Toggle Rainbow Mode
document.getElementById("rainbow-mode").addEventListener("click", () => {
  isRainbowMode = !isRainbowMode;
  document.getElementById("rainbow-mode").textContent = isRainbowMode
    ? "Rainbow Mode: ON"
    : "Rainbow Mode: OFF";
});

// Helper function to generate random colors
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

// Update hover effect for Rainbow Mode
gridContainer.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    event.target.style.backgroundColor = isRainbowMode
      ? getRandomColor()
      : currentColor;
  }
});
