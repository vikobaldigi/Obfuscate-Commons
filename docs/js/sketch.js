let stars = [];
let connections = [];
let zoom = 1.0;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;
let centerX = 0, centerY = 0;
let velocityX = 0, velocityY = 0;
let zoomTarget = zoom;
let modalStar = null;

function preload() {
  // Load your JSON from the correct docs/js path
  stars = loadJSON('/obfuscate_commons/docs/docs/js/orion-stars.json');

  // Constellation connections
  connections = [
    { from: "SAIPH",      to: "ALNITAK"    },
    { from: "ALNITAK",    to: "ALNILAM"    },
    { from: "ALNILAM",    to: "MINTAKA"    },
    { from: "MINTAKA",    to: "RIGEL"      },
    { from: "ALNITAK",    to: "BETELGEUSE" },
    { from: "BETELGEUSE", to: "MEISSA"     },
    { from: "MEISSA",     to: "BELLATRIX"  },
    { from: "MINTAKA",    to: "BELLATRIX"  },
    { from: "RIGEL",      to: "SAIPH"      }
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateCenterOffset();
  setupModal();
}

function calculateCenterOffset() {
  const arr = Object.values(stars);
  if (!arr.length) return;

  centerX = arr.reduce((s,x)=>s + x.x, 0) / arr.length;
  centerY = arr.reduce((s,x)=>s + x.y, 0) / arr.length;
  offsetX = width/2 - centerX*zoom;
  offsetY = height/2 - centerY*zoom;
}

function draw() {
  background(15, 0, 30);
  offsetX += velocityX; offsetY += velocityY;
  velocityX *= 0.9;       velocityY *= 0.9;
  zoom += (zoomTarget - zoom)*0.1;

  translate(offsetX, offsetY);
  scale(zoom);
  scale(1, -1); // flip Y

  // draw lines
  stroke(200,150,255,25); strokeWeight(1);
  connections.forEach(c => {
    const a = stars[c.from], b = stars[c.to];
    if (a && b) line(a.x,a.y,b.x,b.y);
  });

  noStroke(); textAlign(CENTER,CENTER); textFont('Courier New');
  Object.values(stars).forEach(s => {
    if (!s.major) {
      fill(180,140,240,60);
      ellipse(s.x,s.y,3,3);
      return;
    }
    push();
    scale(1,-1);
    fill(255); textSize(24); text(s.glyph||'✷', s.x, -s.y);
    fill(200,200,255); textSize(10); text(s.name, s.x, -s.y-24);
    pop();
  });
}

function mousePressed() {
  dragging = true;
  dragStartX = mouseX - offsetX;
  dragStartY = mouseY - offsetY;

  const mx = (mouseX - offsetX)/zoom;
  const my = (mouseY - offsetY)/zoom * -1;
  Object.values(stars).forEach(s => {
    if (s.major && dist(mx,my,s.x,s.y) < 16) showModal(s);
  });
}

function mouseDragged() {
  if (dragging) [offsetX,offsetY] = [mouseX-dragStartX, mouseY-dragStartY];
}

function mouseReleased(){ dragging = false; }

function mouseWheel(e){
  zoomTarget = constrain(zoomTarget - e.delta*0.0015, 0.25, 5);
}

function windowResized(){ resizeCanvas(windowWidth,windowHeight); }

function setupModal() {
  const modal = select('#modal');
  const inp   = select('#modalInput');
  const sub   = select('#modalSubmit');
  const can   = select('#modalCancel');
  const err   = select('#modalError');

  sub.mousePressed(()=>{
    if (inp.value().toLowerCase() === modalStar.pass) {
      window.location = modalStar.link;
    } else {
      err.style('display','block'); inp.value('');
    }
  });

  can.mousePressed(()=>{
    modal.addClass('hidden');
    err.style('display','none');
    inp.value(''); modalStar = null;
  });
}

function showModal(s) {
  modalStar = s;
  select('#modalStar').html(s.name);
  select('#modal').removeClass('hidden');
  select('#modalError').style('display','none');
  select('#modalInput').value('').elt.focus();
}