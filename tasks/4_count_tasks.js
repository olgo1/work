const _4countTasks = [

{
    type: " ",
    number: "4count21",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const c = getRandomInt(10, 99);
        const d = getRandomInt(4, 9);
        const cd_product = c * d;
        let b, paren_text, paren_res;
        if (Math.random() > 0.5) {
            const b_lower_bound = Math.max(100, cd_product + 1);
            if (b_lower_bound > 999) return this.generate();
            b = getRandomInt(b_lower_bound, 999);
            paren_res = b - cd_product;
            paren_text = `(${b} - ${c} · ${d})`;
        } else {
            const b_upper_bound = cd_product - 1;
            if (b_upper_bound < 100) return this.generate();
            b = getRandomInt(100, b_upper_bound);
            paren_res = cd_product - b;
            paren_text = `(${c} · ${d} - ${b})`;
        }
        const f = getRandomInt(4, 9);
        const e_upper_bound = Math.floor(999 / f);
        if (e_upper_bound < 100) return this.generate();
        const e = getRandomInt(100, e_upper_bound);
        const product_res = e * f;
        const product_text = Math.random() > 0.5 ? `${e} · ${f}` : `${f} · ${e}`;
        const a = getRandomInt(100, 999);
        const terms = { A: { val: a, txt: a.toString() }, P: { val: paren_res, txt: paren_text }, Pr: { val: product_res, txt: product_text } };
        const validExpressions = [];
        if (terms.A.val + terms.Pr.val < 1000 && terms.A.val + terms.Pr.val > terms.P.val) { validExpressions.push({ text: `${terms.A.txt} + ${terms.Pr.txt} - ${terms.P.txt}`, answer: terms.A.val + terms.Pr.val - terms.P.val }); }
        if (terms.A.val > terms.P.val && (terms.A.val - terms.P.val) + terms.Pr.val < 1000) { validExpressions.push({ text: `${terms.A.txt} - ${terms.P.txt} + ${terms.Pr.txt}`, answer: terms.A.val - terms.P.val + terms.Pr.val }); }
        if (terms.A.val > terms.P.val && (terms.A.val - terms.P.val) > terms.Pr.val) { validExpressions.push({ text: `${terms.A.txt} - ${terms.P.txt} - ${terms.Pr.txt}`, answer: terms.A.val - terms.P.val - terms.Pr.val }); }
        if (terms.A.val > terms.Pr.val && (terms.A.val - terms.Pr.val) > terms.P.val) { validExpressions.push({ text: `${terms.A.txt} - ${terms.Pr.txt} - ${terms.P.txt}`, answer: terms.A.val - terms.Pr.val - terms.P.val }); }
        if (terms.Pr.val + terms.A.val < 1000 && terms.Pr.val + terms.A.val > terms.P.val) { validExpressions.push({ text: `${terms.Pr.txt} + ${terms.A.txt} - ${terms.P.txt}`, answer: terms.Pr.val + terms.A.val - terms.P.val }); }
        if (terms.Pr.val > terms.P.val && (terms.Pr.val - terms.P.val) + terms.A.val < 1000) { validExpressions.push({ text: `${terms.Pr.txt} - ${terms.P.txt} + ${terms.A.txt}`, answer: terms.Pr.val - terms.P.val + terms.A.val }); }
        if (terms.Pr.val > terms.P.val && (terms.Pr.val - terms.P.val) > terms.A.val) { validExpressions.push({ text: `${terms.Pr.txt} - ${terms.P.txt} - ${terms.A.txt}`, answer: terms.Pr.val - terms.P.val - terms.A.val }); }
        if (validExpressions.length === 0) return this.generate();
        const chosenExpression = validExpressions[getRandomInt(0, validExpressions.length - 1)];
        return {
            variables: { a, b, c, d, e, f, answer: chosenExpression.answer },
            problemText: `Вычислите:<br><div class="problem-expression">${chosenExpression.text}</div>`
        };
    },
    calculateAnswer: function(vars) { return vars.answer; }
},

{
    type: " ",
    number: "4count20",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "2"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const paren_res = getRandomInt(4, 9);
        let b;
        do { b = getRandomInt(4, 9); } while (b % paren_res === 0);
        const a_upper_bound = Math.floor(999 / b);
        const a_lower_bound = Math.ceil(100 / paren_res) * paren_res;
        if (a_lower_bound > a_upper_bound) return this.generate();
        const possible_a = [];
        for (let i = a_lower_bound; i <= a_upper_bound; i += paren_res) { possible_a.push(i); }
        if (possible_a.length === 0) return this.generate();
        const a = possible_a[getRandomInt(0, possible_a.length - 1)];
        const c = getRandomInt(100, 999);
        const d = c - paren_res;
        const term1_result = (a * b) / paren_res;
        const f = getRandomInt(3, 9);
        const term2_lower = Math.ceil(100 / f);
        const term2_upper = Math.floor(999 / f);
        if (term2_lower > term2_upper) return this.generate();
        const term2_result = getRandomInt(term2_lower, term2_upper);
        const e = term2_result * f;
        if (term1_result + term2_result >= 1000) return this.generate();
        const term1_text_part1 = `${a} · ${b} : (${c} - ${d})`;
        const term1_text_part2 = `${a} : (${c} - ${d}) · ${b}`;
        const term1_text = Math.random() > 0.5 ? term1_text_part1 : term1_text_part2;
        const term2_text = `${e} : ${f}`;
        let problemText, sign;
        if (Math.random() > 0.5) {
            sign = '+';
            const final_text = Math.random() > 0.5 ? `${term1_text} + ${term2_text}` : `${term2_text} + ${term1_text}`;
            problemText = `Вычислите:<br><div class="problem-expression">${final_text}</div>`;
        } else {
            sign = '-';
            if (term1_result >= term2_result) {
                problemText = `Вычислите:<br><div class="problem-expression">${term1_text} - ${term2_text}</div>`;
            } else {
                problemText = `Вычислите:<br><div class="problem-expression">${term2_text} - ${term1_text}</div>`;
            }
        }
        return { variables: { a, b, c, d, e, f, term1_result, term2_result, sign }, problemText };
    },
    calculateAnswer: function(vars) {
        if (vars.sign === '+') { return vars.term1_result + vars.term2_result; }
        else { return Math.abs(vars.term1_result - vars.term2_result); }
    }
},

{
    type: " ",
    number: "4count19",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "4"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const paren1_result = getRandomInt(2, 9);
        const a = getRandomInt(301, 899);
        const b = a - paren1_result;
        const d = getRandomInt(2, 9);
        const div_res_lower = Math.ceil(201 / d);
        let div_res_upper = Math.floor(899 / d);
        const max_paren2_result = Math.floor(999 / paren1_result);
        div_res_upper = Math.min(div_res_upper, max_paren2_result);
        if (div_res_lower >= div_res_upper) return this.generate();
        const paren2_result = getRandomInt(div_res_lower, div_res_upper);
        const c = paren2_result * d;
        let e, f;
        if (Math.random() > 0.5) { e = getRandomInt(2, 9); f = getRandomInt(10, 99); }
        else { e = getRandomInt(10, 99); f = getRandomInt(2, 9); }
        const term1_result = paren1_result * paren2_result;
        const term2_result = e * f;
        const term1_text = Math.random() > 0.5 ? `(${a} - ${b}) · (${c} : ${d})` : `(${c} : ${d}) · (${a} - ${b})`;
        const term2_text = `${e} · ${f}`;
        let problemText;
        if (term1_result > term2_result) {
            problemText = `Вычислите:<br><div class="problem-expression">${term1_text} - ${term2_text}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${term2_text} - ${term1_text}</div>`;
        }
        return { variables: { a, b, c, d, e, f, term1_result, term2_result }, problemText };
    },
    calculateAnswer: function(vars) { return Math.abs(vars.term1_result - vars.term2_result); }
},

{
    type: " ",
    number: "4count18", 
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "3"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const c = getRandomInt(4, 9);
        const d = getRandomInt(4, 9);
        const f = getRandomInt(2, 9);
        let term1_result, term2_result, a, b, e;
        const e_div_f = getRandomInt(10, 50);
        e = e_div_f * f;
        term2_result = e_div_f;
        if (Math.random() > 0.5) {
            term1_result = getRandomInt(term2_result + 1, term2_result + 50);
        } else {
            if (term2_result <= 10) return this.generate();
            term1_result = getRandomInt(1, term2_result - 1);
        }
        const parenValue = term1_result * d; 
        if (parenValue <= 20) return this.generate(); 
        const max_b_div_c = Math.min(Math.floor(999 / c), parenValue - 10);
        if (max_b_div_c <= 10) return this.generate();
        const b_div_c = getRandomInt(10, max_b_div_c);
        b = b_div_c * c;
        a = parenValue - b_div_c;
        let twoDigitCount = 0;
        if (a < 100) twoDigitCount++;
        if (b < 100) twoDigitCount++;
        if (e < 100) twoDigitCount++;
        if (twoDigitCount > 1) return this.generate(); 
        const term1_text = Math.random() > 0.5 ? `(${a} + ${b} : ${c}) : ${d}` : `(${b} : ${c} + ${a}) : ${d}`;
        const term2_text = `${e} : ${f}`;
        let problemText;
        if (term1_result > term2_result) {
            problemText = `Вычислите:<br><div class="problem-expression">${term1_text} - ${term2_text}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${term2_text} - ${term1_text}</div>`;
        }
        return { variables: { a, b, c, d, e, f, term1_result, term2_result}, problemText };
    },
    calculateAnswer: function(vars) { return Math.max(vars.term1_result, vars.term2_result) - Math.min(vars.term1_result, vars.term2_result); }
},

{
    type: " ",
    number: "4count17",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "2"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const parenResult = getRandomInt(2, 9);
        let c, d;
        if (Math.random() > 0.5) {
            d = getRandomInt(2, 9);
            const c_lower = Math.ceil(100 / d), c_upper = Math.floor(999 / d);
            if (c_lower >= c_upper) return this.generate();
            c = getRandomInt(c_lower, c_upper);
        } else {
            c = getRandomInt(2, 9);
            const d_lower = Math.ceil(100 / c), d_upper = Math.floor(999 / c);
            if (d_lower >= d_upper) return this.generate();
            d = getRandomInt(d_lower, d_upper);
        }
        const cd_product = c * d;
        const b = cd_product - parenResult; 
        let e, f;
        if (Math.random() > 0.5) { e = getRandomInt(10, 99); f = getRandomInt(2, 9); }
        else { e = getRandomInt(2, 9); f = getRandomInt(10, 99); }
        const ef_product = e * f;
        const sign = Math.random() > 0.5 ? '+' : '-';
        const isADivFirst = Math.random() > 0.5;
        const divResultLower = Math.ceil(100 / parenResult);
        const divResultUpper = Math.floor(999 / parenResult);
        if (divResultLower >= divResultUpper) return this.generate();
        let divResult_a;
        if (sign === '+') {
            divResult_a = getRandomInt(divResultLower, divResultUpper);
        } else {
            if (isADivFirst) {
                if (ef_product >= divResultUpper) return this.generate();
                divResult_a = getRandomInt(ef_product + 1, divResultUpper);
            } else {
                if (ef_product <= divResultLower) return this.generate();
                divResult_a = getRandomInt(divResultLower, ef_product - 1);
            }
        }
        const a = divResult_a * parenResult;
        let problemText;
        if (isADivFirst) {
            problemText = `Вычислите:<br><div class="problem-expression">${a} : (${c} · ${d} - ${b}) ${sign} ${e} · ${f}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${e} · ${f} ${sign} ${a} : (${c} · ${d} - ${b})</div>`;
        }
        return { variables: { a, b, c, d, e, f, sign, isADivFirst }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = (vars.c * vars.d) - vars.b;
        const divResult = vars.a / parenResult;
        const ef_product = vars.e * vars.f;
        let term1 = vars.isADivFirst ? divResult : ef_product;
        let term2 = vars.isADivFirst ? ef_product : divResult;
        return (vars.sign === '+') ? term1 + term2 : term1 - term2;
    }
},

{
    type: " ",
    number: "4count16",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "2"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const parenResult = getRandomInt(2, 9);
        let c, d;
        if (Math.random() > 0.5) {
            d = getRandomInt(2, 9);
            const c_lower = Math.ceil(100 / d), c_upper = Math.floor(999 / d);
            if (c_lower >= c_upper) return this.generate();
            c = getRandomInt(c_lower, c_upper);
        } else {
            c = getRandomInt(2, 9);
            const d_lower = Math.ceil(100 / c), d_upper = Math.floor(999 / c);
            if (d_lower >= d_upper) return this.generate();
            d = getRandomInt(d_lower, d_upper);
        }
        const cd_product = c * d;
        const b = cd_product + parenResult;
        if (b > 999) return this.generate();
        let e, f;
        if (Math.random() > 0.5) { e = getRandomInt(10, 99); f = getRandomInt(2, 9); }
        else { e = getRandomInt(2, 9); f = getRandomInt(10, 99); }
        const ef_product = e * f;
        const sign = Math.random() > 0.5 ? '+' : '-';
        const isADivFirst = Math.random() > 0.5;
        const divResultLower = Math.ceil(100 / parenResult);
        const divResultUpper = Math.floor(999 / parenResult);
        if (divResultLower >= divResultUpper) return this.generate();
        let divResult_a;
        if (sign === '+') {
            divResult_a = getRandomInt(divResultLower, divResultUpper);
        } else {
            if (isADivFirst) {
                if (ef_product >= divResultUpper) return this.generate();
                divResult_a = getRandomInt(ef_product + 1, divResultUpper);
            } else {
                if (ef_product <= divResultLower) return this.generate();
                divResult_a = getRandomInt(divResultLower, ef_product - 1);
            }
        }
        const a = divResult_a * parenResult;
        let problemText;
        if (isADivFirst) {
            problemText = `Вычислите:<br><div class="problem-expression">${a} : (${b} - ${c} · ${d}) ${sign} ${e} · ${f}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${e} · ${f} ${sign} ${a} : (${b} - ${c} · ${d})</div>`;
        }
        return { variables: { a, b, c, d, e, f, sign, isADivFirst }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = vars.b - (vars.c * vars.d);
        const divResult = vars.a / parenResult;
        const ef_product = vars.e * vars.f;
        let term1 = vars.isADivFirst ? divResult : ef_product;
        let term2 = vars.isADivFirst ? ef_product : divResult;
        return (vars.sign === '+') ? term1 + term2 : term1 - term2;
    }
},

{
    type: " ",
    number: "4count15",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const e = getRandomInt(10, 50);
        const parenResult = getRandomInt(2, 20);
        const subtractionResult = parenResult * e;
        const d = getRandomInt(2, 9);
        const c = subtractionResult + d;
        if (c > 999 || c < 100) return this.generate();
        const b = getRandomInt(2, 9);
        const middleTerm = b * parenResult;
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        const sign2 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') { a = getRandomInt(100, 999); } 
        else { if (middleTerm >= 999) return this.generate(); a = getRandomInt(middleTerm + 1, 999); }
        const intermediateResult = (sign1 === '+') ? a + middleTerm : a - middleTerm;
        if (sign2 === '+') { f = getRandomInt(100, 999); } 
        else { if (intermediateResult <= 100) return this.generate(); f = getRandomInt(100, intermediateResult - 1); }
        const problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${b} · (${c} - ${d}) : ${e} ${sign2} ${f}</div>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = (vars.c - vars.d) / vars.e;
        const middleTerm = vars.b * parenResult;
        let result = (vars.sign1 === '+') ? vars.a + middleTerm : vars.a - middleTerm;
        result = (vars.sign2 === '+') ? result + vars.f : result - vars.f;
        return result;
    }
},

{
    type: " ",
    number: "4count14",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        let c, d, e, divResult, parenResult;
        while (true) {
            d = getRandomInt(2, 9); 
            const divResultLower = Math.ceil(100 / d);
            const divResultUpper = Math.floor(999 / d);
            if (divResultLower >= 98 || divResultLower >= divResultUpper) continue;
            divResult = getRandomInt(divResultLower, Math.min(divResultUpper, 98));
            c = divResult * d;
            e = getRandomInt(divResult + 1, 99);
            parenResult = e - divResult; 
            break; 
        }
        const b = getRandomInt(2, 9); 
        const middleTerm = b * parenResult;
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        const sign2 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') { a = getRandomInt(100, 999); } 
        else { if (middleTerm >= 999) return this.generate(); a = getRandomInt(middleTerm + 1, 999); }
        const intermediateResult = (sign1 === '+') ? a + middleTerm : a - middleTerm;
        if (sign2 === '+') { f = getRandomInt(100, 999); } 
        else { if (intermediateResult <= 100) return this.generate(); f = getRandomInt(100, intermediateResult - 1); }
        const problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${b} · (${e} - ${c} : ${d}) ${sign2} ${f}</div>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = vars.e - (vars.c / vars.d);
        const middleTerm = vars.b * parenResult;
        let result = (vars.sign1 === '+') ? vars.a + middleTerm : vars.a - middleTerm;
        result = (vars.sign2 === '+') ? result + vars.f : result - vars.f;
        return result;
    }
},

{
    type: " ",
    number: "4count13",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') { a = getRandomInt(100, 500); f = getRandomInt(100, 400); }
        else { a = getRandomInt(500, 999); f = getRandomInt(100, 400); }
        const intermediateResult = (sign1 === '+') ? a + f : a - f;
        const sign2 = (intermediateResult <= 100) ? '+' : (Math.random() > 0.5 ? '+' : '-');
        const b = getRandomInt(2, 9);
        let middleTerm;
        if (sign2 === '+') {
            middleTerm = getRandomInt(10, 200) * b;
        } else {
            if (intermediateResult <= b) return this.generate();
            middleTerm = getRandomInt(1, Math.floor((intermediateResult - 1) / b)) * b;
        }
        const parenResult = middleTerm / b;
        let c, d, e;
        while (true) {
            d = getRandomInt(2, 9);
            const max_e = Math.floor((999 / d) - parenResult);
            if (max_e > 10) {
                e = getRandomInt(10, max_e);
                const divResult = parenResult + e;
                c = divResult * d;
                break;
            }
        }
        const problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${f} ${sign2} ${b} · (${c} : ${d} - ${e})</div>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = (vars.c / vars.d) - vars.e;
        const middleTerm = vars.b * parenResult;
        let result = (vars.sign1 === '+') ? vars.a + vars.f : vars.a - vars.f;
        result = (vars.sign2 === '+') ? result + middleTerm : result - middleTerm;
        return result;
    }
},

{
    type: " ",
    number: "4count12",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        let c, d, e, divResult, parenResult;
        while (true) {
            d = getRandomInt(2, 9); e = getRandomInt(10, 99);
            const lowerBound = Math.max(e + 1, Math.ceil(100 / d));
            const upperBound = Math.floor(999 / d);
            if (lowerBound < upperBound) {
                divResult = getRandomInt(lowerBound, upperBound);
                c = divResult * d; parenResult = divResult - e;
                break;
            }
        }
        const b = getRandomInt(2, 9);
        const middleTerm = b * parenResult;
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        const sign2 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') { a = getRandomInt(100, 999); } 
        else { if (middleTerm >= 999) return this.generate(); a = getRandomInt(middleTerm + 1, 999); }
        const intermediateResult = (sign1 === '+') ? a + middleTerm : a - middleTerm;
        if (sign2 === '+') { f = getRandomInt(100, 999); } 
        else { if (intermediateResult <= 100) return this.generate(); f = getRandomInt(100, intermediateResult - 1); }
        let problemText;
        const parenText = `(${c} : ${d} - ${e})`;
        if (Math.random() > 0.5) {
            problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${b} · ${parenText} ${sign2} ${f}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${parenText} · ${b} ${sign2} ${f}</div>`;
        }
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        const parenResult = (vars.c / vars.d) - vars.e;
        const middleTerm = vars.b * parenResult;
        let result = (vars.sign1 === '+') ? vars.a + middleTerm : vars.a - middleTerm;
        result = (vars.sign2 === '+') ? result + vars.f : result - vars.f;
        return result;
    }
},

{
    type: " ",
    number: "4count11",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const e = getRandomInt(2, 9);
        const divisionResult = getRandomInt(50, 200); 
        const dividend = divisionResult * e; 
        let b, c;
        if (Math.random() > 0.5) {
            b = getRandomInt(2, 9);
            const max_c = Math.floor((dividend - 10) / b);
            if (max_c <= 100) return this.generate(); 
            c = getRandomInt(100, max_c);
        } else {
            c = getRandomInt(2, 9);
            const max_b = Math.floor((dividend - 10) / c);
            if (max_b <= 100) return this.generate();
            b = getRandomInt(100, max_b);
        }
        const d = dividend - (b * c);
        let sign1 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') {
            a = getRandomInt(100, 999);
        } else {
            a = getRandomInt(divisionResult + 1, 999);
        }
        let intermediateResult = (sign1 === '+') ? a + divisionResult : a - divisionResult;
        let sign2 = (intermediateResult <= 50) ? '+' : (Math.random() > 0.5 ? '+' : '-');
        if (sign1 === '+' && sign2 === '+') {
            sign2 = '-';
            if (intermediateResult <= 50) {
                sign1 = '-';
                a = getRandomInt(divisionResult + 1, 999);
            }
        }
        if (sign2 === '+') {
            f = getRandomInt(50, 200);
        } else {
            f = getRandomInt(50, intermediateResult - 1);
        }
        const problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} (${d} + ${b} · ${c}) : ${e} ${sign2} ${f}</div>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        let result = (vars.d + vars.b * vars.c) / vars.e;
        if (vars.sign1 === '+') { result = vars.a + result; } else { result = vars.a - result; }
        if (vars.sign2 === '+') { result += vars.f; } else { result -= vars.f; }
        return result;
    }
},

{
    type: " ",
    number: "4count10", 
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') {
            a = getRandomInt(100, 500); f = getRandomInt(50, 200);
        } else {
            f = getRandomInt(50, 800); a = getRandomInt(f + 1, 999);
        }
        const intermediateResult = (sign1 === '+') ? a + f : a - f;
        let sign2 = (intermediateResult <= 50) ? '+' : (Math.random() > 0.5 ? '+' : '-');
        if (sign1 === '+' && sign2 === '+') {
            sign2 = '-';
            if (intermediateResult <= 20) { return this.generate(); }
        }
        let divisionResult;
        if (sign2 === '+') {
            divisionResult = getRandomInt(50, 200);
        } else {
            if (intermediateResult <= 21) return this.generate();
            divisionResult = getRandomInt(20, intermediateResult - 1);
        }
        const e = getRandomInt(2, 9);
        const dividend = divisionResult * e; 
        let b, c;
        if (Math.random() > 0.5) {
            b = getRandomInt(2, 9);
            const max_c = Math.floor((dividend - 10) / b);
            if (max_c <= 100) return this.generate(); 
            c = getRandomInt(100, max_c);
        } else {
            c = getRandomInt(2, 9);
            const max_b = Math.floor((dividend - 10) / c);
            if (max_b <= 100) return this.generate();
            b = getRandomInt(100, max_b);
        }
        const d = dividend - (b * c);
        let problemText;
        if (Math.random() > 0.5) {
            problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${f} ${sign2} (${d} + ${b} · ${c}) : ${e}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} ${f} ${sign2} (${b} · ${c} + ${d}) : ${e}</div>`;
        }
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        const divisionResult = (vars.b * vars.c + vars.d) / vars.e;
        let result = (vars.sign1 === '+') ? vars.a + vars.f : vars.a - vars.f;
        result = (vars.sign2 === '+') ? result + divisionResult : result - divisionResult;
        return result;
    }
},

{
    type: " ",
    number: "4count9", 
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const e = getRandomInt(2, 9);
        const dividendResult = getRandomInt(500, 1000);
        const dividend = dividendResult * e; 
        let b, c;
        if (Math.random() > 0.5) {
            b = getRandomInt(2, 9);
            const max_c = Math.floor((dividend - 10) / b);
            if (max_c <= 100) return this.generate();
            c = getRandomInt(100, max_c);
        } else {
            c = getRandomInt(2, 9);
            const max_b = Math.floor((dividend - 10) / c);
            if (max_b <= 100) return this.generate();
            b = getRandomInt(100, max_b);
        }
        const d = dividend - (b * c);
        const sign1 = Math.random() > 0.5 ? '+' : '-';
        const sign2 = (sign1 === '+') ? '-' : (Math.random() > 0.5 ? '+' : '-');
        let f, a;
        let intermediateResult = dividendResult;
        if (sign1 === '+') {
            f = getRandomInt(50, 200);
            intermediateResult += f;
        } else {
            if (dividendResult <= 50) return this.generate();
            f = getRandomInt(50, dividendResult - 1);
            intermediateResult -= f;
        }
        if (sign2 === '+') {
            a = getRandomInt(100, 999);
        } else {
            if (intermediateResult <= 100) return this.generate();
            a = getRandomInt(100, intermediateResult - 1);
        }
        let problemText;
        if (Math.random() > 0.5) {
            problemText = `Вычислите:<br><div class="problem-expression">(${b} · ${c} + ${d}) : ${e} ${sign1} ${f} ${sign2} ${a}</div>`;
        } else {
            problemText = `Вычислите:<br><div class="problem-expression">(${d} + ${b} · ${c}) : ${e} ${sign1} ${f} ${sign2} ${a}</div>`;
        }
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        let result = (vars.b * vars.c + vars.d) / vars.e;
        if (vars.sign1 === '+') { result += vars.f; } else { result -= vars.f; }
        if (vars.sign2 === '+') { result += vars.a; } else { result -= vars.a; }
        return result;
    }
},

{
    type: " ",
    number: "4count8", 
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "скобки", "1"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const e = getRandomInt(2, 9);
        const divisionResult = getRandomInt(50, 200);
        const dividend = divisionResult * e; 
        let b, c;
        if (Math.random() > 0.5) {
            b = getRandomInt(2, 9);
            const max_c = Math.floor((dividend - 10) / b);
            if (max_c <= 100) return this.generate(); 
            c = getRandomInt(100, max_c);
        } else {
            c = getRandomInt(2, 9);
            const max_b = Math.floor((dividend - 10) / c);
            if (max_b <= 100) return this.generate();
            b = getRandomInt(100, max_b);
        }
        const d = dividend - (b * c);
        let sign1 = Math.random() > 0.5 ? '+' : '-';
        let a, f;
        if (sign1 === '+') { a = getRandomInt(100, 999); }
        else { a = getRandomInt(divisionResult + 1, 999); }
        let intermediateResult = (sign1 === '+') ? a + divisionResult : a - divisionResult;
        let sign2 = (intermediateResult <= 50) ? '+' : (Math.random() > 0.5 ? '+' : '-');
        if (sign1 === '+' && sign2 === '+') {
            sign2 = '-';
            if (intermediateResult <= 50) {
                sign1 = '-';
                a = getRandomInt(divisionResult + 1, 999);
            }
        }
        if (sign2 === '+') {
            f = getRandomInt(50, 200);
        } else {
            f = getRandomInt(50, intermediateResult - 1);
        }
        const problemText = `Вычислите:<br><div class="problem-expression">${a} ${sign1} (${b} · ${c} + ${d}) : ${e} ${sign2} ${f}</div>`;
        return { variables: { a, b, c, d, e, f, sign1, sign2 }, problemText };
    },
    calculateAnswer: function(vars) {
        let result = (vars.b * vars.c + vars.d) / vars.e;
        if (vars.sign1 === '+') { result = vars.a + result; } else { result = vars.a - result; }
        if (vars.sign2 === '+') { result += vars.f; } else { result -= vars.f; }
        return result;
    }
},

{
    number: "4count7",
    tags: ["4_класс", "счёт", "сложение_многозначных", "вычитание_многозначных", "перенос_разряда", "sparse_nums", "натуральные_числа", "3"],
    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return null;
            do { num = getRandomInt(min, max); } while (num % nonMultipleOf === 0);
            return num;
        };
        const countBorrows = (minuend, subtrahend) => {
            const mStr = String(minuend);
            const sStr = String(subtrahend).padStart(mStr.length, '0');
            let borrowCount = 0; let borrow = 0;
            for (let i = mStr.length - 1; i >= 0; i--) {
                let mDigit = parseInt(mStr[i]) - borrow;
                let sDigit = parseInt(sStr[i]);
                if (mDigit < sDigit) { borrowCount++; borrow = 1; } else { borrow = 0; }
            }
            return borrowCount;
        };
        const variant = getRandomInt(1, 3);
        let a, b, c, problemTextStr;
        if (variant === 1) {
            let S;
            do {
                const S_head = getRandomInt(2, 9); const S_tail = getRandomInt(1, 9);
                S = S_head * 10000 + S_tail;
                a = getRandomInt(10000, S - 1000); b = S - a;
                let attempts = 0;
                do {
                    if (S - 5001 < 1000) { S = null; break; }
                    c = getRandomInt(1000, S - 5001);
                    attempts++;
                    if (attempts > 50) { S = null; break; }
                } while (countBorrows(S, c) < 2);
            } while (!S);
            problemTextStr = `${a} + ${b} - ${c}`;
        } else if (variant === 2) {
            let R1;
            do {
                a = getRandomInt(10, 99) * 1000;
                b = generateConstrainedNumber(100, 999, 10);
                R1 = a - b;
            } while (!String(R1).includes('00'));
            let attempts = 0;
            do {
                const min_c = 1000; const max_c = R1 - 1;
                if(max_c < min_c) { R1 = null; break; }
                c = getRandomInt(min_c, max_c);
                attempts++;
                if (attempts > 50) { R1 = null; break; }
            } while (countBorrows(R1, c) < 1);
            if (!R1) { return this.generate(); }
            problemTextStr = `${a} - ${b} - ${c}`;
        } else {
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
            problemTextStr = `${a} - ${b} + ${c}`;
        }
        return {
            variables: { a, b, c, variant },
            problemText: `Вычислите:<br><div class="problem-expression">${problemTextStr}</div>`
        };
    },
    calculateAnswer: (vars) => {
        if (vars.variant === 1) { return vars.a + vars.b - vars.c; }
        else if (vars.variant === 2) { return vars.a - vars.b - vars.c; }
        else { return vars.a - vars.b + vars.c; }
    }
},

{
    number: "4count6",
    tags: ["4_класс", "счёт", "вычитание_многозначных", "перенос_разряда", "sparse_nums", "натуральные_числа", "2"],
    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const u_digits = []; const v_digits = []; const r_digits = []; let borrow = 0;
        r_digits[0] = getRandomInt(1, 9); u_digits[0] = getRandomInt(0, r_digits[0] - 1); v_digits[0] = 10 + u_digits[0] - r_digits[0]; borrow = 1;
        r_digits[1] = 0; u_digits[1] = getRandomInt(borrow + 1, 9); v_digits[1] = u_digits[1] - r_digits[1] - borrow; borrow = 0;
        r_digits[2] = getRandomInt(1, 9); u_digits[2] = getRandomInt(borrow, r_digits[2] - 1); v_digits[2] = 10 + u_digits[2] - r_digits[2] - borrow; borrow = 1;
        r_digits[3] = 0; u_digits[3] = getRandomInt(borrow + 1, 9); v_digits[3] = u_digits[3] - r_digits[3] - borrow; borrow = 0;
        r_digits[4] = getRandomInt(1, 9); u_digits[4] = getRandomInt(borrow, r_digits[4] - 1); v_digits[4] = 10 + u_digits[4] - r_digits[4] - borrow; borrow = 1;
        r_digits[5] = getRandomInt(1, 8); v_digits[5] = getRandomInt(1, 8 - r_digits[5]); u_digits[5] = v_digits[5] + r_digits[5] + borrow;
        const u = parseInt(u_digits.reverse().join(''));
        const v = parseInt(v_digits.reverse().join(''));
        return {
            variables: { u, v },
            problemText: `Вычислите:<br><div class="problem-expression">${u} - ${v}</div>`
        };
    },
    calculateAnswer: (vars) => { return vars.u - vars.v; }
},

{
    number: "4count5", 
    tags: ["4_класс", "сложение_многозначных", "круглые_числа", "счёт", "натуральные_числа", "sparse_nums", "2"],
    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const k_zeros = getRandomElement([3, 4]);
        const powerOf10 = Math.pow(10, k_zeros);
        const s1_tail = getRandomInt(1, powerOf10 - 1);
        const s2_tail = powerOf10 - s1_tail;
        let s1_head, s2_head;
        do { s1_head = getRandomInt(1, 99); s2_head = getRandomInt(1, 99); } while (s1_head + s2_head === 9);
        const s1 = s1_head * powerOf10 + s1_tail;
        const s2 = s2_head * powerOf10 + s2_tail;
        return {
            variables: { s1, s2 },
            problemText: `Вычислите:<br><div class="problem-expression">${s1} + ${s2}</div>`
        };
    },
    calculateAnswer: (vars) => { return vars.s1 + vars.s2; }
},

{
    number: "4count4",
    tags: ["4_класс", "счёт", "натуральные_числа", "sparse_nums", "умножение_на_однозначное", "деление_на_однозначное", "1"],

    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // Случайно выбираем, какое действие генерировать: умножение или деление
        const operation = getRandomElement(['multiplication', 'division']);
        let variables, problemText;

        if (operation === 'division') {
            // --- Логика из combined_generator.js (4_count_7 и 4_count_8) ---
            const variant = getRandomInt(1, 2);
            let n, m;

            if (variant === 1) { // Логика 4_count_7
                m = getRandomElement([3, 6, 7, 9]);
                const k = getRandomElement([5, 6]);
                let a;
                do { a = getRandomInt(10, 99); } while (a % m === 0 || (m === 6 && a % 3 === 0));
                const term = a * Math.pow(10, k);
                const b_base = (m - (term % m)) % m;
                let b = b_base;
                while (b < 10) { b += m; }
                n = a * Math.pow(10, k) + b;
            } else { // Логика 4_count_8
                m = getRandomElement([3, 4, 6, 7, 8, 9]);
                const k = getRandomElement([4, 5]);
                let a;
                do { a = getRandomInt(11, 99); } while (a % m === 0 || a % 10 === 0);
                const term = a * Math.pow(10, k);
                let b_base = (m - (term % m)) % m;
                if (b_base === 0) { b_base = m; }
                const candidates_b = [];
                for (let b_candidate = b_base; b_candidate < 10; b_candidate += m) { candidates_b.push(b_candidate); }
                const b = getRandomElement(candidates_b);
                n = a * Math.pow(10, k) + b;
            }
            variables = { n, m, operation };
            problemText = `${n} : ${m}`;

        } else { // operation === 'multiplication'
            // --- Логика из 4_count_9 ---
            const variant = getRandomInt(1, 4);
            let factor1, factor2;
            switch (variant) {
                case 1: {
                    const n = getRandomElement([3, 4, 6, 7, 8, 9]); const k = getRandomElement([5, 6]); let a;
                    do { a = getRandomInt(11, 90); } while (a % n === 0 || a % 10 === 0);
                    const m = Math.floor((a * Math.pow(10, k)) / n) + 1;
                    factor1 = n; factor2 = m; break;
                }
                case 2: {
                    const n = getRandomElement([3, 4, 6, 7, 8, 9]); const k = getRandomElement([3, 4]); const a = getRandomInt(100, 999);
                    const term = a * Math.pow(10, k); const b = (n - (term % n)) % n; const p = term + b; const m = p / n;
                    factor1 = m; factor2 = n; break;
                }
                case 3: {
                    const n = getRandomElement([3, 6, 7, 9]); const k = getRandomElement([4, 5]); const a = getRandomInt(11, 99);
                    const term = a * Math.pow(10, k); const b = (n - (term % n)) % n; const p = term + b; const m = p / n;
                    factor1 = m; factor2 = n; break;
                }
                case 4: {
                    const m2 = 8; let m1;
                    do {
                        const c_min = Math.ceil(1000 / 1250); const c_max = Math.floor(99999 / 1250);
                        const c = getRandomInt(c_min, c_max) * 2 - 1;
                        m1 = 1250 * c;
                    } while (m1 % 100 === 0);
                    factor1 = m1; factor2 = m2; break;
                }
            }
            if (getRandomInt(0, 1) === 1) { [factor1, factor2] = [factor2, factor1]; }
            variables = { factor1, factor2, operation };
            problemText = `${factor1} · ${factor2}`;
        }

        return {
            variables: variables,
            problemText: `Вычислите:<br><div class="problem-expression">${problemText}</div>`
        };
    },

    calculateAnswer: (vars) => {
        if (vars.operation === 'division') {
            return vars.n / vars.m;
        } else { // 'multiplication'
            return vars.factor1 * vars.factor2;
        }
    }
},

{
    number: "4count3",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "без_скобок", "3"],
    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const generateConstrainedNumber = (min, max) => {
            if (min > max) throw new Error("Invalid range");
            return getRandomInt(min, max);
        };
        let a, b, c, d, e, orderIds, operators, problemTextStr; let success = false;
        while (!success) {
            try {
                const cde_blocks = ['c', 'd', 'e'];
                const first_block_id = getRandomElement(cde_blocks);
                const remaining_ids = ['div', ...cde_blocks.filter(id => id !== first_block_id)];
                for (let i = remaining_ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [remaining_ids[i], remaining_ids[j]] = [remaining_ids[j], remaining_ids[i]]; }
                orderIds = [first_block_id, ...remaining_ids];
                const opChoices = [['+', '+', '-'], ['+', '-', '+'], ['-', '+', '+'], ['+', '-', '-'], ['-', '+', '-'], ['-', '-', '+'], ['-', '-', '-']];
                operators = getRandomElement(opChoices);
                const threeDigitBlock = getRandomElement(['c', 'd', 'e']);
                let currentValue = 0; const generatedValues = {};
                for (let i = 0; i < orderIds.length; i++) {
                    const blockId = orderIds[i]; const op = (i === 0) ? '+' : operators[i - 1]; let newValue;
                    const isThreeDigit = (blockId === threeDigitBlock);
                    const minVal = isThreeDigit ? 100 : 10; const maxVal = isThreeDigit ? 999 : 99;
                    if (op === '+') {
                        if (blockId === 'div') {
                            b = getRandomElement([6, 7, 8, 9]);
                            const min_q = Math.ceil(1000 / b); const max_q = Math.floor(9999 / b);
                            const q = generateConstrainedNumber(min_q, max_q); a = q * b; newValue = q;
                        } else { newValue = generateConstrainedNumber(minVal, maxVal); }
                    } else {
                        const maxSubtract = currentValue - 1;
                        if (maxSubtract < minVal) throw new Error("Too small");
                        if (blockId === 'div') {
                            b = getRandomElement([6, 7, 8, 9]);
                            const min_q = Math.ceil(1000 / b); const max_q = Math.min(Math.floor(9999 / b), maxSubtract);
                            const q = generateConstrainedNumber(min_q, max_q); a = q * b; newValue = q;
                        } else { newValue = generateConstrainedNumber(minVal, Math.min(maxVal, maxSubtract)); }
                    }
                    generatedValues[blockId] = newValue;
                    if (op === '+') currentValue += newValue; else currentValue -= newValue;
                }
                c = generatedValues['c']; d = generatedValues['d']; e = generatedValues['e'];
                const strings = { div: `${a} : ${b}`, c: `${c}`, d: `${d}`, e: `${e}` };
                problemTextStr = strings[orderIds[0]];
                problemTextStr += ` ${operators[0]} ${strings[orderIds[1]]}`;
                problemTextStr += ` ${operators[1]} ${strings[orderIds[2]]}`;
                problemTextStr += ` ${operators[2]} ${strings[orderIds[3]]}`;
                success = true;
            } catch (error) { success = false; }
        }
        return {
            variables: { a, b, c, d, e, orderIds, operators },
            problemText: `Вычислите:<br><div class="problem-expression">${problemTextStr}</div>`
        };
    },
    calculateAnswer: (vars) => {
        const values = { div: vars.a / vars.b, c: vars.c, d: vars.d, e: vars.e };
        let result = values[vars.orderIds[0]];
        const [op1, op2, op3] = vars.operators;
        if (op1 === '+') result += values[vars.orderIds[1]]; else result -= values[vars.orderIds[1]];
        if (op2 === '+') result += values[vars.orderIds[2]]; else result -= values[vars.orderIds[2]];
        if (op3 === '+') result += values[vars.orderIds[3]]; else result -= values[vars.orderIds[3]];
        return result;
    }
},

{
    number: "4count2",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "без_скобок", "2"],

    generate: () => {
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

        // Объявляем все возможные переменные
        let a, b, c, d, opSign, problemTextStr, format;

        // Случайно выбираем, какой вариант генерировать
        const variant = getRandomInt(1, 3);

        if (variant === 1) {
            // --- Логика из 4_count_6 ---
            const hasBorrow = (minuend, subtrahend) => {
                const mStr = String(minuend);
                const sStr = String(subtrahend).padStart(mStr.length, '0');
                let borrow = 0;
                for (let i = mStr.length - 1; i >= 0; i--) {
                    let mDigit = parseInt(mStr[i]) - borrow;
                    let sDigit = parseInt(sStr[i]);
                    if (mDigit < sDigit) { return true; }
                    borrow = mDigit < sDigit ? 1 : 0;
                }
                return false;
            };
            let q, attempts = 0;
            do {
                b = getRandomElement([5, 6, 7, 8, 9]);
                const min_q = Math.ceil(100000 / b);
                const max_q = Math.floor(999999 / b);
                q = getRandomInt(min_q, max_q);
                a = q * b;
                c = getRandomInt(Math.floor(q / 2), q - 1);
                attempts++;
                if (attempts > 50) { attempts = 0; continue; }
            } while (!hasBorrow(q, c));
            problemTextStr = `${a} : ${b} - ${c}`;

        } else if (variant === 2) {
            // --- Логика из 4_count_4 ---
            const c_options = { 6: [3, 6], 8: [4, 8], 9: [3, 9] };
            let lower_bound_q, upper_bound_q;
            do {
                b = getRandomElement([6, 8, 9]);
                c = getRandomElement(c_options[b]);
                d = generateConstrainedNumber(1000, 9999, 10);
                opSign = getRandomElement([-1, 1]);
                const product_bc = b * c;
                upper_bound_q = Math.floor(99999 / product_bc);
                let lower_bound_op = 1;
                if (opSign === -1) { lower_bound_op = d + 1; }
                const lower_bound_digits = Math.ceil(10000 / product_bc);
                lower_bound_q = Math.max(lower_bound_digits, lower_bound_op);
            } while (lower_bound_q >= upper_bound_q);
            let q;
            do {
                q = getRandomInt(lower_bound_q, upper_bound_q);
                a = q * b * c;
            } while (a % 100 === 0);
            const opString = opSign === 1 ? '+' : '-';
            problemTextStr = `${a} : ${b} : ${c} ${opString} ${d}`;

        } else {
            // --- Логика из 4count2 ---
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            format = getRandomInt(1, 2);
            if (format === 1) {
                let one_digit, multi_digit;
                const digits = [3, 4, 5, 6, 7, 8, 9];
                do {
                    one_digit = getRandomElement(digits);
                    const c_options = digits.filter(x => x !== one_digit);
                    c = getRandomElement(c_options);
                } while (one_digit % c === 0);
                const requiredDivisor = c / gcd(one_digit, c);
                do {
                    const minQuotient = Math.ceil(1000 / requiredDivisor);
                    const maxQuotient = Math.floor(99999 / requiredDivisor);
                    const q = getRandomInt(minQuotient, maxQuotient);
                    multi_digit = q * requiredDivisor;
                } while (multi_digit % 10 === 0);
                if (getRandomInt(0, 1) === 0) { a = one_digit; b = multi_digit; } else { a = multi_digit; b = one_digit; }
                const intermediateResult = (a * b) / c;
                opSign = getRandomElement([-1, 1]);
                d = (opSign === 1) ? generateConstrainedNumber(1000, 99999, 100) : generateConstrainedNumber(1000, intermediateResult - 1, 100);
                if (d === null) { opSign = 1; d = generateConstrainedNumber(1000, 99999, 100); }
                const opString = opSign === 1 ? '+' : '-';
                problemTextStr = `${a} · ${b} : ${c} ${opString} ${d}`;
            } else {
                const digits = [3, 4, 5, 6, 7, 8, 9];
                do {
                    b = getRandomElement(digits);
                    const c_options = digits.filter(x => x !== b);
                    c = getRandomElement(c_options);
                } while (b % c === 0);
                do {
                    const q = getRandomInt(1001, 33333);
                    a = q * b;
                } while (a % 10 === 0 || a < 1000 || a > 99999);
                const intermediateResult = (a / b) * c;
                opSign = getRandomElement([-1, 1]);
                d = (opSign === 1) ? generateConstrainedNumber(1000, 99999, 100) : generateConstrainedNumber(1000, intermediateResult - 1, 100);
                if (d === null) { opSign = 1; d = generateConstrainedNumber(1000, 99999, 100); }
                const opString = opSign === 1 ? '+' : '-';
                problemTextStr = `${a} : ${b} · ${c} ${opString} ${d}`;
            }
        }

        return {
            variables: { a, b, c, d, opSign, format, variant },
            problemText: `Вычислите:<br><div class="problem-expression">${problemTextStr}</div>`
        };
    },

    calculateAnswer: (vars) => {
        if (vars.variant === 1) {
            // --- Расчёт для 4_count_6 ---
            return (vars.a / vars.b) - vars.c;
        } else if (vars.variant === 2) {
            // --- Расчёт для 4_count_4 ---
            const intermediateResult = (vars.a / vars.b) / vars.c;
            return (vars.opSign === 1) ? intermediateResult + vars.d : intermediateResult - vars.d;
        } else {
            // --- Расчёт для 4count2 ---
            let result = (vars.format === 1) ? (vars.a * vars.b) / vars.c : (vars.a / vars.b) * vars.c;
            return (vars.opSign === 1) ? result + vars.d : result - vars.d;
        }
    }
},

{
    number: "4count1",
    tags: ["4_класс", "счёт", "натуральные_числа", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "без_скобок", "1"],

    generate: () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const generateConstrainedNumber = (min, max, nonMultipleOf = 1) => {
            let num;
            if (min > max) return min;
            do {
                num = getRandomInt(min, max);
            } while (num % nonMultipleOf === 0);
            return num;
        };

        // Объявляем все возможные переменные
        let a, b, c, d, e, orderIds, operators, op1, op2, problemTextStr;
        
        // Случайно выбираем, какой вариант генерировать: 1 (старый 4count1) или 2 (старый 4count3)
        const variant = getRandomInt(1, 2);

        if (variant === 1) {
            // --- Логика из 4count1 ---
            c = generateConstrainedNumber(1000, 15000, 100);
            b = getRandomElement([3, 4, 5, 6, 7, 8, 9]);
            let q_a;
            do {
                q_a = getRandomInt(c + 1, c + 20000);
                a = q_a * b;
            } while (a % 100 === 0 || a < 1000 || a > 99999);
            const d_options = [3, 4, 5, 6, 7, 8, 9].filter(x => x !== b);
            d = getRandomElement(d_options);
            const min_e = Math.ceil((c + 1) / d);
            e = generateConstrainedNumber(Math.max(1000, min_e), 9999, 10);
            
            const term1 = { id: 'div', str: `${a} : ${b}` };
            const term2 = { id: 'mul', str: `${d} · ${e}` };
            const term3 = { id: 'c', str: `${c}` };
            
            const positiveTerms = [term1, term2];
            const firstTerm = positiveTerms.splice(getRandomInt(0, 1), 1)[0];
            const remainingTerms = [positiveTerms[0], term3];
            if (getRandomInt(0, 1) === 1) { [remainingTerms[0], remainingTerms[1]] = [remainingTerms[1], remainingTerms[0]]; }
            
            const finalOrder = [firstTerm, ...remainingTerms];
            orderIds = finalOrder.map(t => t.id);
            if (finalOrder[1].id === 'c') { op1 = '-'; op2 = '+'; } else { op1 = '+'; op2 = '-'; }
            problemTextStr = `${finalOrder[0].str} ${op1} ${finalOrder[1].str} ${op2} ${finalOrder[2].str}`;

        } else {
            // --- Логика из 4count3 ---
            let lower_bound_q, upper_bound_q;
            do {
                c = generateConstrainedNumber(10000, 90000, 100);
                d = generateConstrainedNumber(1000, 9000, 100);
                const sum_cd = c + d;
                b = getRandomElement([4, 5, 6, 7, 8, 9]);
                upper_bound_q = Math.floor(99999 / b);
                lower_bound_q = Math.max(Math.ceil(10000 / b), sum_cd + 1);
            } while (lower_bound_q >= upper_bound_q);
            let q_a;
            do {
                q_a = getRandomInt(lower_bound_q, upper_bound_q);
                a = q_a * b;
            } while (a % 100 === 0);

            const term_div = { id: 'div', str: `${a} : ${b}` };
            const term_c = { id: 'c', str: `${c}` };
            const term_d = { id: 'd', str: `${d}` };
            const remainingTerms = [term_c, term_d];
            if (getRandomInt(0, 1) === 1) { [remainingTerms[0], remainingTerms[1]] = [remainingTerms[1], remainingTerms[0]]; }
            const finalOrder = [term_div, ...remainingTerms];
            orderIds = finalOrder.map(t => t.id);
            const opPairs = [['+', '-'], ['-', '+'], ['-', '-']];
            operators = getRandomElement(opPairs);
            problemTextStr = `${finalOrder[0].str} ${operators[0]} ${finalOrder[1].str} ${operators[1]} ${finalOrder[2].str}`;
        }

        return {
            variables: { a, b, c, d, e, orderIds, operators, op1, op2, variant },
            problemText: `Вычислите:<br><div class="problem-expression">${problemTextStr}</div>`
        };
    },

    calculateAnswer: (vars) => {
        if (vars.variant === 1) {
            // --- Расчёт для 4count1 ---
            const values = { div: vars.a / vars.b, mul: vars.d * vars.e, c: vars.c };
            let result = values[vars.orderIds[0]];
            const [op1, op2] = [vars.op1, vars.op2];
            if (op1 === '+') result += values[vars.orderIds[1]]; else result -= values[vars.orderIds[1]];
            if (op2 === '+') result += values[vars.orderIds[2]]; else result -= values[vars.orderIds[2]];
            return result;
        } else {
            // --- Расчёт для 4count3 ---
            const values = { div: vars.a / vars.b, c: vars.c, d: vars.d };
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
},

];

window.taskRegistry.push(..._4countTasks);
