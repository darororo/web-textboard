function setup(){
    let c = createCanvas(windowWidth, 120);
    // c.style("position", "absolute")
    c.position(0, 0)
    console.log(c)
    colorMode(HSB, 450, 100, 100, 100);

    noFill();
    stroke(255);
    strokeWeight(3);
    
    textAlign(CENTER);
    textSize(70);
    pixelDensity(1.5);
    
}

function draw(){
    frameRate(100);
    textNeon(color(332, 58, 91, 100));
}

function textNeon(glowColor){
    glow(glowColor,12);
    text('Texto-Bodo', width/2, height/2 + 20);
}  
function flickering(){
    offset += 0.08;
    let n = noise(offset);
    if(n < 0.30) return 0;
    else return 100;
}

function glow(glowColor, blurriness){
    drawingContext.shadowBlur = blurriness;
    drawingContext.shadowColor = glowColor;
}
