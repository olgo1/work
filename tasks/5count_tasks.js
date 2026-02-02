// 5count26 - найти число, кратное данному числу в заданном промежутке
// 5count25 - найти частное от деления a на b (оба записаны в виде произведения степеней простых чисел)
// 5count24 - найти неизвестный простой множитель в разложении a, если известно, что a кратно b (b записано в десятичной системе счисления)
// 5count23 - какое из чисел a, b, c кратно числу d? (a, b, c записаны в виде произведения, число d - в десятичном виде)
// 5count22 - найти, сколько чисел из данного диапазона кратны данному числу
// ПРОБЛЕМА 5count21 - среди ряда чисел выбрать то, которое не кратно данному 
// (нет) 5count20 - Найти НОД трёх чисел, записанных в десятичной системе счисления
// (нет) 5count19 - найти НОД двух чисел, записанных в десятичной системе счисления
// (нет) 5count18 - найти НОД трёх чисел, записанных в виде произведения простых множителей
// 5count17 -  найти НОД двух чисел, записанных в виде произведения простых множителей
// 5count16 - найти общие делители трёх чисел, записанных в виде разложение на простые, со степенями
// 5count15 - найти общие делители двух чисел, записанных в дес. системе счисления
// 5count14 - найти общие делители чисел, записанных в виде произведения простых множителей (возможно, со степенями)
//[проверено] 5count13 - найти все делители числа, разложенного на простые множители (разложение записано по степеням)
// [проверено]  5count12 - найти все делители числа, разложенного на простые множители (разложение записано в виде произведения)
// [проверено] 5count11 - найти все делители числа
// [проверено] 5count10 - разложить число на простые множители

{
    type: " ",
    number: "5count26",
    tags: ["5_класс", "кратные"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Цикл для поиска валидной комбинации
        let attempts = 0;
        while (attempts < 1000) {
            attempts++;

            // 1. Генерируем n (делитель)
            // Условия: 
            // 20 <= n <= 50, не кратно 10.
            // Также n должно быть >= 23, иначе 9 * n = 198 < 200 (не выполним условие a >= 200 при k < 10)
            let n = getRandomInt(23, 50);
            if (n % 10 === 0) continue;

            // 2. Выбираем множитель k (частное)
            // Условия:
            // target = k * n
            // target >= 205 (чтобы а >= 200)
            // k < 10 (по запросу)
            
            const minK = Math.ceil(205 / n);
            const maxK = 9; // Строго меньше 10
            
            if (minK > maxK) continue; // Невозможно подобрать k для этого n

            const k = getRandomInt(minK, maxK);
            const target = k * n;

            // 3. Формируем границы [a, b]
            // a = target - leftShift
            // Ограничения на leftShift:
            // 1) Чтобы a >= 200: leftShift <= target - 200
            // 2) Чтобы a > target - n (предыдущее кратное не входит): leftShift < n
            // 3) Чтобы a < 10*n (предыдущее условие пользователя):
            //    a = kn - shift. Поскольку k <= 9, то a < 9n, что автоматически меньше 10n.
            
            const maxLeftShift = Math.min(n - 1, target - 200);
            if (maxLeftShift < 1) continue;

            const leftShift = getRandomInt(1, maxLeftShift);
            const a = target - leftShift;

            // Определяем b
            // b = target + rightShift
            // Ограничения на rightShift:
            // 1) Чтобы интервал был узким (единственное решение): (target + right) - (target - left) < n  =>  right < n - left
            // 2) Чтобы b <= 500: right <= 500 - target
            
            const maxRightShift = Math.min(n - leftShift - 1, 500 - target);
            if (maxRightShift < 0) continue;
            
            const rightShift = getRandomInt(0, maxRightShift);
            const b = target + rightShift;

            return {
                variables: { 
                    n, 
                    a, 
                    b,
                    target,
                    k // Частное (для отладки, если нужно)
                },
                problemText: `Найдите число, которое кратно ${n} и находится в промежутке от ${a} до ${b} (включая эти числа).`
            };
        }
        
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.target;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9]/.test(cleanInput)) return false;
        
        const val = parseInt(cleanInput, 10);
        
        return (val >= vars.a && val <= vars.b && val % vars.n === 0);
    }
},

{
    type: " ",
    number: "5count25",
    tags: ["5_класс", "степени", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Хелпер для перемешивания массива
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        // Хелпер: факторизация числа
        const getPrimeFactors = (num) => {
            const factors = {};
            let d = 2;
            let temp = num;
            while (d * d <= temp) {
                while (temp % d === 0) {
                    factors[d] = (factors[d] || 0) + 1;
                    temp /= d;
                }
                d++;
            }
            if (temp > 1) factors[temp] = (factors[temp] || 0) + 1;
            return factors;
        };

        // Хелпер: Форматирование в LaTeX
        const formatLatex = (factorsMap) => {
            const bases = Object.keys(factorsMap).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const exp = factorsMap[base];
                return exp === 1 ? `${base}` : `${base}^{${exp}}`;
            }).join(" \\cdot ");
        };

        // Основной цикл генерации
        let problemData = null;
        let attempts = 0;

        while (!problemData && attempts < 1000) {
            attempts++;
            
            // 1. Выбираем 3 разных простых основания для числа 'a'
            // Берем маленькие, чтобы число не улетело в космос
            const pool = [2, 3, 5, 7, 11]; 
            const shuffledPool = shuffleArray([...pool]);
            const bases = shuffledPool.slice(0, 3).sort((a, b) => a - b); // [p1, p2, p3]

            // 2. Выбираем паттерн степеней для 'a'
            // Либо {1, 2, 2}, либо {1, 1, 3}
            const pattern = Math.random() > 0.5 ? [1, 2, 2] : [1, 1, 3];
            const exps = shuffleArray(pattern);

            // Собираем объект факторов для 'a'
            const factorsA = {};
            let valA = 1;
            bases.forEach((base, idx) => {
                const e = exps[idx];
                factorsA[base] = e;
                valA *= Math.pow(base, e);
            });

            // 3. Ищем подходящее число q (частное)
            // Условия: 30 <= q <= 70
            // b = a / q должно быть целым
            // b должно иметь 2 или 3 множителя
            
            // Перебираем возможные q в диапазоне
            // Для оптимизации: не перебираем все числа, а идем по делителям 'a'
            // Но проще перебрать диапазон 30..70 и проверить делимость, т.к. диапазон маленький
            
            const validQs = [];
            for (let q = 30; q <= 70; q++) {
                if (valA % q === 0) {
                    const valB = valA / q;
                    const factorsB = getPrimeFactors(valB);
                    const countDistinctB = Object.keys(factorsB).length;
                    
                    // Проверка условий для b:
                    // 1. Количество различных простых множителей: 2 или 3
                    if (countDistinctB >= 2 && countDistinctB <= 3) {
                         validQs.push({ q, factorsB });
                    }
                }
            }

            if (validQs.length > 0) {
                // Выбираем случайный подходящий вариант
                const selected = validQs[getRandomInt(0, validQs.length - 1)];
                
                problemData = {
                    q: selected.q,
                    latexA: formatLatex(factorsA),
                    latexB: formatLatex(selected.factorsB)
                };
            }
        }

        if (!problemData) return this.generate(); // Рестарт при неудаче

        return {
            variables: { 
                q: problemData.q, 
                latexA: problemData.latexA, 
                latexB: problemData.latexB 
            },
            problemText: `Найдите частное от деления числа $a$ на число $b$:<br>
            $$a = ${problemData.latexA}$$
            $$b = ${problemData.latexB}$$<br>
            Ответ запишите в виде натурального числа.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.q;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9]/.test(cleanInput)) return false;
        return parseInt(cleanInput, 10) === vars.q;
    }
},

{
    type: " ",
    number: "5count24",
    tags: ["5_класс", "разложение_на_множители", "кратные"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

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

        // 1. Генерируем b
        let b;
        let bFactors = [];
        do {
            b = getRandomInt(6, 59);
            bFactors = getPrimeFactors(b);
        } while (bFactors.length < 2);

        // 2. Определяем n (то, чего не будет хватать в a)
        const hiddenIndex = getRandomInt(0, bFactors.length - 1);
        const n = bFactors[hiddenIndex];

        // 3. Формируем множители a (без n)
        let aFactors = [...bFactors];
        aFactors.splice(hiddenIndex, 1);

        // --- ИСПРАВЛЕНИЕ ТУТ ---
        // Чтобы a НЕ было кратно b, в aFactors не должно быть лишних n.
        // Считаем, сколько раз n встречается в bFactors
        const countNInB = bFactors.filter(x => x === n).length;
        
        // Создаем пул для шума, исключая из него n, 
        // чтобы случайно не сделать a кратным b раньше времени.
        const primesPool = [2, 3, 5, 7, 11, 13].filter(p => p !== n); 
        
        const noiseCount = getRandomInt(1, 2);
        for (let i = 0; i < noiseCount; i++) {
            aFactors.push(getRandomEl(primesPool));
        }
        // -----------------------

        shuffleArray(aFactors);
        
        const factorsString = aFactors.join(" \\cdot "); 
        const displayA = `${factorsString} \\cdot n`;

        return {
            variables: { 
                b, 
                n 
            },
            problemText: `Дано число $a = ${displayA}$, где $n$ --- простое число.<br>
            <br> Найдите, чему равно $n$, если известно, что $a$ кратно $${b}$.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.n;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9]/.test(cleanInput)) return false;
        return parseInt(cleanInput, 10) === vars.n;
    }
},

{
    type: " ",
    number: "5count23",
    tags: ["5_класс", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const formatFactorsRaw = (factors) => {
            return [...factors].sort((a, b) => a - b).join(" \\cdot ");
        };

        const isDivisible = (factors, divisors) => {
            let tempFactors = [...factors];
            for (let d of divisors) {
                const idx = tempFactors.indexOf(d);
                if (idx === -1) return false;
                tempFactors.splice(idx, 1);
            }
            return true;
        };

        // 1. Генерируем число "N" (делитель)
        const p1 = getRandomEl([2, 3, 5, 7, 11, 13]);
        const p2 = getRandomEl([2, 3, 5, 7]);
        const divNumber = p1 * p2;
        const divFactors = [p1, p2];

        // 2. Генерируем варианты
        const primesPool = [2, 3, 5, 7, 11, 13, 17, 19];

        // Правильный вариант
        let correctFactors = [...divFactors];
        const extraCountCorrect = getRandomInt(1, 3);
        for (let i = 0; i < extraCountCorrect; i++) {
            correctFactors.push(getRandomEl(primesPool));
        }

        // Неправильные варианты
        let wrongOptions = [];
        while (wrongOptions.length < 2) {
            const len = getRandomInt(3, 5);
            let attempt = [];
            for (let i = 0; i < len; i++) {
                attempt.push(getRandomEl(primesPool));
            }

            if (!isDivisible(attempt, divFactors)) {
                const strKey = attempt.sort().join();
                const exists = wrongOptions.some(opt => opt.sort().join() === strKey);
                if (!exists) wrongOptions.push(attempt);
            }
        }

        // 3. Сборка
        const options = [
            { id: 'correct', factors: correctFactors },
            { id: 'wrong1', factors: wrongOptions[0] },
            { id: 'wrong2', factors: wrongOptions[1] }
        ];

        shuffleArray(options);

        const labels = ['a', 'b', 'c'];
        let correctLetter = '';
        
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ: используем "=" вместо ")" ---
        const latexLines = options.map((opt, index) => {
            const letter = labels[index];
            if (opt.id === 'correct') correctLetter = letter;
            
            return `$$${letter} = ${formatFactorsRaw(opt.factors)}$$`;
        });

        return {
            variables: { 
                divNumber, 
                correctLetter 
            },
            problemText: `Ниже записаны три числа в виде произведения простых множителей.
            Какое из этих чисел кратно числу ${divNumber}?<br>
            ${latexLines.join("")} <br>
            (В ответе запишите только букву: $a$, $b$ или $c$.)`
        };
    },

    calculateAnswer: function(vars) {
        return vars.correctLetter;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        let clean = userAnswer.toString().toLowerCase().trim();
        clean = clean.replace("а", "a").replace("в", "b").replace("с", "c");
        const match = clean.match(/^[abc]/);
        if (!match) return false;
        return match[0] === vars.correctLetter;
    }
},

{
    type: " ",
    number: "5count22",
    tags: ["5_класс", "кратные"],
    generate: function() {
        const getRandomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Хелпер: проверка условия "вторая цифра >= 6"
        // (имеем в виду цифру единиц: 16, 27, 108 и т.д.)
        const isValidDivisor = (n) => (n % 10) >= 6;

        // Хелпер: подсчет кратных в диапазоне [min, max]
        const countRange = (k, min, max) => Math.floor(max / k) - Math.floor((min - 1) / k);

        // ВЫБОР СЦЕНАРИЯ
        // 1: Числа, меньшие N (аналог "до 100", "до 200" и т.д.)
        // 2: Трёхзначные числа (100..999)
        const scenario = Math.random() > 0.5 ? 1 : 2;

        let problemText = "";
        let answer = 0;
        let validOptions = [];

        if (scenario === 1) {
            // --- СЦЕНАРИЙ 1: "Сколько чисел, меньших Limit..." ---
            // Лимит выбираем красивый: 100, 200, 300, 400, 500, 1000.
            const limit = getRandomEl([100, 150, 200, 250, 300, 400, 500, 1000]);

            // Перебираем возможные делители k
            // Чтобы ответ был 5..10, k должно быть примерно limit/10 .. limit/5
            const minK = Math.floor(limit / 11);
            const maxK = Math.floor(limit / 5) + 1;

            for (let k = minK; k <= maxK; k++) {
                if (k <= 1) continue; // Исключаем 1
                if (!isValidDivisor(k)) continue; // Вторая цифра >= 6

                // Считаем количество чисел < limit (то есть диапазон 1 .. limit-1)
                const cnt = countRange(k, 1, limit - 1);
                
                if (cnt >= 5 && cnt <= 10) {
                    validOptions.push({ k, ans: cnt });
                }
            }

            if (validOptions.length === 0) return this.generate(); // Рестарт, если не нашли
            const selected = getRandomEl(validOptions);
            
            answer = selected.ans;
            problemText = `Сколько существует натуральных чисел, меньших ${limit}, которые кратны <b>${selected.k}</b>?`;

        } else {
            // --- СЦЕНАРИЙ 2: "Сколько трёхзначных чисел..." ---
            // Диапазон строго 100..999
            
            // Чтобы ответ был 5..10, делитель k должен быть примерно 900/10=90 .. 900/5=180
            for (let k = 80; k <= 200; k++) {
                if (!isValidDivisor(k)) continue; // Вторая цифра >= 6

                const cnt = countRange(k, 100, 999);
                
                if (cnt >= 5 && cnt <= 10) {
                    validOptions.push({ k, ans: cnt });
                }
            }

            if (validOptions.length === 0) return this.generate();
            const selected = getRandomEl(validOptions);

            answer = selected.ans;
            problemText = `Сколько существует трёхзначных чисел, которые кратны ${selected.k}?`;
        }

        return {
            variables: { answer },
            problemText: problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        return parseInt(cleanInput, 10) === vars.answer;
    }
},

{
    type: " ",
    number: "5count21",
    tags: ["5_класс", "кратные"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // 1. Выбираем делитель (Base)
        const base = getRandomEl([11, 13, 17, 19]);

        // 2. Длина ряда чисел (6-8 штук)
        const length = getRandomInt(6, 8);

        // 3. Старт последовательности
        const startMultiplier = 10;

        let numbers = [];
        let wrongNumber = 0;
        
        // 4. Выбираем позицию ошибки
        const wrongIndex = getRandomInt(3, length - 1);

        for (let i = 0; i < length; i++) {
            const currentMultiplier = startMultiplier + i;
            let val = base * currentMultiplier;

            if (i === wrongIndex) {
                // Ломаем число: +1 или -1
                const shift = Math.random() > 0.5 ? 1 : -1;
                val += shift;
                wrongNumber = val;
            }

            numbers.push(val);
        }

        // Формируем строку чисел
        const listString = numbers.join(", ");

        return {
            variables: { 
                base, 
                wrongNumber,
                listString // ДОБАВЛЕНО: передаем строку в переменные
            },
            // ИСПРАВЛЕНО: добавлена сама последовательность в текст задачи
            problemText: `В строку выписаны числа: ${listString}.<br>
            Все они, кроме одного, кратны ${base}. Найдите и запишите число, которое не кратно ${base}.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.wrongNumber;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9]/.test(cleanInput)) return false;
        
        return parseInt(cleanInput, 10) === vars.wrongNumber;
    }
},

{
    type: " ",
    number: "5count17",
    tags: ["5_класс", "НОД", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const formatFactorsToLatex = (factors) => {
            const counts = {};
            factors.forEach(x => { counts[x] = (counts[x] || 0) + 1; });
            const unique = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return unique.map(base => {
                const deg = counts[base];
                return deg > 1 ? `${base}^{${deg}}` : `${base}`;
            }).join(" \\cdot ");
        };

        // Хелпер: произведение массива
        const getProd = (arr) => arr.reduce((a, b) => a * b, 1);

        // ==========================================
        // ШАГ 1: Генерация ядра НОД (соблюдая условия)
        // ==========================================
        let gcdFactors = [];
        const scenario = Math.random(); 

        if (scenario < 0.25) {
            // --- СЦЕНАРИЙ 1: Высокая степень (3 или 4) ---
            // База: 2 (степени 3,4,5,6) или 3 (степень 3). 
            // 3^4 = 81 (>70), так что для тройки только куб.
            const base = Math.random() > 0.3 ? 2 : 3;
            let exponent = 3; 
            
            if (base === 2) {
                // Для двойки допустимы степени 3 (8), 4 (16), 5 (32), 6 (64).
                // Но в условии просили "3 или 4". Ок, ограничимся ими.
                exponent = getRandomEl([3, 4]);
            }
            
            // Заполняем массив
            gcdFactors = Array(exponent).fill(base);

        } else if (scenario < 0.75) {
            // --- СЦЕНАРИЙ 2: Квадрат (степень 2) ---
            // 50% вероятность
            // Базы: 2, 3, 5, 7 (7^2=49, ок).
            const base = getRandomEl([2, 3, 5, 7]);
            gcdFactors = [base, base];

        } else {
            // --- СЦЕНАРИЙ 3: Линейный (все степени 1) ---
            // Оставшиеся 25%
            const startP = getRandomEl([2, 3, 5, 7, 11, 13]);
            gcdFactors = [startP];
        }

        // ==========================================
        // ШАГ 2: Дополнение НОД (до 3-х множителей, <= 70)
        // ==========================================
        // Пытаемся добавить еще множители, пока не превысим 70 и не превысим длину 3
        const primes = [2, 3, 5, 7, 11, 13, 17, 19];
        
        let attempts = 0;
        while (gcdFactors.length < 3 && attempts < 10) {
            attempts++;
            const p = getRandomEl(primes);
            const currentVal = getProd(gcdFactors);
            
            if (currentVal * p <= 70) {
                gcdFactors.push(p);
            }
        }

        const gcdVal = getProd(gcdFactors);

        // ==========================================
        // ШАГ 3: Генерация чисел a и b
        // ==========================================
        // a = НОД * k1
        // b = НОД * k2
        // k1 и k2 должны быть взаимно простыми.
        
        // Генерируем добавки в виде простых множителей, чтобы легко вывести LaTeX
        let extraFactorsA = [];
        let extraFactorsB = [];

        // Выбираем случайные простые добавки
        // Набор A
        extraFactorsA.push(getRandomEl([2, 3, 5]));
        if (Math.random() > 0.5) extraFactorsA.push(getRandomEl([2, 3, 7]));

        // Набор B (следим, чтобы не пересекался с A по составу, чтобы не увеличить НОД)
        // Самый простой способ: набрать B, проверить общие, если есть - заменить.
        // Но проще генерировать B из тех, которых нет в A (или аккуратно подбирать).
        
        // Для простоты: возьмем два случайных числа k1, k2, проверим gcd(k1,k2)==1
        // и потом разложим их на множители.
        
        const gcdFunc = (x, y) => (!y ? x : gcdFunc(y, x % y));
        
        let k1, k2;
        do {
            k1 = getRandomInt(2, 12); // Не очень большие, чтобы пример не был монструозным
            k2 = getRandomInt(2, 12);
        } while (k1 === k2 || gcdFunc(k1, k2) !== 1);

        // Функция разложения числа на простые множители
        const getPrimeFactors = (n) => {
            const factors = [];
            let d = 2;
            let temp = n;
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

        extraFactorsA = getPrimeFactors(k1);
        extraFactorsB = getPrimeFactors(k2);

        // Сборка итоговых массивов
        const factorsA = [...gcdFactors, ...extraFactorsA];
        const factorsB = [...gcdFactors, ...extraFactorsB];

        // ==========================================
        // ШАГ 4: Форматирование
        // ==========================================
        // Перемешиваем множители перед выводом
        const displayA = formatFactorsToLatex(shuffleArray([...factorsA]));
        const displayB = formatFactorsToLatex(shuffleArray([...factorsB]));

        return {
            variables: { 
                gcdVal, 
                answer: gcdVal 
            },
            problemText: `Найдите наибольший общий делитель (НОД) чисел $a$ и $b$:
            $$a = ${displayA}$$
            $$b = ${displayB}$$`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        // Очистка и парсинг
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9]/.test(cleanInput)) return false;
        
        return parseInt(cleanInput, 10) === vars.gcdVal;
    }
},

{
    type: " ",
    number: "5count16",
    tags: ["5_класс", "делители", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const formatFactorsToLatex = (factors) => {
            const counts = {};
            factors.forEach(x => { counts[x] = (counts[x] || 0) + 1; });
            const unique = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return unique.map(base => {
                const deg = counts[base];
                return deg > 1 ? `${base}^{${deg}}` : `${base}`;
            }).join(" \\cdot ");
        };

        const getKey = (factors) => [...factors].sort((a, b) => a - b).join(',');

        // ==========================================
        // ШАГ 1: Генерируем БАЗУ (Глобальный НОД)
        // ==========================================
        let baseFactors = [];
        let baseVal = 0;
        
        // ИЗМЕНЕНИЕ: Вероятность квадрата (ответ из 3 чисел) снижена до 20% (< 0.2)
        // В 80% случаев будут разные простые (ответ из 4 чисел)
        const isSquareBase = Math.random() < 0.2; 

        if (isSquareBase) {
            // Сценарий: НОД = p^2 (делители: 1, p, p^2) - их мало, поэтому делаем редко
            const primes = [2, 3, 5, 7]; 
            const p = getRandomEl(primes);
            baseFactors = [p, p];
            baseVal = p * p;
        } else {
            // Сценарий: НОД = p1 * p2 (делители: 1, p1, p2, p1*p2) - их много
            const primes = [2, 3, 5, 7, 11, 13];
            let p1, p2;
            do {
                p1 = getRandomEl(primes);
                p2 = getRandomEl(primes.filter(x => x !== p1));
                baseVal = p1 * p2;
            } while (baseVal > 50);
            baseFactors = [p1, p2];
        }

        // ==========================================
        // ШАГ 2: Формируем три числа
        // ==========================================
        
        let f1 = [...baseFactors];
        let f2 = [...baseFactors];
        let f3 = [...baseFactors];

        // 1. Общий множитель для f1 и f2 (локальный НОД > глобального)
        const commonFor1and2 = getRandomEl([2, 3, 5]); 
        f1.push(commonFor1and2);
        f2.push(commonFor1and2);

        // 2. Индивидуальные добавки для f1 и f2
        const extra1 = getRandomEl([2, 3, 5, 7]);
        let extra2 = getRandomEl([2, 3, 5, 7]);
        
        while (extra2 === extra1) {
            extra2 = getRandomEl([2, 3, 5, 7]);
        }
        f1.push(extra1);
        f2.push(extra2);

        // 3. Формируем f3
        // 50% шанс: f3 = база
        // 50% шанс: f3 = база * p (где p != commonFor1and2)
        const isThirdNumberBase = Math.random() > 0.5;

        if (!isThirdNumberBase) {
            const possibleExtras = [2, 3, 5, 7].filter(x => x !== commonFor1and2);
            f3.push(getRandomEl(possibleExtras));
        }
        
        // ==========================================
        // ШАГ 3: Проверка уникальности
        // ==========================================
        while (getKey(f1) === getKey(f3) || getKey(f2) === getKey(f3)) {
            f3.push(2); 
        }

        // ==========================================
        // ШАГ 4: Вывод
        // ==========================================

        const allFactors = shuffleArray([f1, f2, f3]);
        const displays = allFactors.map(f => formatFactorsToLatex(f));

        let commonDivisors = [];
        for (let i = 1; i * i <= baseVal; i++) {
            if (baseVal % i === 0) {
                commonDivisors.push(i);
                if (i * i !== baseVal) commonDivisors.push(baseVal / i);
            }
        }
        commonDivisors.sort((a, b) => a - b);
        const answerString = commonDivisors.join(", ");

        return {
            variables: { 
                displays, 
                divisors: commonDivisors, 
                answer: answerString 
            },
            problemText: `Даны три числа, записанные в виде разложения на простые множители:
            $$a = ${displays[0]}$$
            $$b = ${displays[1]}$$
            $$c = ${displays[2]}$$<br>
            
            Найдите и запишите все <b>общие делители</b> этих трёх чисел.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9,]/.test(cleanInput)) return false;

        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);
        userDivisors = [...new Set(userDivisors)];
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        if (userDivisors.length !== correctDivisors.length) return false;
        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
},

{
    type: " ",
    number: "5count15",
    tags: ["5_класс", "делители", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];
        
        // Хелпер: НОД
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));

        // Хелпер: Получение всех делителей числа
        const getDivisors = (n) => {
            let res = [];
            for (let i = 1; i * i <= n; i++) {
                if (n % i === 0) {
                    res.push(i);
                    if (i * i !== n) res.push(n / i);
                }
            }
            return res.sort((a, b) => a - b);
        };

        // Хелпер: Определение лимита согласно условию
        const getMaxLimit = (n) => {
            if (n % 10 === 0) return 300;
            if (n % 5 === 0) return 150;
            return 100;
        };

        // СПИСОК ВАЛИДНЫХ НОД (GCD)
        // Условия: <= 30, произведение 2 или 3 простых, кол-во делителей от 3 до 6.
        // Исключены: 30 (8 делителей), 16 (4 простых множителя), 24 (4 простых множителя) и т.д.
        const validGCDs = [
            4,  // 2*2 (3 делителя)
            6,  // 2*3 (4 делителя)
            8,  // 2*2*2 (4 делителя)
            9,  // 3*3 (3 делителя)
            10, // 2*5 (4 делителя)
            12, // 2*2*3 (6 делителей)
            14, // 2*7 (4 делителя)
            15, // 3*5 (4 делителя)
            18, // 2*3*3 (6 делителей)
            20, // 2*2*5 (6 делителей)
            21, // 3*7 (4 делителя)
            22, // 2*11 (4 делителя)
            25, // 5*5 (3 делителя)
            26, // 2*13 (4 делителя)
            27, // 3*3*3 (4 делителя)
            28  // 2*2*7 (6 делителей)
        ];

        let numA, numB, chosenGCD;
        let validPair = false;

        // Генерируем, пока не попадем в условия диапазонов
        while (!validPair) {
            chosenGCD = getRandomEl(validGCDs);

            // Генерируем множители k1 и k2
            // Они должны быть взаимно простыми, чтобы НОД(a,b) остался равен chosenGCD
            // Ограничим k небольшим числом, чтобы не улететь далеко за 300 сразу
            let k1 = getRandomInt(2, 15);
            let k2 = getRandomInt(2, 15);

            if (k1 === k2) continue;
            if (gcd(k1, k2) !== 1) continue;

            numA = chosenGCD * k1;
            numB = chosenGCD * k2;

            // Проверка диапазонов
            // Нижняя граница 10
            if (numA < 10 || numB < 10) continue;

            // Верхние границы по условию
            if (numA > getMaxLimit(numA)) continue;
            if (numB > getMaxLimit(numB)) continue;

            validPair = true;
        }

        // Вычисляем правильный ответ (общие делители)
        // Общие делители a и b — это все делители их НОД
        const commonDivisors = getDivisors(chosenGCD);
        const answerString = commonDivisors.join(", ");

        return {
            variables: { 
                numA, 
                numB, 
                divisors: commonDivisors, 
                answer: answerString 
            },
            problemText: `Найдите и запишите все общие делители чисел ${numA} и ${numB}`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        // Разрешаем цифры и запятые
        if (/[^0-9,]/.test(cleanInput)) return false;

        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);
        
        // Убираем дубли и сортируем
        userDivisors = [...new Set(userDivisors)];
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        if (userDivisors.length !== correctDivisors.length) return false;
        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
}, 

{
    type: " ",
    number: "5count14",
    tags: ["5_класс", "делители", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];
        
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const formatFactorsToLatex = (factors) => {
            const counts = {};
            factors.forEach(x => { counts[x] = (counts[x] || 0) + 1; });
            const unique = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return unique.map(base => {
                const deg = counts[base];
                return deg > 1 ? `${base}^{${deg}}` : `${base}`;
            }).join(" \\cdot ");
        };

        let factorsA = [];
        let factorsB = [];

        // ВЕРОЯТНОСТЬ 1: Сценарий "Малые числа" (20%)
        // Здесь ВСЕГДА есть степени в B.
        const globalScenario = Math.random();

        if (globalScenario < 0.2) {
            const smallPrimes = [2, 3, 5, 7];
            let valid = false;
            while (!valid) {
                factorsA = Array.from({length: 3}, () => getRandomEl(smallPrimes));
                factorsB = Array.from({length: 5}, () => getRandomEl(smallPrimes));

                const valA = factorsA.reduce((a, b) => a * b, 1);
                const valB = factorsB.reduce((a, b) => a * b, 1);
                const valLCM = lcm(valA, valB);

                if (valLCM < 100 || (valLCM < 200 && valLCM % 10 === 0)) {
                    valid = true;
                }
            }

        } else {
            // ВЕРОЯТНОСТЬ 2: Сценарий "Общий" (80%)
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

            // 1. Выбор p1, p2
            let p1, p2;
            do {
                p1 = getRandomEl(primes);
                p2 = getRandomEl(primes.filter(x => x !== p1));
            } while (p1 * p2 >= 100);

            // 2. Выбор p3, p4 (уникальные)
            let remaining = primes.filter(x => x !== p1 && x !== p2);
            const p3 = getRandomEl(remaining);
            remaining = remaining.filter(x => x !== p3);
            const p4 = getRandomEl(remaining);
            remaining = remaining.filter(x => x !== p4);

            // Формируем A
            const typeA = Math.random() > 0.5 ? 'full' : 'short';
            factorsA = (typeA === 'full') ? [p1, p2, p3] : [p1, p2];

            // Формируем B
            factorsB = [p1, p2, p4];

            // --- БАЛАНСИРОВКА ВНУТРИ ОБЩЕГО СЦЕНАРИЯ ---
            // Было > 0.75. Ставим > 0.6 (это даст 40% вероятность срабатывания ветки 'repeat')
            // Итоговая вероятность степеней: 0.2 (сценарий 1) + 0.8 * 0.4 (сценарий 2) = 0.52
            const typeB = Math.random() > 0.6 ? 'repeat' : 'standard';

            if (typeB === 'repeat') {
                factorsB.push(Math.random() > 0.5 ? p1 : p2);
            } else {
                // В этой ветке все множители будут уникальными (степеней нет)
                const smallInBase = [p1, p2, p4].some(x => x < 10);
                if (smallInBase) {
                    const smallAvailable = remaining.filter(x => x < 10);
                    if (smallAvailable.length > 0) {
                        factorsB.push(getRandomEl(smallAvailable));
                    }
                }
            }
        }

        // --- ФИНАЛИЗАЦИЯ ---
        const numA = factorsA.reduce((a, b) => a * b, 1);
        const numB = factorsB.reduce((a, b) => a * b, 1);

        const gcdVal = gcd(numA, numB);
        
        let divisors = [];
        for (let i = 1; i * i <= gcdVal; i++) {
            if (gcdVal % i === 0) {
                divisors.push(i);
                if (i * i !== gcdVal) {
                    divisors.push(gcdVal / i);
                }
            }
        }
        divisors.sort((a, b) => a - b);
        const answerString = divisors.join(", ");

        const displayA = formatFactorsToLatex(factorsA);
        const displayB = formatFactorsToLatex(factorsB);

        return {
            variables: { 
                factorsA, 
                factorsB, 
                divisors, 
                answer: answerString 
            },
            problemText: `Даны два числа $a$ и $b$, записанные в виде произведения простых множителей:<br>
            $$a = ${displayA}$$
            $$b = ${displayB}$$<br>
            Запишите все общие делители этих чисел.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        if (/[^0-9,]/.test(cleanInput)) return false;

        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);
        userDivisors = [...new Set(userDivisors)];
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        if (userDivisors.length !== correctDivisors.length) return false;
        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
},

{
    type: " ",
    number: "5count13",
    tags: ["5_класс", "делители", "степени", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        let factors = [];
        const scenario = Math.random() > 0.5 ? 1 : 2;

        if (scenario === 1) {
            // Сценарий 1: 3 одинаковых множителя (<= 7) + 1 множитель (от 7 до 19)
            const baseCube = getRandomEl([2, 3, 5, 7]);
            const singleMultiplier = getRandomEl([7, 11, 13, 17, 19]);
            factors = [baseCube, baseCube, baseCube, singleMultiplier];

        } else {
            // Сценарий 2: Две пары одинаковых множителей.
            // Первая пара: основание <= 5
            const basePair1 = getRandomEl([2, 3, 5]);
            
            // Вторая пара: основание <= 7, но не равное первому
            const group2Options = [2, 3, 5, 7].filter(x => x !== basePair1);
            const basePair2 = getRandomEl(group2Options);

            factors = [basePair1, basePair1, basePair2, basePair2];
        }

        // Вычисляем само число
        const number = factors.reduce((a, b) => a * b, 1);

        // --- НОВОЕ УСЛОВИЕ: Число должно быть не больше 300 ---
        // Если число больше 300, генерируем заново
        if (number > 300) {
            return this.generate();
        }

        // --- Формирование строки со степенями (LaTeX) ---
        factors.sort((a, b) => a - b);
        
        const counts = {};
        factors.forEach(x => { counts[x] = (counts[x] || 0) + 1; });

        const parts = [];
        const uniqueFactors = Object.keys(counts).map(Number).sort((a, b) => a - b);
        
        uniqueFactors.forEach(base => {
            const exponent = counts[base];
            if (exponent > 1) {
                parts.push(`${base}^{${exponent}}`);
            } else {
                parts.push(`${base}`);
            }
        });

        const factorizationDisplay = parts.join(" \\cdot ");

        // --- Поиск всех делителей ---
        let divisors = [];
        for (let i = 1; i * i <= number; i++) {
            if (number % i === 0) {
                divisors.push(i);
                if (i * i !== number) {
                    divisors.push(number / i);
                }
            }
        }
        
        divisors.sort((a, b) => a - b);
        const answerString = divisors.join(", ");

        return {
            variables: { number, divisors, answer: answerString },
            problemText: `Число записано в виде произведения степеней простых множителей:<br><div class="problem-expression">$$${factorizationDisplay}$$</div><br>Найдите и запишите все делители этого числа.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;

        const cleanInput = userAnswer.toString().replace(/\s+/g, '');

        if (/[^0-9,]/.test(cleanInput)) return false;

        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        if (userDivisors.length !== correctDivisors.length) return false;

        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
},

{
    type: " ",
    number: "5count12",
    tags: ["5_класс", "делители", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const groupSmall = [2, 3, 5];
        const groupMedium = [7, 11, 13, 17, 19]; 

        let factors = [];
        
        // --- Логика генерации числа (как заказывали) ---
        const scenario = Math.random() > 0.5 ? 0 : 1;

        if (scenario === 0) {
            // Сценарий 1: 3-4 множителя (2, 3, 5), число <= 200
            const count = getRandomInt(3, 4);
            for (let i = 0; i < count; i++) {
                factors.push(getRandomEl(groupSmall));
            }
            
            const tempNumber = factors.reduce((a, b) => a * b, 1);
            if (tempNumber > 200) return this.generate();

        } else {
            // Сценарий 2: 1 средний (7-19) + 2 малых (2, 3, 5)
            factors.push(getRandomEl(groupMedium));
            factors.push(getRandomEl(groupSmall));
            factors.push(getRandomEl(groupSmall));
        }

        // Вычисляем само число
        const number = factors.reduce((a, b) => a * b, 1);

        // Сортируем множители для красивого отображения в условии
        factors.sort((a, b) => a - b);
        const factorizationDisplay = factors.join(" · ");

        // --- Поиск всех делителей ---
        let divisors = [];
        for (let i = 1; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                divisors.push(i);
                if (i !== number / i) {
                    divisors.push(number / i);
                }
            }
        }
        
        // Сортируем делители по возрастанию
        divisors.sort((a, b) => a - b);

        // Строка правильного ответа
        const answerString = divisors.join(", ");

        return {
            variables: { number, divisors, answer: answerString },
            // В условии показываем разложение, а просим найти делители
            problemText: `Число записано в виде разложения на простые множители: <div class="problem-expression">${factorizationDisplay}</div><br>Запишите все делители этого числа.`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;

        // 1. Убираем пробелы
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');

        // 2. Проверка символов (только цифры и запятые)
        if (/[^0-9,]/.test(cleanInput)) return false;

        // 3. Разбиваем строку и превращаем в числа
        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);

        // 4. Сортируем (чтобы порядок ввода не влиял на правильность, если ученик пропустит одно число, но напишет остальные вразнобой)
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        // 5. Сравнение
        if (userDivisors.length !== correctDivisors.length) return false;

        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
},

{
    type: " ",
    number: "5count11",
    tags: ["5_класс", "делители", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const groupSmall = [2, 3, 5];
        const groupMedium = [7, 11, 13, 17, 19]; // Простые > 5 и < 20

        let factors = [];
        
        // Выбираем сценарий: 
        // 0 - только малые множители (2,3,5)
        // 1 - есть один средний множитель
        const scenario = Math.random() > 0.5 ? 0 : 1;

        if (scenario === 0) {
            // Условие: 3-4 множителя, только 2, 3 или 5. Число <= 200.
            const count = getRandomInt(3, 4);
            for (let i = 0; i < count; i++) {
                factors.push(getRandomEl(groupSmall));
            }
            
            const tempNumber = factors.reduce((a, b) => a * b, 1);
            
            // Если число превысило 200 - перегенерируем
            if (tempNumber > 200) return this.generate();

        } else {
            // Условие: 3 множителя. Ровно 1 средний, остальные 2 малых.
            factors.push(getRandomEl(groupMedium));
            factors.push(getRandomEl(groupSmall));
            factors.push(getRandomEl(groupSmall));
            
            // Здесь жесткого ограничения на 200 нет в описании, 
            // но максимум будет 19 * 5 * 5 = 475, что приемлемо.
        }

        const number = factors.reduce((a, b) => a * b, 1);

        // Находим все делители полученного числа
        let divisors = [];
        for (let i = 1; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                divisors.push(i);
                if (i !== number / i) {
                    divisors.push(number / i);
                }
            }
        }
        
        // Сортируем делители по возрастанию
        divisors.sort((a, b) => a - b);

        // Формируем строку ответа для подсказки
        const answerString = divisors.join(", ");

        return {
            variables: { number, divisors, answer: answerString },
            problemText: `Найдите все делители числа:<br><div class="problem-expression">${number}</div><br>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;

        // 1. Убираем пробелы
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');

        // 2. Проверка на недопустимые символы
        if (/[^0-9,]/.test(cleanInput)) return false;

        // 3. Разбиваем строку ученика по запятой
        let userDivisors = cleanInput.split(',').filter(el => el !== "").map(Number);

        // 4. Сортируем массив ученика
        userDivisors.sort((a, b) => a - b);

        const correctDivisors = vars.divisors;

        // 5. Сравнение
        if (userDivisors.length !== correctDivisors.length) return false;

        for (let i = 0; i < correctDivisors.length; i++) {
            if (userDivisors[i] !== correctDivisors[i]) return false;
        }

        return true;
    }
},

{
    type: " ",
    number: "5count10",
    tags: ["5_класс", "разложение_на_множители"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const groupA = [2, 3, 5];
        const groupB = [7, 11, 13];
        const groupC = [17, 19, 23, 29, 31, 37, 41, 43, 47];
        const groupA_restricted = [2, 5];

        let factors = [];
        
        const getRestrictedA = (count) => {
            const res = [];
            const useThree = Math.random() > 0.5;
            if (useThree) res.push(3);
            while (res.length < count) {
                res.push(getRandomEl(groupA_restricted));
            }
            return res;
        };

        const scenario = getRandomInt(1, 4);

        if (scenario === 1) {
            const count = getRandomInt(5, 6);
            for (let i = 0; i < count; i++) factors.push(getRandomEl(groupA));
            if (factors.every(x => x === 3)) return this.generate();

        } else if (scenario === 2) {
            factors.push(getRandomEl(groupB));
            factors.push(getRandomEl(groupB));
            factors.push(getRandomEl(groupA));

        } else if (scenario === 3) {
            factors.push(getRandomEl(groupB));
            factors.push(...getRestrictedA(3));

        } else {
            factors.push(getRandomEl(groupC));
            const countA = getRandomInt(2, 3);
            factors.push(...getRestrictedA(countA));
        }

        const number = factors.reduce((a, b) => a * b, 1);

        if (number < 50 || number > 3000) return this.generate();

        // Сортируем правильные множители для порядка
        factors.sort((a, b) => a - b);
        
        // Формируем эталонный ответ через *, без пробелов
        const answerString = factors.join("*");

        return {
            variables: { number, factors, answer: answerString },
            problemText: `Разложите число на простые множители:<br><div class="problem-expression">${number}</div>`
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        
        // 1. Убираем все пробелы
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        
        // 2. Разбиваем по знаку *, преобразуем в числа и сортируем
        const userFactors = cleanInput.split('*').map(Number).sort((a, b) => a - b);
        
        // 3. Берем эталонные множители (они уже отсортированы в generate, но для надежности можно и тут)
        const correctFactors = vars.factors;

        // 4. Сравниваем длину массивов
        if (userFactors.length !== correctFactors.length) return false;

        // 5. Поэлементное сравнение
        for (let i = 0; i < correctFactors.length; i++) {
            if (userFactors[i] !== correctFactors[i]) return false;
        }

        return true;
    }
},

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