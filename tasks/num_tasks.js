const numTasks = [
    {
        type: "Деление (многозначный делитель)",
        number: 3.1,
        generate: () => {
            // --- Шаг 1: Выбор частного (q) ---
            const possibleQuotients = [3, 4, 6, 7, 8, 9];
            const q = getRandomElement(possibleQuotients);

            // --- Шаг 2: Конструирование делителя (d) ---
            const len = getRandomInt(5, 6); // Выбираем длину: 5 или 6 знаков
            let d;
            const d_last = getRandomInt(1, 9); // Последняя цифра не 0

            if (len === 5) {
                // Формат X000Y
                const d_first = getRandomInt(1, 9);
                d = d_first * 10000 + d_last;
            } else { // len === 6
                // Формат XY000Z
                const d_first = getRandomInt(1, 9);
                const d_second = getRandomInt(0, 9);
                d = d_first * 100000 + d_second * 10000 + d_last;
            }

            // --- Шаг 3: Вычисление делимого (n) ---
            const n = d * q;

            // Формирование текста задачи
            const problemText = `Найдите значение выражения: <br><br> <b>${n} : ${d} = ?</b>`;
            
            // В переменных сохраняем только то, что нужно для проверки ответа
            return { variables: { n, d }, problemText };
        },
        calculateAnswer: (vars) => {
            const result = vars.n / vars.d;
            return String(result);
        }
    },
]

// Add these tasks to the global registry
window.taskRegistry.push(...numTasks);