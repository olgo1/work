// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Примеры без скобок",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        count: 10,
        filter: {
            tags: {
                include: ["4_класс", "счёт", "без_скобок"], // ОБЯЗАТЕЛЬНО должны быть эти теги
                exclude: ["sparse_nums"]      // ОБЯЗАТЕЛЬНО НЕ должно быть этих тегов
            }
        }
    }
];

