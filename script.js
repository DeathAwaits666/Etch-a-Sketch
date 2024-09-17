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
