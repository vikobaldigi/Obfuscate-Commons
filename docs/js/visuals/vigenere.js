let vInput, kInput, vOutput;

function setup() {
  const container = select("#vigenere-canvas");
  const canvas = createCanvas(600, 180);
  canvas.parent(container);
  noLoop();

  const label1 = createP("Plaintext:").parent(container);
  label1.style("color", "#b98eff");
  label1.style("font-family", "'Courier New', monospace");
  vInput = createInput("HELLO WORLD");
  vInput.parent(container);
  vInput.style("width", "90%");
  vInput.style("padding", "0.5em");
  vInput.style("background", "#000");
  vInput.style("color", "#b98eff");
  vInput.style("border", "1px solid #d9b3ff");
  vInput.style("font-family", "'Courier New', monospace");
  vInput.input(redraw);

  const label2 = createP("Keyword:").parent(container);
  label2.style("color", "#b98eff");
  label2.style("font-family", "'Courier New', monospace");
  kInput = createInput("KEY");
  kInput.parent(container);
  kInput.style("width", "90%");
  kInput.style("padding", "0.5em");
  kInput.style("background", "#000");
  kInput.style("color", "#b98eff");
  kInput.style("border", "1px solid #d9b3ff");
  kInput.style("font-family", "'Courier New', monospace");
  kInput.input(redraw);

  vOutput = createP("").parent(container);
  vOutput.style("color", "#b98eff");
  vOutput.style("font-family", "'Courier New', monospace");

  redraw();
}

function draw() {
  background(0);
  const text = vInput.value().toUpperCase();
  const key = kInput.value().toUpperCase();

  let result = "";
  let j = 0;

  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      let k = key.charCodeAt(j % key.length) - 65;
      c = ((c - 65 + k) % 26) + 65;
      j++;
    }
    result += String.fromCharCode(c);
  }

  vOutput.html("Encrypted Output: " + result);
}