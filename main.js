const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20; // camvas is 400 x 400 so the gameboard is 20 x 20
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

new Audio("");

//game loop
drawGame = () => {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 3) {
    speed = 11;
  }

  if (score > 6) {
    speed = 15;
  }

  if (score > 10) {
    speed = 20;
  }

  if (score > 20) {
    speed = 30;
  }

  setTimeout(drawGame, 1000 / speed);
};

isGameOver = () => {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  // walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
    // add a gradient later
  }
  return gameOver;
};

drawScore = () => {
  ctx.fillStyle = "white";
  ctx.font = " 10px verdana";
  ctx.fillText(`score ${score}`, canvas.width - 50, 15);
};

clearScreen = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

drawSnake = () => {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head.
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  } // remove the furthest item from the snakes parts if you have more than our tailsize

  // Use a while loop so  if you crashed into a wall it reduces everything back to 0;

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
};

changeSnakePosition = () => {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
};

drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};

checkAppleCollision = () => {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);

    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
};

keyDown = (event) => {
  // up keycode
  if (event.keyCode === 38) {
    if (yVelocity === 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode === 40) {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left:
  if (event.keyCode === 37) {
    if (xVelocity === 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right:
  if (event.keyCode === 39) {
    if (xVelocity === -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
};

document.body.addEventListener("keydown", keyDown);

drawGame();
