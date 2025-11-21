document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Загрузка модулей листа и задач ---
    const params = new URLSearchParams(window.location.search);
    const accessId = params.get('id');

    if (!accessId || !window.sheetMap || !window.sheetMap[accessId]) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 40px; font-family: sans-serif;">
                <h1>Тренажёр не найден</h1>
                <p>Ссылка, по которой вы перешли, недействительна или устарела.</p>
            </div>
        `;
        return;
    }

    const sheetName = window.sheetMap[accessId];
    window.taskRegistry = [];

    const sheetScript = document.createElement('script');
    sheetScript.src = `sheets/${sheetName}.js`;
    document.body.appendChild(sheetScript);

    sheetScript.onerror = () => {
        document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл листа "${sheetName}.js" не найден в папке /sheets/!</h1>`;
    };

    sheetScript.onload = () => {
        const manifestScript = document.createElement('script');
        manifestScript.src = `tasks/manifest.js`;
        document.body.appendChild(manifestScript);

        manifestScript.onerror = () => {
            document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл manifest.js не найден в папке /tasks/!</h1>`;
        };

        manifestScript.onload = () => {
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
                    initializeTrainer(window.taskRegistry);
                })
                .catch(() => {
                    document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Не удалось загрузить файлы задач.</h1>`;
                });
        };
    };


    // --- 2. Основная логика тренажера ---
    function initializeTrainer(allTasks) {
        if (typeof trainerSettings === 'undefined' || typeof problemSelectors === 'undefined' || typeof isAnswerCorrect === 'undefined') {
            document.body.innerHTML = `<h1 style="color: red; text-align: center;">ОШИБКА: Файл листа "${sheetName}.js" повреждён или не настроен.</h1>`;
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

        function startTimer() {
            if (state.timerId) clearInterval(state.timerId);
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
                const remainingSeconds = Math.ceil(remainingTimeMs / 1000);
                elements.timer.textContent = formatTime(remainingSeconds);
            }, 250);
        }

        // ---------------------------------------------------------
        // ГЛАВНАЯ ФУНКЦИЯ ВЫБОРА ЗАДАЧ (СЛОЖНЫЙ ПАРСЕР + УНИКАЛЬНОСТЬ)
        // ---------------------------------------------------------
        function pickTasks() {
            // --- Парсер сложных выражений тегов (ВАШ ОРИГИНАЛЬНЫЙ КОД) ---
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
            // ---------------------------------------------------------

            const finalTasks = [];
            // Set для хранения ID задач, чтобы избежать дублей между селекторами
            const usedTaskIds = new Set();

            // Берем копию всего реестра
            let availableTasks = [...window.taskRegistry];

            for (const selector of problemSelectors) {
                const { count, filter } = selector;

                // Фильтруем задачи
                const candidates = availableTasks.filter(task => {
                    if (!task) return false;

                    // 1. Проверяем ID на уникальность (МОЕ ИСПРАВЛЕНИЕ)
                    const taskId = task.name || task.number;
                    if (taskId && usedTaskIds.has(taskId)) {
                        return false; // Задача уже была выбрана ранее
                    }

                    // 2. Проверяем сложный фильтр тегов
                    const tagsMatch = filter.tags ? matchesTagsExpr(filter.tags, task.tags || []) : true;

                    // 3. Проверяем остальные фильтры (для совместимости)
                    const typeMatch = filter.type ? (Array.isArray(filter.type) ? filter.type.includes(task.type) : task.type === filter.type) : true;
                    const numberMatch = filter.number ? (Array.isArray(filter.number) ? filter.number.includes(task.number) : task.number === filter.number) : true;

                    return tagsMatch && typeMatch && numberMatch;
                });

                // Перемешиваем кандидатов
                const shuffledCandidates = candidates.sort(() => 0.5 - Math.random());
                
                // Берем нужное количество
                const picked = shuffledCandidates.slice(0, count);
                
                for (const task of picked) {
                    finalTasks.push(task);
                    
                    // Добавляем ID в список использованных
                    const taskId = task.name || task.number;
                    if (taskId) usedTaskIds.add(taskId);
                }
            }

            return finalTasks;
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
                generatePDF(trainerSettings, state.tasks, isAnswerCorrect);
            } else {
                alert('Ошибка: Модуль для создания PDF (pdf_generator.js) не найден или не загружен.');
            }
        });

        render();
    }
});
