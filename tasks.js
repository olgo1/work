const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];



function p_4$1_1_3$1_1() {
  const problemInfo = { type: "4_1.1.3_1.1", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "1 (деление многозначного sparse number на однозначное)", task: 1 };
  const mValues = [3, 4, 6, 7, 8, 9];
  const k = 5;
  let m, a, b, n, result;
  while (true) {
    m = getRandomElement(mValues);
    a = getRandomInt(10, 99);
    const mBig = BigInt(m);
    const aBig = BigInt(a);
    const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
    const req1Passed = a % m !== 0;
    const remainder = aTimesPowerOf10 % mBig;
    const req2Passed = remainder !== 0n;
    if (req1Passed && req2Passed) {
      const bBase = (mBig - remainder) % mBig;
      let bCandidate = bBase;
      while (bCandidate < 10n) { bCandidate += mBig; }
      let foundB = false;
      while (bCandidate <= 99n) {
        if (bCandidate % 10n !== 0n) {
          b = bCandidate;
          foundB = true;
          break;
        }
        bCandidate += mBig;
      }
      if (foundB) {
        n = aTimesPowerOf10 + b;
        result = n / mBig;
        break;
      }
    }
  }
  return { ...problemInfo, n: n.toString(), m, task: `${n.toString()} : ${m}`, answer: result.toString() };
}

function p_4$1_1_3$1_2() {
  const problemInfo = { type: "4_1.1.3_1.2", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "1 (деление многозначного sparse number на однозначное)", task: 2 };
  const mValues = [3, 4, 6, 7, 8, 9];
  const k = 4; // 3 нуля
  let m, a, b, n, result;
  while (true) {
    m = getRandomElement(mValues);
    a = getRandomInt(11, 99);
    if (a % m === 0 || a % 10 === 0) continue;
    const mBig = BigInt(m);
    const aBig = BigInt(a);
    const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
    let bCandidate = (mBig - (aTimesPowerOf10 % mBig)) % mBig;
    if (bCandidate === 0n) { bCandidate = mBig; }
    if (bCandidate < 10n && bCandidate % 10n !== 0n) {
      b = bCandidate;
      n = aTimesPowerOf10 + b;
      result = n / mBig;
      break;
    }
  }
  return { ...problemInfo, n: n.toString(), m, task: `${n.toString()} : ${m}`, answer: result.toString() };
}

function p_4$1_1_3$2_1() {
    const problemInfo = { type: "4_1.1.3_2.1", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "2 (умножение многозначного на однозначное = sparse number)", task: 1 };
    const nValues = [3, 4, 6, 7, 8, 9];
    const kValues = [3, 4];
    let n, k, a, b, p, m;
    while (true) {
        n = getRandomElement(nValues);
        k = getRandomElement(kValues);
        a = getRandomInt(100, 999);
        const digits = new Set(a.toString().split(''));
        if (digits.size >= 2) {
            const nBig = BigInt(n);
            const aBig = BigInt(a);
            const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
            b = (nBig - (aTimesPowerOf10 % nBig)) % nBig;
            p = aTimesPowerOf10 + b;
            m = p / nBig;
            break;
        }
    }
    return { ...problemInfo, n, m: m.toString(), task: `${n} * ${m.toString()}`, answer: p.toString() };
}

function p_4$1_1_3$2_2() {
  const problemInfo = { type: "4_1.1.3_2.2", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "2 (умножение многозначного на однозначное = sparse number)", task: 2 };
  const nValues = [3, 4, 6, 7, 8, 9];
  const kValues = [3, 4];
  let n, k, a, b, p, m;
  while (true) {
    n = getRandomElement(nValues);
    k = getRandomElement(kValues);
    a = getRandomInt(100, 999);
    const digits = new Set(a.toString().split(''));
    if (digits.size >= 2) {
      const nBig = BigInt(n);
      const aBig = BigInt(a);
      const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
      b = (nBig - (aTimesPowerOf10 % nBig)) % nBig;
      p = aTimesPowerOf10 + b;
      m = p / nBig;
      break;
    }
  }
  return { ...problemInfo, n, m: m.toString(), task: `${m.toString()} * ${n}`, answer: p.toString() };
}

function p_4$1_1_3$2_3() {
  const problemInfo = { type: "4_1.1.3_2.3", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "2 (умножение многозначного на однозначное = sparse number)", task: 3 };
  const nValues = [3, 6, 7, 9];
  const kValues = [4, 5];
  let n, k, a, b, p, m;
  while (true) {
    n = getRandomElement(nValues);
    k = getRandomElement(kValues);
    a = getRandomInt(11, 99);
    if (a.toString()[0] === a.toString()[1]) continue;
    const nBig = BigInt(n);
    const aBig = BigInt(a);
    const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
    b = (nBig - (aTimesPowerOf10 % nBig)) % nBig;
    p = aTimesPowerOf10 + b;
    m = p / nBig;
    const lastDigitM = Number(m % 10n);
    if (lastDigitM * n >= 10) {
      break;
    }
  }
  return { ...problemInfo, n: n, m: m.toString(), task: `${m.toString()} * ${n}`, answer: p.toString() };
}

function p_4$1_1_3$2_4() {
  const problemInfo = { type: "4_1.1.3_2.4", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "2 (умножение многозначного на однозначное = sparse number)", task: 4 };
  const m2 = 8;
  const possibleC = [];
  for (let i = 1; i <= 79; i += 2) { if ((1250 * i) % 100 !== 0) { possibleC.push(i); } }
  const c = getRandomElement(possibleC);
  const m1 = 1250 * c;
  const P = BigInt(m1) * BigInt(m2);
  return { ...problemInfo, m1, m2, task: `${m1} * ${m2}`, answer: P.toString() };
}

function p_4$1_1_3$3_1() {
  const problemInfo = { type: "4_1.1.3_3.1", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "3 (сумма или разность = sparse number)", task: 1 };
  const kZeros = getRandomElement([3, 4]);
  const S_head = getRandomInt(20, 199);
  const S_tail = getRandomInt(10, 999);
  const S = BigInt(S_head) * (10n ** BigInt(kZeros)) + BigInt(S_tail);
  const a1_min = 1000n;
  const a1_max = S - 1000n;
  const a1 = a1_min + BigInt(Math.floor(Math.random() * Number(a1_max - a1_min + 1n)));
  const a2 = S - a1;
  return { ...problemInfo, a1: a1.toString(), a2: a2.toString(), task: `${a1.toString()} + ${a2.toString()}`, answer: S.toString() };
}

function p_4$1_1_3$3_2() {
  const problemInfo = { type: "4_1.1.3_3.2", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "3 (сумма или разность = sparse number)", task: 2 };
  let R, v, u;
  while (true) {
    const kZeros = getRandomElement([3, 4]);
    const R_head = getRandomInt(10, 999);
    const R_tail = getRandomInt(1, 9);
    R = BigInt(R_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R_tail);
    const possibleVLast = [];
    for (let i = 1; i <= 9; i++) { if (i + R_tail >= 10) { possibleVLast.push(i); } }
    if (possibleVLast.length > 0) {
      const v_last = getRandomElement(possibleVLast);
      const v_head = getRandomInt(10, 9999);
      v = BigInt(v_head) * 10n + BigInt(v_last);
      u = R + v;
      if (u >= 10000n && u <= 999999n) break;
    }
  }
  return { ...problemInfo, u: u.toString(), v: v.toString(), task: `${u.toString()} - ${v.toString()}`, answer: R.toString() };
}

function p_4$1_1_3$3_3() {
  const problemInfo = { type: "4_1.1.3_3.3", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "3 (сумма или разность = sparse number)", task: 3 };
  const kZeros = 3;
  let S, S_tail_100;
  do {
    const S_head = getRandomInt(20, 199);
    const S_tail = getRandomInt(10, 999);
    S = BigInt(S_head) * (10n ** BigInt(kZeros)) + BigInt(S_tail);
    S_tail_100 = Number(S % 100n);
  } while (S_tail_100 === 0);
  const a1_min = 1000n;
  const a1_max = S - 1000n;
  const a1 = a1_min + BigInt(Math.floor(Math.random() * Number(a1_max - a1_min + 1n)));
  const a2 = S - a1;
  const a3_head = getRandomInt(1, 9);
  const a3_tail = getRandomInt(0, S_tail_100 - 1);
  const a3 = BigInt(a3_head) * 100n + BigInt(a3_tail);
  const R = S - a3;
  return { ...problemInfo, a1: a1.toString(), a2: a2.toString(), a3: a3.toString(), task: `${a1.toString()} + ${a2.toString()} - ${a3.toString()}`, answer: R.toString() };
}

function p_4$1_1_3$3_4() {
  const problemInfo = { type: "4_1.1.3_3.4", class: 4, course: "1 (арифметика натуральных чисел)", module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)", lesson: "3 (числа с большим количеством нулей)", taskType: "3 (сумма или разность = sparse number)", task: 4 };
  const kZeros = 3;
  const R1_head = getRandomInt(1, 8);
  const R1_tail = getRandomInt(0, 9);
  const R1 = BigInt(R1_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R1_tail);
  const R_final_head = getRandomInt(R1_head + 1, 9);
  const R_final_tail = getRandomInt(0, 9);
  const R_final = BigInt(R_final_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R_final_tail);
  const a3 = BigInt(getRandomInt(100, 999));
  const a1 = R1 + a3;
  const a2 = R_final - R1;
  return { ...problemInfo, a1: a1.toString(), a2: a2.toString(), a3: a3.toString(), task: `${a1.toString()} - ${a3.toString()} + ${a2.toString()}`, answer: R_final.toString() };
}
