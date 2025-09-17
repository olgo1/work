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
            tags: {
                include: ["4_класс", "счёт", "sparse_nums"], // ОБЯЗАТЕЛЬНО должны быть эти теги
            }
        }
    }
];
