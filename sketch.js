var player, playerImg;
var bg, bgImg;
var obstacle, obstacleImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var bullet, bulletImg;

function preload(){
  bgImg = loadImage("spacebackground.jpg");
  playerImg = loadImage("ironman.png");
  obstacleImg = loadImage("fallingmeteor.png");
  bulletImg = loadImage("bullet.png");
}

function setup(){
  createCanvas(800,830);
  bg = createSprite(400,350,400,600);
  bg.addImage(bgImg);
  bg.velocityY = 1;
  bg.scale = 1.5;

  bullet = createSprite(200,680);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;

  player = createSprite(200,680);
  player.addImage(playerImg)
  player.scale = 0.5;
  player.setCollider("rectangle",0,0,110,530);

  obstaclesGroup = new Group();
}


function draw(){
  //set background color 
  background("white");
  drawSprites();
  if(gameState === PLAY) {
  if(bg.y>400) {
    bg.y = 300;
  }
  if(keyDown("LEFT_ARROW")) {
    player.x = player.x - 5;
  }
  if(keyDown("RIGHT_ARROW")) {
    player.x = player.x + 5;
  }
  if(keyDown("SPACE")) {
    bullet.velocityY = -24;
  }
  bullet.x = player.x;
  if(bullet.y<0) {
    bullet.x = 200;
    bullet.y = 680;
  }
  spawnObstacles();
  if(obstaclesGroup.isTouching(player)) {
    gameState = END;
  }
}
else {
  if(gameState === END) {
    fill("red");
    textSize(40);
    text("Game Over", 300, 300);
    obstaclesGroup.setVelocityYEach(0); 
    if(bg.y>400) {
      bg.y = 300;
    }
  }
}
}

function spawnObstacles() {
  if(frameCount%90===0) {
    var obstacle = createSprite(200,10,10,10);
    obstacle.addImage(obstacleImg);
    obstacle.x = Math.round(random(50,800));
    obstacle.setCollider("circle",0,0,160)
    obstacle.velocityY = 8;
    obstacle.scale = 0.4;
    obstaclesGroup.add(obstacle);
  }
}