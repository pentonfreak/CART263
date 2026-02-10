const grid = document.getElementById("grid");

/**
 * Pattern options:
 */

const patterns = ["+", "-", "*", "•", "×", "o"];

// const patterns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// const patterns = ["\u25A0", "\u25A1", "\u25A2", "\u25A3", "\u25A4", "\u25A5"];

// const patterns = ["0", "1"]


/**
 * Color options:
 */

let sampleColors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#FF6F91", "#845EC2"];

// let sampleColors = ["#02ff17", "#00b418"];

/**
 * Create grid
 */
for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 50; j++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = patterns[Math.floor(Math.random() * patterns.length)];
  
  // random color as mouse hovers
  cell.addEventListener("mouseover", () => {
    const randomColor = sampleColors[Math.floor(Math.random() * sampleColors.length)];
    cell.style.color = randomColor;
  });

  // mouseover interaction
  cell.addEventListener("mouseover", () => {
    cell.classList.add("active");

    // remove effect after a moment
    setTimeout(() => {
      cell.classList.remove("active");
    }, 600);
  });

  grid.appendChild(cell);
  }
 
}
