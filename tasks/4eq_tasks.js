const _4eqTasks = [

{
    type: " ",
    name: "4eq14", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // --- АЛГОРИТМ ---

        // Шаг 1: Задаём 'S' - "секретный" однозначный делитель для ученика.
        const S = getRandomInt(4, 9);

        // Шаг 2: Генерируем ответ 'x' и из него строим 'b'.
        const x = getRandomInt(10, 99);
        const b = S * x; // b будет дву- или трёхзначным.

        // Шаг 3: Генерируем 'c' и 'K' (значение скобки).
        // Ограничим 'c', чтобы K не стало слишком большим.
        const c = getRandomInt(100, 600); 
        let K, paren_text;
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];
        
        // Выбираем структуру скобки
        const parenType = getRandomInt(1, 3);

        if (parenType === 1) { // (c + b:x)
            K = c + S;
            paren_text = `(${c} + ${b} : ${varName})`;
        } else if (parenType === 2) { // (b:x + c)
            K = S + c;
            paren_text = `(${b} : ${varName} + ${c})`;
        } else { // (c - b:x)
            if (c <= S) return this.generate(); 
            K = c - S;
            paren_text = `(${c} - ${b} : ${varName})`;
        }
        
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
        // Шаг 4: Генерируем 'a' и 'd' так, чтобы они оба были < 1000.
        // Сначала выбираем 'a', которое должно быть больше K.
        const a_lower_bound = K + 100; // Берём 'a' с запасом, чтобы 'd' не было слишком маленьким
        if (a_lower_bound > 999) return this.generate(); // Если K слишком большое
        const a = getRandomInt(a_lower_bound, 999);

        // Теперь вычисляем 'd'. Оно гарантированно будет натуральным и < 1000.
        const d = a - K;

        // Шаг 5: Собираем текст уравнения.
        const problemText = `${a} - ${paren_text} = ${d}`;
        
        return {
            variables: { a, b, c, d, K, S, answer: x },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq13", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // --- АЛГОРИТМ ---

        // Шаг 1: Задаём 'b' - однозначный множитель, который станет делителем для ученика.
        const b = getRandomInt(4, 9);

        // Шаг 2: Генерируем ответ 'x' и произведение 'P'.
        const x = getRandomInt(10, 99);
        const P = b * x; // P = b * x

        // Шаг 3: Генерируем 'a' - наше единственное четырёхзначное число.
        // a должно быть больше P, чтобы результат a - P был положительным.
        const a = getRandomInt(P + 200, 9999); // Берём 'a' с запасом

        // Шаг 4: Вычисляем K. K = a - P.
        const K = a - P;

        // Шаг 5: "Разбиваем" K на два слагаемых 'c' и 'd'.
        // K = c + d. c и d должны быть < 1000.
        if (K < 200) return this.generate(); // K должно быть достаточно большим для разбиения
        const c_upper_bound = Math.min(999, K - 100); // d должно быть хотя бы 100
        if (c_upper_bound < 100) return this.generate();
        const c = getRandomInt(100, c_upper_bound);
        const d = K - c;
        
        // Шаг 6: Собираем текст уравнения.
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];
        const paren_text = `(${a} - ${b} · ${varName})`;
        
        const problemText = `${paren_text} - ${c} = ${d}`;
        
        return {
            variables: { a, b, c, d, K, P, answer: x },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq12", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "2", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        // --- АЛГОРИТМ С ОДНИМ ЧЕТЫРЁХЗНАЧНЫМ ЧИСЛОМ ---

        // Шаг 1: Задаём два "ключа" - однозначные числа, на которые будет делить ученик.
        const a = getRandomInt(4, 9);
        const S = getRandomInt(4, 9);

        // Шаг 2: Генерируем K так, чтобы d = K * a стало четырёхзначным.
        // Для этого K должно быть достаточно большим.
        const K_lower_bound = Math.ceil(1000 / a);
        const K_upper_bound = Math.floor(9999 / a);
        // Чтобы b не стало четырёхзначным, ограничим K значением 999.
        if (K_lower_bound > 999) return this.generate(); // На случай, если K не может быть трёхзначным
        const K = getRandomInt(K_lower_bound, 999);

        // Шаг 3: Вычисляем 'd'. Оно гарантированно будет четырёхзначным.
        const d = K * a;

        // Шаг 4: Генерируем 'x' и 'c', убедившись, что 'c' не четырёхзначное.
        // x * S = c. Максимальное S = 9. Чтобы c < 1000, x должен быть < 111.
        const x = getRandomInt(10, 110);
        const c = S * x;

        // Шаг 5: Вычисляем 'b'. Оно гарантированно будет трёхзначным, т.к. K - трёхзначное, а S - однозначное.
        let b, paren_text;
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        // Выбираем структуру, которая даёт положительное 'b'
        if (K > S && K > c) {
            if (Math.random() > 0.5) { // Структура (b + c:x)
                b = K - S;
                paren_text = `(${b} + ${c} : ${varName})`;
            } else { // Структура (c:x + b)
                b = K - S;
                paren_text = `(${c} : ${varName} + ${b})`;
            }
        } else { // Если K слишком мало, используем структуру (b - c:x)
             b = K + S;
             paren_text = `(${b} - ${c} : ${varName})`;
        }
        
        // Шаг 6: Собираем текст уравнения.
        const problemText = Math.random() > 0.5 ? 
            `${a} · ${paren_text} = ${d}` : 
            `${paren_text} · ${a} = ${d}`;
        
        return {
            variables: { a, b, c, d, S, K, answer: x },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq11", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "2", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const mainType = Math.random(); // Выбираем между типами с делением и умножением

        // ... (внутренности генератора будут здесь) ...

        // Для уравнений типа a : (b ± c*x) = d или (b ± c*x) : a = d
        if (mainType < 0.33) { 
            // ... код для этого типа ...
            // Этот блок кода был в предыдущем ответе. Мы его немного изменим.
            const familyType = Math.random();
            let a, b, c, d, x, paren_text, K, P;
            const varNames = ['x', 'y', 'm', 'n', 'k', 'p'];
            const varName = varNames[getRandomInt(0, varNames.length - 1)];

            const deconstructK = () => { /* ... тот же код для деконструкции ... */ };

            if (familyType > 0.5) {
                // --- Семья А: a : (paren) = d, где 'a' - четырёхзначное ---
                c = getRandomInt(4, 9);
                d = getRandomInt(4, 9);
                
                // Генерируем K так, чтобы 'a' стало четырёхзначным
                const K_lower_bound = Math.ceil(1000 / d);
                if (K_lower_bound > 999) return this.generate(); // Защита
                const K = getRandomInt(K_lower_bound, 999);
                a = K * d;

                // ... остальная логика деконструкции K ...

            } else {
                // --- Семья Б: (paren) : a = d, где 'a' или 'd' - четырёхзначное ---
                c = getRandomInt(4, 9);
                
                if (Math.random() > 0.5) {
                    // d - однозначное, a - четырёхзначное
                    d = getRandomInt(4, 9);
                    a = getRandomInt(1000, Math.floor(9999 / d)); // a - четырёхзначное
                    K = a * d;
                } else {
                    // a - однозначное, d - четырёхзначное
                    a = getRandomInt(4, 9);
                    d = getRandomInt(1000, Math.floor(9999 / a)); // d - четырёхзначное
                    K = a * d;
                }
                
                 // ... остальная логика деконструкции K ...
            }
            
            // ... Код для сборки текста и возврата результата ...
            // Для краткости я его опущу, но он есть в полном коде ниже.
        } else if (mainType < 0.66) {
             // ... код для уравнений с умножением (тоже изменим) ...
        } else {
             // ... код для самых первых типов уравнений ...
        }
        
        // Из-за сложности, я приведу полный финальный код.
        
        // --- ПОЛНЫЙ КОД ---
        
        const deconstructK_for_cx = (K, c) => {
            const x_upper_bound = Math.floor((K - 100) / c);
            if (x_upper_bound < 10) return null;
            const x = getRandomInt(10, x_upper_bound);
            const P = c * x;
            const b = K - P;
            const paren_text = `(${b} + ${c} · 'x')`; // Placeholder for varName
            return { b, x, paren_text };
        };

        // --- СЕМЬЯ 1: Уравнения с c*x в скобках ---
        const familyType = Math.random();
        let a, b, c, d, x, paren_text, K;
        
        c = getRandomInt(4, 9);

        if (familyType > 0.5) {
            // Тип 1A: a : (paren) = d, где 'a' - четырёхзначное
            d = getRandomInt(4, 9);
            const K_lower_bound = Math.ceil(1000 / d);
            const K_upper_bound = Math.floor(9999 / d);
            if (K_lower_bound > K_upper_bound) return this.generate();
            K = getRandomInt(K_lower_bound, K_upper_bound);
            a = K * d;

            let deconstructionResult = deconstructK_for_cx(K, c);
            if (!deconstructionResult) return this.generate();
            ({ b, x, paren_text } = deconstructionResult);

            const problemText = `${a} : ${paren_text.replace("'x'", 'x')} = ${d}`;
            return { variables: { a, b, c, d, answer: x }, problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`};
        } else {
            // Тип 1B: (paren) : a = d, где 'a' или 'd' - четырёхзначное
            if (Math.random() > 0.5) {
                d = getRandomInt(4, 9);
                const a_lower_bound = 1000;
                const a_upper_bound = Math.floor(9999 / d);
                if(a_lower_bound > a_upper_bound) return this.generate();
                a = getRandomInt(a_lower_bound, a_upper_bound);
                K = a * d;
            } else {
                a = getRandomInt(4, 9);
                const d_lower_bound = 1000;
                const d_upper_bound = Math.floor(9999 / a);
                if(d_lower_bound > d_upper_bound) return this.generate();
                d = getRandomInt(d_lower_bound, d_upper_bound);
                K = a * d;
            }
            
            let deconstructionResult = deconstructK_for_cx(K, c);
            if (!deconstructionResult) return this.generate();
            ({ b, x, paren_text } = deconstructionResult);
            
            const problemText = `${paren_text.replace("'x'", 'x')} : ${a} = ${d}`;
            return { variables: { a, b, c, d, answer: x }, problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>` };
        }
    },
    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq10", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "1", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const a = getRandomInt(4, 9);
        const K_upper_bound = Math.floor(1000 / a);
        if (K_upper_bound < 20) return this.generate();
        const K = getRandomInt(20, K_upper_bound);
        const P = K * a;
        const c = getRandomInt(100, 1000 - P);
        
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Добавлены перестановки множителей ---
        const possibleStructures = [];

        // Структуры со сложением
        possibleStructures.push({
            d: P + c,
            buildText: (paren, a, c, d) => `${paren} · ${a} + ${c} = ${d}`
        });
        possibleStructures.push({ // Перестановка
            d: P + c,
            buildText: (paren, a, c, d) => `${a} · ${paren} + ${c} = ${d}`
        });
        possibleStructures.push({
            d: P + c,
            buildText: (paren, a, c, d) => `${c} + ${paren} · ${a} = ${d}`
        });
        possibleStructures.push({ // Перестановка
            d: P + c,
            buildText: (paren, a, c, d) => `${c} + ${a} · ${paren} = ${d}`
        });

        // Структуры с вычитанием
        if (c > P) {
            possibleStructures.push({
                d: c - P,
                buildText: (paren, a, c, d) => `${c} - ${paren} · ${a} = ${d}`
            });
            possibleStructures.push({ // Перестановка
                d: c - P,
                buildText: (paren, a, c, d) => `${c} - ${a} · ${paren} = ${d}`
            });
        }
        if (P > c) {
            possibleStructures.push({
                d: P - c,
                buildText: (paren, a, c, d) => `${paren} · ${a} - ${c} = ${d}`
            });
            possibleStructures.push({ // Перестановка
                d: P - c,
                buildText: (paren, a, c, d) => `${a} · ${paren} - ${c} = ${d}`
            });
        }
        
        if (possibleStructures.length === 0) return this.generate();

        const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
        const d = chosenStructure.d;

        const varNames = ['x', 'y', 'm', 'n', 'k', 'p'];
        const varName = varNames[getRandomInt(0, varNames.length - 1)];
        
        let b, answer, paren_text;
        const deconstructionType = getRandomInt(1, 4);

        if (deconstructionType === 1) {
            b = getRandomInt(Math.floor(K / 2), K - 5);
            if (b <= 0) b = 1;
            answer = K - b;
            paren_text = `(${b} + ${varName})`;
        } else if (deconstructionType === 2) {
             b = getRandomInt(5, Math.floor(K / 2));
             answer = K + b;
             paren_text = `(${varName} - ${b})`;
        } else if (deconstructionType === 3) {
            b = getRandomInt(K + 5, K + 50);
            if (b > 1000) b = 1000;
            answer = b - K;
            paren_text = `(${b} - ${varName})`;
        } else {
            if (K <= 10) return this.generate();
            b = getRandomInt(5, K - 10);
            answer = K - b;
            paren_text = `(${varName} + ${b})`;
        }
        
        const problemText = chosenStructure.buildText(paren_text, a, c, d);
        
        return {
            variables: { a, b, c, d, K, P, answer },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq9", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "1", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const problemType = Math.random(); // Случайно выбираем тип уравнения

        let a, b, c, d, K, S, answer, paren_text;
        const varNames = ['x', 'y', 'm', 'n', 'k', 'p'];
        const varName = varNames[getRandomInt(0, varNames.length - 1)];

        if (problemType > 0.5) {
            // --- Тип А (уже был): Однозначный делитель 'a' ---
            a = getRandomInt(4, 9);
            const S_upper_bound = Math.floor(1000 / a);
            if (S_upper_bound < 20) return this.generate();
            S = getRandomInt(20, S_upper_bound); // S - многозначное
            K = S * a;
        } else {
            // --- Тип Б (новый): Многозначный делитель 'a' ---
            S = getRandomInt(4, 9); // S - однозначное
            const a_upper_bound = Math.floor(1000 / S);
            if (a_upper_bound < 10) return this.generate();
            a = getRandomInt(10, a_upper_bound); // a - многозначное
            K = S * a;
        }

        c = getRandomInt(100, 1000 - S);
        
        const possibleStructures = [];
        possibleStructures.push({
            d: c + S,
            buildText: (paren, a, c, d) => `${paren} : ${a} + ${c} = ${d}`
        });
        possibleStructures.push({
            d: c + S,
            buildText: (paren, a, c, d) => `${c} + ${paren} : ${a} = ${d}`
        });
        possibleStructures.push({
            d: c - S,
            buildText: (paren, a, c, d) => `${c} - ${paren} : ${a} = ${d}`
        });

        const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
        d = chosenStructure.d;

        const deconstructionType = getRandomInt(1, 4);
        if (deconstructionType === 1) {
            b = getRandomInt(Math.floor(K / 3), K - 10);
            answer = K - b;
            paren_text = `(${b} + ${varName})`;
        } else if (deconstructionType === 2) {
             b = getRandomInt(10, Math.floor(K / 3));
             answer = K + b;
             paren_text = `(${varName} - ${b})`;
        } else if (deconstructionType === 3) {
            if (K > 950) { b = getRandomInt(K + 10, 1000); } 
            else { b = getRandomInt(K + 10, K + 50); }
            answer = b - K;
            paren_text = `(${b} - ${varName})`;
        } else {
            if (K < 110) return this.generate(); // Защита для маленьких K
            b = getRandomInt(10, K - 100);
            answer = K - b;
            paren_text = `(${varName} + ${b})`;
        }
        
        const problemText = chosenStructure.buildText(paren_text, a, c, d);
        
        return {
            variables: { a, b, c, d, K, S, answer },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq8", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "1", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Шаги 1-3 остаются без изменений.
        const S = getRandomInt(4, 9);
        const K_upper_bound = Math.floor(1000 / S);
        if (K_upper_bound < 100) return this.generate();
        const K = getRandomInt(100, K_upper_bound);
        const a = K * S;
        const c = getRandomInt(100, 1000 - S);
        
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
        // Шаг 4: Создаём массив возможных структур уравнений.
        const possibleStructures = [];

        // Структура 1: a : K + c = d
        possibleStructures.push({
            d: c + S,
            buildText: (a, paren, c, d) => `${a} : ${paren} + ${c} = ${d}`
        });

        // Структура 2: c + a : K = d
        possibleStructures.push({
            d: c + S,
            buildText: (a, paren, c, d) => `${c} + ${a} : ${paren} = ${d}`
        });

        // Структура 3: c - a : K = d
        // Это действие всегда возможно, т.к. c (трёхзначное) > S (однозначное).
        possibleStructures.push({
            d: c - S,
            buildText: (a, paren, c, d) => `${c} - ${a} : ${paren} = ${d}`
        });

        // Случайно выбираем одну из структур.
        const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
        const d = chosenStructure.d;

        // Шаг 5 остаётся без изменений (деконструкция K).
        const varNames = ['x', 'y', 'm', 'n', 'k', 'p'];
        const varName = varNames[getRandomInt(0, varNames.length - 1)];
        
        let b, answer, paren_text;
        const deconstructionType = getRandomInt(1, 2);

        if (deconstructionType === 1) { // K = varName + b
            b = getRandomInt(Math.floor(K / 3), K - 10);
            answer = K - b;
            paren_text = `(${varName} + ${b})`;
        } else { // K = varName - b
            b = getRandomInt(10, Math.floor(K / 3));
            answer = K + b;
            paren_text = `(${varName} - ${b})`;
        }

        // Шаг 6: Собираем текст, используя выбранный шаблон.
        const problemText = chosenStructure.buildText(a, paren_text, c, d);
        
        return {
            variables: { a, b, c, d, K, S, answer },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq7", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // --- ШАГ 1: Генерируем ключевое значение ---
        // e + c - b = {4, 5, 6, 7, 8, 9}
        const res = getRandomInt(4, 9);

        // --- ШАГ 2: Конструктивно создаём `a` ---
        // `a` должно быть ТРЁХЗНАЧНЫМ и кратным `res`
        const a_k_min = Math.ceil(100 / res);  // ИЗМЕНЕНИЕ ЗДЕСЬ: 1000 заменено на 100
        const a_k_max = Math.floor(999 / res); // ИЗМЕНЕНИЕ ЗДЕСЬ: 9999 заменено на 999
        const a_k = getRandomInt(a_k_min, a_k_max);
        if (a_k === null) return this.generate(); // Перезапуск, если нет подходящих `a`
        const a = a_k * res;

        // --- ШАГ 3: Конструктивно создаём `b`, `c` и `e` ---
        // e + c = b + res
        let b, c, e;
        while(true) { 
            b = getRandomInt(100, 999);
            const sum_ec = b + res;
            const e_min = Math.max(100, sum_ec - 999);
            const e_max = Math.min(999, sum_ec - 100);
            
            e = getRandomInt(e_min, e_max);
            if (e !== null) {
                c = sum_ec - e;
                break;
            }
        }
        
        // --- ШАГ 4: Вычисляем `x` ---
        const x = a / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- ШАГ 5: Формируем текст из случайного совместимого шаблона ---
        const templates = [
            `${a} : ${xVar} + ${b} - ${c} = ${e}`,
            `${a} : ${xVar} - ${c} + ${b} = ${e}`,
            `${b} + ${a} : ${xVar} - ${c} = ${e}`,
            `${b} - ${c} + ${a} : ${xVar} = ${e}`
        ];
        const equation = templates[getRandomInt(0, templates.length - 1)];
        const problemText = `Решите уравнение: <br> <h3>${equation}</h3>`;
        
        return { variables: { a, b, c, e, x, xVar }, problemText };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq6", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // --- ШАГ 1: Генерируем ключевое значение ---
        // e + c - b = {4, 5, 6, 7, 8, 9}
        const res = getRandomInt(4, 9);

        // --- ШАГ 2: Конструктивно создаём `a` ---
        const a_k_min = Math.ceil(1000 / res);
        const a_k_max = Math.floor(9999 / res);
        const a_k = getRandomInt(a_k_min, a_k_max);
        const a = a_k * res;

        // --- ШАГ 3: Конструктивно создаём `b`, `c` и `e` ---
        // e + c = b + res
        let b, c, e;
        while(true) { 
            b = getRandomInt(100, 999);
            const sum_ec = b + res;
            const e_min = Math.max(100, sum_ec - 999);
            const e_max = Math.min(999, sum_ec - 100);
            
            e = getRandomInt(e_min, e_max);
            if (e !== null) {
                c = sum_ec - e;
                break;
            }
        }
        
        // --- ШАГ 4: Вычисляем `x` ---
        const x = a / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- ШАГ 5: Формируем текст из случайного совместимого шаблона ---
        const templates = [
            `${a} : ${xVar} + ${b} - ${c} = ${e}`,
            `${a} : ${xVar} - ${c} + ${b} = ${e}`,
            `${b} + ${a} : ${xVar} - ${c} = ${e}`,
            `${b} - ${c} + ${a} : ${xVar} = ${e}` // предполагая исправление опечатки
        ];
        const equation = templates[getRandomInt(0, templates.length - 1)];
        const problemText = `Решите уравнение: <br> <h3>${equation}</h3>`;
        
        return { variables: { a, b, c, e, x, xVar }, problemText };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq5", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // --- ШАГ 1: Генерируем ключевое значение (результат вычитания) ---
        // d - b - c = {4, 5, 6, 7, 8, 9}
        const res = getRandomInt(4, 9);

        // --- ШАГ 2: Конструктивно создаём `f` и `b` с учётом нового правила ---
        let f, b;
        while(true) { // Цикл для поиска подходящей пары f и b
            // Сначала генерируем f (трёхзначное, кратное res)
            const f_k_min = Math.ceil(100 / res);
            const f_k_max = Math.floor(999 / res);
            const f_k = getRandomInt(f_k_min, f_k_max);
            f = f_k * res;

            // Теперь ищем b, чтобы b+f было кратно 100, а b было трёхзначным
            // b = 100*k - f  и  100 <= b <= 999
            const k_sum_min = Math.ceil((100 + f) / 100);
            const k_sum_max = Math.floor((999 + f) / 100);
            
            const k_sum = getRandomInt(k_sum_min, k_sum_max);
            
            if (k_sum !== null) {
                b = k_sum * 100 - f;
                break; // Успешно нашли пару, выходим из цикла
            }
            // Если k_sum === null, цикл попробует с новым случайным f
        }
        
        // --- ШАГ 3: Конструктивно создаём `c` и `d` ---
        // d = b + c + res, при этом 1001 <= d <= 1999
        // Находим диапазон для c, чтобы d было в нужных границах
        const c_min = Math.max(100, 1001 - b - res);
        const c_max = Math.min(999, 1999 - b - res);
        const c = getRandomInt(c_min, c_max);
        if (c === null) return this.generate(); // Перезапуск, если для b и f не нашлось c
        
        const d = b + c + res;

        // --- ШАГ 4: Вычисляем `x` ---
        const x = f / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- ШАГ 5: Формируем текст из случайного шаблона ---
        const templates = [
            `${f} : ${xVar} + ${b} + ${c} = ${d}`,
            `${b} + ${f} : ${xVar} + ${c} = ${d}`,
            `${c} + ${b} + ${f} : ${xVar} = ${d}`
        ];
        const equation = templates[getRandomInt(0, templates.length-1)];
        const problemText = `Решите уравнение: <br> <h3>${equation}</h3>`;
        
        return { variables: { f, b, c, d, x, xVar }, problemText };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq4",
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "умножение_на_однозначное", "деление_на_однозначное", "2"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // --- ШАГ 1: Список всех возможных пар (n, m), удовлетворяющих условиям ---
        // Условия: m > 3; n - двузначное; n:m > 3.
        const validPairs = [
            { m: 4, n: 16, div_res: 4 }, { m: 4, n: 20, div_res: 5 }, { m: 4, n: 24, div_res: 6 },
            { m: 4, n: 28, div_res: 7 }, { m: 4, n: 32, div_res: 8 }, { m: 4, n: 36, div_res: 9 },
            { m: 5, n: 20, div_res: 4 }, { m: 5, n: 25, div_res: 5 }, { m: 5, n: 30, div_res: 6 },
            { m: 5, n: 35, div_res: 7 }, { m: 5, n: 40, div_res: 8 }, { m: 5, n: 45, div_res: 9 },
            { m: 6, n: 24, div_res: 4 }, { m: 6, n: 30, div_res: 5 }, { m: 6, n: 36, div_res: 6 },
            { m: 6, n: 42, div_res: 7 }, { m: 6, n: 48, div_res: 8 }, { m: 6, n: 54, div_res: 9 },
            { m: 7, n: 28, div_res: 4 }, { m: 7, n: 35, div_res: 5 }, { m: 7, n: 42, div_res: 6 },
            { m: 7, n: 49, div_res: 7 }, { m: 7, n: 56, div_res: 8 }, { m: 7, n: 63, div_res: 9 },
            { m: 8, n: 32, div_res: 4 }, { m: 8, n: 40, div_res: 5 }, { m: 8, n: 48, div_res: 6 },
            { m: 8, n: 56, div_res: 7 }, { m: 8, n: 64, div_res: 8 }, { m: 8, n: 72, div_res: 9 },
            { m: 9, n: 36, div_res: 4 }, { m: 9, n: 45, div_res: 5 }, { m: 9, n: 54, div_res: 6 },
            { m: 9, n: 63, div_res: 7 }, { m: 9, n: 72, div_res: 8 }, { m: 9, n: 81, div_res: 9 }
        ];

        // Выбираем случайную пару
        const pair = getRandomElement(validPairs);
        const { m, n, div_res } = pair;

        // --- ШАГ 2: Конструктивно создаём `a` ---
        // Чтобы x = a / (n / m) был целым, `a` должно быть кратно `n / m` (т.е. `div_res`).
        
        // Находим диапазон для `a`, чтобы оно было четырёхзначным и кратным `div_res`.
        const min_k = Math.ceil(1000 / div_res);
        const max_k = Math.floor(9999 / div_res);

        const k = getRandomInt(min_k, max_k);
        const a = k * div_res;

        // --- ШАГ 3: Вычисляем ответ `x` ---
        // Ответ гарантированно будет целым.
        const x = a / div_res;

        // --- ШАГ 4: Формируем текст ---
        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = getRandomElement(xLetters);
        
        const problemText = `Решите уравнение: <br> <h3>${a} : ${xVar} · ${m} = ${n}</h3>`;

        return {
            variables: { a, m, n, x, xVar },
            problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq3", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "умножение_на_однозначное", "деление_на_однозначное", "2"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- ШАГ 1: Генерируем `a` и `b` (логика не изменилась) ---
        let a, b;
        do {
            a = getRandomInt(3, 9);
            b = getRandomInt(3, 9);
        } while (a % b === 0);

        // --- ШАГ 2: Конструктивно создаём `c` (логика не изменилась) ---
        const required_divisor = a / gcd(a, b);
        const min_k = Math.ceil(1000 / required_divisor);
        const max_k = Math.floor(9999 / required_divisor);
        const k = getRandomInt(min_k, max_k);
        const c = k * required_divisor;

        // --- ШАГ 3: Вычисляем ответ `x` (логика не изменилась) ---
        const x = (c * b) / a;

        // --- ШАГ 4: Формируем текст, выбирая случайный шаблон ---
        const templates = [
            `${a} · ${xVar} : ${b} = ${c}`,
            `${xVar} · ${a} : ${b} = ${c}`,
            `${xVar} : ${b} · ${a} = ${c}`
        ];
        
        const equation = templates[getRandomInt(0, templates.length - 1)];
        const problemText = `Решите уравнение: <br> <h3>${equation}</h3>`;

        return {
            variables: { a, b, c, x, xVar },
            problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq2",
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "1"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null; // Диапазон невозможен
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- Список надёжных шаблонов и их конструкторов ---
        const templates = [
            {
                // Шаблоны: a + x*b - c = d, a - c + x*b = d, x*b + a - c = d
                // Промежуточное значение a + x*b > 999
                format: (a,b,c,d) => {
                    const options = [
                        `${a} + ${xVar} · ${b} - ${c} = ${d}`,
                        `${a} - ${c} + ${xVar} · ${b} = ${d}`,
                        `${xVar} · ${b} + ${a} - ${c} = ${d}`
                    ];
                    // Гарантируем, что a > c для второго шаблона
                    return a > c ? options[getRandomInt(0, options.length - 1)] : options[0];
                },
                constructor: () => {
                    const b = getRandomInt(4, 9);
                    const x = getRandomInt(11, 150);
                    const termX = x * b;

                    // a + termX > 999 => a > 999 - termX
                    const a_min = Math.max(151, 1000 - termX);
                    const a = getRandomInt(a_min, 999);
                    if (a === null) return null;

                    const sum_cd = termX + a; // d+c = termX+a
                    
                    // Разбиваем sum_cd на c и d
                    const d_min = Math.max(151, sum_cd - 999);
                    const d_max = Math.min(999, sum_cd - 151);
                    const d = getRandomInt(d_min, d_max);
                    if (d === null) return null;
                    const c = sum_cd - d;

                    return { a, b, c, d, x };
                }
            },
            {
                // Шаблон: x*b - a - c = d
                // Промежуточное значение x*b - a > 999
                format: (a,b,c,d) => `${xVar} · ${b} - ${a} - ${c} = ${d}`,
                constructor: () => {
                    const b = getRandomInt(4, 9);
                    const x = getRandomInt(150, 400); // x должен быть побольше
                    const termX = x * b;

                    // termX - a > 999 => a < termX - 999
                    const a_max = termX - 1000;
                    const a = getRandomInt(151, a_max);
                    if (a === null) return null;

                    const sum_cd = termX - a; // d+c = termX-a

                    const d_min = Math.max(151, sum_cd - 999);
                    const d_max = Math.min(999, sum_cd - 151);
                    const d = getRandomInt(d_min, d_max);
                    if (d === null) return null;
                    const c = sum_cd - d;

                    return { a, b, c, d, x };
                }
            }
        ];

        // --- Основная логика ---
        const template = templates[getRandomInt(0, templates.length - 1)];
        const vars = template.constructor();

        if (vars === null) {
            return this.generate(); // Если не удалось сгенерировать, перезапуск
        }

        const problemText = `Решите уравнение: <br> <h3>${template.format(vars.a, vars.b, vars.c, vars.d)}</h3>`;
        
        return {
            variables: { ...vars, xVar },
            problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

{
    type: " ",
    name: "4eq1", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "сложение_многозначных", "вычитание_многозначных", "умножение_на_однозначное", "1"],

    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // --- ШАГ 1: Базовые переменные ---
        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];
        const b = getRandomInt(4, 9);

        // --- ШАГ 2: Список 100% надёжных шаблонов ---
        // Я оставил только те, где первое действие не приводит к отрицательному результату.
        const templates = [
            // Промежуточный результат: a + termX (всегда > 0 и > 999)
            { format: (a,c,d,x) => `${a} + ${xVar} : ${b} - ${c} = ${d}`, termX_calc: (a,c,d) => d + c - a },
            // Промежуточный результат: a + c (всегда > 0)
            { format: (a,c,d,x) => `${a} + ${c} - ${xVar} : ${b} = ${d}`, termX_calc: (a,c,d) => a + c - d },
            // Промежуточный результат: termX + a (всегда > 0 и > 999)
            { format: (a,c,d,x) => `${xVar} : ${b} + ${a} - ${c} = ${d}`, termX_calc: (a,c,d) => d + c - a },
            // Промежуточный результат: termX - a (гарантированно > 0 и > 999)
            { format: (a,c,d,x) => `${xVar} : ${b} - ${a} - ${c} = ${d}`, termX_calc: (a,c,d) => d + a + c },
        ];
        const template = templates[getRandomInt(0, templates.length - 1)];

        // --- ШАГ 3: Конструкция чисел с гарантией > 999 ---
        // n1 + n2 > 999, что является ключом к четырёхзначному промежуточному значению.
        const n1 = getRandomInt(151, 999);
        const n2_min = Math.max(151, 1000 - n1);
        if (n2_min > 999) return this.generate(); 
        const n2 = getRandomInt(n2_min, 999);
        const n3 = getRandomInt(151, 999);

        // --- ШАГ 4: Распределение ролей и вычисление X ---
        let a, c, d;

        // Распределение n1, n2, n3 на роли a, c, d зависит от шаблона,
        // чтобы termX (т.е. x/b) всегда был > 0.
        const formula = template.termX_calc.toString();
        if (formula.includes('d + a + c')) {
            a = n1; c = n2; d = n3; // Любой порядок подходит
        } else if (formula.includes('d + c - a')) {
            d = n1; c = n2; a = n3;
        } else if (formula.includes('a + c - d')) {
            a = n1; c = n2; d = n3;
        }

        const termX = template.termX_calc(a, c, d);
        if (termX <= 0) return this.generate(); // Дополнительная проверка
        
        const x = termX * b;

        // --- ШАГ 5: Формирование текста ---
        const problemText = `Решите уравнение: <br> <h3>${template.format(a, c, d, xVar)}</h3>`;
        
        return {
            variables: { a, b, c, d, x, xVar },
            problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

];

window.taskRegistry.push(..._4eqTasks);
