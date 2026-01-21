const button1 = {
    x: 50,
    y: 50,
    state: "still",
}

const button2 = {
    x: 150,
    y: 50,
    state: "still",
}

const counter = 0;

const circle = {
    x: 300,
    y: 300,
    alpha: 100,
}
let r = 50;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background("#000000");

    drawButton1();
    drawButton2();

    changeColorOnHover();

    drawCircle();

   while (r >= 50) {
    ellipse(circle.x, circle.y, r);
    r = r + 50;
    }
}

function drawButton1() {
    if ( mouseIsPressed) {
        button1.state === "Pressed";
        counter + 50;
    }

    push();
    noStroke();
    fill("#ff5900ff");
    rect(button1.x, button1.y, 50, 50);
    pop();
}

function drawButton2() {
    if (mouseIsPressed) {
        button2.state === "Pressed";
        counter - 50;
    }

    push();
    noStroke();
    fill("#ff0000");
    rect(button2.x, button2.y, 50, 50);
    pop();
}


function changeColorOnHover() {
    if (mouseX > button1.x && mouseX < button1.x + 50 && mouseY > button1.y && mouseY < button1.y + 50) {
        button1.state = "hovered";
        fill("#ffa200");
        rect(button1.x, button1.y, 50, 50);
    } else {
        button1.state = "still";
    }

    if (mouseX > button2.x && mouseX < button2.x + 50 && mouseY > button2.y && mouseY < button2.y + 50) {
        button2.state = "hovered";
        fill("#ffa200");
        rect(button2.x, button2.y, 50, 50);
    } else {
        button2.state = "still";
    }
}

// Whenever the mouse is clicked inside the orange square increment the counter variable by 1

// function mousePressed() {
//     if (mouseX > button1.x && mouseX < button1.x + 50 && mouseY > button1.y && mouseY < button1.y + 50) {
//         counter += 50;
//         console.log(counter);
//     }
//     if (mouseX > button2.x && mouseX < button2.x + 50 && mouseY > button2.y && mouseY < button2.y + 50) {
//         counter -= 50;
//         console.log(counter);
//     }
// };

function drawCircle() {
    if (mouseIsPressed) {
    push();
    noStroke();
    fill(255, 255, 255, circle.alpha);
    ellipse(circle.x, circle.y, circle.r);
    pop();
    }
}

