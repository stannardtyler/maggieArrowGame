// the start of the clock timer
let startTime;
let end = false;
let done = false;

// targets
let greentarget = [];
let redtarget = [];
let bluetarget = [];

// sounds
let sound;
let song;
let song_button;
let arrow_sound;

// points
let total = 0;
let totals = 0;
let totalss = 0;

// bow and arrow
let bow;
let arrow;

let s = 0;

function preload() {
  sound = loadImage("../sound.png");

  bow = loadImage("../white_bow.png");
  arrow = loadImage("../white_arrow.png");

  arrow_sound = loadSound("../arrow_sound.mp4", loaded);
}

function setup() {
  // Tyler added code to add an id to the sketch
  let canvas = createCanvas(1000, 670);
  canvas.parent("arrowgame");
  noCursor(); //Tyler added a noCursor function to hide the cursor

  // inserting sound audio
  song = loadSound("../cupid.mp3", loaded);
  song.amp(0.5);
  // create button for sound
  song_button = createButton("play");
  song_button.position(50, 10);
  song_button.mousePressed(music);

  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(0, 430);
    greentarget[i] = new GreenTarget(x, y, 35, 3);
    totals = totals + 1;
  }

  for (let j = 0; j < 15; j++) {
    let x = random(width);
    let y = random(0, 430);
    bluetarget[j] = new BlueTarget(x, y, 25, 7);
    totals = totals + 1;
  }

  for (let k = 0; k < 5; k++) {
    let x = random(width);
    let y = random(0, 430);
    redtarget[k] = new RedTarget(x, y, 15, 10);
    totals = totals + 1;
  }

  // a function that helps keep track of the seconds that has passed
  end = false;
  done = false;

  reset();
}

function reset() {
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(0, 430);
    greentarget[i] = new GreenTarget(x, y, 35, 3);
  }

  for (let j = 0; j < 15; j++) {
    let x = random(width);
    let y = random(0, 430);
    bluetarget[j] = new BlueTarget(x, y, 25, 7);
  }

  for (let k = 0; k < 5; k++) {
    let x = random(width);
    let y = random(0, 430);
    redtarget[k] = new RedTarget(x, y, 15, 10);
  }
}

function draw() {
  // let us know that the code know that the countdown hasn't ended yet
  end = false;
  done = false;
  background(0);

  // generate blue target and make it move around
  for (let j = 0; j < bluetarget.length; j++) {
    bluetarget[j].show();
    bluetarget[j].move();
    bluetarget[j].bounce();
  }

  // generate red target and make it move around
  for (let k = 0; k < redtarget.length; k++) {
    redtarget[k].show();
    redtarget[k].move();
    redtarget[k].bounce();
  }

  // generate green target and make it move around
  for (let i = 0; i < greentarget.length; i++) {
    greentarget[i].show();
    greentarget[i].move();
    greentarget[i].bounce();
  }

  fill(255);
  noStroke();
  textSize(13);
  // click instructions
  text("click on mouse: \n" + "to start the game \n" + "and the timer", 10, 55);
  text(
    "mouse: \n" +
      "use it to aim and click \n" +
      "on the targets to gain points",
    10,
    115
  );
  textSize(16);
  // allow the user to see the timer
  text("Timer: " + timer() + "s", 900, 20);

  fill(255);
  textSize(16);
  text(
    "green target: 1 point   blue target: 3 points   red target: 5 points",
    300,
    65
  );
  textSize(25);
  text("Total: " + total, 475, 30);

  // sound icon
  image(sound, 25, 21, 30, 30);

  if (end) {
    background(0);
    fill(255);
    // sound icon
    image(sound, 25, 21, 30, 30);
    textSize(26);
    text("Total: " + total, 455, 240);
    text("Time's Up!!", 435, 290);
    let percent = (totalss / totals) * 100;
    text("You got " + nf(percent, 2, 2) + "% of the targets", 340, 345);
    textSize(13);
    text("click on spacebar \n" + "then mouse: to restart", 10, 55);
    reset();
  }

  // if user finishes before the timer
  if (totalss == totals) {
    if (done) {
      background(0);
      fill(255);
      // sound icon
      image(sound, 25, 21, 30, 30);
      textSize(26);
      text("Total: " + total, 455, 250);
      text("Congratulations!! You beat the timer!", 300, 300);
      textSize(26);
      let percent = (totalss / totals) * 100;
      text("You got " + nf(percent, 2, 2) + "% of the targets", 340, 335);
      textSize(13);
      text("click on spacebar: to restart", 10, 55);
      reset();
    }
  }

  stroke(255);
  strokeWeight(5);
  line(0, 440, 1000, 440);

  imageMode(CENTER);
  image(bow, mouseX, 550, 300, 100);
  image(arrow, mouseX, 550, 20, 190);

  // Tyler added code for a reticle
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(mouseX, mouseY, 20, 20);
  fill(255);
  ellipse(mouseX, mouseY, 7, 7);
}

function keyPressed() {
  //   if (key == " ") {
  //     // start the timer
  //     startTime = millis();
  //   }

  if (done) {
    if (key == " ") {
      s = 0;
      total = 0;
      totalss = 0;
      // redraws the canvas and starts everything over again
      redraw();
    }
  }

  if (end) {
    // for after the timer ends
    if (key == " ") {
      s = 0;
      total = 0;
      totalss = 0;
      // redraws the canvas and starts everything over again
      redraw();
    }
  }
}

function mousePressed() {
  if (mouseIsPressed) {
    s = s + 1;
    // start the timer
    if (s == 1) {
      startTime = millis();
    }
  }

  // delete green targets when mouse clicks on it
  for (let i = greentarget.length - 1; i >= 0; i--) {
    if (greentarget[i].mouseOver()) {
      arrow_sound.setVolume(0.05);
      arrow_sound.play();
      greentarget.splice(i, 1);
      total = total + 1;
      totalss = totalss + 1;
    }
  }

  // delete blue targets when mouse clicks on it
  for (let j = bluetarget.length - 1; j >= 0; j--) {
    if (bluetarget[j].mouseOver()) {
      arrow_sound.setVolume(0.05);
      arrow_sound.play();
      bluetarget.splice(j, 1);
      total = total + 3;
      totalss = totalss + 1;
    }
  }

  // delete red targets when mouse clicks on it
  for (let k = redtarget.length - 1; k >= 0; k--) {
    if (redtarget[k].mouseOver()) {
      arrow_sound.setVolume(0.05);
      arrow_sound.play();
      redtarget.splice(k, 1);
      total = total + 5;
      totalss = totalss + 1;
    }
  }
}

function timer() {
  /* this math takes the current second
  and subtracts our very first second (when the timer started)
  from it in order to keep track of time*/

  var time = int((millis() - startTime) / 1000);

  if (time > 60) {
    // help signal that the end of timer
    end = true;
  } else if (time > 0 && time < 60) {
    done = true;
  }
  // stop running this function once the timer reachers 60
  return time;
}

function loaded() {
  console.log("loaded");
}

function music() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    song_button.html("pause");
  } else {
    song.pause();
    song_button.html("play");
  }
}
