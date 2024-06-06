class Particle {
    constructor(x, y, vx, vy, explode, c) {
      this.pos = createVector(x, y);
      this.vel = createVector(vx, vy);
      
      this.c = c;
      
      this.explode = explode;
      
      if (this.explode) {
        this.size = 4;
      } else {
        this.size = 12;
      }
      this.life = 255;
      this.done = false;
    }
    
    update() {
      this.vel.add(fireworkGravity);
      this.pos.add(this.vel);
      
      this.life -= 2;
    }
    
    display() {
      noStroke();
      fill(this.c, this.life);
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = color(this.c);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
    
    finished() {
      if (this.life < 0) {
        this.done = true;
      } else {
        this.done = false;
      }
    }
}

class Firework {
constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-10, -18));
    
    this.c = color(random(fireworkColors));
    
    this.explode = false;
    this.firework = new Particle(this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.explode, this.c);
    
    this.particles = []; this.num = 5;
    this.done = false;
}

update() {
    if (this.explode == false) {
    this.firework.update();

    if (this.firework.vel.y >= 0) {
        this.exploded();
    }

    } else {
        this.finished(); 
        for (let i=this.particles.length-1; i>=0; i--) {
            this.particles[i].finished();
            this.particles[i].update();
        if (this.particles[i].done) {
            this.particles.splice(i, 1);
        }
        }
    }
}

display() {
    if (this.explode == false) {
        this.firework.display();
    } else {
        for (let i=0; i<this.particles.length; i++) {
            this.particles[i].display();
        }
    }
}

exploded() {
    this.explode = true;
    for (let i=0; i<this.num; i++) {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1, 3));
        this.particles[i] = new Particle(this.firework.pos.x, this.firework.pos.y, this.vel.x, this.vel.y, this.explode, this.c);
    }
}

finished() {
    if (this.particles.length == 0) {
        this.done = true;
    } else {
        this.done = false;
    }
}
}
