var towerImg, tower;
var doorImg, door, puertaGroup;
var climberImg, climber, baranGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var baraguesosGroup;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight); //lienzo
  tower = createSprite(windowWidth /2, windowHeight /2 );
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale= 1.3
  fantas=createSprite(800,windowHeight - 80,20,50);
  fantas.addImage("fanta",ghostImg);
  fantas.scale=0.3
  baranGroup=new Group();
  puertaGroup=new Group();
  baraguesosGroup=new Group();
  spookySound.loop();
  piso=createSprite(windowWidth/2,windowHeight-10,500,10)
}

function draw() {
  if(gameState==="play"){
    background(200);
    fantas.velocityX=0
    fantas.velocityY=0
    if(keyDown("up") ) {
      fantas.velocityY = -10;

    }
    if(keyDown("right") ) {
      fantas.velocityX = 8;
  
    }
    if(keyDown("left") ) {
      fantas.velocityX = -8;
  
    }
    fantas.velocityY = fantas.velocityY + 0.8
    if(tower.y > 400){
    tower.y = 300;
    }
    fantas.collide(piso);
    drawSprites();
   fill("red"); 
    text(mouseX+","+mouseY,mouseX,mouseY);
   pueltas();
   if(baranGroup.isTouching(fantas)){
      fantas.velocityY=0
      fantas.velocityX=0
   }
    if(baraguesosGroup.isTouching(fantas)){
      fantas.destroy();
    
      gameState="end"
    }
  }
  if(gameState==="end"){
    fill("purple")
    textSize(50);
   text("gg",windowWidth/2,windowHeight/2);

  }
}
function pueltas(){
  if(frameCount %200 === 0){
    var puertas=createSprite(windowWidth/2,-50);
    puertas.x= Math.round(random(440,930));
    puertas.velocityY=2;
    puertas.addImage("portas",doorImg);
    puertas.lifetime = 370;
    barandal=createSprite(200,10,100,10);
    barandal.addImage("baran",climberImg);
    barandal.x=puertas.x;
    barandal.velocityY=puertas.velocityY;
    barandal.lifetime=370;
    baranGroup.add(barandal);
    puertaGroup.add(puertas);
    puertas.depth= fantas.depth;
    fantas.depth = fantas.depth + 1;
    baraguesos=createSprite(200,20,100,10)
    baraguesos.x=barandal.x;
    baraguesos.velocityY=barandal.velocityY;
    baraguesos.lifetime=370;
    baraguesos.visible=true
    baraguesosGroup.add(baraguesos);

  }
}
