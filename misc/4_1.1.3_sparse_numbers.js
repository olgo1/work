// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Тренажёр: Арифметика с большими числами",
    subtitle: "Задачи на вычисления с числами, содержащими нули в середине.",
    problemsToSelect: 8, // Можно выбрать любое количество из 10 доступных типов
    totalTime: 1200 // 20 минут
};

// --- УТИЛИТЫ ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// --- БАНК ЗАДАЧ ---
const allTasks = [
    {
        type: "Деление с нулями в середине (1)",
        number: 1.1,
        generate: () => {
            let m, k, a, b_base, b, n;
            // Цикл для гарантии, что сгенерированные числа позволяют найти решение
            while (true) {
                m = getRandomElement([3, 4, 6, 7, 8, 9]);
                k = getRandomElement([5, 6]);
                a = getRandomInt(10, 99);
                if (a % m === 0) continue; // "голова" не должна быть кратна m

                const powerOf10 = 10 ** k;
                if ((a * powerOf10) % m === 0) continue;

                b_base = (m - (a * powerOf10) % m) % m;
                b = b_base;
                while (b < 10) {
                    b += m;
                }

                if (b <= 99) { // Если найден подходящий двузначный "хвост"
                    n = a * powerOf10 + b;
                    break;
                }
            }
            const problemText = `Найдите значение выражения: <br><h3>${n} : ${m}</h3>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => vars.n / vars.m
    },
    {
        type: "Деление с нулями в середине (2)",
        number: 1.2,
        generate: () => {
            let m, k, a, b, n;
            while (true) {
                m = getRandomElement([3, 4, 6, 7, 8, 9]);
                k = getRandomElement([4, 5]);
                a = getRandomInt(11, 99);
                if (a % m === 0 || a % 10 === 0) continue;

                const powerOf10 = 10 ** k;
                const remainder = (m - (a * powerOf10) % m) % m;
                
                const possible_b = [];
                for (let i = 1; i <= 9; i++) {
                    if (i % m === remainder) {
                        possible_b.push(i);
                    }
                }

                if (possible_b.length > 0) {
                    b = getRandomElement(possible_b);
                    n = a * powerOf10 + b;
                    break;
                }
            }
            const problemText = `Найдите значение выражения: <br><h3>${n} : ${m}</h3>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => vars.n / vars.m
    },
    {
        type: "Умножение с нулями в середине (1)",
        number: 2.1,
        generate: () => {
            const n = getRandomElement([3, 4, 6, 7, 8, 9]);
            const k = getRandomElement([5, 6]);
            let a;
            do {
                a = getRandomInt(11, 90);
            } while (a % n === 0 || a % 10 === 0);
            
            const m = Math.floor((a * (10 ** k)) / n) + 1;
            const problemText = `Найдите значение выражения: <br><h3>${n} &times; ${m}</h3>`;
            return { variables: { n, m }, problemText };
        },
        calculateAnswer: (vars) => vars.n * vars.m
    },
    {
        type: "Умножение с нулями в середине (2)",
        number: 2.2,
        generate: () => {
            const n = getRandomElement([3, 4, 6, 7, 8, 9]);
            const k = getRandomElement([3, 4]);
            const a = getRandomInt(100, 999);
            const powerOf10 = 10 ** k;
            const b = (n - (a * powerOf10) % n) % n;
            const p = a * powerOf10 + b;
            const m = p / n;
            const problemText = `Найдите значение выражения: <br><h3>${m} &times; ${n}</h3>`;
            return { variables: { p }, problemText };
        },
        calculateAnswer: (vars) => vars.p
    },
    {
        type: "Умножение с нулями в середине (3)",
        number: 2.3,
        generate: () => {
            const n = getRandomElement([3, 6, 7, 9]);
            const k = getRandomElement([4, 5]);
            const a = getRandomInt(11, 99);
            const powerOf10 = 10 ** k;
            const b = (n - (a * powerOf10) % n) % n;
            const p = a * powerOf10 + b;
            const m = p / n;
            const problemText = `Найдите значение выражения: <br><h3>${m} &times; ${n}</h3>`;
            return { variables: { p }, problemText };
        },
        calculateAnswer: (vars) => vars.p
    },
    {
        type: "Умножение с нулями в ответе",
        number: 2.4,
        generate: () => {
            const m2 = 8;
            // Генерируем нечетный коэффициент c от 1 до 79, чтобы m1 был 4-5 значным
            const c = 2 * getRandomInt(0, 39) + 1;
            const m1 = 1250 * c;
            const P = m1 * m2;
            const problemText = `Найдите значение выражения: <br><h3>${m1} &times; ${m2}</h3>`;
            return { variables: { P }, problemText };
        },
        calculateAnswer: (vars) => vars.P
    },
    {
        type: "Сложение с нулями в сумме",
        number: 3.1, // В вашем списке был 3.2, я поставил 3.1
        generate: () => {
            const k_zeros = getRandomElement([3, 4]);
            const ten_k = 10 ** k_zeros;
            const s1_tail = getRandomInt(1, ten_k - 1);
            const s2_tail = ten_k - s1_tail;
            let s1_head, s2_head;
            do {
                s1_head = getRandomInt(1, 99);
                s2_head = getRandomInt(1, 99);
            } while (s1_head + s2_head === 9); // Условие, чтобы не было лишнего нуля
            
            const s1 = s1_head * ten_k + s1_tail;
            const s2 = s2_head * ten_k + s2_tail;
            const S = s1 + s2;
            const problemText = `Найдите значение выражения: <br><h3>${s1} + ${s2}</h3>`;
            return { variables: { S }, problemText };
        },
        calculateAnswer: (vars) => vars.S
    },
    {
        type: "Вычитание с нулями в разности",
        number: 3.2,
        generate: () => {
            let u, v, R;
            do {
                const k_zeros = getRandomElement([3, 4]);
                const R_head = getRandomInt(10, 999);
                const R_tail = getRandomInt(1, 9);
                R = R_head * (10 ** (k_zeros + 1)) + R_tail;
                
                const possible_v_last = [];
                for(let i = 1; i <= 9; i++) {
                    if (i + R_tail >= 10) { // Условие на перенос разряда
                        possible_v_last.push(i);
                    }
                }
                const v_last = getRandomElement(possible_v_last);
                const v_head = getRandomInt(10, 9999);
                v = v_head * 10 + v_last;
                u = R + v;
            } while (u < 10000 || u > 999999); // Уменьшаемое 5- или 6-значное

            const problemText = `Найдите значение выражения: <br><h3>${u} - ${v}</h3>`;
            return { variables: { R }, problemText };
        },
        calculateAnswer: (vars) => vars.R
    },
    {
        type: "Сложение и вычитание с нулями (1)",
        number: 3.3,
        generate: () => {
            const k_zeros = 3;
            const ten_k = 1000;
            let S, S_tail_100;
            do {
                 const S_head = getRandomInt(20, 199);
                 const S_tail = getRandomInt(10, 999);
                 S = S_head * ten_k + S_tail;
                 S_tail_100 = S % 100;
            } while (S_tail_100 === 0); // хвост суммы не должен быть 00

            const a1 = getRandomInt(1000, S - 1000);
            const a2 = S - a1;
            
            const a3_head = getRandomInt(1, 9);
            const a3_tail = getRandomInt(0, S_tail_100 - 1);
            const a3 = a3_head * 100 + a3_tail;

            const R = S - a3;
            const problemText = `Найдите значение выражения: <br><h3>${a1} + ${a2} - ${a3}</h3>`;
            return { variables: { R }, problemText };
        },
        calculateAnswer: (vars) => vars.R
    },
    {
        type: "Сложение и вычитание с нулями (2)",
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

            const problemText = `Найдите значение выражения: <br><h3>${a1} - ${a3} + ${a2}</h3>`;
            return { variables: { R_final }, problemText };
        },
        calculateAnswer: (vars) => vars.R_final
    },
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
