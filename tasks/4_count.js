
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
