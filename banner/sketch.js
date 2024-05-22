let txt = document.getElementById("text-input").value; 
let col = document.getElementById("color-input").innerText;
let font = document.getElementById("font-input").innerText;

let locationX = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    rectMode(CENTER);
    background("skyblue");
    writeText(txt, col, font, 500);
}

function writeText(str, color, font, size) {
    textSize(size);
    fill(color);
    textFont(font);
    let t = text(str, locationX , 500);
    moveText(t, 25);
}

function moveText(textObj, speed) {
    locationX -= speed;
    console.log(textObj.textWidth());
    if(textObj.textWidth() + locationX < 0) {
        locationX = windowWidth;
    }
}