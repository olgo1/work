const _4unitsTasks = [

// Деление именованных величин. Длина (периметр не кратен 4)

{
    type: " ",
    name: "4units35",
    tags: ["4_класс", "текстовая_задача", "единицы_длины", "деление_именованных_величин", "периметр_квадрата", "площадь_квадрата"],
    generate: function() {
        // --- Вспомогательные функции и данные ---
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const perimeters = [2, 6, 10];
        const units = ['см', 'дм', 'м'];

        // 1. Генерируем исходные данные
        const n1 = getRandomElement(perimeters);
        const perimeterUnit = getRandomElement(units);

        // 2. Вычисляем сторону квадрата в исходных единицах
        const side = n1 / 4;
        
        // 3. Определяем целевые единицы и вычисляем ответ
        let answer;
        let areaUnit;

        switch (perimeterUnit) {
            case 'дм':
                // Если периметр в дм, площадь считаем в см2
                areaUnit = 'см2';
                answer = (side * 10) * (side * 10);
                break;
            case 'см':
                // Если периметр в см, площадь считаем в мм2
                areaUnit = 'мм2';
                answer = (side * 10) * (side * 10);
                break;
            case 'м':
                // Если периметр в м, площадь считаем в дм2
                areaUnit = 'дм2';
                answer = (side * 10) * (side * 10);
                break;
        }

        // 4. Формируем текст задачи
        const problemText = `Периметр квадрата равен ${n1} ${perimeterUnit}. Найдите его площадь.`;

        return {
            variables: { answer: answer, unit: areaUnit },
            problemText: problemText + `<br><br><em>Запишите число и единицу измерения (например, 81 дм2). Единица измерения должна быть одна, самая крупная из возможных, а число натуральное. </em>`
        };
    },
    
    calculateAnswer: function(vars) {
        // Функция проверки для системы возвращает ответ с единицами измерения
        return `${vars.answer} ${vars.unit}`;
    }
},

// Деление именованных величин. Масса

{
    type: " ",
    name: "4units34",
    tags: ["4_класс", "текстовая_задача", "единицы_массы", "деление_именованных_величин"],
    generate: function() {
        // --- Вспомогательные функции и данные ---
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        function decline(number, forms) {
            const lastTwoDigits = number % 100;
            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return forms.gen_pl;
            const lastDigit = number % 10;
            if (lastDigit === 1) return forms.nom_sg;
            if ([2, 3, 4].includes(lastDigit)) return forms.gen_sg;
            return forms.gen_pl;
        }

        const items = [
            { nom_sg: 'пачка масла', gen_sg: 'пачки масла', gen_pl: 'пачек масла' },
            { nom_sg: 'грейпфрут', gen_sg: 'грейпфрута', gen_pl: 'грейпфрутов' },
            { nom_sg: 'голубь', gen_sg: 'голубя', gen_pl: 'голубей' },
            { nom_sg: 'белка', gen_sg: 'белки', gen_pl: 'белок' }
        ];
        
        // 1. Задаём константы из условия задачи
        const n1 = 8;
        const n2 = 3;
        const total_weight_kg = 2;
        const item = getRandomElement(items);

        // 2. Вычисляем вес одного предмета и финальный ответ
        const weight_one_g = (total_weight_kg * 1000) / n1; // 2000 / 8 = 250
        const answer = weight_one_g * n2; // 250 * 3 = 750

        // 3. Формируем текст задачи
        const problemText = `Восемь одинаковых ${decline(n1, item)} весят ${total_weight_kg} кг. Сколько весят три ${decline(n2, item)}?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите число и единицу измерения (например, 150 г). Единица измерения должна быть одна, самая крупная из возможных, а число натуральное. </em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

{
    type: " ",
    name: "4units33",
    tags: ["4_класс", "текстовая_задача", "единицы_массы", "деление_именованных_величин"],
    generate: function() {
        // --- Вспомогательные функции и данные ---
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        function decline(number, forms) {
            if (number % 10 === 1 && number % 100 !== 11) return forms.nom_sg;
            if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return forms.gen_sg;
            return forms.gen_pl;
        }

        // Добавляем свойство 'adj' для правильного согласования прилагательного
        const items = [
            { nom_sg: 'батон', gen_sg: 'батона', gen_pl: 'батонов', adj: 'одинаковых' },
            { nom_sg: 'планшет', gen_sg: 'планшета', gen_pl: 'планшетов', adj: 'одинаковых' },
            { nom_sg: 'книга', gen_sg: 'книги', gen_pl: 'книг', adj: 'одинаковые' },
            { nom_sg: 'мяч', gen_sg: 'мяча', gen_pl: 'мячей', adj: 'одинаковых' },
            { nom_sg: 'белка', gen_sg: 'белки', gen_pl: 'белок', adj: 'одинаковые' }
        ];

        // 1. Задаём константы из условия задачи
        const n1 = 4;
        const n2 = 1;
        const total_weight_kg = 3;
        const item = getRandomElement(items);

        // 2. Вычисляем ответ
        const answer = (total_weight_kg * 1000) / n1; // 3000 / 4 = 750

        // 3. Формируем текст задачи, используя 'item.adj' для прилагательного
        const problemText = `Четыре ${item.adj} ${decline(n1, item)} весят ${total_weight_kg} кг. Сколько весит один ${decline(n2, item)}?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите число и единицу измерения (например, 750 г). Единица измерения должна быть одна, самая крупная из возможных, а число натуральное.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},


{
    type: " ",
    name: "4units32",
    tags: ["4_класс", "текстовая_задача", "единицы_массы", "деление_именованных_величин"],
    generate: function() {
        // --- Вспомогательные функции и данные ---
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        function decline(number, forms) {
            const lastTwoDigits = number % 100;
            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return forms.gen_pl;
            const lastDigit = number % 10;
            if (lastDigit === 1) return forms.nom_sg;
            if ([2, 3, 4].includes(lastDigit)) return forms.gen_sg;
            return forms.gen_pl;
        }

        const items = [
            { nom_sg: 'олень', gen_sg: 'оленя', gen_pl: 'оленей' },
            { nom_sg: 'кабан', gen_sg: 'кабана', gen_pl: 'кабанов' },
            { nom_sg: 'медведь', gen_sg: 'медведя', gen_pl: 'медведей' },
            { nom_sg: 'лев', gen_sg: 'льва', gen_pl: 'львов' },
            { nom_sg: 'пони', gen_sg: 'пони', gen_pl: 'пони' },
            { nom_sg: 'пианино', gen_sg: 'пианино', gen_pl: 'пианино' },
            { nom_sg: 'мотоцикл', gen_sg: 'мотоцикла', gen_pl: 'мотоциклов' }
        ];

        // 1. Задаём константы из условия задачи
        const n1 = 4;
        const n2 = 3;
        const total_weight_t = 1;
        const item = getRandomElement(items);

        // 2. Вычисляем вес одного предмета и финальный ответ
        const weight_one_kg = (total_weight_t * 1000) / n1; // 1000 / 4 = 250
        const answer = weight_one_kg * n2; // 250 * 3 = 750

        // 3. Формируем текст задачи
        const problemText = `Четыре одинаковых ${decline(n1, item)} весят ${total_weight_t} т. Сколько весят три ${decline(n2, item)}?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите число и единицу измерения (например, 2 кг). Единица измерения должна быть одна, самая крупная из возможных, а число натуральное.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} кг`;
    }
},

{
    type: " ",
    name: "4units31",
    tags: ["4_класс", "текстовая_задача", "единицы_массы", "деление_именованных_величин"],
    generate: function() {
        // --- Вспомогательные функции и данные ---
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        function decline(number, forms) {
            const lastTwoDigits = number % 100;
            if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return forms.gen_pl;
            const lastDigit = number % 10;
            if (lastDigit === 1) return forms.nom_sg;
            if ([2, 3, 4].includes(lastDigit)) return forms.gen_sg;
            return forms.gen_pl;
        }

        const items = [
            { nom_sg: 'яблоко', gen_sg: 'яблока', gen_pl: 'яблок' },
            { nom_sg: 'стакан муки', gen_sg: 'стакана муки', gen_pl: 'стаканов муки' },
            { nom_sg: 'шоколадка', gen_sg: 'шоколадки', gen_pl: 'шоколадок' },
            { nom_sg: 'кусок мыла', gen_sg: 'куска мыла', gen_pl: 'кусков мыла' },
            { nom_sg: 'мышь', gen_sg: 'мыши', gen_pl: 'мышей' }
        ];

        // 1. Задаём константы из условия задачи
        const n1 = 8;
        const n2 = 3;
        const total_weight_kg = 1;
        const item = getRandomElement(items);

        // 2. Вычисляем вес одного предмета и финальный ответ (конструктивный подход)
        const weight_one_g = (total_weight_kg * 1000) / n1; // 1000 / 8 = 125
        const answer = weight_one_g * n2; // 125 * 3 = 375

        // 3. Формируем текст задачи
        const problemText = `Восемь одинаковых ${decline(n1, item)} весят ${total_weight_kg} кг. Сколько весят три ${decline(n2, item)}?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите число и единицу измерения (например, 150 г). Единица измерения должна быть одна, самая крупная из возможных, а число натуральное.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

// Текстовые задачи. Перевод единиц массы

{
    type: " ",
    name: "4units30",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное",  "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // 1. Создаём переменные так, чтобы они сразу были правильными.
        const n3 = getRandomInt(1401, 1800); // Вес автомобиля без груза
        const half_cargo_weight_kg = getRandomInt(100, 400); // Вес половины груза

        // 2. Вычисляем остальные значения
        const cargo_weight_kg = half_cargo_weight_kg * 2;
        const total_weight_kg = n3 + cargo_weight_kg;

        // 3. Превращаем общий вес в центнеры и килограммы
        const n1 = Math.floor(total_weight_kg / 100);
        const n2 = total_weight_kg % 100;
        
        // --- ИСПРАВЛЕНО: Формируем строку веса без 0 кг ---
        let weight_text;
        if (n2 === 0) {
            weight_text = `${n1} ц`;
        } else {
            weight_text = `${n1} ц ${n2} кг`;
        }
        
        // 4. Финальный ответ
        const answer = n3 + half_cargo_weight_kg;

        const problemText = `Автомобиль с грузом весит ${weight_text}, а без груза — ${n3} кг. Сколько будет весить автомобиль с половиной этого груза?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Ответ дайте в килограммах. Запишите только число.</em>"
        };
    },
    
    calculateAnswer: function(vars) {
        return `${vars.answer} кг`;
    }
},

{
    type: " ",
    name: "4units28",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "умножение_на_многозначное", "деление_на_многозначное",  "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // --- 1. База данных кондитерских изделий с указанием РОДА ---
        const pastries = [
            { one_genitive: 'трубочки', five: 'трубочек', gender: 'f' },
            { one_genitive: 'корзиночки', five: 'корзиночек', gender: 'f' },
            { one_genitive: 'булочки', five: 'булочек', gender: 'f' },
            { one_genitive: 'эклера', five: 'эклеров', gender: 'm' },
            { one_genitive: 'профитроля', five: 'профитролей', gender: 'm' },
            { one_genitive: 'ватрушки', five: 'ватрушек', gender: 'f' },
            { one_genitive: 'тарталетки', five: 'тарталеток', gender: 'f' }
        ];

        // --- 2. Случайный выбор двух РАЗНЫХ изделий ---
        const item1 = getRandomElement(pastries);
        let item2;
        do {
            item2 = getRandomElement(pastries);
        } while (item1 === item2);
        
        // --- 3. Динамический выбор слова "один" в зависимости от рода ---
        const one_word_1 = item1.gender === 'm' ? 'одного' : 'одной';
        const one_word_2 = item2.gender === 'm' ? 'одного' : 'одной';
        
        let n1, n2, n3, n4, answer;

        while (true) {
            // ... (остальная логика генерации чисел осталась без изменений)
            const weight_per_basket_g = getRandomInt(50, 150);
            n4 = getRandomElement([10, 15, 20, 25, 30]);
            if (weight_per_basket_g <= n4) continue;

            const weight_per_tube_g = weight_per_basket_g + n4;

            let a = weight_per_basket_g, b = weight_per_tube_g, gcd = 1;
            for (let i = 1; i <= a && i <= b; i++) { if (a % i === 0 && b % i === 0) gcd = i; }
            const lcm = (a * b) / gcd;

            const min_total_g = 110 * 1000;
            const max_total_g = 290 * 1000;
            const min_multiplier = Math.ceil(min_total_g / lcm);
            const max_multiplier = Math.floor(max_total_g / lcm);

            if (min_multiplier > max_multiplier) continue;
            
            const total_cream_g = lcm * getRandomInt(min_multiplier, max_multiplier);
            
            n3 = Math.round(total_cream_g / weight_per_tube_g);
            answer = Math.round(total_cream_g / weight_per_basket_g);
            
            if (n3 % 1000 === 0) continue;

            const total_cream_kg = total_cream_g / 1000;
            n1 = Math.floor(total_cream_kg / 100);
            n2 = total_cream_kg % 100;
            
            if (n2 >= 10 && n2 <= 90 && n2 % 10 === 0) {
                break;
            }
        }

        const problemText = `На кондитерской фабрике во время одного замеса готовят ${n1} ц ${n2} кг крема. Этим кремом можно наполнить ${n3} ${item1.five}. Сколько ${item2.five} можно наполнить этим же кремом, если для ${one_word_2} ${item2.one_genitive} нужно на ${n4} г крема меньше, чем для ${one_word_1} ${item1.one_genitive}?`;

        return {
            variables: { answer: answer, itemName: item2.five },
            problemText: problemText
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} ${vars.itemName}`;
    }
},

{
    type: " ",
    name: "4units26",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };
        
        const heroes = [
            { one: 'маковка', two: 'маковки', five: 'маковок' },
            { one: 'кубышка', two: 'кубышки', five: 'кубышек' },
            { one: 'хлобышка', two: 'хлобышки', five: 'хлобышек' },
            { one: 'пупырка', two: 'пупырки', five: 'пупырок' },
            { one: 'фыфринка', two: 'фыфринки', five: 'фыфринок' },
            { one: 'шушук', two: 'шушука', five: 'шушуков' },
            { one: 'трюшка', two: 'трюшки', five: 'трюшек' },
            { one: 'пампушка', two: 'пампушки', five: 'пампушек' }
        ];
        
        let n1, n2, n3, n4, n5, name1, name2, answer;

        while (true) {
            n1 = getRandomInt(3, 9);
            n2 = getRandomInt(3, 9);
            const total_weight1_kg = n1 * 100 + n2;

            const valid_n4s = [];
            for (let i = 3; i <= 9; i++) {
                if (total_weight1_kg % i === 0) {
                    valid_n4s.push(i);
                }
            }

            if (valid_n4s.length === 0) continue;

            n4 = valid_n4s[getRandomInt(0, valid_n4s.length - 1)];
            const name1_weight_g = (total_weight1_kg / n4) * 1000;

            n5 = getRandomInt(3, 9);
            
            const answer_options = [100, 150, 200, 250, 300, 350, 400, 450];
            const name2_weight_g = answer_options[getRandomInt(0, answer_options.length - 1)];
            
            if (name1_weight_g <= name2_weight_g) continue;

            n3 = n5 * name1_weight_g + name2_weight_g;
            if (n3 % 100 !== 0) continue;
            
            answer = name2_weight_g;
            break;
        }

        const name1_idx = getRandomInt(0, heroes.length - 1);
        let name2_idx;
        do {
            name2_idx = getRandomInt(0, heroes.length - 1);
        } while (name1_idx === name2_idx);
        name1 = heroes[name1_idx];
        name2 = heroes[name2_idx];

        const name1_word_n4 = declineNoun(n4, name1.one, name1.two, name1.five);
        const name1_word_n5 = declineNoun(n5, name1.one, name1.two, name1.five);
        
        const problemText = `${n4} ${name1_word_n4} весят ${n1} ц ${n2} кг, а ${n5} ${name1_word_n5} и ${name2.one} — ${n3} г. Сколько весит ${name2.one}?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Ответ дайте в граммах. Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

{
    type: " ",
    name: "4units25",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let n1, n2, n3, answer;

        // --- НОВАЯ, КОНСТРУКТИВНАЯ ЛОГИКА ---
        while (true) {
            // 1. "Загадываем" ответ (разницу), который должен быть кратен 100
            const diff = getRandomInt(1, 15) * 100; // Разница от 100 до 1500 г

            // 2. Генерируем, сколько конфет принесли гости (n3)
            const n3_generated = getRandomInt(21, 49) * 100;

            // 3. По математической формуле вычисляем, каким должен был быть начальный вес
            // Формула выведена из уравнения: diff = (initial / 3) - ((initial + n3) / 5)
            const initial_sweets_g = (15 * diff + 3 * n3_generated) / 2;

            // 4. "Разбираем" начальный вес на килограммы (n1) и граммы (n2)
            const n1_calculated = Math.floor(initial_sweets_g / 1000);
            const n2_calculated = initial_sweets_g % 1000;

            // 5. Проверяем, попали ли n1 и n2 в заданные диапазоны
            const is_n1_valid = n1_calculated >= 6 && n1_calculated <= 14;
            const is_n2_valid = n2_calculated >= 100 && n2_calculated <= 900 && n2_calculated % 100 === 0;

            // Если все условия сошлись — мы нашли идеальный набор чисел
            if (is_n1_valid && is_n2_valid) {
                n1 = n1_calculated;
                n2 = n2_calculated;
                n3 = n3_generated;
                answer = diff;
                break; // Выходим из цикла
            }
        }

        // --- Формируем текст задачи ---
        const problemText = `Три Толстяка разделили между собой ${n1} кг ${n2} г конфет. К ним в гости пришли Карлсон и Винни-Пух и принесли ещё ${n3} г конфет. Все конфеты собрали вместе и разделили поровну, вот только один Толстяк подсчитал, что теперь ему досталось меньше конфет. На сколько?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Ответ дайте в граммах. Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

{
    type: " ",
    name: "4units24",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const n2_options = [100, 200, 300, 400, 500, 600, 700, 800, 900];
        const n4_options = [2, 3, 4];

        let n1, n2, n3, n4, n5, n6, answer;

        while (true) {
            n4 = n4_options[getRandomInt(0, n4_options.length - 1)];
            const day2_work_m = getRandomInt(8, 15) * 100;
            n3 = day2_work_m * n4;

            if (n3 % 1000 === 0) continue;

            const day1_plus_2_work = n3 + day2_work_m;
            if (day1_plus_2_work < 2100) continue;

            n5 = getRandomInt(1, Math.floor(day1_plus_2_work / 1000) - 1);
            if (n5 === 0) continue;
            
            n6 = getRandomInt(1, 9) * 100;

            const day3_reduction_m = n5 * 1000 + n6;
            if (day3_reduction_m >= day1_plus_2_work) continue;

            const day3_work_m = day1_plus_2_work - day3_reduction_m;
            const total_work_done_m = day1_plus_2_work + day3_work_m;
            const remaining_work_m = getRandomInt(10, 30) * 100;
            const total_road_length_m = total_work_done_m + remaining_work_m;
            
            n1 = Math.floor(total_road_length_m / 1000);
            n2 = total_road_length_m % 1000;

            if (n1 > 5 && n1 < 15 && n2_options.includes(n2)) {
                answer = remaining_work_m;
                break;
            }
        }

        const problemText = `Нужно заасфальтировать ${n1} км ${n2} м дороги. В первый день заасфальтировали ${n3} м, во второй день — в ${n4} раза меньше, а в третий — на ${n5} км ${n6} м меньше, чем за первые два дня. Сколько метров дороги осталось заасфальтировать?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите только число.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} м`;
    }
},

{
    type: " ",
    name: "4units23",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "умножение_на_многозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        // --- 1. Опции для переменных ---
        const n1_options = [5, 10]; // вес среднего
        const n2_options = [15, 20, 25]; // вес большого
        const n3_options = [2, 4, 6]; // кол-во больших
        const n4_options = [2, 4, 6, 8]; // кол-во средних
        const n6_options = [250, 500, 750]; // граммы в итоговом весе
        const answer_options = [2, 4, 6, 8, 10]; // кол-во маленьких Ответ)

        let n1, n2, n3, n4, n5, n6, answer;

        // --- 2. Цикл для подбора чисел, удовлетворяющих всем условиям ---
        while(true) {
            // Генерируем ответ и все переменные
            answer = answer_options[getRandomInt(0, answer_options.length - 1)];
            n1 = n1_options[getRandomInt(0, n1_options.length - 1)];
            n2 = n2_options[getRandomInt(0, n2_options.length - 1)];
            n3 = n3_options[getRandomInt(0, n3_options.length - 1)];
            n4 = n4_options[getRandomInt(0, n4_options.length - 1)];

            // Вычисляем общий вес в граммах
            const total_weight_g = (n3 * n2 * 1000) + (n4 * n1 * 1000) + (answer * 1250);

            // Разделяем общий вес на кг и г
            n5 = Math.floor(total_weight_g / 1000);
            n6 = total_weight_g % 1000;

            // Проверяем, соответствуют ли n5 и n6 заданным условиям
            const is_n5_valid = n5 > 60 && n5 < 150;
            const is_n6_valid = n6_options.includes(n6);
            
            if (is_n5_valid && is_n6_valid) {
                break; // Если всё подходит, выходим из цикла
            }
        }

        // --- 3. Формируем текст задачи ---
        const big_disks_word = declineNoun(n3, 'большой диск', 'больших диска', 'больших дисков');
        const medium_disks_word = declineNoun(n4, 'средний диск', 'средних диска', 'средних дисков');

        const problemText = `В тренажёрном зале есть маленькие диски весом 1 кг 250 г, средние весом ${n1} кг и большие весом ${n2} кг. 
Атлет взял ${n3} ${big_disks_word}, ${n4} ${medium_disks_word} и несколько маленьких, и оказалось, что их общий вес ${n5} кг ${n6} г. Сколько было маленьких дисков?`;

        return {
            variables: { answer: answer },
            problemText: problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4units22",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_многозначное", "умножение_на_многозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

        // --- 100% НАДЁЖНАЯ ЛОГИКА ---

        // 1. Генерируем "красивые" числа для условия задачи
        const n1 = getRandomInt(1, 2); // т
        const n2 = getRandomInt(1, 9); // ц
        const n3_kg = getRandomElement([100, 200, 300, 400, 500, 600, 700, 800, 900]); // кг
        
        // 2. Сразу выбираем вес одного батона
        const n4 = getRandomElement([450, 500, 550, 600]); // г

        // 3. Конструируем общий вес теста так, чтобы он ГАРАНТИРОВАННО делился на вес батона (n4)
        let total_dough_g = n1 * 1000000 + n2 * 100000 + n3_kg;
        total_dough_g = Math.round(total_dough_g / n4) * n4;

        // 4. Вычисляем вес испечённого хлеба (он будет целым или .5, Math.round это исправит)
        const total_baked_bread_g = Math.round(total_dough_g * 0.9);
        
        // 5. Генерируем параметры коробки
        const n5 = getRandomInt(4, 6); // кг
        const n6 = getRandomElement([100, 200, 300, 400, 500, 600, 700, 800, 900]); // г
        const box_capacity_g = n5 * 1000 + n6;
        
        // 6. Вычисляем финальный ответ (количество коробок)
        const answer = Math.round(total_baked_bread_g / box_capacity_g);
        
        // --- Формируем текст задачи с гарантированно корректными числами ---
        const problemText = `На заводе приготовили ${n1} т ${n2} ц ${n3_kg} кг теста, из которого испекли батоны. На один батон требуется ${n4} г сырого теста. Упёк при выпечке составляет 10%. Затем батоны упаковали в коробки, по ${n5} кг ${n6} г в каждую. Сколько коробок понадобилось?`;

        return {
            variables: { answer: answer },
            problemText: problemText
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

{
    type: " ",
    name: "4units21",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        const animals = [
            { name: 'Белый медведь', name_genitive: 'белого медведя', min_weight: 300, max_weight: 500, gain_factor: 0.5, loss_factor: 0.7 },
            { name: 'Лось', name_genitive: 'лося', min_weight: 300, max_weight: 600, gain_factor: 0.3, loss_factor: 0.6 },
            { name: 'Морж', name_genitive: 'моржа', min_weight: 800, max_weight: 1200, gain_factor: 0.2, loss_factor: 0.5 }
        ];

        let initial_weight_kg, gain_kg, loss_kg, animal;

        while(true) {
            animal = animals[getRandomInt(0, animals.length - 1)];
            initial_weight_kg = getRandomInt(animal.min_weight, animal.max_weight);
            gain_kg = Math.round(initial_weight_kg * (animal.gain_factor + Math.random() * 0.1));
            loss_kg = Math.round(gain_kg * animal.loss_factor);

            if (gain_kg !== loss_kg && initial_weight_kg % 100 !== 0 && gain_kg % 100 !== 0 && loss_kg % 100 !== 0) {
                break;
            }
        }

        let values = [
            { type: 'initial', value: initial_weight_kg },
            { type: 'gain', value: gain_kg },
            { type: 'loss', value: loss_kg }
        ];
        values.sort((a, b) => b.value - a.value);

        const formatMap = {
            [values[0].type]: 'c_kg',
            [values[1].type]: 'kg',
            [values[2].type]: 'g'
        };

        const formattedValues = {};
        values.forEach(item => {
            const format = formatMap[item.type];
            let text;
            if (format === 'kg') {
                text = `${item.value} кг`;
            } else if (format === 'c_kg') {
                const c = Math.floor(item.value / 100);
                const kg = item.value % 100;
                text = `${c} ц ${kg} кг`;
            } else { // 'g'
                text = `${item.value * 1000} г`;
            }
            formattedValues[item.type] = text;
        });
        
        const answer = gain_kg - loss_kg;
        const problemText = `Весной ${animal.name.toLowerCase()} весил ${formattedValues.initial}. За лето и осень он набрал ${formattedValues.gain}, а за зиму похудел на ${formattedValues.loss}.
<br>На сколько килограммов изменился его вес к следующей весне по сравнению с прошлой?`;

        return {
            variables: { answer: answer },
            problemText: problemText + `<br><br><em>Запишите только число.</em>`
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} кг`;
    }
},

{
    type: " ",
    name: "4units19",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        let total_capacity_kg, passenger_count, total_passenger_weight_kg, box_count, one_box_g;
        let remaining_capacity_g, passenger_weights_kg;

        while (true) {
            total_capacity_kg = getRandomInt(300, 600);
            passenger_count = getRandomInt(1, 3);
            passenger_weights_kg = [];
            for (let i = 0; i < passenger_count; i++) {
                passenger_weights_kg.push(getRandomInt(70, 95));
            }
            total_passenger_weight_kg = passenger_weights_kg.reduce((sum, weight) => sum + weight, 0);
            box_count = getRandomInt(4, 9);
            one_box_g = getRandomInt(100, 300) * 100;
            const total_box_weight_g = box_count * one_box_g;
            const total_passenger_weight_g = total_passenger_weight_kg * 1000;
            const total_capacity_g = total_capacity_kg * 1000;
            const used_capacity_g = total_passenger_weight_g + total_box_weight_g;

            if (used_capacity_g < total_capacity_g) {
                remaining_capacity_g = total_capacity_g - used_capacity_g;
                break;
            }
        }

        // --- ИСПРАВЛЕННЫЙ ЛОГИЧЕСКИЙ БЛОК ---
        let capacity_text;
        const capacity_c = Math.floor(total_capacity_kg / 100);
        const capacity_kg = total_capacity_kg % 100;

        if (capacity_kg === 0) { // Если вес кратен 100 (например, 400 кг)
            const centner_word = declineNoun(capacity_c, 'центнер', 'центнера', 'центнеров');
            capacity_text = `${capacity_c} ${centner_word}`;
        } else { // Если вес не кратен 100 (например, 458 кг)
            capacity_text = `${capacity_c} ц ${capacity_kg} кг`;
        }
        // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

        const passenger_word = declineNoun(passenger_count, 'человек', 'человека', 'человек');
        let box_phrase;
        const lastDigit = box_count % 10;
        const isTeen = box_count % 100 >= 11 && box_count % 100 <= 19;
        if (lastDigit >= 2 && lastDigit <= 4 && !isTeen) {
            box_phrase = `одинаковые ${declineNoun(box_count, '', 'коробки', '')}`;
        } else {
            box_phrase = `одинаковых ${declineNoun(box_count, '', '', 'коробок')}`;
        }

        let passenger_text, verb_sit;
        if (passenger_count === 1) {
            verb_sit = 'сел';
            passenger_text = `один человек весом ${passenger_weights_kg[0]} кг`;
        } else {
            verb_sit = 'село';
            passenger_text = `${passenger_count} ${passenger_word} весом ${passenger_weights_kg.join(' и ')} кг`;
        }

        const problemText = `Лодка вмещает пассажиров и груз общим весом ${capacity_text}. В неё ${verb_sit} ${passenger_text} и взяли ${box_count} ${box_phrase} весом ${one_box_g} г каждая. Сколько ещё груза может увезти эта лодка?`;

        return {
            variables: { answer: remaining_capacity_g },
            problemText: problemText + "<br><br><em>Дайте ответ в килограммах и граммах, например: 15 кг 14 г</em>"
        };
    },
    calculateAnswer: function(vars) {
        const answer_g = vars.answer;
        if (answer_g === 0) return "0 г";
        const kg = Math.floor(answer_g / 1000);
        const g = answer_g % 1000;
        let result = '';
        if (kg > 0) result += `${kg} кг`;
        if (g > 0) result += ` ${g} г`;
        return result.trim();
    }
},

{
    type: " ",
    name: "4units18",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "деление_на_многозначное", "умножение_на_однозначное", "текстовая_задача"],
    
    // --- 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (теперь это общие методы) ---
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    declineNoun: function(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) { return five; }
        n %= 10;
        if (n === 1) { return one; }
        if (n >= 2 && n <= 4) { return two; }
        return five;
    },

    numberToWords: function(num) {
        if (num === 0) return 'ноль';
        const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
        const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
        const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
        const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
        const declensions = [
            { one: 'триллион', two: 'триллиона', five: 'триллионов' },
            { one: 'миллиард', two: 'миллиарда', five: 'миллиардов' },
            { one: 'миллион', two: 'миллиона', five: 'миллионов' },
            { one: 'тысяча', two: 'тысячи', five: 'тысяч' }
        ];
        
        let str = '';
        let tempNum = num;

        for (let i = 0; i < declensions.length; i++) {
            const divisor = Math.pow(1000, declensions.length - i);
            if (tempNum < divisor) continue;
            let chunk = Math.floor(tempNum / divisor);
            tempNum %= divisor;
            if (chunk === 0) continue;
            const h = Math.floor(chunk / 100);
            const t = Math.floor((chunk % 100) / 10);
            const u = chunk % 10;
            if (h > 0) str += hundreds[h] + ' ';
            if (t === 1) str += teens[u] + ' ';
            else {
                if (t > 1) str += tens[t] + ' ';
                if (u > 0) {
                    if (i === 3 && u === 1) str += 'одна ';
                    else if (i === 3 && u === 2) str += 'две ';
                    else str += units[u] + ' ';
                }
            }
            // Вызываем declineNoun как метод через "this"
            str += this.declineNoun(chunk, declensions[i].one, declensions[i].two, declensions[i].five) + ' ';
        }
        const h_rem = Math.floor(tempNum / 100);
        const t_rem = Math.floor((tempNum % 100) / 10);
        const u_rem = tempNum % 10;
        if (h_rem > 0) str += hundreds[h_rem] + ' ';
        if (t_rem === 1) str += teens[u_rem] + ' ';
        else {
            if (t_rem > 1) str += tens[t_rem] + ' ';
            if (u_rem > 0) str += units[u_rem] + ' ';
        }
        return str.trim();
    },

    // --- 2. ОСНОВНАЯ ФУНКЦИЯ ГЕНЕРАТОРА ---
    generate: function() {
        const k_options = [1, 2, 3, 4, 5];
        const n_options = [100, 200, 300, 400, 500];
        let bulk_weight_g, bulk_price, bulk_text, ring_weight_g, price_per_gram;
        
        // Все вызовы вспомогательных функций теперь идут через "this"
        const choice = this.getRandomInt(1, 3);
        if (choice === 1) {
            bulk_weight_g = 1000000;
            price_per_gram = this.getRandomInt(8000, 12000);
            bulk_price = price_per_gram * bulk_weight_g;
            bulk_text = "Одна тонна золота";
        } else if (choice === 2) {
            const k = k_options[this.getRandomInt(0, k_options.length - 1)];
            bulk_weight_g = k * 100000;
            price_per_gram = this.getRandomInt(80, 120) * 100;
            bulk_price = price_per_gram * bulk_weight_g;
            const centner_word = this.declineNoun(k, 'центнер', 'центнера', 'центнеров');
            bulk_text = `${k} ${centner_word} золота`;
        } else {
            const n = n_options[this.getRandomInt(0, n_options.length - 1)];
            bulk_weight_g = n * 1000;
            price_per_gram = this.getRandomInt(80, 120) * 100;
            bulk_price = price_per_gram * bulk_weight_g;
            const kg_word = this.declineNoun(n, 'килограмм', 'килограмма', 'килограммов');
            bulk_text = `${n} ${kg_word} золота`;
        }

        do {
            ring_weight_g = this.getRandomInt(3, 12);
        } while (ring_weight_g === 10);
        
        // --- 3. ФОРМИРОВАНИЕ ЗАДАЧИ ---
        const final_price = price_per_gram * ring_weight_g;
        const formatted_bulk_price_words = this.numberToWords(bulk_price);
        const ring_gram_word = this.declineNoun(ring_weight_g, 'грамм', 'грамма', 'граммов');
        const ruble_word = this.declineNoun(bulk_price, 'рубль', 'рубля', 'рублей');

        const problemText = `${bulk_text} стоит ${formatted_bulk_price_words} ${ruble_word}. Золотое кольцо весит ${ring_weight_g} ${ring_gram_word}. Сколько стоит золото для этого кольца?`;

        return {
            variables: { answer: final_price },
            problemText: problemText + "<br><br><em>Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        // Этот вызов теперь работает правильно
        const ruble_word = this.declineNoun(vars.answer, 'рубль', 'рубля', 'рублей');
        return `${vars.answer.toLocaleString('ru-RU')} ${ruble_word}`;
    }
},

{
    type: " ",
    name: "4units16",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        // --- 1. База данных предметов ---
        const big_items = ["чемодан", "саквояж", "баул", "рюкзак"];
        const medium_items = [
            { one: 'коробка', two: 'коробки', five: 'коробок' },
            { one: 'сумка', two: 'сумки', five: 'сумок' },
            { one: 'корзина', two: 'корзины', five: 'корзин' }
        ];
        const small_items = [
            { one: 'пакет', two: 'пакета', five: 'пакетов' },
            { one: 'свёрток', two: 'свёртка', five: 'свёртков' },
            { one: 'пакетик', two: 'пакетика', five: 'пакетиков' }
        ];

        let big_item_name, medium_item, small_item;
        let big_item_kg, big_item_g, medium_item_count, medium_item_kg, small_item_count;
        let total_weight_g, one_small_item_g;

        // --- 2. Цикл для подбора чисел, дающих целый ответ ---
        while(true) {
            // Вес большого предмета: 10-15 кг и 100-900 г
            big_item_kg = getRandomInt(10, 15);
            big_item_g = getRandomInt(1, 9) * 100;

            // Средние предметы: 2-4 штуки по 2-5 кг
            medium_item_count = getRandomInt(2, 4);
            medium_item_kg = getRandomInt(2, 5);

            // Маленькие предметы: 6-9 штук
            small_item_count = getRandomInt(6, 9);

            // Рассчитываем общий вес чемодана и коробок в граммах
            const known_weight_g = (big_item_kg * 1000 + big_item_g) + (medium_item_count * medium_item_kg * 1000);
            
            // Генерируем вес одного маленького пакета (300-900 г, кратно 100)
            one_small_item_g = getRandomInt(3, 9) * 100;

            // Рассчитываем итоговый общий вес
            total_weight_g = known_weight_g + (small_item_count * one_small_item_g);

            // Проверяем, что общий вес не "слишком круглый" (не оканчивается на 000)
            if (total_weight_g % 1000 !== 0) {
                break;
            }
        }

        // --- 3. Формируем текст задачи ---
        big_item_name = big_items[getRandomInt(0, big_items.length - 1)];
        medium_item = medium_items[getRandomInt(0, medium_items.length - 1)];
        small_item = small_items[getRandomInt(0, small_items.length - 1)];

        const medium_item_word = declineNoun(medium_item_count, medium_item.one, medium_item.two, medium_item.five);
        const small_item_word = declineNoun(small_item_count, small_item.one, small_item.two, small_item.five);

        const problemText = `Дама сдала в багаж ${big_item_name} весом ${big_item_kg} кг ${big_item_g} г, ${medium_item_count} ${medium_item_word} весом ${medium_item_kg} кг каждая и ${small_item_count} одинаковых ${small_item_word}. Сколько весит один ${small_item.one}, если масса всего багажа ${total_weight_g} г?`;

        return {
            variables: { answer: one_small_item_g },
            problemText: problemText + "<br><br><em>Ответ дайте в граммах. Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

{
    type: " ",
    name: "4units13",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };
        
        const heroes = [
            { one: 'шмурдик', two: 'шмурдика', five: 'шмурдиков' },
            { one: 'запырка', two: 'запырки', five: 'запырок' },
            { one: 'тумбрик', two: 'тумбрика', five: 'тумбриков' },
            { one: 'квакунец', two: 'квакунца', five: 'квакунцов' }
        ];

        let n, k, m, x, y, hero1, hero2, one_z_weight, shmurdik_weight_kg;

        // --- НОВАЯ, 100% НАДЁЖНАЯ ЛОГИКА ---
        while (true) {
            // 1. Генерируем n, k, m и делаем базовую проверку
            n = getRandomInt(3, 9);
            k = getRandomInt(5, 9);
            m = getRandomInt(3, 9);
            if (k % n === 0 || m === k) continue;

            // 2. Гарантируем делимость с помощью математики (НОД)
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const required_divisor = n / gcd(n, k);

            // 3. Генерируем one_z_weight так, чтобы он ГАРАНТИРОВАННО был кратен required_divisor
            const min_multiplier = Math.ceil(200 / required_divisor);
            const max_multiplier = Math.floor(500 / required_divisor);

            if (min_multiplier > max_multiplier) continue;
            
            const multiplier = getRandomInt(min_multiplier, max_multiplier);
            one_z_weight = multiplier * required_divisor;
            
            // 4. Проверяем только "косметические" условия
            const total_z_weight_kg = one_z_weight * m;
            x = Math.floor(total_z_weight_kg / 1000);
            y = total_z_weight_kg % 1000;

            if (x >= 3 && x <= 9 && y >= 10 && y <= 90 && y % 10 === 0) {
                const total_shmurdik_weight = one_z_weight * k;
                shmurdik_weight_kg = total_shmurdik_weight / n;
                break;
            }
        }

        const hero1_index = getRandomInt(0, heroes.length - 1);
        let hero2_index;
        do { hero2_index = getRandomInt(0, heroes.length - 1); } while (hero1_index === hero2_index);
        hero1 = heroes[hero1_index];
        hero2 = heroes[hero2_index];
        
        const hero1_word = declineNoun(n, hero1.one, hero1.two, hero1.five);
        const hero2_word_k = declineNoun(k, hero2.one, hero2.two, hero2.five);
        const hero2_word_m = declineNoun(m, hero2.one, hero2.two, hero2.five);
        const problemText = `${n} ${hero1_word} весят как ${k} ${hero2_word_k}, а ${m} ${hero2_word_m} весят ${x} т ${y} кг. Сколько весит один ${hero1.one}?`;

        return {
            variables: { answer: shmurdik_weight_kg },
            problemText: problemText + "<br><br><em>Ответ дайте в килограммах. Запишите только число.</em>"
        };
    },
    
    calculateAnswer: function(vars) {
        return `${vars.answer} кг`;
    }
},

{
    type: " ",
    name: "4units11",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => { /*...*/ };
        const declineNoun = (number, one, two, five) => { /*...*/ };
        let n, k, m, moose_calf_weight_g, goat_kid_weight_g, m1, n1, p1;

        while (true) {
            n = getRandomInt(4, 5);
            k = getRandomInt(4, 9);
            do { m = getRandomInt(4, 5); } while (m === n);
            moose_calf_weight_g = getRandomInt(20, 100) * 1000;
            goat_kid_weight_g = getRandomInt(31, 39) * 100;
            const total_weight_g = n * moose_calf_weight_g + k * goat_kid_weight_g;
            m1 = Math.floor(total_weight_g / 100000);
            let remainder = total_weight_g % 100000;
            n1 = Math.floor(remainder / 1000);
            p1 = remainder % 1000;
            if (m1 > 0 && n1 > 0 && p1 > 0) break;
        }

        const m2 = (m * moose_calf_weight_g) / 1000;
        const mooseCalfWord = declineNoun(n, 'лосёнок', 'лосёнка', 'лосят');
        const goatKidWord = declineNoun(k, 'козлёнок', 'козлёнка', 'козлят');
        const mooseCalfWordM = declineNoun(m, 'лосёнок', 'лосёнка', 'лосят');
        const problemText = `${n} ${mooseCalfWord} и ${k} ${goatKidWord} весят ${m1} ц ${n1} кг ${p1} г, а ${m} таких же ${mooseCalfWordM} весят ${m2} кг. Сколько весит один козлёнок?`;
        const answerInGrams = goat_kid_weight_g;

        return {
            variables: { answer: answerInGrams },
            problemText: problemText + "<br><br><em>Ответ дайте в граммах. Запишите только число.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} г`;
    }
},

//  Текстовые задачи. Перевод единиц длины

{
    type: " ",
    name: "4units29",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "умножение_на_многозначное", "деление_на_многозначное",  "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
        const humanNames = [
    { nominative: "Маша", genitive: "Маши" },
    { nominative: "Даша", genitive: "Даши" },
    { nominative: "Катя", genitive: "Кати" },
    { nominative: "Ева", genitive: "Евы" },
    { nominative: "Алина", genitive: "Алины" }
];
        const dogNames = [
    { nominative: "Фанни" },
    { nominative: "Мокко" },
    { nominative: "Молли" },
    { nominative: "Фиби" },
    { nominative: "Джиджи" }
];

        let n1, n2, n3, n4, human_step_mm, total_distance_mm;
        let humanName = getRandomElement(humanNames);
        let dogName = getRandomElement(dogNames);

        while (true) {
            // 1. Генерируем базовые параметры
            n1 = getRandomElement([5, 6, 7, 8]); // дм
            n2 = getRandomElement([1, 2, 3, 4, 5, 6, 7, 8, 9]); // см
            n3 = getRandomElement([60, 70, 80, 90]); // шаг собаки в мм (теперь кратно 10)
            n4 = getRandomInt(500, 800); // кол-во шагов человека

            // 2. Считаем шаг человека и общую дистанцию
            human_step_mm = (n1 * 100) + (n2 * 10);
            total_distance_mm = human_step_mm * n4;

            // 3. Проверяем, делится ли дистанция на шаг собаки.
            if (total_distance_mm % n3 === 0) {
                break; // Если делится, числа подходят
            }
        }
        
        const answer = total_distance_mm / n3;

        const problemText = `Длина шага ${humanName.genitive} — ${n1} дм ${n2} см, а длина шажочка её чихуахуа ${dogName.nominative} — ${n3} мм. Сколько шажочков сделает ${dogName.nominative} во время прогулки, если шагомер ${humanName.genitive} покажет ${n4} шагов?`;

        return {
            variables: { answer: answer },
            problemText: problemText
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} шажочков`;
    }
},

{
    type: " ",
    name: "4units27",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        // --- Вспомогательные функции ---
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const getRandomElement = (arr) => {
            return arr[getRandomInt(0, arr.length - 1)];
        };
        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        // --- 1. База данных имён со всеми нужными падежами ---
        const names = [
            { nominative: "Вася", genitive: "Васи", dative: "Васе" },
            { nominative: "Миша", genitive: "Миши", dative: "Мише" },
            { nominative: "Дима", genitive: "Димы", dative: "Диме" },
            { nominative: "Денис", genitive: "Дениса", dative: "Денису" },
            { nominative: "Даня", genitive: "Дани", dative: "Дане" }
        ];
        
        // --- 2. Конструктивный подбор переменных (общий для обоих вариантов) ---
        const n1 = getRandomInt(1, 4);
        const n2 = getRandomInt(1, 9);
        const n3 = getRandomInt(1, 9);
        const initial_length_cm = n1 * 100 + n2 * 10 + n3;

        const valid_cuts = [];
        const max_total_cut_cm = initial_length_cm - 51;

        for (let n4_option = 2; n4_option <= 4; n4_option++) {
            for (let n5_option = 1; n5_option <= 5; n5_option++) {
                const total_cut_cm = n4_option * (n5_option * 10);
                if (total_cut_cm <= max_total_cut_cm) {
                    valid_cuts.push({ n4: n4_option, n5: n5_option });
                }
            }
        }
        
        const chosen_cut = getRandomElement(valid_cuts);
        const n4 = chosen_cut.n4;
        const n5 = chosen_cut.n5;

        const n6 = getRandomInt(11, 19);
        const name1 = getRandomElement(names);

        // --- 3. Выбор варианта и вычисление ответа ---
        const isLongerVariation = Math.random() < 0.5; // Случайный выбор
        
        const total_cut_cm = n4 * (n5 * 10);
        const final_length_cm = initial_length_cm - total_cut_cm;
        
        let answer;
        let variation_text;

        if (isLongerVariation) {
            // Вариант "доска оказалась ДЛИННЕЕ"
            variation_text = "длиннее";
            answer = final_length_cm - n6;
        } else {
            // Вариант "доска оказалась КОРОЧЕ"
            variation_text = "короче";
            answer = final_length_cm + n6;
        }

        // --- 4. Формируем текст задачи ---
        const times_word = declineNoun(n4, 'раз', 'раза', 'раз');
        
        const problemText = `У ${name1.genitive} была доска длиной ${n1} м ${n2} дм ${n3} см, которую ему нужно было укоротить до нужной длины. Для этого он ${n4} ${times_word} отрезал от доски по ${n5} дм, и в результате доска оказалась на ${n6} см ${variation_text}, чем нужно. Найдите длину доски, которая была нужна ${name1.dative}.`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Ответ дайте в сантиметрах. Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} см`;
    }
},

{
    type: " ",
    name: "4units20",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "деление_на_многозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const declineNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) { return five; }
            n %= 10;
            if (n === 1) { return one; }
            if (n >= 2 && n <= 4) { return two; }
            return five;
        };

        // --- 1. Расширенная база данных деревьев ---
        const trees = [
            { name: 'Сосна', name_genitive: 'сосне', gender: 'f', stage1_years: 10, stage1_growth: 20, stage2_years: 40, stage2_growth: 50, stage3_growth: 5 },
            { name: 'Берёза', name_genitive: 'берёзе', gender: 'f', stage1_years: 5, stage1_growth: 60, stage2_years: 25, stage2_growth: 80, stage3_growth: 10 },
            { name: 'Дуб', name_genitive: 'дубу', gender: 'm', stage1_years: 15, stage1_growth: 10, stage2_years: 50, stage2_growth: 40, stage3_growth: 2 },
            { name: 'Клён', name_genitive: 'клёну', gender: 'm', stage1_years: 8, stage1_growth: 50, stage2_years: 30, stage2_growth: 70, stage3_growth: 10 },
            { name: 'Ель', name_genitive: 'ели', gender: 'f', stage1_years: 10, stage1_growth: 10, stage2_years: 40, stage2_growth: 40, stage3_growth: 5 },
            { name: 'Липа', name_genitive: 'липе', gender: 'f', stage1_years: 10, stage1_growth: 40, stage2_years: 40, stage2_growth: 60, stage3_growth: 8 }
        ];

        let target_age;
        do {
            target_age = getRandomInt(15, 30);
        } while (target_age === 20);

        const tree = trees[getRandomInt(0, trees.length - 1)];
        const pronoun = tree.gender === 'm' ? 'его' : 'её';

        // --- РАСЧЁТ ВЫСОТЫ ---
        let total_height_cm = 0;
        const height_stage1 = tree.stage1_years * tree.stage1_growth;

        if (target_age <= tree.stage1_years) {
            total_height_cm = target_age * tree.stage1_growth;
        } else if (target_age <= tree.stage2_years) {
            const years_in_stage2 = target_age - tree.stage1_years;
            const height_stage2 = years_in_stage2 * tree.stage2_growth;
            total_height_cm = height_stage1 + height_stage2;
        } else {
            const height_stage2 = (tree.stage2_years - tree.stage1_years) * tree.stage2_growth;
            const years_in_stage3 = target_age - tree.stage2_years;
            const height_stage3 = years_in_stage3 * tree.stage3_growth;
            total_height_cm = height_stage1 + height_stage2 + height_stage3;
        }
        
        // --- ИСПРАВЛЕНО: Формирование текста высоты без нулей ---
        let height_text;
        const m = Math.floor(total_height_cm / 100);
        const cm = total_height_cm % 100;

        if (cm === 0) {
            // Если сантиметров 0, пишем только метры
            height_text = `${m} м`;
        } else {
            // Иначе проверяем, можно ли записать в дм
            const isDmPossible = (cm % 10 === 0);
            const useDmFormat = (isDmPossible && Math.random() < 0.5);

            if (useDmFormat) {
                const dm = cm / 10;
                height_text = `${m} м ${dm} дм`;
            } else {
                height_text = `${m} м ${cm} см`;
            }
        }
        
        const problemText = `${tree.name} в первые ${tree.stage1_years} лет своей жизни растёт на ${tree.stage1_growth} см в год; в период от ${tree.stage1_years} до ${tree.stage2_years} лет — на ${tree.stage2_growth} см в год; после ${tree.stage2_years} лет ${pronoun} рост практически останавливается и составляет ${tree.stage3_growth} см в год.
<br>Сколько лет ${tree.name_genitive}, если ${pronoun} высота ${height_text}?`;

        return {
            variables: { answer: target_age },
            problemText: problemText + "<br><br><em>Запишите только число</em>"
        };
    },

    calculateAnswer: function(vars) {
        const age_word = this.declineNoun ? this.declineNoun(vars.answer, 'год', 'года', 'лет') : 'лет';
        return `${vars.answer} ${age_word}`;
    }
},


{
    type: " ",
    name: "4units17",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "деление_на_многозначное", "умножение_на_многозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let total_height_cm, step_height1_cm, step_height2_cm, step_count1, step_count2;

        // --- Цикл для подбора чисел, удовлетворяющих всем условиям ---
        while(true) {
            // 1. Генерируем две разные высоты ступенек (в см) от 15 до 25 см
            step_height1_cm = getRandomInt(15, 25);
            do {
                step_height2_cm = getRandomInt(15, 25);
            } while (step_height1_cm === step_height2_cm);

            // Проверяем, что высоты ступенек не кратны 10
            if (step_height1_cm % 10 === 0 || step_height2_cm % 10 === 0) continue;

            // 2. Находим общую высоту, которая делится на обе высоты ступенек
            // Для этого ищем наименьшее общее кратное (НОК) и умножаем на случайный коэфф.
            let a = step_height1_cm, b = step_height2_cm;
            let gcd = 1;
            for (let i = 1; i <= a && i <= b; i++) {
                if (a % i === 0 && b % i === 0) gcd = i;
            }
            const lcm = (a * b) / gcd; // НОК
            
            // 3. Генерируем общую высоту лестницы от 50 до 75 м (5000-7500 см)
            // Умножаем НОК на такое число, чтобы попасть в нужный диапазон
            const min_multiplier = Math.ceil(5000 / lcm);
            const max_multiplier = Math.floor(7500 / lcm);
            
            if (min_multiplier > max_multiplier) continue; // Не удалось найти высоту в диапазоне, повторяем
            
            total_height_cm = lcm * getRandomInt(min_multiplier, max_multiplier);

            // 4. Считаем количество ступенек для каждого случая
            step_count1 = total_height_cm / step_height1_cm;
            step_count2 = total_height_cm / step_height2_cm;

            // Проверяем, что количество ступенек не кратно 10
            if (step_count1 % 10 === 0) continue;

            // Если все проверки пройдены, выходим
            break;
        }

        // --- Форматируем данные для текста задачи ---
        
        // Вторая высота ступеньки в дм и см
        const step_height2_dm = Math.floor(step_height2_cm / 10);
        const step_height2_cm_part = step_height2_cm % 10;
        const step_height2_text = `${step_height2_dm} дм ${step_height2_cm_part} см`;

        // --- Составляем текст задачи ---
        
        const problemText = `Нужно сделать пожарную лестницу, по которой можно подняться на крышу дома. Если высота ступеньки будет ${step_height1_cm} см, потребуется ${step_count1} ступенек. Сколько ступенек будет в лестнице, если высота одной ступеньки ${step_height2_text}?`;
        
        const answer = step_count2;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return vars.answer;
    }
},


{
    type: " ",
    name: "4units15",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // --- 1. База данных имен с падежами и ПОЛОМ ---
        const names = [
            { name: "Витя", name_genitive: "Вити", gender: "m" },
            { name: "Маша", name_genitive: "Маши", gender: "f" },
            { name: "Андрей", name_genitive: "Андрея", gender: "m" },
            { name: "Аня", name_genitive: "Ани", gender: "f" },
            { name: "Коля", name_genitive: "Коли", gender: "m" },
            { name: "Оля", name_genitive: "Оли", gender: "f" },
            { name: "Петя", name_genitive: "Пети", gender: "m" },
            { name: "Лена", name_genitive: "Лены", gender: "f" },
            { name: "Саша", name_genitive: "Саши", gender: "m" }, // Саша - унисекс, но для простоты пусть будет м.
            { name: "Ира", name_genitive: "Иры", gender: "f" }
        ];

        let p1, p2, p3, p4;
        let p1_h, p2_h, p3_h, p4_h;
        let text_p1, text_p2, text_p3;
        let question, answer;

        while(true) {
            const shuffledNames = names.sort(() => 0.5 - Math.random());
            [p1, p2, p3, p4] = shuffledNames.slice(0, 4);

            p1_h = getRandomInt(135, 155); 
            
            const diff1_val = getRandomInt(1, 3);
            const diff1_cm = diff1_val * 10;
            const is_shorter1 = Math.random() < 0.5;
            p2_h = is_shorter1 ? p1_h + diff1_cm : p1_h - diff1_cm;
            
            // --- ИЗМЕНЕНИЕ ЗДЕСЬ: более естественная фраза ---
            const p1_pronoun = p1.gender === 'm' ? 'он' : 'она';
            text_p1 = `, и ${p1_pronoun} на ${diff1_val} дм ${is_shorter1 ? 'ниже' : 'выше'} ${p2.name_genitive}.`;

            const diff2_val = getRandomInt(3, 9);
            const is_shorter2 = Math.random() < 0.5;
            p3_h = is_shorter2 ? p2_h + diff2_val : p2_h - diff2_val;
            text_p2 = `${p2.name} ${is_shorter2 ? 'ниже' : 'выше'} ${p3.name_genitive} на ${diff2_val} см`;

            const diff3_val = getRandomInt(2, 4);
            const diff3_cm = diff3_val * 10;
            const is_shorter3 = Math.random() < 0.5;
            p4_h = is_shorter3 ? p3_h + diff3_cm : p3_h - diff3_cm;
            text_p3 = `и на ${diff3_val} дм ${is_shorter3 ? 'ниже' : 'выше'} ${p4.name_genitive}.`;
            
            answer = Math.abs(p4_h - p1_h);
            const all_heights = [p1_h, p2_h, p3_h, p4_h];

            if (answer > 0 && all_heights.every(h => h >= 120 && h <= 170)) {
                question = `На сколько см ${p4.name} ${p4_h > p1_h ? 'выше' : 'ниже'} ${p1.name_genitive}?`;
                break;
            }
        }

        const p1_m = Math.floor(p1_h / 100);
        const p1_cm = p1_h % 100;
        
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ: улучшенная структура предложения ---
        const sentence2 = `${text_p2.charAt(0).toUpperCase() + text_p2.slice(1)} ${text_p3}`;
        const problemText = `Рост ${p1.name_genitive} — ${p1_m} м ${p1_cm} см${text_p1} ${sentence2} ${question}`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Ответ дайте в сантиметрах. Запишите только число.</em>"
        };
    },

    calculateAnswer: function(vars) {
        return `${vars.answer} см`;
    }
},

{
    type: " ",
    name: "4units14",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "умножение_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const rivers = ["Вайнганга", "Ганг", "Ямуна", "Годавари", "Кришна", "Брахмапутра"];
        let riverName, python_length_cm, n1, n2, diff_m, is_enough, river_width_cm, dialogue_part2;

        while (true) {
            const python_m = getRandomInt(3, 5);
            const python_cm_part = getRandomInt(1, 9) * 10;
            python_length_cm = python_m * 100 + python_cm_part;
            n1 = getRandomInt(2, 5) * 50;
            n2 = n1 + 50;
            diff_m = getRandomInt(5, 25);
            is_enough = Math.random() < 0.5;
            const total_len1 = n1 * python_length_cm;
            const total_len2 = n2 * python_length_cm;

            if (is_enough) {
                river_width_cm = total_len2 - (diff_m * 100);
                if (river_width_cm > total_len1) {
                    dialogue_part2 = `Хватит, это даже на ${diff_m} метров больше.`;
                    break;
                }
            } else {
                river_width_cm = total_len2 + (diff_m * 100);
                dialogue_part2 = `Нет, всё ещё ${diff_m} метров не хватит.`;
                break;
            }
        }

        riverName = rivers[getRandomInt(0, rivers.length - 1)];
        const python_m_part = Math.floor(python_length_cm / 100);
        const python_cm_part_final = python_length_cm % 100;
        const python_length_text = `${python_m_part} м ${python_cm_part_final} см`;

        const problemText = `— Даже ${n1} таких питонов, как я, не хватит, чтобы протянуть мост между берегами реки ${riverName}, Маугли.
<br>— А ${n2} хватит?
<br>— ${dialogue_part2}
<br><br>
Какой ширины река ${riverName}, если длина питона ${python_length_text}?`;

        const answerInMeters = river_width_cm / 100;

        return {
            variables: { answer: answerInMeters },
            problemText: problemText + "<br><br><em>Ответ дайте в метрах. Запишите только число.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return `${vars.answer} м`;
    }
},

{
    type: " ",
    name: "4units12",
    tags: ["4_класс", "перевод_единиц", "единицы_длины", "сложение_многозначных", "вычитание_многозначных", "деление_на_однозначное", "текстовая_задача"],
    generate: function() {
        const getRandomInt = (min, max) => { /*...*/ };
        const mountains = [ /*...*/ ];
        const selectedMountain = mountains[getRandomInt(0, mountains.length - 1)];
        const mountainName = selectedMountain.name;
        const heightInMeters = selectedMountain.height;
        let crawlInMeters;
        while (true) {
            crawlInMeters = getRandomInt(4, 12); 
            if ((heightInMeters * 2) % crawlInMeters === 0) break;
        }
        const units = [ /*...*/ ];
        const heightUnit = units[getRandomInt(0, 2)];
        const crawlUnit = units[getRandomInt(2, 3)];
        const N = heightInMeters * heightUnit.multiplier;
        const M = crawlInMeters * crawlUnit.multiplier;
        const answer = (heightInMeters * 2) / crawlInMeters;
        const problemText = `Улитка ползёт на гору ${mountainName} высотой ${N} ${heightUnit.name}, начав свой путь от подножия. За день она проползает ${M} ${crawlUnit.name}. Через сколько дней улитка доберётся до вершины и спустится обратно?`;

        return {
            variables: { answer: answer },
            problemText: problemText + "<br><br><em>Запишите только число.</em>"
        };
    },
    calculateAnswer: function(vars) {
        return vars.answer;
    }
},

// Сложение и вычитание именованных величин. Единицы измерения длины

{
	type: " ",
	name: "4units10",
	tags: ["4_класс", "перевод_единиц", "единицы_длины", "вычитание_многозначных", "сложение_многозначных"],
	
	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		// 1. Генерируем числа для слагаемых.
		const n1_options = [10, 20, 30, 40, 50, 60, 70, 80, 90];
		const n1 = n1_options[getRandomInt(0, n1_options.length - 1)];

		const n2 = getRandomInt(1, 9);
		
		// n3 кратно 10, в диапазоне (1000, 10000) --> [1010, 9990]
		const n3 = getRandomInt(101, 999) * 10;
		
		// 2. Вычисляем сумму в миллиметрах.
		const summand_mm = n1 * 1000 + n2 * 10 + n3 * 10;

		// 3. Определяем допустимый диапазон для n4.
		const n4_max = Math.floor((summand_mm - 1) / 1000) * 1000;
		const final_n4_max = Math.min(99000, n4_max);

		// Генерируем n4
		const n4_multiplier = getRandomInt(11, final_n4_max / 1000);
		const n4 = n4_multiplier * 1000;

		// 4. Вычисляем итоговый ответ.
		const answerInMm = summand_mm - n4;

		// 5. Формируем текст задачи.
		const problemText = `Вычислите:<br><br>${n1} м ${n2} см + ${n3} см - ${n4} мм`;
		
		return {
			variables: { answer: answerInMm },
			// Обновил подсказку, добавив дм в список примеров
			problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (км, м, дм, см, мм). Если какая-то из них равна нулю, не записывайте её (например, 4 м 5 см - здесь 0 дм указывать не нужно)</em>"
		};
	},

	calculateAnswer: function(vars) {
		// Принимаем, что vars.answer - это целое число в миллиметрах.
		const totalMm = vars.answer;
		
		// 1. Километры (1 км = 1 000 000 мм)
		const kilometers = Math.floor(totalMm / 1000000);
		const mmAfterKm = totalMm % 1000000;
		
		// 2. Метры (1 м = 1000 мм)
		const meters = Math.floor(mmAfterKm / 1000);
		const mmAfterM = mmAfterKm % 1000;
		
		// 3. Дециметры (1 дм = 100 мм) — ДОБАВЛЕНО
		const decimeters = Math.floor(mmAfterM / 100);
		const mmAfterDm = mmAfterM % 100;

		// 4. Сантиметры (1 см = 10 мм)
		const centimeters = Math.floor(mmAfterDm / 10);
		
		// 5. Миллиметры (остаток)
		const millimeters = mmAfterDm % 10;

		// Собираем строку ответа
		const answerParts = [];

		if (kilometers > 0) {
			answerParts.push(`${kilometers} км`);
		}
		if (meters > 0) {
			answerParts.push(`${meters} м`);
		}
		if (decimeters > 0) {
			answerParts.push(`${decimeters} дм`);
		}
		if (centimeters > 0) {
			answerParts.push(`${centimeters} см`);
		}
		if (millimeters > 0) {
			answerParts.push(`${millimeters} мм`);
		}
		
		if (answerParts.length === 0) {
			 return "0 мм";
		}

		return answerParts.join(' ');
	}
},

{
	type: " ",
	name: "4units9",
	tags: ["4_класс", "перевод_единиц", "единицы_длины", "вычитание_многозначных", "сложение_многозначных"],
	
	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		
		const getRandomIntNotMultipleOf10 = (min, max) => {
			let num;
			do {
				num = getRandomInt(min, max);
			} while (num % 10 === 0);
			return num;
		};

		// 1. Генерируем переменные согласно их правилам.
		// 1000 < n1 < 5000 --> [1001, 4999]
		const n1 = getRandomIntNotMultipleOf10(1001, 4999);

		const n2 = getRandomInt(1, 9);
		const n3 = getRandomInt(1, 9);
		const n4 = getRandomInt(1, 9);

		// 10 < n5 < 99 --> [11, 98]
		const n5 = getRandomInt(11, 98);

		// 2. Для точности вычислений переводим всё в миллиметры.
		const val1_mm = n1 * 10;
		const val2_mm = n2 * 100 + n3;
		const val3_mm = n4 * 10 + n5;
		
		const answerInMm = val1_mm + val2_mm - val3_mm;

		// 3. Формируем текст задачи с требуемой инструкцией.
		const problemText = `Вычислите:<br><br>${n1} см + ${n2} дм ${n3} мм - ${n4} см ${n5} мм`;
		
		return {
			variables: { answer: answerInMm },
            // Исправил подсказку: добавил дм
			problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (км, м, дм, см, мм). Если какая-то из них равна нулю, не записывайте её (например, 4 м 5 см - здесь 0 дм указывать не нужно)</em>"
		};
	},

	calculateAnswer: function(vars) {
		// Принимаем, что vars.answer - это целое число в миллиметрах.
		const totalMm = vars.answer;
		
		// 1. Километры (1 км = 1 000 000 мм)
		const kilometers = Math.floor(totalMm / 1000000); 
		const mmAfterKm = totalMm % 1000000;
		
		// 2. Метры (1 м = 1000 мм)
		const meters = Math.floor(mmAfterKm / 1000);      
		const mmAfterM = mmAfterKm % 1000;

        // 3. Дециметры (1 дм = 100 мм) — ДОБАВЛЕНО
        const decimeters = Math.floor(mmAfterM / 100);
        const mmAfterDm = mmAfterM % 100;
		
        // 4. Сантиметры (1 см = 10 мм)
		const centimeters = Math.floor(mmAfterDm / 10);    
		
        // 5. Миллиметры
        const millimeters = mmAfterDm % 10;               

		// Собираем строку ответа.
		const answerParts = [];

		if (kilometers > 0) {
			answerParts.push(`${kilometers} км`);
		}
		if (meters > 0) {
			answerParts.push(`${meters} м`);
		}
        // Добавляем дм в ответ
        if (decimeters > 0) {
			answerParts.push(`${decimeters} дм`);
		}
		if (centimeters > 0) {
			answerParts.push(`${centimeters} см`);
		}
		if (millimeters > 0) {
			answerParts.push(`${millimeters} мм`);
		}
		
		// Если ответ равен 0, возвращаем "0 мм".
		if (answerParts.length === 0) {
			 return "0 мм";
		}

		return answerParts.join(' ');
	}
},

{
	type: " ",
	name: "4units8",
	tags: ["4_класс", "перевод_единиц", "единицы_длины", "вычитание_многозначных"],
	
	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		
		const getRandomIntNotMultipleOf10 = (min, max) => {
			let num;
			do {
				num = getRandomInt(min, max);
			} while (num % 10 === 0);
			return num;
		};

		// 1. Генерируем переменные согласно их правилам
		// n1 кратно 10, в диапазоне (100, 999). Это числа 110, 120...990.
		const n1 = getRandomInt(11, 99) * 10;

		const n2 = getRandomInt(1, 9);
		const n5 = getRandomInt(1, 9);

		// n3 не кратно 10, в диапазоне (1000, 9999).
		const n3 = getRandomIntNotMultipleOf10(1001, 9998);
		
		const n4_options = [10, 20, 30, 40, 50, 60, 70, 80, 90];
		const n4 = n4_options[getRandomInt(0, n4_options.length - 1)];

		// 2. Для точности вычислений переводим всё в миллиметры.
		const minuend_mm = n1 * 100 + n2 * 10;
		const subtrahend_mm = n3 + n4 * 10 + n5;
		const answerInMm = minuend_mm - subtrahend_mm;

		// 3. Формируем текст задачи с требуемой инструкцией.
		const problemText = `Вычислите:<br><br>${n1} дм ${n2} см - ${n3} мм - ${n4} см ${n5} мм`;
		
		return {
			variables: { answer: answerInMm },
            // Добавил 'дм' в подсказку
			problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (км, м, дм, см, мм). Если какая-то из них равна нулю, не записывайте её (например, 4 м 5 см - здесь 0 дм указывать не нужно)</em>"
		};
	},

	calculateAnswer: function(vars) {
		// Принимаем, что vars.answer - это целое число в миллиметрах.
		const totalMm = vars.answer;
		
		// 1. Километры (1 км = 1 000 000 мм)
		const kilometers = Math.floor(totalMm / 1000000); 
		const mmAfterKm = totalMm % 1000000;
		
		// 2. Метры (1 м = 1000 мм)
		const meters = Math.floor(mmAfterKm / 1000);
		const mmAfterM = mmAfterKm % 1000;

        // 3. Дециметры (1 дм = 100 мм) — ДОБАВЛЕНО
        const decimeters = Math.floor(mmAfterM / 100);
        const mmAfterDm = mmAfterM % 100;
		
		// 4. Сантиметры (1 см = 10 мм)
		const centimeters = Math.floor(mmAfterDm / 10);
		
        // 5. Миллиметры
        const millimeters = mmAfterDm % 10; 

		// Собираем строку ответа.
		const answerParts = [];

		if (kilometers > 0) {
			answerParts.push(`${kilometers} км`);
		}
		if (meters > 0) {
			answerParts.push(`${meters} м`);
		}
        if (decimeters > 0) {
			answerParts.push(`${decimeters} дм`);
		}
		if (centimeters > 0) {
			answerParts.push(`${centimeters} см`);
		}
		if (millimeters > 0) {
			answerParts.push(`${millimeters} мм`);
		}
		
		// Если ответ равен 0, возвращаем "0 мм".
		if (answerParts.length === 0) {
			 return "0 мм";
		}

		return answerParts.join(' ');
	}
},

{
	type: " ",
	name: "4units7",
	tags: ["4_класс", "перевод_единиц", "единицы_длины", "вычитание_многозначных", "сложение_многозначных"],
	
	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		
		const getRandomIntNotMultipleOf10 = (min, max) => {
			let num;
			do {
				num = getRandomInt(min, max);
			} while (num % 10 === 0);
			return num;
		};

		const n1 = getRandomInt(11, 98);
		
		let n2;
		do {
			n2 = getRandomInt(11, 98);
		} while (n2 === n1);

		const n3 = getRandomInt(101, 999) * 100;

		const n4 = getRandomIntNotMultipleOf10(51, 98);
		
		// Все переводим в дециметры для расчета
		const val1_dm = (n1 * 1000 + n2) * 10;
		const val2_dm = n3;
		const val3_dm = n4 * 10;
		
		const answerInDm = val1_dm - val2_dm + val3_dm;

		const problemText = `Вычислите:<br><br>${n1} км ${n2} м - ${n3} дм + ${n4} м`;
		
		return {
			variables: { answer: answerInDm },
            // Добавил 'дм' в список
			problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (км, м, дм, см, мм). Если какая-то из них равна нулю, не записывайте её (например, 4 м 5 см - здесь 0 дм указывать не нужно)</em>"
		};
	},

	calculateAnswer: function(vars) {
		// Принимаем, что vars.answer - это целое число в ДЕЦИМЕТРАХ.
		const totalDm = vars.answer;
		
		// 1. Километры (1 км = 10 000 дм)
		const kilometers = Math.floor(totalDm / 10000); 
		const dmAfterKm = totalDm % 10000;
		
		// 2. Метры (1 м = 10 дм)
		const meters = Math.floor(dmAfterKm / 10);     
		
        // 3. Дециметры (остаток)
        const decimeters = dmAfterKm % 10;             

        // Сантиметры и миллиметры равны 0, так как мы считали в целых дециметрах

		// Собираем строку ответа.
		const answerParts = [];

		if (kilometers > 0) {
			answerParts.push(`${kilometers} км`);
		}
		if (meters > 0) {
			answerParts.push(`${meters} м`);
		}
        // Возвращаем нормальный вывод дм
        if (decimeters > 0) {
			answerParts.push(`${decimeters} дм`);
		}
		
		// Если ответ равен 0, возвращаем "0 дм".
		if (answerParts.length === 0) {
			 return "0 дм";
		}

		return answerParts.join(' ');
	}
},

{
	type: " ",
	name: "4units6",
	tags: ["4_класс", "перевод_единиц", "единицы_длины", "вычитание_многозначных", "сложение_многозначных"],
	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		
		const getRandomIntNotMultipleOf10 = (min, max) => {
			let num;
			do {
				num = getRandomInt(min, max);
			} while (num % 10 === 0);
			return num;
		};

		const n1 = getRandomInt(3, 9);
		const n2 = getRandomInt(3, 9);
		const n3 = getRandomInt(3, 9);

		const n4 = getRandomInt(11, 99) * 100;

		const n5 = getRandomIntNotMultipleOf10(101, 999);
		
		const val1_cm = (n1 * 1000 + n2) * 100;
		const val2_cm = n3 * 100 + n4;
		const val3_cm = n5 * 100;
		
		const answerInCm = val1_cm - val2_cm + val3_cm;

		const problemText = `Вычислите:<br><br>${n1} км ${n2} м - (${n3} м + ${n4} см) + ${n5} м`;
		
		return {
			variables: { answer: answerInCm },
			problemText: problemText + "<br><br><em>Ответ запишите, выделив единицы измерения (км, м, см, мм). Если какая-то из них равна нулю, не записывайте её.</em>"
		};
	},

	// -------- ОБНОВЛЕННАЯ ФУНКЦИЯ ПРОВЕРКИ ОТВЕТА (БЕЗ ДМ) --------
	calculateAnswer: function(vars) {
		// Принимаем, что vars.answer - это целое число в сантиметрах.
		const totalCm = vars.answer;
		
		// 1. Раскладываем ответ, пропуская дециметры.
		const kilometers = Math.floor(totalCm / 100000); // 1 км = 100 000 см
		const cmAfterKm = totalCm % 100000;
		
		const meters = Math.floor(cmAfterKm / 100);      // 1 м = 100 см
		const centimeters = cmAfterKm % 100;              // Все, что осталось после метров - это сантиметры.

		// Так как исходное число - целое количество сантиметров, мм будут равны нулю.
		const millimeters = 0;

		// 2. Собираем строку ответа.
		const answerParts = [];

		if (kilometers > 0) {
			answerParts.push(`${kilometers} км`);
		}
		if (meters > 0) {
			answerParts.push(`${meters} м`);
		}
		// Строка для дециметров (дм) пропущена.
		if (centimeters > 0) {
			answerParts.push(`${centimeters} см`);
		}
		if (millimeters > 0) {
			answerParts.push(`${millimeters} мм`);
		}
		
		// 3. Если ответ равен 0, возвращаем "0 см".
		if (answerParts.length === 0) {
			 return "0 см";
		}

		return answerParts.join(' ');
	}
},

// Сложение и вычитание именованных величин. Единицы измерения массы

{
    type: " ",
    name: "4units5",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "вычитание_многозначных", "сложение_многозначных"],
    
    generate: function() {
        // ... (код генерации остаётся без изменений)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomIntNotMultipleOf = (min, max, multiple) => {
            let num;
            do {
                num = getRandomInt(min, max);
            } while (num % multiple === 0);
            return num;
        };
        const n1 = getRandomIntNotMultipleOf(101, 998, 10);
        const n2 = getRandomInt(2, 9);
        const n4 = getRandomInt(2, 9);
        const n3 = getRandomIntNotMultipleOf(11, 99, 10);
        const n5 = getRandomIntNotMultipleOf(101, 999, 100);
        const answerInKg = (n1 * 100) + (n2 * 1000 + n3) - (n4 * 100 + n5);
        const problemText = `Вычислите:<br><br>${n1} ц + ${n2} т ${n3} кг - (${n4} ц + ${n5} кг)`;
        return {
            variables: { answer: answerInKg },
            problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (т, ц, кг, г). Если какая-то из них равна нулю, не записывайте её (например, 2 т 5 кг - здесь 0 ц указывать не нужно)</em>"
        };
    },

    calculateAnswer: function(vars) {
        const totalKg = vars.answer;
        const tons = Math.floor(totalKg / 1000);
        const kgRemainder1 = totalKg % 1000;
        const centners = Math.floor(kgRemainder1 / 100);
        const kgRemainder2 = kgRemainder1 % 100;
        const kilograms = Math.floor(kgRemainder2);
        const grams = Math.round((kgRemainder2 - kilograms) * 1000);
        const answerParts = [];
        if (tons > 0) { answerParts.push(`${tons} т`); }
        if (centners > 0) { answerParts.push(`${centners} ц`); }
        if (kilograms > 0) { answerParts.push(`${kilograms} кг`); }
        if (grams > 0) { answerParts.push(`${grams} г`); }
        if (answerParts.length === 0) { return "0 кг"; }
        return answerParts.join(' ');
    }
},

{
	type: " ",
	name: "4units4",
	tags: ["4_класс", "перевод_единиц", "единицы_массы", "вычитание_многозначных"],

	generate: function() {
		const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		// 1. Генерируем числа для вычитаемых значений.
		// Ключевой момент: n4 берётся из уменьшенного диапазона [1, 8],
		// чтобы гарантировать, что общая сумма вычитаемого будет меньше 10000 кг.
		const n4 = getRandomInt(1, 8);
		const n2 = getRandomInt(1, 9);
		const n3 = getRandomInt(1, 9);
		const n5 = getRandomInt(1, 9);

		// 2. Вычисляем в килограммах общую сумму, которую нужно вычесть.
		const subtrahend1 = n2 * 100 + n3;      // n2 ц n3 кг
		const subtrahend2 = n4 * 1000 + n5 * 100; // n4 т n5 ц
		const totalSubtraction = subtrahend1 + subtrahend2;

		// 3. Вычисляем допустимый диапазон для финального ответа.
		// Так как n1 = finalAnswer + totalSubtraction, то finalAnswer = n1 - totalSubtraction
		const finalAnswer_min = 10001 - totalSubtraction;
		const finalAnswer_max = 49999 - totalSubtraction;
		
		const finalAnswer = getRandomInt(finalAnswer_min, finalAnswer_max);

		// 4. Теперь вычисляем n1. Он гарантированно попадёт в нужный диапазон.
		const n1 = finalAnswer + totalSubtraction;
		
		const problemText = `Вычислите:<br><br>${n1} кг - ${n2} ц ${n3} кг - ${n4} т ${n5} ц`;

		return {
			variables: { answer: finalAnswer },
			problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (т, ц, кг, г). Если какая-то из них равна нулю, не записывайте её (например, 2 т 5 кг - здесь 0 ц указывать не нужно)</em>"
		};
	},

	calculateAnswer: function(vars) {
		const totalKg = vars.answer;
		const tons = Math.floor(totalKg / 1000);
		const kgRemainder1 = totalKg % 1000;
		const centners = Math.floor(kgRemainder1 / 100);
		const kgRemainder2 = kgRemainder1 % 100;
		const kilograms = Math.floor(kgRemainder2);
		const grams = Math.round((kgRemainder2 - kilograms) * 1000);
		const answerParts = [];
		if (tons > 0) { answerParts.push(`${tons} т`); }
		if (centners > 0) { answerParts.push(`${centners} ц`); }
		if (kilograms > 0) { answerParts.push(`${kilograms} кг`); }
		if (grams > 0) { answerParts.push(`${grams} г`); }
		if (answerParts.length === 0) { return "0 кг"; }
		return answerParts.join(' ');
	}
},

{
    type: " ",
    name: "4units3",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "вычитание_многозначных", "сложение_многозначных"],
    generate: function() {
        // ... (код генерации остаётся без изменений)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const n1 = getRandomInt(3, 9);
        const n4 = getRandomInt(1, 9);
        const n5 = getRandomInt(3, 9);
        const iR_min = Math.max(1, n1 * 100 - 398);
        const iR_max = n1 * 100 - 51;
        const intermediateResult = getRandomInt(iR_min, iR_max);
        const n2_min = 101;
        const n2_max = Math.min(399, 499 - (n1 * 100) + intermediateResult);
        const n2 = getRandomInt(n2_min, n2_max);
        const n3 = (n1 * 100 + n2) - intermediateResult;
        const problemText = `Вычислите:<br><br>${n1} ц + ${n2} кг - ${n3} кг + ${n4} т ${n5} кг`;
        const answerInKg = intermediateResult + (n4 * 1000 + n5);
        return {
            variables: { answer: answerInKg },
            problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (т, ц, кг, г). Если какая-то из них равна нулю, не записывайте её (например, 2 т 5 кг - здесь 0 ц указывать не нужно)</em>"
        };
    },

    calculateAnswer: function(vars) {
        const totalKg = vars.answer;
        const tons = Math.floor(totalKg / 1000);
        const kgRemainder1 = totalKg % 1000;
        const centners = Math.floor(kgRemainder1 / 100);
        const kgRemainder2 = kgRemainder1 % 100;
        const kilograms = Math.floor(kgRemainder2);
        const grams = Math.round((kgRemainder2 - kilograms) * 1000);
        const answerParts = [];
        if (tons > 0) { answerParts.push(`${tons} т`); }
        if (centners > 0) { answerParts.push(`${centners} ц`); }
        if (kilograms > 0) { answerParts.push(`${kilograms} кг`); }
        if (grams > 0) { answerParts.push(`${grams} г`); }
        if (answerParts.length === 0) { return "0 кг"; }
        return answerParts.join(' ');
    }
},

{
    type: " ",
    name: "4units2",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "вычитание_многозначных", "сложение_многозначных"],

    generate: function() {
        // ... (код генерации остаётся без изменений)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomIntNotMultipleOf10 = (min, max) => {
            let num;
            do {
                num = getRandomInt(min, max);
            } while (num % 10 === 0);
            return num;
        };
        const n1 = getRandomInt(3, 9);
        const n2 = getRandomInt(1, 9);
        const n3 = getRandomInt(1, 9);
        const n4_options = [10, 20, 30, 40, 50, 60];
        const n4 = n4_options[getRandomInt(0, n4_options.length - 1)];
        const n5 = getRandomIntNotMultipleOf10(11, 98);
        const n6 = getRandomInt(101, 199);
        const problemText = `Вычислите:<br><br>${n1} ц ${n2} кг + ${n3} т ${n4} ц ${n5} кг - ${n6} кг`;
        const total_kg = (n1 * 100 + n2) + (n3 * 1000 + n4 * 100 + n5) - n6;
        return {
            variables: { answer: total_kg },
            problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (т, ц, кг, г). Если какая-то из них равна нулю, не записывайте её (например, 2 т 5 кг - здесь 0 ц указывать не нужно)</em>"
        };
    },

    calculateAnswer: function(vars) {
        const totalKg = vars.answer;
        const tons = Math.floor(totalKg / 1000);
        const kgRemainder1 = totalKg % 1000;
        const centners = Math.floor(kgRemainder1 / 100);
        const kgRemainder2 = kgRemainder1 % 100;
        const kilograms = Math.floor(kgRemainder2);
        const grams = Math.round((kgRemainder2 - kilograms) * 1000);
        const answerParts = [];
        if (tons > 0) { answerParts.push(`${tons} т`); }
        if (centners > 0) { answerParts.push(`${centners} ц`); }
        if (kilograms > 0) { answerParts.push(`${kilograms} кг`); }
        if (grams > 0) { answerParts.push(`${grams} г`); }
        if (answerParts.length === 0) { return "0 кг"; }
        return answerParts.join(' ');
    }
},

{
    type: " ",
    name: "4units1",
    tags: ["4_класс", "перевод_единиц", "единицы_массы", "вычитание_многозначных", "сложение_многозначных"],
    
    generate: function() {
        // ... (код генерации остаётся без изменений)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomIntNotMultipleOf10 = (min, max) => {
            let num;
            do {
                num = getRandomInt(min, max);
            } while (num % 10 === 0);
            return num;
        };
        let n1, n2, n3, n4, n5;
        let total_kg1, total_kg2;
        do {
            n1 = getRandomInt(3, 9);
            n3 = getRandomInt(3, 9);
            n2 = getRandomIntNotMultipleOf10(11, 89);
            if (n2 >= 97) continue;
            n4 = getRandomIntNotMultipleOf10(n2 + 1, 98);
            n5 = getRandomIntNotMultipleOf10(100, 999);
            total_kg1 = n1 * 1000 + n2;
            total_kg2 = n3 * 100 + n4;
        } while (total_kg1 <= total_kg2);
        const problemText = `Вычислите:<br><br>${n1} т ${n2} кг - ${n3} ц ${n4} кг + ${n5} кг`;
        const answerInKg = total_kg1 - total_kg2 + n5;
        return {
            variables: { answer: answerInKg },
            problemText: problemText + "<br><br><em>Ответ запишите, выделив все единицы измерения (т, ц, кг, г). Если какая-то из них равна нулю, не записывайте её (например, 2 т 5 кг - здесь 0 ц указывать не нужно)</em>"
        };
    },

    calculateAnswer: function(vars) {
        const totalKg = vars.answer;
        const tons = Math.floor(totalKg / 1000);
        const kgRemainder1 = totalKg % 1000;
        const centners = Math.floor(kgRemainder1 / 100);
        const kgRemainder2 = kgRemainder1 % 100;
        const kilograms = Math.floor(kgRemainder2);
        const grams = Math.round((kgRemainder2 - kilograms) * 1000);
        const answerParts = [];
        if (tons > 0) { answerParts.push(`${tons} т`); }
        if (centners > 0) { answerParts.push(`${centners} ц`); }
        if (kilograms > 0) { answerParts.push(`${kilograms} кг`); }
        if (grams > 0) { answerParts.push(`${grams} г`); }
        if (answerParts.length === 0) { return "0 кг"; }
        return answerParts.join(' ');
    }
},

];

window.taskRegistry.push(..._4unitsTasks);
