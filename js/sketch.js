// ─── js/sketch.js ───────────────────────────────────────────
let stars = [];
let connections = [];
let zoom = 1.0, zoomTarget = 1.0;
let offsetX = 0, offsetY = 0;
let dragging = false, dragStartX, dragStartY;
let modalStar = null;

function preload() {
  // start empty
  stars = [];

  // load JSON and only then initialize centers
  loadJSON('js/orion-stars.json', json => {
    // ensure it's an array
    stars = Array.isArray(json) ? json : Object.values(json);
    calculateCenter();
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupConnections();
  setupModal();
  // no calculateCenter here—it's called in preload callback
}

function calculateCenter() {
  if (!stars.length) return;
  let sumX = 0, sumY = 0;
  stars.forEach(s => {
    sumX += s.x;
    sumY += s.y;
  });
  const cx = sumX / stars.length;
  const cy = sumY / stars.length;
  offsetX = width / 2  - cx * zoom;
  offsetY = height / 2 + cy * zoom; // note the flip in draw
}

function setupConnections() {
  connections = [
    { from: "SAIPH", to: "ALNITAK" },
    { from: "ALNITAK", to: "ALNILAM" },
    { from: "ALNILAM", to: "MINTAKA" },
    { from: "MINTAKA", to: "RIGEL" },
    { from: "ALNITAK", to: "BETELGEUSE" },
    { from: "BETELGEUSE", to: "MEISSA" },
    { from: "MEISSA", to: "BELLATRIX" },
    { from: "MINTAKA", to: "BELLATRIX" },
    { from: "RIGEL", to: "SAIPH" },
  ];
}

function draw() {
  background(15, 0, 30);
  offsetX += (offsetX - offsetX) * 0 + 0; // keep old inertia if you add
  // smooth zoom
  zoom += (zoomTarget - zoom) * 0.1;

  translate(offsetX, offsetY);
  scale(zoom);
  scale(1, -1); // flip y-axis

  // draw connections
  stroke(200, 150, 255, 25);
  strokeWeight(1.2);
  connections.forEach(conn => {
    const from = stars.find(s => s.name === conn.from);
    const to   = stars.find(s => s.name === conn.to);
    if (from && to) line(from.x, from.y, to.x, to.y);
  });

  noStroke();
  textFont("Courier New");
  stars.forEach(s => {
    if (!s.major) {
      fill(180, 140, 240, 60);
      ellipse(s.x, s.y, 3, 3);
    } else {
      push();
      scale(1, -1); // upright text
      fill(255);
      textSize(24);
      text(s.glyph || "✷", s.x, -s.y);
      fill(200, 200, 255);
      textSize(10);
      text(s.name, s.x, -s.y - 24);
      pop();
    }
  });
}

function mousePressed() {
  dragging = true;
  dragStartX = mouseX - offsetX;
  dragStartY = mouseY - offsetY;

  // check for star clicks
  const mx = (mouseX - offsetX) / zoom;
  const my = (mouseY - offsetY) / zoom * -1;
  stars.forEach(s => {
    if (s.major && dist(mx, my, s.x, s.y) < 16) showModal(s);
  });
}

function mouseDragged() {
  if (dragging) {
    offsetX = mouseX - dragStartX;
    offsetY = mouseY - dragStartY;
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseWheel(e) {
  zoomTarget -= e.delta * 0.0015;
  zoomTarget = constrain(zoomTarget, 0.25, 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setupModal() {
  const modal  = document.getElementById("modal");
  const input  = document.getElementById("modalInput");
  const sub    = document.getElementById("modalSubmit");
  const cancel = document.getElementById("modalCancel");
  const error  = document.getElementById("modalError");

  sub.onclick = () => {
    const val = input.value.trim().toLowerCase();
    if (modalStar && val === (modalStar.pass || "").toLowerCase()) {
      // point at your chatroom folder:
      window.location.href = `chatrooms/${modalStar.link}?key=${encodeURIComponent(val)}`;
    } else {
      error.style.display = "block";
      input.value = "";
    }
  };
  cancel.onclick = () => {
    modal.classList.add("hidden");
    error.style.display = "none";
    input.value = "";
  };
  input.onkeydown = e => {
    if (e.key === "Enter") sub.click();
    if (e.key === "Escape") cancel.click();
  };
}

function showModal(s) {
  modalStar = s;
  const modal = document.getElementById("modal");
  document.getElementById("modalStar").textContent = s.name;
  document.getElementById("modalError").style.display = "none";
  document.getElementById("modalInput").value = "";
  modal.classList.remove("hidden");
}