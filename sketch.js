var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score=0
var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup,EnemyGroup
var enemyImage,bananaImage

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  enemyImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup=createGroup();
  EnemyGroup=createGroup();
  
}

function draw() { 
  background(0);

  textSize(20)
  fill("red")
  text("Score : " + score, 100, 50)


  if(gameState===PLAY){

  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

if(FoodGroup.isTouching(player)){
  FoodGroup.destroyEach()
    score=score+2
    player.scale+=0.01
  
}

    

  }

  if(EnemyGroup.isTouching(player)){
    gameState= END
  }
  else if(gameState===END){
    backgr.velocityX=0
    player.visible=false
    FoodGroup.destroyEach()
      EnemyGroup.destroyEach()
      
      textSize(20)
fill("red")
text("Game Over!", 300, 200)


    
  }

  spawnfood()
  spawnenemy()
  drawSprites();
}

function spawnfood(){
  if(frameCount % 80===0){
    var banana =createSprite(600,250,40,10)
    banana.y=random(120,200)
    banana.addImage(bananaImage)
    banana.scale=0.05
    banana.velocityX=-4
    banana.lifetime=300
    player.depth=banana.depth+1
    FoodGroup.add(banana)
  }
}

function spawnenemy(){
  if(frameCount % 180===0){
    var enemy =createSprite(600,330,40,10)
    enemy.addImage(enemyImage)
    enemy.scale=0.1
    enemy.velocityX=-4
    enemy.lifetime=300
    player.depth=enemy.depth+1
    EnemyGroup.add(enemy)
  }
}