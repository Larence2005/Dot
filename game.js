const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverDisplay = document.getElementById('gameOver');

// Responsive canvas
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.9, 400);
  canvas.height = Math.min(window.innerHeight * 0.6, 400);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
let score = 0;
let timeLeft = 30;
let circle = { x: 0, y: 0, radius: 30 };

// Generate random position for the circle
function randomPosition() {
  circle.x = Math.random() * (canvas.width - circle.radius * 2) + circle.radius;
  circle.y = Math.random() * (canvas.height - circle.radius * 2) + circle.radius;
}

// Draw the circle
function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Handle circle click
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if the click is inside the circle
  const distance = Math.sqrt(
    Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2)
  );
  if (distance < circle.radius) {
    score++;
    scoreDisplay.textContent = score;
    circle.radius = Math.max(10, 30 - score); // Decrease size with a minimum radius of 10
    randomPosition();
    drawCircle();
  }
});

// Timer function
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  canvas.style.pointerEvents = 'none'; // Disable clicks
  gameOverDisplay.style.display = 'block';
}

// Initialize game
function initGame() {
  randomPosition();
  drawCircle();
  startTimer();
}
initGame();