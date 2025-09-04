// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Тренажёр: Делимость и большие числа",
    subtitle: "Внимательно читайте условия задач и давайте ответ.",
    problemsToSelect: 2, // 2 уникальных типа задач
    totalTime: 900 // 15 минут
};

// --- УТИЛИТЫ ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Эта функция не используется в данных задачах, но сохранена как часть "окружения"
function declineWord(number, words) {
    number = Math.abs(number);
    if (number % 100 >= 11 && number % 100 <= 19) return words[2];
    if (number % 10 === 1) return words[0];
    if (number % 10 >= 2 && number % 10 <= 4) return words[1];
    return words[2];
}

// --- БАНК ЗАДАЧ ---
const allTasks = [
    {
        type: "Деление (a - однозначное)",
        number: 1.1,
        generate: () => {
            const mOptions = [3, 4, 6, 7, 8, 9];
            const kOptions = [5, 6];

            const m = getRandomElement(mOptions);
            const k = getRandomElement(kOptions);
            let a;
            do {
                a = getRandomInt(1, 9);
            } while (a % m === 0);

            const remainder = (a * Math.pow(10, k)) % m;
            const b = (m - remainder) % m;
            const n = a * Math.pow(10, k) + b;

            const problemText = `Вычислите ${n} : ${m}`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => {
            return vars.n / vars.m;
        }
    },
    {
        type: "Деление (a - двузначное)",
        number: 1.2,
        generate: () => {
            const mOptions = [3, 4, 6, 7, 8, 9];
            const kOptions = [4, 5];

            const m = getRandomElement(mOptions);
            const k = getRandomElement(kOptions);
            let a;
            do {
                a = getRandomInt(11, 99);
            } while (a % m === 0 || a % 10 === 0);

            const remainder = (a * Math.pow(10, k)) % m;
            const b = (m - remainder) % m;
            const n = a * Math.pow(10, k) + b;

            const problemText = `Вычислите ${n} : ${m}`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => {
            return vars.n / vars.m;
        }
    },
    {
        type: "Умножение (тип 1)",
        number: 2.1,
        generate: () => {
            const nOptions = [3, 4, 6, 7, 8, 9];
            const kOptions = [5, 6];

            const n = getRandomElement(nOptions);
            const k = getRandomElement(kOptions);
            let a;
            do {
                a = getRandomInt(11, 90);
            } while (a % n === 0 || a % 10 === 0);
            
            const m = Math.floor(a * Math.pow(10, k) / n) + 1;

            const problemText = `Вычислите ${n} · ${m}`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => {
            return vars.n * vars.m;
        }
    },
    {
        type: "Умножение (тип 2)",
        number: 2.2,
        generate: () => {
            const nOptions = [3, 4, 6, 7, 8, 9];
            const kOptions = [5, 6];

            const n = getRandomElement(nOptions);
            const k = getRandomElement(kOptions);
            let a;
            do {
                a = getRandomInt(11, 90);
            } while (a % n === 0 || a % 10 === 0);
            
            const m = Math.floor(a * Math.pow(10, k) / n) + 1;
            
            // Отличие от 2.1 только в порядке множителей в вопросе
            const problemText = `Вычислите ${m} · ${n}`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => {
            return vars.n * vars.m;
        }
    }
];

// --- ФУНКЦИЯ ПРОВЕРКИ ---
function isAnswerCorrect(userAnswer, task, vars) {
    const correctAnswer = task.calculateAnswer(vars);
    const correct = String(userAnswer).trim() === String(correctAnswer);
    
    return {
        correct: correct,
        correctAnswerText: String(correctAnswer)
    };
}
