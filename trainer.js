document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic loading of sheet and task modules ---
    const params = new URLSearchParams(window.location.search);
    const sheetName = params.get('sheet');

    if (!sheetName) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 40px; font-family: sans-serif;">
                <h1>Тренажёр готов к работе</h1>
                <p>Пожалуйста, укажите лист с заданиями в адресной строке.</p>
                <p>Например: <strong>index.html?sheet=имя_файла_листа</strong></p>
            </div>
        `;
        return;
    }

    // A global registry to collect tasks from different files
    window.taskRegistry = [];

    // 1. Load the specific sheet file
    const sheetScript = document.createElement('script');
    sheetScript.src = `sheets/${sheetName}.js`;
    document.body.appendChild(sheetScript);

    sheetScript.onerror = () => {
        document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл листа "${sheetName}.js" не найден в папке /sheets/!</h1>`;
    };

    sheetScript.onload = () => {
        // 2. Once the sheet is loaded, load the task manifest
        const manifestScript = document.createElement('script');
        manifestScript.src = `tasks/manifest.js`;
        document.body.appendChild(manifestScript);

        manifestScript.onerror = () => {
            document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл manifest.js не найден в папке /tasks/!</h1>`;
        };

        manifestScript.onload = () => {
            // 3. Once manifest is loaded, load all task files it lists
            const loadPromises = window.taskFiles.map(filePath => {
                return new Promise((resolve, reject) => {
                    const taskScript = document.createElement('script');
                    taskScript.src = filePath;
                    taskScript.onload = resolve;
                    taskScript.onerror = reject;
                    document.body.appendChild(taskScript);
                });
            });

            Promise.all(loadPromises)
                .then(() => {
                    // 4. All tasks are loaded, now we can initialize the trainer
                    initializeTrainer(window.taskRegistry);
                })
                .catch(() => {
                    document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Не удалось загрузить один или несколько файлов с задачами, перечисленных в manifest.js.</h1>`;
                });
        };
    };


    // --- Main trainer logic ---
    function initializeTrainer(allTasks) {
        if (typeof trainerSettings === 'undefined' || typeof problemSelectors === 'undefined' || typeof isAnswerCorrect === 'undefined') {
            document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл листа "${sheetName}.js" повреждён или не содержит trainerSettings или problemSelectors.</h1>`;
            return;
        }

        const $ = (sel) => document.querySelector(sel);
        const elements = {
            title: $('#trainer-title'),
            subtitle: $('#trainer-subtitle'),
            timer: $('#timer'),
            problemsContainer: $('#problems-container'),
            rerollBtn: $('#rerollBtn'),
            checkBtn: $('#checkBtn'),
            results: $('#results'),
            scoreText: $('#score-text'),
            printBtn: $('#printBtn'),
        };

        const state = {
            tasks: [],
            timerId: null,
            isFinished: false,
        };

        function formatTime(seconds) {
            const m = String(Math.floor(seconds / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            return `${m}:${s}`;
        }

        // --- ИЗМЕНЁННЫЙ БЛОК ТАЙМЕРА ---
        function startTimer() {
            if (state.timerId) clearInterval(state.timerId); // Очищаем старый таймер
            state.isFinished = false;

            const totalTimeMs = (trainerSettings.totalTime || 600) * 1000;
            const startTime = Date.now();

            elements.timer.textContent = formatTime(totalTimeMs / 1000);

            state.timerId = setInterval(() => {
                if (state.isFinished) {
                    clearInterval(state.timerId);
                    return;
                }
                
                const elapsedTime = Date.now() - startTime;
                const remainingTimeMs = totalTimeMs - elapsedTime;

                if (remainingTimeMs <= 0) {
                    clearInterval(state.timerId);
                    elements.timer.textContent = '00:00';
                    checkAnswers();
                    return;
                }

                // Округляем до ближайшей секунды вверх для отображения
                const remainingSeconds = Math.ceil(remainingTimeMs / 1000);
                elements.timer.textContent = formatTime(remainingSeconds);
                
            }, 250); // Интервал обновления для плавности
        }

        /**
         * New task selection logic based on selectors.
         */
        /**
 /**
 * Обновлённая функция выбора задач с поддержкой include, exclude и ANY для тегов.
 */
// Вставьте этот код в ваш старый trainer.js, полностью заменив старую функцию pickTasks

function pickTasks() {
    // ===== Вспомогательные функции для нового фильтра =====
    function matchesTagsExpr(expr, taskTags = []) {
        if (!expr) return true;
        const tokens = expr.match(/not|[&|\\()]|"[^"]+"/g);
        if (!tokens) return true;
        let i = 0;
        function parseExpression() {
            let node = parseTerm();
            while (i < tokens.length && tokens[i] === '|') {
                i++;
                const right = parseTerm();
                node = node || right;
            }
            return node;
        }
        function parseTerm() {
            let node = parseFactor();
            while (i < tokens.length && (tokens[i] === '&' || tokens[i] === '\\')) {
                const op = tokens[i++];
                const right = parseFactor();
                if (op === '&') node = node && right;
                else if (op === '\\') node = node && !right;
            }
            return node;
        }
        function parseFactor() {
            if (i >= tokens.length) return true;
            const tok = tokens[i++];
            if (tok === 'not') return !parseFactor();
            if (tok === '(') {
                const val = parseExpression();
                if (tokens[i] === ')') i++;
                return val;
            }
            if (/^".+"$/.test(tok)) {
                const tag = tok.slice(1, -1);
                return taskTags.includes(tag);
            }
            return true;
        }
        return parseExpression();
    }
    
    // ===== Основная логика выбора =====
    const selectedTasks = [];
    let availableTasks = [...window.taskRegistry]; 

    for (const selector of problemSelectors) {
        const { count, filter } = selector;

        const candidates = availableTasks.filter(task => {
            if (!task) return false;
            
            // Фильтр по тегам теперь использует новую функцию
            const tagsMatch = filter.tags ? matchesTagsExpr(filter.tags, task.tags || []) : true;
            
            // Фильтры по типу и номеру, если они есть (остаются для совместимости)
            const typeMatch = filter.type ? (Array.isArray(filter.type) ? filter.type.includes(task.type) : task.type === filter.type) : true;
            const numberMatch = filter.number ? (Array.isArray(filter.number) ? filter.number.includes(task.number) : task.number === filter.number) : true;

            return tagsMatch && typeMatch && numberMatch;
        });

        // Выбор случайных задач из кандидатов
        const shuffledCandidates = candidates.sort(() => 0.5 - Math.random());
        const picked = shuffledCandidates.slice(0, count);
        selectedTasks.push(...picked);

        // Удаляем выбранные задачи, чтобы они не попались снова
        const pickedSet = new Set(picked);
        availableTasks = availableTasks.filter(task => !pickedSet.has(task));
    }
    return selectedTasks;
}


        function createTaskCard(task) {
            const card = document.createElement('div');
            card.className = 'problem-card';
            const title = document.createElement('div');
            title.className = 'problem-title';
            const generatedTask = task.generate();
            title.innerHTML = generatedTask.problemText;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'answer-input';
            const feedback = document.createElement('div');
            feedback.className = 'feedback';
            card.append(title, input, feedback);
            return { card, input, feedback, generatedTask, originalTask: task };
        }

        function render() {
            elements.title.textContent = trainerSettings.title || 'Тренажёр';
            elements.subtitle.textContent = trainerSettings.subtitle || '';
            elements.problemsContainer.innerHTML = '';
            elements.results.classList.add('hidden');
            elements.checkBtn.disabled = false;
            elements.rerollBtn.disabled = false;
            state.tasks = [];
            const pickedTasks = pickTasks();
            for (const task of pickedTasks) {
                const taskElements = createTaskCard(task);
                state.tasks.push(taskElements);
                elements.problemsContainer.appendChild(taskElements.card);
            }
            startTimer();
        }

        function checkAnswers() {
            if (state.isFinished) return;
            state.isFinished = true;
            elements.checkBtn.disabled = true;
            let correctCount = 0;
            for (const task of state.tasks) {
                const userAnswer = task.input.value.trim();
                const { correct, correctAnswerText } = isAnswerCorrect(userAnswer, task.originalTask, task.generatedTask.variables);
                if (correct) {
                    correctCount++;
                    task.feedback.textContent = 'Верно!';
                    task.feedback.className = 'feedback ok';
                } else {
                    task.feedback.className = 'feedback wrong';
                    task.feedback.innerHTML = `Неверно. <div class="details">Правильный ответ: ${correctAnswerText}</div>`;
                }
            }
            elements.results.classList.remove('hidden');
            elements.scoreText.textContent = `Результат: ${correctCount} из ${state.tasks.length}`;
        }

        elements.checkBtn.addEventListener('click', checkAnswers);
        elements.rerollBtn.addEventListener('click', render);
        elements.printBtn.addEventListener('click', () => {
            if (typeof generatePDF === 'function') {
                // Pass the current settings, tasks, and check function
                generatePDF(trainerSettings, state.tasks, isAnswerCorrect);
            } else {
                alert('Ошибка: Модуль для создания PDF (pdf_generator.js) не найден или не загружен.');
            }
        });

        render();
    }
});



