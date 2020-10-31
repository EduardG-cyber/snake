import { BOARD_SIZE } from './game.js'

export class Snake {
  constructor(x, y) {
    this.initialX = x;
    this.initialY = y;
    this.body = [ {x, y} ];
    this.direction = {x: 0, y: 0};
  }

  eat(foodQuantity) {
    for (let i = 0; i < foodQuantity; i++) {
      this.body.push({ ...this.body[this.body.length - 1]});
    }
  }

  update() {
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }
    this.body[0].x += this.direction.x;
    this.body[0].y += this.direction.y;

    if (this.body[0].x < 1) {
      this.body[0].x = BOARD_SIZE;
    } else if (this.body[0].x > BOARD_SIZE) {
      this.body[0].x = 1;
    }

    if (this.body[0].y < 1) {
      this.body[0].y = BOARD_SIZE;
    } else if (this.body[0].y > BOARD_SIZE) {
      this.body[0].y = 1;
    }
  }

  intersect({x, y}) {
    return this.body.some(segment => segment.x === x && segment.y === y);
  }

  hasEatenHimself() {
    if (this.body.length <= 4) {
      return false;
    }
    const [head, ...tail] = this.body;
    return tail.some(segment => segment.x === head.x && segment.y === head.y);
  }
}