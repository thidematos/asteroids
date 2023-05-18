'use strict';

const canvas = document.querySelector('#canvas');
const cxCanvas = canvas.getContext('2d');
const btnStart = document.querySelector('#btnStart');
const btnRestart = document.querySelector('#btnRestart');
const timer = document.querySelector('.div__timer');
const score = document.querySelector('.score__p');
const play = document.querySelector('#play');
const music = document.querySelector('#music');
const bestScore = document.querySelector('.bestScore');
const gameOverDiv = document.querySelector('.gameOver-container');

// --------------------- Music Button -------------------------
let statusMusic = true;
const playPause = function () {
  if (statusMusic) {
    statusMusic = false;
    play.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
    music.pause();
  } else {
    statusMusic = true;
    play.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    music.play();
  }
};

play.addEventListener('click', playPause);

// ----------------------- Timer and Score ----------------------
let idTimer = 0;
let idScore = 0;
let idPenalti = 0;
let bestPoint = 0;
let points = 0;

const timerStart = function () {
  let cSec = 0;
  let cMin = 0;

  gameOverDiv.classList.add('hidden');

  idTimer = setInterval(() => {
    if (cSec < 60) {
      cSec++;
      timer.textContent = `${cMin < 10 ? '0' : ''}${cMin}:${
        cSec < 10 ? `0` : ''
      }${cSec}`;
    } else {
      cSec = 0;
      cSec++;
      cMin += 1;
      timer.textContent = `${cMin < 10 ? '0' : ''}${cMin}:${
        cSec < 10 ? `0` : ''
      }${cSec}`;
    }
  }, 1000);

  idPenalti = setInterval(() => {
    let ok = false;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'w' || e.key === 's' || e.key === 'a' || e.key === 'd') {
        ok = true;
      }
    });
    if (!ok) {
      points >= 50 ? (points -= 50) : (points = 0);
      score.textContent = `${points}`;
    }
  }, 5000);

  idScore = setInterval(() => {
    points += 100;
    score.textContent = `${points}`;
  }, 10000);
};

// ---------------------------- Rocket & Game ------------------------
const keyboard = {
  right: false,
  left: false,
  up: false,
  down: false,
};

const asteroids = [];

const elements = [];

const Rocket = new rocket(canvas, cxCanvas, keyboard);

const Asteroid = new asteroid(
  canvas,
  cxCanvas,
  generateRandom(),
  Rocket,
  gameOver
);
asteroids.push(Asteroid);
elements.push(Asteroid);

const Asteroid2 = new asteroid2(
  canvas,
  cxCanvas,
  generateRandom(),
  Rocket,
  gameOver
);
asteroids.push(Asteroid2);
elements.push(Asteroid2);

const Boss = new boss(canvas, cxCanvas, generateRandom(), Rocket, gameOver);
elements.push(Boss);

const Thanos = new thanos(canvas, cxCanvas, generateRandom(), Rocket, gameOver);
elements.push(Thanos);

console.log(asteroids);

window.addEventListener('keydown', (e) => {
  if (e.key === 'w') {
    keyboard.up = true;
  } else if (e.key === 's') {
    keyboard.down = true;
  } else if (e.key === 'a') {
    keyboard.left = true;
  } else if (e.key === 'd') {
    keyboard.right = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'w') {
    keyboard.up = false;
  } else if (e.key === 's') {
    keyboard.down = false;
  } else if (e.key === 'a') {
    keyboard.left = false;
  } else if (e.key === 'd') {
    keyboard.right = false;
  }
});

function generateRandom() {
  let posX = Math.trunc(Math.random() * (canvas.width - 40));
  let posY = Math.trunc(Math.random() * (canvas.height - 40));
  return [posX, posY];
}

const movement = function () {
  cxCanvas.clearRect(0, 0, canvas.width, canvas.height);
  Rocket.draw();
  Asteroid.draw();
  Asteroid2.draw();
  Boss.draw();
  Thanos.draw();
  requestAnimationFrame(movement);
};

requestAnimationFrame(movement);

asteroids.forEach((e) => {
  setInterval(() => {
    e.directionX > 0 ? (e.directionX += 1) : (e.directionX += -1);
    e.directionY > 0 ? (e.directionY += 1) : (e.directionY += -1);
  }, 20000);
});

// --------------------- Restart ------------------------
function gameOver() {
  clearInterval(idTimer);
  clearInterval(idScore);
  clearInterval(idPenalti);

  points > bestPoint ? (bestPoint = points) : (bestPoint = bestPoint);

  gameOverDiv.classList.remove('hidden');
  bestScore.textContent = `${bestPoint}`;

  elements.forEach((e) => {
    e.isMoving = false;
    e.positions = generateRandom();
    e.pX =
      e.positions[0] < e.asteroid.width + 2
        ? e.positions[0] + e.asteroid.width
        : e.positions[0] - e.asteroid.width;
    e.pY =
      e.positions[1] < e.asteroid.height + 2
        ? e.positions[1] + e.asteroid.height
        : e.positions[1] - e.asteroid.height;
  });

  points = 0;
  score.textContent = '---';
  timer.textContent = '00:00';
}

btnRestart.addEventListener('click', gameOver);
