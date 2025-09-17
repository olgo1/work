// --- ОБЩИЕ НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Счёт",
    subtitle: "Примеры без скобок",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    const problemSelectors = [
    {
        // --- Правило 1: Взять ОДНУ задачу из первой группы ---
        count: 1, 
        filter: {
            // Указываем список номеров. Задача будет выбрана, 
            // если её номер - один из этих трёх.
            number: ["4_count_1", "4_count_2", "4_count_3"]
        }
    }
];

