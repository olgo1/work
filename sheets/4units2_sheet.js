// --- ОБЩИE НАСТРОЙКИ ТРЕНАЖЁРА ---
const trainerSettings = {
    title: "Единицы измерения массы и длины",
    subtitle: "текстовые задачи",
    totalTime: 900 // 15 минут
};

// --- ВЫБОРКА ЗАДАЧ ---
const problemSelectors = [
    {
        count: 3,
        filter: {
          t_ags: '"4_класс" & "текстовая_задача" & "перевод_единиц"'
        }
    },
];