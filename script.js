let onHover = (e) => {
  e.target.classList.add("fill");
};

let clear = () => {
  for (let elem of document.getElementsByClassName("fill")) {
    elem.classList.remove("fill");
  }
};

document.getElementById("reset-button").addEventListener("click", clear);

for (let row = 0; row < 16; row++) {
  let div = document.createElement("div");
  div.id = `${row}`;
  div.className = "row";
  document.getElementById("container").appendChild(div);
  for (let col = 0; col < 16; col++) {
    let div = document.createElement("div");
    div.id = `${row}-${col}`;
    div.className = "cell";
    div.addEventListener("mouseover", onHover);
    document.getElementById(`${row}`).appendChild(div);
  }
}

function createGrid(size) {
  const container = document.getElementById('grid-container');
  container.innerHTML = ''; // Clear the container
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    container.appendChild(cell);
  }
}

