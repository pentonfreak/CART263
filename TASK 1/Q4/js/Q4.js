const t1 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200
};
const t2 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200
};
const t3 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200
};

function setup () {
    createCanvas(600, 600);
}

function draw () {
    background("#000000");

    drawT1();
    drawT2();
    drawT3();
}

function drawT1 () {
    fill("#008cff");
    rect(t1.x, t1.y, t1.w, t1.h);
}

function drawT2 () {
    fill("#0000ff");
    rect(t2.x + 200, t2.y, t2.w, t2.h);
}

function drawT3 () {
    fill("#1c008a");
    rect(t3.x + 400, t3.y, t3.w, t3.h);
}
