let stars = [], connections = [], zoom = 1, offsetX = 0, offsetY = 0;
let dragging = false, dragStartX, dragStartY;
let velocityX = 0, velocityY = 0, zoomTarget = 1, modalStar = null;

function preload() {
  stars = loadJSON('../js/orion-stars.json');
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
  const vals = Object.values(stars);
  if (!vals.length) return;
  const sum = vals.reduce((a,s)=>({ x: a.x + s.x, y: a.y + s.y }), {x:0,y:0});
  const centerX = sum.x/vals.length, centerY = sum.y/vals.length;
  offsetX = width/2 - centerX*zoom;
  offsetY = height/2 - centerY*zoom;
}

function draw() {
  background(15,0,30);
  offsetX += velocityX; offsetY += velocityY;
  velocityX *= .9; velocityY *= .9;
  zoom += (zoomTarget - zoom)*.1;

  push();
  translate(offsetX, offsetY);
  scale(zoom); scale(1,-1);

  stroke(200,150,255,25); strokeWeight(1);
  connections.forEach(c => {
    let a = stars[c.from], b = stars[c.to];
    if (a && b) line(a.x,a.y,b.x,b.y);
  });

  noStroke(); textAlign(CENTER,CENTER); textFont('Courier New');
  Object.values(stars).forEach(s => {
    if (!s.major) {
      fill(180,140,240,60);
      ellipse(s.x,s.y,3,3);
      return;
    }
    push(); scale(1,-1);
    fill(255); textSize(24); text(s.glyph||'\u2737', s.x,-s.y);
    fill(200,200,255); textSize(10); text(s.name, s.x,-s.y-24);
    pop();
  });
  pop();
}

function mousePressed() {
  dragging = true;
  [dragStartX,dragStartY] = [mouseX-offsetX, mouseY-offsetY];
  const mx = (mouseX-offsetX)/zoom, my = (mouseY-offsetY)/zoom * -1;
  Object.values(stars).forEach(s => {
    if (s.major && dist(mx,my,s.x,s.y)<16) showModal(s);
  });
}

function mouseDragged() {
  if (dragging) [offsetX,offsetY] = [mouseX-dragStartX, mouseY-dragStartY];
}

function mouseReleased() { dragging = false; }
function mouseWheel(e) { zoomTarget = constrain(zoomTarget - e.delta*0.0015, .25, 5); }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function setupModal() {
  const modal = select('#modal'), inp = select('#modalInput'),
        sub = select('#modalSubmit'), can = select('#modalCancel'),
        err = select('#modalError');

  sub.mousePressed(()=>{
    if (inp.value().toLowerCase() === modalStar.pass)
      location.href = `chatrooms/${modalStar.link}`;
    else err.show(), inp.value('');
  });
  can.mousePressed(()=>{
    modal.addClass('hidden'); err.hide(); inp.value(''); modalStar = null;
  });
}

function showModal(s) {
  modalStar = s;
  select('#modalStar').html(s.name);
  select('#modal').removeClass('hidden');
  select('#modalError').hide();
  select('#modalInput').value('').elt.focus();
}