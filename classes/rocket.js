'use strict';

class rocket {
  constructor(canvas, cxCanvas, keyboard) {
    this.canvas = canvas;
    this.cxCanvas = cxCanvas;
    this.keyboard = keyboard;
    this.rocket = new Image();
    this.rocket.src = `/assets/rocket.png`;
    this.pX = this.canvas.width - this.rocket.width;
    this.pY = 170;
    this.vel = 5;
  }

  movement() {
    if (this.keyboard.left) {
      if (this.pX > 0) {
        this.pX -= this.vel;
      }
    }
    if (this.keyboard.right) {
      if (this.pX < this.canvas.width - this.rocket.width) {
        this.pX += this.vel;
      }
    }
    if (this.keyboard.up) {
      if (this.pY > 0) {
        this.pY -= this.vel;
      }
    }
    if (this.keyboard.down) {
      if (this.pY < this.canvas.height - this.rocket.height) {
        this.pY += this.vel;
      }
    }
  }

  draw() {
    this.movement();
    this.cxCanvas.drawImage(this.rocket, this.pX, this.pY);
  }
}
