const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        if (index === question.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    updateProgress();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            localStorage.setItem('mostRecentScore', score*10);
            window.location.href = 'end.html';
        }
    }, 1000);
}

function updateProgress() {
    progressText.innerText = `Question ${currentQuestionIndex+1} of ${questions.length}`;
    scoreText.innerText = `Score: ${score*10}`;
    progressBarFull.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
}

document.addEventListener('DOMContentLoaded', startGame);
