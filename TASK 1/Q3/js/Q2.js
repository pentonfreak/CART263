const circle1 = {
    x: 100,
    y: 100,
    size: 30
}

const circle2 = {
    x: 150,
    y: 150,
    size: 50
}

const circle3 = {
    x: 200,
    y: 200,
    size: 70
}

function setup() {
    createCanvas(640, 640);
}


function draw() {
    background("#000000");

    drawCircle1();
    drawCircle2();
    drawCircle3();
}

function drawCircle1() {
    push;
    noStroke();
    fill("#ff6c6c");
    ellipse(circle1.x, circle1.y, circle1.size);
    pop;
}

function drawCircle2() {
    push;
    noStroke();
    fill("#ff0000");
    ellipse(circle2.x, circle2.y, circle2.size);
    pop;
}

function drawCircle3() {
    push;
    noStroke();
    fill("#8d0000");
    ellipse(circle3.x, circle3.y, circle3.size);
    pop;
}