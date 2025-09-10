const questionCards = document.querySelectorAll('.question-card');
let currentQuestionIndex = 0;

function nextQuestion() {
  questionCards[currentQuestionIndex].classList.add('hidden');
  currentQuestionIndex++;
  if (currentQuestionIndex < questionCards.length) {
    questionCards[currentQuestionIndex].classList.remove('hidden');
  }
}

function showResult(answer) {
  questionCards[currentQuestionIndex].classList.add('hidden');
  if (answer === 'yes') {
    document.querySelector('.result-card:not(.no-result)').classList.remove('hidden');
  } else {
    document.querySelector('.result-card.no-result').classList.remove('hidden');
  }
}

// runaway NO button
let runawayInterval = null;
function startRunning(button) {
  if (runawayInterval) return;
  runawayInterval = setInterval(() => {
    const container = button.closest('.buttons');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxMoveX = containerRect.width - buttonRect.width;
    const maxMoveY = containerRect.height - buttonRect.height;
    let newX = Math.random() * maxMoveX;
    let newY = Math.random() * maxMoveY;
    button.style.position = 'absolute';
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
  }, 200);
}
function stopRunning() {
  clearInterval(runawayInterval);
  runawayInterval = null;
}

// continuous hearts
const heartContainer = document.getElementById('heart-container');
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  const size = Math.random() * 20 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${Math.random() * 100}vw`;

  const drift = (Math.random() - 0.5) * 200; // side drift
  heart.style.setProperty('--drift', `${drift}px`);

  const duration = Math.random() * 5 + 5;
  heart.style.animationDuration = `${duration}s, 2s`;

  heartContainer.appendChild(heart);

  // remove after animation ends
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// spawn hearts continuously
setInterval(createHeart, 400);
