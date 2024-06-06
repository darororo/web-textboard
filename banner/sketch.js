let txt = document.getElementById("text-input"); 
let col = document.getElementById("selected-color");
let font = document.getElementById("selected-font");
let effectTxt = document.getElementById("selected-effect");
let effectBg = document.getElementById("selected-effect-bg");
let speed = document.getElementById("speed-input");
// let speed = 0;
let angleInput = document.getElementById("angle-input");
let txtWidth; let txtHeight;
let size = document.getElementById("resize");
let colorPickerText = document.getElementById("color-picker-text");
let bgColor = "skyblue";
let colorPicker = document.getElementById("color-picker");
const banner = document.getElementById("banner");

const particles = [];

let dragging = false;
let isMouseOnText = false;


let r = 15; let angle = 0; let t = 0;

let locationX = 0; let locationY = 0;



let bgType = "color";
let imgIndex = -1;

document.getElementById("color-picker").addEventListener("input", () => {
    bgType = "color";
})

document.getElementById("background-btn").addEventListener("click", () => {
    imgIndex = (imgIndex + 1) % 4 ;
    bgType = "img";
})



let points = [];
let robotoFont;
let img = [];

function preload() {
    img.push(loadImage("../assets/bg1.jpeg"))
    img.push(loadImage("../assets/bg2.jpg"))
    img.push(loadImage("../assets/bg3.jpg"))
    img.push(loadImage("../assets/bg4.jpg"))
    robotoFont = loadFont("../assets/Roboto-Black.ttf");
}




let drops = []


function setup() {
    let canvas = createCanvas(Math.max(windowWidth, 1120), windowHeight);
    angleMode(DEGREES);
    locationX = canvas.width/2;
    locationY = canvas.height/2 +50;

    // p = createVector(random(width), 200)

    
}

function windowResized() {
    resizeCanvas(Math.max(windowWidth, 1120), windowHeight);
  }

function draw() {

    switch(bgType) {
        case "color":
            background(colorPicker.value);
        break;  
        case "img":
            background(img[imgIndex]);
        break;
    }

    switch(effectBg.innerText) {
        case "Normal":
        break;
        case "Rainy" :
            bgEffectRain()
        break;
        case "Galaxy":
            bgEffectGalaxy()
        break;
    }

    switch(effectTxt.innerText) {
        case "Normal":
            writeText()
        break;
        case "Hammock":
            textEffectRotating()
        break;
        case "Shadow":
            writeTextWithShadow(effectTxt.value)
           
        break;
        case "Glitch" :
            glitch()
        break;
     }
    
   
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
   
}


function moveText(textObj) {
    locationX -= speed.value;


    let offScreenLeft = locationX + txtWidth < 0;
    let offScreenRight = locationX + txtWidth > canvas.width;
    let offScreenTop = locationY - txtHeight < 0;
    let offScreenBot = locationY > canvas.height;

    console.log(offScreenLeft)

    if(offScreenLeft) {
        locationX = canvas.width;
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
  banner.style.minWidth = "500px";
}

function bgEffectRain() {
    for (let i = 0; i < 5; i++){
        drops.push(new Drop(random(width), 0, 0))
    }
      
    for (let d of drops){
        d.show()
        d.update()
    }
}



class Drop{
  constructor(x, y){
    this.pos = createVector(x, y)
    this.vel = createVector(0, random(8, 11))
    this.length = random(20, 40)
    this.strength = random(255)
  }
  show(){
    stroke(255, this.strength)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.length)
  }
  
  update(){
    this.pos.add(this.vel)
    if (this.pos.y > height + 100){
      drops.shift()
    }
  }
  
}


// function textNeon() {
//     glow(color(255,0,0), 39);
//     writeText();

// }

// function glow(glowColor, blurriness){
//     drawingContext.shadowBlur = blurriness;
//     drawingContext.shadowBlur = glowColor;
//     drawingContext.shadowOffsetX = 20;
//     drawingContext.shadowOffsetY = 20;
// }

function writeTextWithShadow() {
    if (dragging) {
        dragText();
    }
    push();
    textSize(parseInt(size.value) || 0);
    txtWidth = textWidth(txt.value);
    txtHeight = textWidth("M");
    fill(0, 0, 0, 128); // Shadow color
    textFont(font.innerText);
    rotate(parseInt(angleInput.value) || 0);
    text(txt.value, locationX + 5, locationY + 5); // Shadow offset
    fill(colorPickerText.value); // Original text color
    text(txt.value, locationX, locationY);
    pop();
    moveText();
}


function bgEffectGalaxy() {

    if (particles.length < 500) {
        for (let i = 0; i < 10; i++) {
            particles.push({
                x: window.innerWidth/2,
                y: window.innerHeight/2,
                size: Math.random() * 2 + 1,//random size from 1-3
                speed: Math.random() * 4 + 1,//random speed from 1-5
                color: color(random(255), random(255), random(255)), // Generate a random color
                angle: Math.random() * Math.PI * 2 //random angle 0-360
            });
        }
    }

    for (const particle of particles) { //for each particle
        fill(particle.color);
        noStroke();
        ellipse(particle.x, particle.y, particle.size, particle.size);

        // update new angle and speed for each particle
        particle.x += Math.cos(particle.angle) * particle.speed; 
        particle.y += Math.sin(particle.angle) * particle.speed;

        particle.angle += 0.02;

        //if particles move outside screen reset screen
        if(particle.x < 0 || particle.x > window.innerWidth || particle.y < 0 || particle.y > window.innerHeight) {
            particle.x = window.innerWidth / 2;
            particle.y = window.innerHeight / 2;
        }
    }
}
// function glitch() {
  
//     canvas.width = shown.width;
//     canvas.height = shown.height;
  
//     ctx.clearRect(0, 0, ctx.width, ctx.height);
//     ctx.textAlign = 'center';
//     ctx.textBaseLine = 'middle';
//     ctx.font = effectTxt.dataset.font + ' serif';
//     ctx.fillStyle = effectTxt.dataset.color;
  
//     ctx.fillText(effectTxt.dataset.text, canvas.width / 2, canvas.height / 2);
  
//     ctxShown.clearRect(0, 0, ctxShown.width, ctxShown.height);
//     ctxShown.drawImage(canvas, 0, 0);
//     for (let i = 10; i--; ) {
//       glitchInner();
//     }
  
//     function glitchInner() {
//       let width = 100 + Math.random() * 100;
//       let height = 50 + Math.random() * 50;
  
//       let x = Math.random() * canvas.width;
//       let y = Math.random() * canvas.height;
  
//       let dx = x + (Math.random() * 40 - 20);
//       let dy = y + (Math.random() * 30 - 15);
  
//       ctxShown.clearRect(x, y, width, height);
//       ctxShown.fillStyle = '#4a6';
//       ctxShown.drawImage(canvas, x, y, width, height, dx, dy, width, height);
//     }
//   }