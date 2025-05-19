let freqHist = Array(26).fill(0);
let textInput;

function setup() {
  const container = select("#freq-canvas");
  const canvas = createCanvas(600, 250);
  canvas.parent(container);

  const label = createP("Enter text to analyze:").parent(container);
  label.style("color", "#b98eff");
  label.style("font-family", "'Courier New', monospace");

  textInput = createInput("HELLO ENCRYPTED WORLD");
  textInput.parent(container);
  textInput.style("width", "90%");
  textInput.style("padding", "0.5em");
  textInput.style("background", "#000");
  textInput.style("color", "#b98eff");
  textInput.style("border", "1px solid #d9b3ff");
  textInput.style("font-family", "'Courier New', monospace");
  textInput.input(updateFreq);

  updateFreq();
}

function updateFreq() {
  freqHist.fill(0);
  let txt = textInput.value().toUpperCase();
  for (let char of txt) {
    let i = char.charCodeAt(0) - 65;
    if (i >= 0 && i < 26) freqHist[i]++;
  }
  redraw();
}

function draw() {
  background(0);
  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("Letter Frequency", width / 2, 30);

  for (let i = 0; i < 26; i++) {
    let h = freqHist[i] * 5;
    fill(185, 142, 255);
    rect(i * 20 + 30, height - 40, 15, -h);
    fill(255);
    text(String.fromCharCode(65 + i), i * 20 + 37, height - 20);
  }
}