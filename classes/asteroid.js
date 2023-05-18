'use strict';

class asteroid {
  constructor(canvas, cxCanvas, genRandom, rocket, gameOver) {
    this.canvas = canvas;
    this.cxCanvas = cxCanvas;
    this.positions = genRandom;
    this.rocket = rocket;
    this.gameOver = gameOver;
    this.isMoving = false;
    this.pX = this.positions[0];
    this.pY = this.positions[1];
    this.directionX = 2;
    this.directionY = 2;
    this.asteroid = new Image();
    this.asteroid.src = `/assets/ast.png`;
  }

  start() {
    this.isMoving ? (this.isMoving = false) : (this.isMoving = true);
  }

  movement() {
    if (this.isMoving) {
      this.pX += this.directionX;
      this.pY += this.directionY;
      if (
        this.pX > this.canvas.width - this.asteroid.width - 5 ||
        this.pX < 5
      ) {
        this.directionX *= -1;
      } else if (
        this.pY > this.canvas.height - this.asteroid.height - 5 ||
        this.pY < 5
      ) {
        this.directionY *= -1;
      }
      if (
        this.pX <= this.rocket.pX + this.rocket.rocket.width &&
        this.pX + this.asteroid.width >= this.rocket.pX &&
        this.pY + this.asteroid.height >= this.rocket.pY &&
        this.pY <= this.rocket.pY + this.rocket.rocket.height
      ) {
        this.gameOver();
      }
    }
  }

  draw() {
    this.movement();
    this.cxCanvas.drawImage(this.asteroid, this.pX, this.pY);
  }
}
