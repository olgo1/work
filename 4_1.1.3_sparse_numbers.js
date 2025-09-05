// --- ОБЩИE НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Математический тренажёр",
    subtitle: "Внимательно читайте условия задач и давайте правильные ответы.",
    problemsToSelect: 10, // Выбираем по одной задаче каждого типа
    totalTime: 1800 // Общее время в секундах (30 минут)
};

// --- УТИЛИТЫ ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// --- БАНК ЗАДАЧ ---
const allTasks = [
    // ---------- ТИП 1: ДЕЛЕНИЕ ----------
    {
        type: "Деление с остатком",
        number: 1.1,
        generate: () => {
            const m = getRandomElement([3, 4, 6, 7, 8, 9]);
            const k = getRandomElement([5, 6]);
            let a, b, n;
            do {
                a = getRandomInt(1, 9);
                b = getRandomInt(11, 98); // 10 < n < 99 -> 11..98
                if (b % 10 === 0) b++;
            } while (a % m === 0 || (a * (10 ** k) + b) % m === 0);

            n = a * (10 ** k) + b;
            const problemText = `Вычислите: <b>${n} : ${m}</b> <br><i>Ответ дайте в формате "частное (остаток X)", например, 123 (остаток 4).</i>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => {
            const quotient = Math.floor(vars.n / vars.m);
            const remainder = vars.n % vars.m;
            return `${quotient} (остаток ${remainder})`;
        }
    },
    {
        type: "Деление нацело",
        number: 1.2,
        generate: () => {
            let m, k, a, b, n;
            // Используем цикл, чтобы гарантированно найти подходящие числа
            while (true) {
                m = getRandomElement([3, 6, 7, 9]); // Убраны 4 и 8, т.к. с ними b часто равно 0
                k = getRandomElement([4, 5]);
                a = getRandomInt(11, 99);
                if (a % m === 0 || a % 10 === 0) continue;

                b = (m - (a * (10 ** k)) % m) % m;
                if (b > 0 && b < 10) { // Проверяем, что b - однозначное и не ноль
                    n = a * (10 ** k) + b;
                    break;
                }
            }
            const problemText = `Вычислите: <b>${n} : ${m}</b>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => vars.n / vars.m
    },
    // ---------- ТИП 2: УМНОЖЕНИЕ ----------
    {
        type: "Умножение (с DIV)",
        number: 2.1,
        generate: () => {
            const n = getRandomElement([3, 4, 6, 7, 8, 9]);
            const k = getRandomElement([5, 6]);
            let a;
            do {
                a = getRandomInt(11, 90);
            } while (a % n === 0 || a % 10 === 0);
            const m = Math.floor((a * (10 ** k)) / n) + 1;
            const problemText = `Вычислите: <b>${n} · ${m}</b>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => vars.n * vars.m
    },
    {
        type: "Умножение (голова 3 знака)",
        number: 2.2,
        generate: () => {
            const n = getRandomElement([3, 4, 6, 7, 8, 9]);
            const k = getRandomElement([3, 4]);
            const a = getRandomInt(100, 999);
            let b = (n - (a * (10 ** k)) % n) % n;
            if (b === 0) b = n; // Чтобы избежать хвоста "0"
            const p = a * (10 ** k) + b;
            const m = p / n;
            const problemText = `Вычислите: <b>${m} · ${n}</b>`;
            return { variables: { p }, problemText };
        },
        calculateAnswer: (vars) => vars.p
    },
    {
        type: "Умножение (голова 2 знака)",
        number: 2.3,
        generate: () => {
            const n = getRandomElement([3, 6, 7, 9]);
            const k = getRandomElement([4, 5]);
            const a = getRandomInt(11, 99);
            let b = (n - (a * (10 ** k)) % n) % n;
            if (b === 0) b = n;
            const p = a * (10 ** k) + b;
            const m = p / n;
            const problemText = `Вычислите: <b>${m} · ${n}</b>`;
            return { variables: { p }, problemText };
        },
        calculateAnswer: (vars) => vars.p
    },
    {
        type: "Умножение (4 нуля в ответе)",
        number: 2.4,
        generate: () => {
            const m2 = 8;
            // Выбираем нечётный коэффициент, чтобы m1 было 4-х или 5-значным
            const c = getRandomElement([1, 3, 5, 7, 9, 11, 13, 15, ...Array.from({length: 32}, (_, i) => 17 + i*2)]); // до 79
            const m1 = 1250 * c;
            const problemText = `Вычислите: <b>${m1} · ${m2}</b>`;
            return { variables: { m1, m2 }, problemText };
        },
        calculateAnswer: (vars) => vars.m1 * vars.m2
    },
    // ---------- ТИП 3: СЛОЖЕНИЕ И ВЫЧИТАНИЕ ----------
    {
        type: "Сложение (нули в сумме)",
        number: 3.1,
        generate: () => {
            const k_zeros = getRandomElement([3, 4]);
            const powerOfTen = 10 ** k_zeros;
            const s1_tail = getRandomInt(1, powerOfTen - 1);
            const s2_tail = powerOfTen - s1_tail;
            let s1_head, s2_head;
            do {
                s1_head = getRandomInt(1, 99);
                s2_head = getRandomInt(1, 99);
            } while (s1_head + s2_head === 9);
            const s1 = s1_head * powerOfTen + s1_tail;
            const s2 = s2_head * powerOfTen + s2_tail;
            const problemText = `Вычислите: <b>${s1} + ${s2}</b>`;
            return { variables: { s1, s2 }, problemText };
        },
        calculateAnswer: (vars) => vars.s1 + vars.s2
    },
    {
        type: "Вычитание (нули в разности)",
        number: 3.2,
        generate: () => {
            const k_zeros = getRandomElement([3, 4]);
            const R_head = getRandomInt(10, 99);
            const R_tail = getRandomInt(1, 9);
            const R = R_head * (10 ** (k_zeros + 1)) + R_tail;
            
            const valid_v_last = [];
            for(let i=0; i < 10; i++) {
                if (i > (i + R_tail) % 10) valid_v_last.push(i);
            }
            const v_last = getRandomElement(valid_v_last);
            const v_head = getRandomInt(100, 999);
            const v = v_head * 10 + v_last;
            const u = R + v;
            
            const problemText = `Вычислите: <b>${u} - ${v}</b>`;
            return { variables: { R }, problemText };
        },
        calculateAnswer: (vars) => vars.R
    },
    {
        type: "Комбинированная (a1+a2)-a3",
        number: 3.3,
        generate: () => {
            const k_zeros = 3;
            const S_head = getRandomInt(20, 199);
            const S_tail = getRandomInt(10, 999);
            const S = S_head * (10 ** k_zeros) + S_tail;
            const a1 = getRandomInt(1000, S - 1000);
            const a2 = S - a1;
            const S_tail_100 = S % 100;
            const a3_head = getRandomInt(1, 9);
            // Убедимся, что хвост a3 есть куда генерировать
            const a3_tail_max = S_tail_100 > 0 ? S_tail_100 - 1 : 0;
            const a3_tail = getRandomInt(0, a3_tail_max);
            const a3 = a3_head * 100 + a3_tail;
            const R = S - a3;
            
            const problemText = `Выполните вычисления: <b>(${a1} + ${a2}) - ${a3}</b>`;
            return { variables: { R }, problemText };
        },
        calculateAnswer: (vars) => vars.R
    },
    {
        type: "Комбинированная a1-a3+a2",
        number: 3.4,
        generate: () => {
            const k_zeros = 3;
            const R1_head = getRandomInt(1, 8);
            const R1_tail = getRandomInt(0, 9);
            const R1 = R1_head * (10 ** (k_zeros + 1)) + R1_tail;
            const R_final_head = getRandomInt(R1_head + 1, 9);
            const R_final_tail = getRandomInt(0, 9);
            const R_final = R_final_head * (10 ** (k_zeros + 1)) + R_final_tail;
            const a3 = getRandomInt(100, 999);
            const a1 = R1 + a3;
            const a2 = R_final - R1;
            
            const problemText = `Выполните вычисления: <b>${a1} - ${a3} + ${a2}</b>`;
            return { variables: { R_final }, problemText };
        },
        calculateAnswer: (vars) => vars.R_final
    }
];

// --- ФУНКЦИЯ ПРОВЕРКИ ОТВЕТА ---
function isAnswerCorrect(userAnswer, task, vars) {
    const correctAnswer = task.calculateAnswer(vars);
    const correct = String(userAnswer).trim() === String(correctAnswer);
    return {
        correct: correct,
        correctAnswerText: String(correctAnswer)
    };
}

// --- ЛОГИКА ОТБОРА ЗАДАЧ РАЗНЫХ ТИПОВ ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectProblems(allTasks, count) {
    const shuffled = shuffleArray([...allTasks]);
    const selectedProblems = [];
    const usedTypes = new Set();

    for (const task of shuffled) {
        if (selectedProblems.length >= count) break;
        if (!usedTypes.has(task.type)) {
            selectedProblems.push(task);
            usedTypes.add(task.type);
        }
    }
     // Если уникальных типов меньше, чем count, добавим оставшиеся случайные задачи
    if (selectedProblems.length < count) {
        const remainingTasks = allTasks.filter(task => !usedTypes.has(task.type));
        const shuffledRemaining = shuffleArray(remainingTasks);
        while (selectedProblems.length < count && shuffledRemaining.length > 0) {
            selectedProblems.push(shuffledRemaining.pop());
        }
    }
    return selectedProblems;
}

// Пример того, как будет запускаться отбор задач
// const problemsForCurrentSession = selectProblems(allTasks, trainerSettings.problemsToSelect);
// console.log(problemsForCurrentSession.map(p => p.type));
