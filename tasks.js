function generateProblem() {
  const problemInfo = {
    type: "4_1.1.3_1.1",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "1 (деление многозначного sparse number на однозначное)",
    task: 1
  };
  const mValues = [3, 4, 6, 7, 8, 9];
  const kValues = [5, 6];
  let m, k, a, b, n, result;
  while (true) {
    m = mValues[Math.floor(Math.random() * mValues.length)];
    k = kValues[Math.floor(Math.random() * kValues.length)];
    a = Math.floor(Math.random() * 90) + 10;
    const mBig = BigInt(m);
    const aBig = BigInt(a);
    const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
    const req1Passed = a % m !== 0;
    const remainder = aTimesPowerOf10 % mBig;
    const req2Passed = remainder !== 0n;
    if (req1Passed && req2Passed) {
      const bBase = (mBig - remainder) % mBig;
      let bCandidate = bBase;
      while (bCandidate < 10n) {
        bCandidate += mBig;
      }
      if (bCandidate <= 99n) {
        b = bCandidate;
        n = aTimesPowerOf10 + b;
        result = n / mBig;
        break;
      }
    }
  }
  return {
    m: m,
    k: k,
    a: a,
    b: b.toString(),
    n: n.toString(),
    task: `${n.toString()} : ${m}`,
    answer: result.toString(),
  };
}
const problem = generateProblem();
console.log(problem);

function generateProblem() {
  const problemInfo = {
    type: "4_1.1.3_1.2",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "1 (деление многозначного sparse number на однозначное)",
    task: 2
  };
  const mValues = [3, 4, 6, 7, 8, 9];
  const kValues = [4, 5];
  let m, k, a, b, n, result;
  while (true) {
    m = mValues[Math.floor(Math.random() * mValues.length)];
    k = kValues[Math.floor(Math.random() * kValues.length)];
    a = Math.floor(Math.random() * 89) + 11;
    const req1Passed = a % m !== 0;
    const req2Passed = a % 10 !== 0;
    if (req1Passed && req2Passed) {
      const mBig = BigInt(m);
      const aBig = BigInt(a);
      const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
      const remainder = aTimesPowerOf10 % mBig;
      let bCandidate = (mBig - remainder) % mBig;
      if (bCandidate === 0n) {
        bCandidate = mBig;
      }
      if (bCandidate < 10n && bCandidate % 10n !== 0n) {
        b = bCandidate;
        n = aTimesPowerOf10 + b;
        result = n / mBig;
        break;
      }
    }
  }
  return {
    m: m,
    k: k,
    a: a,
    b: b.toString(),
    n: n.toString(),
    task: `${n.toString()} : ${m}`,
    answer: result.toString(),
  };
}
const problem = generateProblem();
console.log(problem);

function generateMultiplicationProblem() {
  const problemInfo = {
    type: "4_1.1.3_2.1",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "2 (умножение многозначного на однозначное =  sparse number)",
    task: 1
  };
  const nValues = [3, 4, 6, 7, 8, 9];
  const kValues = [5, 6];
  let n, k, a, m, result;
  while (true) {
    n = nValues[Math.floor(Math.random() * nValues.length)];
    k = kValues[Math.floor(Math.random() * kValues.length)];
    a = Math.floor(Math.random() * 80) + 11;
    const req1Passed = a % n !== 0;
    const req2Passed = a % 10 !== 0;
    if (req1Passed && req2Passed) {
      const nBig = BigInt(n);
      const aBig = BigInt(a);
      const aTimesPowerOf10 = aBig * (10n ** BigInt(k));
      m = aTimesPowerOf10 / nBig + 1n;
      result = nBig * m;
      break;
    }
  }
  return {
    n: n,
    k: k,
    a: a,
    m: m.toString(),
    task: `${n} * ${m.toString()}`,
    answer: result.toString(),
  };
}
const problem = generateMultiplicationProblem();
console.log(problem);

function generateInverseMultiplication() {
  const problemInfo = {
    type: "4_1.1.3_2.2",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "2 (умножение многозначного на однозначное =  sparse number)",
    task: 2
  };
  const nValues = [3, 4, 6, 7, 8, 9];
  const kValues = [3, 4];
  let n, k, a, b, p, m;
  while (true) {
    n = nValues[Math.floor(Math.random() * nValues.length)];
    k = kValues[Math.floor(Math.random() * kValues.length)];
    a = Math.floor(Math.random() * 900) + 100;
    const digits = a.toString().split('');
    const uniqueDigits = new Set(digits);
    if (uniqueDigits.size >= 2) {
      const nBig = BigInt(n);
      const kBig = BigInt(k);
      const aBig = BigInt(a);
      const aTimesPowerOf10 = aBig * (10n ** kBig);
      b = (nBig - (aTimesPowerOf10 % nBig)) % nBig;
      p = aTimesPowerOf10 + b;
      m = p / nBig;
      break;
    }
  }
  return {
    n: n,
    m: m.toString(),
    task: `${m.toString()} * ${n}`,
    answer: p.toString(),
    details: { k: k, a: a, b: b.toString() }
  };
}
const problem = generateInverseMultiplication();
console.log(problem);

function generateInverseMultiplication() {
  const problemInfo = {
    type: "4_1.1.3_2.3",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "2 (умножение многозначного на однозначное =  sparse number)",
    task: 3
  };
  const nValues = [3, 6, 7, 9];
  const kValues = [4, 5];
  let n, k, a, b, p, m;
  while (true) {
    n = nValues[Math.floor(Math.random() * nValues.length)];
    k = kValues[Math.floor(Math.random() * kValues.length)];
    a = Math.floor(Math.random() * 89) + 11;
    const digits = a.toString().split('');
    if (digits[0] !== digits[1]) {
      const nBig = BigInt(n);
      const kBig = BigInt(k);
      const aBig = BigInt(a);
      const aTimesPowerOf10 = aBig * (10n ** kBig);
      b = (nBig - (aTimesPowerOf10 % nBig)) % nBig;
      p = aTimesPowerOf10 + b;
      m = p / nBig;
      break;
    }
  }
  return {
    n: n,
    m: m.toString(),
    task: `${m.toString()} * ${n}`,
    answer: p.toString(),
    details: { k: k, a: a, b: b.toString() }
  };
}
const problem = generateInverseMultiplication();
console.log(problem);

function generateProblem() {
  const problemInfo = {
    type: "4_1.1.3_2.4",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "2 (умножение многозначного на однозначное =  sparse number)",
    task: 4
  };
  const m2 = 8;
  let c, m1, P;
  // Найдём диапазон для c, чтобы m1 был 4-х или 5-значным.
  // 1000 / 1250 = 0.8 -> min c = 1.
  // 99999 / 1250 = 79.99 -> max c = 79.
  const possibleC = [];
  for (let i = 1; i <= 79; i += 2) {
    if ((1250 * i) % 100 !== 0) {
      possibleC.push(i);
    }
  }
  c = possibleC[Math.floor(Math.random() * possibleC.length)];
  m1 = 1250 * c;
  P = m1 * m2;
  return {
    m1: m1,
    m2: m2,
    task: `${m1} * ${m2}`,
    answer: P,
    details: { c: c }
  };
}
const problem = generateProblem();
console.log(problem);

function generateAdditionProblem() {
  const problemInfo = {
    type: "4_1.1.3_3.1",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "3 (сумма или разность =  sparse number)",
    task: 1
  };
  const kZerosValues = [3, 4];
  let kZeros, s1Head, s2Head, s1Tail, s2Tail, s1, s2, S;
  while (true) {
    kZeros = kZerosValues[Math.floor(Math.random() * kZerosValues.length)];
    s1Head = Math.floor(Math.random() * 99) + 1;
    s2Head = Math.floor(Math.random() * 99) + 1;
    if ((s1Head + s2Head + 1) % 10 !== 0) {
      const powerOf10 = 10 ** kZeros;
      s1Tail = Math.floor(Math.random() * (powerOf10 - 1)) + 1;
      s2Tail = powerOf10 - s1Tail;
      s1 = s1Head * powerOf10 + s1Tail;
      s2 = s2Head * powerOf10 + s2Tail;
      S = s1 + s2;
      break;
    }
  }
  return {
    s1: s1,
    s2: s2,
    task: `${s1} + ${s2}`,
    answer: S,
    details: { kZeros, s1Head, s2Head, s1Tail, s2Tail },
  };
}
const problem = generateAdditionProblem();
console.log(problem);

function generateSubtractionProblem() {
  const problemInfo = {
    type: "4_1.1.3_3.2",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "3 (сумма или разность =  sparse number)",
    task: 2
  };
  const kZerosValues = [3, 4];
  let kZeros, R_head, R_tail, R, v_last, v_head, v, u;
  while (true) {
    kZeros = kZerosValues[Math.floor(Math.random() * kZerosValues.length)];
    R_head = Math.floor(Math.random() * 990) + 10;
    R_tail = Math.floor(Math.random() * 9) + 1;
    R = BigInt(R_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R_tail);
    const possibleVLast = [];
    for (let i = 1; i <= 9; i++) {
      if (i > (i + R_tail) % 10 && (i + R_tail) % 10 !== 0) {
        possibleVLast.push(i);
      }
    }
    if (possibleVLast.length > 0) {
      v_last = possibleVLast[Math.floor(Math.random() * possibleVLast.length)];
      v_head = Math.floor(Math.random() * 9990) + 10;
      v = BigInt(v_head) * 10n + BigInt(v_last);
      u = R + v;
      if (u >= 10000n && u <= 999999n) {
        break;
      }
    }
  }
  return {
    u: u.toString(),
    v: v.toString(),
    task: `${u.toString()} - ${v.toString()}`,
    answer: R.toString(),
  };
}
const problem = generateSubtractionProblem();
console.log(problem);

function generateCombinedProblem() {
const problemInfo = {
    type: "4_1.1.3_3.3",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "3 (сумма или разность =  sparse number)",
    task: 3
  };
  const kZeros = 3;
  let S_head, S_tail, S, a1, a2, S_tail_100, a3_head, a3_tail, a3, R;
  S_head = Math.floor(Math.random() * 180) + 20;
  S_tail = Math.floor(Math.random() * 990) + 10;
  S = BigInt(S_head) * (10n ** BigInt(kZeros)) + BigInt(S_tail);
  const a1_min = 1000n;
  const a1_max = S - 1000n;
  a1 = a1_min + BigInt(Math.floor(Math.random() * Number(a1_max - a1_min + 1n)));
  a2 = S - a1;
  S_tail_100 = Number(S % 100n);
  a3_head = Math.floor(Math.random() * 9) + 1;
  a3_tail = Math.floor(Math.random() * S_tail_100);
  a3 = BigInt(a3_head) * 100n + BigInt(a3_tail);
  R = S - a3;
  return {
    a1: a1.toString(),
    a2: a2.toString(),
    a3: a3.toString(),
    task: `${a1.toString()} + ${a2.toString()} - ${a3.toString()}`,
    answer: R.toString(),
  };
}
const problem = generateCombinedProblem();
console.log(problem);

function generateCombinedProblem() {
const problemInfo = {
    type: "4_1.1.3_3.4",
    class: 4,
    course: "1 (арифметика натуральных чисел)",
    module: "1 (счёт. Сложение и вычитание многозначных, деление и умножение на однозначное)",
    lesson: "3 (числа с большим количеством нулей)",
    taskType: "3 (сумма или разность =  sparse number)",
    task: 4
  };
  const kZeros = 3;
  const R1_head = Math.floor(Math.random() * 8) + 1;
  const R1_tail = Math.floor(Math.random() * 10);
  const R1 = BigInt(R1_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R1_tail);
  const R_final_head = Math.floor(Math.random() * (9 - R1_head)) + R1_head + 1;
  const R_final_tail = Math.floor(Math.random() * 10);
  const R_final = BigInt(R_final_head) * (10n ** BigInt(kZeros + 1)) + BigInt(R_final_tail);
  const a3 = BigInt(Math.floor(Math.random() * 900) + 100);
  const a1 = R1 + a3;
  const a2 = R_final - R1;
  return {
    a1: a1.toString(),
    a2: a2.toString(),
    a3: a3.toString(),
    task: `${a1.toString()} - ${a3.toString()} + ${a2.toString()}`,
    answer: R_final.toString(),
  };
}
const problem = generateCombinedProblem();
console.log(problem);

