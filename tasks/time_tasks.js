

// --- TASK BANK ---
const timeTasks = [
    {
        type: "Время в пути (позже)",
        number: "1.1",
        tags: ["время", "автобус", "пробки", "2_действия"],
        generate: () => {
            const n1 = getRandomInt(17, 20);
            let k1 = getRandomInt(21, 59); if (k1 % 10 === 0) k1 += 3;
            const n2 = getRandomInt(0, 2);
            let k2 = getRandomInt(1, k1 - 1); if (k2 % 10 === 0) k2 -= 5; if (k2 < 0) k2 = 1;
            const t = getRandomInt(71, 119);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const latePhrase = `${t} ${declineWord(t, ['минуту', 'минуты', 'минут'])}`;
            const problemText = `Автобус выехал с автовокзала в ${time1} и должен был прибыть в пункт назначения в ${time2}. Однако он попал в пробку и прибыл на ${latePhrase} позже. Сколько времени автобус был в пути? <br><i>Дайте ответ в формате чч:мм.</i>`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const departureTotalMinutes = vars.n1 * 60 + vars.k1;
            const scheduledArrivalTotalMinutes = (vars.n2 < vars.n1 ? vars.n2 + 24 : vars.n2) * 60 + vars.k2;
            const totalMinutesInWay = scheduledArrivalTotalMinutes + vars.t - departureTotalMinutes;
            const n0 = Math.floor(totalMinutesInWay / 60);
            const k0 = totalMinutesInWay % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },
    {
        type: "Время в пути (раньше)",
        number: "1.2",
        tags: ["время", "автобус", "2_действия"],
        generate: () => {
            const n1 = getRandomInt(17, 20);
            let k1 = getRandomInt(21, 59); if (k1 % 10 === 0) k1 += 3;
            const n2 = getRandomInt(0, 2);
            let k2 = getRandomInt(1, k1 - 1); if (k2 % 10 === 0) k2 -= 5; if (k2 < 0) k2 = 1;
            let t = getRandomInt(71, 119); t -= (t % 5);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const earlyPhrase = `${t} ${declineWord(t, ['минуту', 'минуты', 'минут'])}`;
            const problemText = `Автобус выехал с автовокзала в ${time1} и должен был прибыть в пункт назначения в ${time2}. Однако он не сделал остановку и прибыл на ${earlyPhrase} раньше. Сколько времени автобус был в пути? <br><i>Дайте ответ в минутах.</i>`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const departureTotalMinutes = vars.n1 * 60 + vars.k1;
            const scheduledArrivalTotalMinutes = (vars.n2 < vars.n1 ? vars.n2 + 24 : vars.n2) * 60 + vars.k2;
            return scheduledArrivalTotalMinutes - vars.t - departureTotalMinutes;
        }
    },
    {
        type: "Логика: Время прогулки (1)",
        number: "2.1",
        tags: ["время", "логика", "много_действий"],
        generate: () => {
            const N1 = [{ nom: "Маша", gen: "Маши" }, { nom: "Лена", gen: "Лены" }];
            const N2 = [{ nom: "Денис", gen: "Дениса" }, { nom: "Андрей", gen: "Андрея" }];
            const name1 = getRandomElement(N1);
            const name2 = getRandomElement(N2);
            const n1 = getRandomInt(14, 17); let k1 = getRandomInt(10, 39); if (k1 % 5 === 0) k1 += 1;
            const t1 = getRandomInt(11, 16);
            const n2 = n1 + 1; let k2 = getRandomInt(0, k1 - 1); k2 -= (k2 % 10);
            const t2 = getRandomInt(4, 14);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1.nom} вышла гулять в ${time1}, а ${name2.nom} на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже. ${name2.nom} вернулся домой в ${time2}, и он гулял на ${t2} ${declineWord(t2, ['минуту', 'минуты', 'минут'])} меньше ${name1.gen}. Сколько минут гуляла ${name1.nom}?`;
            return { variables: { n1, k1, n2, k2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1 + vars.t1) + vars.t2
    },
    {
        type: "Логика: Время прогулки (2)",
        number: "2.2",
        tags: ["время", "логика", "много_действий", "формат_чч:мм"],
        generate: () => {
            const N1 = [{ nom: "Ратмир", gen: "Ратмира" }, { nom: "Егор", gen: "Егора" }];
            const N2 = [{ nom: "Настя", gen: "Насти" }, { nom: "Аня", gen: "Ани" }];
            const name1 = getRandomElement(N1);
            const name2 = getRandomElement(N2);
            const n1 = getRandomInt(14, 17); let k1 = getRandomInt(10, 39); if (k1 % 5 === 0) k1 += 1;
            const t1 = getRandomInt(11, 16);
            const n2 = n1 + 1; let k2 = getRandomInt(0, k1 - 1); k2 -= (k2 % 10);
            const t2 = getRandomInt(4, 14);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1.nom} вышел гулять в ${time1}, а ${name2.nom} на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже. ${name2.nom} вернулась домой в ${time2}, и она гуляла на ${t2} ${declineWord(t2, ['минуту', 'минуты', 'минут'])} меньше ${name1.gen}. Во сколько вернулся домой ${name1.nom}? <br><i>Дайте ответ в формате чч:мм.</i>`;
            return { variables: { n1, k1, n2, k2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const name1Duration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1 + vars.t1) + vars.t2;
            const name1EndTotalMinutes = (vars.n1 * 60 + vars.k1) + name1Duration;
            const n0 = Math.floor(name1EndTotalMinutes / 60);
            const k0 = name1EndTotalMinutes % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    }
];



// Add these tasks to the global registry
window.taskRegistry.push(...timeTasks);
