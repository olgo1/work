// --- UTILITIES (can be shared or kept with tasks) ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

function declineWord(number, words) {
    number = Math.abs(number);
    if (number % 100 >= 11 && number % 100 <= 19) return words[2];
    if (number % 10 === 1) return words[0];
    if (number % 10 >= 2 && number % 10 <= 4) return words[1];
    return words[2];
}

// --- CHECK FUNCTION (required by trainer.js) ---
function isAnswerCorrect(userAnswer, task, vars) {
    const correctAnswer = task.calculateAnswer(vars);
    return {
        correct: String(userAnswer).trim() === String(correctAnswer),
        correctAnswerText: String(correctAnswer)
    };
}

window.getRandomInt = getRandomInt;
window.getRandomElement = getRandomElement;
window.declineWord = declineWord;
window.isAnswerCorrect = isAnswerCorrect;