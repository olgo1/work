const _4eqTasks = [

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
