var s;
var f;
var mute;
var eat;
var death;
var fkp;
var specialeat;
var options = {
    preventDefault: true
  };
var swiping = new Hammer(document.body, options);
function setup() {
  eat = loadSound('assets/eat.mp3');
  specialeat = loadSound('assets/specialeat.mp3');
  death = loadSound('assets/Death.mp3');
  createCanvas(400, 450);
  swiping.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  s = new Snake();
  f = new Food();
  fkp = false;
  score = new Score();
  frameRate(10);
}
function Snake() {
  this.x = 0;
  this.y = 50;
  this.total = 0;
  this.tail = [];

  this.xspeed = 10;
  this.yspeed = 0;

  this.update = function() {
    if (dist(this.x, this.y, f.x, f.y) < 10) {
      this.total++;
      if (((this.total % 10) === 0)) {
        if (f.blue < 1) {
          f.red -= 51
          f.green += 51
        } else if (f.green < 1) {
          f.red += 51
          f.blue -= 51
        } else {
          f.green -= 51
          f.blue += 51
        }
      specialeat.play();
      } else {eat.play();}
      f.spawn();
    }
    for (var o = 0; o < this.tail.length; o++) {
      if (dist(this.x, this.y, this.tail[o].x, this.tail[o].y) < 1 || this.xspeed === -10 && this.x === 0 || this.xspeed === 10 && this.x === 400 || this.yspeed === -10 && this.y === 50 || this. yspeed === 10 && this.y === 440) {
        death.play();
        this.x = 0;
        this.y = 0;
        this.total = 0;
        this.tail = [];
        this.xspeed = 10;
        this.yspeed = 0;
        f.red = 255;
        f.green = 0;
        f.blue = 0;
        f.spawn();
      }
    }
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.total-1; i++) {
      this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.x = constrain(this.x, 0, 390);
    this.y = constrain(this.y, 50, 450);
  }

  this.show = function() {
    fill(255)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, 10, 10);
    }
    if (this.tail.length > 0) {
      stroke(150, 0, 0)
    }
    rect(this.x, this.y, 10, 10);
    stroke(0)
  }

  this.dir = function(x, y) {
    if (!fkp) {
      this.xspeed = x * 10;
      this.yspeed = y * 10;
      fkp = true;
    }
  }
}
function Food() {
  this.x = 0;
  this.y = 0;
  this.red = 255;
  this.green = 0;
  this.blue = 0
  this.spawn = function() {
    console.log(this.red, this.green, this.blue);
    this.x = floor(random(40))*10;
    this.y = floor(random(40))*10;
    this.x = constrain(this.x, 0, 400);
    this.y = constrain(this.y, 50, 450);
  }
  this.show = function() {
    fill(this.red, this.green, this.blue);
    rect(this.x, this.y, 10, 10);
  }
  this.spawn();
}
function Score() {
  this.border = 2
  this.height = 50 - this.border;
  this.width = width;
  this.show = function() {
    fill(255); // Background, rgb(255, 255, 255)
    rect(0,0,this.width,this.height);
    fill(0); // Text color, rgb(0, 0, 0)
    textSize(this.height);
    textStyle(BOLD);
    text(s.total,this.width/2-10,this.height-10);
    fill(0)
    rect(0,this.height - this.border,this.width,this.border)
  }
}
function keyPressed() {
    if (keyCode === UP_ARROW && s.yspeed != 10) {
      s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && s.yspeed != -10) {
      s.dir(0, 1);
    } else if (keyCode === LEFT_ARROW && s.xspeed != 10) {
      s.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && s.xspeed != -10) {
      s.dir(1, 0);
    }
}
swiping.on('swipeup swipeleft swipedown swiperight', function (ev) {
    if ((ev.type === 'swipeup') && s.yspeed != 10) {
      s.dir(0, -1);
    } else if ((ev.type === 'swipedown') && s.yspeed != -10) {
      s.dir(0, 1);
    } else if ((ev.type === 'swipeleft') && s.xspeed != 10) {
      s.dir(-1, 0);
    } else if ((ev.type === 'swiperight') && s.xspeed != -10) {
      s.dir(1, 0);
    }
});

function draw() {
  background(51);
  s.update();
  fkp = false;
  f.show();
  s.show();
  score.show();

}
