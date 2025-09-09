const questionCards = document.querySelectorAll('.question-card');
let currentQuestionIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const heartContainer = document.getElementById('heart-container');
const NUM_HEARTS = 30;

function playAudio(audioSrc) {
    if (audioSrc && audioSrc.includes('http')) {
        audioPlayer.src = audioSrc;
        audioPlayer.play().catch(e => console.error("Audio play failed:", e));
    } else {
        console.log("No valid audio source provided.");
    }
}

function createHearts() {
    heartContainer.innerHTML = '';
    for (let i = 0; i < NUM_HEARTS; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        
        const floatDuration = Math.random() * 5 + 5;
        const breatheDuration = Math.random() * 2 + 1;
        heart.style.animation = `float ${floatDuration}s infinite ease-in-out, breathe ${breatheDuration}s infinite ease-in-out`;
        
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        heartContainer.appendChild(heart);
    }
}

function breakHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        const rect = heart.getBoundingClientRect();
        heart.style.setProperty('--start-y', `${rect.top}px`);
        heart.style.setProperty('--start-rot', getComputedStyle(heart).transform);
        heart.classList.add('broken');
    });
}

function handleNoClick(audioSrc) {
    playAudio(audioSrc);
    breakHearts();
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion(audioSrc) {
    if (audioSrc) {
        playAudio(audioSrc);
    }
    
    questionCards[currentQuestionIndex].classList.add('hidden');
    currentQuestionIndex++;

    if (currentQuestionIndex < questionCards.length) {
        questionCards[currentQuestionIndex].classList.remove('hidden');
        if (questionCards[currentQuestionIndex].classList.contains('final-question')) {
            setTimeout(setInitialNoButtonPosition, 10);
        }
        
        setTimeout(createHearts, 500);
    }
}

function showResult(answer, audioSrc) {
    playAudio(audioSrc);
    if(answer === 'no') {
        breakHearts();
    }
    questionCards[currentQuestionIndex].classList.add('hidden');

    if (answer === 'yes') {
        document.querySelector('.result-card:not(.no-result)').classList.remove('hidden');
    } else {
        document.querySelector('.result-card.no-result').classList.remove('hidden');
    }
}

function setInitialNoButtonPosition() {
    const finalQuestionCard = document.querySelector('.final-question');
    const finalNoButton = finalQuestionCard.querySelector('.final-no');
    const yesButton = finalQuestionCard.querySelector('.final-yes');
    const containerRect = finalQuestionCard.getBoundingClientRect();
    const yesButtonRect = yesButton.getBoundingClientRect();
    finalNoButton.style.position = 'absolute';
    finalNoButton.style.left = `${yesButtonRect.right + 20 - containerRect.left}px`;
    finalNoButton.style.top = `${yesButtonRect.top - containerRect.top}px`;
    finalNoButton.style.transform = 'translate(0, 0)';
    finalNoButton.style.transition = 'transform 0.1s ease-out, top 0.1s ease-out, left 0.1s ease-out';
}

let runawayInterval = null;

function startRunning(button) {
    if (runawayInterval) return;

    runawayInterval = setInterval(() => {
        const container = button.closest('.buttons');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const maxMoveX = containerRect.width - buttonRect.width;
        const maxMoveY = containerRect.height - buttonRect.height;
        
        let newX = Math.random() * maxMoveX;
        let newY = Math.random() * maxMoveY;

        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }, 200);
}

function stopRunning() {
    clearInterval(runawayInterval);
    runawayInterval = null;
}

document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    
    const finalQuestionCard = document.querySelector('.final-question');
    if (finalQuestionCard && !finalQuestionCard.classList.contains('hidden')) {
        setInitialNoButtonPosition();
    }
});
