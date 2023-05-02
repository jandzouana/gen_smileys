// a shader variable
let texcoordShader;
let animatedNoise = true;
let fr = 8;
let preview = false;

function preload(){
  // load the shader
  texcoordShader = loadShader('./texcoord.vert', './texcoord.frag');
  randomSeed(int(fxrand()*987654321));
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  grainGraphic = createGraphics(width, height, WEBGL);
  frameRate(fr);
  angleMode(DEGREES);
  
  setupParams();
  
  load();
}

function setupParams(){
  petalNum = floor(random(4, 11));
  if(petalNum === 7) petalNum = 6;
  
  let pNum = int(random() * flowerPalette.length);
  p = flowerPalette[pNum];
  outlineOffset = random(0.95, 0.98);
  bgP = int(random() * bgPalette.length);

  console.log("Outline: " + outlineOffset + "\nPetals: " + petalNum + "\nFlower Palette: " + flowerPalette[pNum].name);
}

function draw() {
  // shader(texcoordShader);

  background(bgPalette[bgP]);

  drawSmiley();
  
  createGrain(0.18);
  if(!preview){
    preview = true;
    fxpreview();
  }
}

function drawSmiley(){
  makePetals(width/2, height/2, petalNum, 175);
  push();
  
  // head
  fill(p.center);
  strokeWeight(0.85);
  stroke(black);
  circle(width/2, height/2, 200);
  
  // eyes
  noStroke();
  fill(black);
  ellipse(width/2 - 18, height/2 + 2, 15, 20);
  ellipse(width/2 + 18, height/2 + 2, 15, 20);
  
  // shine
  fill(offWhite);
  ellipse(width/2 - 18, height/2 - 3, 7, 7);
  ellipse(width/2 + 18, height/2 - 3, 7, 7);
  
  // smile
  stroke(black);
  strokeWeight(1);
  noFill();
  beginShape();
  curveVertex(width/2 - 60, height/2 - 100);
  curveVertex(width/2 - 60, height/2 + 20);
  curveVertex(width/2, height/2 + 65);
  curveVertex(width/2 + 60, height/2 + 20);
  curveVertex(width/2 + 60, height/2 - 100);
  endShape();
  pop();
}

function makePetals(x, y, pNum, pLen){
  push();
  ellipseMode(CORNER);
  translate(x,y);
  
//   stroke(black);
//   strokeWeight(0.5);
  noStroke();
  
  if(pNum % 2 === 1) rotate(-90);
  else if(pNum % 6 === 0) rotate(-30);
  
  // outline
  fill(p.outline);
  for(let i = 0; i < pNum; i++){
    ellipse(0, -pLen/2, pLen * 1.5, pLen);
    rotate(floor(360/pNum));
  }
  
  // flower base
  noStroke();
  fill(p.petal);
  for(let i = 0; i < pNum; i++){
    push();
    // scale(0.998);
    scale(outlineOffset);
    ellipse(0, -pLen/2, pLen * 1.5, pLen);
    pop();
    rotate(floor(360/pNum));
  }
  
  pop();  
}

// TODO: Move to Util
function createGrain(density, rand){
    if(!rand) rand = random(0, 3333);
    grainGraphic.shader(texcoordShader);
    grainGraphic.randomSeed(rand);
  
	texcoordShader.setUniform('tex', get(0, 0, width, height));
	texcoordShader.setUniform('density', density);
	texcoordShader.setUniform('offset', -0.15);
  
	if(animatedNoise) texcoordShader.setUniform('disp', grainGraphic.random(0.99, 1));
  
	grainGraphic.rect(-width / 2, -height / 2, width, height); 
  
    image(grainGraphic, 0, 0, width, height);
}