// "5frac28" - уравнение без скобок. Текстовая задача. К числу прибавили a и получили b
// "5frac27" - уравнение без скобок. Коэффициент при переменной равен 1 или -1
// "5frac26" - упрощение выражения. 4 слагаемых, скобки, несколько переменных.
// "5frac25" - упрощение выражения. Без скобок, отрицательный коэффициент может стоять перед положительным.
// "5frac24" - упрощение выражения. Без скобок, отрицательный коэффициент стоит после положительного.
// "5frac23" - сложение обыкновенных дробей. Четыре дроби, скобки
// "5frac22" - сложение обыкновенных дробей. Три дроби, скобки
// "5frac21" - сложение обыкновенных дробей. Правильные дроби, сократимый результат.
// "5frac20" - сложение обыкновенных дробей. Правильные дроби, несократимый результат.
// "5frac19" - сравнение дробей. Записать какую-нибудь дробь, находящуюся между данными дробями
// "5frac18" - сравнение дробей. Сколько дробей из набора удовлетворяют данному неравенству
// "5frac17" - сравнение дробей. Расположить дроби по порядку, и записать в ответ какую-то из них
// "5frac16" - сравнение дробей. Сколько дробей удовлетворяют двойному неравенству (базовое)
// "5frac15" - сравнение дробей. Текстовая задача
// "5frac14" - приведение к другому знаменателю или числителю. База
// "5frac13" - приведение к другому знаменателю. Сложная формулировка
// "5frac12" - сокращение. Сколько есть правильных/неправильных сократичых дробей с заданным числителем/знаменателем. Сложная! 
// "5frac11" - сокращение. Какую часть составляет одна величина от другой
// "5frac10" - сокращение. Найти, сколько равных дробей среди данных
// "5frac9" - сократить дробь
// "5frac8" - сравнить. Привести к одному знаменателю
// "5frac7" - сравнить. Текстовая задача (дроби ещё нужно составить)
// "5frac6" - выбрать из нескольких дробей те, которые меньше заданного числа
// "5frac5" - привести две дроби к одному числителю
// "5frac4" - найти общий числитель двух дробей
// "5frac3" - сравнить смешанное число и неправильную дробь с разными знаменателями
// "5frac2" - найти общий знаменатель двух дробей
// "5frac1" - привести две дроби к общему знаменателю

{
    type: " ",
    number: "5frac29",
    tags: ["5_класс", "обыкновенные_дроби", "текстовые_задачи", "сложение_и_вычитание_дробей", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Генерируем два знаменателя
            let d1 = getRandomInt(4, 59);
            let d2 = getRandomInt(4, 59);

            if (d1 === d2) continue; // Знаменатели должны быть разными

            let currentGcd = gcd(d1, d2);
            let currentLcm = lcm(d1, d2);

            // Условие: НОД > 3 и НОК < 60
            if (currentGcd <= 3 || currentLcm >= 60) continue;

            // Подбираем правильные несократимые числители
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);

            if (n1 === null || n2 === null) continue;

            // Приводим к общему знаменателю для расчётов "под капотом"
            let v1 = n1 * (currentLcm / d1);
            let v2 = n2 * (currentLcm / d2);

            // Выбираем комбинацию действий:
            // 0: увеличили, увеличили
            // 1: увеличили, уменьшили
            // 2: уменьшили, увеличили
            // 3: уменьшили, уменьшили
            let combo = getRandomInt(0, 3);
            let sign1 = (combo === 0 || combo === 1) ? 1 : -1;
            let sign2 = (combo === 0 || combo === 2) ? 1 : -1;

            // Считаем итоговое изменение (положительное = увеличилось, отрицательное = уменьшилось)
            let delta_v = sign1 * v1 + sign2 * v2;

            // Если число в итоге не изменилось (изменение = 0), ищем другой вариант, 
            // так как вопрос "На сколько..." подразумевает ненулевой ответ.
            if (delta_v === 0) continue; 

            // Нам нужен модуль изменения для ответа
            let abs_delta = Math.abs(delta_v);

            // Защита: итоговое изменение обязательно должно быть правильной дробью (< 1)
            if (abs_delta >= currentLcm) continue;

            // УСЛОВИЕ: Дробь-ответ должна быть сократимой перед вводом
            let resGcd = gcd(abs_delta, currentLcm);
            if (resGcd === 1) continue;

            // Сокращаем дробь для финального ответа
            let finalNum = abs_delta / resGcd;
            let finalDen = currentLcm / resGcd;

            // Формируем текст задачи на основе знаков
            let word1 = sign1 === 1 ? "увеличили" : "уменьшили";
            let word2 = sign2 === 1 ? "увеличили" : "уменьшили";
            let wordResult = delta_v > 0 ? "увеличилось" : "уменьшилось";

            let textStr = `Число сначала ${word1} на $\\frac{${n1}}{${d1}}$, затем ${word2} на $\\frac{${n2}}{${d2}}$. На сколько ${wordResult} число в результате этих двух действий?`;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2
                },
                problemText: `${textStr} Запишите ответ в виде обыкновенной несократимой дроби (через косую черту, например, 3/14).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac28",
    tags: ["5_класс", "обыкновенные_дроби", "текстовые_задачи", "уравнения", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Генерируем два знаменателя
            let d1 = getRandomInt(4, 59);
            let d2 = getRandomInt(4, 59);

            if (d1 === d2) continue; // Знаменатели должны быть разными

            let currentGcd = gcd(d1, d2);
            let currentLcm = lcm(d1, d2);

            // Условие: НОД(d1, d2) > 3 и НОК(d1, d2) < 60
            if (currentGcd <= 3 || currentLcm >= 60) continue;

            // Подбираем правильные несократимые числители
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);

            if (n1 === null || n2 === null) continue;

            // Приводим к общему знаменателю для расчётов "под капотом"
            let v1 = n1 * (currentLcm / d1);
            let v2 = n2 * (currentLcm / d2);

            let tmpl = getRandomInt(0, 3);
            let x_val = 0;
            let textStr = "";

            // Шаблон 0: x + A = B
            if (tmpl === 0) {
                if (v2 <= v1) continue; // B должно быть больше A
                x_val = v2 - v1;
                textStr = `К неизвестному числу прибавили \\(\\frac{${n1}}{${d1}}\\) и получили \\(\\frac{${n2}}{${d2}}\\). Найдите это число.`;
            } 
            // Шаблон 1: A + x = B
            else if (tmpl === 1) {
                if (v2 <= v1) continue; 
                x_val = v2 - v1;
                textStr = `Если к \\(\\frac{${n1}}{${d1}}\\) прибавить неизвестное число, то получится \\(\\frac{${n2}}{${d2}}\\). Найдите это число.`;
            } 
            // Шаблон 2: x - A = B
            else if (tmpl === 2) {
                if (v1 + v2 >= currentLcm) continue; // Ответ должен быть правильной дробью (< 1)
                x_val = v1 + v2;
                textStr = `Из неизвестного числа вычли \\(\\frac{${n1}}{${d1}}\\) и получили \\(\\frac{${n2}}{${d2}}\\). Найдите это число.`;
            } 
            // Шаблон 3: A - x = B
            else if (tmpl === 3) {
                if (v1 <= v2) continue; // A должно быть больше B
                x_val = v1 - v2;
                textStr = `Неизвестное число вычли из \\(\\frac{${n1}}{${d1}}\\) и получили \\(\\frac{${n2}}{${d2}}\\). Найдите это число.`;
            }

            // Защита: итоговое число обязательно должно быть правильной положительной дробью
            if (x_val <= 0 || x_val >= currentLcm) continue;

            // УСЛОВИЕ: Дробь-ответ должна быть сократимой (НОД числителя и знаменателя > 1)
            let x_gcd = gcd(x_val, currentLcm);
            if (x_gcd === 1) continue;

            // Сокращаем дробь для финального ответа
            let finalNum = x_val / x_gcd;
            let finalDen = currentLcm / x_gcd;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2
                },
                problemText: `${textStr} Запишите ответ в виде обыкновенной несократимой дроби (через косую черту, например, 12/25).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac27",
    tags: ["5_класс", "обыкновенные_дроби", "уравнения", "сложение_и_вычитание_дробей", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        const lcm3 = (x, y, z) => lcm(x, lcm(y, z));

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Красивые НОК, ограниченные 60
            const targetLcms = [12, 20, 24, 30, 36, 40, 48, 60];
            const tlcm = targetLcms[getRandomInt(0, targetLcms.length - 1)];

            // Находим все делители выбранного НОК
            let divisors = [];
            for (let i = 2; i <= tlcm; i++) {
                if (tlcm % i === 0) divisors.push(i);
            }
            if (divisors.length < 3) continue;

            // Выбираем 3 уникальных знаменателя (d_A для части с переменной, d_B и d_C для числовой части)
            divisors.sort(() => Math.random() - 0.5);
            let d_A = divisors[0];
            let d_B = divisors[1];
            let d_C = divisors[2];

            // Знаменатели должны быть строго разными
            if (d_A === d_B || d_B === d_C || d_A === d_C) continue;

            // Проверяем фактический НОК трёх чисел (должен быть <= 60)
            let currentLcm = lcm3(d_A, d_B, d_C);
            if (currentLcm > 60) continue;

            // УСЛОВИЕ: НОД хотя бы одной пары знаменателей должен быть > 3
            let maxGcd = Math.max(gcd(d_A, d_B), gcd(d_B, d_C), gcd(d_A, d_C));
            if (maxGcd <= 3) continue;

            // Функция подбора числителя (дробь правильная и несократимая)
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n_A = getValidProperNumerator(d_A);
            let n_B = getValidProperNumerator(d_B);
            let n_C = getValidProperNumerator(d_C);

            if (n_A === null || n_B === null || n_C === null) continue;

            // Приводим к общему знаменателю для расчётов "под капотом"
            let v_A = n_A * (currentLcm / d_A);
            let v_B = n_B * (currentLcm / d_B);
            let v_C = n_C * (currentLcm / d_C);

            // Генерируем правую (числовую) часть: B (+ или -) C
            let op_R = Math.random() < 0.5 ? '+' : '-';
            let R_val = 0;

            if (op_R === '+') {
                R_val = v_B + v_C;
            } else {
                if (v_B <= v_C) continue; // Защита от отрицательных чисел
                R_val = v_B - v_C;
            }

            // Числовая часть должна быть правильной дробью
            if (R_val <= 0 || R_val >= currentLcm) continue;

            // Генерируем левую часть с переменной. Возможные шаблоны:
            // 0: var + A = R
            // 1: A + var = R
            // 2: var - A = R
            // 3: A - var = R
            let templates = [];
            if (R_val > v_A) {
                templates.push(0); 
                templates.push(1); 
            }
            if (R_val + v_A < currentLcm) {
                templates.push(2); 
            }
            if (v_A > R_val) {
                templates.push(3); 
            }

            if (templates.length === 0) continue;
            let tmpl = templates[getRandomInt(0, templates.length - 1)];

            let x_val = 0;
            let exprX = "";
            
            // Пул случайных переменных
            const varsPool = ['x', 'y', 'a', 'b', 'c', 'm', 'n', 'p', 'k'];
            let varName = varsPool[getRandomInt(0, varsPool.length - 1)];

            if (tmpl === 0) {
                x_val = R_val - v_A;
                exprX = `${varName} + \\frac{${n_A}}{${d_A}}`;
            } else if (tmpl === 1) {
                x_val = R_val - v_A;
                exprX = `\\frac{${n_A}}{${d_A}} + ${varName}`;
            } else if (tmpl === 2) {
                x_val = R_val + v_A;
                exprX = `${varName} - \\frac{${n_A}}{${d_A}}`;
            } else if (tmpl === 3) {
                x_val = v_A - R_val;
                exprX = `\\frac{${n_A}}{${d_A}} - ${varName}`;
            }

            // Итоговый корень должен быть правильной дробью
            if (x_val <= 0 || x_val >= currentLcm) continue;

            // УСЛОВИЕ: Дробь-ответ должна быть сократимой (НОД числителя и знаменателя > 1)
            let x_gcd = gcd(x_val, currentLcm);
            if (x_gcd === 1) continue;

            let finalNum = x_val / x_gcd;
            let finalDen = currentLcm / x_gcd;

            let exprNumbers = `\\frac{${n_B}}{${d_B}} ${op_R} \\frac{${n_C}}{${d_C}}`;

            // УСЛОВИЕ: Случайным образом меняем местами левую и правую части уравнения
            let equationStr = Math.random() < 0.5 ? 
                `${exprX} = ${exprNumbers}` : 
                `${exprNumbers} = ${exprX}`;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n_A: n_A, d_A: d_A,
                    n_B: n_B, d_B: d_B,
                    n_C: n_C, d_C: d_C,
                    varName: varName
                },
                problemText: `Решите уравнение: \\[ ${equationStr} \\] Найденный корень при необходимости сократите и запишите в виде обыкновенной дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac26",
    tags: ["5_класс", "обыкновенные_дроби", "буквенные_выражения", "выражения_со_скобками", "приведение_подобных", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        const lcm4 = (a, b, c, d) => lcm(lcm(a, b), lcm(c, d));

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Решаем, сколько будет подобных слагаемых с главной переменной (2 или 3)
            const num_m = Math.random() < 0.5 ? 3 : 2; 

            // Задаем базовые НОК, чтобы знаменатели были красивыми и решаемыми
            const targetLcms = [24, 30, 36, 40, 48, 60];
            const tlcm = targetLcms[getRandomInt(0, targetLcms.length - 1)];

            // Находим делители (потенциальные знаменатели)
            let divisors = [];
            for(let i = 2; i <= tlcm; i++) {
                if (tlcm % i === 0) divisors.push(i);
            }
            if (divisors.length < 3) continue;

            divisors.sort(() => Math.random() - 0.5);
            let d1 = divisors[0];
            let d2 = divisors[1];
            let d3 = divisors[2];

            // Формируем 4 слагаемых (M - главная переменная, O - другие числа/переменные)
            let termDefs = [];
            if (num_m === 3) {
                termDefs.push({den: d1, type: 'M'});
                termDefs.push({den: d1, type: 'M'}); // УСЛОВИЕ: два из трех имеют одинаковый знаменатель
                termDefs.push({den: d2, type: 'M'});
                termDefs.push({den: d3, type: 'O'});
            } else {
                termDefs.push({den: d1, type: 'M'});
                termDefs.push({den: d2, type: 'M'});
                termDefs.push({den: d1, type: 'O'});
                termDefs.push({den: d3, type: 'O'});
            }

            // Проверяем общий НОК (не больше 60)
            let actualLcm = lcm4(termDefs[0].den, termDefs[1].den, termDefs[2].den, termDefs[3].den);
            if (actualLcm > 60) continue;

            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) {
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            for (let t of termDefs) {
                t.num = getValidProperNumerator(t.den);
            }
            if (termDefs.some(t => t.num === null)) continue;

            // Перемешиваем типы слагаемых
            termDefs.sort(() => Math.random() - 0.5);

            // Назначаем переменные
            const varsPool = ['x', 'y', 'a', 'b', 'm', 'n', 'p', 'k'];
            const v1 = varsPool[getRandomInt(0, varsPool.length - 1)];
            let availableVars = varsPool.filter(v => v !== v1);
            const v2 = availableVars[getRandomInt(0, availableVars.length - 1)];

            for (let t of termDefs) {
                if (t.type === 'M') {
                    t.str_suffix = v1;
                } else {
                    // "Другое" слагаемое: либо число (пустота), либо другая переменная
                    t.str_suffix = Math.random() < 0.5 ? '' : v2;
                }
                t.str = `\\frac{${t.num}}{${t.den}}${t.str_suffix}`;
            }

            // Подбираем комбинацию знаков (перебираем все 16 вариантов)
            let validSignsCombos = [];
            for (let mask = 0; mask < 16; mask++) {
                let s = [];
                s[0] = (mask & 1) ? 1 : -1;
                s[1] = (mask & 2) ? 1 : -1;
                s[2] = (mask & 4) ? 1 : -1;
                s[3] = (mask & 8) ? 1 : -1;

                if (s[0] !== 1) continue; // Выражение не начинается с минуса

                // УСЛОВИЕ: Перед первым из подобных слагаемых обязательно +
                let firstMIdx = termDefs.findIndex(t => t.type === 'M');
                if (s[firstMIdx] !== 1) continue; 

                // Считаем итоговую сумму приводимых слагаемых
                let mNumSum = 0;
                let mDenLcm = 1;
                for (let i = 0; i < 4; i++) {
                    if (termDefs[i].type === 'M') mDenLcm = lcm(mDenLcm, termDefs[i].den);
                }

                for (let i = 0; i < 4; i++) {
                    if (termDefs[i].type === 'M') {
                        mNumSum += s[i] * termDefs[i].num * (mDenLcm / termDefs[i].den);
                    }
                }

                // Должна получиться правильная положительная дробь
                if (mNumSum <= 0 || mNumSum >= mDenLcm) continue; 

                let g = gcd(Math.abs(mNumSum), mDenLcm);
                if (g === 1) continue; // Дробь обязательно должна быть сократимой!

                validSignsCombos.push({s, mNumSum, mDenLcm, g});
            }

            if (validSignsCombos.length === 0) continue;

            let chosenCombo = validSignsCombos[getRandomInt(0, validSignsCombos.length - 1)];
            let signs = chosenCombo.s;

            for(let i = 0; i < 4; i++) {
                termDefs[i].sign = signs[i] === 1 ? '+' : '-';
            }

            // УСЛОВИЕ: Все варианты разбиения скобками (перед скобкой всегда +)
            let validRanges = [];
            validRanges.push([0, 1]); // (A+B)+C+D
            validRanges.push([0, 2]); // (A+B+C)+D
            // Открывать скобку можно только перед положительным слагаемым (чтобы не было A + (-B))
            if (signs[1] === 1) { 
                validRanges.push([1, 2]); // A+(B+C)+D
                validRanges.push([1, 3]); // A+(B+C+D)
            }
            if (signs[2] === 1) { 
                validRanges.push([2, 3]); // A+B+(C+D)
            }

            let range = validRanges[getRandomInt(0, validRanges.length - 1)];
            let start = range[0];
            let end = range[1];

            // Собираем строку выражения
            let problemStr = '';
            for (let i = 0; i < 4; i++) {
                let t_str = termDefs[i].str;
                let t_sign = termDefs[i].sign;

                if (i === start) {
                    if (i > 0) {
                        problemStr += ` + \\left( ${t_str}`;
                    } else {
                        problemStr += `\\left( ${t_str}`;
                    }
                } else if (i === end) {
                    problemStr += ` ${t_sign} ${t_str} \\right)`;
                } else if (i > start && i < end) {
                    problemStr += ` ${t_sign} ${t_str}`;
                } else {
                    if (i > 0) {
                        problemStr += ` ${t_sign} ${t_str}`;
                    } else {
                        problemStr += `${t_str}`;
                    }
                }
            }

            // Итоговый ответ
            let finalNum = chosenCombo.mNumSum / chosenCombo.g;
            let finalDen = chosenCombo.mDenLcm / chosenCombo.g;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    v1: v1
                },
                problemText: `Выражение \\( ${problemStr} \\) упростили. На какое число умножается переменная \\( ${v1} \\)? Запишите это число в виде обыкновенной несократимой дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac25",
    tags: ["5_класс", "обыкновенные_дроби", "буквенные_выражения", "упрощение_выражений", "приведение_подобных"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Генерируем знаменатели для коэффициентов при x
            let d1 = getRandomInt(4, 49);
            let d2 = getRandomInt(4, 49);

            if (d1 === d2) continue; // Знаменатели при x должны быть разными

            const currentGcd = gcd(d1, d2);
            const currentLcm = lcm(d1, d2);

            // Условие: НОД(a, b) > 3 и НОК(a, b) < 50
            if (currentGcd <= 3 || currentLcm >= 50) continue;

            // Знаменатель для свободного члена c (совпадает либо с a, либо с b)
            let d3 = Math.random() < 0.5 ? d1 : d2;

            // Подбираем числители, чтобы дроби были правильными и несократимыми
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);
            let n3 = getValidProperNumerator(d3);

            if (n1 === null || n2 === null || n3 === null) continue;

            let val1 = n1 / d1;
            let val2 = n2 / d2;

            // Определяем, будем ли мы складывать или вычитать коэффициенты при x
            let isAddX = Math.random() < 0.5;

            // Исключаем 0x
            if (!isAddX && val1 === val2) continue;

            // Если вычитаем, гарантируем, что вычитаем из большего меньшее
            if (!isAddX && val1 < val2) {
                [n1, n2] = [n2, n1];
                [d1, d2] = [d2, d1];
                // d3 все еще равно одному из них, так что условие не нарушается
            }

            // Вычисляем будущий ответ (коэффициент при x)
            const mult1 = currentLcm / d1;
            const mult2 = currentLcm / d2;
            let resNumUnreduced = isAddX ? (n1 * mult1 + n2 * mult2) : (n1 * mult1 - n2 * mult2);
            
            let resGcd = gcd(resNumUnreduced, currentLcm);
            let finalNum = resNumUnreduced / resGcd;
            let finalDen = currentLcm / resGcd;

            // Пусть итоговый коэффициент при x всегда будет правильной дробью (< 1) и не целым числом
            if (finalNum >= finalDen || finalDen === 1) continue;

            // Собираем 3 слагаемых в массив
            let terms = [
                { sign: '+', str: `\\frac{${n1}}{${d1}}x` },
                { sign: isAddX ? '+' : '-', str: `\\frac{${n2}}{${d2}}x` },
                { sign: Math.random() < 0.5 ? '+' : '-', str: `\\frac{${n3}}{${d3}}` }
            ];

            // Случайным образом перемешиваем слагаемые
            terms.sort(() => Math.random() - 0.5);

            // Гарантируем, что первое слагаемое в выражении имеет знак "+" (чтобы не было ведущего минуса)
            if (terms[0].sign === '-') {
                let posIndex = terms.findIndex(t => t.sign === '+');
                let temp = terms[0];
                terms[0] = terms[posIndex];
                terms[posIndex] = temp;
            }

            // Собираем строку выражения
            let expressionStr = terms[0].str; // первый элемент пишем без знака +
            for (let i = 1; i < 3; i++) {
                expressionStr += ` ${terms[i].sign} ${terms[i].str}`;
            }

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2,
                    n3: n3, d3: d3
                },
                problemText: `Выражение \\( ${expressionStr} \\) упростили. На какое число умножается переменная \\( x \\)? Запишите это число в виде обыкновенной несократимой дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac24",
    tags: ["5_класс", "обыкновенные_дроби", "буквенные_выражения", "упрощение_выражений", "приведение_подобных", "разные_переменные"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const varsPool = ['x', 'y', 'a', 'b', 'm', 'n', 'p', 'k', 'c', 'd'];
            const v1 = varsPool[getRandomInt(0, varsPool.length - 1)];
            
            let v2 = '';
            if (Math.random() < 0.5) {
                let availableVars = varsPool.filter(v => v !== v1);
                v2 = availableVars[getRandomInt(0, availableVars.length - 1)];
            }

            // Генерируем знаменатели для коэффициентов при главной переменной
            let d1 = getRandomInt(4, 49);
            let d2 = getRandomInt(4, 49);

            if (d1 === d2) continue; 

            const currentGcd = gcd(d1, d2);
            const currentLcm = lcm(d1, d2);

            if (currentGcd <= 3 || currentLcm >= 50) continue;

            let d3 = Math.random() < 0.5 ? d1 : d2;

            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);
            let n3 = getValidProperNumerator(d3);

            if (n1 === null || n2 === null || n3 === null) continue;

            let val1 = n1 / d1;
            let val2 = n2 / d2;

            let isAdd = Math.random() < 0.5;

            if (!isAdd && val1 <= val2) {
                [n1, n2] = [n2, n1];
                [d1, d2] = [d2, d1];
            }

            const mult1 = currentLcm / d1;
            const mult2 = currentLcm / d2;
            let resNumUnreduced = isAdd ? (n1 * mult1 + n2 * mult2) : (n1 * mult1 - n2 * mult2);
            
            let resGcd = gcd(resNumUnreduced, currentLcm);
            let finalNum = resNumUnreduced / resGcd;
            let finalDen = currentLcm / resGcd;

            if (finalNum >= finalDen || finalDen === 1) continue;

            // Чтобы легко отслеживать, где какая переменная, добавим свойство type
            let terms = [
                { type: 'main', sign: '+', str: `\\frac{${n1}}{${d1}}${v1}` }, 
                { type: 'main', sign: isAdd ? '+' : '-', str: `\\frac{${n2}}{${d2}}${v1}` }, 
                { type: 'other', sign: Math.random() < 0.5 ? '+' : '-', str: `\\frac{${n3}}{${d3}}${v2}` } 
            ];

            // Случайным образом перемешиваем слагаемые
            terms.sort(() => Math.random() - 0.5);

            // 1. Гарантируем, что ПЕРВОЕ встретившееся слагаемое с главной переменной имеет плюс
            let firstMainIdx = terms.findIndex(t => t.type === 'main');
            let secondMainIdx = terms.findLastIndex(t => t.type === 'main');

            if (terms[firstMainIdx].sign === '-') {
                // Если первая встретившаяся главная переменная с минусом, меняем её местами со второй
                let temp = terms[firstMainIdx];
                terms[firstMainIdx] = terms[secondMainIdx];
                terms[secondMainIdx] = temp;
            }

            // 2. Гарантируем, что всё выражение не начинается с минуса
            if (terms[0].sign === '-') {
                // Если первый элемент с минусом, это 100% 'other' (так как первый 'main' мы уже сделали плюсом).
                // Просто меняем его местами со вторым элементом, который точно будет с плюсом.
                let temp = terms[0];
                terms[0] = terms[1];
                terms[1] = temp;
            }

            let expressionStr = terms[0].str; 
            for (let i = 1; i < 3; i++) {
                expressionStr += ` ${terms[i].sign} ${terms[i].str}`;
            }

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2,
                    n3: n3, d3: d3,
                    v1: v1, v2: v2
                },
                problemText: `Выражение \\( ${expressionStr} \\) упростили. На какое число умножается переменная \\( ${v1} \\)? Запишите это число в виде обыкновенной несократимой дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},


{
    type: " ",
    number: "5frac23",
    tags: ["5_класс", "обыкновенные_дроби", "сложение_и_вычитание_дробей", "разные_знаменатели", "счёт"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        const lcm4 = (a, b, c, d) => lcm(lcm(a, b), lcm(c, d));

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Задаем красивые базовые НОК, чтобы знаменатели были адекватными (2, 3, 4, 5, 6, 10, 12, 15 и т.д.)
            const targetLcms = [20, 24, 30, 36, 40, 48, 60];
            const tlcm = targetLcms[getRandomInt(0, targetLcms.length - 1)];

            // Находим все возможные знаменатели (делители выбранного НОК) больше 1
            let divisors = [];
            for(let i = 2; i <= tlcm; i++) {
                if (tlcm % i === 0) divisors.push(i);
            }
            
            // Если делителей маловато для 4 дробей, пробуем другой НОК
            if (divisors.length < 4) continue;

            // Перемешиваем массив делителей и берем 4 уникальных
            divisors.sort(() => Math.random() - 0.5);
            let [d1, d2, d3, d4] = divisors.slice(0, 4);

            // Фактический НОК этих четырех чисел (гарантированно <= 60)
            let actualLcm = lcm4(d1, d2, d3, d4);
            if (actualLcm > 60) continue; 

            // Подбираем правильные несократимые числители
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);
            let n3 = getValidProperNumerator(d3);
            let n4 = getValidProperNumerator(d4);

            if (n1 === null || n2 === null || n3 === null || n4 === null) continue;

            // Значения числителей после приведения к общему знаменателю (для внутренних расчетов)
            let v1 = n1 * (actualLcm / d1);
            let v2 = n2 * (actualLcm / d2);
            let v3 = n3 * (actualLcm / d3);
            let v4 = n4 * (actualLcm / d4);

            // Случайные знаки
            const signs = ['+', '-'];
            let s1 = signs[getRandomInt(0, 1)];
            let s2 = signs[getRandomInt(0, 1)];
            let s3 = signs[getRandomInt(0, 1)];

            // Функция для математических действий
            let evalOp = (a, op, b) => op === '+' ? a + b : a - b;

            // Выбираем шаблон расстановки скобок (0 - две скобки, 1 и 2 - одна скобка)
            let template = getRandomInt(0, 2);
            let totalNum = 0;
            let problemStr = '';

            if (template === 0) {
                // Шаблон: (A +/- B) +/- (C +/- D)
                let part1 = evalOp(v1, s1, v2);
                let part2 = evalOp(v3, s3, v4);
                
                // Защита от отрицательных чисел и неправильных дробей в промежуточных действиях
                if (part1 <= 0 || part2 <= 0 || part1 >= actualLcm || part2 >= actualLcm) continue; 
                
                totalNum = evalOp(part1, s2, part2);
                problemStr = `\\left( \\frac{${n1}}{${d1}} ${s1} \\frac{${n2}}{${d2}} \\right) ${s2} \\left( \\frac{${n3}}{${d3}} ${s3} \\frac{${n4}}{${d4}} \\right)`;
                
            } else if (template === 1) {
                // Шаблон: A +/- (B +/- C) +/- D
                let inner = evalOp(v2, s2, v3);
                if (inner <= 0 || inner >= actualLcm) continue;
                
                let step2 = evalOp(v1, s1, inner);
                if (step2 <= 0 || step2 >= actualLcm) continue;
                
                totalNum = evalOp(step2, s3, v4);
                problemStr = `\\frac{${n1}}{${d1}} ${s1} \\left( \\frac{${n2}}{${d2}} ${s2} \\frac{${n3}}{${d3}} \\right) ${s3} \\frac{${n4}}{${d4}}`;
                
            } else {
                // Шаблон: A +/- B +/- (C +/- D)
                let inner = evalOp(v3, s3, v4);
                if (inner <= 0 || inner >= actualLcm) continue;
                
                let step2 = evalOp(v1, s1, v2);
                if (step2 <= 0 || step2 >= actualLcm) continue;
                
                totalNum = evalOp(step2, s2, inner);
                problemStr = `\\frac{${n1}}{${d1}} ${s1} \\frac{${n2}}{${d2}} ${s2} \\left( \\frac{${n3}}{${d3}} ${s3} \\frac{${n4}}{${d4}} \\right)`;
            }

            // Итоговый результат должен быть больше 0 и меньше 1 (правильная дробь)
            if (totalNum <= 0 || totalNum >= actualLcm) continue;

            // Проверяем на сократимость. Если НОД = 1, значит дробь уже несократима, выбрасываем!
            let resGcd = gcd(totalNum, actualLcm);
            if (resGcd === 1) continue;

            // Вычисляем финальный (сокращенный) ответ
            let finalNum = totalNum / resGcd;
            let finalDen = actualLcm / resGcd;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2,
                    n3: n3, d3: d3,
                    n4: n4, d4: d4
                },
                problemText: `Вычислите: \\( ${problemStr} \\). Полученный результат обязательно сократите и запишите ответ в виде правильной дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac22",
    tags: ["5_класс", "обыкновенные_дроби", "сложение_и_вычитание_дробей", "разные_знаменатели", "счёт"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        const lcm3 = (x, y, z) => lcm(x, lcm(y, z));

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Генерируем базовые множители a, b, c
            // Один из них вполне может быть равен 1.
            let a = getRandomInt(1, 10);
            let b = getRandomInt(1, 10);
            let c = getRandomInt(1, 10);

            // Формируем знаменатели по схеме ab, bc, ac
            let d1 = a * b;
            let d2 = b * c;
            let d3 = a * c;

            // Знаменатель дроби не может быть меньше 2
            if (d1 < 2 || d2 < 2 || d3 < 2) continue;

            // Знаменатели должны быть разными (чтобы пример имел смысл)
            if (d1 === d2 || d2 === d3 || d1 === d3) continue;

            // Проверяем НОК — строго не больше 60
            let commonLcm = lcm3(d1, d2, d3);
            if (commonLcm > 60) continue;

            // Подбираем числители для ПРАВИЛЬНОЙ несократимой дроби
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);
            let n3 = getValidProperNumerator(d3);

            if (n1 === null || n2 === null || n3 === null) continue;

            // Случайно выбираем знаки: перед скобкой и внутри скобки
            const signs = ['+', '-'];
            let sign1 = signs[getRandomInt(0, 1)]; 
            let sign2 = signs[getRandomInt(0, 1)]; 

            // Приводим все числители к общему знаменателю для внутренних вычислений
            let mult1 = commonLcm / d1;
            let mult2 = commonLcm / d2;
            let mult3 = commonLcm / d3;

            let num1 = n1 * mult1;
            let num2 = n2 * mult2;
            let num3 = n3 * mult3;

            // Считаем то, что внутри скобок
            let innerNum = (sign2 === '+') ? (num2 + num3) : (num2 - num3);

            // Результат внутри скобок должен быть строго больше 0 и меньше 1
            if (innerNum <= 0 || innerNum >= commonLcm) continue;

            // Считаем итоговый результат всего выражения
            let totalNum = (sign1 === '+') ? (num1 + innerNum) : (num1 - innerNum);

            // Итоговый результат должен быть правильной положительной дробью
            if (totalNum <= 0 || totalNum >= commonLcm) continue;

            // Проверяем, можно ли сократить получившуюся в итоге дробь
            let resGcd = gcd(totalNum, commonLcm);

            // УСЛОВИЕ: Дробь ДОЛЖНА БЫТЬ сократимой. Если НОД = 1, ищем новый вариант.
            if (resGcd === 1) continue;

            // Получаем финальные значения для ответа
            let finalNum = totalNum / resGcd;
            let finalDen = commonLcm / resGcd;

            return {
                variables: {
                    ans: `${finalNum}/${finalDen}`,
                    n1: n1, d1: d1,
                    n2: n2, d2: d2,
                    n3: n3, d3: d3,
                    sign1: sign1,
                    sign2: sign2
                },
                problemText: `Вычислите: \\(\\frac{${n1}}{${d1}} ${sign1} \\left( \\frac{${n2}}{${d2}} ${sign2} \\frac{${n3}}{${d3}} \\right)\\). Полученный результат сократите и запишите ответ в виде правильной дроби (через косую черту).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac21",
    tags: ["5_класс", "обыкновенные_дроби", "сложение_и_вычитание_дробей", "правильные_дроби", "сокращение_дробей"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const isAddition = Math.random() < 0.5; // 50% сложение, 50% вычитание

            // Генерируем знаменатели с запасом, чтобы покрыть максимальный НОК = 90
            let d1 = getRandomInt(4, 90);
            let d2 = getRandomInt(4, 90);

            if (d1 === d2) continue;
            
            // Исключаем скучные знаменатели равные 10
            if (d1 === 10 || d2 === 10) continue;

            const currentGcd = gcd(d1, d2);
            const currentLcm = lcm(d1, d2);

            // Жесткие условия по НОД (от 3 до 11) и НОК (от 20 до 90)
            if (currentGcd < 3 || currentGcd > 11) continue;
            if (currentLcm < 20 || currentLcm > 90) continue;

            // Функция для подбора числителя (дробь должна быть правильной и несократимой изначально)
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);

            if (n1 === null || n2 === null) continue;

            let val1 = n1 / d1;
            let val2 = n2 / d2;

            if (val1 === val2 && !isAddition) continue;

            // Для вычитания: из большего вычитаем меньшее
            if (!isAddition && val1 < val2) {
                [n1, n2] = [n2, n1];
                [d1, d2] = [d2, d1];
                [val1, val2] = [val2, val1];
            }

            // Для сложения: результат должен быть строго меньше 1 (правильная дробь)
            if (isAddition && (val1 + val2 >= 1)) continue;

            // Считаем дополнительные множители для приведения к НОЗ
            const mult1 = currentLcm / d1;
            const mult2 = currentLcm / d2;
            
            let resNumUnreduced;
            let sign;
            
            // Считаем числитель результата ДО сокращения
            if (isAddition) {
                resNumUnreduced = n1 * mult1 + n2 * mult2;
                sign = "+";
            } else {
                resNumUnreduced = n1 * mult1 - n2 * mult2;
                sign = "-";
            }
            
            // Проверяем, можно ли сократить получившуюся дробь
            const resGcd = gcd(resNumUnreduced, currentLcm);
            
            // САМОЕ ГЛАВНОЕ УСЛОВИЕ: Если дробь несократима (НОД = 1), выбрасываем этот вариант!
            if (resGcd === 1) continue;

            // Вычисляем итоговые (сокращенные) числитель и знаменатель для проверки ответа
            const finalNum = resNumUnreduced / resGcd;
            const finalDen = currentLcm / resGcd;

            const ansString = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

            return {
                variables: {
                    ans: ansString,
                    n1: n1,
                    d1: d1,
                    n2: n2,
                    d2: d2,
                    sign: sign
                },
                problemText: `Вычислите: \\(\\frac{${n1}}{${d1}} ${sign} \\frac{${n2}}{${d2}}\\). Полученную дробь сократите и запишите ответ в виде правильной несократимой дроби (через косую черту).`
            };
        }
        // Если за 10000 попыток (что маловероятно) не нашли подходящий вариант, пробуем снова
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Очищаем ввод от пробелов
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        // Сверяем с сокращенным ответом
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac20",
    tags: ["5_класс", "обыкновенные_дроби", "сложение_и_вычитание_дробей", "правильные_дроби", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const isAddition = Math.random() < 0.5; // 50% на сложение, 50% на вычитание

            // Генерируем знаменатели в пределах возможного НОК (от 4 до 45)
            let d1 = getRandomInt(4, 45);
            let d2 = getRandomInt(4, 45);

            if (d1 === d2) continue;
            
            // Исключаем скучные знаменатели равные 10
            if (d1 === 10 || d2 === 10) continue;

            const currentGcd = gcd(d1, d2);
            const currentLcm = lcm(d1, d2);

            // Строгие условия по НОД (от 3 до 11) и НОК (от 20 до 90)
            if (currentGcd < 3 || currentGcd > 11) continue;
            if (currentLcm < 20 || currentLcm > 90) continue;

            // Подбираем числители для ПРАВИЛЬНОЙ несократимой дроби
            const getValidProperNumerator = (den) => {
                let valid = [];
                for (let n = 1; n < den; n++) { 
                    if (gcd(n, den) === 1) valid.push(n);
                }
                if (valid.length === 0) return null;
                return valid[getRandomInt(0, valid.length - 1)];
            };

            let n1 = getValidProperNumerator(d1);
            let n2 = getValidProperNumerator(d2);

            if (n1 === null || n2 === null) continue;

            let val1 = n1 / d1;
            let val2 = n2 / d2;

            // При вычитании одинаковые дроби дадут 0, исключаем
            if (val1 === val2 && !isAddition) continue;

            // Если это вычитание, убеждаемся, что из большего вычитаем меньшее
            if (!isAddition && val1 < val2) {
                [n1, n2] = [n2, n1];
                [d1, d2] = [d2, d1];
                [val1, val2] = [val2, val1];
            }

            // ПРОВЕРКА УСЛОВИЯ: При сложении результат должен остаться правильной дробью (< 1)
            if (isAddition && (val1 + val2 >= 1)) continue;

            // Считаем дополнительные множители
            const mult1 = currentLcm / d1;
            const mult2 = currentLcm / d2;
            
            let resNumUnreduced;
            let sign;
            
            // Считаем числитель результата в зависимости от знака
            if (isAddition) {
                resNumUnreduced = n1 * mult1 + n2 * mult2;
                sign = "+";
            } else {
                resNumUnreduced = n1 * mult1 - n2 * mult2;
                sign = "-";
            }
            
            // Обязательно сокращаем итоговую дробь
            const resGcd = gcd(resNumUnreduced, currentLcm);
            const finalNum = resNumUnreduced / resGcd;
            const finalDen = currentLcm / resGcd;

            // Обрабатываю случай, когда в результате получается целое число (но у нас строгая проверка < 1)
            // и избегаю знаменателя 1 в ответе.
            const ansString = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

            return {
                variables: {
                    ans: ansString,
                    n1: n1,
                    d1: d1,
                    n2: n2,
                    d2: d2,
                    sign: sign
                },
                problemText: `Вычислите: $\\frac{${n1}}{${d1}} ${sign} \\frac{${n2}}{${d2}}$. Запишите ответ в виде правильной несократимой дроби (через косую черту, например, 11/16).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac19",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_дробей", "неравенства"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Генерируем знаменатель
        const b = getRandomInt(4, 15);
        
        // Генерируем числитель. Берём до b-2, чтобы и a/b, и (a+1)/b были правильными дробями
        const a = getRandomInt(1, b - 2);

        // Для поля vars.ans сгенерируем один из правильных ответов (как образец, если ребенок сдастся).
        // Самый простой способ найти дробь посередине — умножить числитель и знаменатель на 2.
        const exampleNum = a * 2 + 1;
        const exampleDen = b * 2;

        return {
            variables: {
                ans: `${exampleNum}/${exampleDen}`, // Это просто один из вариантов для показа ответа
                a: a,
                b: b
            },
            problemText: `Напишите какую-нибудь дробь, удовлетворяющую неравенству \\(\\frac{${a}}{${b}} < x < \\frac{${a+1}}{${b}}\\). Запишите ответ в виде обыкновенной дроби (через косую черту).`
        };
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        
        // Очищаем ввод от пробелов
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        
        // Разбиваем ответ по косой черте
        const parts = cleanInput.split('/');
        
        // Если ученик ввел не дробь (нет косой черты или больше одной), то ответ неверный
        if (parts.length !== 2) return false;
        
        const num = parseInt(parts[0], 10);
        const den = parseInt(parts[1], 10);
        
        // Проверяем, что введены корректные числа и знаменатель не равен нулю
        if (isNaN(num) || isNaN(den) || den <= 0) return false;
        
        // Считаем значение введенной учеником дроби
        const val = num / den;
        
        // Считаем границы нашего неравенства
        const lowerBound = vars.a / vars.b;
        const upperBound = (vars.a + 1) / vars.b;
        
        // Математическая проверка: строго больше левой границы и строго меньше правой.
        // Добавлена микроскопическая погрешность (1e-9) для защиты от особенностей деления в JavaScript.
        return val > lowerBound + 1e-9 && val < upperBound - 1e-9;
    }
},

{
    type: " ",
    number: "5frac18",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_дробей", "неравенства"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // Генерируем левую границу неравенства a/b (близко к 1)
            const b = getRandomInt(4, 15);
            const a = getRandomInt(Math.max(1, b - 3), b - 1);
            if (gcd(a, b) !== 1) continue;
            
            const lowerBound = a / b;

            // Будем генерировать 3 или 4 дроби
            const numCandidates = getRandomInt(3, 4);
            let candidates = [];
            let candidateValues = [];
            
            // 1. Сначала генерируем ровно ОДНУ неправильную дробь (ловушку)
            let improperAdded = false;
            let attemptsImp = 0;
            while (!improperAdded && attemptsImp < 100) {
                attemptsImp++;
                const den = getRandomInt(3, 15);
                // Числитель больше знаменателя (но не слишком огромный)
                const num = getRandomInt(den + 1, den + 6); 
                
                if (gcd(num, den) !== 1) continue;

                const val = num / den;
                candidates.push({ text: `\\frac{${num}}{${den}}`, val: val });
                candidateValues.push(val);
                improperAdded = true;
            }

            // 2. Добиваем список правильными дробями
            let attemptsCand = 0;
            while (candidates.length < numCandidates && attemptsCand < 100) {
                attemptsCand++;
                
                const den = getRandomInt(3, 25);
                if (den === b) continue; // Избегаем одинаковых знаменателей с границей
                
                const num = getRandomInt(1, den - 1);
                if (gcd(num, den) !== 1) continue;
                
                const val = num / den;

                // Избегаем дубликатов по значению и равенства границам
                if (candidateValues.some(v => Math.abs(v - val) < 0.001)) continue;
                if (Math.abs(val - lowerBound) < 0.001 || Math.abs(val - 1) < 0.001) continue;

                // Дроби не должны быть слишком далеко от нижней границы
                if (Math.abs(val - lowerBound) > 0.35) continue;

                candidates.push({ text: `\\frac{${num}}{${den}}`, val: val });
                candidateValues.push(val);
            }

            if (candidates.length < numCandidates) continue;

            // Перемешиваем массив, чтобы неправильная дробь не стояла всегда первой
            for (let i = candidates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
            }

            // Считаем количество решений
            let solutionCount = 0;
            for (let cand of candidates) {
                if (cand.val > lowerBound && cand.val < 1) {
                    solutionCount++;
                }
            }

            // Обязательное условие: хотя бы 1 решение должно быть.
            // (Неподходящая дробь у нас уже гарантированно есть — это та самая неправильная)
            if (solutionCount === 0) continue;

            const candidatesText = candidates.map(c => `\\(${c.text}\\)`).join(', ');

            return {
                variables: {
                    ans: solutionCount.toString(),
                    a: a,
                    b: b,
                    debugInfo: candidates.map(c => `${c.text}=${c.val.toFixed(3)}`).join('; ')
                },
                problemText: `Определите, сколько из дробей ${candidatesText} являются решениями неравенства \\(\\frac{${a}}{${b}} < x < 1\\). Запишите в ответ это количество.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac17",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_дробей"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // Выбираем общий делитель для знаменателей (от 2 до 5, как в твоих примерах)
            const k = getRandomInt(2, 5);

            // Доступные множители по твоему правилу
            const availableMultipliers = [2, 3, 4, 5, 6, 7, 8];
            
            // Выбираем 4 случайных уникальных множителя
            let m = [];
            while(m.length < 4) {
                let randM = availableMultipliers[getRandomInt(0, availableMultipliers.length - 1)];
                if (!m.includes(randM)) m.push(randM);
            }
            // Сортируем множители по возрастанию, чтобы d1 < d2 < d3 < d4
            m.sort((a, b) => a - b);
            
            const d = m.map(x => x * k);

            // Подбираем числители. Условие: большему знаменателю -> больший числитель
            let n_candidates = [];
            for (let i = 0; i < 4; i++) {
                let validN = [];
                for (let j = 1; j < d[i]; j++) {
                    // Дробь должна быть несократимой
                    if (gcd(j, d[i]) === 1) validN.push(j);
                }
                n_candidates.push(validN);
            }

            // Каскадный выбор числителей, чтобы обеспечить n1 < n2 < n3 < n4
            let n1 = n_candidates[0][getRandomInt(0, n_candidates[0].length - 1)];
            
            let n2_valid = n_candidates[1].filter(x => x > n1);
            if (n2_valid.length === 0) continue;
            let n2 = n2_valid[getRandomInt(0, n2_valid.length - 1)];
            
            let n3_valid = n_candidates[2].filter(x => x > n2);
            if (n3_valid.length === 0) continue;
            let n3 = n3_valid[getRandomInt(0, n3_valid.length - 1)];
            
            let n4_valid = n_candidates[3].filter(x => x > n3);
            if (n4_valid.length === 0) continue;
            let n4 = n4_valid[getRandomInt(0, n4_valid.length - 1)];

            const fractions = [
                { n: n1, d: d[0], v: n1 / d[0] },
                { n: n2, d: d[1], v: n2 / d[1] },
                { n: n3, d: d[2], v: n3 / d[2] },
                { n: n4, d: d[3], v: n4 / d[3] }
            ];

            // Проверяем, чтобы значения всех дробей были строго уникальными
            const uniqueVals = new Set(fractions.map(f => f.v));
            if (uniqueVals.size < 4) continue;

            // --- ФОРМИРОВАНИЕ ЗАДАНИЯ ---

            // Перемешиваем дроби для вывода в текст, чтобы ученик сам их сортировал
            const displayFractions = [...fractions].sort(() => Math.random() - 0.5);
            const fractionsText = displayFractions.map(f => `\\(\\frac{${f.n}}{${f.d}}\\)`).join(', ');

            // Случайно выбираем направление сортировки
            const isAscending = Math.random() < 0.5;
            const orderText = isAscending ? "возрастания" : "убывания";

            // Случайно выбираем позицию для поиска (индекс от 0 до 3)
            const targetIdx = getRandomInt(0, 3);
            
            // Словарь формулировок позиций
            const phrasings = [
                ["первой слева", "четвертой справа"],
                ["второй слева", "третьей справа"],
                ["третьей слева", "второй справа"],
                ["четвертой слева", "первой справа"]
            ];
            // Выбираем случайную формулировку для целевого индекса
            const phrase = phrasings[targetIdx][getRandomInt(0, 1)];

            // Вычисляем правильный ответ
            const sortedFractions = [...fractions].sort((a, b) => isAscending ? a.v - b.v : b.v - a.v);
            const targetFraction = sortedFractions[targetIdx];
            const ans = `${targetFraction.n}/${targetFraction.d}`;

            return {
                variables: {
                    ans: ans,
                    debugSorted: sortedFractions.map(f => `${f.n}/${f.d}`).join(', ') // Оставил для удобства проверки
                },
                problemText: `Даны дроби: ${fractionsText}. Представьте, что их выписали слева направо в порядке ${orderText}. Какая дробь окажется ${phrase}? Запишите её в ответ в том виде, в каком она дана в условии, разделив числитель и знаменатель знаком /.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac16",
    tags: ["5_класс", "обыкновенные_дроби", "неравенства", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // --- ТВОИ ТРЕБОВАНИЯ К ЗНАМЕНАТЕЛЯМ ---
            const isHardMode = Math.random() > 0.1;

            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            
            let minC = isHardMode ? 2 : 1;
            const c = getRandomInt(minC, 9);

            if (b === c) continue;

            const den1 = a * b;
            const den2 = a * c;

            const isDivisible = (den1 % den2 === 0) || (den2 % den1 === 0);
            if (isHardMode && isDivisible) continue;

            const commonDenom = lcm(den1, den2);
            if (commonDenom < 10 || commonDenom > 99) continue;

            const getValidNumerators = (den) => {
                let valid = [];
                for (let i = 1; i < den; i++) {
                    if (gcd(i, den) === 1) valid.push(i);
                }
                return valid;
            };

            const nums1 = getValidNumerators(den1);
            const nums2 = getValidNumerators(den2);

            if (nums1.length === 0 || nums2.length === 0) continue;

            let num1 = nums1[getRandomInt(0, nums1.length - 1)];
            let num2 = nums2[getRandomInt(0, nums2.length - 1)];

            let val1 = num1 / den1;
            let val2 = num2 / den2;

            if (val1 === val2) continue;

            // --- НОВАЯ ЛОГИКА НЕРАВЕНСТВА ---

            // 1. Упорядочиваем дроби, чтобы первая всегда была меньше второй
            let d1 = den1, d2 = den2, n1 = num1, n2 = num2;
            if (val1 > val2) {
                d1 = den2; d2 = den1;
                n1 = num2; n2 = num1;
            }

            // 2. Формируем центральный знаменатель (кратный НОК, как на твоих скриншотах)
            const k = getRandomInt(1, 4); // Множитель от 1 до 4
            const D = commonDenom * k;

            // 3. Приводим крайние дроби к центральному знаменателю D
            const lowerBound = n1 * (D / d1);
            const upperBound = n2 * (D / d2);

            // 4. Считаем, сколько целых чисел (x) находится строго между ними
            const count = upperBound - lowerBound - 1;

            // 5. Фильтр: пусть ответом будет от 1 до 8 значений (чтобы не было 0 или слишком огромных чисел)
            if (count < 1 || count > 8) continue;

            return {
                variables: {
                    ans: count.toString(),
                    n1: n1, d1: d1,
                    n2: n2, d2: d2,
                    D: D,
                    lower: lowerBound, // Для отладки (левая граница x)
                    upper: upperBound  // Для отладки (правая граница x)
                },
                problemText: `Сколько есть натуральных значений \\(x\\) таких, что \\(\\frac{${n1}}{${d1}} < \\frac{x}{${D}} < \\frac{${n2}}{${d2}}\\)? Запишите в ответ только число.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac15",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_дробей", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        // Увеличили количество попыток, так как фильтр на "близость" (15%) и сумму <= 1 довольно строгий
        while (attempts < 15000) {
            attempts++;

            const isHardMode = Math.random() > 0.1;

            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            
            let minC = isHardMode ? 2 : 1;
            const c = getRandomInt(minC, 9);

            if (b === c) continue;

            const den1 = a * b;
            const den2 = a * c;

            const isDivisible = (den1 % den2 === 0) || (den2 % den1 === 0);
            if (isHardMode && isDivisible) continue;

            const commonDenom = lcm(den1, den2);
            if (commonDenom < 10 || commonDenom > 99) continue;

            const getValidNumerators = (den) => {
                let valid = [];
                for (let i = 1; i < den; i++) {
                    if (gcd(i, den) === 1) valid.push(i);
                }
                return valid;
            };

            const nums1 = getValidNumerators(den1);
            const nums2 = getValidNumerators(den2);

            if (nums1.length === 0 || nums2.length === 0) continue;

            const num1 = nums1[getRandomInt(0, nums1.length - 1)];
            const num2 = nums2[getRandomInt(0, nums2.length - 1)];

            // НОВОЕ УСЛОВИЕ: разные числители
            if (num1 === num2) continue;

            const val1 = num1 / den1;
            const val2 = num2 / den2;

            if (val1 === val2) continue;

            // НОВОЕ УСЛОВИЕ: дроби должны быть близки друг к другу (разница не более 15% от большей)
            const maxVal = Math.max(val1, val2);
            const diff = Math.abs(val1 - val2);
            if (diff > maxVal * 0.15) continue;

            // Теперь у нас 8 вариантов задач (от 0 до 7)
            const taskType = getRandomInt(0, 7);

            // Фильтр реалистичности: сумма частей не должна превышать целое (1)
            // (Все сюжеты, кроме лент и овощей, берутся из одного "целого")
            if ([0, 3, 4, 5, 6, 7].includes(taskType) && (val1 + val2 > 1)) continue;

            const isGreater = Math.random() < 0.5;
            let problemText = "";
            let ans = "";

            if (taskType === 0) {
                // Домашняя работа
                const boys = [{n: "Антон", c: "а"}, {n: "Борис", c: "б"}, {n: "Витя", c: "в"}, {n: "Глеб", c: "г"}];
                const girls = [{n: "Даша", c: "д"}, {n: "Ева", c: "е"}, {n: "Жанна", c: "ж"}, {n: "Зоя", c: "з"}];
                
                const p1 = boys[getRandomInt(0, boys.length - 1)];
                const p2 = girls[getRandomInt(0, girls.length - 1)];
                const word = isGreater ? "больше" : "меньше";

                problemText = `${p1.n} сделал \\(\\frac{${num1}}{${den1}}\\) домашней работы, а ${p2.n} сделала \\(\\frac{${num2}}{${den2}}\\) той же домашней работы. Кто сделал ${word}? Запишите в поле ответа «${p1.c}» (${p1.n}) или «${p2.c}» (${p2.n}).`;
                ans = isGreater ? (val1 > val2 ? p1.c : p2.c) : (val1 < val2 ? p1.c : p2.c);

            } else if (taskType === 1) {
                // Ленты
                const colors = [{n: "красной", c: "к"}, {n: "синей", c: "с"}, {n: "желтой", c: "ж"}, {n: "зеленой", c: "з"}, {n: "белой", c: "б"}];
                const c1 = colors[getRandomInt(0, colors.length - 1)];
                let c2;
                do { c2 = colors[getRandomInt(0, colors.length - 1)]; } while (c1.c === c2.c);

                const word = isGreater ? "длиннее" : "короче";

                problemText = `Длина ${c1.n} ленты \\(\\frac{${num1}}{${den1}}\\) м, а ${c2.n} ленты — \\(\\frac{${num2}}{${den2}}\\) м. Какая из лент ${word}? Запишите в поле ответа «${c1.c}» (${c1.n.slice(0,-2)}я) или «${c2.c}» (${c2.n.slice(0,-2)}я).`;
                ans = isGreater ? (val1 > val2 ? c1.c : c2.c) : (val1 < val2 ? c1.c : c2.c);

            } else if (taskType === 2) {
                // Овощи
                const vegetables = [{n: "картофеля", c: "к"}, {n: "моркови", c: "м"}, {n: "лука", c: "л"}, {n: "свеклы", c: "с"}, {n: "томатов", c: "т"}];
                const v1 = vegetables[getRandomInt(0, vegetables.length - 1)];
                let v2;
                do { v2 = vegetables[getRandomInt(0, vegetables.length - 1)]; } while (v1.c === v2.c);

                const word = isGreater ? "больше" : "меньше";

                problemText = `В магазине \\(\\frac{${num1}}{${den1}}\\) ц ${v1.n} и \\(\\frac{${num2}}{${den2}}\\) ц ${v2.n}. Каких овощей ${word}? Запишите в поле ответа «${v1.c}» (${v1.n}) или «${v2.c}» (${v2.n}).`;
                ans = isGreater ? (val1 > val2 ? v1.c : v2.c) : (val1 < val2 ? v1.c : v2.c);

            } else if (taskType === 3) {
                // Полив
                const word = isGreater ? "больше" : "меньше";
                problemText = `На полив огорода ушло \\(\\frac{${num1}}{${den1}}\\) бочки воды, а на полив газона — \\(\\frac{${num2}}{${den2}}\\) бочки. На что ушло ${word} воды? Запишите в поле ответа «о» (огород) или «г» (газон).`;
                ans = isGreater ? (val1 > val2 ? "о" : "г") : (val1 < val2 ? "о" : "г");

            } else if (taskType === 4) {
                // Память
                const devices = ["флешке", "карте памяти", "жёстком диске"];
                const device = devices[getRandomInt(0, devices.length - 1)];
                const word = isGreater ? "больше" : "меньше";

                problemText = `На ${device} \\(\\frac{${num1}}{${den1}}\\) памяти занимают мультфильмы, а \\(\\frac{${num2}}{${den2}}\\) — сериалы. Что занимает ${word} памяти? Запишите в поле ответа «м» (мультфильмы) или «с» (сериалы).`;
                ans = isGreater ? (val1 > val2 ? "м" : "с") : (val1 < val2 ? "м" : "с");

            } else if (taskType === 5) {
                // Семейный бюджет (заменили отдых на развлечения, чтобы буквы были "о" и "р")
                const word = isGreater ? "больше" : "меньше";
                problemText = `\\(\\frac{${num1}}{${den1}}\\) семейного дохода тратится на одежду, а \\(\\frac{${num2}}{${den2}}\\) — на развлечения. На что тратится ${word} денег? Запишите в поле ответа «о» (одежда) или «р» (развлечения).`;
                ans = isGreater ? (val1 > val2 ? "о" : "р") : (val1 < val2 ? "о" : "р");

            } else if (taskType === 6) {
                // Школьный фонд
                const word = isGreater ? "больше" : "меньше";
                problemText = `\\(\\frac{${num1}}{${den1}}\\) собранной классом суммы потратили на тетради и книги, а \\(\\frac{${num2}}{${den2}}\\) — на подарки. На что потратили ${word} денег? Запишите в поле ответа «т» (тетради) или «п» (подарки).`;
                ans = isGreater ? (val1 > val2 ? "т" : "п") : (val1 < val2 ? "т" : "п");

            } else if (taskType === 7) {
                // Цветочный магазин
                const word = isGreater ? "больше" : "меньше";
                problemText = `В цветочном магазине \\(\\frac{${num1}}{${den1}}\\) всех цветов составляют хризантемы, а \\(\\frac{${num2}}{${den2}}\\) — пионы. Каких цветов в магазине продаётся ${word}? Введите в поле ответа «х» (хризантемы) или «п» (пионы).`;
                ans = isGreater ? (val1 > val2 ? "х" : "п") : (val1 < val2 ? "х" : "п");
            }

            return {
                variables: {
                    ans: ans,
                    frac1: `${num1}/${den1}`,
                    frac2: `${num2}/${den2}`,
                    lcd: commonDenom,
                    type: taskType
                },
                problemText: problemText
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Перевод в нижний регистр справляется с кириллическими 'Х' и 'П'
        const cleanInput = userAnswer.toString().toLowerCase().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac14",
    tags: ["5_класс", "обыкновенные_дроби", "привести_к_другому_знаменателю"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 1000) {
            attempts++;

            // Случайно выбираем один из 3 типов задачи
            const taskType = getRandomInt(0, 2);

            if (taskType === 0) {
                // ТИП 1: Десятичную дробь к новому знаменателю (например, 3,4 к знаменателю 20)
                // Выбираем "удобный" знаменатель для конечной десятичной дроби
                const allowedDenomsForDecimal = [2, 4, 5, 8, 10, 20, 25, 40, 50];
                const b = allowedDenomsForDecimal[getRandomInt(0, allowedDenomsForDecimal.length - 1)];
                
                // Генерируем числитель (чтобы получались числа вроде 3.4, 1.25 и т.д.)
                const a = getRandomInt(1, b * 5); 
                
                // Исходная обыкновенная дробь должна быть несократимой
                if (gcd(a, b) !== 1) continue;
                
                // Переводим в красивую десятичную дробь с запятой
                const decimalVal = a / b;
                if (Number.isInteger(decimalVal)) continue; // Исключаем целые числа
                const decimalStr = decimalVal.toString().replace('.', ','); 

                // Подбираем дополнительный множитель и новый знаменатель
                const k = getRandomInt(2, 10);
                const targetD = b * k;
                const ans = a * k; // Искомый числитель

                return {
                    variables: {
                        ans: ans.toString(),
                        decimal: decimalStr,
                        targetD: targetD
                    },
                    problemText: `Приведите дробь ${decimalStr} к знаменателю ${targetD}. Запишите получившийся числитель.`
                };

            } else if (taskType === 1) {
                // ТИП 2: Обыкновенную дробь к новому знаменателю (например, 2/15 к знаменателю 65... то есть 60, 65 не делится на 15 без остатка :))
                const b = getRandomInt(3, 25);
                const a = getRandomInt(1, b - 1); // Делаем правильную дробь
                
                if (gcd(a, b) !== 1) continue; // Строго несократимая

                const k = getRandomInt(2, 12); // Дополнительный множитель
                const targetD = b * k;
                const ans = a * k; // Искомый числитель

                return {
                    variables: {
                        ans: ans.toString(),
                        a: a,
                        b: b,
                        targetD: targetD
                    },
                    problemText: `Приведите дробь \\(\\frac{${a}}{${b}}\\) к знаменателю ${targetD}. Запишите получившийся числитель.`
                };

            } else if (taskType === 2) {
                // ТИП 3: Обыкновенную дробь к новому числителю (кратность обоим числам)
                const a = getRandomInt(2, 12);
                const b = getRandomInt(2, 15);
                
                if (a === b || gcd(a, b) !== 1) continue; // Несократимая

                // Чтобы новый числитель был кратен и a, и b, он должен быть вида: a * b * k
                const k = getRandomInt(1, 5);
                const targetN = a * b * k; 
                
                // Считаем, на что умножили исходный числитель 'a', чтобы получить 'targetN'
                const multiplier = targetN / a; 
                const targetD = b * multiplier; // Искомый знаменатель
                
                const ans = targetD;

                return {
                    variables: {
                        ans: ans.toString(),
                        a: a,
                        b: b,
                        targetN: targetN
                    },
                    problemText: `Приведите дробь \\(\\frac{${a}}{${b}}\\) к числителю ${targetN}. Запишите получившийся знаменатель.`
                };
            }
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac13",
    tags: ["5_класс", "обыкновенные_дроби", "общий_знаменатель"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 1000) {
            attempts++;

            // Набор хороших, "школьных" знаменателей для формирования долей
            const niceDenominators = [12, 15, 18, 20, 24, 30, 36, 40, 45, 48, 50, 60, 72, 75, 100];
            const targetDenom = niceDenominators[getRandomInt(0, niceDenominators.length - 1)];

            // Ищем все возможные делители этого знаменателя (чтобы исходная дробь хорошо переводилась)
            let possibleB = [];
            for (let i = 2; i < targetDenom; i++) {
                if (targetDenom % i === 0) possibleB.push(i);
            }
            if (possibleB.length === 0) continue;

            const b = possibleB[getRandomInt(0, possibleB.length - 1)];

            // Бросаем кубик на твоё условие: в 10% случаев разрешаем числителю быть равным 1
            const allowNumeratorOne = Math.random() < 0.10;

            let validA = [];
            for (let a = 1; a < b; a++) {
                // Дробь должна быть несократимой
                if (gcd(a, b) === 1) {
                    if (a === 1 && allowNumeratorOne) {
                        validA.push(a);
                    } else if (a > 1 && !allowNumeratorOne) {
                        validA.push(a);
                    }
                }
            }

            // Если при текущем b не нашлось подходящих числителей (например, если b=2, а единицу мы сейчас не хотим), пробуем заново
            if (validA.length === 0) continue;

            const a = validA[getRandomInt(0, validA.length - 1)];

            // Считаем ответ: a/b = x / targetDenom => x = a * (targetDenom / b)
            const multiplier = targetDenom / b;
            const ans = a * multiplier;

            return {
                variables: {
                    ans: ans.toString(),
                    a: a,
                    b: b,
                    targetDenom: targetDenom
                },
                problemText: `Сколько ${targetDenom}-х долей содержится в дроби \\(\\frac{${a}}{${b}}\\)? Запишите в ответ только число.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac12",
    tags: ["5_класс", "обыкновенные_дроби", "сокращение_дробей", "перебор"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 1000) {
            attempts++;

            // Случайно выбираем один из 4 типов задачи
            const taskType = getRandomInt(0, 3);
            
            // Базовое число (числитель или знаменатель в зависимости от задачи)
            const N = getRandomInt(11, 39);

            let count = 0;
            let values = [];

            if (taskType === 0) {
                // 0: Правильная сократимая (знаменатель задан, ищем числитель a < N)
                for (let a = 1; a < N; a++) {
                    if (gcd(a, N) > 1) { count++; values.push(a); }
                }
            } else if (taskType === 1) {
                // 1: Правильная несократимая (знаменатель задан, ищем числитель a < N)
                for (let a = 1; a < N; a++) {
                    if (gcd(a, N) === 1) { count++; values.push(a); }
                }
            } else if (taskType === 2) {
                // 2: Неправильная сократимая (числитель задан, ищем знаменатель b <= N)
                for (let b = 1; b <= N; b++) {
                    if (gcd(N, b) > 1) { count++; values.push(b); }
                }
            } else if (taskType === 3) {
                // 3: Неправильная несократимая (числитель задан, ищем знаменатель b <= N)
                for (let b = 1; b <= N; b++) {
                    if (gcd(N, b) === 1) { count++; values.push(b); }
                }
            }

            // Жесткий фильтр: ответов должно быть от 3 до 12
            if (count >= 3 && count <= 12) {
                let problemText = "";
                
                if (taskType === 0) {
                    problemText = `Сколько существует натуральных значений \\(a\\), при которых дробь \\(\\frac{a}{${N}}\\) является правильной и сократимой?`;
                } else if (taskType === 1) {
                    problemText = `Сколько существует натуральных значений \\(a\\), при которых дробь \\(\\frac{a}{${N}}\\) является правильной и несократимой?`;
                } else if (taskType === 2) {
                    problemText = `Сколько существует натуральных значений \\(b\\), при которых дробь \\(\\frac{${N}}{b}\\) является неправильной и сократимой?`;
                } else if (taskType === 3) {
                    problemText = `Сколько существует натуральных значений \\(b\\), при которых дробь \\(\\frac{${N}}{b}\\) является неправильной и несократимой?`;
                }

                return {
                    variables: {
                        ans: count.toString(),
                        N: N,
                        taskType: taskType,
                        values: values.join(', ') // Шпаргалка для тебя в консоли
                    },
                    problemText: problemText + " Запишите в ответ только число."
                };
            }
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac11,
    tags: ["5_класс", "обыкновенные_дроби", "сокращение_дробей", "единицы_измерения"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        // Словарь величин с короткими обозначениями (избавляемся от склонений)
        const units = [
            { baseShort: "кг", short: "г", d: 1000 },
            { baseShort: "ц", short: "кг", d: 100 },
            { baseShort: "т", short: "кг", d: 1000 },
            
            { baseShort: "км", short: "м", d: 1000 },
            { baseShort: "м", short: "дм", d: 10 },
            { baseShort: "м", short: "см", d: 100 },
            { baseShort: "м", short: "мм", d: 1000 },
            { baseShort: "дм", short: "см", d: 10 },
            { baseShort: "дм", short: "мм", d: 100 },
            
            { baseShort: "ч", short: "мин", d: 60 },
            { baseShort: "мин", short: "с", d: 60 },
            { baseShort: "сут.", short: "ч", d: 24 }
        ];

        // Разрешенные числа, на которые должна сокращаться дробь
        const allowedFactors = [4, 3, 5, 25, 12, 15, 8, 75];

        // Твой строгий фильтр красоты числа для числителя (N)
        const isValidN = (n) => {
            const s = n.toString();
            // Нулей не больше 2
            const zeroCount = (s.match(/0/g) || []).length;
            if (zeroCount > 2) return false;
            
            // Проверка ненулевых цифр
            const nonZeros = s.replace(/0/g, '');
            if (nonZeros.length === 0 || nonZeros.length > 3) return false;
            if (nonZeros.length === 3 && nonZeros[2] !== '5') return false;
            
            return true;
        };

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const u = units[getRandomInt(0, units.length - 1)];
            const X = getRandomInt(1, 9); // Генерируем "от 1 до 9" кг/ч/км
            const D_total = X * u.d; // Общий знаменатель до сокращения

            // Ищем, на какие числа из списка allowedFactors делится наш D_total
            const validGs = allowedFactors.filter(factor => D_total % factor === 0);
            if (validGs.length === 0) continue; // Если ни на одно не делится, берем другие X и единицу

            // Выбираем случайный множитель сокращения из подходящих
            const g = validGs[getRandomInt(0, validGs.length - 1)];
            const b = D_total / g; // Финальный знаменатель после сокращения

            if (b <= 1) continue;

            // Ищем числитель 'a' после сокращения, чтобы a/b была несократимой
            let foundA = null;
            for (let i = 0; i < 20; i++) {
                const tempA = getRandomInt(1, b - 1);
                // a и b должны быть взаимно простыми
                if (gcd(tempA, b) === 1) {
                    const N = tempA * g; // Восстанавливаем число, которое увидит ученик
                    // Проверяем, соответствует ли число твоим строгим правилам красоты
                    if (isValidN(N)) {
                        foundA = tempA;
                        break;
                    }
                }
            }

            if (foundA === null) continue;

            const a = foundA;
            const N = a * g; 

            // Грамматика: "12 г составляют", "21 г составляет"
            const verb = (N % 10 === 1 && N % 100 !== 11) ? "составляет" : "составляют";

            return {
                variables: {
                    ans: `${a}/${b}`,
                    N: N,
                    X: X,
                    factor: g, // Запоминаем, на что сократили (для возможной отладки)
                    baseShort: u.baseShort,
                    short: u.short
                },
                problemText: `Какую часть ${N} ${u.short} ${verb} от ${X} ${u.baseShort}? Запишите ответ в виде несократимой дроби, например, 5/12.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac10",
    tags: ["5_класс", "обыкновенные_дроби", "сокращение"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 1000) {
            attempts++;

            // Случайно решаем, сколько будет равных дробей (2 или 3)
            const numEqual = Math.random() < 0.5 ? 2 : 3;

            // Генерируем базовую несократимую правильную дробь
            let baseA, baseB;
            do {
                baseB = getRandomInt(3, 15);
                baseA = getRandomInt(1, baseB - 1);
            } while (gcd(baseA, baseB) !== 1);

            const baseVal = baseA / baseB;

            // Подбираем уникальные множители для создания равных дробей
            let multipliers = [];
            while (multipliers.length < numEqual) {
                let m = getRandomInt(1, 7); // Множители от 1 до 7 (чтобы числа не были гигантскими)
                if (!multipliers.includes(m)) multipliers.push(m);
            }

            let fractions = [];
            let usedValues = [baseVal]; // Запоминаем значения, чтобы остальные дроби с ними не совпали

            // Создаем равные дроби
            for (let m of multipliers) {
                fractions.push({ num: baseA * m, den: baseB * m });
            }

            // Добиваем массив до 5 случайными дробями с ДРУГИМИ значениями
            while (fractions.length < 5) {
                let otherB = getRandomInt(4, 25);
                let otherA = getRandomInt(1, otherB - 1);
                let val = otherA / otherB;
                
                // Проверяем, чтобы значение новой дроби отличалось от всех уже добавленных
                let isUnique = true;
                for (let v of usedValues) {
                    if (Math.abs(val - v) < 0.0001) {
                        isUnique = false;
                        break;
                    }
                }

                if (isUnique) {
                    usedValues.push(val); // Запоминаем новое уникальное значение
                    fractions.push({ num: otherA, den: otherB });
                }
            }

            // Перемешиваем массив дробей (алгоритм Фишера-Йетса)
            for (let i = fractions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [fractions[i], fractions[j]] = [fractions[j], fractions[i]];
            }

            // Формируем строку с дробями для вывода в текст
            const fractionsText = fractions.map(f => `\\(\\frac{${f.num}}{${f.den}}\\)`).join(', ');

            return {
                variables: {
                    ans: numEqual.toString(),
                    // Можно сохранить исходные данные для дебага или подсказок
                    baseFraction: `${baseA}/${baseB}`,
                    count: numEqual
                },
                problemText: `Даны дроби: ${fractionsText}. Среди них есть несколько равных. Сколько их? Запишите в ответ только число.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac9",
    tags: ["5_класс", "обыкновенные_дроби", "сокращение"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            // Условие: 2 < c < 20
            const c = getRandomInt(3, 19);
            
            // НОД не равен 10 (так как a и b взаимно простые, НОД равен c)
            if (c === 10) continue; 

            // Ограничиваем b, чтобы итоговый знаменатель (c * b) не превышал 450
            const maxB = Math.floor(450 / c);
            
            // Если максимальное b слишком мало, чтобы быть больше a, пропускаем
            if (maxB < 2) continue;

            const a = getRandomInt(1, maxB - 1);
            const b = getRandomInt(a + 1, maxB); 

            // Дробь a/b должна быть несократимой
            if (gcd(a, b) !== 1) continue;

            const num = c * a; // Числитель ca
            const den = c * b; // Знаменатель cb

            // Жесткая проверка по условию
            if (den > 450) continue;
            // Дополнительная страховка НОД (на всякий случай)
            if (gcd(num, den) === 10) continue;

            // Функции для проверки разрядности и кратности
            const is2Digit = (x) => x >= 10 && x <= 99;
            const is3DigitMul10 = (x) => x >= 100 && x <= 450 && (x % 10 === 0);

            // Сначала отсекаем всё, что вообще не попадает в нужные форматы
            if (!(is2Digit(num) || is3DigitMul10(num))) continue;
            if (!(is2Digit(den) || is3DigitMul10(den))) continue;

            // Проверяем строгое условие:
            // "либо оба двузначные, либо одно из них трёхзначное кратное 10"
            const both2D = is2Digit(num) && is2Digit(den);
            const oneIs3D10 = (is2Digit(num) && is3DigitMul10(den)) || (is3DigitMul10(num) && is2Digit(den));

            if (!(both2D || oneIs3D10)) continue;

            return {
                variables: {
                    ans: `${a}/${b}`,
                    num: num,
                    den: den,
                    c: c, 
                    a: a,
                    b: b
                },
                problemText: `Сократите дробь \\(\\frac{${num}}{${den}}\\). Запишите ответ в виде обыкновенной несократимой дроби (через косую черту, например: 1/2).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac8",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 10000) { // Увеличил количество попыток, так как фильтр 15% довольно строгий
            attempts++;

            const findSmaller = Math.random() < 0.5;
            const wantEasyCase = Math.random() < 0.05;

            // Генерируем компоненты для знаменателей
            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            const c = getRandomInt(1, 9);

            if (b === c) continue;

            const den1 = a * b;
            const den2 = a * c;

            // Фильтр по кратности (95% — знаменатели не делятся друг на друга)
            const isDivisible = (den1 % den2 === 0) || (den2 % den1 === 0);
            if (wantEasyCase) {
                if (!isDivisible) continue;
            } else {
                if (isDivisible) continue;
            }

            // Ограничение на НОЗ (строго двузначное число)
            const commonDenom = lcm(den1, den2);
            if (commonDenom < 10 || commonDenom > 99) continue;

            // Подбираем числители
            const getValidNumerator = (den) => {
                for (let k = 0; k < 15; k++) {
                    const n = getRandomInt(1, den - 1);
                    if (gcd(n, den) === 1) return n;
                }
                return null;
            };

            const num1 = getValidNumerator(den1);
            const num2 = getValidNumerator(den2);

            if (num1 === null || num2 === null) continue;

            // Расчет значений для проверки близости (15%)
            const val1 = num1 / den1;
            const val2 = num2 / den2;
            
            if (val1 === val2) continue;

            const maxVal = Math.max(val1, val2);
            const diff = Math.abs(val1 - val2);

            // ПРОВЕРКА УСЛОВИЯ: различие не более 15% от большей дроби
            if (diff > maxVal * 0.15) continue;

            let resultNum, resultDen;
            if (findSmaller) {
                if (val1 < val2) { resultNum = num1; resultDen = den1; }
                else { resultNum = num2; resultDen = den2; }
            } else {
                if (val1 > val2) { resultNum = num1; resultDen = den1; }
                else { resultNum = num2; resultDen = den2; }
            }

            const taskTypeWord = findSmaller ? "меньшую" : "большую";

            return {
                variables: {
                    ans: `${resultNum}/${resultDen}`,
                    n1: num1, d1: den1,
                    n2: num2, d2: den2,
                    type: taskTypeWord
                },
                problemText: `Сравните дроби \\(\\frac{${num1}}{${den1}}\\) и \\(\\frac{${num2}}{${den2}}\\). Запишите в поле ответа **${taskTypeWord}** из них в том виде, в котором она дана в условии.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput === vars.ans;
    }
},

{
    type: " ",
    number: "5frac7",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_чисел", "текстовая_задача"],
    generate: function() {
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        const pluralize = (n, forms) => {
            let mod10 = Math.abs(n) % 10;
            let mod100 = Math.abs(n) % 100;
            if (mod100 > 10 && mod100 < 20) return forms[2];
            if (mod10 > 1 && mod10 < 5) return forms[1];
            if (mod10 === 1) return forms[0];
            return forms[2];
        };

        const isClose = (v1, v2) => {
            const diff = Math.abs(v1 - v2);
            return diff <= v1 * 0.2 && diff <= v2 * 0.2;
        };

        const girls = ["Соня", "Маша", "Аня", "Алиса", "Вика", "Настя", "Полина", "Лиза", "Даша", "Ксюша", "Варя"];
        const boys = ["Саша", "Артём", "Максим", "Миша", "Ваня", "Даня", "Дима", "Кирилл", "Егор", "Матвей"];
        const pies = ["малиновый пирог", "яблочный пирог", "лимонный пирог", "творожный пирог", "клубничный пирог", "черничный пирог", "земляничный пирог", "брусничный пирог"];
        const clothes = ["лонгслив", "толстовка", "худи", "поло", "свитшот", "футболка", "рубашка", "блузка", "шорты", "брюки", "юбка"];
        const workers = ["токарь", "слесарь", "сварщик", "оператор", "электрик", "фрезеровщик", "водитель", "машинист", "монтажник"];

        const pickUniqueNames = (list1, list2) => {
            let n1 = pick(list1);
            let n2 = pick(list2);
            while (n1[0].toUpperCase() === n2[0].toUpperCase()) {
                n1 = pick(list1);
                n2 = pick(list2);
            }
            return [n1, n2];
        };

        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const getValidPairs = (lcmLimit, allowTen = false) => {
            let pairs = [];
            for (let d = 4; d <= 25; d++) {
                if (allowTen && d % 10 !== 0) continue;
                for (let n = 4; n <= 40; n++) {
                    if (allowTen && n % 10 !== 0) continue;
                    if (n === d || n % d === 0 || d % n === 0) continue;
                    if (gcd(n, d) === 1) continue;
                    pairs.push({n: n, d: d});
                }
            }
            return pairs;
        };

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            const type = getRandomInt(1, 9);
            let a, b, c, d, name1, name2, nameMain, text, ans, v1, v2, format;

            // Общий пул для стандартных знаменателей (b, d)
            const pool = getValidPairs(50);

            switch (type) {
                case 1: // Шаги
                    [name1, name2] = pickUniqueNames(girls, boys);
                    const pair1 = pick(pool);
                    b = pair1.d; a = pair1.n; // a шагов, b метров
                    const cand1 = pool.filter(p => p.d !== b && lcm(p.d, b) < 50 && isClose(b/a, p.n/p.d));
                    if (cand1.length === 0) continue;
                    const pair2 = pick(cand1);
                    d = pair2.n; c = pair2.d;
                    v1 = b/a; v2 = d/c;
                    if (v1 < 0.35 || v1 > 0.8 || v2 < 0.35 || v2 > 0.8 || v1 === v2) continue;
                    format = `Напишите ${name1[0]} (если это ${name1}) или ${name2[0]} (если это ${name2}).`;
                    text = `${name1} сделала ${a} ${pluralize(a, ['шаг', 'шага', 'шагов'])} и прошла ${b} ${pluralize(b, ['метра', 'метра', 'метров'])}, а ${name2} сделал ${c} ${pluralize(c, ['шага', 'шага', 'шагов'])} и прошёл ${d} ${pluralize(d, ['метра', 'метра', 'метров'])}. Чей шаг длиннее? ${format}`;
                    ans = v1 > v2 ? name1[0] : name2[0];
                    break;

                case 2: // Пироги
                    [name1, name2] = pickUniqueNames(pies, pies);
                    const pairP = pick(pool);
                    b = pairP.d; d = pairP.n; 
                    if (b < 4 || d < 4) continue;
                    a = getRandomInt(3, 25) * 100;
                    c = getRandomInt(3, 25) * 100;
                    v1 = a/b; v2 = c/d;
                    if (!isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите ${name1[0].toUpperCase()} (если это ${name1}) или ${name2[0].toUpperCase()} (если это ${name2}).`;
                    text = `${name1[0].toUpperCase() + name1.slice(1)} весит ${a} г, и его разделили на ${b} одинаковых кусков. ${name2[0].toUpperCase() + name2.slice(1)} весит ${c} г, его разделили на ${d} одинаковых кусков. Кусок какого пирога весит больше? ${format}`;
                    ans = v1 > v2 ? name1[0].toUpperCase() : name2[0].toUpperCase();
                    break;

                case 3: // Накопления
                    [name1, name2] = pickUniqueNames(girls, boys);
                    const pairS = pool.filter(p => p.d >= 3 && p.d <= 15 && p.n >= 3 && p.n <= 15);
                    if (pairS.length === 0) continue;
                    const ps = pick(pairS);
                    b = ps.d; d = ps.n;
                    a = getRandomInt(4, 19) * 1000;
                    c = getRandomInt(4, 19) * 1000;
                    v1 = a/b; v2 = c/d;
                    if (!isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите ${name2[0]} (если это ${name2}) или ${name1[0]} (если это ${name1}).`;
                    text = `${name2} и ${name1} каждый месяц откладывают некоторую сумму из своих карманных денег. Через ${b} ${pluralize(b, ['месяц', 'месяца', 'месяцев'])} ${name2} накопил ${a} руб., а ${name1} через ${d} ${pluralize(d, ['месяц', 'месяца', 'месяцев'])} — ${c} руб. Кто откладывает больше денег в месяц? ${format}`;
                    ans = v1 > v2 ? name2[0] : name1[0];
                    break;

                case 4: // Фабрика
                    nameMain = pick(["ателье", "фабрика", "швея"]);
                    [name1, name2] = pickUniqueNames(clothes, clothes);
                    const poolF = getValidPairs(150, true);
                    const pf = pick(poolF);
                    b = pf.d; d = pf.n;
                    a = getRandomInt(1, 10) * 10;
                    c = getRandomInt(1, 10) * 10;
                    v1 = a/b; v2 = c/d;
                    if (!isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите ${name2[0].toUpperCase()} (если это ${name2}) или ${name1[0].toUpperCase()} (если это ${name1}).`;
                    text = `${nameMain[0].toUpperCase() + nameMain.slice(1)} продаёт ${name1} и ${name2} по одинаковой цене. При этом пошив ${b} ${pluralize(b, [name1, name1, name1])} стоит ${a} тыс. руб., а пошив ${d} ${pluralize(d, [name2, name2, name2])} — ${c} тыс. руб. Что выгоднее для ${nameMain} — продавать ${name2} или ${name1}? ${format}`;
                    ans = v1 < v2 ? name1[0].toUpperCase() : name2[0].toUpperCase();
                    break;

                case 5: // Задачи
                    [name1, name2] = pickUniqueNames(girls, boys);
                    const pairT = pool.filter(p => p.d >= 4 && p.d <= 20 && p.n >= 4 && p.n <= 20);
                    if (pairT.length === 0) continue;
                    const pt = pick(pairT);
                    b = pt.d; d = pt.n;
                    a = Math.round(b * (3 + Math.random() * 7));
                    c = Math.round(d * (a/b * (0.8 + Math.random() * 0.4)));
                    v1 = a/b; v2 = c/d;
                    if (v1 < 3 || v1 > 10 || v2 < 3 || v2 > 10 || !isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите ${name2[0]} (если это ${name2}) или ${name1[0]} (если это ${name1}).`;
                    text = `${name2} решил ${a} ${pluralize(a, ['задачу', 'задачи', 'задач'])} за ${b} ${pluralize(b, ['день', 'дня', 'дней'])}, а ${name1} — ${c} ${pluralize(c, ['задачу', 'задачи', 'задач'])} за ${d} ${pluralize(d, ['день', 'дня', 'дней'])}. Кто решает меньше задач в день? ${format}`;
                    ans = v1 < v2 ? name2[0] : name1[0];
                    break;

                case 6: // Расход бензина
                    const cars = [
                        {n: "хэтчбек", l: [5, 7]}, {n: "седан", l: [7, 9]}, {n: "кроссовер", l: [8, 11]},
                        {n: "внедорожник", l: [12, 18]}, {n: "пикап", l: [10, 15]}, {n: "минивэн", l: [9, 13]}
                    ];
                    let car1 = pick(cars);
                    let car2 = pick(cars);
                    while (car1.n[0].toUpperCase() === car2.n[0].toUpperCase()) car2 = pick(cars);
                    const pairB = pick(pool);
                    b = pairB.d; d = pairB.n;
                    a = Math.round(b / ((car1.l[0] + Math.random() * (car1.l[1] - car1.l[0])) / 100));
                    c = Math.round(d / ((car2.l[0] + Math.random() * (car2.l[1] - car2.l[0])) / 100));
                    v1 = b/a; v2 = d/c; // л/км
                    if (!isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите ${car1.n[0].toUpperCase()} (если это ${car1.n}) или ${car2.n[0].toUpperCase()} (если это ${car2.n}).`;
                    text = `${car1.n[0].toUpperCase() + car1.n.slice(1)} проехал ${a} км и потратил ${b} л бензина, а ${car2.n} проехал ${c} км и потратил ${d} л бензина. У какого автомобиля расход бензина больше? ${format}`;
                    ans = v1 > v2 ? car1.n[0].toUpperCase() : car2.n[0].toUpperCase();
                    break;

                case 7: // Зарплата
                    nameMain = pick(workers);
                    const pairW = pick(pool);
                    b = pairW.d; d = pairW.n;
                    a = Math.round(b * (0.8 + Math.random() * 0.4));
                    c = Math.round(d * (1.0 + Math.random() * 1.0));
                    v1 = a*1000/b; v2 = c*1000/d;
                    if (v1 < 800 || v1 > 1200 || v2 < 1000 || v2 > 2000 || !isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите С (если посменно) или В (если на вахте).`;
                    text = `${nameMain[0].toUpperCase() + nameMain.slice(1)}, работая посменно, получает ${a} тыс. руб. за ${b} ${pluralize(b, ['час', 'часа', 'часов'])} работы, а работая на вахте — ${c} тыс. за ${d} ${pluralize(d, ['час', 'часа', 'часов'])}. Как выгоднее работать? ${format}`;
                    ans = v1 > v2 ? "С" : "В";
                    break;

                case 8: // Лестницы
                    const pairL = pick(pool);
                    b = pairL.d; d = pairL.n;
                    v1 = 12 + Math.random() * 13;
                    a = Math.round(b * v1);
                    c = Math.round(d * (v1 * (0.9 + Math.random() * 0.2)));
                    v1 = a/b; v2 = c/d;
                    if (v1 < 12 || v1 > 25 || v2 < 12 || v2 > 25 || !isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите П (если первая) или В (если вторая).`;
                    text = `Высота первой лестницы ${a} см, в ней ${b} ${pluralize(b, ['ступень', 'ступени', 'ступеней'])}. Высота второй лестницы ${c} см, в ней ${d} ${pluralize(d, ['ступень', 'ступени', 'ступеней'])}. У какой лестницы расстояние между ступенями больше? ${format}`;
                    ans = v1 > v2 ? "П" : "В";
                    break;

                case 9: // Газоны
                    let side1 = getRandomInt(4, 15);
                    let side2 = getRandomInt(4, 15);
                    let s1 = side1 * side1; let s2 = side2 * side2;
                    if (s1 === s2 || gcd(s1, s2) === 1 || lcm(s1, s2) > 400 || s1 % s2 === 0 || s2 % s1 === 0) continue;
                    v1 = 30 + Math.random() * 20;
                    a = Math.round(s1 * v1);
                    c = Math.round(s2 * (v1 * (0.9 + Math.random() * 0.2)));
                    v1 = a/s1; v2 = c/s2;
                    if (v1 < 30 || v1 > 50 || v2 < 30 || v2 > 50 || !isClose(v1, v2) || v1 === v2) continue;
                    format = `Напишите 1 (если первый участок) или 2 (если второй).`;
                    text = `Два газона квадратной формы (сторона первого — ${side1} м, сторона второго — ${side2} м) засеяли травой. На первый участок купили ${a} г семян, на второй — ${c} г. На каком участке трава посеяна плотнее? ${format}`;
                    ans = v1 > v2 ? "1" : "2";
                    break;
            }

            return {
                variables: { ans: ans, text: text },
                problemText: text
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        let u = userAnswer.toString().trim().toUpperCase();
        return u === vars.ans || u[0] === vars.ans[0];
    }
},

{
    type: " ",
    number: "5frac6",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const shuffle = (array) => array.sort(() => Math.random() - 0.5);

        // Хелпер: вернуть простые множители
        const getPrimeFactors = (num) => {
            const factors = [];
            let d = 2;
            let temp = num;
            while (d * d <= temp) {
                while (temp % d === 0) {
                    factors.push(d);
                    temp /= d;
                }
                d++;
            }
            if (temp > 1) factors.push(temp);
            return factors;
        };

        // --- ГЛАВНОЕ ИЗМЕНЕНИЕ: ГЕНЕРАЦИЯ БЛИЗКОЙ ДРОБИ ---
        const makeCloseFraction = (den, targetVal, maxNumVal = 1000) => {
            // 1. Собираем ВСЕ возможные валидные числители для этого знаменателя
            let validNumerators = [];
            // Ограничение числителя: он должен быть < знаменателя И < maxNumVal
            let limit = Math.min(den, maxNumVal + 1);

            for (let k = 1; k < limit; k++) {
                if (gcd(k, den) === 1) {
                    validNumerators.push(k);
                }
            }

            if (validNumerators.length === 0) return { n: 1, d: den }; // На всякий случай

            // 2. Сортируем их по близости к целевому значению (m/n)
            validNumerators.sort((a, b) => {
                let diffA = Math.abs((a / den) - targetVal);
                let diffB = Math.abs((b / den) - targetVal);
                return diffA - diffB;
            });

            // 3. Берем топ-3 ближайших кандидата (чтобы была вариативность)
            // Если кандидатов мало, берем всех
            let topCount = Math.min(validNumerators.length, 3);
            // Иногда полезно взять и чуть более далекий вариант, чтобы не всегда было "впритык",
            // но в рамках запроса "близка к m/n" топ-3 - оптимально.
            
            let candidates = validNumerators.slice(0, topCount);
            
            // Выбираем случайного из лучших
            let chosenNum = pick(candidates);
            
            return { n: chosenNum, d: den };
        };

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            
            const scenario = Math.random() < 0.5 ? 'I' : 'II';
            
            let n, m;
            let fractionsConfig = []; 

            if (scenario === 'I') {
                // --- ВАРИАНТ I ---
                // n - произведение 2 или 3 простых, n <= 50
                const primes = [2, 3, 5, 7];
                const countPrimes = pick([2, 3]);
                
                let factors = [];
                
                if (countPrimes === 3) {
                    let pPool = [...primes];
                    shuffle(pPool);
                    factors = [pPool[0], pPool[1], pPool[2]];
                    n = factors[0] * factors[1] * factors[2];
                } else {
                    factors = [pick(primes), pick(primes)];
                    n = factors[0] * factors[1];
                }

                if (n > 50) continue; 
                
                // Целевая дробь m/n. Генерируем случайно, но не 1/n (слишком мелко)
                // Для m тоже используем простую логику "не слишком маленькая", например от 0.2 до 0.8
                let minM = Math.ceil(n * 0.2);
                let maxM = Math.floor(n * 0.9);
                if (maxM < minM) maxM = minM;
                
                // Генерируем m в этом диапазоне
                let possibleMs = [];
                for(let k=minM; k<=maxM; k++) if(gcd(k, n)===1) possibleMs.push(k);
                if(possibleMs.length === 0) continue;
                m = pick(possibleMs);
                if (m >= 20) m = possibleMs[0]; // Ограничение условия m < 20 (если вдруг n=49)

                // 1. Три дроби - делители n
                if (factors.length === 3) {
                    factors.forEach(f => fractionsConfig.push({ d: f, single: false }));
                } else {
                    if (factors[0] === factors[1]) continue; 
                    fractionsConfig.push({ d: factors[0], single: false });
                    fractionsConfig.push({ d: factors[1], single: false });
                    fractionsConfig.push({ d: n, single: false });
                }

                // 2. Одна дробь со своим множителем (2,3,5), числитель однозначный
                let uniqueFactors = [...new Set(factors)];
                let base = pick(uniqueFactors); 
                let own = pick([2, 3, 5]);
                let d4 = base * own;
                
                if (d4 === n || d4 % n === 0) continue; 
                fractionsConfig.push({ d: d4, single: true }); 

                // 3. Одна дробь кратна n
                let k = pick([2, 3, 4, 10]);
                fractionsConfig.push({ d: n * k, single: false });

            } else {
                // --- ВАРИАНТ II ---
                const optionsN = [4, 6, 8, 9];
                n = pick(optionsN);
                
                // Целевой m < 20
                let possibleMs = [];
                for(let k=1; k<n; k++) if(gcd(k, n)===1) possibleMs.push(k);
                m = pick(possibleMs);

                // 1. Три дроби кратны n
                let multiKs = [2, 3, 4, 5, 6, 7, 8, 9, 10];
                shuffle(multiKs);
                for(let i=0; i<3; i++) {
                    fractionsConfig.push({ d: n * multiKs[i], single: false });
                }

                // 2. Четвертая дробь: не кратна n, общий множитель, частное <= 15
                let pFactors = getPrimeFactors(n);
                let p = pick(pFactors);
                let validKs = [];
                for(let k=2; k<=15; k++) {
                    let candidate = p * k;
                    if (candidate % n !== 0) validKs.push(k);
                }
                if (validKs.length === 0) continue;
                let k4 = pick(validKs);
                fractionsConfig.push({ d: p * k4, single: false });

                // 3. Пятая дробь: Взаимно проста, <= 15, числитель однозначный
                let coprimes = [];
                for(let i=2; i<=15; i++) {
                    if (gcd(i, n) === 1) coprimes.push(i);
                }
                if (coprimes.length === 0) continue;
                let d5 = pick(coprimes);
                fractionsConfig.push({ d: d5, single: true });
            }

            // --- СБОРКА ---
            const targetVal = m / n;
            let resultFractions = [];
            let greaterCount = 0;
            let smallerCount = 0;

            for (let conf of fractionsConfig) {
                // single: true -> maxNumVal = 10, иначе 1000
                let maxNum = conf.single ? 9 : 1000;
                
                // Используем новую функцию makeCloseFraction
                let f = makeCloseFraction(conf.d, targetVal, maxNum);
                
                let val = f.n / f.d;
                
                // Если случайно попали в точное равенство (бывает), сдвигаем
                if (Math.abs(val - targetVal) < 1e-9) {
                    // Пробуем сдвинуть на -1 или +1
                    if (f.n < f.d - 1 && f.n < maxNum) f.n++;
                    else if (f.n > 1) f.n--;
                    
                    // Пересчитываем val после сдвига
                    val = f.n / f.d;
                }

                if (val > targetVal) greaterCount++;
                else smallerCount++;

                resultFractions.push(f);
            }

            const askGreater = Math.random() < 0.5;
            const correctAns = askGreater ? greaterCount : smallerCount;
            const word = askGreater ? "больше" : "меньше";

            shuffle(resultFractions);
            const fractionsLatex = resultFractions.map(f => `\\(\\frac{${f.n}}{${f.d}}\\)`).join('; ');

            return {
                variables: {
                    ans: correctAns,
                    m: m,
                    n: n,
                    list: fractionsLatex,
                    word: word,
                    m_n: `\\frac{${m}}{${n}}`
                },
                problemText: `Даны дроби: ${fractionsLatex}. Сколько из них ${word} дроби \\(\\frac{${m}}{${n}}\\) ?`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return parseInt(userAnswer) === parseInt(vars.ans);
    }
},

{
    type: " ",
    number: "5frac5",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        // Функция выбора случайного элемента из массива
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // 1. ГЕНЕРАЦИЯ ОБЩЕГО МНОЖИТЕЛЯ a ДЛЯ ЧИСЛИТЕЛЕЙ
            // Чтобы дробь с круглым знаменателем была несократима, a должно быть нечетным и не 5.
            const possibleA = [3, 7, 9, 11, 13];
            const a = pick(possibleA);

            // 2. ГЕНЕРАЦИЯ ПЕРВОЙ ДРОБИ (Круглый знаменатель)
            // Числитель b тоже не должен содержать 2 и 5.
            const possibleB = [1, 3, 7, 9, 11, 13];
            const b = pick(possibleB);
            
            const num1 = a * b;
            const den1 = getRandomInt(1, 9) * 10; // 10, 20... 90

            if (gcd(num1, den1) !== 1) continue;
            if (num1 >= den1) continue; // Правильная дробь

            // 3. ГЕНЕРАЦИЯ ВТОРОЙ ДРОБИ (Некруглый знаменатель)
            // Здесь мы реализуем условие "2 или 5 в числителе"
            
            // Решаем, какой тип будет у второй дроби:
            // Type 5: Числитель кратен 5 -> Знаменатель четный (некруглый)
            // Type 2: Числитель кратен 2 -> Знаменатель кратен 5 (некруглый)
            const type = Math.random() < 0.5 ? 'has5' : 'has2';
            
            let c, den2;

            if (type === 'has5') {
                // Числитель должен иметь множитель 5
                c = pick([5, 25]); // Множитель c
                
                // Знаменатель должен быть четным, но не круглым (оканчиваться на 2, 4, 6, 8)
                // Генерируем число от 12 до 98, исключая кратные 10
                let candidates = [];
                for (let i = 12; i < 100; i += 2) {
                    if (i % 10 !== 0) candidates.push(i);
                }
                den2 = pick(candidates);

            } else {
                // Числитель должен иметь множитель 2
                c = pick([2, 4, 8, 16]); // Множитель c
                
                // Знаменатель должен быть кратен 5, но не круглым (оканчиваться на 5)
                let candidates = [];
                for (let i = 15; i < 100; i += 10) { // 15, 25, 35...
                    candidates.push(i);
                }
                den2 = pick(candidates);
            }

            const num2 = a * c;

            // Проверки второй дроби
            if (num2 >= den2) continue; // Правильная
            if (gcd(num2, den2) !== 1) continue; // Несократимая

            // 4. ПРОВЕРКА ОТНОШЕНИЙ МЕЖДУ ДРОБЯМИ
            // a) Знаменатели не равны
            if (den1 === den2) continue;
            
            // б) Знаменатели НЕ кратны друг другу (Ваше требование)
            if (den1 % den2 === 0 || den2 % den1 === 0) continue;

            // в) Числители НЕ кратны друг другу (95% сложных случаев)
            const wantEasyCase = Math.random() < 0.05;
            const isDivisibleNum = (num1 % num2 === 0) || (num2 % num1 === 0);
            
            if (wantEasyCase) {
                if (!isDivisibleNum) continue;
            } else {
                if (isDivisibleNum) continue;
            }

            // 5. РАСЧЕТ ОТВЕТА
            const commonNum = lcm(num1, num2);
            
            // Множители
            const k1 = commonNum / num1;
            const k2 = commonNum / num2;

            const newDen1 = den1 * k1;
            const newDen2 = den2 * k2;

            if (newDen1 > 100000 || newDen2 > 100000) continue;

            // Перемешиваем порядок подачи дробей
            let f1 = { n: num1, d: den1, nd: newDen1 };
            let f2 = { n: num2, d: den2, nd: newDen2 };
            
            let fractions = [f1, f2];
            if (Math.random() < 0.5) fractions = [f2, f1];

            return {
                variables: {
                    ans: `${fractions[0].nd}, ${fractions[1].nd}`,
                    n1: fractions[0].n, d1: fractions[0].d,
                    n2: fractions[1].n, d2: fractions[1].d
                },
                problemText: `Дроби \\(\\frac{${fractions[0].n}}{${fractions[0].d}}\\) и \\(\\frac{${fractions[1].n}}{${fractions[1].d}}\\) привели к наименьшему общему числителю. Какие получились знаменатели? Запишите через запятую два натуральных числа.`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const parts = vars.ans.split(',');
        const cleanAns = parts[0].trim() + ',' + parts[1].trim();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5frac4",
    tags: ["5_класс", "обыкновенные_дроби", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // 1. ГЕНЕРАЦИЯ ЗНАМЕНАТЕЛЕЙ
            // m, n, k - однозначные числа
            const m = getRandomInt(1, 9);
            const n = getRandomInt(1, 9);
            const k = getRandomInt(1, 9);

            // Формируем кандидатов: один с множителем 10, другой без
            let val1 = m * n * 10;
            let val2 = m * k;

            // Если случайно равны — пропускаем
            if (val1 === val2) continue;

            // ГЛАВНОЕ УСЛОВИЕ: Знаменатели не кратны друг другу
            if (val1 % val2 === 0 || val2 % val1 === 0) continue;

            // Перемешиваем, чтобы кратное 10 не всегда стояло первым
            let den1, den2;
            if (Math.random() < 0.5) {
                den1 = val1;
                den2 = val2;
            } else {
                den1 = val2;
                den2 = val1;
            }

            // 2. ГЕНЕРАЦИЯ ЧИСЛИТЕЛЕЙ (a*b и a*c)
            // 95% случаев - сложные (числители не делятся друг на друга)
            // 5% случаев - простые
            const wantEasyCase = Math.random() < 0.05;

            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            const c = getRandomInt(1, 9);

            if (b === c) continue;

            const num1 = a * b;
            const num2 = a * c;

            // Проверка кратности числителей
            const isDivisibleNum = (num1 % num2 === 0) || (num2 % num1 === 0);

            if (wantEasyCase) {
                // Хотели простой, но выпал сложный -> пропускаем
                if (!isDivisibleNum) continue;
            } else {
                // Хотели сложный, но выпал простой -> пропускаем
                if (isDivisibleNum) continue;
            }

            // 3. ПРОВЕРКИ КОРРЕКТНОСТИ ДРОБЕЙ
            // а) Дроби правильные (числитель < знаменателя)
            if (num1 >= den1 || num2 >= den2) continue;

            // б) Дроби несократимые (НОД = 1)
            // Это важно: так как один знаменатель кратен 10 (четный и делится на 5),
            // его числитель должен быть нечетным и не заканчиваться на 5.
            if (gcd(num1, den1) !== 1 || gcd(num2, den2) !== 1) continue;

            // 4. ВЫЧИСЛЕНИЕ ОТВЕТА
            const commonNum = lcm(num1, num2);

            // Ограничим ответ разумным числом (чтобы не заставлять искать НОК для 189 и 200)
            if (commonNum > 1000) continue;

            const question = `Даны дроби \\(\\frac{${num1}}{${den1}}\\) и \\(\\frac{${num2}}{${den2}}\\). Для сравнения их привели к наименьшему общему числителю. Чему равен этот числитель?`;

            return {
                variables: {
                    ans: commonNum,
                    num1: num1, 
                    num2: num2,
                    den1: den1, 
                    den2: den2
                },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Убираем пробелы и сравниваем с числом
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput == vars.ans;
    }
},

{
    type: " ",
    number: "5frac3",
    tags: ["5_класс", "обыкновенные_дроби", "смешанные_числа", "сравнение_чисел"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // 1. Сложность (95% сложных, 5% простых)
            const wantEasyCase = Math.random() < 0.05;

            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            const c = getRandomInt(1, 9);

            if (b === c) continue;

            // Назначим роли: denMix - для смешанного, denImp - для неправильной
            const denMix = a * b; 
            const denImp = a * c; 

            // Проверка кратности
            const isDivisible = (denMix % denImp === 0) || (denImp % denMix === 0);

            if (wantEasyCase) {
                if (!isDivisible) continue;
            } else {
                if (isDivisible) continue;
            }

            // НОК строго двузначный
            const lcd = lcm(denMix, denImp);
            if (lcd < 10 || lcd > 99) continue;

            // 2. Генерация числителей
            const getValidNumerator = (den) => {
                for (let k = 0; k < 10; k++) {
                    const n = getRandomInt(1, den - 1);
                    if (gcd(n, den) === 1) return n;
                }
                return null;
            };

            const numMix = getValidNumerator(denMix); // Числитель смешанного
            const numImpBase = getValidNumerator(denImp); // Числитель "хвостика" неправильной

            if (numMix === null || numImpBase === null) continue;

            // 3. Расчет допустимой целой части (Ограничение числителя <= 200)
            // improperNumerator = intPart * denImp + numImpBase <= 200
            const maxIntForLimit = Math.floor((200 - numImpBase) / denImp);

            if (maxIntForLimit < 1) continue;

            // Выбираем целую часть
            const finalMaxInt = Math.min(9, maxIntForLimit);
            const intPart = getRandomInt(1, finalMaxInt);

            // 4. Формирование значений
            // Неправильная дробь полностью:
            const improperNumerator = intPart * denImp + numImpBase;

            // Сравнение (приводим к НОК только дробные части)
            const multMix = lcd / denMix;
            const multImp = lcd / denImp;

            const valMix = numMix * multMix;
            const valImp = numImpBase * multImp;

            if (valMix === valImp) continue; // Равны

            const isFindMin = Math.random() < 0.5;
            const targetFracNum = isFindMin ? Math.min(valMix, valImp) : Math.max(valMix, valImp);
            const typeText = isFindMin ? "меньшее" : "большее";

            // Ответ всегда в формате смешанного числа
            const answerString = `${intPart} ${targetFracNum}/${lcd}`;

            // 5. Рандомизация порядка вывода в тексте задачи
            const mixedString = `\\(${intPart}\\frac{${numMix}}{${denMix}}\\கம்`; // Смешанное
            const improperString = `\\(\\frac{${improperNumerator}}{${denImp}}\\கம்`; // Неправильная

            const isMixedFirst = Math.random() < 0.5;
            
            let term1, term2;
            if (isMixedFirst) {
                term1 = mixedString;
                term2 = improperString;
            } else {
                term1 = improperString;
                term2 = mixedString;
            }

            // Убираем лишний символ 
            term1 = term1.replace('கம்', '');
            term2 = term2.replace('கம்', '');

            const question = `Сравните числа ${term1} и ${term2} и запишите в ответ **${typeText}** из них (в виде смешанного числа с наименьшим общим знаменателем).`;

            return {
                variables: {
                    ans: answerString,
                    lcd: lcd
                },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const cleanAns = vars.ans.toString().replace(/\s+/g, '');
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5frac2",
    tags: ["5_класс", "обыкновенные_дроби", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // ОПРЕДЕЛЯЕМ ТИП ЗАДАЧИ ЗАРАНЕЕ
            // true (5%) — ищем случай, где знаменатели делятся друг на друга (легкий)
            // false (95%) — ищем случай, где знаменатели НЕ делятся (сложный)
            const wantEasyCase = Math.random() < 0.05;

            // Генерируем компоненты
            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            const c = getRandomInt(1, 9);

            if (b === c) continue;

            const den1 = a * b;
            const den2 = a * c;

            // Проверяем кратность
            const isDivisible = (den1 % den2 === 0) || (den2 % den1 === 0);

            // ФИЛЬТР ПО ТИПУ
            if (wantEasyCase) {
                // Если мы хотели легкий пример, но выпал сложный — пропускаем
                if (!isDivisible) continue;
            } else {
                // Если мы хотели сложный пример (95%), но выпал легкий — пропускаем
                if (isDivisible) continue;
            }

            // Вычисляем НОЗ (LCM)
            const commonDenom = lcm(den1, den2);

            // Ограничение: ответ должен быть строго двузначным (10..99)
            if (commonDenom < 10 || commonDenom > 99) continue;

            // Подбираем числители (взаимно простые с знаменателями)
            const getValidNumerator = (den) => {
                // 10 попыток найти хороший числитель
                for (let k = 0; k < 10; k++) {
                    const n = getRandomInt(1, den - 1);
                    if (gcd(n, den) === 1) return n;
                }
                return null; // Если не нашли (редко)
            };

            const num1 = getValidNumerator(den1);
            const num2 = getValidNumerator(den2);

            if (num1 === null || num2 === null) continue;

            return {
                variables: {
                    ans: commonDenom, // Ответ — число
                    d1: den1,
                    d2: den2
                },
                problemText: `Найдите наименьший общий знаменатель дробей \\(\\frac{${num1}}{${den1}}\\) и \\(\\frac{${num2}}{${den2}}\\).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Сравниваем числовой ответ
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return cleanInput == vars.ans;
    }
},

{
    type: " ",
    number: "5frac1",
    tags: ["5_класс", "обыкновенные_дроби", "разные_знаменатели"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;

            // Определяем режим: 90% - сложные (некратные), 10% - простые (кратные)
            const isHardMode = Math.random() > 0.1;

            const a = getRandomInt(2, 9);
            const b = getRandomInt(1, 9);
            
            // Если режим сложный, c не может быть 1 (иначе den2=a, и den1=a*b будет делиться на den2)
            // Если режим простой, c может быть 1
            let minC = isHardMode ? 2 : 1;
            const c = getRandomInt(minC, 9);

            if (b === c) continue;

            const den1 = a * b;
            const den2 = a * c;

            // ГЛАВНАЯ ПРОВЕРКА КРАТНОСТИ
            const isDivisible = (den1 % den2 === 0) || (den2 % den1 === 0);

            if (isHardMode) {
                // В сложном режиме ЗАПРЕЩАЕМ кратность
                if (isDivisible) continue;
            } else {
                // В простом режиме (10%) мы ХОТИМ кратность (или допускаем её)
            }

            // Проверка НОК (строго двузначное число)
            const commonDenom = lcm(den1, den2);
            if (commonDenom < 10 || commonDenom > 99) continue;

            // Генерируем числители
            const getValidNumerators = (den) => {
                let valid = [];
                for (let i = 1; i < den; i++) {
                    // Числитель меньше знаменателя и взаимно прост
                    if (gcd(i, den) === 1) valid.push(i);
                }
                return valid;
            };

            const nums1 = getValidNumerators(den1);
            const nums2 = getValidNumerators(den2);

            if (nums1.length === 0 || nums2.length === 0) continue;

            const num1 = nums1[getRandomInt(0, nums1.length - 1)];
            const num2 = nums2[getRandomInt(0, nums2.length - 1)];

            // Приводим к общему знаменателю для проверки и ответа
            const mult1 = commonDenom / den1;
            const mult2 = commonDenom / den2;
            
            const newNum1 = num1 * mult1;
            const newNum2 = num2 * mult2;

            // Исключаем случаи, когда дроби равны
            if (newNum1 === newNum2) continue;

            // Формируем задание с новым вопросом
            return {
                variables: { 
                    ans: `${newNum1}, ${newNum2}`,
                    lcd: commonDenom
                },
                problemText: `Приведите дроби \\(\\frac{${num1}}{${den1}}\\) и \\(\\frac{${num2}}{${den2}}\\) к наименьшему общему знаменателю. Запишите в поле ответа получившиеся числители (два числа через запятую).`
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Удаляем все пробелы перед сравнением (например, "15, 14" станет "15,14")
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const cleanAns = vars.ans.toString().replace(/\s+/g, '');
        return cleanInput === cleanAns;
    }
}