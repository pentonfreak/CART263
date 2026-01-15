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
    size: 70
}

function setup() {
    createCanvas(640, 640);
}


function draw() {
    background("#000000");

    drawStuff1();

    drawStuff2();

    drawStuff3();
}

function drawStuff1() {
    push;
    noStroke();
    fill("#ff6c6c");
    rect(stuff1.x, stuff1.y, stuff1.size);
    pop;
}

function drawStuff2() {
    push;
    noStroke();
    fill("#ff0000");
    rect(stuff2.x, stuff2.y, stuff2.size);
    pop;
}

function drawStuff3() {
    push;
    noStroke();
    fill("#8d0000");
    rect(stuff3.x, stuff3.y, stuff3.size);
    pop;
}

