let txt = document.getElementById("text-input"); 
let col = document.getElementById("selected-color");
let font = document.getElementById("selected-font");
let effect = document.getElementById("selected-effect");
let speed = document.getElementById("speed-input");

let r = 15; let angle = 0; let t = 0;
let size = 300;

let locationX=0; let locationY=0;

let points = [];
let robotoFont;

function preload() {
    robotoFont = loadFont("../assets/Roboto-Black.ttf");
}


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);


    locationX = canvas.width/2 - 200;
    locationY = canvas.height/2 + 100;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw() {
    rectMode(CENTER);
    background("skyblue");

    switch(effect.innerText) {
        case "Normal":
            writeText()
        break;
        case "Hammock":
            textEffectRotating()
        break;
    }
    // writeText()
}

function writeText() {
    textSize(size);
    fill(col.innerText);
    textFont(font.innerText);
    let txtObj = text(txt.value, locationX , locationY);
    moveText(txtObj);
}

// function writeText(str, color, font, size) {
//     textSize(size);
//     fill(color);
//     textFont(font);
//     let t = text(str, locationX , 500);
//     moveText(t, 25);
// }

function moveText(textObj) {
    locationX -= speed.value;
    // console.log("Text Width: " +textObj.textWidth());
    // console.log("pos X: " + locationX);

    if(textObj.textWidth() + locationX < 0) {
        locationX = windowWidth;
    }    
}


function textEffectRotating() { 

    points = robotoFont.textToPoints(txt.value, locationX, locationY - 250, size, {
        sampleFactor: 0.5,
        simplifyThreshold: 0.0
    });

    stroke(col.innerText);
    let x = r*cos(angle);
    let y = r*sin(angle);
    translate(20, 300);
    for (let i=0; i<points.length; i++) {
        line(points[i].x, points[i].y, points[i].x + x, points[i].y + y);
    }

    fill(col.innerText);

    
    textSize(size);
    textFont(font.innerText);
    let txtObj = text(txt.innerText, locationX, 500);
    
    let increment = 5*sin(t);
    t++;
    angle += increment;

    moveText(txtObj)

}
