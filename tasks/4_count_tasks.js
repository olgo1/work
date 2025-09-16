const _4countTasks = [

{
    type: " ",
    number: "4_count_13", // Задача 1: a + (b*c+d):e + f
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение на однозначное", "скобки", "type1"],
    generate: () => {
        // --- Шаг 1: Генерируем основу для деления ---
        const e = getRandomInt(2, 9);
        const divisionResult = getRandomInt(20, 100); // Результат деления
        const dividend = divisionResult * e; // Это число, которое должно получиться в скобках

        // --- Шаг 2: Конструктивно генерируем b, c и d ---
        let b, c;
        if (Math.random() > 0.5) {
            // b - трёхзначное, c - однозначное
            b = getRandomInt(100, 300);
            // Вычисляем максимальное значение для c, чтобы d осталось двузначным (>= 10)
            const max_c = Math.floor((dividend - 10) / b);
            if (max_c < 2) return newTasks.find(t => t.number === "27").generate(); // Редкий случай, если b слишком большое. Проще перегенерировать.
            c = getRandomInt(2, max_c);

        } else {
            // c - трёхзначное, b - однозначное
            c = getRandomInt(100, 300);
            const max_b = Math.floor((dividend - 10) / c);
            if (max_b < 2) return newTasks.find(t => t.number === "27").generate();
            b = getRandomInt(2, max_b);
        }

        // Теперь d гарантированно будет натуральным и как минимум двузначным
        const d = dividend - b * c;

        // --- Шаг 3: Генерируем остальные числа и знаки ---
        const a = getRandomInt(100, 999);
        const f = getRandomInt(50, 200);
        
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        const sign2 = (sign1 === '+') ? '-' : (Math.random() > 0.5 ? '+' : '-');

        // Проверяем, чтобы промежуточный результат a +/- divisionResult был натуральным
        if (sign1 === '-' && a < divisionResult) {
            return newTasks.find(t => t.number === "27").generate();
        }

        const problemText = `Вычислите значение выражения: <br> <h3>${a} ${sign1} (${b} * ${c} + ${d}) : ${e} ${sign2} ${f}</h3>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: (vars) => {
        let result = (vars.b * vars.c + vars.d) / vars.e;
        result = (vars.sign1 === '+') ? vars.a + result : vars.a - result;
        result = (vars.sign2 === '+') ? result + vars.f : result - vars.f;
        return result;
    }
},

{
    number: "4_count_12",

    // Сложение и вычитание трёх чисел; одно из них либо промежуточный результат - spare num

    tags: ["4_класс", "счёт", "сложение_многозначных", "вычитание_многозначных", "перенос_разряда", "sparse_nums", "натуральные числа"],
    
    generate: () => {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return null;
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };
        const countBorrows = (minuend, subtrahend) => {
            const mStr = String(minuend);
            const sStr = String(subtrahend).padStart(mStr.length, '0');
            let borrowCount = 0;
            let borrow = 0;
            for (let i = mStr.length - 1; i >= 0; i--) {
                let mDigit = parseInt(mStr[i]) - borrow;
                let sDigit = parseInt(sStr[i]);
                if (mDigit < sDigit) {
                    borrowCount++;
                    borrow = 1;
                } else {
                    borrow = 0;
                }
            }
            return borrowCount;
        };

        const variant = getRandomInt(1, 3);
        let a, b, c, problemText;

        if (variant === 1) {
            // --- ИСПРАВЛЕННЫЙ АЛГОРИТМ ДЛЯ ТИПА 1 ---
            let S;
            do {
                // 1. Конструируем ПЯТИЗНАЧНУЮ сумму S вида X000Y
                const S_head = getRandomInt(2, 9); // Голова от 2 до 9
                const S_tail = getRandomInt(1, 9);   // Хвост от 1 до 9
                S = S_head * 10000 + S_tail;       // Например, 80003

                // 2. Генерируем 'a' как 5-значное число, 'b' получится 4-значным
                // (S - 1000) гарантирует, что b будет не меньше 1000
                a = getRandomInt(10000, S - 1000); 
                b = S - a;

                // 3. Генерируем 'c' с проверкой на 2 заёма и положительный результат
                let attempts = 0;
                do {
                    // Убеждаемся, что диапазон для c валиден
                    if (S - 5001 < 1000) { S = null; break; }
                    c = getRandomInt(1000, S - 5001); // c - 4-х или 5-значное
                    attempts++;
                    if (attempts > 50) { S = null; break; }
                } while (countBorrows(S, c) < 2);

            } while (!S);
            
            problemText = `${a} + ${b} - ${c}`;

        } else if (variant === 2) {
            // --- ТИП 2: a - b - c (без изменений) ---
            let R1;
            do {
                a = getRandomInt(10, 99) * 1000;
                b = generateConstrainedNumber(100, 999, 10);
                R1 = a - b;
            } while (!String(R1).includes('00'));

            let attempts = 0;
            do {
                const min_c = 1000;
                const max_c = R1 - 1;
                if(max_c < min_c) { R1 = null; break; }
                c = getRandomInt(min_c, max_c);
                attempts++;
                if (attempts > 50) { R1 = null; break; }
            } while (countBorrows(R1, c) < 1);
            if (!R1) { return this.generate(); }

            problemText = `${a} - ${b} - ${c}`;

        } else {
            // --- ТИП 3: a - b + c (без изменений) ---
            do {
                a = getRandomInt(20, 99) * 1000;
                b = generateConstrainedNumber(1000, 9999, 10);
                if (a <= b) continue;

                const R_final_head = getRandomInt(10, 99);
                const R_final_tail = getRandomInt(1, 999);
                const R_final = R_final_head * 10000 + R_final_tail;
                
                const R1 = a - b;
                c = R_final - R1;
            } while (c < 1000 || c > 99999);
            
            problemText = `${a} - ${b} + ${c}`;
        }
        
        return { variables: { a, b, c, variant }, problemText };
    },

    calculateAnswer: (vars) => {
        if (vars.variant === 1) {
            return vars.a + vars.b - vars.c;
        } else if (vars.variant === 2) {
            return vars.a - vars.b - vars.c;
        } else { // variant === 3
            return vars.a - vars.b + vars.c;
        }
    }
},

{
    number: "4_count_11",
    tags: ["4_класс", "счёт", "вычитание_многозначных", "перенос_разряда", "sparse_nums", "натуральные_числа"],
    
    generate: () => {
        const u_digits = []; // Цифры уменьшаемого
        const v_digits = []; // Цифры вычитаемого
        const r_digits = []; // Цифры итоговой разности
        let borrow = 0; // Флаг заёма из старшего разряда

        // --- Конструируем цифры с 0-го по 5-й разряд (справа налево) ---

        // Разряд 0 (единицы): ЗАЁМ, результат НЕ НОЛЬ
        r_digits[0] = getRandomInt(1, 9);
        u_digits[0] = getRandomInt(0, r_digits[0] - 1);
        v_digits[0] = 10 + u_digits[0] - r_digits[0];
        borrow = 1;

        // Разряд 1 (десятки): БЕЗ ЗАЁМА, результат НОЛЬ
        r_digits[1] = 0;
        u_digits[1] = getRandomInt(borrow + 1, 9); // u_digit должен быть > borrow
        v_digits[1] = u_digits[1] - r_digits[1] - borrow;
        borrow = 0;

        // Разряд 2 (сотни): ЗАЁМ, результат НЕ НОЛЬ
        r_digits[2] = getRandomInt(1, 9);
        u_digits[2] = getRandomInt(borrow, r_digits[2] - 1);
        v_digits[2] = 10 + u_digits[2] - r_digits[2] - borrow;
        borrow = 1;

        // Разряд 3 (тысячи): БЕЗ ЗАЁМА, результат НОЛЬ
        r_digits[3] = 0;
        u_digits[3] = getRandomInt(borrow + 1, 9);
        v_digits[3] = u_digits[3] - r_digits[3] - borrow;
        borrow = 0;

        // Разряд 4 (десятки тысяч): ЗАЁМ, результат НЕ НОЛЬ
        r_digits[4] = getRandomInt(1, 9);
        u_digits[4] = getRandomInt(borrow, r_digits[4] - 1);
        v_digits[4] = 10 + u_digits[4] - r_digits[4] - borrow;
        borrow = 1;

        // Разряд 5 (сотни тысяч): БЕЗ ЗАЁМА, результат НЕ НОЛЬ
        r_digits[5] = getRandomInt(1, 8); // Первая цифра не может быть 9, чтобы u не стало 7-значным
        // u_digits[5] должен быть больше v_digits[5] + borrow
        v_digits[5] = getRandomInt(1, 8 - r_digits[5]); // v - тоже большое число
        u_digits[5] = v_digits[5] + r_digits[5] + borrow;
        
        // Собираем итоговые числа из массивов цифр
        const u = parseInt(u_digits.reverse().join(''));
        const v = parseInt(v_digits.reverse().join(''));

        const problemText = `Вычислите: ${u} - ${v}`;
        
        return { variables: { u, v }, problemText };
    },

    calculateAnswer: (vars) => {
        return vars.u - vars.v;
    }
},

{
    number: "4_count_10", 

    // Сложение двух многозначных чисел = разреженное число
    tags: ["4_класс", "сложение_многозначных", "круглые_числа", "счёт", "натуральные_числа", "sparse_nums"],

    // Функция генерации задачи
    generate: () => {
        // Задаём переменные согласно вашему алгоритму
        const k_zeros = getRandomElement([3, 4]); // 3 или 4 нуля в итоговой сумме
        const powerOf10 = Math.pow(10, k_zeros);

        // Генерируем "хвосты" слагаемых так, чтобы их сумма была равна 10^k_zeros
        const s1_tail = getRandomInt(1, powerOf10 - 1);
        const s2_tail = powerOf10 - s1_tail;

        let s1_head, s2_head;
        // Генерируем "головы" слагаемых, пока их сумма не будет равна 9
        // Это предотвращает появление лишнего нуля в сумме (например, 5 + 4 + 1 = 10)
        do {
            s1_head = getRandomInt(1, 99);
            s2_head = getRandomInt(1, 99);
        } while (s1_head + s2_head === 9);

        // Конструируем итоговые слагаемые
        const s1 = s1_head * powerOf10 + s1_tail;
        const s2 = s2_head * powerOf10 + s2_tail;

        // Формируем текст задачи
        const problemText = `Вычислите: ${s1} + ${s2}`;

        // Возвращаем переменные и текст
        return { variables: { s1, s2 }, problemText };
    },

    // Функция для вычисления правильного ответа
    calculateAnswer: (vars) => {
        return vars.s1 + vars.s2;
    }
},

{
    number: "4_count_9", 
    
    // Произведение многозначного на однозначное = разреженное число
    tags: ["4_класс", "sparse_nums", "счёт", "натуральные_числа", "умножение_на_однозначное"],
    
    generate: () => {
        const variant = getRandomInt(1, 4); // Случайно выбираем один из 4 алгоритмов
        let factor1, factor2, problemText;

        switch (variant) {
            case 1: {
                // --- Логика из Задачи 2.1 ---
                const n = getRandomElement([3, 4, 6, 7, 8, 9]);
                const k = getRandomElement([5, 6]);
                let a;
                do {
                    a = getRandomInt(11, 90);
                } while (a % n === 0 || a % 10 === 0);
                
                const m = Math.floor((a * Math.pow(10, k)) / n) + 1;
                
                factor1 = n;
                factor2 = m;
                problemText = `Вычислите: ${factor1} · ${factor2}`;
                break;
            }
            case 2: {
                // --- Логика из Задачи 2.2 ---
                const n = getRandomElement([3, 4, 6, 7, 8, 9]);
                const k = getRandomElement([3, 4]);
                const a = getRandomInt(100, 999);
                const term = a * Math.pow(10, k);
                const b = (n - (term % n)) % n;
                const p = term + b;
                const m = p / n;

                factor1 = m;
                factor2 = n;
                problemText = `Вычислите: ${factor1} · ${factor2}`;
                break;
            }
            case 3: {
                // --- Логика из Задачи 2.3 ---
                const n = getRandomElement([3, 6, 7, 9]);
                const k = getRandomElement([4, 5]);
                const a = getRandomInt(11, 99);
                const term = a * Math.pow(10, k);
                const b = (n - (term % n)) % n;
                const p = term + b;
                const m = p / n;
                
                factor1 = m;
                factor2 = n;
                problemText = `Вычислите: ${factor1} · ${factor2}`;
                break;
            }
            case 4: {
                // --- Логика из Задачи 2.4 ---
                const m2 = 8;
                let m1;
                do {
                    // Выбираем нечётный коэффициент, чтобы m1 было 4-х или 5-значным
                    const c_min = Math.ceil(1000 / 1250); // c >= 1
                    const c_max = Math.floor(99999 / 1250); // c <= 79
                    const c = getRandomInt(c_min, c_max) * 2 - 1; // генерируем нечётное число
                    m1 = 1250 * c;
                } while (m1 % 100 === 0);

                factor1 = m1;
                factor2 = m2;
                problemText = `Вычислите: ${factor1} · ${factor2}`;
                break;
            }
        }

        // Чтобы сделать пример интереснее, можем поменять множители местами
        if (getRandomInt(0, 1) === 1) {
            [factor1, factor2] = [factor2, factor1];
            problemText = `Вычислите: ${factor1} · ${factor2}`;
        }
        
        return { variables: { factor1, factor2 }, problemText };
    },

    calculateAnswer: (vars) => {
        return vars.factor1 * vars.factor2;
    }
},

{
    number: "4_count_8",

    // Деление многозначного разреженного на однозначное
    tags: ["4_класс", "деление_на_однозначное", "sparse_nums", "счёт", "натуральные_числа"],

    // Функция генерации задачи
    generate: () => {
        // Задаём переменные согласно вашему алгоритму
        const m = getRandomElement([3, 4, 6, 7, 8, 9]);
        const k = getRandomElement([4, 5]);

        let a;
        // Генерируем "голову" `a`, удовлетворяющую требованиям
        do {
            a = getRandomInt(11, 99);
        } while (a % m === 0 || a % 10 === 0);

        // Находим все возможные значения для "хвоста" b
        // b должно быть однозначным (1-9) и делать всё число n кратным m
        const candidates_b = [];
        const term = a * Math.pow(10, k);
        
        // Находим базовое значение для остатка
        let b_base = (m - (term % m)) % m;
        
        // Так как b не может быть 0, если b_base=0, начинаем с b=m
        if (b_base === 0) {
            b_base = m;
        }

        // Собираем всех кандидатов: b_base, b_base + m, b_base + 2m и т.д., пока они однозначные
        for (let b_candidate = b_base; b_candidate < 10; b_candidate += m) {
            candidates_b.push(b_candidate);
        }
        
        // Выбираем случайного кандидата из возможных
        const b = getRandomElement(candidates_b);
        
        // Конструируем итоговое число n
        const n = a * Math.pow(10, k) + b;

        // Формируем текст задачи
        const problemText = `Вычислите: ${n} : ${m}`;

        // Возвращаем переменные и текст
        return { variables: { n, m }, problemText };
    },

    // Функция для вычисления правильного ответа
    calculateAnswer: (vars) => {
        return vars.n / vars.m;
    }
},

{
    
    number: "4_count_7",
    
    // Деление многозначного разреженного числа на однозначное

    tags: ["4_класс", "деление_на_однозначное", "sparse_nums", "счёт", "натуральные_числа"],

    // Функция генерации задачи
    generate: () => {
        // Задаём переменные согласно вашему алгоритму
        // Исключаем m = 4, 8, так как для них требование 2 невыполнимо
        const m = getRandomElement([3, 6, 7, 9]);
        const k = getRandomElement([5, 6]);

        let a;
        // Генерируем "голову" `a`, удовлетворяющую требованиям
        do {
            a = getRandomInt(10, 99);
            // Требование 1: a не делится на m
            // Требование 2: (a * 10^k) не делится на m.
            // Это требование имеет значение только для m=6, где оно сводится к "a не делится на 3".
        } while (a % m === 0 || (m === 6 && a % 3 === 0));

        // Вычисляем базовое значение для "хвоста" `b`
        const term = a * Math.pow(10, k);
        const b_base = (m - (term % m)) % m;

        // Находим итоговый двузначный "хвост" `b`
        let b = b_base;
        while (b < 10) {
            b += m;
        }
        // Этот цикл гарантирует, что b >= 10. Так как m <= 9, b всегда будет <= 99.

        // Конструируем итоговое число n
        const n = a * Math.pow(10, k) + b;

        // Формируем текст задачи
        const problemText = `Вычислите: ${n} : ${m}`;

        // Возвращаем переменные и текст
        return { variables: { n, m }, problemText };
    },

    // Функция для вычисления правильного ответа
    calculateAnswer: (vars) => {
        return vars.n / vars.m;
    }
},

{
    number: "4_count_6",

    // Примеры вида a : b - c (a шестизначное)
        
    tags: ["4_класс", "счёт", "натуральные числа", "вычитание_многозначных", "деление_на_однозначное"],
    generate: () => {
        // Вспомогательная функция для проверки, есть ли перенос разряда при вычитании
        const hasBorrow = (minuend, subtrahend) => {
            const mStr = String(minuend);
            // Дополняем c нулями спереди, чтобы длины строк совпадали
            const sStr = String(subtrahend).padStart(mStr.length, '0');
            
            let borrow = 0;
            for (let i = mStr.length - 1; i >= 0; i--) {
                let mDigit = parseInt(mStr[i]) - borrow;
                let sDigit = parseInt(sStr[i]);
                if (mDigit < sDigit) {
                    return true; // Найден перенос разряда!
                }
                borrow = mDigit < sDigit ? 1 : 0;
            }
            return false; // Переносов не было
        };

        let a, b, c, q;
        let attempts = 0;
        
        do {
            // 1. Генерируем делитель b и частное q
            b = getRandomElement([5, 6, 7, 8, 9]);
            // Выбираем q так, чтобы a было шестизначным
            const min_q = Math.ceil(100000 / b);
            const max_q = Math.floor(999999 / b);
            q = getRandomInt(min_q, max_q);

            // 2. Вычисляем a, которое гарантированно делится на b
            a = q * b;

            // 3. Генерируем c, которое меньше q, и проверяем условие переноса разряда
            // Генерируем c в диапазоне, где перенос вероятен (от половины q до q)
            c = getRandomInt(Math.floor(q / 2), q - 1);
            
            attempts++;
            // Если за 50 попыток не нашлось c с переносом, начинаем всю генерацию заново
            if (attempts > 50) {
                attempts = 0;
                continue;
            }

        } while (!hasBorrow(q, c));

        const problemText = `${a} : ${b} - ${c}`;
        
        return { variables: { a, b, c }, problemText };
    },
    calculateAnswer: (vars) => {
        return (vars.a / vars.b) - vars.c;
    }
},


{
    number: "4_count_5",

    // Примеры вида a : b + c + d + e со всеми перестановками
        
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок"],
    generate: () => {
        const generateConstrainedNumber = (min, max) => {
            if (min > max) throw new Error("Invalid range for number generation");
            return getRandomInt(min, max);
        };

        let a, b, c, d, e, orderIds, operators, problemText;
        let success = false;

        while (!success) {
            try {
                const cde_blocks = ['c', 'd', 'e'];
                const first_block_id = getRandomElement(cde_blocks);
                const remaining_ids = ['div', ...cde_blocks.filter(id => id !== first_block_id)];
                
                for (let i = remaining_ids.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [remaining_ids[i], remaining_ids[j]] = [remaining_ids[j], remaining_ids[i]];
                }
                
                orderIds = [first_block_id, ...remaining_ids];

                const opChoices = [['+', '+', '-'], ['+', '-', '+'], ['-', '+', '+'], ['+', '-', '-'], ['-', '+', '-'], ['-', '-', '+'], ['-', '-', '-']];
                operators = getRandomElement(opChoices);
                
                // Designate which of c, d, e will be three-digit
                const threeDigitBlock = getRandomElement(['c', 'd', 'e']);

                let currentValue = 0;
                const generatedValues = {};

                for (let i = 0; i < orderIds.length; i++) {
                    const blockId = orderIds[i];
                    const op = (i === 0) ? '+' : operators[i - 1];
                    let newValue;

                    const isThreeDigit = (blockId === threeDigitBlock);
                    const minVal = isThreeDigit ? 100 : 10;
                    const maxVal = isThreeDigit ? 999 : 99;

                    if (op === '+') {
                        if (blockId === 'div') {
                            b = getRandomElement([6, 7, 8, 9]);
                            const min_q = Math.ceil(1000 / b);
                            const max_q = Math.floor(9999 / b);
                            const q = generateConstrainedNumber(min_q, max_q);
                            a = q * b;
                            newValue = q;
                        } else {
                            newValue = generateConstrainedNumber(minVal, maxVal);
                        }
                    } else { // op === '-'
                        const maxSubtract = currentValue - 1;
                        if (maxSubtract < minVal) throw new Error("Intermediate value too small");

                        if (blockId === 'div') {
                             b = getRandomElement([6, 7, 8, 9]);
                             const min_q = Math.ceil(1000 / b);
                             const max_q = Math.min(Math.floor(9999 / b), maxSubtract);
                             const q = generateConstrainedNumber(min_q, max_q);
                             a = q * b;
                             newValue = q;
                        } else {
                             newValue = generateConstrainedNumber(minVal, Math.min(maxVal, maxSubtract));
                        }
                    }
                    
                    generatedValues[blockId] = newValue;
                    if (op === '+') currentValue += newValue; else currentValue -= newValue;
                }
                
                c = generatedValues['c'];
                d = generatedValues['d'];
                e = generatedValues['e'];

                const strings = {
                    div: `${a} : ${b}`,
                    c: `${c}`,
                    d: `${d}`,
                    e: `${e}`
                };
                problemText = strings[orderIds[0]];
                problemText += ` ${operators[0]} ${strings[orderIds[1]]}`;
                problemText += ` ${operators[1]} ${strings[orderIds[2]]}`;
                problemText += ` ${operators[2]} ${strings[orderIds[3]]}`;
                
                success = true;

            } catch (error) {
                success = false;
            }
        }

        return { variables: { a, b, c, d, e, orderIds, operators }, problemText };
    },
    calculateAnswer: (vars) => {
        const values = {
            div: vars.a / vars.b,
            c: vars.c,
            d: vars.d,
            e: vars.e
        };

        let result = values[vars.orderIds[0]];
        const [op1, op2, op3] = vars.operators;
        
        if (op1 === '+') result += values[vars.orderIds[1]]; else result -= values[vars.orderIds[1]];
        if (op2 === '+') result += values[vars.orderIds[2]]; else result -= values[vars.orderIds[2]];
        if (op3 === '+') result += values[vars.orderIds[3]]; else result -= values[vars.orderIds[3]];

        return result;
    }
},

{
    number: "4_count_4",

    // Примеры вида a : b : c + d (b кратно c)

    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок"],
    generate: () => {
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return min; // Failsafe
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };

        let a, b, c, d, q, opSign;
        
        // Карта возможных значений c для каждого b (c не равно 2, c - делитель b)
        const c_options = {
            6: [3, 6],
            8: [4, 8],
            9: [3, 9]
        };

        let lower_bound_q, upper_bound_q;
        
        // Внешний цикл для редких случаев, когда сгенерировать пример с первого раза невозможно
        do {
            // 1. Генерируем b, c, d и оператор
            b = getRandomElement([6, 8, 9]);
            c = getRandomElement(c_options[b]);
            d = generateConstrainedNumber(1000, 9999, 10); // d - четырехзначное, не кратное 10
            opSign = getRandomElement([-1, 1]);

            // 2. Вычисляем корректный диапазон для "базового частного" q
            const product_bc = b * c;
            upper_bound_q = Math.floor(99999 / product_bc); // Верхняя граница, чтобы a было 5-значным
            
            let lower_bound_op = 1;
            if (opSign === -1) {
                lower_bound_op = d + 1; // Нижняя граница, чтобы результат вычитания был > 0
            }
            
            const lower_bound_digits = Math.ceil(10000 / product_bc); // Нижняя граница, чтобы a было 5-значным
            lower_bound_q = Math.max(lower_bound_digits, lower_bound_op);

        } while (lower_bound_q >= upper_bound_q); // Перезапуск, если нет валидного диапазона для q

        // 3. Генерируем a из гарантированно правильного диапазона
        do {
            q = getRandomInt(lower_bound_q, upper_bound_q);
            a = q * b * c;
        } while (a % 100 === 0);

        // 4. Формируем текст задачи
        const opString = opSign === 1 ? '+' : '-';
        const problemText = `${a} : ${b} : ${c} ${opString} ${d}`;
        
        return { variables: { a, b, c, d, opSign }, problemText };
    },
    calculateAnswer: (vars) => {
        const intermediateResult = (vars.a / vars.b) / vars.c;
        if (vars.opSign === 1) {
            return intermediateResult + vars.d;
        } else {
            return intermediateResult - vars.d;
        }
    }
},

{
    number: "4_count_3",

    // Примеры вида: a : b + c + d с перестановками
        
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок"],
    generate: () => {
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return min; // Failsafe
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };

        let a, b, c, d, q_a;
        
        // ИСПРАВЛЕНИЕ: Добавлен внешний цикл для обработки редких случаев, когда нет решения
        let lower_bound_q, upper_bound_q;
        do {
            // 1. Генерируем два "меньших" блока: c и d
            c = generateConstrainedNumber(10000, 90000, 100); // Снижен верхний предел для стабильности
            d = generateConstrainedNumber(1000, 9000, 100);
            const sum_cd = c + d;
            b = getRandomElement([4, 5, 6, 7, 8, 9]);

            // ИСПРАВЛЕНИЕ: Заранее вычисляем корректный диапазон для q_a
            upper_bound_q = Math.floor(99999 / b); // q_a не может быть больше этого, чтобы a было 5-значным
            lower_bound_q = Math.max(Math.ceil(10000 / b), sum_cd + 1); // q_a должен быть больше sum_cd и давать 5-значное a

        } while (lower_bound_q >= upper_bound_q); // Перезапускаем, если условия несовместимы (c и d слишком большие)

        // 2. Генерируем "якорной" блок (a:b) из гарантированно правильного диапазона
        do {
            q_a = getRandomInt(lower_bound_q, upper_bound_q);
            a = q_a * b;
        } while (a % 100 === 0); // Эта проверка теперь очень быстрая

        // 3. Создаём объекты, описывающие каждый блок
        const term_div = { id: 'div', str: `${a} : ${b}` };
        const term_c = { id: 'c', str: `${c}` };
        const term_d = { id: 'd', str: `${d}` };

        // 4. Составляем и перемешиваем выражение
        const firstTerm = term_div;
        const remainingTerms = [term_c, term_d];
        if (getRandomInt(0, 1) === 1) {
            [remainingTerms[0], remainingTerms[1]] = [remainingTerms[1], remainingTerms[0]];
        }
        const finalOrder = [firstTerm, ...remainingTerms];
        const orderIds = finalOrder.map(t => t.id);

        // 5. Выбираем операторы (гарантируем хотя бы один минус)
        const opPairs = [['+', '-'], ['-', '+'], ['-', '-']];
        const operators = getRandomElement(opPairs);

        // 6. Формируем текст задачи
        let problemText = `${finalOrder[0].str} ${operators[0]} ${finalOrder[1].str} ${operators[1]} ${finalOrder[2].str}`;

        return { variables: { a, b, c, d, orderIds, operators }, problemText };
    },
    calculateAnswer: (vars) => {
        const values = {
            div: vars.a / vars.b,
            c: vars.c,
            d: vars.d
        };

        const term1_val = values[vars.orderIds[0]];
        const term2_val = values[vars.orderIds[1]];
        const term3_val = values[vars.orderIds[2]];
        const [op1, op2] = vars.operators;

        let result = term1_val;
        if (op1 === '+') result += term2_val; else result -= term2_val;
        if (op2 === '+') result += term3_val; else result -= term3_val;

        return result;
    }
},


{
    number: "4_count_2",

    // примеры вида a : b * c + d с перестановками
        
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок"],
    generate: () => {
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return null; // Невозможно сгенерировать
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

        let a, b, c, d, opSign, problemText;
        const format = getRandomInt(1, 2); // 1 for a*b:c, 2 for a:b*c

        if (format === 1) { // Вариация a * b : c & d
            let one_digit, multi_digit;
            const digits = [3, 4, 5, 6, 7, 8, 9];
            
            // Генерируем однозначные числа так, чтобы one_digit не делилось на c
            do {
                one_digit = getRandomElement(digits);
                const c_options = digits.filter(x => x !== one_digit);
                c = getRandomElement(c_options);
            } while (one_digit % c === 0);

            // Конструктивный шаг для делимости: multi_digit должен быть кратен c / НОД(one_digit, c)
            const requiredDivisor = c / gcd(one_digit, c);
            do {
                const minQuotient = Math.ceil(1000 / requiredDivisor);
                const maxQuotient = Math.floor(99999 / requiredDivisor);
                const q = getRandomInt(minQuotient, maxQuotient);
                multi_digit = q * requiredDivisor;
            } while (multi_digit % 10 === 0);
            
            // Случайно присваиваем значения a и b
            if (getRandomInt(0, 1) === 0) { a = one_digit; b = multi_digit; } else { a = multi_digit; b = one_digit; }
            
            const intermediateResult = (a * b) / c;
            opSign = getRandomElement([-1, 1]);

            if (opSign === 1) { // Сложение
                d = generateConstrainedNumber(1000, 99999, 100);
            } else { // Вычитание
                const max_d = intermediateResult - 1;
                d = generateConstrainedNumber(1000, max_d, 100);
                if (d === null) { // Если результат слишком мал, форсируем сложение
                    opSign = 1;
                    d = generateConstrainedNumber(1000, 99999, 100);
                }
            }
            const opString = opSign === 1 ? '+' : '-';
            problemText = `${a} · ${b} : ${c} ${opString} ${d}`;

        } else { // Вариация a : b * c & d
            const digits = [3, 4, 5, 6, 7, 8, 9];
            // Здесь b всегда однозначное, а a - многозначное
            do {
                b = getRandomElement(digits);
                const c_options = digits.filter(x => x !== b);
                c = getRandomElement(c_options);
            } while (b % c === 0);

            do {
                const q = getRandomInt(1001, 33333); // Выбираем частное
                a = q * b;
            } while (a % 10 === 0 || a < 1000 || a > 99999);

            const intermediateResult = (a / b) * c;
            opSign = getRandomElement([-1, 1]);

            if (opSign === 1) { // Сложение
                d = generateConstrainedNumber(1000, 99999, 100);
            } else { // Вычитание
                const max_d = intermediateResult - 1;
                d = generateConstrainedNumber(1000, max_d, 100);
                 if (d === null) { // Если результат слишком мал, форсируем сложение
                    opSign = 1;
                    d = generateConstrainedNumber(1000, 99999, 100);
                }
            }
            const opString = opSign === 1 ? '+' : '-';
            problemText = `${a} : ${b} · ${c} ${opString} ${d}`;
        }
        
        return { variables: { a, b, c, d, opSign, format }, problemText };
    },
    calculateAnswer: (vars) => {
        let result;
        if (vars.format === 1) {
            result = (vars.a * vars.b) / vars.c;
        } else {
            result = (vars.a / vars.b) * vars.c;
        }

        if (vars.opSign === 1) {
            return result + vars.d;
        } else {
            return result - vars.d;
        }
    }
},

{
    number: "4_count_1",

    //  a : b + a + a * b  - и все перестановки

    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок"],
    generate: () => {
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };

        // 1. Генерируем "маленький" блок P3 (число c)
        const c = generateConstrainedNumber(1000, 15000, 100); // Ограничим его сверху для упрощения

        // 2. Генерируем "большой" блок P1 (a:b) так, чтобы он был больше c
        const b = getRandomElement([3, 4, 5, 6, 7, 8, 9]);
        let a, q_a;
        do {
            q_a = getRandomInt(c + 1, c + 20000); // Гарантируем, что частное > c
            a = q_a * b;
        } while (a % 100 === 0 || a < 1000 || a > 99999);
        const p1_val = q_a;

        // 3. Генерируем "большой" блок P2 (d*e) так, чтобы он был больше c
        const d_options = [3, 4, 5, 6, 7, 8, 9].filter(x => x !== b);
        const d = getRandomElement(d_options);
        const min_e = Math.ceil((c + 1) / d);
        const e = generateConstrainedNumber(Math.max(1000, min_e), 9999, 10);
        const p2_val = d * e;
        
        // 4. Создаём объекты, описывающие каждый блок
        const term1 = { id: 'div', val: p1_val, str: `${a} : ${b}` };
        const term2 = { id: 'mul', val: p2_val, str: `${d} · ${e}` };
        const term3 = { id: 'c', val: c, str: `${c}` };

        // 5. Составляем и перемешиваем выражение
        const positiveTerms = [term1, term2];
        const negativeTerm = term3;

        // Случайно выбираем, какой из "больших" блоков будет первым
        const firstTerm = positiveTerms.splice(getRandomInt(0, 1), 1)[0];
        
        // Оставшиеся два блока (один большой, один маленький) ставим в случайном порядке
        const remainingTerms = [positiveTerms[0], negativeTerm];
        if (getRandomInt(0, 1) === 1) {
            [remainingTerms[0], remainingTerms[1]] = [remainingTerms[1], remainingTerms[0]];
        }
        
        const finalOrder = [firstTerm, ...remainingTerms];
        const orderIds = finalOrder.map(t => t.id); // Сохраняем порядок для функции расчёта

        // 6. Формируем текст задачи
        let problemText = finalOrder[0].str;
        let op1, op2;
        // Второй блок всегда будет с минусом, если это term3, или с плюсом, если это другой большой блок
        if (finalOrder[1].id === 'c') {
            op1 = '-';
            op2 = '+';
        } else {
            op1 = '+';
            op2 = '-';
        }
        problemText += ` ${op1} ${finalOrder[1].str} ${op2} ${finalOrder[2].str}`;

        return { variables: { a, b, c, d, e, orderIds, op1, op2 }, problemText };
    },
    calculateAnswer: (vars) => {
        const values = {
            div: vars.a / vars.b,
            mul: vars.d * vars.e,
            c: vars.c
        };

        const term1_val = values[vars.orderIds[0]];
        const term2_val = values[vars.orderIds[1]];
        const term3_val = values[vars.orderIds[2]];

        let result = term1_val;
        if (vars.op1 === '+') result += term2_val; else result -= term2_val;
        if (vars.op2 === '+') result += term3_val; else result -= term3_val;

        return result;
    }
},
];

window.taskRegistry.push(..._4countTasks);
