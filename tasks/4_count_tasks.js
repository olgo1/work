{
    number: "4_count_3",

    // Примеры вида: a : b + c + d с перестановками
        
    tags: ["4_класс", "счёт", "натуральные_числа", "многозначное_плюс_многозначное", "многозначное_минус_многозначное", "многозначное_делить_однозначное"],
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
}


{
    number: "4_count_2",

    // примеры вида a : b * c + d с перестановками
        
    tags: ["4_класс", "счёт", "натуральные_числа", "многозначное_плюс_многозначное", "многозначное_минус_многозначное", "многозначное_умножить_однозначное", "многозначное_делить_однозначное"],
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
}

{
    number: "4_count_1",

    //  a : b + a + a * b  - и все перестановки

    tags: ["4_класс", "счёт", "натуральные_числа", "многозначное_плюс_многозначное", "многозначное_минус_многозначное", "многозначное_умножить_однозначное", "многозначное_делить_однозначное"],
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
}
