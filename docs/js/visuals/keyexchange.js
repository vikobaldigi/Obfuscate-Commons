let diagramCanvas;

function setup() {
  diagramCanvas = createCanvas(600, 200);
  diagramCanvas.parent("key-canvas");
  textAlign(CENTER, CENTER);
  textSize(14);
}

function draw() {
  background(0);
  fill(255);
  text("Symmetric Key", 150, 40);
  text("Asymmetric Key", 450, 40);

  stroke(185, 142, 255);
  fill(185, 142, 255);
  ellipse(100, 100, 60);
  text("Alice", 100, 100);

  ellipse(200, 100, 60);
  text("Bob", 200, 100);

  line(130, 100, 170, 100);
  text("Shared Key", 150, 85);

  ellipse(400, 100, 60);
  text("Alice", 400, 100);

  ellipse(500, 100, 60);
  text("Bob", 500, 100);

  line(430, 100, 470, 100);
  text("Public Key", 450, 85);
  text("Private Key", 450, 120);
}