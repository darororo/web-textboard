let txt = document.getElementById("text-input"); 
let col = document.getElementById("color-input");
let font = document.getElementById("font-input");

let locationX = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw() {
    rectMode(CENTER);
    background("skyblue");
    writeText(txt.value, col.innerText, "Times New Roman", 500);
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