let caesarInput, shiftSlider, caesarOutput;

function setup() {
  const container = select("#caesar-canvas");
  const canvas = createCanvas(600, 160);
  canvas.parent(container);
  noLoop();

  const label1 = createP("Plaintext:").parent(container);
  label1.style("color", "#b98eff");
  label1.style("font-family", "'Courier New', monospace");

  caesarInput = createInput("HELLO WORLD");
  caesarInput.parent(container);
  caesarInput.style("width", "90%");
  caesarInput.style("padding", "0.5em");
  caesarInput.style("background", "#000");
  caesarInput.style("color", "#b98eff");
  caesarInput.style("border", "1px solid #d9b3ff");
  caesarInput.style("font-family", "'Courier New', monospace");
  caesarInput.input(redraw);

  const label2 = createP("Shift amount (0–25):").parent(container);
  label2.style("color", "#b98eff");
  label2.style("font-family", "'Courier New', monospace");

  shiftSlider = createSlider(0, 25, 3);
  shiftSlider.parent(container);
  shiftSlider.style("width", "90%");
  shiftSlider.input(redraw);

  caesarOutput = createP("").parent(container);
  caesarOutput.style("color", "#b98eff");
  caesarOutput.style("font-family", "'Courier New', monospace");

  redraw();
}

function draw() {
  background(0);
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

  caesarOutput.html("Encrypted Output: " + result);
}