// Load stars data
let stars = [];
let connections = [];
let zoom = 1.0, zoomTarget = 1.0;
let offsetX = 0, offsetY = 0;
let dragging = false, dragStartX, dragStartY;
let modalStar = null;

function preload() {
  stars = loadJSON('/obfuscate_commons/js/orion-stars.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateCenterOffset();
  setupConnections();
  setupModalLogic();
}

function calculateCenterOffset() {
  const arr = Object.values(stars);
  if (!arr.length) return;
  let totalX = 0, totalY = 0;
  arr.forEach(s => { totalX += s.x; totalY += s.y; });
  const cx = totalX / arr.length, cy = totalY / arr.length;
  offsetX = width/2 - cx*zoom;
  offsetY = height/2 - cy*zoom;
}

function setupConnections() {
  connections = [
    {from:'SAIPH', to:'ALNITAK'},
    {from:'ALNITAK', to:'ALNILAM'},
    // …etc…
  ];
}

function draw() {
  background(15,0,30);
  offsetX += (0 - offsetX)*0.05; // optional inertia tweak
  offsetY += (0 - offsetY)*0.05;
  zoom += (zoomTarget - zoom)*0.1;

  translate(offsetX, offsetY);
  scale(zoom);
  scale(1,-1);

  // draw links
  stroke(200,150,255,20);
  connections.forEach(c => {
    const a = stars[c.from], b = stars[c.to];
    if (a && b) line(a.x,a.y,b.x,b.y);
  });

  // draw stars
  noStroke();
  Object.values(stars).forEach(s => {
    if (!s.major) {
      fill(180,140,240,60);
      ellipse(s.x,s.y,3);
    } else {
      push();
      fill(255);
      textSize(24);
      text(s.glyph||'✷', s.x, -s.y);
      fill(200);
      textSize(10);
      text(s.name, s.x, -s.y-24);
      pop();
    }
  });
}

function mousePressed() {
  dragging = true;
  dragStartX = mouseX - offsetX; dragStartY = mouseY - offsetY;
  const mx = (mouseX - offsetX)/zoom;
  const my = (mouseY - offsetY)/zoom * -1;
  Object.values(stars).forEach(s => {
    if (s.major && dist(mx,my,s.x,s.y) < 16) showModal(s);
  });
}

function mouseDragged() {
  if (dragging) {
    offsetX = mouseX - dragStartX;
    offsetY = mouseY - dragStartY;
  }
}

function mouseReleased() { dragging = false; }
function mouseWheel(e) { zoomTarget -= e.delta*0.001; zoomTarget = constrain(zoomTarget, 0.25,5); }
function windowResized() { resizeCanvas(windowWidth,windowHeight); }

function setupModalLogic() {
  const m = document.getElementById('modal');
  const inp = document.getElementById('modalInput');
  document.getElementById('modalSubmit').onclick = () => {
    if (inp.value.trim().toLowerCase()===modalStar.pass) {
      location.href = `/obfuscate_commons/chatrooms/${modalStar.link}`;
    } else {
      document.getElementById('modalError').style.display='block';
      inp.value='';
    }
  };
  document.getElementById('modalCancel').onclick = () => {
    m.classList.add('hidden');
    document.getElementById('modalError').style.display='none';
    modalStar=null;
  };
}

function showModal(star) {
  modalStar = star;
  document.getElementById('modalStar').textContent = star.name;
  const m = document.getElementById('modal');
  m.classList.remove('hidden');
  document.getElementById('modalError').style.display='none';
}