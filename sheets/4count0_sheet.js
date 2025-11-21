// sheets/4count0_sheet.js

const trainerSettings = {
    title: "Деление и умножение на однозначные числа. Сложение и вычитание многозначных. Примеры",
    subtitle: "mathnomagic.ru",
    totalTime: 900 
};

// --- 1. Определяем фильтры ---

const f_NoBrackets = {
    tags: '"4_класс" & "счёт" & "без_скобок" & not ("sparse_nums" | "деление_на_многозначное" | "умножение_на_многозначное")'
};

const f_Sparse = {
    tags: '"4_класс" & "счёт" & "sparse_nums" & not ("деление_на_многозначное" | "умножение_на_многозначное")'
};

const f_Brackets = {
    tags: '"4_класс" & "счёт" & "скобки" & not ("sparse_nums" | "деление_на_многозначное" | "умножение_на_многозначное")'
};

// --- 2. Создаем список из 3 задач ---
const list = [
    { count: 1, filter: f_NoBrackets },
    { count: 1, filter: f_Sparse },
    { count: 1, filter: f_Brackets }
];

// --- 3. Перемешиваем эти 3 задачи ---
// Чтобы порядок был случайным (например: скобки -> нули -> без скобок)
for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
}

// --- 4. Готово ---
const problemSelectors = list;
