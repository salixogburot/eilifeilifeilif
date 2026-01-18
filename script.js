// Quiz questions database - Based on Global Carbon Budget 2025 data
const quizQuestions = [
    {
        question: "Which country had the highest fossil carbon emissions in 2023?",
        answers: ["United States", "India", "China", "Russia"],
        correct: 2
    },
    {
        question: "By approximately how much did China's carbon emissions increase from 1990 to 2023?",
        answers: ["50%", "150%", "250%", "390%"],
        correct: 3
    },
    {
        question: "What does MtCO2 stand for in climate science?",
        answers: ["Metric tonnes of Carbon Dioxide", "Million tonnes of CO2", "Monthly total CO2", "Maximum total CO2"],
        correct: 1
    },
    {
        question: "Which country reduced its carbon emissions the most (%) between 1990 and 2023?",
        answers: ["United States (-4%)", "Japan (-15%)", "Germany (-44%)", "Australia (+38%)"],
        correct: 2
    },
    {
        question: "What was India's approximate carbon emission increase from 1990 to 2023?",
        answers: ["+130%", "+230%", "+330%", "+430%"],
        correct: 3
    },
    {
        question: "In 2023, which country had higher carbon emissions: USA or China?",
        answers: ["USA (4,918 MtCO2)", "China (12,172 MtCO2)", "They were equal", "Neither emitted carbon"],
        correct: 1
    },
    {
        question: "To convert carbon (C) to CO2, you multiply by which factor?",
        answers: ["2.5", "3.664", "5.2", "10"],
        correct: 1
    },
    {
        question: "Which country increased its emissions between 1990 and 2023?",
        answers: ["Germany", "Japan", "Australia", "USA"],
        correct: 2
    },
    {
        question: "What was Japan's carbon emissions change from 1990 to 2023?",
        answers: ["Increased 15%", "Decreased 15%", "Decreased 45%", "Stayed the same"],
        correct: 1
    },
    {
        question: "According to the Global Carbon Budget, what coordinates international carbon cycle research?",
        answers: ["United Nations", "Global Carbon Project", "World Bank", "NASA"],
        correct: 1
    }
];

// Game state
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let selectedAnswer = null;
let userAnswers = [];
let challengeScore = null;

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
const shareBtn = document.getElementById('share-btn');
const copyBtn = document.getElementById('copy-btn');

// Check for challenge mode on page load
window.addEventListener('DOMContentLoaded', checkForChallenge);

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
shareBtn.addEventListener('click', shareChallenge);
copyBtn.addEventListener('click', copyLink);

// Check for challenge parameter in URL
function checkForChallenge() {
    const urlParams = new URLSearchParams(window.location.search);
    const challenge = urlParams.get('challenge');

    if (challenge !== null && !isNaN(challenge)) {
        challengeScore = parseInt(challenge);
        const banner = document.getElementById('challenge-banner');
        banner.innerText = `Your friend got ${challengeScore} correct! Can you beat them?`;
        banner.classList.remove('hidden');
    }
}

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    userAnswers = [];
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
    const isCorrect = answerIndex === question.correct;

    // Record user answer
    userAnswers[currentQuestion] = {
        question: question.question,
        selectedOption: question.answers[answerIndex],
        correctOption: question.answers[question.correct],
        isCorrect: isCorrect
    };

    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);

    // Highlight correct answer always
    answerButtons[question.correct].classList.add('correct');

    // Check if answer is correct
    if (isCorrect) {
        score += 10;
        correctAnswers++;
    } else {
        answerButtons[answerIndex].classList.add('incorrect');
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

    // Hide challenge banner
    const banner = document.getElementById('challenge-banner');
    banner.classList.add('hidden');

    // Update progress to 100%
    progressFill.style.width = '100%';

    // Calculate statistics
    const accuracy = Math.round((correctAnswers / quizQuestions.length) * 100);

    // Display results
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = `${correctAnswers}/${quizQuestions.length}`;
    document.getElementById('accuracy').textContent = `${accuracy}%`;

    // Show challenge result if applicable
    if (challengeScore !== null) {
        const challengeResultDiv = document.getElementById('challenge-result');
        let challengeMessage = '';
        let challengeClass = '';

        if (correctAnswers > challengeScore) {
            challengeMessage = `🎉 You beat your friend! You got ${correctAnswers} correct vs their ${challengeScore}!`;
            challengeClass = 'beat';
        } else if (correctAnswers === challengeScore) {
            challengeMessage = `🤝 It's a tie! You both got ${correctAnswers} correct!`;
            challengeClass = 'tie';
        } else {
            challengeMessage = `😅 Not quite! You got ${correctAnswers}, your friend got ${challengeScore} correct.`;
            challengeClass = 'lost';
        }

        challengeResultDiv.textContent = challengeMessage;
        challengeResultDiv.className = `challenge-result ${challengeClass}`;
        challengeResultDiv.classList.remove('hidden');
    }

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

    // Display detailed answer summary
    showAnswerSummary();
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    progressFill.style.width = '0%';
    scoreElement.textContent = 'Score: 0';

    // Reset challenge result display
    const challengeResultDiv = document.getElementById('challenge-result');
    challengeResultDiv.classList.add('hidden');

    // Show challenge banner again if in challenge mode
    if (challengeScore !== null) {
        const banner = document.getElementById('challenge-banner');
        banner.classList.remove('hidden');
    }
}

function showAnswerSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `summary-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;

        const resultIcon = answer.isCorrect ? '✓' : '✗';
        const resultClass = answer.isCorrect ? 'correct' : 'incorrect';

        let correctAnswerHtml = '';
        if (!answer.isCorrect) {
            correctAnswerHtml = `<div class="correct-answer-label">Correct answer: ${answer.correctOption}</div>`;
        }

        itemDiv.innerHTML = `
            <div class="summary-question">${index + 1}. ${answer.question}</div>
            <div class="summary-answer ${resultClass}">
                <span class="result-icon">${resultIcon}</span>
                Your answer: ${answer.selectedOption}
                ${correctAnswerHtml}
            </div>
        `;

        summaryList.appendChild(itemDiv);
    });
}

function getChallengeUrl() {
    const baseUrl = window.location.href.split('?')[0];
    return `${baseUrl}?challenge=${correctAnswers}`;
}

function shareChallenge() {
    const url = getChallengeUrl();
    const text = `I got ${correctAnswers} out of ${quizQuestions.length} correct on this quiz! Can you beat me?`;

    // Try to use Web Share API (works on mobile and some browsers)
    if (navigator.share) {
        navigator.share({
            title: 'Quiz Challenge',
            text: text,
            url: url
        }).catch(err => {
            console.log('Share cancelled or failed:', err);
            // Fallback to copy
            copyLink();
        });
    } else {
        // Fallback: copy to clipboard
        copyLink();
    }
}

function copyLink() {
    const url = getChallengeUrl();

    // Check if clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            const feedback = document.getElementById('copy-feedback');
            feedback.classList.remove('hidden');
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3000);
        }).catch(err => {
            console.error('Could not copy text:', err);
            fallbackCopyToClipboard(url);
        });
    } else {
        // Fallback for browsers that don't support clipboard API
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        const feedback = document.getElementById('copy-feedback');
        feedback.classList.remove('hidden');
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 3000);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        // Show a prompt with the URL
        prompt('Copy this link:', text);
    } finally {
        document.body.removeChild(textarea);
    }
}
