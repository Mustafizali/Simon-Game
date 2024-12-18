let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

// Colors for the game
const buttonColors = ["green", "red", "yellow", "blue"];

// Start Game on Key Press
document.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Button Click Handler
document.querySelectorAll(".simon-button").forEach((btn) => {
  btn.addEventListener("click", function () {
    let userChosenColor = this.id;
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

// Generate Next Sequence
function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-title").innerText = `Level ${level}`;

  let randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  // Flash the random button
  flashButton(randomColor);
  playSound(randomColor);
}

// Check User's Answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Game Over
function gameOver() {
  document.body.classList.add("game-over");
  setTimeout(() => document.body.classList.remove("game-over"), 200);
  document.getElementById("level-title").innerText = "Game Over! Press Any Key to Restart";

  playSound("wrong");

  resetGame();
}

// Reset Game
function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Flash Animation
function flashButton(color) {
  let button = document.getElementById(color);
  button.classList.add("btn-light");
  setTimeout(() => button.classList.remove("btn-light"), 300);
}

// Play Sound
function playSound(color) {
  let audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttonColors.indexOf(color) + 1}.mp3`);
  audio.play();
}

// Button Click Animation
function animatePress(color) {
  let button = document.getElementById(color);
  button.classList.add("btn-dark");
  setTimeout(() => button.classList.remove("btn-dark"), 100);
}
