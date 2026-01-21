let counter = 0;
let radius = 40; // base size for thef irst ellipse
let ellipseAlpha = 10; // starting alpha for the first ellipse

const button1 = {
    w: 100,
    h: 100,
    x: 50,
    y: 50,
    color: "#FF0000",
    state: "still"
}

const circle = {
    x: 300,
    y: 300,
    r: 100,
}

function setup() {
    createCanvas(600, 600);
};

function draw() {
    background("#000000");

    drawButton1();

    changeColorOnHover();

    // Do not draw anything if counter is out of range
    if (counter <= 1 || counter >= 10) {
        return;
    }

    // Single while loop drawing `counter` ellipses centered on screen
    let i = 0;
    let currentRadius = radius;
    let currentAlpha = ellipseAlpha;
    noStroke();

    while (i < counter) {
        strokeWeight(2);
        stroke(255);
        fill(255, currentAlpha);
        ellipse(width / 2, height / 2, currentRadius, currentRadius);

        // each next circle slightly larger and more opaque
        currentRadius += 50;
        currentAlpha += 10;

        i++;
    }
}

// Whenever the mouse is clicked inside the orange square increment the counter variable by 1
function mousePressed() {
    if (mouseX > button1.x && mouseX < button1.x + 50 && mouseY > button1.y && mouseY < button1.y + 50) {
        counter++;
        console.log(counter);
    }
}

function drawButton1() {
    fill(button1.color);
    rect(button1.x, button1.y, 50, 50);
}

function changeColorOnHover() {
    if (mouseX > button1.x && mouseX < button1.x + 50 && mouseY > button1.y && mouseY < button1.y + 50) {
        button1.state = "hovered";
        fill("#ffa200");
        rect(button1.x, button1.y, 50, 50);
    } else {
        button1.state = "still";
    }
}

