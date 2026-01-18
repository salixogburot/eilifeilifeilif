// Quiz questions database
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 7 × 8?",
        answers: ["54", "56", "63", "48"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "How many continents are there?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        answers: ["New Zealand", "Australia", "South Africa", "Brazil"],
        correct: 1
    },
    {
        question: "What year did World War II end?",
        answers: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    }
];

// Game state
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let selectedAnswer = null;

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const questionNumber = document.getElementById('question-number');
const scoreElement = document.getElementById('score');
const progressFill = document.getElementById('progress');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    selectedAnswer = null;
    nextBtn.classList.add('hidden');

    // Update question number and progress
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    progressFill.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;

    // Display question
    questionElement.textContent = question.question;

    // Clear previous answers
    answersElement.innerHTML = '';

    // Display answer options
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Already answered

    selectedAnswer = answerIndex;
    const question = quizQuestions[currentQuestion];
    const answerButtons = document.querySelectorAll('.answer-btn');

    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);

    // Check if answer is correct
    if (answerIndex === question.correct) {
        answerButtons[answerIndex].classList.add('correct');
        score += 10;
        correctAnswers++;
    } else {
        answerButtons[answerIndex].classList.add('incorrect');
        answerButtons[question.correct].classList.add('correct');
    }

    // Update score display
    scoreElement.textContent = `Score: ${score}`;

    // Show next button
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Update progress to 100%
    progressFill.style.width = '100%';

    // Calculate statistics
    const accuracy = Math.round((correctAnswers / quizQuestions.length) * 100);

    // Display results
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = `${correctAnswers}/${quizQuestions.length}`;
    document.getElementById('accuracy').textContent = `${accuracy}%`;

    // Display message based on performance
    const messageElement = document.getElementById('result-message');
    if (accuracy === 100) {
        messageElement.textContent = "Perfect score! You're a quiz master!";
    } else if (accuracy >= 80) {
        messageElement.textContent = "Excellent work! You really know your stuff!";
    } else if (accuracy >= 60) {
        messageElement.textContent = "Good job! Keep practicing to improve!";
    } else if (accuracy >= 40) {
        messageElement.textContent = "Not bad! There's room for improvement!";
    } else {
        messageElement.textContent = "Keep trying! Practice makes perfect!";
    }
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    progressFill.style.width = '0%';
    scoreElement.textContent = 'Score: 0';
}
