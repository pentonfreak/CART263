let frameRate = 30;

const stuff1 = {
    x: 100,
    y: 100,
    size: 30,
    speed: 5
}

const stuff2 = {
    x: 150,
    y: 150,
    size: 50
}

const stuff3 = {
    x: 200,
    y: 200,
    size: 70,
    color: "#8d0000",
    speed: 3
}

function setup() {
    createCanvas(640, 640);
}


function draw() {
    background("#000000");

    drawStuff1();

    drawStuff2();

    // Update stuff3 position each frame
    stuff3.y += stuff3.speed;
    
    // Handle bottom canvas bounds for stuff3
    if (stuff3.y > height) {
        stuff3.y = 0;
    }

    drawStuff3();
}

function mouseClicked() {
    stuff1.x = mouseX;
    stuff1.y = mouseY;
}

function keyPressed() {
    if (key === ' ') {
        stuff2.x = random(0, width - stuff2.size);
        stuff2.y = random(0, height - stuff2.size);
    }
}

function mouseMoved() {
    stuff3.color = color(random(255), random(255), random(255));
}

function drawStuff1() {
    push();
    noStroke();
    fill("#ff6c6c");
    rect(stuff1.x, stuff1.y, stuff1.size);
    pop();
}

function drawStuff2() {
    push();
    noStroke();
    fill("#ff0000");
    rect(stuff2.x, stuff2.y, stuff2.size);
    pop();
}

function drawStuff3() {
    push();
    noStroke();
    fill(stuff3.color);
    rect(stuff3.x, stuff3.y, stuff3.size);
    pop();
}

