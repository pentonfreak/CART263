// function setup() {
//     createCanvas(600, 600);
// }

// function draw() {
//     background("#000000");

    // Declare the variable xCoordinates and assign it an array of numbers.
let xCoordinates = [20, 40, 60, 80];

function setup() {
  createCanvas(100, 100);

  describe('Four white circles drawn in a horizontal line on a gray background.');
}

function draw() {
  background(200);

  // Access the element at index i and use it to draw a circle.
  for (let i = 0; i < xCoordinates.length; i += 1) {
    circle(xCoordinates[i], 50, 20);
  }
}
}