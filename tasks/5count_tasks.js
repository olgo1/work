// 5count50 - текстовая задача, поиск количества пар делителей (детей делят на команды)
// 5count49 - текстовая задача, поиск количества пар делителей (предметы делят между детьми)
// 5count48 - текстовая задача, поиск количества пар делителей (площадь прямоугольника)
// 5count47 - текстовая задача, НОК, чтение книги
// 5count46 - текстовая задача, НОД, напиток в бидоне
// 5count45 - текстовая задача, НОК, напиток в бидоне
// 5count44 - текстовая задача, НОД, ученики на регате
// 5count43 - текстовая задача, НОК, ученики на регате
// 5count42 - текстовая задача, НОК, труба
// 5count41 - текстовая задача, НОД, труба
// 5count40 - текстовая задача, НОД, фрукты
// 5count39 - текстовая задача, НОК, фрукты
// 5count38 - текстовая задача, НОД, квадраты
// 5count37 - текстовая задача, НОК, квадраты
// 5count36 - текстовая задача, НОК, отрезки
// 5count35 - текстовая задача, НОД, отрезки
// 5count34 - текстовая задача, НОК, тетради
// 5count33 - текстовая задача, НОД, тетради
// 5count32 - текстовая задача, НОК, сладости
// 5count31 - текстовая задача, НОД, сладости
// 5count30 - найти НОД двух чисел среди данного набора 
// 5count29 - найти НОД трёх чисел, записанных в виде произведения степеней
// 5count28 - найти НОД трёх чисел, 2 из которых записаны в виде разложения на простые множители, а третье - по степеням
// [проверено] 5count27 - найти НОД трёх чисел, записанных в виде разложения на простые множители
// [проверено] 5count26 - найти НОД двух чисел, одно записано в виде разложения на простые множители (со степенями), второе в десятичном виде
// [проверено] 5count25 - найти частное a : b. Число a записано в виде произведения степеней простых множителей, b - в виде произведения простых множителей.
// [проверено] 5count24 - найти неизвестный простой множитель в разложении a, если известно, что a кратно b (b записано в десятичной системе счисления)
// [проверено] 5count23 - какое из чисел a, b, c кратно числу d? (a, b, c записаны в виде произведения, число d - в десятичном виде)
// [проверено] 5count22 - найти, сколько чисел из данного диапазона кратны данному числу
// [проверено] 5count21 - среди ряда чисел выбрать то, которое не кратно данному (все числа записаны в десятичном виде). Основано на периодичности остатка
// [проверено] 5count20 - найти НОД двух чисел, записанных в виде произведения простых (одно со степенями, второе без степеней)
// [проверено] 5count19 - найти НОД двух чисел, записанных в виде разложения на простые множители (со степенями)
// [проверено] 5count18 - найти НОД двух чисел, записанных в виде разложения на простые множители (без степеней)
// [проверено] 5count17 -  найти НОД двух чисел, записанных в виде десятичных чисел
// [проверено. сложно!] 5count16 - найти общие делители трёх чисел, записанных в виде разложение на простые, со степенями
// [проверено] 5count15 - найти общие делители двух чисел, записанных в дес. системе счисления
// 5count14 - найти общие делители чисел, записанных в виде произведения простых множителей (возможно, со степенями)
//[проверено] 5count13 - найти все делители числа, разложенного на простые множители (разложение записано по степеням)
// [проверено]  5count12 - найти все делители числа, разложенного на простые множители (разложение записано в виде произведения)
// [проверено] 5count11 - найти все делители числа
// [проверено] 5count10 - разложить число на простые множители
{
    type: " ",
    number: "5count50",
    tags: ["5_класс", "делители", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const getAllDivisors = (n) => {
            let divs = [];
            for (let i = 1; i <= n; i++) {
                if (n % i === 0) divs.push(i);
            }
            return divs;
        };

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;
            
            // Выбираем n из подходящих чисел (не кратных 10, чтобы k не было делителем)
            const possibleN = [72, 84, 96, 108, 126, 132, 144, 156, 168];
            const N = possibleN[getRandomInt(0, possibleN.length - 1)];
            const allDivs = getAllDivisors(N);
            
            // Нам нужно 4, 5 или 6 ответов.
            // При этом ответы (количество детей в команде) должны быть <= 15.
            const smallDivs = allDivs.filter(d => d <= 15);
            
            const targetCount = getRandomInt(4, 6);
            if (smallDivs.length < targetCount) continue;

            // dMaxValid — это самый большой подходящий ответ (кол-во человек в команде).
            const dMaxValid = smallDivs[targetCount - 1]; 
            // dFirstInvalid — следующий делитель n, который уже не должен подходить.
            const dFirstInvalid = allDivs[allDivs.indexOf(dMaxValid) + 1];
            if (!dFirstInvalid) continue;

            // Находим границы для k (количество команд):
            // k <= N / d_max_valid  И  k > N / d_first_invalid
            const lowerBound = N / dFirstInvalid;
            const upperBound = N / dMaxValid;

            // Ищем круглое число k, которое не делит N
            let possibleLimits = [];
            for (let k = 10; k <= 200; k += 10) {
                if (k > lowerBound && k <= upperBound && N % k !== 0) {
                    possibleLimits.push(k);
                }
            }

            if (possibleLimits.length === 0) continue;

            const limit = possibleLimits[getRandomInt(0, possibleLimits.length - 1)];
            const resultDivs = smallDivs.slice(0, targetCount);

            let question = `${N} детей нужно разделить на команды так, чтобы в каждой команде было одинаковое количество человек, причём в команде должно быть не больше 15 человек. Сколько детей может быть в одной команде? Перечислите все возможные варианты через запятую.`;

            return {
                variables: { 
                    ans: resultDivs.join(", "), 
                    total: N, 
                    lim: limit 
                },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count49",
    tags: ["5_класс", "делители", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const getAllDivisors = (n) => {
            let divs = [];
            for (let i = 1; i <= n; i++) {
                if (n % i === 0) divs.push(i);
            }
            return divs;
        };

        const itemsData = ["яблок", "конфет", "карандашей", "наклеек", "пряников"];

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            
            // Числа с большим количеством делителей
            const possibleN = [60, 72, 80, 84, 90, 96, 100, 108, 120, 144, 150, 180];
            const N = possibleN[getRandomInt(0, possibleN.length - 1)];
            const allDivs = getAllDivisors(N);
            
            // Нам нужно 4, 5 или 6 ответов.
            // Это значит, что нам нужны делители x такие, что x = N/D и D >= limit.
            // Это эквивалентно x <= N/limit.
            const targetCount = getRandomInt(4, 6);
            if (allDivs.length <= targetCount) continue;

            // Находим диапазон для limit:
            // d_count <= N/limit < d_{count+1}
            // Отсюда: N/d_{count+1} < limit <= N/d_count
            const dLow = allDivs[targetCount - 1]; // d_count
            const dHigh = allDivs[targetCount];   // d_{count+1}
            
            const lowerBound = N / dHigh;
            const upperBound = N / dLow;

            // Ищем кратное 10 в интервале (lowerBound, upperBound]
            let possibleLimits = [];
            for (let l = Math.floor(lowerBound / 10) * 10; l <= upperBound; l += 10) {
                if (l > lowerBound && l <= upperBound) {
                    possibleLimits.push(l);
                }
            }

            if (possibleLimits.length === 0) continue;

            // Стараемся выбрать limit, который не является делителем N
            let limit = possibleLimits.find(l => N % l !== 0) || possibleLimits[0];

            const itemWord = itemsData[getRandomInt(0, itemsData.length - 1)];
            const resultDivs = allDivs.slice(0, targetCount);

            let question = `${N} ${itemWord} разделили поровну между несколькими детьми. По сколько ${itemWord} мог получить каждый, если детей было не меньше ${limit}? Перечислите все возможные варианты через запятую.`;

            return {
                variables: { 
                    ans: resultDivs.join(", "), 
                    total: N, 
                    lim: limit 
                },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count48",
    tags: ["5_класс", "делители", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const getDivisorPairsCount = (n) => {
            let count = 0;
            // Идем до корня из n, чтобы найти все пары
            for (let i = 1; i <= Math.sqrt(n); i++) {
                if (n % i === 0) {
                    count++;
                }
            }
            return count;
        };

        let attempts = 0;
        while (attempts < 1000) {
            attempts++;
            
            // Выбираем площадь. Диапазон 24-120 обычно дает интересное количество делителей.
            const S = getRandomInt(24, 120);
            
            // Считаем количество возможных пар сторон
            const answer = getDivisorPairsCount(S);
            
            // Пропускаем числа с малым количеством делителей (нужно минимум 3 варианта)
            if (answer < 3) continue;

            let question = `Площадь прямоугольника равна ${S}, а длины его сторон — целые числа. Сколько различных прямоугольников с такой площадью существует?`;

            return {
                variables: { ans: answer, area: S },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count47",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        // Список имен из вашего запроса
        const namesList = [
            'Саша', 'Аня', 'Маша', 'Соня', 'Давид', 'Серёжа', 
            'Гриша', 'Даня', 'Егор', 'Миша', 'Алиса', 'Алина', 'Катя', 'Ксюша'
        ];

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            
            let a = getRandomInt(6, 15);
            let b = getRandomInt(8, 20);
            if (a > b) [a, b] = [b, a];

            // Математические фильтры: НОД >= 3, большее не делится на меньшее
            const currentGCD = gcd(a, b);
            if (currentGCD < 3 || b % a === 0) continue;

            const resLCM = lcm(a, b);
            const mode = getRandomInt(1, 2); // 1 - один ответ, 2 - от 2 до 4 ответов
            
            let question, answer;

            // Перемешиваем имена и берем два разных
            const shuffledNames = [...namesList].sort(() => Math.random() - 0.5);
            const p1 = shuffledNames[0];
            const p2 = shuffledNames[1];

            if (mode === 1) {
                // Вариант с одним ответом
                const targetP = resLCM;
                if (targetP < 30 || targetP > 250) continue;
                if (a % 10 === 0 && b % 10 === 0 && targetP % 10 === 0) continue;
                if (targetP === a * b) continue;

                // Ограничение кратно 10
                const limit = Math.ceil((targetP + 5) / 10) * 10;
                
                let bCount = 0, lcmCount = 0;
                for (let i = b; i <= limit; i += b) bCount++;
                for (let i = resLCM; i <= limit; i += resLCM) lcmCount++;
                
                // Проверка ловушки и единственности НОК
                if (lcmCount !== 1 || bCount < 2) continue;

                question = `В книге не более ${limit} страниц. ${p1} прочитала её за ${a} дней, читая одинаковое количество страниц каждый день, а ${p2} — за ${b} дней (также читая одинаковое количество страниц каждый день). Сколько страниц в книге?`;
                answer = targetP;
            } else {
                // Вариант с несколькими ответами (2-4 подходящих числа)
                const count = getRandomInt(2, 4);
                const lastTarget = resLCM * count;
                if (lastTarget > 350) continue;

                const limit = Math.ceil((lastTarget + 5) / 10) * 10;
                
                let foundLCMs = [];
                let bCount = 0;
                for (let i = 1; i <= limit; i++) {
                    if (i % b === 0) bCount++;
                    if (i % resLCM === 0) foundLCMs.push(i);
                }
                
                // Проверка: количество НОК совпадает с задуманным, кратных b больше, чем НОК
                if (foundLCMs.length !== count || bCount < count + 1) continue;

                question = `В книге не более ${limit} страниц. ${p1} прочитала её за ${a} дней, читая одинаковое количество страниц каждый день, а ${p2} — за ${b} дней (также читая одинаковое количество страниц каждый день). Сколько страниц может быть в книге? Перечислите все возможные варианты через запятую.`;
                answer = foundLCMs.join(", ");
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count46",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const isComposite = (n) => {
            if (n < 4) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return true;
            }
            return false;
        };

        const bookData = [
            { a: 'учебников', b: 'словарей', loc: 'В библиотеку' },
            { a: 'энциклопедий', b: 'атласов', loc: 'В книжный магазин' },
            { a: 'детективов', b: 'романов', loc: 'На склад' },
            { a: 'сказок', b: 'рассказов', loc: 'В школьную библиотеку' }
        ];

        let attempts = 0;
        while (attempts < 3000) {
            attempts++;
            
            const resGCD = getRandomInt(6, 18);
            
            if (resGCD < 3 || !isComposite(resGCD)) continue;

            const k1 = getRandomInt(2, 9);
            const k2 = getRandomInt(2, 9);
            
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const totalA = resGCD * k1;
            const totalB = resGCD * k2;

            if (totalA % 10 === 0 && totalB % 10 === 0 && resGCD % 10 === 0) continue;
            
            if (totalA > 200 || totalB > 200 || totalA < 24 || totalB < 24) continue;

            const item = bookData[getRandomInt(0, bookData.length - 1)];
            const mode = getRandomInt(1, 2); 
            
            let question = `${item.loc} привезли ${totalA} ${item.a} и ${totalB} ${item.b}. `;
            question += `Все эти книги нужно разложить в одинаковые пачки так, чтобы в каждой пачке было одинаковое количество книг и книги разных видов не смешивались. `;
            
            let answer;
            if (mode === 1) {
                question += `Какое наибольшее количество книг может быть в каждой такой пачке?`;
                answer = resGCD;
            } else {
                const choice = getRandomInt(1, 2);
                if (choice === 1) {
                    question += `Сколько получится пачек с ${item.a}, если в каждой пачке будет максимально возможное количество книг?`;
                    answer = k1;
                } else {
                    question += `Сколько получится пачек с ${item.b}, если в каждой пачке будет максимально возможное количество книг?`;
                    answer = k2;
                }
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count45",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const liquidData = [
            { nom: 'молоко', gen: 'молока', pron: 'всё это', loc: 'На ферме' },
            { nom: 'ряженка', gen: 'ряженки', pron: 'всю эту', loc: 'На ферме' },
            { nom: 'компот', gen: 'компота', pron: 'весь этот', loc: 'На фабрике' },
            { nom: 'морс', gen: 'морса', pron: 'весь этот', loc: 'На фабрике' },
            { nom: 'кисель', gen: 'киселя', pron: 'весь этот', loc: 'В столовой' }
        ];

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            
            let a = getRandomInt(6, 24);
            let b = getRandomInt(9, 30);
            if (a > b) [a, b] = [b, a];

            const currentGCD = gcd(a, b);
            
            if (currentGCD < 3) continue;
            if (b % a === 0) continue;

            const resLCM = lcm(a, b);
            const multiplier = getRandomInt(1, 2);
            const targetV = resLCM * multiplier;

            if (targetV < 40 || targetV > 360) continue;
            if (a % 10 === 0 && b % 10 === 0 && targetV % 10 === 0) continue;
            if (targetV === a * b) continue;

            const trapV = (targetV - b > 0) ? targetV - b : targetV + b;
            const minBound = Math.min(targetV, trapV);
            const maxBound = Math.max(targetV, trapV);
            
            const lower = minBound - getRandomInt(3, 7);
            const upper = maxBound + getRandomInt(3, 7);

            let lcmCount = 0;
            let bCount = 0;
            for (let i = lower + 1; i < upper; i++) {
                if (i % resLCM === 0) lcmCount++;
                if (i % b === 0) bCount++;
            }
            if (lcmCount !== 1 || bCount < 2) continue;

            const item = liquidData[getRandomInt(0, liquidData.length - 1)];
            const mode = getRandomInt(1, 2); 
            
            let question = `${item.loc} имеется больше ${lower}, но меньше ${upper} л ${item.gen}. `;
            question += `Оказалось, что ${item.pron} ${item.nom} можно без остатка разлить и в бидоны по ${a} л, и в бидоны по ${b} л. `;
            
            let answer;
            if (mode === 1) {
                question += `Сколько литров ${item.gen} в наличии?`;
                answer = targetV;
            } else {
                const choice = getRandomInt(1, 2);
                const binSize = (choice === 1) ? a : b;
                question += `Сколько потребуется бидонов вместимостью ${binSize} л, чтобы разлить ${item.pron} ${item.nom}?`;
                answer = targetV / binSize;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count44",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const isComposite = (n) => {
            if (n < 4) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return true;
            }
            return false;
        };

        const events = [
            { name: "математической регате", prep: "на регату" },
            { name: "олимпиаду", prep: "на олимпиаду" },
            { name: "математическом бое", prep: "на бой" },
            { name: "соревновании", prep: "на соревнование" },
            { name: "турнире", prep: "на турнир" }
        ];

        const groups = [
            { a: "мальчиков", b: "девочек" },
            { a: "пятиклассников", b: "шестиклассников" },
            { a: "учеников с Крупской", b: "учеников с Новаторов" }
        ];

        let attempts = 0;
        while (attempts < 3000) {
            attempts++;
            
            const resGCD = getRandomInt(4, 16);
            if (!isComposite(resGCD)) continue;

            const k1 = getRandomInt(2, 9);
            const k2 = getRandomInt(2, 9);
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const totalA = resGCD * k1;
            const totalB = resGCD * k2;

            if (totalA % 10 === 0 && totalB % 10 === 0 && resGCD % 10 === 0) continue;
            
            if (totalA > 150 || totalB > 150 || totalA < 20 || totalB < 20) continue;

            const event = events[getRandomInt(0, events.length - 1)];
            const group = groups[getRandomInt(0, groups.length - 1)];
            const mode = getRandomInt(1, 2); 
            
            let question = `Для участия в ${event.name} собрались ${totalA} ${group.a} и ${totalB} ${group.b}. `;
            question += `Их нужно разделить на одинаковые команды так, чтобы во всех командах было одинаковое количество ${group.a} и одинаковое количество ${group.b}. `;
            
            let answer;
            if (mode === 1) {
                question += `Какое наибольшее количество таких команд может получиться?`;
                answer = resGCD;
            } else {
                const choice = getRandomInt(1, 2);
                if (choice === 1) {
                    question += `Сколько ${group.a} будет в каждой такой команде, если количество команд максимально возможное?`;
                    answer = k1;
                } else {
                    question += `Сколько ${group.b} будет в каждой такой команде, если количество команд максимально возможное?`;
                    answer = k2;
                }
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count43",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const events = [
            { name: "математическую регату", prep: "на регату" },
            { name: "олимпиаду", prep: "на олимпиаду" },
            { name: "математический бой", prep: "на бой" },
            { name: "соревнование", prep: "на соревнование" },
            { name: "турнир", prep: "на турнир" }
        ];

        let attempts = 0;
        while (attempts < 5000) {
            attempts++;
            
            let a = getRandomInt(6, 12);
            let b = getRandomInt(8, 15);
            if (a > b) [a, b] = [b, a];

            if (gcd(a, b) === 1 || b % a === 0) continue;

            const resLCM = lcm(a, b);
            const multiplier = getRandomInt(1, 3);
            const targetN = resLCM * multiplier;
            
            if (targetN < 40 || targetN > 180) continue;

            if (a % 10 === 0 && b % 10 === 0 && targetN % 10 === 0) continue;
            if (targetN === a * b) continue;

            const trapN = (Math.random() > 0.5) ? targetN - b : targetN + b;
            const minBound = Math.min(targetN, trapN);
            const maxBound = Math.max(targetN, trapN);
            
            const lower = minBound - getRandomInt(2, 5);
            const upper = maxBound + getRandomInt(2, 5);

            let commonMultiplesCount = 0;
            let bCount = 0;
            for (let i = lower + 1; i < upper; i++) {
                if (i % resLCM === 0) commonMultiplesCount++;
                if (i % b === 0) bCount++;
            }
            if (commonMultiplesCount !== 1 || bCount < 2) continue;

            const event = events[getRandomInt(0, events.length - 1)];

            let question = `На ${event.name} пришло больше ${lower}, но меньше ${upper} учеников. `;
            question += `Оказалось, что их можно разделить и на команды по ${a} человек, и на команды по ${b} человек. `;
            question += `Сколько учеников пришли ${event.prep}?`;

            return {
                variables: { ans: targetN },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count42",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const pluralizeFeet = (n) => {
            const cases = [2, 0, 1, 1, 1, 2];
            const titles = ['фут', 'фута', 'футов'];
            return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
        };

        const unitsData = [
            { abbr: 'м', isMetric: true },
            { abbr: 'дм', isMetric: true },
            { abbr: 'фут', isMetric: false }
        ];

        let attempts = 0;
        while (attempts < 3000) {
            attempts++;
            
            const a = getRandomInt(4, 18);
            const b = getRandomInt(4, 20);
            const bigger = Math.max(a, b);
            
            if (a === b || gcd(a, b) === 1) continue;

            const resLCM = lcm(a, b);
            const multiplier = getRandomInt(1, 2);
            const targetL = resLCM * multiplier;
            
            if (targetL > 280 || targetL < 20) continue;
            if (a % 10 === 0 && b % 10 === 0 && targetL % 10 === 0) continue;
            if (targetL === a * b) continue;

            const unit = unitsData[getRandomInt(0, unitsData.length - 1)];
            const phrasingType = getRandomInt(1, 2); 
            
            let rangeText = "";
            if (phrasingType === 1) {
                const trapL = (targetL - bigger > 0) ? targetL - bigger : targetL + bigger;
                const minB = Math.min(targetL, trapL);
                const maxB = Math.max(targetL, trapL);
                
                const lower = Math.floor((minB - 2) / 10) * 10;
                const upper = Math.ceil((maxB + 2) / 10) * 10;
                
                let bCount = 0, lcmCount = 0;
                for(let i = lower + 1; i < upper; i++) {
                    if (i % bigger === 0) bCount++;
                    if (i % resLCM === 0) lcmCount++;
                }
                if (lcmCount !== 1 || bCount < 2 || lower === upper) continue;
                
                const unitUpper = unit.isMetric ? unit.abbr : pluralizeFeet(upper);
                rangeText = `от ${lower} до ${upper} ${unitUpper}`;
            } else {
                const limit = Math.ceil((targetL + 5) / 10) * 10;
                if (limit >= targetL + resLCM || limit <= targetL) continue;
                
                const unitLimit = unit.isMetric ? unit.abbr : pluralizeFeet(limit);
                rangeText = `не более ${limit} ${unitLimit}`;
            }

            const mode = getRandomInt(1, 3); 
            const unitA = unit.isMetric ? unit.abbr : pluralizeFeet(a);
            const unitB = unit.isMetric ? unit.abbr : pluralizeFeet(b);

            let question = `Чтобы получить трубу требуемой длины (известно, что эта длина ${rangeText}), можно стыковать либо куски по ${a} ${unitA}, либо по ${b} ${unitB}. `;
            let answer;

            if (mode === 1) {
                question += `Найдите длину трубы. Дайте ответ в ${unit.isMetric ? unit.abbr : 'футах'}.`;
                answer = targetL;
            } else if (mode === 2) {
                question += `Сколько потребуется кусков по ${a} ${unitA}?`;
                answer = targetL / a;
            } else {
                question += `Сколько потребуется кусков по ${b} ${unitB}?`;
                answer = targetL / b;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count41",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const pluralizeFeet = (n) => {
            const cases = [2, 0, 1, 1, 1, 2];
            const titles = ['фут', 'фута', 'футов'];
            return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
        };

        const unitsData = [
            { name: 'см', prep: 'см', needPlural: false },
            { name: 'дм', prep: 'дм', needPlural: false },
            { name: 'фут', prep: 'футах', needPlural: true }
        ];

        const materials = [
            'алюминиевую', 
            'стальную', 
            'медную', 
            'пластиковую', 
            'железную'
        ];

        let attempts = 0;
        while (attempts < 2000) {
            attempts++;
            
            const a = getRandomInt(4, 20);
            const b = getRandomInt(4, 25);
            
            if (a === b || gcd(a, b) === 1) continue;

            const resLCM = lcm(a, b);
            if (resLCM > 300 || resLCM < 20) continue;

            const mat = materials[getRandomInt(0, materials.length - 1)];
            const unit = unitsData[getRandomInt(0, unitsData.length - 1)];
            
            const unitA = unit.needPlural ? pluralizeFeet(a) : unit.name;
            const unitB = unit.needPlural ? pluralizeFeet(b) : unit.name;

            let question = `${mat.charAt(0).toUpperCase() + mat.slice(1)} трубу можно разрезать без остатка на куски длиной ${a} ${unitA} и ${b} ${unitB}. `;
            question += `Найдите наименьшую возможную длину трубы. Дайте ответ в ${unit.prep}.`;

            return {
                variables: { ans: resLCM },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count40",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const isComposite = (n) => {
            if (n < 4) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return true;
            }
            return false;
        };

        const locations = [
            "На складе",
            "В магазине",
            "На оптовой базе",
            "В хранилище",
            "В распределительном центре"
        ];

        const fruits = [
            { nom: 'апельсины', gen: 'апельсинов', instr: 'апельсинами' },
            { nom: 'яблоки', gen: 'яблок', instr: 'яблоками' },
            { nom: 'груши', gen: 'груш', instr: 'грушами' },
            { nom: 'сливы', gen: 'слив', instr: 'сливами' },
            { nom: 'мандарины', gen: 'мандаринов', instr: 'мандаринами' }
        ];

        let attempts = 0;
        while (attempts < 3000) {
            attempts++;
            
            const commonDiv = getRandomInt(4, 15);
            if (!isComposite(commonDiv)) continue;

            const k1 = getRandomInt(2, 8);
            const k2 = getRandomInt(2, 8);
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const weightA = commonDiv * k1;
            const weightB = commonDiv * k2;

            if (weightA > 120 || weightB > 120 || weightA < 20 || weightB < 20) continue;

            const loc = locations[getRandomInt(0, locations.length - 1)];
            const shuffled = [...fruits].sort(() => Math.random() - 0.5);
            const f1 = shuffled[0];
            const f2 = shuffled[1];

            const mode = getRandomInt(1, 2); 
            
            let question = `${loc} ${weightA} кг ${f1.gen} и ${weightB} кг ${f2.gen}. Все фрукты нужно разложить в ящики одинаковой массы так, чтобы все ящики были полными и фрукты в них не смешивались. `;
            let answer;

            if (mode === 1) {
                question += `Какую наибольшую массу может иметь один такой ящик? Дайте ответ в кг.`;
                answer = commonDiv;
            } else {
                const choice = getRandomInt(1, 2);
                if (choice === 1) {
                    question += `Сколько получится ящиков с ${f1.instr}?`;
                    answer = k1;
                } else {
                    question += `Сколько получится ящиков с ${f2.instr}?`;
                    answer = k2;
                }
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count39",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const fruits = [
            { nom: 'апельсины', gen: 'апельсинов', instr: 'апельсинами' },
            { nom: 'яблоки', gen: 'яблок', instr: 'яблоками' },
            { nom: 'груши', gen: 'груш', instr: 'грушами' },
            { nom: 'сливы', gen: 'слив', instr: 'сливами' },
            { nom: 'мандарины', gen: 'мандаринов', instr: 'мандаринами' }
        ];

        let attempts = 0;
        while (attempts < 2000) {
            attempts++;
            const a = getRandomInt(6, 18);
            const b = getRandomInt(6, 20);
            const bigger = Math.max(a, b);
            
            if (a === b || gcd(a, b) === 1) continue;

            const resLCM = lcm(a, b);
            if (resLCM > 80 || resLCM < 18) continue;

            const limit = resLCM + getRandomInt(5, Math.min(20, resLCM - 1));

            const shuffled = [...fruits].sort(() => Math.random() - 0.5);
            const f1 = shuffled[0];
            const f2 = shuffled[1];

            const mode = getRandomInt(1, 5); 
            
            let question = `Коробка вмещает либо ${a} кг ${f1.gen}, либо ${b} кг ${f2.gen}. `;
            question += `В таких коробках в магазин привезли поровну ${f1.gen} и ${f2.gen} (не больше ${limit} кг каждого вида). `;
            
            let answer;
            switch(mode) {
                case 1:
                    question += `Сколько кг ${f1.gen} привезли?`;
                    answer = resLCM;
                    break;
                case 2:
                    question += `Сколько кг ${f2.gen} привезли?`;
                    answer = resLCM;
                    break;
                case 3:
                    question += `Сколько привезли коробок с ${f1.instr}?`;
                    answer = resLCM / a;
                    break;
                case 4:
                    question += `Сколько привезли коробок с ${f2.instr}?`;
                    answer = resLCM / b;
                    break;
                case 5:
                    question += `Сколько всего коробок с фруктами привезли в магазин?`;
                    answer = (resLCM / a) + (resLCM / b);
                    break;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count38",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const isComposite = (n) => {
            if (n < 4) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return true;
            }
            return false;
        };

        let attempts = 0;
        while (attempts < 3000) {
            attempts++;
            const a = getRandomInt(16, 80);
            const b = getRandomInt(16, 90);
            
            const resGCD = gcd(a, b);
            
            if (resGCD <= 2 || !isComposite(resGCD) || a === b || resGCD === a || resGCD === b) continue;

            const units = ["см", "дм", "м"][getRandomInt(0, 2)];
            const mode = getRandomInt(1, 2); 
            
            let question = `Прямоугольник со сторонами ${a} ${units} и ${b} ${units} нужно разрезать на одинаковые квадраты без остатка. `;
            let answer;

            if (mode === 1) {
                question += `Какую наибольшую длину стороны может иметь такой квадрат? Дайте ответ в ${units}.`;
                answer = resGCD;
            } else {
                question += `На какое наименьшее число таких квадратов можно разрезать этот прямоугольник?`;
                answer = (a / resGCD) * (b / resGCD);
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count37",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        let attempts = 0;
        while (attempts < 2000) {
            attempts++;
            const a = getRandomInt(4, 16);
            const b = getRandomInt(4, 18);
            
            if (a === b || gcd(a, b) === 1) continue;
            
            const resLCM = lcm(a, b);
            if (resLCM > 60 || resLCM <= Math.max(a, b)) continue;

            const units = ["см", "дм", "м"][getRandomInt(0, 2)];
            const mode = getRandomInt(1, 2); 
            
            let question = `Квадрат можно разрезать как на квадратики со стороной ${a} ${units}, так и на квадратики со стороной ${b} ${units}. `;
            let answer;

            if (mode === 1) {
                question += `Какую наименьшую длину стороны может иметь такой квадрат? Дайте ответ в ${units}.`;
                answer = resLCM;
            } else {
                question += `Какую наименьшую площадь может иметь такой квадрат? Дайте ответ в ${units}².`;
                answer = resLCM * resLCM;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count36",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const pluralizeGenitive = (n, titles) => {
            if (n % 10 === 1 && n % 100 !== 11) return titles[0]; 
            return titles[1]; 
        };

        const unitsData = [
            { abbr: 'см', titles: ['сантиметр', 'сантиметра', 'сантиметров'], gen: ['сантиметра', 'сантиметров'] },
            { abbr: 'дм', titles: ['дециметр', 'дециметра', 'дециметров'], gen: ['дециметра', 'дециметров'] },
            { abbr: 'м', titles: ['метр', 'метра', 'метров'], gen: ['метра', 'метров'] }
        ];

        const characterGroups = [
            [
                { name: 'ученик', dative: 'ученику', verb: 'купил', acc: 'медную', gender: 'm', prefix: 'Один', other: 'другой' },
                { name: 'ученица', dative: 'ученице', verb: 'купила', acc: 'медную', gender: 'f', prefix: 'Одна', other: 'другая' }
            ],
            [
                { name: 'студент', dative: 'студенту', verb: 'купил', acc: 'медную', gender: 'm', prefix: 'Один', other: 'другой' },
                { name: 'студентка', dative: 'студентке', verb: 'купила', acc: 'медную', gender: 'f', prefix: 'Одна', other: 'другая' }
            ]
        ];

        const wireMaterials = [
            { nom: 'медная', acc: 'медную' },
            { nom: 'стальная', acc: 'стальную' },
            { nom: 'алюминиевая', acc: 'алюминиевую' },
            { nom: 'латунная', acc: 'латунную' }
        ];

        const ribbonColors = [
            { nom: 'белая', acc: 'белую' }, { nom: 'синяя', acc: 'синюю' }, { nom: 'красная', acc: 'красную' },
            { nom: 'зелёная', acc: 'зелёную' }, { nom: 'жёлтая', acc: 'жёлтую' }, { nom: 'розовая', acc: 'розовую' }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;
            
            const a = getRandomInt(4, 18);
            const b = getRandomInt(4, 18);
            const bigger = Math.max(a, b);
            if (a === b || (gcd(a, b) === 1 && (a > 12 || b > 12))) continue;

            const m1 = lcm(a, b);
            const targetL = m1 * getRandomInt(2, 5);
            if (targetL < 40 || targetL > 250) continue;

            const trapL = (targetL - bigger > 0) ? targetL - bigger : targetL + bigger;
            const minB = Math.min(targetL, trapL);
            const maxB = Math.max(targetL, trapL);
            
            const lower = minB - getRandomInt(2, 5);
            const upper = maxB + getRandomInt(2, 5);

            let lcmCount = 0;
            let bCount = 0;
            for (let i = lower + 1; i < upper; i++) {
                if (i % m1 === 0) lcmCount++;
                if (i % bigger === 0) bCount++;
            }
            if (lcmCount !== 1 || bCount < 2) continue;

            const unit = unitsData[getRandomInt(0, unitsData.length - 1)];
            const isWire = getRandomInt(0, 1) === 0;
            let itemA, itemB, nounGen;

            if (isWire) {
                const mats = [...wireMaterials].sort(() => Math.random() - 0.5);
                itemA = mats[0]; itemB = mats[1]; nounGen = "проволоки";
            } else {
                const colors = [...ribbonColors].sort(() => Math.random() - 0.5);
                itemA = colors[0]; itemB = colors[1]; nounGen = "ленты";
            }

            const group = characterGroups[getRandomInt(0, 1)];
            const p1 = group[getRandomInt(0, 1)];
            const p2 = group[getRandomInt(0, 1)];

            let personalNeeds = `Каждому `;
            if (p1.name === p2.name) {
                personalNeeds += `${p1.dative} `;
            } else {
                personalNeeds += `${p1.dative} и ${p2.dative} `;
            }

            const nameA_Nom = `${itemA.nom} ${isWire ? 'проволока' : 'лента'}`;
            const nameB_Nom = `${itemB.nom} ${isWire ? 'проволока' : 'лента'}`;

            let question = `${nameA_Nom.charAt(0).toUpperCase() + nameA_Nom.slice(1)} продается кусками по ${a} ${unit.abbr}, а ${nameB_Nom} — по ${b} ${unit.abbr} (куски не режут). `;
            question += `${personalNeeds} нужно от ${lower} до ${upper} ${pluralizeGenitive(upper, unit.gen)} ${nounGen}. `;
            question += `${p1.prefix} ${p1.name} ${p1.verb} ${itemA.acc}, а ${p2.gender === 'f' ? 'другая' : 'другой'} ${p2.name} — ${itemB.acc}. `;
            question += `Оказалось, что у них получилась одинаковая общая длина. Какая? Дайте ответ в ${unit.abbr}.`;

            return {
                variables: { ans: targetL },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: (vars) => vars.ans,
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        return userAnswer.toString().trim() === vars.ans.toString();
    }
},

{
    type: " ",
    number: "5count35",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const pluralize = (n, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
        };

        const locations = [
            { start: "В ателье", action: "купили два куска" },
            { start: "Для уроков труда", action: "подготовили два куска" },
            { start: "Во флористическом магазине", action: "использовали два куска" }
        ];

        const itemsData = [
            { name: 'ленты', unit: ['сантиметр', 'сантиметра', 'сантиметров'], prepUnit: 'сантиметрах' },
            { name: 'проволоки', unit: ['сантиметр', 'сантиметра', 'сантиметров'], prepUnit: 'сантиметрах' }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;
            
            const trueGCD = getRandomInt(8, 30);
            const k1 = getRandomInt(2, 7);
            const k2 = getRandomInt(2, 7);
            
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const valA = trueGCD * k1; 
            const valB = trueGCD * k2;

            if (valA > 250 || valB > 250) continue;

            const commonDivs = [];
            for (let i = 2; i <= trueGCD; i++) {
                if (valA % i === 0 && valB % i === 0) commonDivs.push(i);
            }
            if (commonDivs.length < 2) continue;

            const loc = locations[getRandomInt(0, locations.length - 1)];
            const item = itemsData[getRandomInt(0, itemsData.length - 1)];
            
            const unitA = pluralize(valA, item.unit);
            const unitB = pluralize(valB, item.unit);

            const mode = getRandomInt(1, 4);
            
            let question = `${loc.start} ${loc.action} ${item.name} длиной ${valA} ${unitA} и ${valB} ${unitB}. Оба куска разрезали на равные части без остатка. `;
            let answer;

            if (mode === 1) {
                question += `Какова наибольшая возможная длина каждой части в ${item.prepUnit}?`;
                answer = trueGCD;
            } else if (mode === 2) {
                const totalPieces = k1 + k2;
                question += `На какое наименьшее количество таких частей разрезали эти куски ${item.name}?`;
                answer = totalPieces;
            } else if (mode === 3) {
                question += `Какими могут быть длины частей (в ${item.prepUnit}), если они должны быть одинаковыми? Перечислите все возможные варианты через запятую в порядке возрастания.`;
                answer = commonDivs.join(", ");
            } else {
                const sorted = commonDivs.sort((a, b) => a - b);
                const secondMax = sorted[sorted.length - 2];
                const lower = secondMax + getRandomInt(1, Math.floor((trueGCD - secondMax) / 2) + 1);
                const upper = trueGCD + getRandomInt(2, 10);
                
                question += `Какова длина каждой части, если в ${item.prepUnit} она выражается числом больше ${lower}, но меньше ${upper}?`;
                answer = trueGCD;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count34",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);

        const locationStarts = [
            "Для подготовительных курсов", "Для школы", "Для занятий в кружке", "Для творческой мастерской"
        ];

        const stationeryData = [
            { titles: ['тетрадь в клетку', 'тетради в клетку', 'тетрадей в клетку', 'тетрадями в клетку'] },
            { titles: ['тетрадь в линейку', 'тетради в линейку', 'тетрадей в линейку', 'тетрадями в линейку'] },
            { titles: ['альбом', 'альбомы', 'альбомов', 'альбомами'] },
            { titles: ['скетчбук', 'скетчбуки', 'скетчбуков', 'скетчбуками'] },
            { titles: ['блокнот', 'блокноты', 'блокнотов', 'блокнотами'] }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;
            const a = getRandomInt(4, 15);
            const b = getRandomInt(4, 15);
            const bigger = Math.max(a, b);
            
            if (a === b || (gcd(a, b) === 1 && (a > 10 || b > 10))) continue; 

            const m1 = lcm(a, b);
            if (m1 > 90 || m1 < 12) continue;

            const shuffled = [...stationeryData].sort(() => Math.random() - 0.5);
            const item1 = shuffled[0];
            const item2 = shuffled[1];
            const start = locationStarts[getRandomInt(0, locationStarts.length - 1)];

            const mode = getRandomInt(1, 4);
            
            const name1Acc = item1.titles[1]; 
            const name2Acc = item2.titles[1]; 
            const name1NomCap = name1Acc.charAt(0).toUpperCase() + name1Acc.slice(1);
            const name1Ins = item1.titles[3]; 

            let question = `${start} решили закупить ${name1Acc} и ${name2Acc}. ${name1NomCap} продаются в упаковках по ${a} штук, а ${name2Acc} — по ${b} штук. Закупили одинаковое количество предметов каждого вида, причём лишних штук в упаковках не осталось. `;
            let answer;

            if (mode === 1) {
                question += `Какое наименьшее количество предметов каждого вида было закуплено?`;
                answer = m1;
            } else if (mode === 2) {
                question += `Какое наименьшее количество упаковок с ${name1Ins} пришлось купить?`;
                answer = m1 / a;
            } else {
                const targetMultiple = (mode === 3) ? m1 * 2 : m1 * 3;
                
                const trapL = (Math.random() > 0.5) ? targetMultiple - bigger : targetMultiple + bigger;
                const minB = Math.min(targetMultiple, trapL);
                const maxB = Math.max(targetMultiple, trapL);
                
                const lower = minB - getRandomInt(2, 5);
                const upper = maxB + getRandomInt(2, 5);
                
                let bCount = 0, lcmCount = 0;
                for (let i = lower + 1; i < upper; i++) {
                    if (i % bigger === 0) bCount++;
                    if (i % m1 === 0) lcmCount++;
                }
                if (lcmCount !== 1 || bCount < 2) continue;

                question += `Сколько предметов каждого вида купили, если известно, что их было больше ${lower}, но меньше ${upper}?`;
                answer = targetMultiple;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count33",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const pluralize = (n, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
        };

        const locations = [
            "Для подготовительных курсов", "Для школы", "Для занятий в кружке", "Для творческой мастерской"
        ];

        const stationeryData = [
            { titles: ['тетрадь в клетку', 'тетради в клетку', 'тетрадей в клетку'], genPlural: 'тетрадей в клетку' },
            { titles: ['тетрадь в линейку', 'тетради в линейку', 'тетрадей в линейку'], genPlural: 'тетрадей в линейку' },
            { titles: ['альбом', 'альбома', 'альбомов'], genPlural: 'альбомов' },
            { titles: ['скетчбук', 'скетчбука', 'скетчбуков'], genPlural: 'скетчбуков' },
            { titles: ['блокнот', 'блокнота', 'блокнотов'], genPlural: 'блокнотов' }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;
            const trueGCD = getRandomInt(12, 36);
            const k1 = getRandomInt(2, 6);
            const k2 = getRandomInt(2, 6);
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const valA = trueGCD * k1; 
            const valB = trueGCD * k2;

            const commonDivs = [];
            for (let i = 2; i <= trueGCD; i++) {
                if (valA % i === 0 && valB % i === 0) commonDivs.push(i);
            }
            if (commonDivs.length < 2) continue;

            const loc = locations[getRandomInt(0, locations.length - 1)];
            const shuffled = [...stationeryData].sort(() => Math.random() - 0.5);
            const item1 = shuffled[0];
            const item2 = shuffled[1];

            const mode = getRandomInt(1, 4);
            let question = `${loc} купили ${valA} ${pluralize(valA, item1.titles)} и ${valB} ${pluralize(valB, item2.titles)}. Их раздали поровну участникам, причём ни ${item1.genPlural}, ни ${item2.genPlural} не осталось. `;
            let answer;

            if (mode === 1) {
                question += `Какое наибольшее количество человек могло получить эти предметы?`;
                answer = trueGCD;
            } else if (mode === 2) {
                const perPerson = (valA + valB) / trueGCD;
                question += `Сколько всего предметов получил каждый участник, если их раздали максимально возможному количеству человек?`;
                answer = perPerson;
            } else if (mode === 3) {
                question += `Сколько человек могли получить эти предметы? Перечислите все возможные варианты через запятую в порядке возрастания.`;
                answer = commonDivs.join(", ");
            } else {
                const sorted = commonDivs.sort((a, b) => a - b);
                const secondMax = sorted[sorted.length - 2];
                question += `Сколько человек получили эти предметы, если известно, что их было больше ${secondMax}?`;
                answer = trueGCD;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) { return vars.ans; },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count32",
    tags: ["5_класс", "НОК", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (x, y) => (x * y) / gcd(x, y);
        
        const sweetsData = [
            { titles: ['конфета', 'конфеты', 'конфет'], genPlural: 'конфет', group: 'сладостей' },
            { titles: ['пряник', 'пряники', 'пряников'], genPlural: 'пряников', group: 'сладостей' },
            { titles: ['зефирка', 'зефирки', 'зефирок'], genPlural: 'зефирок', group: 'сладостей' },
            { titles: ['шоколадка', 'шоколадки', 'шоколадок'], genPlural: 'шоколадок', group: 'сладостей' },
            { titles: ['вафля', 'вафли', 'вафель'], genPlural: 'вафель', group: 'сладостей' },
            { titles: ['леденец', 'леденцы', 'леденцов'], genPlural: 'леденцов', group: 'сладостей' },
            { titles: ['мармеладка', 'мармеладки', 'мармеладок'], genPlural: 'мармеладок', group: 'сладостей' }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const a = getRandomInt(4, 20);
            const b = getRandomInt(4, 20);
            
            if (a === b) continue;
            const resLCM = lcm(a, b);
            if (resLCM > 120 || resLCM < 20) continue;

            const shuffledSweets = [...sweetsData].sort(() => Math.random() - 0.5);
            const item1 = shuffledSweets[0];
            const item2 = shuffledSweets[1];

            const name1 = item1.titles[1]; 
            const name2 = item2.titles[1];

            const mode = getRandomInt(1, 3);
            let question = `${name1.charAt(0).toUpperCase() + name1.slice(1)} продаются в упаковках по ${a} штук, а ${name2} — по ${b} штук. Для подарков решили купить одинаковое количество этих ${item1.group}, причём ни ${item1.genPlural}, ни ${item2.genPlural} в упаковках остаться не должно. `;
            let answer;

            if (mode === 1) {
                question += `Какое наименьшее количество ${item1.genPlural} каждого вида нужно купить?`;
                answer = resLCM;
            } else if (mode === 2) {
                const packsA = resLCM / a;
                question += `Какое наименьшее количество упаковок ${item1.genPlural} придётся купить?`;
                answer = packsA;
            } else {
                question += `Сколько ${item1.group} каждого вида могло быть закуплено? Перечислите три первых возможных варианта через запятую в порядке возрастания.`;
                answer = `${resLCM}, ${resLCM * 2}, ${resLCM * 3}`;
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) {
        return vars.ans;
    },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count31",
    tags: ["5_класс", "НОД", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        
        const pluralize = (n, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
        };

        const sweetsData = [
            { titles: ['конфету', 'конфеты', 'конфет'], genPlural: 'конфет', group: 'сладостей' },
            { titles: ['пряник', 'пряника', 'пряников'], genPlural: 'пряников', group: 'сладостей' },
            { titles: ['зефирку', 'зефирки', 'зефирок'], genPlural: 'зефирок', group: 'сладостей' },
            { titles: ['шоколадку', 'шоколадки', 'шоколадок'], genPlural: 'шоколадок', group: 'сладостей' },
            { titles: ['вафлю', 'вафли', 'вафель'], genPlural: 'вафель', group: 'сладостей' },
            { titles: ['крендель', 'кренделя', 'кренделей'], genPlural: 'кренделей', group: 'выпечки' },
            { titles: ['леденец', 'леденца', 'леденцов'], genPlural: 'леденцов', group: 'сладостей' },
            { titles: ['булочка', 'булочки', 'булочек'], genPlural: 'булочек', group: 'выпечки' },
            { titles: ['пончик', 'пончика', 'пончиков'], genPlural: 'пончиков', group: 'выпечки' },
            { titles: ['мармеладку', 'мармеладки', 'мармеладок'], genPlural: 'мармеладок', group: 'сладостей' }
        ];

        let attempts = 0;
        while (attempts < 10000) {
            attempts++;

            const trueGCD = getRandomInt(6, 30);
            const k1 = getRandomInt(2, 7);
            const k2 = getRandomInt(2, 7);
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const valA = trueGCD * k1; 
            const valB = trueGCD * k2;
            if (valA > 200 || valB > 200) continue;

            const commonDivs = [];
            for (let i = 2; i <= trueGCD; i++) {
                if (valA % i === 0 && valB % i === 0) commonDivs.push(i);
            }
            if (commonDivs.length < 3) continue;

            const shuffledSweets = [...sweetsData].sort(() => Math.random() - 0.5);
            const item1 = shuffledSweets[0];
            const item2 = shuffledSweets[1];

            const sweetsOptions = commonDivs
                .map(d => (valA + valB) / d)
                .sort((x, y) => x - y);

            const mode = getRandomInt(1, 3);
            let question = `Для детских подарков купили ${valA} ${pluralize(valA, item1.titles)} и ${valB} ${pluralize(valB, item2.titles)}. Из них составили одинаковые подарки, причём ни ${item1.genPlural}, ни ${item2.genPlural} не осталось. `;
            let answer;

            if (mode === 1) {
                question += `Какое наибольшее количество одинаковых подарков можно составить?`;
                answer = trueGCD;
            } else if (mode === 2) {
                question += `Какое наибольшее количество ${item1.group} может быть в одном подарке?`;
                answer = Math.max(...sweetsOptions);
            } else {
                question += `Сколько ${item1.group} могло быть в одном подарке? Перечислите все возможные варианты через запятую в порядке возрастания.`;
                answer = sweetsOptions.join(", ");
            }

            return {
                variables: { ans: answer },
                problemText: question
            };
        }
        return this.generate();
    },
    calculateAnswer: function(vars) {
        return vars.ans;
    },
    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '').toLowerCase();
        const cleanAns = vars.ans.toString().replace(/\s+/g, '').toLowerCase();
        return cleanInput === cleanAns;
    }
},

{
    type: " ",
    number: "5count30",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

        // --- Вспомогательные функции ---
        const gcd = (x, y) => {
            while (y) {
                let t = y;
                y = x % y;
                x = t;
            }
            return x;
        };

        const getDivisors = (n) => {
            const res = [];
            for (let i = 1; i <= Math.sqrt(n); i++) {
                if (n % i === 0) {
                    res.push(i);
                    if (i !== n / i) res.push(n / i);
                }
            }
            return res.sort((a, b) => a - b);
        };

        const isPrime = (num) => {
            if (num <= 1) return false;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false;
            }
            return true;
        };

        // Условия по величине чисел
        const checkLimit = (val) => {
            if (val % 10 === 0) return val <= 500;
            if (val % 5 === 0) return val <= 200;
            return val <= 150;
        };

        let attempts = 0;
        while (attempts < 50000) {
            attempts++;

            // 1. Генерируем числа a и b
            const baseGCD = getRandomInt(4, 50);
            if (isPrime(baseGCD)) continue; // НОД должен быть составным

            const k1 = getRandomInt(1, 10);
            const k2 = getRandomInt(1, 10);
            
            // Числа должны быть разными и взаимно простыми относительно базы
            if (k1 === k2 || gcd(k1, k2) !== 1) continue;

            const valA = baseGCD * k1;
            const valB = baseGCD * k2;

            // Проверка лимитов
            if (!checkLimit(valA) || !checkLimit(valB)) continue;

            const trueGCD = baseGCD; 
            const minVal = Math.min(valA, valB);

            // 2. Формируем варианты ответов (a1...a5)
            // Условие: ни одно число не больше min(valA, valB)
            
            const options = new Set();
            options.add(trueGCD); // 1. Верный ответ

            // 2. и 3. Два общих делителя, не равных 1 (делители НОД)
            const commonDivs = getDivisors(trueGCD).filter(d => d !== 1 && d !== trueGCD);
            if (commonDivs.length < 2) continue;
            
            shuffle(commonDivs);
            options.add(commonDivs[0]);
            options.add(commonDivs[1]);

            // 4. Ловушка: "1" или "minVal"
            // (maxVal добавлять нельзя, так как это нарушит условие "не больше меньшего")
            const trapType = Math.random() < 0.5 ? 1 : minVal;
            if (options.has(trapType)) continue;
            options.add(trapType);

            // 5. Ловушка: Делитель одного, но не другого (Partial Divisor)
            // Вместо кратного (которое > minVal) берем число, которое делит minVal, но не делит maxVal.
            // Или просто случайное число < minVal, чтобы заполнить слот.
            // Попробуем найти "правдоподобный" делитель.
            const divsMin = getDivisors(minVal);
            const badDivisors = divsMin.filter(d => valA % d !== 0 || valB % d !== 0);
            
            let filler;
            if (badDivisors.length > 0) {
                filler = badDivisors[getRandomInt(0, badDivisors.length - 1)];
            } else {
                // Если такого нет (редкий случай), берем просто случайное число меньше minVal
                filler = getRandomInt(2, minVal - 1);
            }
            
            if (options.has(filler)) continue;
            options.add(filler);

            if (options.size !== 5) continue;

            const finalOptions = Array.from(options);
            // Расположить НЕ в порядке возрастания
            shuffle(finalOptions);

            return {
                variables: {
                    a: valA,
                    b: valB,
                    options: finalOptions,
                    ans: trueGCD
                },
                problemText: `Даны числа $a = ${valA}$ и $b = ${valB}$.<br>
Одно из чисел:<br><br>
${finalOptions.join('; ')}<br><br>
является НОД($a$; $b$). Какое?`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.ans;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.ans;
    }
},

{
    type: " ",
    number: "5count29",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const primesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

        // Функция форматирования: превращает объект {base: power, ...} в строку
        const formatPowers = (powersObj) => {
            const bases = Object.keys(powersObj).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const p = powersObj[base];
                return p > 1 ? `${base}<sup>${p}</sup>` : `${base}`;
            }).join(' · ');
        };

        let attempts = 0;
        while (attempts < 100000) {
            attempts++;

            // 1. Генерируем НОД (2-4 множителя, значение < 200)
            const gcdLen = getRandomInt(2, 4);
            const gcdBases = [];
            
            // Набираем уникальные основания для НОД
            const shuffledPrimes = [...primesPool].sort(() => Math.random() - 0.5);
            for(let i=0; i<gcdLen; i++) gcdBases.push(shuffledPrimes[i]);
            
            const gcdVal = gcdBases.reduce((a, b) => a * b, 1);
            
            // Если НОД слишком велик или мал (на всякий случай > 1)
            if (gcdVal >= 200 || gcdVal === 1) continue;

            // 2. Генерируем числа a, b, c
            const nums = [];
            
            for (let i = 0; i < 3; i++) {
                // База числа начинается с баз НОД
                let currentBases = [...gcdBases];
                
                // Добиваем до 1-4 уникальных множителей (но не меньше, чем в НОД)
                // Т.к. базы НОД обязаны быть, то min = gcdBases.length
                const targetLen = getRandomInt(gcdBases.length, 4);
                
                while (currentBases.length < targetLen) {
                    const p = getRandomEl(primesPool);
                    if (!currentBases.includes(p)) {
                        currentBases.push(p);
                    }
                }

                // Генерируем степени (1-5)
                const powers = {};
                let hasPowerGt1 = false;

                currentBases.forEach(base => {
                    const pow = getRandomInt(1, 5);
                    powers[base] = pow;
                    if (pow > 1) hasPowerGt1 = true;
                });

                // ТРЕБОВАНИЕ: В каждом числе должна быть хотя бы одна степень > 1
                if (!hasPowerGt1) {
                    const randomBase = getRandomEl(currentBases);
                    powers[randomBase] = getRandomInt(2, 5);
                }

                nums.push(powers);
            }

            // 3. КОРРЕКЦИЯ НОД
            // Сейчас степени случайны (1-5). НОД может оказаться больше задуманного gcdVal.
            // Нам нужно, чтобы для каждого основания из gcdBases минимальная степень среди a,b,c была равна 1.
            // (Так как мы определили gcdVal как произведение простых чисел в 1 степени).
            
            gcdBases.forEach(base => {
                // Выбираем случайное число (a, b или c), которое будет иметь этот множитель в степени 1.
                // Остальные могут иметь степень > 1.
                const limiterIdx = getRandomInt(0, 2);
                nums[limiterIdx][base] = 1;
            });

            // 4. ПРОВЕРКИ
            
            // 4.1. Наличие 31 в любом из чисел
            let has31 = false;
            nums.forEach(n => {
                if (n[31]) has31 = true;
            });
            if (!has31) continue;

            // 4.2. Расчет реального НОД (проверка на случайные совпадения добавочных множителей)
            // Собираем все встреченные основания
            const allBases = new Set();
            nums.forEach(n => Object.keys(n).forEach(k => allBases.add(Number(k))));

            let realGcd = 1;
            allBases.forEach(p => {
                const pA = nums[0][p] || 0;
                const pB = nums[1][p] || 0;
                const pC = nums[2][p] || 0;
                const minPow = Math.min(pA, pB, pC);
                if (minPow > 0) {
                    realGcd *= Math.pow(p, minPow);
                }
            });

            if (realGcd !== gcdVal) continue;

            // 4.3. Проверка на тривиальность (НОД != произведение самых малых оснований, взятых по 1 разу)
            // Хотя при условии степеней это менее актуально, но оставим.
            
            return {
                variables: {
                    gcd: gcdVal
                },
                problemText: `Найдите наибольший общий делитель трёх чисел $a$, $b$ и $c$:<br><br>
$a = ${formatPowers(nums[0])}$<br><br>
$b = ${formatPowers(nums[1])}$<br><br>
$c = ${formatPowers(nums[2])}$<br><br>
В ответ запишите натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count28",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

        const primesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

        // Форматирование: собираем в степени
        const formatToPowers = (factors) => {
            const counts = {};
            factors.forEach(x => counts[x] = (counts[x] || 0) + 1);
            const bases = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const power = counts[base];
                return power > 1 ? `${base}<sup>${power}</sup>` : `${base}`;
            }).join(' · ');
        };

        // Форматирование: просто через точку
        const formatSimple = (factors) => {
            return [...factors].sort((a, b) => a - b).join(' · ');
        };

        let attempts = 0;
        while (attempts < 100000) {
            attempts++;

            // 1. Генерируем НОД (2-4 множителя, < 200)
            const gcdLen = getRandomInt(2, 4);
            let gcdFactors = [];
            for (let i = 0; i < gcdLen; i++) {
                gcdFactors.push(getRandomEl(primesPool));
            }
            const gcdVal = gcdFactors.reduce((a, b) => a * b, 1);
            if (gcdVal >= 200) continue;

            // 2. Инициализируем массивы множителей для a, b, c
            let factors = [[], [], []];
            
            // Выбираем, кто будет "Power Number" (со степенями)
            const pIdx = getRandomInt(0, 2);
            // Индексы простых чисел
            const sIdxs = [0, 1, 2].filter(i => i !== pIdx);

            // --- ГЕНЕРАЦИЯ СТЕПЕННОГО ЧИСЛА (Power Number) ---
            // Требования: 3-4 РАЗЛИЧНЫХ основания. Одна степень >=3, одна >=2.
            
            // Начинаем с уникальных оснований, которые есть в НОД (они обязаны быть)
            let pBases = [...new Set(gcdFactors)];
            
            // Добиваем количество уникальных оснований до 3 или 4
            const targetUniqueCount = getRandomInt(3, 4);
            while (pBases.length < targetUniqueCount) {
                const newP = getRandomEl(primesPool);
                if (!pBases.includes(newP)) {
                    pBases.push(newP);
                }
            }

            // Теперь распределяем степени для этих оснований
            // Нам нужно гарантировать: одна >= 3, одна >= 2.
            // Перемешаем основания, чтобы высокие степени падали на случайные числа
            shuffle(pBases);

            let pFactorsExpanded = [];
            
            // 1-е основание: степень 3 или 4
            const pow1 = getRandomInt(3, 4);
            for(let k=0; k<pow1; k++) pFactorsExpanded.push(pBases[0]);

            // 2-е основание: степень 2 или 3
            const pow2 = getRandomInt(2, 3);
            for(let k=0; k<pow2; k++) pFactorsExpanded.push(pBases[1]);

            // Остальные основания (если есть): степень 1 или 2
            for(let i=2; i<pBases.length; i++) {
                const pow = getRandomInt(1, 2);
                for(let k=0; k<pow; k++) pFactorsExpanded.push(pBases[i]);
            }

            factors[pIdx] = pFactorsExpanded;


            // --- ГЕНЕРАЦИЯ ПРОСТЫХ ЧИСЕЛ (Simple Numbers) ---
            // Одно длиной 3-4, другое 5-6 (гарантированно разные диапазоны)
            const lensForSimple = [getRandomInt(3, 4), getRandomInt(5, 6)];
            shuffle(lensForSimple);

            // Функция заполнения
            const fillFactors = (idx, targetLen) => {
                let current = [...gcdFactors]; // Начинаем с НОД
                while(current.length < targetLen) {
                    current.push(getRandomEl(primesPool));
                }
                factors[idx] = current;
            };

            fillFactors(sIdxs[0], lensForSimple[0]);
            fillFactors(sIdxs[1], lensForSimple[1]);


            // 4. ПРОВЕРКИ
            const allFactors = [...factors[0], ...factors[1], ...factors[2]];

            // 4.1. Обязательное наличие 31
            if (!allFactors.includes(31)) continue;

            // 4.2. Проверка реального НОД
            const getCounts = (arr) => {
                const c = {};
                arr.forEach(x => c[x] = (c[x] || 0) + 1);
                return c;
            };

            const maps = factors.map(f => getCounts(f));
            const uniquePrimesTotal = [...new Set(allFactors)];
            
            let realGcdVal = 1;
            uniquePrimesTotal.forEach(p => {
                const minPow = Math.min(
                    (maps[0][p] || 0),
                    (maps[1][p] || 0),
                    (maps[2][p] || 0)
                );
                if (minPow > 0) realGcdVal *= Math.pow(p, minPow);
            });

            if (realGcdVal !== gcdVal) continue;

            // 4.3. НОД не равен произведению первых встречных (тривиальность)
            factors[0].sort((a,b)=>a-b);
            factors[1].sort((a,b)=>a-b);
            factors[2].sort((a,b)=>a-b);
            const minProd = factors[0][0] * factors[1][0] * factors[2][0];
            if (gcdVal === minProd) continue;

            // 5. ФОРМИРОВАНИЕ СТРОК
            const strVals = factors.map((f, i) => {
                return (i === pIdx) ? formatToPowers(f) : formatSimple(f);
            });

            return {
                variables: {
                    a_factors: factors[0],
                    b_factors: factors[1],
                    c_factors: factors[2],
                    gcd: gcdVal
                },
                problemText: `Найдите наибольший общий делитель трёх чисел $a$, $b$ и $c$:<br><br>
$a = ${strVals[0]}$<br><br>
$b = ${strVals[1]}$<br><br>
$c = ${strVals[2]}$<br><br>
В ответ запишите полученное натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count27",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // Пул простых чисел (включая 31, как требовалось)
        const primesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

        let attempts = 0;
        while (attempts < 50000) {
            attempts++;

            // 1. Генерируем ядро НОД (от 2 до 4 множителей)
            const gcdLen = getRandomInt(2, 4);
            let gcdFactors = [];
            for (let i = 0; i < gcdLen; i++) {
                gcdFactors.push(getRandomEl(primesPool));
            }

            // Вычисляем значение НОД
            const gcdVal = gcdFactors.reduce((a, b) => a * b, 1);

            // Условие: НОД строго меньше 200
            if (gcdVal >= 200) continue;

            // 2. Определяем длины для чисел a, b, c
            // Условия: одно 5-6, одно 3-4, одно случайное 3-6
            const lens = [
                getRandomInt(5, 6), 
                getRandomInt(3, 4), 
                getRandomInt(3, 6)
            ];
            // Перемешиваем длины, чтобы a, b, c не имели предсказуемую длину
            lens.sort(() => Math.random() - 0.5);

            // 3. Заполняем множители
            let fA = [...gcdFactors];
            let fB = [...gcdFactors];
            let fC = [...gcdFactors];

            const fillArray = (arr, targetLen) => {
                while (arr.length < targetLen) {
                    arr.push(getRandomEl(primesPool));
                }
                arr.sort((a, b) => a - b);
            };

            fillArray(fA, lens[0]);
            fillArray(fB, lens[1]);
            fillArray(fC, lens[2]);

            // 4. ПРОВЕРКИ

            // 4.1. Обязательное наличие числа 31 в любом из чисел
            const allFactors = [...fA, ...fB, ...fC];
            if (!allFactors.includes(31)) continue;

            // 4.2. Проверка реального НОД
            // Генерация случайных хвостов могла случайно увеличить НОД. Проверяем это.
            const getCounts = (arr) => {
                const c = {};
                arr.forEach(x => c[x] = (c[x] || 0) + 1);
                return c;
            };

            const cA = getCounts(fA);
            const cB = getCounts(fB);
            const cC = getCounts(fC);

            // Собираем уникальные простые из всех трех чисел
            const uniquePrimes = [...new Set(allFactors)];
            
            let realGcdVal = 1;
            uniquePrimes.forEach(p => {
                // Берем минимальную степень вхождения p во все три числа
                const minPow = Math.min(
                    (cA[p] || 0),
                    (cB[p] || 0),
                    (cC[p] || 0)
                );
                if (minPow > 0) {
                    realGcdVal *= Math.pow(p, minPow);
                }
            });

            // Если случайно сгенерированный хвост испортил НОД, пробуем снова
            if (realGcdVal !== gcdVal) continue;

            // 4.3. НОД не равен произведению наименьших простых множителей
            // (защита от решения "взять первое число в каждой строке")
            const minProd = fA[0] * fB[0] * fC[0];
            if (gcdVal === minProd) continue;

            // Если всё ок, возвращаем задачу
            const formatFactors = (arr) => arr.join(' · ');

            return {
                variables: {
                    a_factors: fA,
                    b_factors: fB,
                    c_factors: fC,
                    gcd: gcdVal
                },
                problemText: `Найдите наибольший общий делитель трёх чисел $a$, $b$ и $c$, записанных в виде произведения простых множителей:<br><br>
$a = ${formatFactors(fA)}$<br><br>$b = ${formatFactors(fB)}$<br><br>$c = ${formatFactors(fC)}$<br><br>
В ответ запишите полученное натуральное число.`
            };
        }
        // Если за 50000 попыток не вышло (крайне маловероятно), рекурсия
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
       type: " ",
    number: "5count26",
    tags: ["5_класс", "НОД"],
        generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];
        
        // Пулы чисел
        const groupSmall = [2, 3, 5];
        const groupLarge = [7, 11, 13, 17, 19];
        const extraPrimesPool = [2, 3, 5, 7, 11, 13, 17, 19]; 
        const forbiddenGCDs = [49, 77, 91, 119, 133]; 

        // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
        const formatToPowers = (factors) => {
            const counts = {};
            factors.forEach(x => counts[x] = (counts[x] || 0) + 1);
            const bases = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const power = counts[base];
                return power > 1 ? `${base}<sup>${power}</sup>` : `${base}`;
            }).join(' · ');
        };

        const getCounts = (arr) => {
            const counts = {};
            arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
            return counts;
        };

        const calculateGCDFromFactors = (arrA, arrB) => {
            let mapA = {};
            arrA.forEach(p => mapA[p] = (mapA[p] || 0) + 1);
            let common = []; 
            let uniquePrimes = [...new Set([...arrA, ...arrB])]; 
            
            uniquePrimes.forEach(p => {
                const countA = mapA[p] || 0;
                const countB = arrB.filter(x => x === p).length;
                const minCount = Math.min(countA, countB);
                for (let k = 0; k < minCount; k++) common.push(p);
            });
            return { 
                value: common.reduce((acc, x) => acc * x, 1), 
                factors: common 
            };
        };

        const checkDuplicates = (arr) => new Set(arr).size !== arr.length;

        // --- ГЕНЕРАТОРЫ ---

        let attemptsMain = 0;
        while (attemptsMain < 10000) {
            attemptsMain++;
            
            // 1. Выбираем ОБЯЗАТЕЛЬНЫЙ большой множитель для НОД
            const requiredLarge = getRandomEl(groupLarge);

            // 2. Генерируем "Натуральное число" (Strict)
            // Новые условия: < 1000; если > 499, то кратно 100; large входит 1 раз.
            let factorsStrict = [];
            let strictAttempts = 0;
            let successStrict = false;
            
            while(strictAttempts < 50) {
                strictAttempts++;
                // Инициализируем сразу с одним большим множителем (условие: входит ровно 1 раз)
                let f = [requiredLarge]; 
                
                // Добиваем малыми (2, 3, 5). 
                // Чтобы получить шанс на 700 (7*2*2*5*5), нужно разрешить до 5-6 множителей.
                const targetLen = getRandomInt(3, 6);
                while(f.length < targetLen) {
                    f.push(getRandomEl(groupSmall));
                }

                // Проверка на дубликаты (они обязаны быть)
                if (!checkDuplicates(f)) continue;

                // Вычисляем значение
                const val = f.reduce((a, b) => a * b, 1);

                // --- НОВЫЕ ПРОВЕРКИ ---
                // 1) Число меньше 1000
                if (val >= 1000) continue;

                // 2) Если число больше 499, оно должно быть кратно 100
                if (val > 499 && val % 100 !== 0) continue;

                factorsStrict = f;
                successStrict = true;
                break;
            }
            if (!successStrict) continue;


            // 3. Генерируем "Степенное число" (Rich)
            // Требования: requiredLarge >= 2 раз; структурная сложность.
            let factorsRich = [];
            let richAttempts = 0;
            let successRich = false;

            while(richAttempts < 20) {
                richAttempts++;
                let f = [];
                // Обязательно добавляем requiredLarge ДВА раза (минимум)
                f.push(requiredLarge, requiredLarge);
                
                // Добавляем еще случайных простых
                const extraBase = getRandomEl(groupSmall); 
                f.push(extraBase, extraBase); 

                const countExtras = getRandomInt(0, 3);
                for(let i=0; i<countExtras; i++) {
                    f.push(getRandomEl(extraPrimesPool));
                }
                
                // Проверка: структурная сложность (2-3 основания со степенью > 1)
                const c = getCounts(f);
                let basesWithPowerGt1 = 0;
                for (let p in c) {
                    if (c[p] > 1) basesWithPowerGt1++;
                }
                
                if (basesWithPowerGt1 < 2 || basesWithPowerGt1 > 3) continue;

                factorsRich = f;
                successRich = true;
                break;
            }
            if (!successRich) continue;


            // --- СБОРКА И ПРОВЕРКИ НОД ---

            const baseGCDInfo = calculateGCDFromFactors(factorsStrict, factorsRich);
            const baseGCD = baseGCDInfo.value;
            const valStrict = factorsStrict.reduce((a, b) => a * b, 1);
            const valRichApprox = factorsRich.reduce((a, b) => a * b, 1);

            // 1. НОД не равен самим числам
            if (baseGCD === valStrict || baseGCD === valRichApprox) continue;

            // 2. В НОД от 2 до 4 простых множителей
            if (baseGCDInfo.factors.length < 2 || baseGCDInfo.factors.length > 4) continue;

            // 3. Large Prime в НОД (гарантировано, но проверим)
            if (!baseGCDInfo.factors.includes(requiredLarge)) continue; 

            // 4. Лимиты степеней в НОД
            const countsGCD = getCounts(baseGCDInfo.factors);
            let gcdPowersValid = true;
            for (let pStr in countsGCD) {
                const p = parseInt(pStr, 10);
                const pow = countsGCD[p];
                if ((p === 2 || p === 3) && pow > 3) gcdPowersValid = false;
                else if (p === 5 && pow > 2) gcdPowersValid = false;
                else if (p >= 7 && pow > 1) gcdPowersValid = false;
            }
            if (!gcdPowersValid) continue;

            // 5. Разные степени вхождения (Strict=1, Rich>=2 для Large Prime это гарантирует)
            const countsStrict = getCounts(factorsStrict);
            const countsRich = getCounts(factorsRich);
            if (countsStrict[requiredLarge] !== 1 || countsRich[requiredLarge] < 2) continue;
            
            // --- ФОРМИРОВАНИЕ ОТВЕТА ---

            const showStrictAsA = Math.random() < 0.5;

            factorsStrict.sort((a, b) => a - b);
            factorsRich.sort((a, b) => a - b);

            const strStrict = valStrict.toString();
            const strRich = formatToPowers(factorsRich);

            let strA, strB, factorsA, factorsB;

            if (showStrictAsA) {
                strA = strStrict;
                strB = strRich;
                factorsA = factorsStrict;
                factorsB = factorsRich;
            } else {
                strA = strRich;
                strB = strStrict;
                factorsA = factorsRich;
                factorsB = factorsStrict;
            }

            return {
                variables: { 
                    a_factors: factorsA, 
                    b_factors: factorsB, 
                    gcd: baseGCD 
                },
                problemText: `Найдите НОД чисел $a$ и $b$:<br><br>
$a = ${strA}$<br>
$b = ${strB}$<br><br>
В ответ запишите натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count25",
    tags: ["5_класс", "делимость", "разложение_на_множители"],
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

        // 2. Определяем n (то, чего не будет хватать в a для деления на b)
        const hiddenIndex = getRandomInt(0, bFactors.length - 1);
        const n = bFactors[hiddenIndex];

        // 3. Формируем множители a (изначально копия b без одного n)
        let aFactors = [...bFactors];
        aFactors.splice(hiddenIndex, 1);

        // --- ИЗМЕНЕНИЕ: Гарантируем a > 500 ---
        
        // Пул простых чисел для "шума", исключая n
        const primesPool = [2, 3, 5, 7, 11, 13].filter(p => p !== n);
        
        // Считаем текущее значение a (произведение имеющихся множителей * n)
        // Нам нужно учитывать n, так как это часть числа a, хоть оно и скрыто переменной
        let currentAValue = aFactors.reduce((acc, val) => acc * val, 1) * n;

        // Добавляем случайные множители, пока число a не станет больше 500
        while (currentAValue <= 500) {
            const randomPrime = getRandomEl(primesPool);
            aFactors.push(randomPrime);
            currentAValue *= randomPrime;
        }
        // ---------------------------------------

        shuffleArray(aFactors);
        
        const factorsString = aFactors.join(" \\cdot "); 
        const displayA = `${factorsString} \\cdot n`;

        return {
            variables: { 
                b, 
                n 
            },
            // Используем <br><br> для пустой строки
            problemText: `Дано число $a = ${displayA}$, где $n$ --- простое число.<br><br>Найдите, чему равно $n$, если известно, что $a$ кратно $${b}$.`
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
    number: "5count_23, 
    tags: ["5_класс", "разложение_на_множители", "кратные"],
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        // Функция наполняет массив множителями, пока произведение <= 500
        // forbiddenFactor - число, которое нельзя добавлять (чтобы неправильный ответ не стал правильным)
        const fillTo500 = (factors, forbiddenFactor = null) => {
            // Создаем копию входного массива, чтобы не мутировать оригинал
            const currentFactors = [...factors]; 
            let currentProduct = currentFactors.reduce((acc, val) => acc * val, 1);
            
            // Пул чисел для шума. Включаем основные простые числа.
            let primesPool = [2, 3, 5, 7, 11, 13, 17, 19];
            
            // Если есть запрещенное число, убираем его из пула
            if (forbiddenFactor !== null) {
                primesPool = primesPool.filter(p => p !== forbiddenFactor);
            }

            while (currentProduct <= 500) {
                const p = getRandomEl(primesPool);
                currentFactors.push(p);
                currentProduct *= p;
            }
            
            return shuffleArray(currentFactors);
        };

        // --- ЛОГИКА ГЕНЕРАЦИИ ЧИСЛА N ---
        let targetFactors = [];
        
        // Решаем: 2 множителя или 3 множителя (50/50)
        const scenario = Math.random() < 0.5 ? '2factors' : '3factors';

        if (scenario === '2factors') {
            const group1 = [3, 5, 7];
            const group2 = [11, 13, 17];
            
            let p1, p2;
            do {
                p1 = getRandomEl(group1);
                p2 = getRandomEl(group2);
            } while (p1 === 7 && p2 === 17); // Исключаем 7 * 17 по условию
            
            targetFactors = [p1, p2];
        } else {
            // 3 множителя меньше 10 (2, 3, 5, 7)
            const smallPrimes = [2, 3, 5, 7];
            targetFactors = [
                getRandomEl(smallPrimes),
                getRandomEl(smallPrimes),
                getRandomEl(smallPrimes)
            ];
        }

        const targetNumber = targetFactors.reduce((acc, val) => acc * val, 1);

        // --- ГЕНЕРАЦИЯ ВАРИАНТОВ ОТВЕТА ---

        // 1. Правильный ответ: содержит все множители targetFactors
        const correctFactors = fillTo500(targetFactors);

        // Функция для создания неправильного ответа
        // Мы берем targetFactors, убираем из них ОДИН случайный множитель
        // И запрещаем добавлять его обратно.
        const createWrongFactors = () => {
            const tempFactors = [...targetFactors];
            // Выбираем индекс элемента, который "забудем" положить
            const removeIndex = getRandomInt(0, tempFactors.length - 1);
            const removedFactor = tempFactors[removeIndex];
            
            // Удаляем этот элемент
            tempFactors.splice(removeIndex, 1);
            
            // Добавляем шум, запрещая removedFactor
            return fillTo500(tempFactors, removedFactor);
        };

        const wrongFactors1 = createWrongFactors();
        const wrongFactors2 = createWrongFactors();

        // Собираем опции
        const options = [
            { id: 'correct', factors: correctFactors },
            { id: 'wrong', factors: wrongFactors1 },
            { id: 'wrong', factors: wrongFactors2 }
        ];

        shuffleArray(options);

        // --- ФОРМИРОВАНИЕ ТЕКСТА ---
        let correctLetter = '';
        const letters = ['a', 'b', 'c'];
        
        const lines = options.map((opt, index) => {
            const letter = letters[index];
            if (opt.id === 'correct') {
                correctLetter = letter;
            }
            const factorsStr = opt.factors.join(" \\cdot ");
            return `$$${letter} = ${factorsStr}$$`;
        });

        return {
            variables: { correctLetter, targetNumber },
            problemText: `Ниже записаны три числа в виде произведения простых множителей. Какое из этих чисел кратно числу ${targetNumber}?<br>
            ${lines.join("")}
            <br>(В ответе запишите только букву: $a$, $b$ или $c$.)`,
        };
    },

    calculateAnswer: function(vars) {
        return vars.correctLetter;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().trim().toLowerCase();
        
        const map = {
            'а': 'a',
            'б': 'b',
            'с': 'c',
            'в': 'b'
        };
        
        const normalizedInput = map[cleanInput] || cleanInput;
        return normalizedInput === vars.correctLetter;
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
            problemText = `Сколько существует натуральных чисел, меньших ${limit}, которые кратны ${selected.k}?`;

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
    tags: ["5_класс", "кратные", "периодичность_остатка"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomEl = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // 1. Делитель от 11 до 19, исключая 15
        const base = getRandomEl([11, 12, 13, 14, 16, 17, 18, 19]);

        // 2. Длина ряда
        const length = getRandomInt(6, 8);
        const startMultiplier = 10;

        let numbers = [];
        let wrongNumber = 0;
        const wrongIndex = getRandomInt(3, length - 1);

        for (let i = 0; i < length; i++) {
            const currentMultiplier = startMultiplier + i;
            let val = base * currentMultiplier;

            if (i === wrongIndex) {
                // ОПРЕДЕЛЯЕМ ШАГ: 2 для четных, 1 для нечетных
                const step = (base % 2 === 0) ? 2 : 1;
                const shift = Math.random() > 0.5 ? step : -step;
                
                val += shift;
                wrongNumber = val;
            }

            numbers.push(val);
        }

        const listString = numbers.join(", ");

        return {
            variables: { 
                base, 
                wrongNumber,
                listString 
            },
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
    number: "5count20",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const fillerPrimes = [2, 3, 5];
        const extraPrimesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const forbiddenGCDs = [49, 77, 91, 119, 133]; 

        // --- ФОРМАТИРОВАНИЕ ---
        const formatToPowers = (factors) => {
            const counts = {};
            factors.forEach(x => counts[x] = (counts[x] || 0) + 1);
            const bases = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const power = counts[base];
                return power > 1 ? `${base}<sup>${power}</sup>` : `${base}`;
            }).join(' · ');
        };

        const formatToExpanded = (factors) => {
            return [...factors].sort((a, b) => a - b).join(' · ');
        };

        const getCounts = (arr) => {
            const counts = {};
            arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
            return counts;
        };

        // --- ГЕНЕРАТОР БАЗЫ ---
        const getBaseFactors = (minF, maxF) => {
            let attempts = 0;
            while (attempts < 500) {
                attempts++;
                let f = [];
                // Стартовые наборы
                const specialOptions = [
                    [7], [7, 7], [11], [13], [17], [19], 
                    [2, 2, 2], [2, 2, 2, 2], [3, 3, 3]
                ];
                const startSet = specialOptions[getRandomInt(0, specialOptions.length - 1)];
                f.push(...startSet);

                const targetCount = getRandomInt(minF, maxF);
                while (f.length < targetCount) {
                    f.push(fillerPrimes[getRandomInt(0, fillerPrimes.length - 1)]);
                }

                const val = f.reduce((acc, curr) => acc * curr, 1);
                if (val > 1000) continue;
                if (val > 400 && val % 100 !== 0) continue;
                return f;
            }
            return null;
        };

        const calculateGCDFromFactors = (arrA, arrB) => {
            let mapA = {};
            arrA.forEach(p => mapA[p] = (mapA[p] || 0) + 1);
            let common = []; 
            let uniquePrimes = [...new Set([...arrA, ...arrB])]; 
            
            uniquePrimes.forEach(p => {
                const countA = mapA[p] || 0;
                const countB = arrB.filter(x => x === p).length;
                const minCount = Math.min(countA, countB);
                for (let k = 0; k < minCount; k++) common.push(p);
            });
            return { 
                value: common.reduce((acc, x) => acc * x, 1), 
                factors: common 
            };
        };

        // --- ОСНОВНОЙ ЦИКЛ ---
        let attemptsMain = 0;
        while (attemptsMain < 10000) { // Увеличен лимит попыток для сложных условий
            attemptsMain++;
            
            // 1. Генерация базы
            // Для a чуть увеличим кол-во множителей, чтобы повысить шанс на степени
            let factorsA = getBaseFactors(4, 7); 
            let factorsB = getBaseFactors(3, 5);
            if (!factorsA || !factorsB) continue;

            const baseGCDInfo = calculateGCDFromFactors(factorsA, factorsB);
            const baseGCD = baseGCDInfo.value;
            const valA = factorsA.reduce((a, b) => a * b, 1);
            const valB = factorsB.reduce((a, b) => a * b, 1);

            if (baseGCD === valA || baseGCD === valB) continue;
            if (forbiddenGCDs.includes(baseGCD)) continue;
            if (baseGCDInfo.factors.length < 2 || baseGCDInfo.factors.length > 4) continue;

            // 2. Добавление "шума"
            const tryAddExtra = () => {
                let tempA = [...factorsA];
                let tempB = [...factorsB];
                // Добавляем по 2-3 множителя
                const countAdd = 2; 
                for(let i=0; i<countAdd; i++) tempA.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                for(let i=0; i<countAdd; i++) tempB.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                return { newA: tempA, newB: tempB };
            };

            let foundExtension = false;
            let finalA = [], finalB = [];

            for (let k = 0; k < 20; k++) {
                const { newA, newB } = tryAddExtra();
                const newGCDInfo = calculateGCDFromFactors(newA, newB);
                if (newGCDInfo.value === baseGCD) {
                    finalA = newA;
                    finalB = newB;
                    foundExtension = true;
                    break;
                }
            }
            if (!foundExtension) continue;

            // --- БЛОК ПРОВЕРОК ---

            const countsA = getCounts(finalA);
            const countsB = getCounts(finalB);
            const countsGCD = getCounts(baseGCDInfo.factors);

            // ПРОВЕРКА 1: Максимальные степени (1..5)
            const maxPowerAllowed = 5;
            const checkMaxPowers = (counts) => Object.values(counts).every(c => c <= maxPowerAllowed);
            if (!checkMaxPowers(countsA) || !checkMaxPowers(countsB)) continue;

            // ПРОВЕРКА 2: Ограничения степеней в НОД
            let gcdPowersValid = true;
            for (let pStr in countsGCD) {
                const p = parseInt(pStr, 10);
                const pow = countsGCD[p];
                if ((p === 2 || p === 3) && pow > 3) gcdPowersValid = false;
                else if (p === 5 && pow > 2) gcdPowersValid = false;
                else if (p >= 7 && pow > 1) gcdPowersValid = false;
            }
            if (!gcdPowersValid) continue;

            // ПРОВЕРКА 3: Разные степени вхождения одного и того же множителя
            let hasDifferentPowers = false;
            for (let pStr in countsGCD) {
                const p = parseInt(pStr, 10);
                if (countsA[p] !== countsB[p]) {
                    hasDifferentPowers = true;
                    break;
                }
            }
            if (!hasDifferentPowers) continue;

            // ПРОВЕРКА 4: Сложность НОД (не только минимумы)
            const minA = Math.min(...finalA);
            const minB = Math.min(...finalB);
            const gcdFactors = baseGCDInfo.factors;
            let notOnlyMinPrimes = false;
            for (let p of gcdFactors) {
                if (p > minA || p > minB) {
                    notOnlyMinPrimes = true;
                    break;
                }
            }
            if (!notOnlyMinPrimes) continue;

            // === НОВОЕ УСЛОВИЕ ДЛЯ A ===
            // В a ровно 2 или 3 числа входят в степени, не равной 1
            let basesWithPowerGt1 = 0;
            for (let p in countsA) {
                if (countsA[p] > 1) basesWithPowerGt1++;
            }
            if (basesWithPowerGt1 < 2 || basesWithPowerGt1 > 3) continue;


            // ПРОВЕРКА 5: Формат и дубликаты
            const showAAsPowers = Math.random() < 0.5;
            const checkDuplicates = (arr) => new Set(arr).size !== arr.length;
            
            if (showAAsPowers) {
                // B развернуто -> должны быть повторы
                if (!checkDuplicates(finalB)) continue;
            } else {
                // A развернуто -> должны быть повторы
                // (Это условие почти всегда выполняется из-за проверки выше на 2-3 степени, но оставим для надежности)
                if (!checkDuplicates(finalA)) continue;
            }

            // --- ФОРМИРОВАНИЕ ОТВЕТА ---
            finalA.sort((x, y) => x - y);
            finalB.sort((x, y) => x - y);

            const strA = showAAsPowers ? formatToPowers(finalA) : formatToExpanded(finalA);
            const strB = showAAsPowers ? formatToExpanded(finalB) : formatToPowers(finalB);

            return {
                variables: { 
                    a_factors: finalA, 
                    b_factors: finalB, 
                    gcd: baseGCD 
                },
                problemText: `Найдите НОД чисел $a$ и $b$:<br><br>
$a = ${strA}$<br>
$b = ${strB}$<br><br>
В ответ запишите натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count19",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const fillerPrimes = [2, 3, 5];
        const extraPrimesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const forbiddenGCDs = [49, 77, 91, 119, 133]; 

        // Форматирование в HTML со степенями
        const formatToPowers = (factors) => {
            const counts = {};
            factors.forEach(x => counts[x] = (counts[x] || 0) + 1);
            const bases = Object.keys(counts).map(Number).sort((a, b) => a - b);
            return bases.map(base => {
                const power = counts[base];
                return power > 1 ? `${base}<sup>${power}</sup>` : `${base}`;
            }).join(' · ');
        };

        // Подсчет количества каждого множителя
        const getCounts = (arr) => {
            const counts = {};
            arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
            return counts;
        };

        const getBaseFactors = (minF, maxF) => {
            let attempts = 0;
            while (attempts < 500) {
                attempts++;
                let f = [];
                const specialOptions = [
                    [7], [7, 7], [11], [13], [17], [19], 
                    [2, 2, 2], [2, 2, 2, 2], [3, 3, 3]
                ];
                const startSet = specialOptions[getRandomInt(0, specialOptions.length - 1)];
                f.push(...startSet);

                const targetCount = getRandomInt(minF, maxF);
                while (f.length < targetCount) {
                    f.push(fillerPrimes[getRandomInt(0, fillerPrimes.length - 1)]);
                }

                const val = f.reduce((acc, curr) => acc * curr, 1);
                if (val > 1000) continue;
                if (val > 400 && val % 100 !== 0) continue;
                return f;
            }
            return null;
        };

        const calculateGCDFromFactors = (arrA, arrB) => {
            let mapA = {};
            arrA.forEach(p => mapA[p] = (mapA[p] || 0) + 1);
            let common = []; 
            let uniquePrimes = [...new Set([...arrA, ...arrB])]; 
            
            uniquePrimes.forEach(p => {
                const countA = mapA[p] || 0;
                const countB = arrB.filter(x => x === p).length;
                const minCount = Math.min(countA, countB);
                for (let k = 0; k < minCount; k++) common.push(p);
            });
            return { 
                value: common.reduce((acc, x) => acc * x, 1), 
                factors: common 
            };
        };

        let attemptsMain = 0;
        while (attemptsMain < 3000) {
            attemptsMain++;
            
            // 1. База
            let factorsA = getBaseFactors(3, 5);
            let factorsB = getBaseFactors(3, 4);
            if (!factorsA || !factorsB) continue;

            const baseGCDInfo = calculateGCDFromFactors(factorsA, factorsB);
            const baseGCD = baseGCDInfo.value;
            const valA = factorsA.reduce((a, b) => a * b, 1);
            const valB = factorsB.reduce((a, b) => a * b, 1);

            // Фильтры базы
            if (baseGCD === valA || baseGCD === valB) continue;
            if (forbiddenGCDs.includes(baseGCD)) continue;
            if (baseGCDInfo.factors.length < 2 || baseGCDInfo.factors.length > 4) continue;

            // 2. Добавление "шума"
            const tryAddExtra = () => {
                let tempA = [...factorsA];
                let tempB = [...factorsB];
                // Добавляем по 2 случайных множителя
                for(let i=0; i<2; i++) tempA.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                for(let i=0; i<2; i++) tempB.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                return { newA: tempA, newB: tempB };
            };

            let foundExtension = false;
            let finalA = [], finalB = [];

            for (let k = 0; k < 15; k++) {
                const { newA, newB } = tryAddExtra();
                const newGCDInfo = calculateGCDFromFactors(newA, newB);
                
                if (newGCDInfo.value === baseGCD) {
                    finalA = newA;
                    finalB = newB;
                    foundExtension = true;
                    break;
                }
            }
            if (!foundExtension) continue;

            // 3. ПРОВЕРКИ СЛОЖНОСТИ

            // А) Предыдущее условие: не состоит только из минимумов
            const minA = Math.min(...finalA);
            const minB = Math.min(...finalB);
            const gcdFactors = baseGCDInfo.factors;
            let notOnlyMinPrimes = false;
            for (let p of gcdFactors) {
                if (p > minA || p > minB) {
                    notOnlyMinPrimes = true;
                    break;
                }
            }
            if (!notOnlyMinPrimes) continue;

            // Б) НОВОЕ УСЛОВИЕ: Разные степени вхождения
            // Проверяем, есть ли в НОД такой множитель, у которого степень в A не равна степени в B
            const countsA = getCounts(finalA);
            const countsB = getCounts(finalB);
            // Берем уникальные простые множители из НОД
            const uniqueGCDPrimes = [...new Set(gcdFactors)];
            
            let hasDifferentPowers = false;
            for (let p of uniqueGCDPrimes) {
                // Если количество в A не равно количеству в B, значит ученику придется выбирать
                if (countsA[p] !== countsB[p]) {
                    hasDifferentPowers = true;
                    break;
                }
            }
            
            if (!hasDifferentPowers) continue;

            // 4. Формирование ответа
            const strA = formatToPowers(finalA);
            const strB = formatToPowers(finalB);

            return {
                variables: { 
                    a_factors: finalA, 
                    b_factors: finalB, 
                    gcd: baseGCD 
                },
                problemText: `Найдите НОД чисел $a$ и $b$:<br><br>
$a = ${strA}$<br>
$b = ${strB}$<br><br>
В ответ запишите натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count18",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        const fillerPrimes = [2, 3, 5];
        // Расширенный пул для проверки НОД
        const allPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
        // Пул для добавки (до 30)
        const extraPrimesPool = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

        const forbiddenGCDs = [49, 77, 91, 119, 133]; 

        // Генерация базовых множителей
        const getBaseFactors = (minF, maxF) => {
            let attempts = 0;
            while (attempts < 500) {
                attempts++;
                let f = [];
                
                const specialOptions = [
                    [7], [7, 7], [11], [13], [17], [19], 
                    [2, 2, 2], [2, 2, 2, 2], [3, 3, 3]
                ];
                
                const startSet = specialOptions[getRandomInt(0, specialOptions.length - 1)];
                f.push(...startSet);

                const targetCount = getRandomInt(minF, maxF);
                while (f.length < targetCount) {
                    f.push(fillerPrimes[getRandomInt(0, fillerPrimes.length - 1)]);
                }

                const val = f.reduce((acc, curr) => acc * curr, 1);

                if (val > 1000) continue;
                if (val > 400 && val % 100 !== 0) continue;

                return f;
            }
            return null;
        };

        // Вспомогательная: НОД по массивам
        const calculateGCDFromFactors = (arrA, arrB) => {
            let mapA = {};
            arrA.forEach(p => mapA[p] = (mapA[p] || 0) + 1);
            
            let common = []; // Массив простых множителей, входящих в НОД
            let uniquePrimes = [...new Set([...arrA, ...arrB])]; // Чтобы пройтись по всем возможным
            
            uniquePrimes.forEach(p => {
                const countA = mapA[p] || 0;
                const countB = arrB.filter(x => x === p).length;
                const minCount = Math.min(countA, countB);
                for (let k = 0; k < minCount; k++) common.push(p);
            });
            
            return { 
                value: common.reduce((acc, x) => acc * x, 1), 
                factors: common 
            };
        };

        let attemptsMain = 0;
        while (attemptsMain < 3000) {
            attemptsMain++;
            
            // 1. Генерируем базу
            let factorsA = getBaseFactors(3, 5);
            let factorsB = getBaseFactors(3, 4);
            
            if (!factorsA || !factorsB) continue;

            const baseGCDInfo = calculateGCDFromFactors(factorsA, factorsB);
            const baseGCD = baseGCDInfo.value;
            const valA = factorsA.reduce((a, b) => a * b, 1);
            const valB = factorsB.reduce((a, b) => a * b, 1);

            // Проверки базы
            if (baseGCD === valA || baseGCD === valB) continue;
            if (forbiddenGCDs.includes(baseGCD)) continue;
            
            // Проверка: 2-4 множителя в НОД
            if (baseGCDInfo.factors.length < 2 || baseGCDInfo.factors.length > 4) continue;

            // 2. Добавляем "шум" (по 2 множителя)
            const tryAddExtra = () => {
                let tempA = [...factorsA];
                let tempB = [...factorsB];
                
                for(let i=0; i<2; i++) tempA.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                for(let i=0; i<2; i++) tempB.push(extraPrimesPool[getRandomInt(0, extraPrimesPool.length-1)]);
                
                return { newA: tempA, newB: tempB };
            };

            let foundExtension = false;
            let finalA = [], finalB = [];

            for (let k = 0; k < 15; k++) {
                const { newA, newB } = tryAddExtra();
                const newGCDInfo = calculateGCDFromFactors(newA, newB);
                
                // НОД должен сохраниться
                if (newGCDInfo.value === baseGCD) {
                    finalA = newA;
                    finalB = newB;
                    foundExtension = true;
                    break;
                }
            }

            if (!foundExtension) continue;

            // 3. ФИНАЛЬНАЯ ПРОВЕРКА ПО ВАШЕМУ НОВОМУ УСЛОВИЮ
            // НОД не должен состоять только из самых маленьких множителей a и b.
            
            const minA = Math.min(...finalA);
            const minB = Math.min(...finalB);
            
            // Нам нужны именно множители НОДа (они те же, что у baseGCDInfo, так как НОД не менялся)
            const gcdFactors = baseGCDInfo.factors;

            // Условие: "Хотя бы в одном числе В НОД должен входить не наименьший простой множитель"
            // То есть существует такой множитель p в составе НОД, что (p > minA) ИЛИ (p > minB).
            
            let complexityCheckPassed = false;
            for (let p of gcdFactors) {
                if (p > minA || p > minB) {
                    complexityCheckPassed = true;
                    break;
                }
            }

            if (!complexityCheckPassed) continue; // Если НОД состоит только из минимумов, пропускаем

            // Сортировка и вывод
            finalA.sort((x, y) => x - y);
            finalB.sort((x, y) => x - y);

            const strA = finalA.join(' · ');
            const strB = finalB.join(' · ');

            return {
                variables: { 
                    a_factors: finalA, 
                    b_factors: finalB, 
                    gcd: baseGCD 
                },
                problemText: `Найдите НОД чисел a и b: <br><br>
a = ${strA} <br><br>
b = ${strB} <br><br> В ответ запишите натуральное число.`
            };
        }
        return this.generate();
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
    }
},

{
    type: " ",
    number: "5count17",
    tags: ["5_класс", "НОД"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Базовые простые для заполнения "пустот" (только они безопасны для добавления)
        const fillerPrimes = [2, 3, 5];
        // Для подсчета множителей в НОД нам нужен полный список возможных простых
        const allPrimes = [2, 3, 5, 7, 11, 13, 17, 19];

        // Запрещенные значения НОД
        const forbiddenGCDs = [49, 77, 91, 119, 133]; 

        const getFactors = (minF, maxF) => {
            let attempts = 0;
            while (attempts < 500) {
                attempts++;
                let f = [];
                
                // 1. Выбираем СТРОГО ОДНУ обязательную базу
                const specialOptions = [
                    [7],           // Либо 7
                    [7, 7],        // Либо 7*7
                    [11],          // Либо 11
                    [13],          // Либо 13
                    [17],          // Либо 17
                    [19],          // Либо 19
                    [2, 2, 2],     // Либо 2^3
                    [2, 2, 2, 2],  // Либо 2^4
                    [3, 3, 3]      // Либо 3^3
                ];
                
                const startSet = specialOptions[getRandomInt(0, specialOptions.length - 1)];
                f.push(...startSet);

                // 2. Добиваем количество множителей ТОЛЬКО числами 2, 3, 5
                // Это гарантирует, что мы случайно не добавим 13 к 11 или 7 к 19
                const targetCount = getRandomInt(minF, maxF);
                while (f.length < targetCount) {
                    f.push(fillerPrimes[getRandomInt(0, fillerPrimes.length - 1)]);
                }

                const val = f.reduce((acc, curr) => acc * curr, 1);

                // 3. Проверки значений
                if (val > 1000) continue;
                if (val > 400 && val % 100 !== 0) continue;

                return { val, factors: f };
            }
            return null;
        };

        let attemptsMain = 0;
        while (attemptsMain < 2000) {
            attemptsMain++;
            
            const aObj = getFactors(3, 5); 
            const bObj = getFactors(3, 4); 
            
            if (!aObj || !bObj) continue;

            const a = aObj.val;
            const b = bObj.val;

            // Функция НОД
            const gcdFunc = (x, y) => y === 0 ? x : gcdFunc(y, x % y);
            const currentGCD = gcdFunc(a, b);

            // --- БЛОК ПРОВЕРОК НОД ---

            // 1. НОД не равен самим числам
            if (currentGCD === a || currentGCD === b) continue;

            // 2. НОД не равен запрещенным комбинациям (7*7, 7*11 и т.д.)
            if (forbiddenGCDs.includes(currentGCD)) continue;

            // 3. Считаем количество простых множителей в НОД
            const getPrimeFactorsCount = (num) => {
                let count = 0;
                let d = num;
                for (let p of allPrimes) {
                    while (d % p === 0) {
                        count++;
                        d /= p;
                    }
                }
                return count;
            };

            const gcdFactorsCount = getPrimeFactorsCount(currentGCD);

            // 4. В НОД должно быть от 2 до 4 простых множителей
            if (gcdFactorsCount >= 2 && gcdFactorsCount <= 4) {
                return {
                    variables: { a, b, gcd: currentGCD },
                    problemText: `Найдите наибольший общий делитель (НОД) чисел ${a} и ${b}.`
                };
            }
        }
        return this.generate(); 
    },

    calculateAnswer: function(vars) {
        return vars.gcd;
    },

    check: function(userAnswer, vars) {
        if (!userAnswer) return false;
        const cleanInput = userAnswer.toString().replace(/\s+/g, '');
        const val = parseInt(cleanInput, 10);
        return val === vars.gcd;
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
            problemText: `Даны три числа, записанные в виде разложения на простые множители: <br><br>
            $a = ${displays[0]}$<br><br>
            $b = ${displays[1]}$<br><br>
            $c = ${displays[2]}$<br><br>
            
            Найдите и запишите все общие делители этих трёх чисел.`
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