  // Declare the variable xCoordinates and assign it an array of numbers.
let xCoordinates = [40, 120, 200, 280, 360, 440, 520, 600, 680, 760];
let yCoordinates = [40, 120, 200, 280, 360, 440, 520, 600, 680, 760];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#000000");
}
  function keyPressed() {
  if (key === ' ') {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    for (let i = 0; i < xCoordinates.length; i += 1) {
      for (let j = 0; j < yCoordinates.length; j += 1){
        circle(xCoordinates[i], yCoordinates[j], 80, r, g, b);
                 }
            }
        }
    }


