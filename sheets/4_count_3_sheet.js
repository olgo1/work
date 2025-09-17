// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Примеры со скобками",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        count: 3,
        filter: {
            tags: {
                include: ["4_класс", "счёт", "скобки"], // ОБЯЗАТЕЛЬНО должны быть эти теги
                exclude: ["sparse_nums"]      // ОБЯЗАТЕЛЬНО НЕ должно быть этих тегов
            }
        }
    }
];
