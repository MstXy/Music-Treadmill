var mouseOverCircleMid = false;
var canPlayFinal = false;
var finalCounter = 0;

var circle1Factor = 0;
var circle1Variable = 0.005;
var mouseOverCircle1 = false;

var mouseOverCircle2 = false;
var circle2Variable1 = 0.5;
var circle2Variable2 = 0.005;
var circle2Factor = -1.57;
var circle2X = 800;
var circle2Y = 200;

var mouseOverCircle3 = false;
var circle3Factor = 0;
var circle3Variable = 0.005;
let angle1 = 0;
let angle2 = 0;
let scalar = 20;

var mouseOverCircle4 = false;
var circle4Variable = 0.5;

var mouseOverCircle5 = false;
var movingLine1Factor = 0;
var movingLine1Variable = 0.002;
var circle5Factor = 0;
var circle5Variable = 1;
var circle5reachRight = false;
var circle5reachLeft = true;

var movingLine2Variable = -1.57;

var mouseOverCircle6 = false;
var movingPointVariable = 0.002;
var movingPointXVar = 0.01;
var movingPointYVar = 1;

var mouseOverCircle7 = false;
var circle7Variable = 200;
var circle7Counter = 0;
var circle7X = 130;
var circle7Y = 660;

var movingBoxVariable = 0;
var movingBoxX;
var movingBoxY;
var movingBoxVar;

let particleSystem;
var particleVariable = 40;
var particleTimeCounter = 0;

let flock;
var flockSpeedVariable = 1;
var flockSteerVariable = 0.05;

let bx;
let by;
let boxSize = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

var audio11Played = false;
var audio12Played = false;
var audio13Played = false;
var audio14Played = false;
var audio15Played = false;
var audio16Played = false;
var audio17Played = false;

var playAudioCounter = 0;
var canPlayVolumeChange = false;

var canShowWords = 0;

let musicLanguage = ["Music", "音乐", "ミュー\nジック", "Musik", "музыка", "La \nmusique", "음악", "Muziko", "Musica", "Tónlist", "Umculo"];
// var wordChangeVariable = 200;
var wordChangeCounter = 0;
var wordChange = "MUSIC";

var audioVolume;

var amp;
let audio11;
let audio12;

var audioLoadCounter = 0;
var totalAudio = 7;
var audioIsLoading = true;

var loadingAngle = 0;

var pieces, radius, fft, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim, analyzer;
var bgColor = "#0c0f27";
var bassColor = ["#313e9b", "#1200b3"];
var midColor = "#da1500";
var trembleColor = "#728d0d";
var colorPalette = ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"];


function preload() {
  futura = loadFont("font/Futura/Futura/Futura-Medium-6.ttf");
  woxStriped = loadFont("font/Wox-Striped/Wox-Striped/WOX-Striped-Triple-Demo-1.otf")
  prisma = loadFont("font/Prisma/Prisma/Prisma-1.ttf");
}


function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer1');
  mouseOverCircle1 = false;
  rectMode(CENTER);
  // let audio1 = document.getElementById('audio1');

  //loadFont
  // futura = loadFont("font/Futura/Futura/Futura-Medium-6.ttf");
  // woxStriped = loadFont("font/Wox-Striped/Wox-Striped/WOX-Striped-Triple-Demo-1.otf")
  //load audio
  audio11 = loadSound("audio/Jazz.mp3", soundLoaded);
  audio12 = loadSound("audio/Bob.mp3", soundLoaded);
  audio13 = loadSound("audio/Bach.mp3", soundLoaded);
  audio14 = loadSound("audio/Em.mp3", soundLoaded);
  audio15 = loadSound("audio/Queen.mp3", soundLoaded);
  audio16 = loadSound("audio/Mind.mp3", soundLoaded);
  audio17 = loadSound("audio/Sk.mp3", soundLoaded);
  audio00 = loadSound("audio/BGM.mp3", soundLoaded);



  particleSystem = new ParticleSystem(createVector(windowWidth / 2, windowHeight * 0.65));

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 20; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }

  //volumeBox
  bx = windowWidth / 3;
  by = windowHeight / 5;

  audioVolume = 0.6;

  amp = new p5.Amplitude();

  // Initiate the FFT object
  fft = new p5.FFT();

  movingBoxX = windowWidth / 1.5;
  movingBoxY = windowHeight;
  movingBoxVar = 1;

}

function soundLoaded() {
  audioLoadCounter++;
  if (audioLoadCounter == totalAudio) {
    audioIsLoading = false;
    //BGM
    audio00.play(0, 1, 0.1);
    loop();
  }
}
function draw() {
  if (audioIsLoading) {
    console.log("audio is loading");

    noStroke();
    background(255);
    textSize(windowWidth / 10);
    textAlign(CENTER, CENTER);
    textFont(prisma);
    fill(0);
    text("Music Treadmill", windowWidth / 2, windowHeight / 3);

    textSize(windowWidth / 50);
    textAlign(CENTER, CENTER);
    textFont(futura);
    fill(0);
    text("A Project by William Zhang", windowWidth / 1.2, windowHeight / 1.2);

    strokeWeight(5);
    stroke(0);
    fill(255, 204, 0);
    ellipse(windowWidth / 1.16, windowHeight / 1.35, 20, 20);
    fill("#9900ff");
    ellipse(windowWidth / 1.13, windowHeight / 1.35, 20, 20);
    fill(0, 102, 153);
    ellipse(windowWidth / 1.10, windowHeight / 1.35, 20, 20);
    fill(237, 34, 93);
    rect(windowWidth / 1.07, windowHeight / 1.35, 25, 25);

    strokeWeight(5);
    translate(width/2, height/1.5);
    rotate(loadingAngle);
    line(0, 0, 100, 0);
    loadingAngle += 0.1;



  } else {


    stroke(0);
    //backgroundColor
    background(244, 248, 252);
    strokeWeight(1); // Default

    //midCircle
    strokeWeight(5);
    fill(0, 102, 153);
    ellipse(width/2, height/2, 20, 20);

    //text supply
    fill(0);
    noStroke();
    textSize(windowWidth / 60);
    textFont(futura);
    text("Click on", windowWidth / 1.22, 40);
    strokeWeight(5);
    stroke(0);
    fill(255, 204, 0);
    ellipse(windowWidth / 1.16, 40, 20, 20);
    fill("#9900ff");
    ellipse(windowWidth / 1.14, 40, 20, 20)
    noStroke();
    fill(0);
    text("to Interact.", windowWidth / 1.07, 40);
    text("When Playing,", windowWidth / 3, 60);
    text("Drag to Change Volume.", windowWidth / 3, 90);

    //
    document.getElementById('wordsSupply').style.display = "block";
    document.getElementById('titleSupply').style.display = "block";

    stroke(0);
    //phonograph
    //circle1Route
    strokeWeight(5);
    noFill();
    ellipse(200, 200, 200, 200);
    rect(200, 200, 230, 230, 10);
    line(200, 50, 200, 150);
    strokeWeight(10);
    point(200, 150);

    strokeWeight(5);
    // drawCircle1
    var circle1X = 200 + cos(circle1Factor) * 100;
    var circle1Y = 200 + sin(circle1Factor) * 100;
    fill(255, 204, 0);
    ellipse(circle1X, circle1Y, 20, 20);
    circle1Factor = circle1Factor + circle1Variable;

    line(200, 150, circle1X, circle1Y);
    //drawAmp
    strokeWeight(5);
    fill("#abcdef");
    rect(200, 275, 190, 10 + 0 * 200);


    //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    let mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    let verticalLine = line(mouseX, 0, mouseX, windowHeight);
    let horizontalLine = line(0, mouseY, windowWidth, mouseY);

    //checkMouseOverCircle1
    var mouseDistanceCircle1 = dist(mouseX, mouseY, circle1X, circle1Y);
    if (mouseDistanceCircle1 < 10) {
      console.log(mouseOverCircle1);
      mouseOverCircle1 = true;
      circle1Variable = 0.005;
    } else {
      mouseOverCircle1 = false;
    }
    if (mouseOverCircle1 == true) {
      verticalLine = line(circle1X, 0, circle1X, windowHeight);
      horizontalLine = line(0, circle1Y, windowWidth, circle1Y);
    }

    //tape recorder
    //shape
    noFill();
    strokeWeight(5);
    ellipse(800, 300, 160, 160);
    ellipse(1100, 300, 160, 160);
    line(800, 400, 1100, 400);
    line(800, 200, 1100, 200);
    line(750, 175, 750, 125);
    line(775, 150, 1125, 150);
    line(1150, 125, 1150, 175);
    fill(0);
    quad(930, 180, 970, 180, 965, 200, 935, 200);
    //circle2

    if (circle2Y <=205 && circle2Y> 190 && circle2X >= 795 && circle2X < 1100) {
      circle2Factor = -1.57;
      circle2Y = 200;
      circle2X = circle2X + circle2Variable1;

    } else if (circle2X >= 1100) {
      // circle2Variable1 = 0.5;
      circle2X = 1100 + cos(circle2Factor) * 100;
      circle2Y = 300 + sin(circle2Factor) * 100;
      circle2Factor = circle2Factor + circle2Variable2;
    } else if (circle2Y <= 400 && circle2Y> 395 && circle2X >= 800 && circle2X <= 1100) {
      circle2Factor = -1.57;
      circle2Y = 400;
      circle2X = circle2X - circle2Variable1;

    } else if (circle2X <= 800) {
      // circle2Variable1 = 0.5;
      circle2X = 800 - cos(circle2Factor) * 100;
      circle2Y = 300 - sin(circle2Factor) * 100;
      circle2Factor = circle2Factor + circle2Variable2;
    }
    fill(255, 204, 0);
    ellipse(circle2X, circle2Y, 20, 20);

    //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);

    var mouseDistanceCircle2 = dist(mouseX, mouseY, circle2X, circle2Y);
    if (mouseDistanceCircle2 < 10) {
      console.log(mouseOverCircle2);
      mouseOverCircle2 = true;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
    } else {
      mouseOverCircle2 = false;
    }
    if (mouseOverCircle2 == true) {
      verticalLine = line(circle2X, 0, circle2X, windowHeight);
      horizontalLine = line(0, circle2Y, windowWidth, circle2Y);
    }

    //CD Player
    noFill();
    strokeWeight(5);
    ellipse(1200, 650, 300, 300);
    fill(0);
    ellipse(1200, 650, 75, 75);

    var circle3X = 1200 - cos(circle3Factor) * 100;
    var circle3Y = 650 - sin(circle3Factor) * 100;
    fill(255, 204, 0);
    ellipse(circle3X, circle3Y, 20, 20);
    circle3Factor = circle3Factor + circle3Variable;

    fill(0);
    rect(1275, 650, 175, 30);


    //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);
    var mouseDistanceCircle3 = dist(mouseX, mouseY, circle3X, circle3Y);
    if (mouseDistanceCircle3 < 10) {
      console.log(mouseOverCircle3);
      mouseOverCircle3 = true;
      circle3Variable = 0.005;
    } else {
      mouseOverCircle3 = false;
    }
    if (mouseOverCircle3 == true) {
      verticalLine = line(circle3X, 0, circle3X, windowHeight);
      horizontalLine = line(0, circle3Y, windowWidth, circle3Y);
    }

    //phone
    noFill();
    strokeWeight(5);
    rect(450, 550, 250, 500, 20);
    ellipse(450, 650, 200, 200);
    ellipse(450, 650, 100, 100);

    let ang1 = radians(angle1);
    let ang2 = radians(angle2);
    let circle4X = 450 + 100 * cos(ang1);

    fill(255, 204, 0);
    ellipse(circle4X, 500, scalar, scalar);

    let circle4Y = 400 + 75 * sin(ang2);
    fill(0, 102, 153);
    ellipse(350, circle4Y, scalar, scalar);

    angle1 += circle4Variable;
    angle2 += circle4Variable;

    noStroke();
    fill(0);
    textSize(windowWidth / 25);
    wordChangeCounter++;

    if (wordChangeCounter == circle7Variable) {
      wordChangeCounter = 0;
      wordChange = random(musicLanguage);
    }
    textFont('Helvetica');
    text(wordChange, 450, 400);


    stroke(0);
      //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);
    var mouseDistanceCircle4 = dist(mouseX, mouseY, circle4X, 500);
    if (mouseDistanceCircle4 < 10) {
      console.log(mouseOverCircle4);
      mouseOverCircle4 = true;
      circle4Variable = 0.5;
    } else {
      mouseOverCircle4 = false;
    }
    if (mouseOverCircle4 == true) {
      verticalLine = line(circle4X, 0, circle4X, windowHeight);
      horizontalLine = line(0, circle4Y, windowWidth, circle4Y);
    }

    //2square
    strokeWeight(5);
    fill(237, 34, 93);
    rect(width /2 + 0.5 * mouseX, height / 2, mouseY / 10 + 10, mouseY / 10 + 10);
    fill(237, 34, 93);
    let inverseX = width /2 -  0.5 * mouseX;
    let inverseY = height - mouseY;
    rect(inverseX, height / 2, inverseY / 10 + 10, inverseY / 10 + 10);

    //lines
    strokeWeight(3);
    line(0, 20, width, height - 20);
    // strokeWeight(10);
    // line(0, height / 3, width / 3, height);
    // strokeWeight(8);
    // line(300, 0, 0, height / 2.5);

    //movingLine1
    strokeWeight(5);
    line1Y = height / 2 * ( 1 + sin(movingLine1Factor));
    line(0, line1Y, width, line1Y);
    movingLine1Factor = movingLine1Factor + movingLine1Variable;
    //circle5
    strokeWeight(5);
    fill(255, 204, 0);
    circle5X = circle5Factor;
    circle5Y = line1Y;
    ellipse(circle5X, circle5Y, 20, 20);
    if (circle5Factor > width) {
      circle5reachLeft = false;
      circle5reachRight = true;
    }else if (circle5Factor < 0) {
      circle5reachRight = false;
      circle5reachLeft = true;
    }
    if (circle5reachRight == true) {
      circle5Factor = circle5Factor - circle5Variable;
    }else if (circle5reachLeft == true) {
      circle5Factor = circle5Factor + circle5Variable;
    }

    //checkmouseOverCircle5
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);
    var mouseDistanceCircle5 = dist(mouseX, mouseY, circle5X, circle5Y);
    if (mouseDistanceCircle5 < 10) {
      console.log(mouseOverCircle5);
      mouseOverCircle5 = true;
      circle5Variable = 1;
      movingLine1Variable = 0.002;
    } else {
      mouseOverCircle5 = false;
    }
    if (mouseOverCircle5 == true) {
      verticalLine = line(circle5X, 0, circle5X, windowHeight);
      horizontalLine = line(0, circle5Y, windowWidth, circle5Y);
    }

    // //movingLine2
    // strokeWeight(20);
    // line2Y = height / 4 * ( 1 + sin(movingLine2Variable));
    // line(0, line2Y, width, line2Y);
    // movingLine2Variable = movingLine2Variable + 0.01;

    //movingPoint1 circle6
    var circle6X;
    var circle6Y;
    circle6X = 1200 + (windowWidth - 1200) * noise(movingPointXVar);
    circle6Y = (windowHeight / 2) * noise(movingPointYVar);
    strokeWeight(5);
    fill(255, 204, 0);
    ellipse(circle6X, circle6Y, 20, 20);

    var circle6XR;
    var circle6YR;
    circle6XR = 1200 + windowWidth - circle6X;
    circle6YR = windowHeight / 2 - circle6Y;
    strokeWeight(5);
    fill(0, 102, 153);
    ellipse(circle6XR, circle6YR, 20, 20);

    movingPointXVar = movingPointXVar + movingPointVariable;
    movingPointYVar = movingPointYVar + movingPointVariable;


    //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);

    //checkMouseOverCircle6
    var mouseDistanceCircle6 = dist(mouseX, mouseY, circle6X, circle6Y);
    if (mouseDistanceCircle6 < 10) {
      console.log(mouseOverCircle6);
      mouseOverCircle6 = true;
      movingPointVariable = 0.002;
    } else {
      mouseOverCircle6 = false;
    }
    if (mouseOverCircle6 == true) {
      verticalLine = line(circle6X, 0, circle6X, windowHeight);
      horizontalLine = line(0, circle6Y, windowWidth, circle6Y);
    }


    //circle7

    let circle7XArray = [70, 130, 190, 250];
    let circle7YArray = [600, 660, 720, 780];
    circle7Counter++;
    if (circle7Counter == circle7Variable) {
      circle7X = random(circle7XArray);
      circle7Y = random(circle7YArray);
      circle7Counter = 0;
    }

    strokeWeight(5);
    fill(0, 102, 153);
    ellipse(70, 600, 20, 20);
    ellipse(130, 600, 20, 20);
    ellipse(190, 600, 20, 20);
    ellipse(250, 600, 20, 20);
    ellipse(70, 660, 20, 20);
    ellipse(130, 660, 20, 20);
    ellipse(190, 660, 20, 20);
    ellipse(250, 660, 20, 20);
    ellipse(70, 720, 20, 20);
    ellipse(130, 720, 20, 20);
    ellipse(190, 720, 20, 20);
    ellipse(250, 720, 20, 20);
    ellipse(70, 780, 20, 20);
    ellipse(130, 780, 20, 20);
    ellipse(190, 780, 20, 20);
    ellipse(250, 780, 20, 20);
    fill(255, 204, 0);
    ellipse(circle7X, circle7Y, 20, 20);

    //movetoTop
    translate(0, 0, 1);
    fill('#000000');
    mousePoint = ellipse(mouseX, mouseY, 10, 10);
    strokeWeight(1);
    verticalLine = line(mouseX, 0, mouseX, windowHeight);
    horizontalLine = line(0, mouseY, windowWidth, mouseY);

    //checkMouseOverCircle7
    var mouseDistanceCircle7 = dist(mouseX, mouseY, circle7X, circle7Y);
    if (mouseDistanceCircle7 < 10) {
      console.log(mouseOverCircle7);
      mouseOverCircle7 = true;
      circle7Variable = 200;
    } else {
      mouseOverCircle7 = false;
    }
    if (mouseOverCircle7 == true) {
      verticalLine = line(circle7X, 0, circle7X, windowHeight);
      horizontalLine = line(0, circle7Y, windowWidth, circle7Y);
    }

    // Get different values for different frequency ranges
    // -----------------------------------------------------
    // p5.sound comes with predefined keywords,
    // but giving getEnergy() 2 numbers instead of a keyword
    // you could use your custom range if needed

    //movingBox
    strokeWeight(5);
    stroke(0);
    fill(0);
    movingBoxVariable = circle5Variable;
    if (movingBoxY > 0 ) {
      if (movingBoxVar == 1) {
        movingBoxX = movingBoxX - movingBoxVariable / 10;
        movingBoxY = movingBoxY - movingBoxVariable;
      } else if (movingBoxVar == 2) {
        movingBoxX = movingBoxX + movingBoxVariable / 10;
        movingBoxY = movingBoxY - movingBoxVariable;
      }
    } else if (movingBoxY == 0 || movingBoxY < 0) {
      if (movingBoxVar == 1) {
        movingBoxVar = 2;
        movingBoxY = windowHeight;

      } else if (movingBoxVar == 2) {
        movingBoxVar = 1;
        movingBoxY = windowHeight;

      }

    }
    rect(movingBoxX, movingBoxY, windowWidth / 15, 20);
    rect(movingBoxX + 20, movingBoxY + 30, windowWidth / 10, 20);


    particleSystem.run();
    particleTimeCounter++;

    if (particleTimeCounter == particleVariable) {
      particleSystem.addParticle();
      particleTimeCounter = 0;
    }

    //flock
    flock.run();


    //volumeBoxShade
    stroke(150);
    strokeWeight(5);
    fill("#f5ffd6");
    rect(windowWidth / 3, windowHeight / 5, boxSize, boxSize);
    //volumeBox

    if (
    mouseX > bx - boxSize / 2 &&
    mouseX < bx + boxSize / 2 &&
    mouseY > by - boxSize / 2 &&
    mouseY < by + boxSize / 2
    ) {
      overBox = true;
      if (!locked) {
        stroke(0);
        strokeWeight(5);
        fill("#abcdef");
      } else {
        strokeWeight(2);
        stroke(150);
        fill(0);
        line(windowWidth / 3, 0, windowWidth / 3, windowHeight);
        strokeWeight(5);
        stroke(100);
        rect(windowWidth / 6, windowHeight / 4, 100, 20);
        rect(windowWidth * 2 / 3, windowHeight / 4, 100, 20);
        rect(windowWidth * 2 / 3, windowHeight / 4, 20, 100);
        stroke(0);
        fill(255, 204, 0);
        strokeWeight(5);
      }
    } else {
      stroke(0);
      strokeWeight(5);
      fill(237, 34, 93);
      overBox = false;
    }
    // Draw the box

    rect(bx, by, boxSize, boxSize);

    var boxXChange = bx - windowWidth / 3;
    if (locked) {

      bx = mouseX - xOffset;
      by = mouseY - yOffset;
    } else {
      bx = windowWidth / 3;
      by = windowHeight / 5;
    }
    //  else if (!locked) {
    //   bx = windowWidth / 3;
    //   by = windowHeight / 5;
    // }

    if (boxXChange < 0) {
      if (audio11.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio11.setVolume(audioVolume);
        }
      }
      if (audio12.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio12.setVolume(audioVolume);
        }
      }
      if (audio13.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio13.setVolume(audioVolume);
        }
      }
      if (audio14.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio14.setVolume(audioVolume);
        }
      }
      if (audio15.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio15.setVolume(audioVolume);
        }
      }
      if (audio16.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio16.setVolume(audioVolume);
        }
      }
      if (audio17.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume - 0.005;
          audio17.setVolume(audioVolume);
        }
      }
    } else if (boxXChange > 0) {
      if (audio11.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio11.setVolume(audioVolume);
        }
      }
      if (audio12.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio12.setVolume(audioVolume);
        }
      }
      if (audio13.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio13.setVolume(audioVolume);
        }
      }
      if (audio14.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio14.setVolume(audioVolume);
        }
      }
      if (audio15.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio15.setVolume(audioVolume);
        }
      }
      if (audio16.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio16.setVolume(audioVolume);
        }
      }
      if (audio17.isPlaying()) {
        if (audioVolume < 0.1) {
          audioVolume = 0.1;
        } else if (audioVolume > 0.9) {
          audioVolume = 0.9;
        } else {
          audioVolume = audioVolume + 0.005;
          audio17.setVolume(audioVolume);
        }
      }
    }

    //audio
    if (audio11.isPlaying()) {

      //drawAmp
      var vol = amp.getLevel();
      strokeWeight(5);
      stroke(0);
      fill("#abcdef");
      rect(200, 275, 190, 10 + vol * 200);



    }
    var mouseDistanceCircleMid = dist(mouseX, mouseY, windowWidth / 2, windowHeight / 2);
    if (mouseDistanceCircleMid < 10) {
      console.log(mouseOverCircleMid);
      mouseOverCircleMid = true;
    } else {
      mouseOverCircleMid = false;
    }
    if (audio11Played && audio12Played && audio13Played && audio14Played && audio15Played && audio16Played && audio17Played) {
      fill('#9900ff');
      ellipse(width/2, height/2, 20, 20);
    }
    if (canPlayFinal) {
      //words
      canShowWords++;
      if (canShowWords == 1) {
        showFinalWords();
      }

      //musicVisualizer
      fft.analyze();

    	var bass = fft.getEnergy("bass");
    	var treble = fft.getEnergy(50, 110);
    	var mid = fft.getEnergy("mid");

    	var mapMid = map(mid, 0, 255, -radius, radius);
    	var scaleMid = map(mid, 0, 255, 1, 1.5);

    	var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
    	var scaleTreble = map(treble, 0, 255, 0.5, 2);

    	var mapbass = map(bass, 0, 255, 0, 200);
    	var scalebass = map(bass, 0, 255, 0, 0.8);

    	mapMouseX = map(mouseX, 0, width, 100, 200);
    	mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
      mapMouseXbass = map(mouseX, 0, width, 1, 5);
    	mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

    	pieces = 9;
    	radius = 300;

    	translate(windowWidth / 2, windowHeight / 2);
      for (i = 0; i < 20; i += 0.1) {

    		rotate(TWO_PI / (pieces / 2));

    		noFill();

    		/*----------  BASS  ----------*/
    		push();
    		stroke(colorPalette[1]);
    		rotate(frameCount * 0.002);
    		strokeWeight(0.5);
    		polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
    		pop();


    		/*----------  MID  ----------*/
    		push();
    		stroke(colorPalette[2]);
    		strokeWeight(0.2);
    		polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
    		pop();


    		/*----------  TREMBLE  ----------*/
    		push();
    		stroke(colorPalette[3]);
    		strokeWeight(0.6);
    		scale(mouseX * 0.0005);
    		rotate((mouseX * 0.002));
    		polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
    		pop();

    	}
    	for (i = 0; i < pieces; i += 1) {

    		rotate(TWO_PI / pieces);

    		noFill();


    		/*----------  BASS  ----------*/
    		push();
    		strokeWeight(8);
    		stroke(bassColor[0]);
    		scale(scalebass + mapMouseScale);
    		rotate(-frameCount * 0.05);
    		point(mapbass, radius / 2);
    		stroke(bassColor[1]);
    		strokeWeight(2.2);
    		line(mapMouseX, mouseY, radius, radius);
    		pop();



    		/*----------  MID  ----------*/
    		push();
    		stroke(midColor);
    		strokeWeight(4);
    		rotate(-frameCount * 0.01);
    		point(mapMid, radius);
    		pop();


    		/*----------  TREMBLE  ----------*/
    		push();
    		stroke(trembleColor);
    		strokeWeight(4);
    		scale(scaleTreble);
    		rotate(frameCount * 0.01);
    		point(-100, radius / 2);
    		point(100, radius / 2);
    		pop();

    	}

      playVolumeChange();
    }

  }
}

function mousePressed() {
  if (overBox) {
    locked = true;
    // bx = mouseX - xOffset;
    // by = mouseY - yOffset;
  } else {
    locked = false;
    // bx = windowWidth / 3;
    // by = windowHeight / 5;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;

  if (mouseOverCircleMid) {
    if (audio11Played && audio12Played && audio13Played && audio14Played && audio15Played && audio16Played && audio17Played) {
      finalCounter++;
      canPlayFinal = true;
      if (audio11.isPlaying() && audio12.isPlaying() && audio13.isPlaying() && audio14.isPlaying() && audio15.isPlaying() && audio16.isPlaying() && audio17.isPlaying()) {
        audio11.stop();
        audio12.stop();
        audio13.stop();
        audio14.stop();
        audio15.stop();
        audio16.stop();
        audio17.stop();
        audio00.play();
      }
      if (finalCounter == 1) {
        audio11.stop();
        audio12.stop();
        audio13.stop();
        audio14.stop();
        audio15.stop();
        audio16.stop();
        audio17.stop();
        audio00.stop();

        document.getElementById('audio11D').style.display = "none";
        document.getElementById('audio12D').style.display = "none";
        document.getElementById('audio13D').style.display = "none";
        document.getElementById('audio14D').style.display = "none";
        document.getElementById('audio15D').style.display = "none";
        document.getElementById('audio16D').style.display = "none";
        document.getElementById('audio17D').style.display = "none";

        canPlayVolumeChange = true;
        audio11.play(0, 1, 0.1);
        audio12.play(0, 1, 0.1);
        audio13.play(0, 1, 0.1);
        audio14.play(0, 1, 0.1);
        audio15.play(0, 1, 0.1);
        audio16.play(0, 1, 0.1);
        audio17.play(0, 1, 0.1);
      }
    }
  }
  //circle1
  if (mouseOverCircle1 == true) {
    if (audio11.isPlaying()) {
      audio11.pause();
      audio00.play();
      document.getElementById('audio11D').style.display = "none";
      audioVolume = 0.6;
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio11.play(0, 1, 0.6);
      audio11Played = true;
      document.getElementById('audio11D').style.display = "block";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio12.pause();
      audio13.pause();
      audio14.pause();
      audio15.pause();
      audio16.pause();
      audio17.pause();
      audio00.pause();
      circle1Variable = 0.008;
      circle2Variable1 = 0.8;
      circle2Variable2 = 0.008;
      circle3Variable = 0.007;
      circle4Variable = 0.8;
      circle5Variable = 1.3;
      movingPointVariable = 0.008;
      circle7Variable = 175;
      particleVariable = 35;
      flockSpeedVariable = 1.3;
      flockSteerVariable = 0.08;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.004;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle2 == true) {
    if (audio12.isPlaying()) {
      audio12.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio12D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio12.play(0, 1, 0.6);
      audio12Played = true;
      document.getElementById('audio12D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio11.pause();
      audio13.pause();
      audio14.pause();
      audio15.pause();
      audio16.pause();
      audio17.pause();
      audio00.pause();
      circle1Variable = 0.009;
      circle2Variable1 = 0.9;
      circle2Variable2 = 0.009;
      circle3Variable = 0.008;
      circle4Variable = 0.9;
      circle5Variable = 1.4;
      movingPointVariable = 0.009;
      circle7Variable = 150;
      particleVariable = 30;
      flockSpeedVariable = 1.5;
      flockSteerVariable = 0.09;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.005;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle3 == true) {
    if (audio13.isPlaying()) {
      audio13.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio13D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio13.play(0, 1, 0.6);
      audio13Played = true;
      document.getElementById('audio13D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio11.pause();
      audio12.pause();
      audio14.pause();
      audio15.pause();
      audio16.pause();
      audio17.pause();
      audio00.pause();
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.003;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle4 == true) {
    if (audio14.isPlaying()) {
      audio14.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio14D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio14.play(0, 1, 0.6);
      audio14Played = true;
      document.getElementById('audio14D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio11.pause();
      audio12.pause();
      audio13.pause();
      audio15.pause();
      audio16.pause();
      audio17.pause();
      audio00.pause();
      circle1Variable = 0.015;
      circle2Variable1 = 3;
      circle2Variable2 = 0.03;
      circle3Variable = 0.01;
      circle4Variable = 1.5;
      circle5Variable = 2;
      movingPointVariable = 0.006;
      circle7Variable = 75;
      particleVariable = 15;
      flockSpeedVariable = 3;
      flockSteerVariable = 0.3;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.012;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle5 == true) {
    if (audio15.isPlaying()) {
      audio15.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio15D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio15.play(0, 1, 0.6);
      audio15Played = true;
      document.getElementById('audio15D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio11.pause();
      audio12.pause();
      audio13.pause();
      audio14.pause();
      audio16.pause();
      audio17.pause();
      audio00.pause();
      circle1Variable = 0.02;
      circle2Variable1 = 2;
      circle2Variable2 = 0.02;
      circle3Variable = 0.01;
      circle4Variable = 1.2;
      circle5Variable = 1.8;
      movingPointVariable = 0.012;
      circle7Variable = 100;
      particleVariable = 20;
      flockSpeedVariable = 2;
      flockSteerVariable = 0.2;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.009;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle6 == true) {
    if (audio16.isPlaying()) {
      audio16.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio16D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio16.play(0, 1, 0.6);
      audio16Played = true;
      document.getElementById('audio16D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio17D').style.display = "none";
      audio11.pause();
      audio12.pause();
      audio13.pause();
      audio14.pause();
      audio15.pause();
      audio17.pause();
      audio00.pause();

      circle1Variable = 0.01;
      circle2Variable1 = 1;
      circle2Variable2 = 0.01;
      circle3Variable = 0.008;
      circle4Variable = 1;
      circle5Variable = 1.5;
      movingPointVariable = 0.01;
      circle7Variable = 125;
      particleVariable = 25;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.1;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.008;
      wordChangeCounter = 0;

    }
  }
  if (mouseOverCircle7 == true) {
    if (audio17.isPlaying()) {
      audio17.pause();
      audio00.play();
      audioVolume = 0.6;
      document.getElementById('audio17D').style.display = "none";
      circle1Variable = 0.005;
      circle2Variable1 = 0.5;
      circle2Variable2 = 0.005;
      circle3Variable = 0.005;
      circle4Variable = 0.5;
      circle5Variable = 1;
      movingPointVariable = 0.002;
      circle7Variable = 200;
      particleVariable = 40;
      flockSpeedVariable = 1;
      flockSteerVariable = 0.05;
      particleTimeCounter = 0;
      circle7Counter = 0;
      movingLine1Variable = 0.002;
      wordChangeCounter = 0;

    } else {
      audio17.play(0, 1, 0.6);
      audio17Played = true;
      document.getElementById('audio17D').style.display = "block";
      document.getElementById('audio11D').style.display = "none";
      document.getElementById('audio12D').style.display = "none";
      document.getElementById('audio13D').style.display = "none";
      document.getElementById('audio14D').style.display = "none";
      document.getElementById('audio15D').style.display = "none";
      document.getElementById('audio16D').style.display = "none";
      audio11.pause();
      audio12.pause();
      audio13.pause();
      audio14.pause();
      audio15.pause();
      audio16.pause();
      audio00.pause();
      particleTimeCounter = 0;
      circle1Variable = 0.02;
      circle2Variable1 = 5;
      circle2Variable2 = 0.05;
      circle3Variable = 0.02;
      circle4Variable = 2;
      circle5Variable = 2.5;
      movingPointVariable = 0.02;
      circle7Variable = 50;
      particleVariable = 10;
      flockSpeedVariable = 5;
      flockSteerVariable = 0.5;
      circle7Counter = 0;
      movingLine1Variable = 0.015;
      wordChangeCounter = 0;

    }
  }


}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

function mouseReleased() {
  locked = false;
}

//particleSystem
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Particle.prototype.display = function() {
  stroke(50, this.lifespan);
  strokeWeight(5);
  fill(0, 102, 153, this.lifespan);
  ellipse(this.position.x, this.position.y, 20, 20);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  if (this.boids.length < 200) {
    this.boids.push(b);
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = flockSpeedVariable;    // Maximum speed
  this.maxforce = flockSteerVariable; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  strokeWeight(1);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}

function playVolumeChange(){

  if (playAudioCounter == 0) {
    audio11.setVolume(0.6);
    audio12.setVolume(0.1);
    audio13.setVolume(0.1);
    audio14.setVolume(0.1);
    audio15.setVolume(0.1);
    audio16.setVolume(0.1);
    audio17.setVolume(0.3);
    setTimeout(function () {
      playAudioCounter = 1;
    }, 3000);
  } else if (playAudioCounter == 1) {
    audio12.setVolume(0.6);
    audio11.setVolume(0.3);
    audio13.setVolume(0.1);
    audio14.setVolume(0.1);
    audio15.setVolume(0.1);
    audio16.setVolume(0.1);
    audio17.setVolume(0.1);
    setTimeout(function () {
      playAudioCounter = 2;
    }, 3000);
  } else if (playAudioCounter == 2) {
    audio13.setVolume(0.6);
    audio11.setVolume(0.1);
    audio12.setVolume(0.3);
    audio14.setVolume(0.1);
    audio15.setVolume(0.1);
    audio16.setVolume(0.1);
    audio17.setVolume(0.1);
    setTimeout(function () {
      playAudioCounter = 3;
    }, 3000);
  } else if (playAudioCounter == 3) {
    audio14.setVolume(0.6);
    audio11.setVolume(0.1);
    audio12.setVolume(0.1);
    audio13.setVolume(0.3);
    audio15.setVolume(0.1);
    audio16.setVolume(0.1);
    audio17.setVolume(0.1);
    setTimeout(function () {
      playAudioCounter = 4;
    }, 3000);
  } else if (playAudioCounter == 4) {
    audio15.setVolume(0.6);
    audio11.setVolume(0.1);
    audio12.setVolume(0.1);
    audio13.setVolume(0.1);
    audio14.setVolume(0.3);
    audio16.setVolume(0.1);
    audio17.setVolume(0.1);
    setTimeout(function () {
      playAudioCounter = 5;
    }, 3000);
  } else if (playAudioCounter == 5) {
    audio16.setVolume(0.6);
    audio11.setVolume(0.1);
    audio12.setVolume(0.1);
    audio13.setVolume(0.1);
    audio14.setVolume(0.1);
    audio15.setVolume(0.3);
    audio17.setVolume(0.1);
    setTimeout(function () {
      playAudioCounter = 6;
    }, 3000);
  } else if (playAudioCounter == 6) {
    audio17.setVolume(0.6);
    audio11.setVolume(0.1);
    audio12.setVolume(0.1);
    audio13.setVolume(0.1);
    audio14.setVolume(0.1);
    audio15.setVolume(0.1);
    audio16.setVolume(0.3);
    setTimeout(function () {
      playAudioCounter = 0;
    }, 3000);
  }

}
function showFinalWords() {
  document.getElementById('finalWords1').style.display = "block";
  setTimeout(function () {
    document.getElementById('finalWords1').style.display = "none";
    document.getElementById('finalWords2').style.display = "block";
    setTimeout(function () {
      document.getElementById('finalWords2').style.display = "none";
      document.getElementById('finalWords3').style.display = "block";
      setTimeout(function () {
        document.getElementById('finalWords3').style.display = "none";
        document.getElementById('finalWords4').style.display = "block";
        setTimeout(function () {
          document.getElementById('finalWords4').style.display = "none";
          document.getElementById('finalWords5').style.display = "block";
          setTimeout(function () {
            document.getElementById('finalWords5').style.display = "none";
            document.getElementById('finalWords6').style.display = "block";
            setTimeout(function () {
              document.getElementById('finalWords6').style.display = "none";
              document.getElementById('finalWords7').style.display = "block";
              setTimeout(function () {
                document.getElementById('finalWords7').style.display = "none";
                document.getElementById('finalWords8').style.display = "block";
                setTimeout(function () {
                  document.getElementById('finalWords8').style.display = "none";
                  document.getElementById('finalWords9').style.display = "block";
                  setTimeout(function () {
                    document.getElementById('finalWords9').style.display = "none";
                    document.getElementById('finalWords10').style.display = "block";
                    setTimeout(function () {
                      document.getElementById('finalWords10').style.display = "none";
                      document.getElementById('finalWords11').style.display = "block";
                      setTimeout(function () {
                        document.getElementById('finalWords11').style.display = "none";
                        document.getElementById('refreshBtn').style.display = "block";
                      }, 9000);
                    }, 3000);
                  }, 6000);
                }, 3000);
              }, 3000);
            }, 3000);
          }, 3000);
        }, 6000);
      }, 6000);
    }, 6000);
  }, 6000);
}

function pageRefresh() {
  location.reload();
}
