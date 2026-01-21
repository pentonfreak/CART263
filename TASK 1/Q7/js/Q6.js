function setup() {
    createCanvas(800, 800);
}

function draw() {
    background("#000000");

    drawText();

// 1 to 9 horizontally on the left side of the canvas
 for (let i = 1; i <= 9; i++) {
    fill(255);
    textSize(24);
    textAlign(LEFT, CENTER);
    text(i, 70 + (i - 1) * 30, 500);
 }
// 15 to 1 vertically on the left side of the canvas
 for (let j = 15; j >= 0; j--) {
    fill(255);
    textSize(24);
    textAlign(LEFT, CENTER);
    text(j, 50, 50 + (15 - j) * 30);
    }
}



function drawText() {
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("TEST", width / 2, height / 2);
}