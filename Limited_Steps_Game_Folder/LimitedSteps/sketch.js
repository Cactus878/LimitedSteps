var imgCoin, imgRobber, imgStepCoin, imgLava;
var player, coin, stepCoin, lava;
var score = 0, steps = 50, highScore = 0;
var tileW = 50, tileH = 50, tileMargin = 4;
var gameState = 0;

var xPos = [110,164,218,272,326,380]
var yPos = [150,204,258,312,366,420]
function preload(){
  imgCoin = loadImage("Images/Coin.png");
  imgRobber = loadImage("Images/Robber.png");
  imgStepCoin = loadImage("Images/StepCoins.png");
  imgTile = loadImage("Images/Tile.png");
  imgLava = loadImage("Images/Lava.png");
}
//(110,150) (164,150) (218,150) (272,150) (326,150) (380,150)     
//(110,204) (164,204) (218,204) (272,204) (326,204) (380,204)
//(110,258) (164,258) (218,258) (272,258) (326,258) (380,258)
//(110,312) (164,312) (218,312) (272,312) (326,312) (380,312)
//(110,366) (164,366) (218,366) (272,366) (326,366) (380,366)
//(110,420) (164,420) (218,420) (272,420) (326,420) (380,420)
function setup(){
  createCanvas(500,500);

  //Builds the placements of the grid, including the amount
  for(var gridHeightAmount = 0; gridHeightAmount<6; gridHeightAmount++){
    for(var gridWidthAmount = 0; gridWidthAmount<6; gridWidthAmount++) {
      createTile(110+gridWidthAmount*(tileW+tileMargin),150+gridHeightAmount*(tileH+tileMargin));
    }
  }

  coinGroup = new Group();
  lavaGroup = new Group();

  createCoin();

  player = createSprite(110,150,50,50);
  player.addImage("player", imgRobber);
  player.scale = 1.2;
}

function draw() {
  background(50);

  textSize(20);
  text("Score: "+ score,10,20);
  text("Steps: "+ steps,10,40);
  text("High Score: "+ highScore,10,60);
  if(gameState === 0){
    if(keyWentDown(LEFT_ARROW)){
      if(player.x > 154){
        steps--;
        player.x -= 54;
      }
    }
    else if(keyWentDown(RIGHT_ARROW)){
      if(player.x < 354){
        steps--;
        player.x += 54;
      }
    }
    else if(keyWentDown(UP_ARROW)){
      if(player.y > 154){
        steps--;
        player.y -= 54;
      }
    }
    else if(keyWentDown(DOWN_ARROW)){
      if(player.y < 414){
        steps--;
        player.y += 54;
      }
    }
  }

  if(player.isTouching(coinGroup)){
    score++;
    steps = steps + 4;
    newRound();
    createCoin();
  }
  if(player.isTouching(lavaGroup)){
    steps = steps - 5;
    lavaGroup.setLifetimeEach(0);
  }

  if(steps === 0){
    gameState = 1;
    if(highScore < score){
      highScore = score;
    }
    gameOver();
  }
  
  drawSprites();


}

//Randomly creates a color for each tile within the grid
function createTile(x,y){
  var randomR = Math.round(random(0,255));
  var randomG = Math.round(random(0,255));
  var randomB = Math.round(random(0,255));
  var hw1 = createSprite(x,y-25,50,5);
  hw1.shapeColor = rgb(randomR, randomG, randomB);
  var hw2 = createSprite(x,y+25,50,5);
  hw2.shapeColor = rgb(randomR, randomG, randomB);
  var vw1 = createSprite(x-25,y,5,50);
  vw1.shapeColor = rgb(randomR, randomG, randomB);
  var vw2 = createSprite(x+25,y,5,50);
  vw2.shapeColor = rgb(randomR, randomG, randomB);
}

//Builds the random position of the coin
function randomizeCoinPos(randomNum){
  var randomXPos = Math.round(random(0,6))
  var randomYPos = Math.round(random(0,6))
  switch(randomNum){
    case 0: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 1: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 2: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 3: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 4: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 5: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    default: break;
  }
}

//Builds the random position of the lava
function randomizeLavaPos(randomNum){
  var randomXPos = Math.round(random(0,6))
  var randomYPos = Math.round(random(0,6))
  switch(randomNum){
    case 0: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 1: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 2: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 3: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 4: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 5: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    default: break;
  }
}

//Spawns the coin sprite in a specific location
function spawnCoin(x,y){
  coin = createSprite(x,y,50,50);
  coin.addImage("coin", imgCoin);
  coin.scale = 0.45;
  coin.lifetime = -1;
  coinGroup.add(coin);
  if(coin.y < 150 || coin.x < 110 || coin.y > 420 || coin.x > 380){
    coinGroup.setLifetimeEach(0);
    createCoin();
  }
}

//Spawns the lava sprite in a specific location
function spawnLava(x,y){
  lava = createSprite(x,y,50,50);
  lava.addImage("lava", imgLava);
  lava.scale = 1.2;
  lava.lifetime = -1;
  lavaGroup.add(lava);
}

function createCoin(){
  var randomNum = Math.round(random(0,6))
  randomizeCoinPos(randomNum);
}

function createLava(amount){
  for(var r = 0; r !== amount; r++){
    var randomNum = Math.round(random(0,6))
    randomizeLavaPos(randomNum);
  }
}

//After every coin collected this function will run changing how many lava sprites will spawn
function newRound(){
  coinGroup.setLifetimeEach(0);
  lavaGroup.setLifetimeEach(0);
  if(score <= 5){
    createLava(1);
  }
  else if(score <= 10 && score > 6){
    createLava(2);
  }
  else if(score <= 15 && score > 11){
    createLava(3);
  }
  else if(score > 16){
    createLava(4);
  }
}

function gameOver() {
  swal(
    {
      title: `You ran out of steps!`,
      text: "Score: "+ score,
      confirmButtonText: "Play Again?"
    },
    function(isConfirm) {
      if (isConfirm) {
        gameState = 0;
        coinGroup.setLifetimeEach(0);
        lavaGroup.setLifetimeEach(0);
        createCoin();
        steps = 50;
        score = 0;
      }
    }
  );
}
