const circle1 = {
    x: 100,
    y: 100,
    size: 30,
    r: 255,
    g: 0,
    b: 0
}

const circle2 = {
    x: 150,
    y: 150,
    size: 50,
    r: 0,
    g: 255,
    b: 0
}

const circle3 = {
    x: 200,
    y: 200,
    size: 70,
    r: 0,
    g: 0,
    b: 255
}

function setup() {
    createCanvas(640, 640);
    drawEllipse(circle1.x, circle1.y, circle1.size, circle1.size, circle1.r, circle1.g, circle1.b);
    drawEllipse(circle2.x, circle2.y, circle2.size, circle2.size, circle2.r, circle2.g, circle2.b);
    drawEllipse(circle3.x, circle3.y, circle3.size, circle3.size, circle3.r, circle3.g, circle3.b);
}


function draw() {
    background("#000000");

    drawCircle1();
    drawCircle2();
    drawCircle3();
}

function drawEllipse(x, y, w, h, r, g, b) {
    push();
    noStroke();
    fill(r, g, b);
    ellipse(x, y, w, h);
    pop();
}

function drawCircle1(x, y, size, r, g, b) {
    push;
    noStroke();
    fill(circle1.r, circle1.g, circle1.b);
    ellipse(circle1.x, circle1.y, circle1.size);
    pop;
}

function drawCircle2() {
    push;
    noStroke();
    fill(circle2.r, circle2.g, circle2.b);
    ellipse(circle2.x, circle2.y, circle2.size);
    pop;
}

function drawCircle3() {
    push;
    noStroke();
    fill(circle3.r, circle3.g, circle3.b);
    ellipse(circle3.x, circle3.y, circle3.size);
    pop;
}