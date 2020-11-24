const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

let speed = 7;

//game loop
drawGame = () => {
  clearScreen();
  setTimeout(drawGame, 1000 / speed);
};

drawGame();
