// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Примеры без скобок",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        count: 3,
        filter: {
            tags: '"4_класс" & "счёт" & "без_скобок" & not ("sparse_nums" | "деление_на_многозначное" | "умножение_на_многозначное")'
        }
    }
];