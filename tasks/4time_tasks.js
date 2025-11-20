// --- TASK BANK ---
const newTasks = [
    {
        type: " ",
        number: "26",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "13"],
        generate: () => {
            const n1 = getRandomInt(17, 20);
            let k1 = getRandomInt(21, 59); if (k1 % 10 === 0) k1 += 3;
            const n2 = getRandomInt(0, 2);
            let k2 = getRandomInt(1, k1 - 1); if (k2 % 10 === 0) k2 -= 5; if (k2 < 0) k2 = 1;
            const t = getRandomInt(71, 119);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const latePhrase = `${t} ${declineWord(t, ['минуту', 'минуты', 'минут'])}`;
            const problemText = `Автобус выехал с автовокзала в ${time1} и должен был прибыть в пункт назначения в ${time2} следующего дня. Однако он попал в пробку и прибыл на ${latePhrase} позже. Сколько времени автобус был в пути? <br><br><em>Дайте ответ в формате чч:мм.</em>`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const departureTotalMinutes = vars.n1 * 60 + vars.k1;
            const scheduledArrivalTotalMinutes = (vars.n2 + 24) * 60 + vars.k2;
            const totalMinutesInWay = scheduledArrivalTotalMinutes + vars.t - departureTotalMinutes;
            const n0 = Math.floor(totalMinutesInWay / 60);
            const k0 = totalMinutesInWay % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "25",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "13"],
        generate: () => {
            const n1 = getRandomInt(17, 20);
            let k1 = getRandomInt(21, 59); if (k1 % 10 === 0) k1 += 3;
            const n2 = getRandomInt(0, 2);
            let k2 = getRandomInt(1, k1 - 1); if (k2 % 10 === 0) k2 -= 5; if (k2 < 0) k2 = 1;
            let t = getRandomInt(71, 119); t -= (t % 5);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const earlyPhrase = `${t} ${declineWord(t, ['минуту', 'минуты', 'минут'])}`;
            const problemText = `Автобус выехал с автовокзала в ${time1} и должен был прибыть в пункт назначения в ${time2} следующего дня. Однако он не сделал остановку и прибыл на ${earlyPhrase} раньше. Сколько времени автобус был в пути? <br><br><em>Дайте ответ в минутах.</em>`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const departureTotalMinutes = vars.n1 * 60 + vars.k1;
            const scheduledArrivalTotalMinutes = (vars.n2 + 24) * 60 + vars.k2;
            return scheduledArrivalTotalMinutes - vars.t - departureTotalMinutes;
        }
    },

    {
        type: " ",
        number: "24",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "12"],
        generate: () => {
            // Исправлено: Убраны имена с твердой основой (Лена, Яна), добавлены совместимые с окончанием -и
            const N1 = ["Маша", "Юля", "Наташа", "Оля", "Таня"];
            const N2 = ["Денис", "Демид", "Андрей", "Витя", "Саша"];
            const name1 = getRandomElement(N1);
            const name2 = getRandomElement(N2);
            const n1 = getRandomInt(14, 17);
            let k1 = getRandomInt(10, 39); if (k1 % 5 === 0) k1 += 1;
            const t1 = getRandomInt(11, 16);
            const n2 = n1 + 1;
            let k2 = getRandomInt(0, k1 - 1); k2 -= (k2 % 10);
            const t2 = getRandomInt(4, 14);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1} вышла гулять в ${time1}, а ${name2} на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже. ${name2} вернулся домой в ${time2}, и он гулял на ${t2} ${declineWord(t2, ['минуту', 'минуты', 'минут'])} меньше ${toGenitive(name1)}. Сколько минут гуляла ${name1}? <br><br><em> Запишите только число.<\em>`;
            return { variables: { n1, k1, n2, k2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1 + vars.t1) + vars.t2
    },

    {
        type: " ",
        number: "23",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "12"],
        generate: () => {
            const N1 = ["Ратмир", "Егор", "Миша", "Ильдар", "Денис"];
            // Исправлено: Убраны Алина, Сабина (требуют -ы), добавлены Соня, Варя (требуют -и)
            const N2 = ["Настя", "Аня", "Катя", "Соня", "Варя"];
            const name1 = getRandomElement(N1);
            const name2 = getRandomElement(N2);
            const n1 = getRandomInt(14, 17);
            let k1 = getRandomInt(10, 39); if (k1 % 5 === 0) k1 += 1;
            const t1 = getRandomInt(11, 16);
            const n2 = n1 + 1;
            let k2 = getRandomInt(0, k1 - 1); k2 -= (k2 % 10);
            const t2 = getRandomInt(4, 14);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1} вышел гулять в ${time1}, а ${name2} на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже. ${name2} вернулась домой в ${time2}, и она гуляла на ${t2} ${declineWord(t2, ['минуту', 'минуты', 'минут'])} меньше ${toGenitive(name1)}. Во сколько вернулся домой ${name1}? <br><br><em>Дайте ответ в формате чч:мм, например, 01:12.</em>`;
            return { variables: { n1, k1, n2, k2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const name1Duration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1 + vars.t1) + vars.t2;
            const name1EndTotalMinutes = (vars.n1 * 60 + vars.k1) + name1Duration;
            const n0 = Math.floor(name1EndTotalMinutes / 60);
            const k0 = name1EndTotalMinutes % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "22",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "11"],
        generate: () => {
            const n1 = getRandomInt(9, 20);
            let k1 = getRandomInt(5, 30); k1 -= (k1 % 10);
            const n2 = n1 + 4;
            const k2 = getRandomInt(k1 + 10, k1 + 29);
            const n3 = getRandomInt(n1 + 1, 22);
            let k3 = getRandomInt(10, 59); k3 -= (k3 % 10);
            let t1 = getRandomInt(61, 300); t1 -= (t1 % 10);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const time3 = `${String(n3).padStart(2, '0')}:${String(k3).padStart(2, '0')}`;
            const problemText = `Поезд Сапсан отправляется из Санкт-Петербурга в ${time1} и прибывает в Москву в ${time2}. Обычный поезд отправляется в ${time3}, а едет до Москвы на ${t1} мин дольше Сапсана. Во сколько этот поезд прибывает в Москву? <br><br><em>Дайте ответ в формате чч:мм, например, 01:12.</em>`;
            return { variables: { n1, k1, n2, k2, n3, k3, t1 }, problemText };
        },
        calculateAnswer: (vars) => {
            const sapsanDuration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1);
            const regularTrainDuration = sapsanDuration + vars.t1;
            const regularTrainArrival = (vars.n3 * 60 + vars.k3) + regularTrainDuration;
            const n0 = Math.floor(regularTrainArrival / 60);
            const k0 = regularTrainArrival % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "21",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "11"],
        generate: () => {
            const n1 = getRandomInt(5, 15);
            let k1 = getRandomInt(5, 30); k1 -= (k1 % 10);
            const n2 = getRandomInt(n1 + 5, n1 + 7);
            const k2 = getRandomInt(10, 50);
            let t1 = getRandomInt(61, 80); t1 -= (t1 % 5);
            const n3 = getRandomInt(10, 16);
            let k3 = getRandomInt(5, 30); k3 -= (k3 % 10);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const time3 = `${String(n3).padStart(2, '0')}:${String(k3).padStart(2, '0')}`;
            const problemText = `Поезд отправляется из Москвы в Санкт-Петербург в ${time1}, а прибывает в ${time2}. На обратную дорогу поезд тратит на ${t1} минут меньше. Во сколько поезд прибудет в Москву, если он выедет из Санкт-Петербурга в ${time3}? <br><br><em>Дайте ответ в формате чч:мм, например, 01:12.</em>`;
            return { variables: { n1, k1, n2, k2, n3, k3, t1 }, problemText };
        },
        calculateAnswer: (vars) => {
            const forwardDuration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1);
            const returnDuration = forwardDuration - vars.t1;
            const returnArrival = (vars.n3 * 60 + vars.k3) + returnDuration;
            const n0 = Math.floor(returnArrival / 60);
            const k0 = returnArrival % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "20",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "10"],
        generate: () => {
            const n1 = getRandomInt(8, 15);
            let k1 = getRandomInt(6, 10); k1 -= (k1 % 2);
            const n2 = getRandomInt(n1 + 2, n1 + 3);
            let k2 = getRandomInt(10, 50); k2 -= (k2 % 2);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `Лекция началась в ${time1} и закончилась в ${time2}. Посередине лекции лектор зевнул. Сколько времени было на часах? <br><br><em> Дайте ответ в формате чч:мм, например, 11:03.</em>`;
            return { variables: { n1, k1, n2, k2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const startMinutes = vars.n1 * 60 + vars.k1;
            const endMinutes = vars.n2 * 60 + vars.k2;
            const midpointMinutes = startMinutes + (endMinutes - startMinutes) / 2;
            const n0 = Math.floor(midpointMinutes / 60);
            const k0 = Math.round(midpointMinutes % 60); // Use round for .5 cases
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {

        type: " ",
        number: "19",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "10"],
        generate: () => {
            const n1 = getRandomInt(8, 15);
            let k1 = getRandomInt(5, 10); k1 -= (k1 % 2);
            const n2 = getRandomInt(2, 4);
            let k2 = getRandomInt(2, 50); k2 -= (k2 % 2);
            if ((k1 + k2) % 10 === 0) k2 += 2;
            let t1 = getRandomInt(70, 120); t1 -= (t1 % 10);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Лекция началась в ${time1} и длилась ${n2} ${declineWord(n2, ['час', 'часа', 'часов'])} ${k2} ${declineWord(k2, ['минуту', 'минуты', 'минут'])}. За ${t1} минут до конца лекции лектор зевнул. Сколько времени было на часах? <br><br><em> Дайте ответ в формате чч:мм, например, 11:03.</em>`;
            return { variables: { n1, k1, n2, k2, t1 }, problemText };
        },
        calculateAnswer: (vars) => {
            const yawnTime = (vars.n1 * 60 + vars.k1) + (vars.n2 * 60 + vars.k2) - vars.t1;
            const n0 = Math.floor(yawnTime / 60);
            const k0 = yawnTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "18",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "9"],
        generate: () => {
            // Исправлено: Убраны Василиса, Рита, Света (требуют -ы)
            const name1List = ["Даша", "Вика", "Маша", "Оля"];
            const name2List = ["Гоша", "Гриша", "Дима", "Миша"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const t1 = getRandomElement([40, 45]);
            let t2 = getRandomInt(12, 18); t2 -= (t2 % 2);
            const m1 = getRandomElement([2, 3, 4, 5, 6]);
            let m2 = getRandomElement([m1 + 2, m1 - 2]);
            if (m2 < m1) m2 = m1 + 2; 
            
            const schoolStartTime = 8 * 60 + 45; // 08:45
            const name2EndTime = schoolStartTime + (t1 * m2) + (t2 * (m2 - 1));
            const n1 = Math.floor(name2EndTime / 60);
            const k1 = name2EndTime % 60;
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;

            const problemText = `В школе каждый урок длится ${t1} минут, а каждая перемена - ${t2} минут. Занятия начинаются в 08:45. ${name1} ушла сразу после ${m1} урока, а ${name2} - сразу после ${m2}, в ${time1}. Сколько было времени, когда ушла ${name1}? <br><br><em> Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, m1, m2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const timeDiff = (vars.m2 - vars.m1) * (vars.t1 + vars.t2);
            const name1LeftTime = (vars.n1 * 60 + vars.k1) - timeDiff;
            const n0 = Math.floor(name1LeftTime / 60);
            const k0 = name1LeftTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "17",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "9"],
        generate: () => {
            const t1 = getRandomElement([40, 45]);
            let t2 = getRandomInt(12, 18); t2 -= (t2 % 2);
            const m1 = getRandomElement([2, 3, 4, 5, 6]);
            let m2 = getRandomElement([m1 + 2, m1 - 2]);
            if (m2 < m1) m2 = m1 + 2;

            const schoolStartTime = 8 * 60 + 45; // 08:45
            const m2EndTime = schoolStartTime + (t1 * m2) + (t2 * (m2 - 1));
            const n1 = Math.floor(m2EndTime / 60);
            const k1 = m2EndTime % 60;
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;

            const problemText = `В школе каждый урок длится ${t1} минут, а каждая перемена - ${t2} минут. Занятия начинаются в 08:45. ${m2}-й урок закончился в ${time1}. Во сколько закончился ${m1}-й урок? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, m1, m2, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const timeDiff = (vars.m2 - vars.m1) * (vars.t1 + vars.t2);
            const m1EndedTime = (vars.n1 * 60 + vars.k1) - timeDiff;
            const n0 = Math.floor(m1EndedTime / 60);
            const k0 = m1EndedTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "16",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "8"],
        generate: () => {
            const a = getRandomElement([1, 2, 3]);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            let t; do { t = getRandomInt(1, 29); } while (t % 10 === 0);
            const n1 = getRandomInt(1, 23);
            let k1; do { k1 = getRandomInt(11, 59); } while (k1 % 10 === 0);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Вылет самолёта задержали на ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. Он немного изменил маршрут, поэтому летел на ${t} минут больше расчётного времени и приземлился в ${time1}. Во сколько должен был приземлиться этот самолёт по плану? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, a, b, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const scheduledLanding = (vars.n1 * 60 + vars.k1) - vars.t - (vars.a * 60 + vars.b);
            const n0 = Math.floor(scheduledLanding / 60);
            const k0 = scheduledLanding % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {

        type: " ",
        number: "15",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "8"],
        generate: () => {
            const a = getRandomElement([1, 2, 3]);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            let t; do { t = getRandomInt(1, 29); } while (t % 10 === 0);
            const scheduledDuration = getRandomInt(120, 300); 
            const scheduledDeparture = (getRandomInt(8, 20) * 60) + getRandomInt(0, 59);
            const actualArrival = scheduledDeparture + (a * 60 + b) + (scheduledDuration - t);
            
            const n1 = Math.floor(actualArrival / 60) % 24;
            const k1 = actualArrival % 60;
            
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Вылет самолёта задержали на ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. Он немного изменил маршрут, поэтому летел на ${t} минут меньше расчётного времени и приземлился в ${time1}. Во сколько этот самолёт должен был вылететь по плану? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, a, b, t, scheduledDeparture }, problemText };
        },
        calculateAnswer: (vars) => {
            const n0 = Math.floor(vars.scheduledDeparture / 60);
            const k0 = vars.scheduledDeparture % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "14",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "7"],
        generate: () => {
            // Исправлено: Убраны Марина, Злата, Элина, Оксана
            const nameList = ["Юля", "Лиля", "Соня", "Аня", "Вика", "Мия"];
            const name1 = getRandomElement(nameList);
            let name2;
            do { name2 = getRandomElement(nameList); } while (name1 === name2);
            const n1 = getRandomInt(9, 14);
            const k1 = getRandomInt(21, 49);
            const n2 = n1 + 1;
            const k2 = getRandomInt(1, k1 - 11);
            let t = getRandomInt(60 + k2 - k1 + 6, 89); t -= (t % 5);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1} и ${name2} договорились встретиться. ${name1} пришла в ${time1}, но ${toGenitive(name2)} ещё не было. В ${time2} ${name2} пришла, и ${name1} возмущённо сказала: “Ты опоздала на ${t} минут!” “А ты на сколько?” - спросила ${name2}. Что должна (честно) ответить ${name1}? <br><br><em>Ответ дайте в минутах.</em>`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => (vars.n1 * 60 + vars.k1) - (vars.n2 * 60 + vars.k2 - vars.t)
    },

    {
        type: " ",
        number: "13",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "7"],
        generate: () => {
            // Исправлено (аналогично задаче 14)
            const nameList = ["Юля", "Лиля", "Соня", "Аня", "Вика", "Мия"];
            const name1 = getRandomElement(nameList);
            let name2;
            do { name2 = getRandomElement(nameList); } while (name1 === name2);
            const n1 = getRandomInt(9, 14);
            const k1 = getRandomInt(46, 58);
            const n2 = n1 + 2;
            const k2 = getRandomInt(1, k1 - 41);
            let t = getRandomInt(80 + k2 - k1 + 1, 119 + k2 - k1); t -= (t % 5);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const problemText = `${name1} и ${name2} договорились встретиться. ${name1} пришла в ${time1}, но ${toGenitive(name2)} ещё не было. В ${time2} ${name2} пришла, и ${name1} сказала: “Ты опоздала на ${t} минут!” За сколько минут до встречи пришла ${name1}?`;
            return { variables: { n1, k1, n2, k2, t }, problemText };
        },
        calculateAnswer: (vars) => (vars.n2 * 60 + vars.k2) - vars.t - (vars.n1 * 60 + vars.k1)
    },

    {
        type: " ",
        number: "12",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "6"],
        generate: () => {
            let t1; do { t1 = getRandomInt(61, 89); } while (t1 % 5 === 0);
            const t2 = getRandomInt(16, 44);
            const n1 = getRandomInt(9, 14);
            let k1; do { k1 = getRandomInt(12, 49); } while (k1 % 5 === 0);
            const name1List = ["Михаил Юрьевич", "Сергей Петрович", "Дмитрий Олегович", "Юрий Владимирович"];
            const name1 = getRandomElement(name1List);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `${name1} хотел приехать на вокзал за ${t1} минут до отправления поезда. Однако он потратил на дорогу на ${t2} минут больше, чем рассчитывал, и приехал только в ${time1}. Во сколько отправляется поезд? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const departureTime = (vars.n1 * 60 + vars.k1) - vars.t2 + vars.t1;
            const n0 = Math.floor(departureTime / 60);
            const k0 = departureTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "11",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "6"],
        generate: () => {
            let t3; do { t3 = getRandomInt(6, 9); } while (t3 % 10 === 0);
            const t4 = getRandomInt(6, 9);
            const t5 = getRandomElement([70, 80]);
            const n1 = getRandomInt(9, 14);
            let k1; do { k1 = getRandomInt(12, 49); } while (k1 % 5 === 0);
            const name1List = ["Михаил Юрьевич", "Сергей Петрович", "Дмитрий Олегович", "Юрий Владимирович"];
            const name1 = getRandomElement(name1List);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `${name1} планировал приехать на вокзал в ${time1}, за ${t4} минут до отправления поезда. Он вышел из дома позже и опоздал на поезд на ${t3} минут. Во сколько ${name1} вышел из дома, если до вокзала он добирался ${t5} минут? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, t3, t4, t5 }, problemText };
        },
        calculateAnswer: (vars) => {
            const leftHomeTime = (vars.n1 * 60 + vars.k1) + vars.t4 + vars.t3 - vars.t5;
            const n0 = Math.floor(leftHomeTime / 60);
            const k0 = leftHomeTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "10",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "5"],
        generate: () => {
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 29); } while (k1 % 5 === 0);
            const n2 = getRandomInt(n1 + 4, n1 + 6);
            let k2; do { k2 = getRandomInt(k1 + 1, 59); } while (k2 % 5 === 0);
            let n3; do { n3 = getRandomInt(9, 16); } while (n3 >= n1 - 1 && n3 <= n1 + 1);
            const k3 = getRandomElement([10, 20, 30, 40, 50]);
            const t = getRandomElement([70, 80]);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const time3 = `${String(n3).padStart(2, '0')}:${String(k3).padStart(2, '0')}`;
            const problemText = `Первый поезд выезжает со станции А в ${time1} и прибывает в Б в ${time2}. Второй поезд выезжает из А в ${time3}, а едет на ${t} минут дольше, чем первый. Во сколько второй поезд прибывает в Б? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, n2, k2, n3, k3, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const firstTrainDuration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1);
            const secondTrainArrival = (vars.n3 * 60 + vars.k3) + firstTrainDuration + vars.t;
            const n0 = Math.floor(secondTrainArrival / 60);
            const k0 = secondTrainArrival % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "9",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "5"],
        generate: () => {
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 29); } while (k1 % 5 === 0);
            const n2 = getRandomInt(n1 + 4, n1 + 6);
            let k2; do { k2 = getRandomInt(k1 + 1, 59); } while (k2 % 5 === 0);
            let n3; do { n3 = getRandomInt(9, 16); } while (n3 >= n1 - 1 && n3 <= n1 + 1);
            const k3 = getRandomElement([10, 20, 30, 40, 50]);
            const t = getRandomElement([70, 80]);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const time2 = `${String(n2).padStart(2, '0')}:${String(k2).padStart(2, '0')}`;
            const time3 = `${String(n3).padStart(2, '0')}:${String(k3).padStart(2, '0')}`;
            const problemText = `Первый поезд выезжает со станции А в ${time1} и прибывает в Б в ${time2}. Второй поезд выезжает из А в ${time3}, а едет на ${t} минут меньше, чем первый. Во сколько второй поезд прибывает в Б? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, n2, k2, n3, k3, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const firstTrainDuration = (vars.n2 * 60 + vars.k2) - (vars.n1 * 60 + vars.k1);
            const secondTrainArrival = (vars.n3 * 60 + vars.k3) + firstTrainDuration - vars.t;
            const n0 = Math.floor(secondTrainArrival / 60);
            const k0 = secondTrainArrival % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "8",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "4"],
        generate: () => {
            const name1List = ["Ромашково", "Хлюпино", "Быково", "Дачная", "Отдых", "Лесная"];
            const name2List = ["Ваня", "Даня", "Рома", "Андрей", "Саша"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const a = getRandomElement([1, 2, 3]);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 59); } while (k1 % 5 === 0);
            
            const interval = a * 60 + b;
            const possibleT = [];
            for (let i = 60; i < interval; i += 30) {
                possibleT.push(i);
            }
            const t = getRandomElement(possibleT);

            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Электрички со станции ${name1} отправляются в Москву с интервалом ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. ${name2} приехал на станцию в ${time1} и оказалось, что последняя электричка ушла ${t} минут назад. Во сколько уходит следующая электричка? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, a, b, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const nextTrainTime = (vars.n1 * 60 + vars.k1) - vars.t + (vars.a * 60 + vars.b);
            const n0 = Math.floor(nextTrainTime / 60);
            const k0 = nextTrainTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "7",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "4"],
        generate: () => {
            const name1List = ["Ромашково", "Хлюпино", "Быково", "Дачная", "Отдых", "Лесная"];
            const name2List = ["Ваня", "Даня", "Рома", "Андрей", "Саша"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const a = getRandomElement([1, 2, 3]);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 59); } while (k1 % 5 === 0);
            
            const interval = a * 60 + b;
            const possibleT = [];
            for (let i = 60; i < interval; i += 30) {
                possibleT.push(i);
            }
            const t = getRandomElement(possibleT);

            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Электрички со станции ${name1} отправляются в Москву с интервалом ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. ${name2} приехал на станцию в ${time1} и оказалось, что следующая электричка будет через ${t} минут. Во сколько ушла предыдущая электричка? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, a, b, t }, problemText };
        },
        calculateAnswer: (vars) => {
            const prevTrainTime = (vars.n1 * 60 + vars.k1) + vars.t - (vars.a * 60 + vars.b);
            const n0 = Math.floor(prevTrainTime / 60);
            const k0 = prevTrainTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "6",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "3"],
        generate: () => {
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 59); } while (k1 % 5 === 0);
            const t1 = getRandomElement([240, 250, 260, 270, 280, 290, 300, 310, 320]);
            const n2 = getRandomInt(Math.floor(t1 / 60) + 1, Math.floor(t1 / 60) + 2);
            const k2 = getRandomInt(1, 9);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Автомобиль едет из города А в город Б ${t1} минут, а автобус - ${n2} ${declineWord(n2, ['час', 'часа', 'часов'])} ${k2} ${declineWord(k2, ['минуту', 'минуты', 'минут'])}. Автобус выехал из А в ${time1}. Во сколько должен выехать автомобиль, чтобы прибыть в Б одновременно с автобусом? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, t1, n2, k2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const busArrivalTime = (vars.n1 * 60 + vars.k1) + (vars.n2 * 60 + vars.k2);
            const carDepartureTime = busArrivalTime - vars.t1;
            const n0 = Math.floor(carDepartureTime / 60);
            const k0 = carDepartureTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "5",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "3"],
        generate: () => {
            const n1 = getRandomInt(9, 16);
            let k1; do { k1 = getRandomInt(1, 59); } while (k1 % 5 === 0);
            const t1 = getRandomElement([240, 250, 260, 270, 280, 290, 300, 310, 320]);
            const n2 = getRandomInt(Math.floor(t1 / 60) + 1, Math.floor(t1 / 60) + 2);
            const k2 = getRandomInt(1, 9);
            const time1 = `${String(n1).padStart(2, '0')}:${String(k1).padStart(2, '0')}`;
            const problemText = `Автомобиль едет из города А в город Б ${t1} минут, а автобус - ${n2} ${declineWord(n2, ['час', 'часа', 'часов'])} ${k2} ${declineWord(k2, ['минуту', 'минуты', 'минут'])}. Автомобиль выехал из А в ${time1}. Во сколько должен выехать автобус, чтобы прибыть в Б одновременно с автомобилем? <br><br><em>Дайте ответ в виде чч:мм, например, 08:23.</em>`;
            return { variables: { n1, k1, t1, n2, k2 }, problemText };
        },
        calculateAnswer: (vars) => {
            const carArrivalTime = (vars.n1 * 60 + vars.k1) + vars.t1;
            const busDepartureTime = carArrivalTime - (vars.n2 * 60 + vars.k2);
            const n0 = Math.floor(busDepartureTime / 60);
            const k0 = busDepartureTime % 60;
            return `${String(n0).padStart(2, '0')}:${String(k0).padStart(2, '0')}`;
        }
    },

    {
        type: " ",
        number: "4",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "2"],
        generate: () => {
            // Исправлено: Убраны Лена, Дарина, Лера, Аманда
            const name1List = ["Соня", "Даша", "Варя", "Тася", "Катя", "Ася"];
            const name2List = ["Серёжа", "Глеб", "Денис", "Антон", "Родион"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const a = getRandomElement([2, 3]);
            let b; do { b = getRandomInt(11, 49); } while (b % 5 === 0);
            const t1 = getRandomElement([2, 3, 4, 5, 6, 7, 8, 9]);
            const t2 = getRandomElement([70, 80]);
            const problemText = `${name1} гуляла ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. ${name2} вышел на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже ${toGenitive(name1)}, а вернулся на ${t2} минут раньше. Сколько минут гулял ${name2}?`;
            return { variables: { a, b, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => vars.a * 60 + vars.b - vars.t1 - vars.t2
    },

    {
        
        type: " ",
        number: "3",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "2"],
        generate: () => {
            // Исправлено
            const name1List = ["Соня", "Даша", "Варя", "Тася", "Катя", "Ася"];
            const name2List = ["Серёжа", "Глеб", "Денис", "Антон", "Родион"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const a = getRandomElement([2, 3]);
            let b; do { b = getRandomInt(11, 49); } while (b % 5 === 0);
            const t1 = getRandomElement([2, 3, 4, 5, 6, 7, 8, 9]);
            const t2 = getRandomElement([t1 + 1, t1 + 2, t1 + 3]);
            const problemText = `${name1} гуляла ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. ${name2} вышел на ${t1} ${declineWord(t1, ['минуту', 'минуты', 'минут'])} позже ${toGenitive(name1)}, а вернулся на ${t2} ${declineWord(t2, ['минуту', 'минуты', 'минут'])} позже. Сколько минут гулял ${name2}?`;
            return { variables: { a, b, t1, t2 }, problemText };
        },
        calculateAnswer: (vars) => vars.a * 60 + vars.b - vars.t1 + vars.t2
    },

    {
        type: " ",
        number: "2",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "1"],
        generate: () => {
            // Исправлено
            const name2List = ["Соня", "Даша", "Варя", "Тася", "Катя", "Ася"];
            const name1List = ["Серёжа", "Глеб", "Денис", "Антон", "Родион"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const a = getRandomElement([1, 2, 3]);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            let t1; do { t1 = getRandomInt(11, 24); } while (t1 % 10 === 0);
            const t2 = getRandomInt(6, 14);
            // Constraint ensures t3 is reasonable
            const t3 = getRandomInt(10, t1 + t2 - 1);

            const problemText = `Тест длится ${a} ${declineWord(a, ['час', 'часа', 'часов'])} ${b} минут. ${name1} опоздал на тест на ${t1} минут, а закончил за ${t2} минут до конца. ${name2} писала тест на ${t3} минут больше ${toGenitive(name1)}. За сколько минут ${name2} справилась с тестом?`;
            return { variables: { a, b, t1, t2, t3 }, problemText };
        },
        calculateAnswer: (vars) => (vars.a * 60 + vars.b) - vars.t1 - vars.t2 + vars.t3
    },
    
    {
        type: " ",
        number: "1",
        tags: ["время_на_часах", "4_класс", "текстовая_задача", "1"],
        generate: () => {
            // Исправлено
            const name2List = ["Соня", "Даша", "Варя", "Тася", "Катя", "Ася"];
            const name1List = ["Серёжа", "Глеб", "Денис", "Антон", "Родион"];
            const name1 = getRandomElement(name1List);
            const name2 = getRandomElement(name2List);
            const b = getRandomElement([10, 20, 30, 40, 50]);
            const t1 = getRandomInt(4, 6);
            const t2 = getRandomElement([65, 70, 75, 80, 85]);
            let t3; do { t3 = getRandomInt(3, t1 + t2 - 6); } while (t3 % 5 === 0);
            const problemText = `Тест длится 2 часа ${b} минут. ${name2} опоздала на него на ${t1} минут, а закончил за ${t2} минут до конца. ${name1} писал тест на ${t3} минут дольше ${toGenitive(name2)}. За сколько минут ${name1} выполнил тест?`;
            return { variables: { b, t1, t2, t3 }, problemText };
        },
        calculateAnswer: (vars) => 120 + vars.b - vars.t1 - vars.t2 + vars.t3
    }
];

// Add these tasks to the global registry
window.taskRegistry.push(...newTasks);
