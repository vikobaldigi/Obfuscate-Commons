// /docs/js/visuals/blockstream.js

let toggle = true;
let blockX = 50, streamX = 50;

function setup() {
  const canvas = createCanvas(600, 150);
  canvas.parent("cipher-canvas");
  frameRate(10);
}

function draw() {
  background(0);
  fill(255);
  textSize(14);
  text("Block Cipher", 100, 30);
  text("Stream Cipher", 400, 30);

  // Block cipher animation: one big chunk
  fill(185, 142, 255);
  rect(blockX, 60, 40, 30);
  blockX += 10;
  if (blockX > 200) blockX = 50;

  // Stream cipher animation: many small chunks
  for (let i = 0; i < 4; i++) {
    rect(streamX + i * 20, 100, 10, 10);
  }
  streamX += 10;
  if (streamX > 500) streamX = 50;
}