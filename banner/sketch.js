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



let points = []; // text points
let robotoFont;
let img = [];

function preload() {
    img.push(loadImage("../assets/bg1.jpeg"))
    img.push(loadImage("../assets/bg2.jpg"))
    img.push(loadImage("../assets/bg3.jpg"))
    img.push(loadImage("../assets/bg4.jpg"))
    robotoFont = loadFont("../assets/Roboto-Black.ttf");
}

// Bg Effect
let drops = []  // rain drops
let fireworks = []  // fireworks
let fireworkGravity;    // gravity
let fireworkColors = [];

// fire text
let firePoints = [];


function setup() {
    let canvas = createCanvas(Math.max(windowWidth, 1120), windowHeight);
    angleMode(DEGREES);
    locationX = canvas.width/2;
    locationY = canvas.height/2 +50;

    fireworkGravity = createVector(0, 0.1);
    fireworkColors = ["#ff99c8","#fcf6bd","#d0f4de","#a9def9","#e4c1f9"];
}

function windowResized() {
    resizeCanvas(Math.max(windowWidth, 1120), windowHeight);
}

function clearMemory() {
    fireworks = [];
    drops = [];
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
            fireworks = [];
            bgEffectRain();
        break;
        case "Galaxy":
            drops = [];
            fireworks = [];
            bgEffectGalaxy()
        break;
        case "Firework":
            drops = [];
            bgEffectFirework();
        break;
    }

    switch(effectTxt.innerText) {
        case "Normal":
            firePoints = [];
            points = [];
            writeText();
        break;
        case "Hammock":
            firePoints = [];
            textEffectRotating()
        break;
        case "Shadow":
            writeTextWithShadow(effectTxt.value)
        break;
        case "Chibi Fire" :
            textEffectFire();
            writeText();
        break;
     }
    
   
}

let offsetX;
let offsetY;

let tf; // text font
function writeText() {
    if(dragging) {
        dragText()
    }
    push();
    textSize(parseInt(size.value) || 0);
    txtWidth = textWidth(txt.value);
    txtHeight = textWidth("M");
  
    fill(colorPickerText.value);
    tf = textFont(font.innerText);
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


function textEffectFire() {
    if(dragging) {
        dragText()
    }

    points = robotoFont.textToPoints(txt.value, locationX - 20  , locationY + 30, size.value - 5, {
        sampleFactor: 0.7,
        simplifyThreshold: 0.5,
    });

    
    for (let i=0; i<points.length; i++) {
        firePoints.push(new FireParticle(points[i].x, points[i].y));
    }
    
    for (let i=0; i<firePoints.length; i++) {
        firePoints[i].update();
        firePoints[i].show();

        if(firePoints[i].done) {
            firePoints.splice(i, 1);
        }
    }

    textSize(parseInt(size.value));
    textFont(font.innerText);
    let txtObj = text(txt.innerText, locationX, 500);


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
  banner.style.minWidth = "730px";
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

function bgEffectFirework() {
  if (random(1) < 0.1) {
    fireworks.push(new Firework(random(width), height));
  }
  for (let i=fireworks.length-1; i>=0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    
    if (fireworks[i].done) {
      fireworks.splice(i, 1);
    }
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

    if (particles.length < 300) {
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


let count = 1;
class FireParticle {
    constructor(x, y){
      this.x = x;
      this.y = y - 10;
      this.vx = random(-1, 1);
      this.vy = random(-3, -0.5);
      this.opacity = 255;
      this.cc = 1;

      this.done = false;

    }
    update(){
      

      this.x += this.vx;
      this.y += this.vy;
      this.opacity -= 5;
      this.cc *= 1.2;

      if(this.opacity < 0) {
        this.done = true;
      }
    }
    show(){
      let val = 0.1;
      noStroke();
      if (count == 1){
        fill(random(200, 250) + this.cc, random(140, 180) + this.cc, random(20, 100) + this.cc, this.opacity);
        ellipse(this.x, this.y, val+random(-5,10));
      }
      if (count == 2){
        fill(random(10, 50) + this.cc, random(10, 50) + this.cc, random(100, 120) + this.cc, this.opacity);
        push();
        rotate(random(-2,2));
        translate(this.x, this.y);
        rect(0, 0, val + random(-5,5));
        pop();
      }
    }

    
  }