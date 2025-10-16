// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Числа, в которых много нулей",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        count: 3,
        filter: {
            tags: '"4_класс" & "счёт" & "sparse_nums" & not ("деление_на_многозначное" | "умножение_на_многозначное")'
        }
    }
];