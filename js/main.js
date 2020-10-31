import { Game } from './game.js';

// Initialize the game
const game = new Game();
// Keep track of the previous time in order
// to draw at a certain interval of time
let previousTime = 0;
// It determines the speed at which we draw
const SNAKE_SPEED = 4;

function main(currentTime) {
  if (game.isGameOver) {
    if (confirm('Game is over! Press ok to restart.')) {
      window.location = '/';
    }
  }
  requestAnimationFrame(main);
  let timeSinceLastRender = (currentTime - previousTime) / 1000;
  if (timeSinceLastRender < 1 / SNAKE_SPEED) {
    return;
  }
  previousTime = currentTime;
  game.draw();
  game.update();
}

requestAnimationFrame(main);