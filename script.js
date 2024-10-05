let img1, img2;
let petX, petY;
let xSpeed, ySpeed;
let angle = 0;
let petScale = 0.5;

function preload() {
  // Load the bottom (female) and top (pet) images from the provided URLs
  img1 = loadImage('https://cdn.discordapp.com/attachments/1240462270333718571/1292005135035269231/1.webp?ex=6702290c&is=6700d78c&hm=eb0fb001fdb68027a48b8e09cce2a5598cf4a16a8dacd82f43534cb64dc5c59c&');
  img2 = loadImage('https://cdn.discordapp.com/attachments/1240462270333718571/1292005135509098518/2.webp?ex=6702290c&is=6700d78c&hm=2d3d0a33643440c872982ab5702cb195c27281381fa1cc736ce83bad26d7d969&');
}

function setup() {
  createCanvas(800, 800); // Adjust the canvas size as needed
  petX = width / 1;  // Starting position (center)
  petY = height / 1;
  xSpeed = 1.5;      // Speed for the left-right motion
  ySpeed = 1;        // Speed for the up-down motion
}

function draw() {
  background(0);

  // Display the female character as the bottom layer
  image(img1, 0, 0, width, height);

  // Calculate floating animation for the pet
  petX = width / 2 + sin(angle) * 30; // Floating left/right
  petY = height / 2 + cos(angle * 0.5) * 20; // Floating up/down

  // Increment angle for smooth movement
  angle += 0.02;

  // Display the pet as the top layer with floating motion
  let petWidth = img2.width * petScale;
  let petHeight = img2.height * petScale;
  image(img2, petX - petWidth / 2, petY - petHeight / 2, petWidth, petHeight);
  // Optional: Add any additional effects, like soft transparency
}
