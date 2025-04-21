
let messages = [];
let passphrases = ["resist", "refuse", "encrypt"];
let decrypted = [false, false, false];
let userInput = "";
let activeIndex = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');
  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 3; i++) {
    messages.push({
      x: random(width),
      y: random(height),
      text: "⟐☍⧖∷⋰⧉⪧",
      clearText: getPoeticMessage(i),
      hover: false
    });
  }
}

function draw() {
  background(10, 10, 20);

  for (let i = 0; i < messages.length; i++) {
    let m = messages[i];
    m.hover = dist(mouseX, mouseY, m.x, m.y) < 100;

    push();
    translate(m.x, m.y);
    if (decrypted[i]) {
      fill(180, 255, 180);
      text(m.clearText, 0, 0);
    } else if (m.hover) {
      fill(200, 50, 50, 180);
      text(m.text, 0, 0);
      textSize(12);
      fill(120);
      text("click + enter passphrase", 0, 30);
    } else {
      fill(100, 100, 255, 70);
      text(m.text, 0, 0);
    }
    pop();

    m.y += sin(frameCount * 0.01 + i) * 0.2;
    m.x += cos(frameCount * 0.01 + i) * 0.2;
  }

  if (activeIndex !== -1 && !decrypted[activeIndex]) {
    fill(0, 180);
    rect(0, height - 60, width, 60);
    fill(255);
    textSize(16);
    text("Enter passphrase: " + userInput, width / 2, height - 30);
  }
}

function mousePressed() {
  for (let i = 0; i < messages.length; i++) {
    if (dist(mouseX, mouseY, messages[i].x, messages[i].y) < 100) {
      activeIndex = i;
      userInput = "";
    }
  }
}

function keyTyped() {
  if (activeIndex !== -1) {
    if (keyCode === BACKSPACE) {
      userInput = userInput.slice(0, -1);
    } else if (keyCode === ENTER || keyCode === RETURN) {
      if (userInput.toLowerCase() === passphrases[activeIndex]) {
        decrypted[activeIndex] = true;
      }
      activeIndex = -1;
      userInput = "";
    } else {
      userInput += key;
    }
  }
}

function getPoeticMessage(i) {
  const lines = [
    "we are illegible by design",
    "resistance is encoded in our breath",
    "this space belongs to the unarchived"
  ];
  return lines[i];
}
