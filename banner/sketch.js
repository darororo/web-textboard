let txt = document.getElementById("text-input"); 
let col = document.getElementById("selected-color");
let font = document.getElementById("selected-font");
let effect = document.getElementById("selected-effect");
let speed = document.getElementById("speed-input");
// let speed = 0;
let angleInput = document.getElementById("angle-input");
let txtWidth; let txtHeight;
let size = document.getElementById("resize");

let bgColor = "skyblue";
let colorPicker = document.getElementById("color-picker");
const banner = document.getElementById("banner");

let dragging = false;
let isMouseOnText = false;


let r = 15; let angle = 0; let t = 0;

let locationX = 0; let locationY = 0;

let points = [];
let robotoFont;

function preload() {
    robotoFont = loadFont("../assets/Roboto-Black.ttf");
}


function setup() {
    let canvas = createCanvas(Math.max(windowWidth, 920), windowHeight);
    angleMode(DEGREES);
    locationX = canvas.width/2;
    locationY = canvas.height/2;
}

function windowResized() {
    resizeCanvas(Math.max(windowWidth, 920), windowHeight);
  }

function draw() {
    bgColor = colorPicker.value;
    background(bgColor);

    switch(effect.innerText) {
        case "Normal":
            writeText()
        break;
        case "Hammock":
            textEffectRotating()
        break;
    }

    // textEffectRotating()
}

let offsetX;
let offsetY;

function writeText() {
    if(dragging) {
        dragText()
    }
    push();

    textSize(parseInt(size.value));
    fill(col.innerText);
    textFont(font.innerText);
    rotate(angleInput.value); 
    let txtObj = text(txt.value, locationX, locationY);
    pop();
    moveText(txtObj);

    txtWidth = textWidth(txt.value);
    txtHeight = textWidth("M");

    // console.log(txtObj)
   
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
    if(dragging) {
        dragText()
    }

    points = robotoFont.textToPoints(txt.value, locationX, locationY - 250, size.value, {
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

    
    textSize(parseInt(size.value));
    textFont(font.innerText);
    let txtObj = text(txt.innerText, locationX, 500);
    
    let increment = 5*sin(t);
    t++;
    angle += increment;

    moveText(txtObj)

}

function dragText() {
    locationX = mouseX + offsetX;
    locationY = mouseY + offsetY;
    console.log("loc x = " + locationX)
    console.log("loc y = " + locationY)
}


function mousePressed() {
    console.log( mouseX > locationX)
    isMouseOnText = mouseX > locationX && mouseX < locationX + txtWidth && mouseY < locationY && mouseY > locationY - txtHeight;
    if (isMouseOnText) {
        dragging = true;

        offsetX = locationX - mouseX;
        offsetY = locationY - mouseY;
                
        
        console.log("RIP AKIRA TORIYAMA")
    }
    
}

function mouseReleased() {
    console.log("RELEASE THE KRAKEN")
    dragging = false;
}



if (window.innerWidth <= 500) {
  banner.classList.add("rotated");
  banner.style.minWidth = "650px";
}
