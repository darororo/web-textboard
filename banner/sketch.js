let txt = document.getElementById("text-input"); 
let col = document.getElementById("selected-color");
let font = document.getElementById("selected-font");
let effect = document.getElementById("selected-effect");
let speed = document.getElementById("speed-input");
// let speed = 0;
let angleInput = document.getElementById("angle-input");
let txtWidth; let txtHeight;
let size = document.getElementById("resize");
let colorPickerText = document.getElementById("color-picker-text");
let bgColor = "skyblue";
let colorPicker = document.getElementById("color-picker");
const banner = document.getElementById("banner");

let dragging = false;
let isMouseOnText = false;


let r = 15; let angle = 0; let t = 0;

let locationX = 0; let locationY = 0;

let points = [];
let robotoFont;
let img;

// document.getElementById("selected-color").addEventListener("input", () => {
//     col = document.getElementById("selected-color").innerText;
//     console.log(col)

// })

// document.getElementById("color-picker-text").addEventListener("change", () => {
//     col = document.getElementById("color-picker-text").value;
//     console.log(col)
// })
 
function preload() {
    img = loadImage("../assets/bg1.jpeg")
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
    // background(bgColor);
    background(img);


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
    textSize(parseInt(size.value) || 0);
    txtWidth = textWidth(txt.value);
    txtHeight = textWidth("M");
  
    fill(colorPickerText.value);
    textFont(font.innerText);
    rotate(parseInt(angleInput.value) || 0); 
    let txtObj = text(txt.value, locationX, locationY);
    pop();
    moveText(txtObj);

    

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

    let c = colorPickerText.value;

    points = robotoFont.textToPoints(txt.value, locationX, locationY - 250, size.value, {
        sampleFactor: 0.5,
        simplifyThreshold: 0.0
    });

    stroke(c);
    let x = r*cos(angle);
    let y = r*sin(angle);
    translate(20, 300);
    for (let i=0; i<points.length; i++) {
        line(points[i].x, points[i].y, points[i].x + x, points[i].y + y);
    }

    fill(c);

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
    console.log( mouseY > locationY - txtHeight)
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
