<<<<<<< HEAD

let messages = [];
let passphrases = ["resist", "refuse", "encrypt"];
let decrypted = [false, false, false];
let userInput = "";
let activeIndex = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');
  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 3; i++) {
    messages.push({
      x: random(width),
      y: random(height),
      text: "⟐☍⧖∷⋰⧉⪧",
      clearText: getPoeticMessage(i),
      hover: false
    });
  }
}

function draw() {
  background(10, 10, 20);

  for (let i = 0; i < messages.length; i++) {
    let m = messages[i];
    m.hover = dist(mouseX, mouseY, m.x, m.y) < 100;

    push();
    translate(m.x, m.y);
    if (decrypted[i]) {
      fill(180, 255, 180);
      text(m.clearText, 0, 0);
    } else if (m.hover) {
      fill(200, 50, 50, 180);
      text(m.text, 0, 0);
      textSize(12);
      fill(120);
      text("click + enter passphrase", 0, 30);
    } else {
      fill(100, 100, 255, 70);
      text(m.text, 0, 0);
    }
    pop();

    m.y += sin(frameCount * 0.01 + i) * 0.2;
    m.x += cos(frameCount * 0.01 + i) * 0.2;
  }

  if (activeIndex !== -1 && !decrypted[activeIndex]) {
    fill(0, 180);
    rect(0, height - 60, width, 60);
    fill(255);
    textSize(16);
    text("Enter passphrase: " + userInput, width / 2, height - 30);
  }
}

function mousePressed() {
  for (let i = 0; i < messages.length; i++) {
    if (dist(mouseX, mouseY, messages[i].x, messages[i].y) < 100) {
      activeIndex = i;
      userInput = "";
=======
let stars;
let connections;
let zoom = 1, offsetX = 0, offsetY = 0;
let dragging = false, dragStartX, dragStartY;
let modalStar = null;

function preload() {
  stars = loadJSON('js/orion-stars.json');
  connections = [
    {from:"SAIPH",to:"ALNITAK"},
    {from:"ALNITAK",to:"ALNILAM"},
    {from:"ALNILAM",to:"MINTAKA"},
    {from:"MINTAKA",to:"RIGEL"},
    {from:"ALNITAK",to:"BETELGEUSE"},
    {from:"BETELGEUSE",to:"MEISSA"},
    {from:"MEISSA",to:"BELLATRIX"},
    {from:"MINTAKA",to:"BELLATRIX"},
    {from:"RIGEL",to:"SAIPH"}
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateCenter();
  setupModalLogic();
}

function calculateCenter(){
  let arr = Object.values(stars);
  let sumX=0,sumY=0;
  arr.forEach(s=>{ sumX+=s.x; sumY+=s.y });
  let cx=sumX/arr.length, cy=sumY/arr.length;
  offsetX = width/2 - cx*zoom;
  offsetY = height/2 - cy*zoom;
}

function draw() {
  background(15);
  translate(offsetX, offsetY);
  scale(zoom);
  scale(1, -1);        // flip y

  // connections
  stroke(200,150,255,50); strokeWeight(1.5);
  connections.forEach(c=>{
    let a=Object.values(stars).find(s=>s.name===c.from),
        b=Object.values(stars).find(s=>s.name===c.to);
    line(a.x,a.y,b.x,b.y);
  });

  // stars
  noStroke(); textFont('courier');
  Object.values(stars).forEach(s=>{
    if(!s.major){
      fill(180,140,240,60);
      ellipse(s.x,s.y,3);
    } else {
      push(); scale(1,-1);
      fill(255); textSize(20);
      text(s.glyph||'✷', s.x, -s.y);
      fill(200); textSize(10);
      text(s.name, s.x, -s.y-20);
      pop();
    }
  });
}

function mousePressed(){
  dragStartX = mouseX-offsetX;
  dragStartY = mouseY-offsetY;
  dragging = true;

  // click star?
  let mx=(mouseX-offsetX)/zoom, my=-(mouseY-offsetY)/zoom;
  for(let s of Object.values(stars)){
    if(s.major && dist(mx,my,s.x,s.y)<16){
      showModal(s); return;
>>>>>>> 27cab91 (Initial commit for GitHub Pages prototype)
    }
  }
}

<<<<<<< HEAD
function keyTyped() {
  if (activeIndex !== -1) {
    if (keyCode === BACKSPACE) {
      userInput = userInput.slice(0, -1);
    } else if (keyCode === ENTER || keyCode === RETURN) {
      if (userInput.toLowerCase() === passphrases[activeIndex]) {
        decrypted[activeIndex] = true;
      }
      activeIndex = -1;
      userInput = "";
    } else {
      userInput += key;
    }
  }
}

function getPoeticMessage(i) {
  const lines = [
    "we are illegible by design",
    "resistance is encoded in our breath",
    "this space belongs to the unarchived"
  ];
  return lines[i];
}
=======
function mouseDragged(){
  if(dragging){
    offsetX = mouseX-dragStartX;
    offsetY = mouseY-dragStartY;
  }
}

function mouseReleased(){ dragging=false; }
function mouseWheel(e){
  zoom = constrain(zoom - e.delta*0.001, 0.3, 5);
}

function setupModalLogic(){
  let m=document.getElementById('modal'),
      title=document.getElementById('modalStar'),
      input=document.getElementById('modalInput'),
      err=document.getElementById('modalError'),
      ok=document.getElementById('modalSubmit'),
      cancel=document.getElementById('modalCancel');

  ok.onclick = ()=>{
    if(input.value.trim().toLowerCase()===modalStar.pass){
      window.location = `chatrooms/${modalStar.link}?key=${modalStar.pass}`;
    } else err.style.display='block';
  };
  cancel.onclick = ()=>{ m.classList.add('hidden'); err.style.display='none'; };
}

function showModal(s){
  modalStar = s;
  document.getElementById('modalStar').innerText = s.name;
  document.getElementById('modal').classList.remove('hidden');
}
>>>>>>> 27cab91 (Initial commit for GitHub Pages prototype)
