// 5count9

const _5countTasks = [

// Десятичные дроби. Все арифметические действия (5-6) и скобки.

{
    type: " ",
    name: "5count9",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "вычитание", "сложение", "скобки", "4"],
    
    generate: function() {
        // --- All helper functions and the core constructive logic remain the same ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const round = (num, decimals) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(4)));
            if (strNum.includes('.') && strNum.endsWith('0')) {
                strNum = strNum.replace(/0+$/, '');
            }
            if (strNum.endsWith('.')) {
                strNum = strNum.slice(0, -1);
            }
            return strNum.replace('.', ',');
        };
        const genN1 = (min, max) => { let val; do { val = getRandomInt(min, max); } while (val % 10 === 0); return val / 10; };
        const genN2 = (min, max) => { let val; do { val = getRandomInt(min, max); } while (val % 10 === 0); return val / 100; };
        const genN3 = (min, max) => { let val; do { val = getRandomInt(min, max); } while (val % 10 === 0); return val / 1000; };

        let a, b, c, d, e, f, R_div1, R_div2, answer, equation;

        while (true) {
            // ... The entire number generation logic from the previous step ...
            const den_structures = ['d*e-f', 'd*e+f', 'f-d*e'];
            const den_structure = getRandomElement(den_structures);
            d = genN1(11, 85);
            e = genN2(11, 450);
            const R_mult = round(d * e, 3);
            if (R_mult >= 50) continue;
            let f_candidate;
            if (den_structure === 'd*e-f') {
                const f_frac = R_mult % 1;
                const f_int_max = Math.floor(R_mult) - 1;
                if (f_int_max < 1) continue;
                const f_int = getRandomInt(1, f_int_max);
                f_candidate = round(f_int + f_frac, 3);
                R_div2 = Math.round(R_mult - f_candidate);
            } else if (den_structure === 'd*e+f') {
                const R_div2_target = getRandomInt(1, 49);
                const f_needed = R_div2_target - R_mult;
                if (f_needed <= 0) continue;
                f_candidate = round(f_needed, 3);
                R_div2 = Math.round(R_mult + f_candidate);
            } else {
                const R_div2_target = getRandomInt(1, 49);
                const f_needed = R_div2_target + R_mult;
                if (f_needed >= 50) continue;
                f_candidate = round(f_needed, 3);
                R_div2 = Math.round(f_candidate - R_mult);
            }
            f = f_candidate;
            if (R_div2 <= 0 || R_div2 % 5 === 0 || R_div2 >= 50) continue;
            if (round(f, 3) !== f || Math.round(f*1000)%10 === 0 || f <= 0 || f >= 50) continue;
            const num_structures = ['a+b-c', 'a+b+c', 'a-b+c', 'a-b-c'];
            const num_structure = getRandomElement(num_structures);
            R_div1 = getRandomInt(1, 49);
            a = genN1(11, 499);
            b = genN2(11, 4999);
            let c_candidate;
            if (num_structure === 'a+b-c') c_candidate = round(a + b - R_div1, 2);
            else if (num_structure === 'a+b+c') c_candidate = round(R_div1 - a - b, 2);
            else if (num_structure === 'a-b+c') c_candidate = round(R_div1 - a + b, 2);
            else c_candidate = round(a - b - R_div1, 2);
            c = c_candidate;
            if (R_div1 <= 0 || R_div1 >= 50) continue;
            if (round(c, 2) !== c || Math.round(c*100)%10 === 0 || c <= 0 || c >= 50) continue;
            if (R_div1 % R_div2 === 0) continue;
            answer = round(R_div1 / R_div2, 2);
            const isN1 = round(answer, 1) === answer && Math.round(answer * 10) % 10 !== 0;
            const isN2 = round(answer, 2) === answer && Math.round(answer * 100) % 10 !== 0;
            if (!isN1 && !isN2) continue;
            if ([a,b,c,d,e,f,R_div1,R_div2,answer].some(n => n >= 50 || n <= 0)) continue;
            
            // Final text assembly
            let num_text;
            if (num_structure === 'a+b-c') num_text = `${formatNumber(a)} + ${formatNumber(b)} - ${formatNumber(c)}`;
            else if (num_structure === 'a+b+c') num_text = `${formatNumber(a)} + ${formatNumber(b)} + ${formatNumber(c)}`;
            else if (num_structure === 'a-b+c') num_text = `${formatNumber(a)} - ${formatNumber(b)} + ${formatNumber(c)}`;
            else num_text = `${formatNumber(a)} - ${formatNumber(b)} - ${formatNumber(c)}`;

            let den_text;
            if (den_structure === 'd*e-f') den_text = `${formatNumber(d)} · ${formatNumber(e)} - ${formatNumber(f)}`;
            else if (den_structure === 'd*e+f') den_text = `${formatNumber(d)} · ${formatNumber(e)} + ${formatNumber(f)}`;
            else den_text = `${formatNumber(f)} - ${formatNumber(d)} · ${formatNumber(e)}`;

            equation = `(${num_text}) : (${den_text})`;
            
            break; 
        }
        
        // --- MODIFICATION HERE ---
        const taskText = "Вычислите. В ответ запишите десятичную дробь или натуральное число:";
        const problemText = `${taskText}\n${equation}`; // Replaced \n\n with \n

        return {
            variables: { answer: answer },
            problemText: problemText
        };
    },
    
    calculateAnswer: function(vars) {
        return String(vars.answer).replace('.', ',');
    }
},

{
    type: " ",
    name: "5count8",
    tags: ["5_класс", "счёт", "десятичная_дробь", "вычитание", "умножение", "степень", "скобки", "3"],
    
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const round = (num, decimals) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(4)));
            if (strNum.includes('.') && strNum.endsWith('0')) {
                strNum = strNum.replace(/0+$/, '');
            }
            if (strNum.endsWith('.')) {
                strNum = strNum.slice(0, -1);
            }
            return strNum.replace('.', ',');
        };
        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };

        let a, b, c, d, e, R_paren, R_cube, answer, equation;

        // --- Основной конструктивный цикл ---
        while (true) {
            // --- ШАГ 1: Генерируем (c - d) * e ---
            d = genN1(11, 100);  // d = N1
            e = genN1(11, 50);   // e = N1
            c = getRandomInt(Math.ceil(d) + 1, 150); // c = N, c > d

            R_paren = round((c - d) * e, 3);

            // --- ШАГ 2: Генерируем b^3 ---
            let b_int;
            do { b_int = getRandomInt(1, 9); } while (b_int % 10 === 0);
            b = b_int / 10; // b = N1 и b < 1
            R_cube = round(Math.pow(b, 3), 3); // b^3 будет N3

            // --- ШАГ 3: Конструируем 'a', зная ответ ---
            answer = genN1(101, 2000); 
            a = round(answer + R_cube + R_paren, 2); // Пытаемся сделать 'a' типом N2

            // --- ШАГ 4: Проверки ---
            // Проверяем, что 'a' - это корректный N2
            if (Math.round(a * 100) % 10 === 0) continue;

            const allNumbers = [a, b, c, d, e, R_paren, R_cube, answer];
            if (allNumbers.some(n => n > 200 || n <= 0)) continue;
            
            // --- ШАГ 5: Сборка текста (с новыми вариантами) ---
            const paren_text = `(${formatNumber(c)} - ${formatNumber(d)})`;
            const b3_text = `${formatNumber(b)}³`;
            const a_text = formatNumber(a);
            const d_text = formatNumber(d);
            const e_text = formatNumber(e);

            const templates = [
                `${a_text} - ${b3_text} - ${paren_text} · ${e_text}`,
                `${a_text} - ${b3_text} - ${e_text} · ${paren_text}`,
                `${a_text} - ${paren_text} · ${e_text} - ${b3_text}`,
                `${a_text} - ${e_text} · ${paren_text} - ${b3_text}`
            ];
            
            equation = getRandomElement(templates);
            
            break; // Успех!
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        return String(vars.answer).replace('.', ',');
    }
},

{
    type: " ",
    name: "5count7",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "3"],
    
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const round = (num, decimals) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(4)));
            if (strNum.includes('.') && strNum.endsWith('0')) {
                strNum = strNum.replace(/0+$/, '');
            }
            if (strNum.endsWith('.')) {
                strNum = strNum.slice(0, -1);
            }
            return strNum.replace('.', ',');
        };

        let a, b, c, d, e, R_div, R_sub, term1, term2, answer, equation;

        // --- Основной конструктивный цикл ---
        while (true) {
            // --- ШАГ 1: Конструируем b : c = R_div (N3) ---
            let C, R, CR_100;
            do {
                // C (для c) должно быть кратно 4, чтобы в произведении с R (кратным 25) дать .00
                C = getRandomElement([12, 16, 24, 28, 32, 36, 44, 48, 52, 56, 64, 68, 72, 76]);
                // R (для R_div) должно быть кратно 25
                R = getRandomElement([125, 175, 225, 275, 325, 375, 425, 475, 625, 875]);
                CR_100 = (C * R) / 100;
            } while (CR_100 % 10 === 0); // Проверка, чтобы b не оканчивалось на 0
            
            c = C / 10;
            R_div = R / 1000;
            b = CR_100 / 100;

            // --- ШАГ 2: Конструируем d, e и R_sub для получения целого ответа ---
            let E_int;
            do { E_int = getRandomInt(15, 95); } while (E_int % 10 !== 5);
            e = E_int / 10;
            term2 = round(e * e, 2); // Результат всегда будет оканчиваться на .25

            let d_candidate, R_sub_candidate, term1_candidate;
            let foundPair = false;
            for (let i = 0; i < 50; i++) { // 50 попыток найти подходящую пару
                let D_int, S_int;
                do { D_int = getRandomInt(11, 150); } while (D_int % 10 === 0 || D_int % 2 === 0);
                do { S_int = getRandomInt(11, 150); } while (S_int % 10 === 0 || S_int % 2 === 0);
                
                d_candidate = D_int / 10;
                R_sub_candidate = S_int / 10;
                term1_candidate = round(d_candidate * R_sub_candidate, 2);

                // Ищем term1, который оканчивается на .25 или .75, чтобы красиво сложиться/вычесться с term2
                const fractionalPart = term1_candidate * 100 % 100;
                if (fractionalPart === 25 || fractionalPart === 75) {
                    d = d_candidate;
                    R_sub = R_sub_candidate;
                    term1 = term1_candidate;
                    foundPair = true;
                    break;
                }
            }
            if (!foundPair) continue; // Не нашли пару, начинаем генерацию заново

            // --- ШАГ 3: Конструируем 'a', сохраняя "подсказку" ---
            a = round(R_sub + R_div, 3);
            
            // --- ШАГ 4: Финальный расчет и проверки ---
            const sum = term1 + term2;
            const diff1 = term1 - term2;
            const diff2 = term2 - term1;

            const possibleAnswers = [];
            if (sum % 1 === 0 && sum > 0) possibleAnswers.push({ value: sum, type: 'sum' });
            if (diff1 % 1 === 0 && diff1 > 0) possibleAnswers.push({ value: diff1, type: 'diff1' });
            if (diff2 % 1 === 0 && diff2 > 0) possibleAnswers.push({ value: diff2, type: 'diff2' });
            
            if (possibleAnswers.length === 0) continue;

            const chosenAnswer = getRandomElement(possibleAnswers);
            answer = chosenAnswer.value;

            // Глобальная проверка на диапазон
            const allNumbers = [a, b, c, d, e, R_div, R_sub, term1, term2, answer];
            if (allNumbers.some(n => n > 200 || n <= 0)) continue;

            // --- ШАГ 5: Сборка текста ---
            const paren_text = `(${formatNumber(a)} - ${formatNumber(b)} : ${formatNumber(c)})`;
            const d_text = formatNumber(d);
            const e2_text = `${formatNumber(e)}²`;

            let templates = [];
            if (chosenAnswer.type === 'sum') {
                templates = [
                    `${d_text} · ${paren_text} + ${e2_text}`,
                    `${e2_text} + ${paren_text} · ${d_text}`
                ];
            } else if (chosenAnswer.type === 'diff1') {
                templates = [`${d_text} · ${paren_text} - ${e2_text}`];
            } else { // diff2
                templates = [`${e2_text} - ${paren_text} · ${d_text}`];
            }
            
            // Перемешиваем порядок множителей в одной из версий для разнообразия
            if (Math.random() > 0.5 && chosenAnswer.type !== 'diff2') {
                 templates.push(`${paren_text} · ${d_text} + ${e2_text}`);
            }
             if (Math.random() > 0.5 && chosenAnswer.type === 'diff2') {
                 templates.push(`${e2_text} - ${paren_text} · ${d_text}`);
            }

            equation = getRandomElement(templates);
            
            break; // Успех!
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        // Эта функция просто форматирует ответ для вывода, как в вашем первом примере
        return String(vars.answer).replace('.', ',');
    }
},

{
    type: " ",
    name: "5count6",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "2"],
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const roundToOne = (num) => Math.round(num * 10) / 10;
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(3)));
            if (strNum.includes('.') && strNum.endsWith('0')) {
                strNum = strNum.replace(/0+$/, '');
            }
             if (strNum.endsWith('.')) {
                strNum = strNum.slice(0,-1);
            }
            return strNum.replace('.', ',');
        };

        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };
         const genN2 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 100;
        };
        
        let equation, answer;

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- ЧАСТЬ 1: (c - d) * e = R_mult (N1) ---
            const e = getRandomElement([15, 25, 35, 45, 55]); // N
            const R_mult = genN1(51, 1500); // Результат N1
            let d_int;
            do { d_int = getRandomInt(101, 10000); } while (d_int % 10 === 0);
            const d = d_int / 1000; // d = N3
            
            const c = roundToTwo((R_mult / e) + d);
            if (c <= d || c <= 0 || Math.round(c*100)%10 === 0 || c > 200) continue;

            const part2_text_options = [
                `(${formatNumber(c)} - ${formatNumber(d)}) · ${e}`,
                `${e} · (${formatNumber(c)} - ${formatNumber(d)})`
            ];
            const part2_text = getRandomElement(part2_text_options);
            
            // --- ИСПРАВЛЕННАЯ ЛОГИКА ЧАСТИ 2: f(N) : (a(N1) + b(N2)) = R_div (N) ---
            const R_div = 25; // N должно быть 25, чтобы f было целым
            const a = genN1(11, 100); // a = N1
            
            const b = genN2(101, 999); // b = N2
            const paren_sum = roundToTwo(a + b);
            
            if ( (paren_sum * 100) % 4 !== 0 ) continue;

            const f = R_div * paren_sum; // Рассчитываем f, он будет целым (N)
            
            // Проверяем, что f - корректное натуральное число в диапазоне
            if (f <= 0 || f !== Math.round(f) || f > 200) continue;

            const part1_text_options = [
                `${formatNumber(f)} : (${formatNumber(a)} + ${formatNumber(b)})`,
                `${formatNumber(f)} : (${formatNumber(b)} + ${formatNumber(a)})`
            ];
            const part1_text = getRandomElement(part1_text_options);

            // --- Финальная сборка ---
            const templates = [];
            templates.push({
                calculate: (p1, p2) => roundToOne(p1 + p2),
                buildText: (p1_txt, p2_txt) => `${p1_txt} + ${p2_txt}`
            });
            if (R_div > R_mult) {
                templates.push({
                    calculate: (p1, p2) => roundToOne(p1 - p2),
                    buildText: (p1_txt, p2_txt) => `${p1_txt} - ${p2_txt}`
                });
            }
            if (R_mult > R_div) {
                 templates.push({
                    calculate: (p1, p2) => roundToOne(p2 - p1),
                    buildText: (p1_txt, p2_txt) => `${p2_txt} - ${p1_txt}`
                });
            }

            const template = getRandomElement(templates);
            answer = template.calculate(R_div, R_mult);

            if (answer <= 0 || answer > 200 || Math.round(answer*10)%10===0) continue;
            
            if (Math.random() > 0.5) {
                 equation = template.buildText(part1_text, part2_text);
            } else {
                 equation = template.buildText(part2_text, part1_text);
            }
            
            break; 
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        if (answerString.includes('.') && answerString.endsWith('0')) {
            let tempStr = answerString.replace(/0+$/, '');
            if (tempStr.endsWith('.')) {
                tempStr = tempStr.slice(0,-1);
            }
            return tempStr.replace('.', ',');
        }
        return answerString.replace('.', ',');
    }
},

{
    type: " ",
    name: "5count5",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "2"],
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(3)));
            return strNum.replace('.', ',');
        };

        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };
        const genN2 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 100;
        };
        const genN3 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 1000;
        };
        
        let equation;
        let answer; // The final answer, which will be N1

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- ЧАСТЬ 2: c : d : e = R_div (N3) ---
            const R_div = genN3(101, 1000); // Результат N3
            const e = getRandomInt(2, 5); // N
            const d = genN1(11, 50); // N1
            const c = roundToTwo(R_div * d * e); // Рассчитываем c
            if (c <= 0 || Math.round(c*100)%10 === 0) continue; // Проверка на N2

            const divisionTemplates = [
                `${formatNumber(c)} : ${formatNumber(d)} : ${e}`,
                `${formatNumber(c)} : ${e} : ${formatNumber(d)}`
            ];
            const part2_text = getRandomElement(divisionTemplates);
            const R_div_actual = roundToThree(c / d / e);

            // --- НОВАЯ ЛОГИКА: Генерируем ответ (N1) и вычисляем R_mult ---
            answer = genN1(101, 2000); // Генерируем ответ как N1
            const R_mult = roundToThree(answer + R_div_actual); // R_mult должен быть N2

            // Проверяем, что R_mult стал корректным N2
            if (roundToTwo(R_mult) !== R_mult || Math.round(R_mult * 100) % 10 === 0) continue;

            // --- ЧАСТЬ 1: (a ± b) * f = R_mult (N2) ---
            const f = getRandomInt(1, 4) * 10 + 5; // 15, 25, 35, 45
            const R_paren = roundToThree(R_mult / f);
            if (Math.round(R_paren * 1000) % 10 === 0) continue; // Проверка на N3

            let a, b, paren_text;
            const b_val = genN1(10, 50); // b = N1
            
            if (Math.random() > 0.5) { // (a + b)
                a = roundToThree(R_paren - b_val);
                b = b_val;
                const paren_templates = [
                    `(${formatNumber(a)} + ${formatNumber(b)})`,
                    `(${formatNumber(b)} + ${formatNumber(a)})`
                ];
                paren_text = getRandomElement(paren_templates);
            } else { // (a - b)
                a = roundToThree(R_paren + b_val);
                b = b_val;
                if (a < b) continue;
                paren_text = `(${formatNumber(a)} - ${formatNumber(b)})`;
            }

            if (a <= 0 || b <= 0 || Math.round(a*1000)%10 === 0) continue;

            // --- Финальная сборка ---
            const part1_templates = [
                `${paren_text} · ${f}`,
                `${f} · ${paren_text}`
            ];
            const part1_text = getRandomElement(part1_templates);
            
            equation = `${part1_text} - ${part2_text}`;
            break; 
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        return answerString.replace('.', ',');
    }
},

{
    type: " ",
    name: "5count4",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "2"],
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const roundToOne = (num) => Math.round(num * 10) / 10;
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;
        
        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(3)));
            return strNum.replace('.', ',');
        };

        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };
        const genN2 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 100;
        };

        let equation, answer;

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- ШАГ 1: Генерируем (b*c+d):e = R2 ---
            const e = genN1(11, 50); // N1
            const R2 = genN2(101, 500); // N2
            const R1 = roundToOne(R2 * e); // R1 = b*c+d, должен быть N1
            if (Math.round(R1 * 10) % 10 === 0 || R1 > 200 || R1 <= 0) continue;

            // --- ШАГ 2: Генерируем b*c+d = R1 ---
            const b = genN1(11, 99); // N1
            const c = genN2(101, 999); // N2
            const P = roundToThree(b * c); // P = b*c, должен быть N3
            if (Math.round(P * 1000) % 10 === 0 || P > 200 || P >= R1) continue;
            
            const d = roundToThree(R1 - P);
            if (d <= 0 || d > 200) continue;
            
            // --- ИСПРАВЛЕННЫЙ ШАГ 3: Генерируем a+f = S, где S - это N1 ---
            const S = genN1(201, 1999); // Генерируем N1 от 20.1 до 199.9
            if (S <= R2 || S > 200) continue; // Убеждаемся, что S будет больше R2 и меньше 200

            // Генерируем 'a' (N2) так, чтобы 'f' тоже было N2 и положительным
            const a_max_int = Math.floor(S * 100) - 101; // f будет как минимум 1.01
            if (a_max_int < 101) continue;
            const a = genN2(101, a_max_int); 

            const f = roundToTwo(S - a);
            // Проверка, что f - это N2 (положительное и последняя цифра не 0).
            if (f <= 0 || Math.round(f * 100) % 10 === 0) continue;

            // --- ШАГ 4: Вычисляем ответ и собираем уравнение ---
            answer = roundToTwo(S - R2);
            if (answer <= 0) continue;

            const paren_text = `(${formatNumber(b)} · ${formatNumber(c)} + ${formatNumber(d)})`;
            const divided_part = `${paren_text} : ${formatNumber(e)}`;
            const a_text = formatNumber(a);
            const f_text = formatNumber(f);

            const templates = [
                `${a_text} + ${f_text} - ${divided_part}`,
                `${f_text} + ${a_text} - ${divided_part}`
            ];

            equation = getRandomElement(templates);
            break; 
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        // Преобразуем числовой ответ в строку с запятой для корректной проверки
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        return answerString.replace('.', ',');
    }
},

{
    type: " ",
    name: "5count3",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "2"],


    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const roundToOne = (num) => Math.round(num * 10) / 10;
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(3)));
            return strNum.replace('.', ',');
        };
        
        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };
        const genN2 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 100;
        };
        const genN3 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 1000;
        };

        let equation, answer;

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- ШАГ 1: Генерируем R1 : e = R2 (N1 : N1 = N2) ---
            const e = genN1(11, 50); // e.g., 1.1 to 5.0
            const R2 = genN2(101, 500); // e.g., 1.01 to 5.00
            const R1 = roundToOne(R2 * e);
            if (Math.round(R1 * 10) % 10 === 0 || R1 > 200 || R1 <= 0) continue;

            // --- ШАГ 2: Генерируем |c * b - d| = R1 (N1*N2 - N3 = N1) ---
            const c = genN1(11, 99);
            const b = genN2(101, 999);
            const P = roundToThree(c * b);
            if (Math.round(P * 1000) % 10 === 0 || P > 200 || P <= R1) continue;
            
            let d, paren_inner_text;
            if (P > R1 && Math.random() > 0.5) {
                d = roundToThree(P - R1);
                paren_inner_text = `${formatNumber(c)} · ${formatNumber(b)} - ${formatNumber(d)}`;
            } else {
                d = roundToThree(P + R1);
                paren_inner_text = `${formatNumber(d)} - ${formatNumber(c)} · ${formatNumber(b)}`;
            }
            if (d > 200 || d <= 0 || Math.round(d * 1000) % 10 === 0) continue;

            // --- ШАГ 3: Генерируем a - R2 = R3 (N2 - N2 = N1) ---
            const R3 = genN1(11, 100);
            const a = roundToTwo(R3 + R2);
            if (a > 200 || a <= 0 || Math.round(a * 100) % 10 === 0) continue;
            
            // --- ШАГ 4: Генерируем f и ответ ---
            const f = genN2(101, 20000);
            if(f > 200) continue;
            answer = roundToTwo(R3 + f);
            if (answer > 200 || answer <= 0) continue;
            
            // --- ШАГ 5: Собираем уравнение ---
            const paren_text = `(${paren_inner_text})`;
            const divided_part = `${paren_text} : ${formatNumber(e)}`;
            
            const templates = [
                (a_txt, div_txt, f_txt) => `${a_txt} - ${div_txt} + ${f_txt}`,
                (a_txt, div_txt, f_txt) => `${a_txt} + ${f_txt} - ${div_txt}`,
                (a_txt, div_txt, f_txt) => `${f_txt} + ${a_txt} - ${div_txt}`,
            ];
            
            if (R2 + f > a) {
                 templates.push((a_txt, div_txt, f_txt) => `${div_txt} + ${f_txt} - ${a_txt}`);
            }

            equation = getRandomElement(templates)(formatNumber(a), divided_part, formatNumber(f));
            break; 
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        // Преобразуем числовой ответ в строку с запятой для корректной проверки
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        return answerString.replace('.', ',');
    }
},

{
    type: " ",
    name: "5count2",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "2"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const roundToOne = (num) => Math.round(num * 10) / 10;
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;
        
        const formatNumber = (num) => {
            let strNum = String(parseFloat(num.toFixed(3)));
            return strNum.replace('.', ',');
        };

        const genN1 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 10;
        };
        const genN2 = (min, max) => {
            let val;
            do { val = getRandomInt(min, max); } while (val % 10 === 0);
            return val / 100;
        };

        let equation, answer;

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- ШАГ 1: Генерируем R1 : e1 = R2, где R1=N1, e1=N, R2=N2 ---
            const e1 = getRandomElement([2, 4, 5, 8]); // N
            const R1 = genN1(50, 500); // N1
            const R2 = R1 / e1;
            if (roundToTwo(R2) !== R2) {
                continue;
            }

            // --- ШАГ 2: Генерируем |c1*b1 - d1| = R1, где c1=N1, b1=N2, d1=N3 ---
            let c1, b1, P;
            do {
                c1 = genN1(10, 99); // N1
                b1 = genN2(100, 999); // N2
                P = roundToThree(c1 * b1); // P = c1 * b1, будет N3
            } while (Math.round(P * 1000) % 10 === 0);
            
            let d1, paren_inner_text;
            if (P > R1 && Math.random() > 0.5) {
                d1 = roundToThree(P - R1);
                paren_inner_text = `${formatNumber(c1)} · ${formatNumber(b1)} - ${formatNumber(d1)}`;
            } else {
                if (P + R1 > 999) continue;
                d1 = roundToThree(P + R1);
                paren_inner_text = `${formatNumber(d1)} - ${formatNumber(c1)} · ${formatNumber(b1)}`;
            }
             if (Math.round(d1 * 1000) % 10 === 0) continue;


            // --- ШАГ 3: Генерируем a1, f1 и финальный ответ ---
            const a1 = genN2(100, 2000); // N2
            const f1 = genN1(10, 200); // N1
            
            const sum_a1_f1_R2 = roundToTwo(a1 + f1 + R2);
            answer = roundToOne(sum_a1_f1_R2);

            // --- ШАГ 4: Собираем уравнение из шаблонов ---
            const paren_text = `(${paren_inner_text})`;
            const divided_part = `${paren_text} : ${e1}`;
            
            const templates = [
                `${formatNumber(a1)} + ${divided_part} + ${formatNumber(f1)}`,
                `${formatNumber(a1)} + ${formatNumber(f1)} + ${divided_part}`,
                `${divided_part} + ${formatNumber(a1)} + ${formatNumber(f1)}`,
                `${divided_part} + ${formatNumber(f1)} + ${formatNumber(a1)}`,
                `${formatNumber(f1)} + ${divided_part} + ${formatNumber(a1)}`,
                `${formatNumber(f1)} + ${formatNumber(a1)} + ${divided_part}`,
            ];

            equation = getRandomElement(templates);
            break; 
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        // Преобразуем числовой ответ в строку с запятой для корректной проверки
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        return answerString.replace('.', ',');
    }
},

{
    type: " ",
    name: "5count1",
    tags: ["5_класс", "счёт", "десятичная_дробь", "деление", "умножение", "сложение", "вычитание", "скобки", "1"],

    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            if (min > max) return null;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        const roundToTwo = (num) => Math.round(num * 100) / 100;
        const roundToThree = (num) => Math.round(num * 1000) / 1000;
        
        const formatNumber = (num) => {
            let strNum = parseFloat(num).toFixed(3).replace(/(\.0+|0+)$/, '');
            if (strNum.endsWith('.')) strNum = strNum.slice(0,-1);
            return strNum.replace('.', ',');
        };

        let equation, answer;

        // --- Основной конструктивный цикл ---
        while(true) {
            // --- Генерируем базовые числа и части уравнения ---
            const e = getRandomInt(2, 48) / 10; // N1
            const R3 = getRandomInt(11, 250) / 10; // N1
            const d = roundToTwo(e * R3); // N2
            const part2 = R3; // Результат d:e

            const c = getRandomInt(2, 9); // N
            const R1 = getRandomInt(2000, 15000) / 1000; // N3
            const b = getRandomInt(100, 1000) / 100; // N2
            const a = roundToThree(R1 + b); // N3
            const part1 = roundToThree(R1 * c); // N3, результат (a-b)*c

            // --- Генерация f1 и f2 по вашим правилам ---
            // f1: f1 - part1 = N2
            const p1_d3 = Math.round((part1 * 1000)) % 10;
            let f1_int_part = getRandomInt(Math.ceil(part1) + 1, Math.ceil(part1) + 50);
            let f1_frac_part = getRandomInt(0, 99) * 10 + p1_d3;
            const f1 = roundToThree(f1_int_part + f1_frac_part / 1000);

            // f2: f2 + part1 = N2
            const f2_d3 = (10 - p1_d3) % 10;
            let f2_int_part = getRandomInt(1, 50);
            let f2_frac_part = getRandomInt(0, 99) * 10 + f2_d3;
            const f2 = roundToThree(f2_int_part + f2_frac_part / 1000);

            // --- Шаблоны уравнений ---
            const paren_text = `(${formatNumber(a)} - ${formatNumber(b)})`;
            const part1_text = `${paren_text} · ${c}`;
            const part1_text_alt = `${c} · ${paren_text}`;
            const part2_text = `${formatNumber(d)} : ${formatNumber(e)}`;
            const f1_text = formatNumber(f1);
            const f2_text = formatNumber(f2);

            const templates = [
                { fType: 'f2', cond: (p1, p2, f) => p1 + p2 > f, calc: (p1, p2, f) => roundToThree(p1 + p2 - f), text: (p1_txt, p2_txt, f_txt) => `${p1_txt} + ${p2_txt} - ${f_txt}` },
                { fType: 'f2', cond: (p1, p2, f) => p1 > p2, calc: (p1, p2, f) => roundToThree(p1 - p2 + f), text: (p1_txt, p2_txt, f_txt) => `${p1_txt} - ${p2_txt} + ${f_txt}` },
                { fType: 'f1', cond: (p1, p2, f) => true, calc: (p1, p2, f) => roundToTwo(f - p1) + p2, text: (p1_txt, p2_txt, f_txt) => `${f_txt} - ${p1_txt} + ${p2_txt}` },
                { fType: 'f1', cond: (p1, p2, f) => roundToTwo(f - p1) > p2, calc: (p1, p2, f) => roundToTwo(f - p1 - p2), text: (p1_txt, p2_txt, f_txt) => `${f_txt} - ${p1_txt} - ${p2_txt}` },
                { fType: 'f1', cond: (p1, p2, f) => f + p2 > p1, calc: (p1, p2, f) => roundToThree(f + p2 - p1), text: (p1_txt, p2_txt, f_txt) => `${f_txt} + ${p2_txt} - ${p1_txt}` },
            ];

            const validTemplates = templates.filter(t => {
                const f = t.fType === 'f1' ? f1 : f2;
                return t.cond(part1, part2, f);
            });

            if (validTemplates.length > 0) {
                const template = getRandomElement(validTemplates);
                const f_to_use = template.fType === 'f1' ? f1 : f2;
                const f_text_to_use = template.fType === 'f1' ? f1_text : f2_text;
                const final_part1_text = Math.random() > 0.5 ? part1_text : part1_text_alt;
                
                answer = template.calc(part1, part2, f_to_use);
                equation = template.text(final_part1_text, part2_text, f_text_to_use);
                break;
            }
        }

        return {
            variables: { answer: answer },
            problemText: `${equation} = `
        };
    },
    
    calculateAnswer: function(vars) {
        // Преобразуем числовой ответ в строку с запятой для корректной проверки
        const answerString = String(parseFloat(vars.answer.toFixed(3)));
        return answerString.replace('.', ',');
    }
},

];

window.taskRegistry.push(..._5countTasks);