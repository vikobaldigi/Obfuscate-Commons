// /docs/js/visuals/frequency.js

let freqCanvas;
let textInput;
let freqHist = Array(26).fill(0);

function setup() {
  freqCanvas = createCanvas(600, 200);
  freqCanvas.parent("freq-canvas");
  textInput = createInput("HELLO ENCRYPTED WORLD");
  textInput.input(updateFreq);
  textInput.position(10, 10);
  updateFreq();
}

function updateFreq() {
  freqHist.fill(0);
  let txt = textInput.value().toUpperCase();
  for (let char of txt) {
    let i = char.charCodeAt(0) - 65;
    if (i >= 0 && i < 26) freqHist[i]++;
  }
}

function draw() {
  background(0);
  fill(255);
  textSize(12);
  text("Letter Frequency", 300, 30);

  for (let i = 0; i < 26; i++) {
    let h = freqHist[i] * 5;
    fill(185, 142, 255);
    rect(i * 20 + 50, height - 40, 15, -h);
    fill(255);
    text(String.fromCharCode(65 + i), i * 20 + 55, height - 20);
  }
}