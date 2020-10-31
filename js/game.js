import { Snake } from './snake.js';

// The same size defined by CSS grid property
export const BOARD_SIZE = 31;
// The amount with which will the snake grow
// when it eats the food
const GROWTH_VALUE = 1;
const DIRECTION = {
  DOWN: {x: 0, y: 1},
  UP: {x: 0, y: -1},
  LEFT: {x: -1, y: 0},
  RIGHT: {x: 1, y: 0}
};

export class Game {
  constructor() {
    // Place the snake in the center of the board
    const pos = Math.floor(BOARD_SIZE / 2) + 1;
    this.snake = new Snake(pos, pos);
    // Place the food random on the board
    this.food = this.randomCoordinatesFood();
    this.gameBoardUI = document.querySelector('.game-board');
    this.isGameOvere = false;
    this.init();
  }

  // Manage the input from the user to move the snake
  init() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          if (this.snake.direction === DIRECTION.RIGHT) return;
          this.snake.direction = DIRECTION.LEFT;
          break;
        case 'ArrowRight':
          if (this.snake.direction === DIRECTION.LEFT) return;
          this.snake.direction = DIRECTION.RIGHT;
          break;
        case 'ArrowUp':
          if (this.snake.direction === DIRECTION.DOWN) return;
          this.snake.direction = DIRECTION.UP;
          break;
        case 'ArrowDown':
          if (this.snake.direction === DIRECTION.UP) return;
          this.snake.direction = DIRECTION.DOWN;
          break;
      }
    })
  }

  drawSnake() {
    this.snake.body.forEach(({x, y}) => {
      const segmentDiv = document.createElement('div');
      segmentDiv.classList.add('snake');
      segmentDiv.style.gridRowStart = y.toString();
      segmentDiv.style.gridColumnStart = x.toString();
      this.gameBoardUI.appendChild(segmentDiv);
    });
  }

  drawFood() {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('food');
    foodDiv.style.gridRowStart = this.food.y.toString();
    foodDiv.style.gridColumnStart = this.food.x.toString();
    this.gameBoardUI.appendChild(foodDiv);
  }

  draw() {
    this.gameBoardUI.innerHTML = '';
    this.drawSnake();
    this.drawFood();
  }

  update() {
    // The game is over if the snake has eaten himself
    if (this.snake.hasEatenHimself()) {
      this.isGameOver = true;
    }
    // Update the snake position
    this.snake.update();
    // Make the snake grow if it eats the food
    if (this.snake.intersect(this.food)) {
      this.snake.eat(GROWTH_VALUE);
      this.food = this.randomCoordinatesFood();
    }
    this.displayScore();
  }

  displayScore() {
    const score = document.querySelector('.score-value');
    score.innerHTML = `${this.snake.body.length - 1}`;
  }

  // Get a random (X, y) position on the board
  // so that it doesn't spawn on the snake
  randomCoordinatesFood() {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE) + 1;
      y = Math.floor(Math.random() * BOARD_SIZE) + 1;
    } while (this.snake.intersect({x, y}));
    return {x, y};
  }
}

