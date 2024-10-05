let img1, img2;
let petX, petY;
let petScale = 0.5;

let mediaRecorder;
let recordedChunks = [];
let canvasStream;

let loopDuration = 240; // Number of frames for one full loop (8 seconds at 30 FPS)
let recordingStarted = false;
let recordingFrames = 0; // Counter for recorded frames

function preload() {
  img1 = loadImage('https://cdn.discordapp.com/attachments/1240462270333718571/1292005135035269231/1.webp?ex=6702290c&is=6700d78c&hm=eb0fb001fdb68027a48b8e09cce2a5598cf4a16a8dacd82f43534cb64dc5c59c&');
  img2 = loadImage('https://cdn.discordapp.com/attachments/1240462270333718571/1292005135509098518/2.webp?ex=6702290c&is=6700d78c&hm=2d3d0a33643440c872982ab5702cb195c27281381fa1cc736ce83bad26d7d969&');
}

function setup() {
  createCanvas(1080, 1080); // High-resolution canvas for quality
  petX = width / 2;
  petY = height / 2;

  // Setup MediaRecorder for canvas at a high resolution
  canvasStream = document.querySelector('canvas').captureStream(30); // 30 fps
  mediaRecorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm; codecs=vp9' });

  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function () {
    let blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'animation-loop-perfect.webm';
    a.click();
  };

  // Start recording immediately
  recordedChunks = [];
  mediaRecorder.start();
  recordingStarted = true;
}

function draw() {
  background(0);

  // Display the female character as the bottom layer
  image(img1, 0, 0, width, height);

  // Calculate floating animation for the pet with seamless looping
  let phase = (TWO_PI * (frameCount % loopDuration)) / loopDuration;
  
  // Exact control over starting position and looping back
  petX = width / 2 + sin(phase) * 30; // Floating left/right
  petY = height / 2 + cos(phase) * 20; // Floating up/down

  // Display the pet as the top layer, scaled down by petScale
  let petWidth = img2.width * petScale;
  let petHeight = img2.height * petScale;
  image(img2, petX - petWidth / 2, petY - petHeight / 2, petWidth, petHeight);

  // Check if loop is about to end and reset conditions
  if (frameCount % loopDuration === loopDuration - 1) {
    frameCount = 0; // Reset frameCount to avoid any flicker
  }

  // Record the frames until the loop duration is reached
  if (recordingStarted) {
    recordingFrames++;
    if (recordingFrames >= loopDuration) {
      mediaRecorder.stop();
      recordingStarted = false;
if (frameCount % loopDuration === loopDuration - 1) {
  frameCount = 0; // Reset to avoid any jump in the loop
}

    }
  }
}
