const t1 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200,
    state: "still"
};
const t2 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200,
    state: "still"
};
const t3 = {
    x: 0,
    y: 0,
    h: 600,
    w: 200,
    state: "still"
};

function setup () {
    createCanvas(600, 600);
}

function draw () {
    background("#000000");

    drawT1();
    drawT2();
    drawT3();

    turnToWhite();
}

function drawT1 () {
    fill("#2600ff");
    rect(t1.x, t1.y, t1.w, t1.h);
}

function drawT2 () {
    fill("#00ffff");
    rect(t2.x + 200, t2.y, t2.w, t2.h);
}

function drawT3 () {
    fill("#00adfe");
    rect(t3.x + 400, t3.y, t3.w, t3.h);
}

function turnToWhite () {
    if (mouseX > t1.x && mouseX < t1.x + t1.w && mouseY > t1.y && mouseY < t1.y + t1.h) {
        t1.state = "hovered";
    } else {
        t1.state = "still";
    }

    if (mouseX > t2.x + 200 && mouseX < t2.x + 200 + t2.w && mouseY > t2.y && mouseY < t2.y + t2.h) {
        t2.state = "hovered";
    } else {
        t2.state = "still";
    }

    if (mouseX > t3.x + 400 && mouseX < t3.x + 400 + t3.w && mouseY > t3.y && mouseY < t3.y + t3.h) {
        t3.state = "hovered";
    } else {
        t3.state = "still";
    }

    if (t1.state === "hovered") {
        fill("#ffffff");
        rect(t1.x, t1.y, t1.w, t1.h);
    }

    if (t2.state === "hovered") {
        fill("#ffffff");
        rect(t2.x + 200, t2.y, t2.w, t2.h);
    }

    if (t3.state === "hovered") {
        fill("#ffffff");
        rect(t3.x + 400, t3.y, t3.w, t3.h);
    }
}
