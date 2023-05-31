let motion = false;
let ios = false;

if (typeof DeviceMotionEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function() {
    DeviceMotionEvent.requestPermission()
      .then(function() {
        console.log('DeviceMotionEvent enabled');

        motion = true;
        ios = true;
      })
      .catch(function(error) {
        console.warn('DeviceMotionEvent not enabled', error);
      })
  })
} else {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  let zMotion = round(width / 5 * abs(radians(rotationZ) - PI));
  let yMotion = round(height / 2 + rotationX * 10);
  let xMotion = round(width / 2 + rotationY * 10);

  // motion affected apple
  drawApple(xMotion, yMotion, zMotion);
  // reference apple shape
  stroke(255);
  strokeWeight(3);
  noFill();
  drawApple(width / 2, height / 2, width / 1.2);

  noStroke();
  textSize(width / 35);
  textFont("'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace");

  fill(255, 100, 50);
  text("click to start on iOS", 10, 80);
  text("on a mobile: twist, and tilt your device", 10, 120);
  text("device - x: " + round(rotationX) + ", y: " + round(rotationX) + ", z: " + round(rotationZ), 10, 160);
  text("apple - x: " + xMotion + ", y: " + yMotion + ", size: " + zMotion, 10, 200);
}

// Function to draw apple shape
function drawApple(x, y, size) {
  push();
  translate(x, y);
  scale(size / 100);
  
  fill(255, 0, 0); // Red color
  noStroke();
  
  // Draw apple shape
  beginShape();
  vertex(0, -50);
  bezierVertex(-30, -70, -30, -90, 0, -120);
  bezierVertex(30, -90, 30, -70, 0, -50);
  endShape(CLOSE);
  
  pop();
}
