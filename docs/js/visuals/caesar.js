// /docs/js/visuals/caesar.js
let caesarInput, shiftSlider, caesarOutput;

function setup() {
  const canvas = createCanvas(600, 150);
  canvas.parent("caesar-canvas");

  caesarInput = createInput("HELLO WORLD");
  caesarInput.position(20, 20);
  caesarInput.size(200);

  shiftSlider = createSlider(0, 25, 3);
  shiftSlider.position(230, 20);

  createP("Encrypted Output:").position(20, 50);
  caesarOutput = createP("");
  caesarOutput.position(20, 80);
  caesarOutput.style("font-family", "Courier New");
}

function draw() {
  background(0);
  fill(185, 142, 255);
  textSize(14);
  text("Plaintext:", 20, 15);
  text("Shift:", 230, 15);

  const txt = caesarInput.value().toUpperCase();
  const shift = shiftSlider.value();
  let result = "";

  for (let i = 0; i < txt.length; i++) {
    let c = txt.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      c = ((c - 65 + shift) % 26) + 65;
    }
    result += String.fromCharCode(c);
  }
  caesarOutput.html(result);
}