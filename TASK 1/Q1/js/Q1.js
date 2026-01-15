function setup() {
    createCanvas(640, 640);
}


function draw() {
    background("#000000");

    drawEllipse1();
    drawEllipse2();
    drawEllipse3();
}

function drawEllipse1() {
    push;
    noStroke();
    fill("#880000");
    ellipse(100, 100, 30);
    pop;
}

function drawEllipse2() {
    push;
    noStroke();
    fill("#a30000");
    ellipse(150, 150, 50);
    pop;
}

function drawEllipse3() {
    push;
    noStroke();
    fill("rgb(255, 0, 0)");
    ellipse(200, 200, 70);
    pop;
}