// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Примеры со скобками",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        // --- Правило 1: Взять ТРИ задачи из группы ---
        count: 3, 
        filter: {
            // Указываем список номеров. Задача будет выбрана, 
            // если её номер - один из этих трёх.
            number: ["4_count_13", "4_count_14", "4_count_15", "4_count_16", "4_count_17", "4_count_18", "4_count_19", "4_count_20", "4_count_21", "4_count_22", "4_count_23", , "4_count_24", , "4_count_25", , "4_count_26"]
        }
    }
];
