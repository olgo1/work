const _4eqTasks = [

// Уравнения без скобок. Деление и умножение на однозначное

{
    type: " ",
    name: "4eq7", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let a, b, c, e, res;

        // Конструктивный цикл для подбора всех чисел без рекурсии
        while(true) {
            // ШАГ 1: Генерируем ключевое значение
            res = getRandomInt(4, 9);

            // ШАГ 2: Конструктивно создаём `a`
            const a_k_min = Math.ceil(100 / res);
            const a_k_max = Math.floor(999 / res);
            const a_k = getRandomInt(a_k_min, a_k_max);
            // Эта проверка не обязательна, т.к. диапазон всегда корректен, но оставлена для надежности
            if (a_k === null) continue; 
            a = a_k * res;

            // ШАГ 3: Конструктивно создаём `b`, `c` и `e`
            b = getRandomInt(100, 999);
            const sum_ec = b + res;
            const e_min = Math.max(100, sum_ec - 999);
            const e_max = Math.min(999, sum_ec - 100);
            
            e = getRandomInt(e_min, e_max);
            
            // Если удалось найти `e`, значит, нашли всю комбинацию
            if (e !== null) {
                c = sum_ec - e;
                break; // Выходим из цикла
            }
            // Если `e` не нашлось, цикл начнется заново с новыми `res` и `a`.
        }
        
        // ШАГ 4: Вычисляем `x`
        const x = a / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[Math.floor(Math.random() * xLetters.length)];

        // ШАГ 5: Формируем текст из случайного совместимого шаблона
        const templates = [
            `${a} : ${xVar} + ${b} - ${c} = ${e}`,
            `${a} : ${xVar} - ${c} + ${b} = ${e}`,
            `${b} + ${a} : ${xVar} - ${c} = ${e}`,
            `${b} - ${c} + ${a} : ${xVar} = ${e}`
        ];
        const equation = templates[getRandomInt(0, templates.length - 1)];
        
        return { 
            variables: { a, b, c, e, x, xVar }, 
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
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

        let a, b, c, e, res;

        // Конструктивный цикл для подбора всех чисел без рекурсии
        while(true) {
            // ШАГ 1: Генерируем ключевое значение
            res = getRandomInt(4, 9);

            // ШАГ 2: Конструктивно создаём `a` (четырёхзначное)
            const a_k_min = Math.ceil(1000 / res);
            const a_k_max = Math.floor(9999 / res);
            const a_k = getRandomInt(a_k_min, a_k_max);
            if (a_k === null) continue; 
            a = a_k * res;

            // ШАГ 3: Конструктивно создаём `b`, `c` и `e`
            b = getRandomInt(100, 999);
            const sum_ec = b + res;
            const e_min = Math.max(100, sum_ec - 999);
            const e_max = Math.min(999, sum_ec - 100);
            
            e = getRandomInt(e_min, e_max);
            
            // Если удалось найти `e`, значит, нашли всю комбинацию
            if (e !== null) {
                c = sum_ec - e;
                break; // Выходим из цикла
            }
        }
        
        // ШАГ 4: Вычисляем `x`
        const x = a / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[Math.floor(Math.random() * xLetters.length)];

        // ШАГ 5: Формируем текст из случайного совместимого шаблона
        const templates = [
            `${a} : ${xVar} + ${b} - ${c} = ${e}`,
            `${a} : ${xVar} - ${c} + ${b} = ${e}`,
            `${b} + ${a} : ${xVar} - ${c} = ${e}`,
            `${b} - ${c} + ${a} : ${xVar} = ${e}`
        ];
        const equation = templates[getRandomInt(0, templates.length - 1)];
        
        return { 
            variables: { a, b, c, e, x, xVar }, 
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
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

        let f, b, c, d, res;

        // Основной конструктивный цикл для подбора всех чисел без рекурсии
        while(true) {
            // ШАГ 1: Генерируем ключевое значение
            res = getRandomInt(4, 9);

            // ШАГ 2: Конструктивно создаём `f` (трёхзначное, кратное res)
            const f_k_min = Math.ceil(100 / res);
            const f_k_max = Math.floor(999 / res);
            const f_k = getRandomInt(f_k_min, f_k_max);
            if (f_k === null) continue;
            f = f_k * res;

            // ШАГ 3: Ищем `b`, чтобы b+f было кратно 100, а b было трёхзначным
            const k_sum_min = Math.ceil((100 + f) / 100);
            const k_sum_max = Math.floor((999 + f) / 100);
            const k_sum = getRandomInt(k_sum_min, k_sum_max);
            if (k_sum === null) continue;
            b = k_sum * 100 - f;

            // ШАГ 4: Конструктивно создаём `c`
            const c_min = Math.max(100, 1001 - b - res);
            const c_max = Math.min(999, 1999 - b - res);
            c = getRandomInt(c_min, c_max);
            
            // Если удалось найти `c`, значит вся комбинация верна
            if (c !== null) {
                d = b + c + res;
                break; // Выходим из цикла
            }
        }
        
        // ШАГ 5: Вычисляем `x`
        const x = f / res;

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // ШАГ 6: Формируем текст из случайного шаблона
        const templates = [
            `${f} : ${xVar} + ${b} + ${c} = ${d}`,
            `${b} + ${f} : ${xVar} + ${c} = ${d}`,
            `${c} + ${b} + ${f} : ${xVar} = ${d}`
        ];
        const equation = templates[getRandomInt(0, templates.length-1)];
        
        return { 
            variables: { f, b, c, d, x, xVar }, 
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
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
        const min_k = Math.ceil(1000 / div_res);
        const max_k = Math.floor(9999 / div_res);

        const k = getRandomInt(min_k, max_k);
        const a = k * div_res;

        // --- ШАГ 3: Вычисляем ответ `x` ---
        const x = a / div_res;

        // --- ШАГ 4: Формируем текст ---
        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = getRandomElement(xLetters);
        
        const equation = `${a} : ${xVar} · ${m} = ${n}`;

        return {
            variables: { a, m, n, x, xVar },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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

        // --- ШАГ 1: Генерируем `a` и `b` ---
        let a, b;
        do {
            a = getRandomInt(3, 9);
            b = getRandomInt(3, 9);
        } while (a % b === 0);

        // --- ШАГ 2: Конструктивно создаём `c` ---
        const required_divisor = a / gcd(a, b);
        const min_k = Math.ceil(1000 / required_divisor);
        const max_k = Math.floor(9999 / required_divisor);
        const k = getRandomInt(min_k, max_k);
        const c = k * required_divisor;

        // --- ШАГ 3: Вычисляем ответ `x` ---
        const x = (c * b) / a;

        // --- ШАГ 4: Формируем текст, выбирая случайный шаблон ---
        const templates = [
            `${a} · ${xVar} : ${b} = ${c}`,
            `${xVar} · ${a} : ${b} = ${c}`,
            `${xVar} : ${b} · ${a} = ${c}`
        ];
        
        const equation = templates[getRandomInt(0, templates.length - 1)];
        
        return {
            variables: { a, b, c, x, xVar },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
    name: "4eq2",
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "1"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        // --- Список шаблонов и их конструкторов ---
        const templates = [
            {
                format: (a,b,c,d) => {
                    const options = [
                        `${a} + ${xVar} · ${b} - ${c} = ${d}`,
                        `${a} - ${c} + ${xVar} · ${b} = ${d}`,
                        `${xVar} · ${b} + ${a} - ${c} = ${d}`
                    ];
                    return a > c ? options[getRandomInt(0, options.length - 1)] : options[getRandomInt(0,1) === 0 ? 0 : 2];
                },
                constructor: () => {
                    const b = getRandomInt(4, 9);
                    const x = getRandomInt(11, 150);
                    const termX = x * b;
                    const a_min = Math.max(151, 1000 - termX);
                    const a = getRandomInt(a_min, 999);
                    if (a === null) return null;
                    const sum_cd = termX + a;
                    const d_min = Math.max(151, sum_cd - 999);
                    const d_max = Math.min(999, sum_cd - 151);
                    const d = getRandomInt(d_min, d_max);
                    if (d === null) return null;
                    const c = sum_cd - d;
                    return { a, b, c, d, x };
                }
            },
            {
                format: (a,b,c,d) => `${xVar} · ${b} - ${a} - ${c} = ${d}`,
                constructor: () => {
                    const b = getRandomInt(4, 9);
                    const x = getRandomInt(150, 400);
                    const termX = x * b;
                    const a_max = termX - 1000;
                    const a = getRandomInt(151, a_max);
                    if (a === null) return null;
                    const sum_cd = termX - a;
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
        let vars;
        while(true) {
            const template = templates[getRandomInt(0, templates.length - 1)];
            vars = template.constructor();
            if (vars !== null) {
                break; // Успешно сгенерировали, выходим
            }
        }
        
        const equation = template.format(vars.a, vars.b, vars.c, vars.d);
        
        return {
            variables: { ...vars, xVar },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const xLetters = ['a', 'b', 'c', 'd', 'x', 'y', 'm', 'n'];
        const b = getRandomInt(4, 9);
        const xVar = xLetters[getRandomInt(0, xLetters.length - 1)];

        const templates = [
            { format: (a,c,d) => `${a} + ${xVar} : ${b} - ${c} = ${d}`, termX_calc: (a,c,d) => d + c - a },
            { format: (a,c,d) => `${a} + ${c} - ${xVar} : ${b} = ${d}`, termX_calc: (a,c,d) => a + c - d },
            { format: (a,c,d) => `${xVar} : ${b} + ${a} - ${c} = ${d}`, termX_calc: (a,c,d) => d + c - a },
            { format: (a,c,d) => `${xVar} : ${b} - ${a} - ${c} = ${d}`, termX_calc: (a,c,d) => d + a + c },
        ];

        let a, c, d, x, equation;

        // Основной конструктивный цикл
        while(true) {
            const template = templates[getRandomInt(0, templates.length - 1)];

            const n1 = getRandomInt(151, 999);
            const n2_min = Math.max(151, 1000 - n1);
            if (n2_min > 999) continue; 
            const n2 = getRandomInt(n2_min, 999);
            const n3 = getRandomInt(151, 999);

            const formula = template.termX_calc.toString();
            if (formula.includes('d + a + c')) {
                a = n1; c = n2; d = n3;
            } else if (formula.includes('d + c - a')) {
                // Гарантируем, что d+c > a
                const sum = n1 + n2;
                const third = n3;
                if (sum <= third) continue;
                d = n1; c = n2; a = n3;
            } else if (formula.includes('a + c - d')) {
                // Гарантируем, что a+c > d
                const sum = n1 + n2;
                const third = n3;
                if (sum <= third) continue;
                a = n1; c = n2; d = n3;
            }

            const termX = template.termX_calc(a, c, d);
            if (termX <= 0) continue; 
            
            x = termX * b;
            equation = template.format(a, c, d);
            break; // Успех, выходим из цикла
        }
        
        return {
            variables: { a, b, c, d, x, xVar },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.x;
    }
},

// Уравнения, в которые включено арифметическое действие. Деление и умножение на однозначное

{
    type: " ",
   name: "4eq17", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "1", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // --- АЛГОРИТМ ---

        // Шаг 1: Задаём 'S' - "секретное" однозначное число для ученика.
        const S = getRandomInt(4, 9);

        // Шаг 2: Генерируем 'b' - наше единственное четырёхзначное число.
        const b = getRandomInt(1000, 9000);
        
        // Шаг 3: Генерируем 'c' (трёхзначное).
        const c = getRandomInt(100, 999 - S); // Ограничиваем, чтобы K не вышло за 9999

        // Шаг 4: Вычисляем K (значение скобки) и x (ответ).
        // Используем разные структуры скобок для разнообразия.
        let K, x, paren_text;
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];
        const parenType = getRandomInt(1, 4);

        if (parenType === 1) { // (b + c)
            K = b + c;
            paren_text = `(${b} + ${c})`;
        } else if (parenType === 2) { // (b - c)
            if (b <= c) return this.generate();
            K = b - c;
            paren_text = `(${b} - ${c})`;
        } else if (parenType === 3) { // (c + b) - для разнообразия записи
            K = c + b;
            paren_text = `(${c} + ${b})`;
        } else { // (b - c), т.к. c-b будет отрицательным
            if (b <= c) return this.generate();
            K = b - c;
            paren_text = `(${b} - ${c})`;
        }
        
        x = K * S;
        if (x > 9999) return this.generate(); // Защита, чтобы ответ не был слишком большим

        // Шаг 5: Генерируем 'a' и 'd' (оба < 1000).
        const a = getRandomInt(100, 999 - S);
        const d = a + S; // Гарантирует, что d - a = S

        // Шаг 6: Собираем текст уравнения, используя разные шаблоны.
        const templates = [
            (a, p, d) => `${a} + ${p} = ${d}`,
            (a, p, d) => `${p} + ${a} = ${d}`,
            (a, p, d) => `${d} - ${a} = ${p}`
        ];
        const chosenTemplate = templates[getRandomInt(0, templates.length - 1)];
        const problem_part = `${varName} : ${paren_text}`;
        const problemText = chosenTemplate(a, problem_part, d);
        
        return {
            variables: { a, b, c, d, S, K, answer: x },
            problemText: `Решите уравнение:<br><div class="problem-expression">${problemText}</div>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

{
    type: " ",
    name: "4eq16", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "2", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, d, x, equation;

        // Основной конструктивный цикл
        while(true) {
            // Шаг 1: Задаём 'S' и на его основе 'a' и 'd'.
            const S = getRandomInt(4, 9);
            a = getRandomInt(100, 999 - S);
            d = a - S;

            const equationType = Math.random();
            let problem_part, b, c;

            // Шаг 2: Генерируем вторую часть уравнения одним из двух способов
            if (equationType > 0.5) {
                // --- Тип А: Цепочка делений (a - b : c : x = d) ---
                c = getRandomInt(4, 9);
                const product_cs = c * S;
                const x_max = Math.floor(999 / product_cs);

                if (x_max < 5) continue; // Неудачная попытка, начинаем цикл заново

                x = getRandomInt(5, x_max);
                b = x * product_cs;
                problem_part = `${b} : ${c} : ${varName}`;
            } else {
                // --- Тип Б: Произведение в делимом (a - b · c : x = d) ---
                x = getRandomInt(10, 100);
                const K = S * x;
                
                let factors = [];
                for (let i = 2; i <= Math.sqrt(K); i++) {
                    if (K % i === 0) {
                        if (i < 100 && K/i < 100) factors.push([i, K / i]);
                    }
                }

                if (factors.length === 0) continue; // Не удалось найти множители, начинаем цикл заново
                
                const pair = factors[getRandomInt(0, factors.length - 1)];
                b = pair[0];
                c = pair[1];
                problem_part = `${b} · ${c} : ${varName}`;
            }

            // Шаг 3: Собираем текст уравнения
            const templates = [
                (a, p, d) => `${a} - ${p} = ${d}`,
                (a, p, d) => `${p} + ${d} = ${a}`
            ];
            equation = templates[getRandomInt(0, templates.length-1)](a, problem_part, d);
            break; // Если всё успешно, выходим из цикла
        }
        
        return {
            variables: { answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

{
    type: " ",
    name: "4eq15", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "1", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, e, x, equation;

        // Основной конструктивный цикл для подбора всех чисел без рекурсии
        while(true) {
            // Шаг 1: Задаём 'e' и 'd'.
            e = getRandomInt(4, 9);
            d = getRandomInt(100, 248);

            // Шаг 2: Генерируем 'S' (промежуточный результат).
            const S_lower_bound = d + 2;
            const S_upper_bound = Math.floor(999 / e);
            const S = getRandomInt(S_lower_bound, S_upper_bound);
            if (S === null) continue;

            // Шаг 3: Вычисляем 'K' (значение скобки).
            const K = S * e;

            // Шаг 4: Деконструируем K на 'x' и 'c'.
            let paren_text_filled;
            const parenType = getRandomInt(1, 4);

            if (parenType === 1 || parenType === 2) { // (x + c) или (c + x)
                if (K < 110) continue;
                c = getRandomInt(100, K - 10);
                x = K - c;
                paren_text_filled = (parenType === 1) ? `(${x} + ${c})` : `(${c} + ${x})`;
            } else if (parenType === 3) { // (x - c)
                c = getRandomInt(100, 800);
                x = K + c;
                if (x > 999) continue;
                paren_text_filled = `(${x} - ${c})`;
            } else { // (c - x)
                if (K > 899) continue;
                c = getRandomInt(K + 1, 999);
                x = c - K;
                paren_text_filled = `(${c} - ${x})`;
            }
            
            // Шаг 5: Находим 'a' и 'b'.
            const sum_ab = S + d;
            const a_lower_bound = d + 1;
            const a_upper_bound = sum_ab - (d + 1); // b должно быть > d
            a = getRandomInt(a_lower_bound, a_upper_bound);
            if (a === null) continue;
            b = sum_ab - a;

            // Шаг 6: Собираем текст уравнения.
            const paren_text_with_var = paren_text_filled.replace(x, varName);
            equation = `${a} + ${b} - ${paren_text_with_var} : ${e} = ${d}`;
            
            break; // Если все успешно, выходим из цикла
        }
        
        return {
            variables: { a, b, c, d, e, answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4eq20", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];
        const k = getRandomInt(1000, 9999);
        const d = getRandomInt(100, k - 100);
        const RHS_value = k - d;
        const RHS_text = `${k} - ${d}`;
        const a = getRandomInt(4, 9);
        const b = getRandomInt(100, RHS_value - 100);
        const P = RHS_value - b;
        if (P % a !== 0) return this.generate();
        const answer = P / a;
        const problemText = `${a} · ${varName} + ${b} = ${RHS_text}`;
        
        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${problemText}<br><br><em>Запишите только число.</em>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

{
    type: " ",
    name: "4eq19", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        // --- Конструктивный подход "от ответа" ---

        let k, c, d, answer, a;
        while (true) {
            // 1. Генерируем ответ и множитель 'a'
            answer = getRandomInt(11, 150);
            a = getRandomInt(4, 9);
            const term_ax = a * answer;

            // 2. Генерируем 'k' так, чтобы k - term_ax было в разумных пределах
            // k - term_ax = c + d. min(c+d)=200, max(c+d)=900.
            const k_min = term_ax + 201;
            const k_max = Math.min(9999, term_ax + 899);
            
            k = getRandomInt(k_min, k_max);
            if (k === null) continue;

            // 3. Вычисляем правую часть и разбиваем ее на слагаемые c и d
            const RHS_value = k - term_ax;
            
            // c и d должны быть в диапазоне [100, 450]
            const c_min = Math.max(100, RHS_value - 450);
            const c_max = Math.min(450, RHS_value - 100);

            c = getRandomInt(c_min, c_max);
            if (c === null) continue;
            
            d = RHS_value - c;
            break; // Если все успешно, выходим из цикла
        }
        
        // 4. Формируем текст
        const RHS_text = `${c} + ${d}`;
        const equation = `${k} - ${a} · ${varName} = ${RHS_text}`;
        
        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

{
    type: " ",
    name: "4eq18", 
    tags: ["4_класс", "уравнение", "без_скобок", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных", "арифм_действие"],
    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];
        let RHS_text, RHS_value;
        
        // --- Генерируем правую часть (RHS) ---
        const typeRHS = getRandomInt(1, 3);
        if (typeRHS === 1) { // c + d
            const c = getRandomInt(100, 450);
            const d = getRandomInt(100, 450);
            RHS_value = c + d;
            RHS_text = `${c} + ${d}`;
        } else if (typeRHS === 2) { // c - d
            const d = getRandomInt(100, 400);
            const c = getRandomInt(d + 100, 999);
            RHS_value = c - d;
            RHS_text = `${c} - ${d}`;
        } else { // c : d
            const d = getRandomInt(4, 9);
            const quotient = getRandomInt(20, 110);
            const c = d * quotient;
            RHS_value = quotient;
            RHS_text = `${c} : ${d}`;
        }

        // --- Генерируем левую часть (LHS) ---
        let LHS_text, answer;
        if (Math.random() > 0.5) {
            // Вариант x * a ± b
            while(true) {
                const a = getRandomInt(4, 9);
                const b = getRandomInt(100, 800);

                // Пробуем сгенерировать уравнение вида: b - x*a = RHS
                if (b > RHS_value) {
                    const P2 = b - RHS_value;
                    if (P2 > 0 && P2 % a === 0) {
                        answer = P2 / a;
                        LHS_text = `${b} - ${varName} · ${a}`;
                        break;
                    }
                }

                // Если не вышло, пробуем: x*a - b = RHS
                const P1 = RHS_value + b;
                if (P1 % a === 0 && P1 / a > 10) {
                    answer = P1 / a;
                    LHS_text = `${varName} · ${a} - ${b}`;
                    break;
                }
            }
        } else {
            // Вариант b - a : x = RHS (этот блок уже был конструктивным)
            const P = getRandomInt(4, 9); 
            answer = getRandomInt(10, 99);
            const a = P * answer;
            const b = RHS_value + P;
            LHS_text = `${b} - ${a} : ${varName}`;
        }

        const equation = `${LHS_text} = ${RHS_text}`;

        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

// Уравнения со скобками. Деление и умножение на однозначное

{
    type: " ",
    name: "4eq14", 
    tags: ["4_класс", "уравнение", "скобки", "переменная_в_одной_части", "деление_на_однозначное", "умножение_на_однозначное", "3", "сложение_многозначных", "вычитание_многозначных"],

    generate: function() {
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, x, equation;

        // Основной конструктивный цикл
        while(true) {
            // Шаг 1: Задаём 'S' - "секретный" результат деления b на x.
            const S = getRandomInt(4, 9);

            // Шаг 2: Генерируем ответ 'x' и из него строим 'b'.
            x = getRandomInt(10, 99);
            b = S * x;

            // Шаг 3: Генерируем 'c' и 'K' (значение скобки).
            c = getRandomInt(100, 600); 
            let K, paren_text;
            const parenType = getRandomInt(1, 3);

            if (parenType === 1) { // (c + b:x)
                K = c + S;
                paren_text = `(${c} + ${b} : ${varName})`;
            } else if (parenType === 2) { // (b:x + c)
                K = S + c;
                paren_text = `(${b} : ${varName} + ${c})`;
            } else { // (c - b:x)
                if (c <= S) continue; // Неудачная попытка, начинаем цикл заново
                K = c - S;
                paren_text = `(${c} - ${b} : ${varName})`;
            }
            
            // Шаг 4: Генерируем 'a' и 'd'.
            const a_lower_bound = K + 100;
            if (a_lower_bound > 999) continue; // Неудачная попытка, начинаем цикл заново
            
            a = getRandomInt(a_lower_bound, 999);
            d = a - K;

            // Шаг 5: Собираем текст уравнения и выходим из цикла.
            equation = `${a} - ${paren_text} = ${d}`;
            break; 
        }
        
        return {
            variables: { answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, x, equation;

        // Основной конструктивный цикл
        while(true) {
            // Шаг 1: Задаём 'b'.
            b = getRandomInt(4, 9);

            // Шаг 2: Генерируем ответ 'x' и произведение 'P'.
            x = getRandomInt(10, 99);
            const P = b * x;

            // Шаг 3: Генерируем 'a'.
            a = getRandomInt(P + 201, 9999); // Берём 'a' с запасом > 200

            // Шаг 4: Вычисляем K. K гарантированно будет > 200.
            const K = a - P;

            // Шаг 5: "Разбиваем" K на 'c' и 'd'.
            const c_upper_bound = Math.min(999, K - 100);
            c = getRandomInt(100, c_upper_bound);
            
            // Если c не удалось подобрать (маловероятно), начинаем заново
            if (c === null) continue;
            
            d = K - c;
            
            // Шаг 6: Собираем текст и выходим из цикла.
            const paren_text = `(${a} - ${b} · ${varName})`;
            equation = `${paren_text} - ${c} = ${d}`;
            break; 
        }
        
        return {
            variables: { answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        // --- АЛГОРИТМ ---

        // Шаг 1: Задаём два "ключа" - однозначные числа.
        const a = getRandomInt(4, 9);
        const S = getRandomInt(4, 9);

        // Шаг 2: Генерируем K так, чтобы d = K * a стало четырёхзначным.
        const K_lower_bound = Math.ceil(1000 / a);
        const K_upper_bound = 999; // Ограничиваем K, чтобы b не стало четырёхзначным
        const K = getRandomInt(K_lower_bound, K_upper_bound);

        // Шаг 3: Вычисляем 'd'. Оно гарантированно будет четырёхзначным.
        const d = K * a;

        // Шаг 4: Генерируем 'x' и 'c', убедившись, что 'c' не четырёхзначное.
        const x = getRandomInt(10, 110);
        const c = S * x;

        // Шаг 5: Вычисляем 'b'. Оно гарантированно будет трёхзначным.
        let b, paren_text;
        
        // Выбираем структуру, которая даёт положительное 'b'
        if (K > S) {
            // Структура (b + c:x) или (c:x + b)
            b = K - S;
            if (Math.random() > 0.5) {
                paren_text = `(${b} + ${c} : ${varName})`;
            } else {
                paren_text = `(${c} : ${varName} + ${b})`;
            }
        } else { // Если K <= S, используем структуру (b - c:x)
            b = K + S;
            paren_text = `(${b} - ${c} : ${varName})`;
        }
        
        // Шаг 6: Собираем текст уравнения.
        const equation = Math.random() > 0.5 ? 
            `${a} · ${paren_text} = ${d}` : 
            `${paren_text} · ${a} = ${d}`;
        
        return {
            variables: { answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, x, equation;

        // Основной конструктивный цикл
        while(true) {
            // Шаг 1: Задаём 'c' и 'd'.
            c = getRandomInt(4, 9);
            d = getRandomInt(4, 9);

            // Шаг 2: Генерируем 'K' (значение скобки).
            const K_lower_bound = Math.ceil(1000 / d);
            const K_upper_bound = Math.floor(9999 / d);
            const K = getRandomInt(K_lower_bound, K_upper_bound);
            if (K === null) continue;

            // Шаг 3: Вычисляем 'a'.
            a = K * d;

            // Шаг 4: Деконструируем K на 'b' и 'x'.
            const x_upper_bound = Math.floor((K - 100) / c);
            if (x_upper_bound < 10) continue;
            
            x = getRandomInt(10, x_upper_bound);
            if (x === null) continue;
            
            const P = c * x;
            b = K - P;

            // Шаг 5: Собираем текст уравнения и выходим из цикла.
            const paren_text = Math.random() > 0.5 ? 
                `(${b} + ${c} · ${varName})` :
                `(${c} · ${varName} + ${b})`;

            equation = `${a} : ${paren_text} = ${d}`;
            break; 
        }
        
        return {
            variables: { answer: x },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, K, P, answer, equation;

        // Основной конструктивный цикл
        while(true) {
            a = getRandomInt(4, 9);
            const K_upper_bound = Math.floor(1000 / a);
            if (K_upper_bound < 20) continue;
            
            K = getRandomInt(20, K_upper_bound);
            P = K * a;
            c = getRandomInt(100, 1000 - P);
            if (c === null) continue;

            const possibleStructures = [];
            // Структуры со сложением
            possibleStructures.push({ d: P + c, buildText: (p, a, c, d) => `${p} · ${a} + ${c} = ${d}` });
            possibleStructures.push({ d: P + c, buildText: (p, a, c, d) => `${a} · ${p} + ${c} = ${d}` });
            possibleStructures.push({ d: P + c, buildText: (p, a, c, d) => `${c} + ${p} · ${a} = ${d}` });
            possibleStructures.push({ d: P + c, buildText: (p, a, c, d) => `${c} + ${a} · ${p} = ${d}` });

            // Структуры с вычитанием
            if (c > P) {
                possibleStructures.push({ d: c - P, buildText: (p, a, c, d) => `${c} - ${p} · ${a} = ${d}` });
                possibleStructures.push({ d: c - P, buildText: (p, a, c, d) => `${c} - ${a} · ${p} = ${d}` });
            }
            if (P > c) {
                possibleStructures.push({ d: P - c, buildText: (p, a, c, d) => `${p} · ${a} - ${c} = ${d}` });
                possibleStructures.push({ d: P - c, buildText: (p, a, c, d) => `${a} · ${p} - ${c} = ${d}` });
            }
            
            const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
            d = chosenStructure.d;
            
            let paren_text;
            const deconstructionType = getRandomInt(1, 4);

            if (deconstructionType === 1) { // (b + x)
                b = getRandomInt(Math.floor(K / 2), K - 5);
                if (b === null || b <= 0) continue;
                answer = K - b;
                paren_text = `(${b} + ${varName})`;
            } else if (deconstructionType === 2) { // (x - b)
                b = getRandomInt(5, Math.floor(K / 2));
                if (b === null) continue;
                answer = K + b;
                paren_text = `(${varName} - ${b})`;
            } else if (deconstructionType === 3) { // (b - x)
                b = getRandomInt(K + 5, K + 50);
                if (b > 1000) b = 1000;
                answer = b - K;
                paren_text = `(${b} - ${varName})`;
            } else { // (x + b)
                if (K <= 10) continue;
                b = getRandomInt(5, K - 10);
                answer = K - b;
                paren_text = `(${varName} + ${b})`;
            }
            
            equation = chosenStructure.buildText(paren_text, a, c, d);
            break; // Успех, выходим из цикла
        }
        
        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, K, S, answer, equation;

        // Основной конструктивный цикл
        while(true) {
            const problemType = Math.random();

            if (problemType > 0.5) {
                // Тип А: Однозначный делитель 'a'
                a = getRandomInt(4, 9);
                const S_upper_bound = Math.floor(1000 / a);
                if (S_upper_bound < 20) continue;
                S = getRandomInt(20, S_upper_bound);
                K = S * a;
            } else {
                // Тип Б: Многозначный делитель 'a'
                S = getRandomInt(4, 9);
                const a_upper_bound = Math.floor(1000 / S);
                if (a_upper_bound < 10) continue;
                a = getRandomInt(10, a_upper_bound);
                K = S * a;
            }

            c = getRandomInt(100, 1000 - S);
            if (c === null) continue;
            
            const possibleStructures = [];
            // Структуры со сложением
            possibleStructures.push({ d: c + S, buildText: (p, a, c, d) => `${p} : ${a} + ${c} = ${d}` });
            possibleStructures.push({ d: c + S, buildText: (p, a, c, d) => `${c} + ${p} : ${a} = ${d}` });
            // Структура с вычитанием (только если возможно)
            if (c > S) {
                possibleStructures.push({ d: c - S, buildText: (p, a, c, d) => `${c} - ${p} : ${a} = ${d}` });
            }
            if(possibleStructures.length === 0) continue;

            const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
            d = chosenStructure.d;

            let paren_text;
            const deconstructionType = getRandomInt(1, 4);

            if (deconstructionType === 1) { // (b + x)
                b = getRandomInt(Math.floor(K / 3), K - 10);
                if (b === null) continue;
                answer = K - b;
                paren_text = `(${b} + ${varName})`;
            } else if (deconstructionType === 2) { // (x - b)
                b = getRandomInt(10, Math.floor(K / 3));
                if (b === null) continue;
                answer = K + b;
                paren_text = `(${varName} - ${b})`;
            } else if (deconstructionType === 3) { // (b - x)
                const b_max = (K > 950) ? 1000 : K + 50;
                b = getRandomInt(K + 10, b_max);
                if (b === null) continue;
                answer = b - K;
                paren_text = `(${b} - ${varName})`;
            } else { // (x + b)
                if (K < 110) continue;
                b = getRandomInt(10, K - 100);
                if (b === null) continue;
                answer = K - b;
                paren_text = `(${varName} + ${b})`;
            }
            
            equation = chosenStructure.buildText(paren_text, a, c, d);
            break; // Успех, выходим из цикла
        }
        
        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
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
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const varName = ['x', 'y', 'm', 'n', 'k', 'p'][getRandomInt(0, 5)];

        let a, b, c, d, K, S, answer, equation;

        // Основной конструктивный цикл
        while(true) {
            S = getRandomInt(4, 9);
            const K_upper_bound = Math.floor(1000 / S);
            if (K_upper_bound < 100) continue; 
            
            K = getRandomInt(100, K_upper_bound);
            a = K * S;
            c = getRandomInt(100, 1000 - S);
            if (c === null) continue;
            
            const possibleStructures = [];
            possibleStructures.push({
                d: c + S,
                buildText: (a, paren, c, d) => `${a} : ${paren} + ${c} = ${d}`
            });
            possibleStructures.push({
                d: c + S,
                buildText: (a, paren, c, d) => `${c} + ${a} : ${paren} = ${d}`
            });
            if (c > S) {
                possibleStructures.push({
                    d: c - S,
                    buildText: (a, paren, c, d) => `${c} - ${a} : ${paren} = ${d}`
                });
            }

            const chosenStructure = possibleStructures[getRandomInt(0, possibleStructures.length - 1)];
            d = chosenStructure.d;

            let paren_text;
            const deconstructionType = getRandomInt(1, 2);
            if (deconstructionType === 1) { // K = x + b
                b = getRandomInt(Math.floor(K / 3), K - 10);
                if (b === null) continue;
                answer = K - b;
                paren_text = `(${varName} + ${b})`;
            } else { // K = x - b
                b = getRandomInt(10, Math.floor(K / 3));
                if (b === null) continue;
                answer = K + b;
                paren_text = `(${varName} - ${b})`;
            }

            equation = chosenStructure.buildText(a, paren_text, c, d);
            break; 
        }
        
        return {
            variables: { answer },
            problemText: `Решите уравнение:<br>${equation}<br><br><em>Запишите только число.</em>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

];

window.taskRegistry.push(..._4eqTasks);
