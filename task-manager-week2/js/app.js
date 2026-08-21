// ==========================================
// TASKFLOW - MAIN APPLICATION
// ==========================================


// ==========================================
// 1. APPLICATION STATE
// ==========================================

let tasks = loadTasks();

let currentFilter = "all";

let currentSearch = "";

let currentSort = "newest";


// ==========================================
// 2. HTML ELEMENTS
// ==========================================

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const errorMessage =
    document.getElementById("errorMessage");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const clearCompletedButton =
    document.getElementById("clearCompleted");

const themeToggle =
    document.getElementById("themeToggle");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");


// ==========================================
// 3. INITIALIZE APPLICATION
// ==========================================

function initApp() {

    loadTheme();

    refreshUI();

    if (taskInput) {
        taskInput.focus();
    }
}


// ==========================================
// 4. REFRESH COMPLETE UI
// ==========================================

function refreshUI() {

    renderTasks(
        tasks,
        currentFilter,
        currentSearch,
        currentSort
    );

    updateFilterButtons(
        currentFilter
    );

    updateFilterCounts(
        tasks
    );

    updateEmptyMessage(
        currentFilter,
        currentSearch
    );

    updateProgress(
        tasks
    );
}


// ==========================================
// 5. ADD TASK
// ==========================================

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const text =
                taskInput.value.trim();


            // Validation
            const validation =
                validateTaskText(text);


            if (!validation.valid) {

                showError(
                    validation.message
                );

                return;
            }


            clearError();


            // Get priority
            const priorityElement =
                document.getElementById(
                    "prioritySelect"
                );


            const priority =
                priorityElement
                    ? priorityElement.value
                    : "medium";


            // Get category
            const categoryElement =
                document.getElementById(
                    "categorySelect"
                );


            const category =
                categoryElement
                    ? categoryElement.value
                    : "personal";


            // Get due date
            const dueDateElement =
                document.getElementById(
                    "dueDate"
                );


            const dueDate =
                dueDateElement
                    ? dueDateElement.value
                    : "";


            // Create task
            const newTask =
                createTask(
                    text,
                    priority,
                    category,
                    dueDate
                );


            // Add task
            tasks.push(newTask);


            // Save
            saveTasks(tasks);


            // Reset form
            taskForm.reset();


            // Refresh UI
            refreshUI();


            // Success message
            showToast(
                "Task added successfully! 🎉",
                "success"
            );


            // Focus input
            taskInput.focus();

        }
    );

}


// ==========================================
// 6. TASK BUTTON EVENTS
// ==========================================

if (taskList) {

    taskList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;


            const id =
                button.dataset.id;


            // EDIT
            if (action === "edit") {

                editTask(id);

                return;
            }


            // DELETE
            if (action === "delete") {

                deleteTask(id);

                return;
            }

        }
    );

}


// ==========================================
// 7. COMPLETE / INCOMPLETE
// ==========================================

if (taskList) {

    taskList.addEventListener(
        "change",
        function (event) {

            if (
                event.target.dataset.action !==
                "complete"
            ) {
                return;
            }


            const id =
                event.target.dataset.id;


            toggleTask(id);

        }
    );

}


// ==========================================
// 8. EDIT TASK
// ==========================================

function editTask(id) {

    const task =
        tasks.find(
            task =>
                String(task.id) ===
                String(id)
        );


    if (!task) {
        return;
    }


    const updatedText =
        prompt(
            "Edit your task:",
            task.text
        );


    // Cancel
    if (updatedText === null) {
        return;
    }


    // Validate
    const validation =
        validateTaskText(
            updatedText
        );


    if (!validation.valid) {

        showToast(
            validation.message,
            "error"
        );

        return;
    }


    // Update task
    task.text =
        updatedText.trim();


    // Save
    saveTasks(tasks);


    // Refresh
    refreshUI();


    showToast(
        "Task updated successfully! ✏️",
        "success"
    );

}


// ==========================================
// 9. DELETE TASK
// ==========================================

function deleteTask(id) {

    const task =
        tasks.find(
            task =>
                String(task.id) ===
                String(id)
        );


    if (!task) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${task.text}"?`
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            task =>
                String(task.id) !==
                String(id)
        );


    saveTasks(tasks);


    refreshUI();


    showToast(
        "Task deleted successfully.",
        "success"
    );

}


// ==========================================
// 10. TOGGLE COMPLETE
// ==========================================

function toggleTask(id) {

    let completedTask = false;


    tasks =
        tasks.map(
            function (task) {

                if (
                    String(task.id) ===
                    String(id)
                ) {

                    completedTask =
                        !task.completed;


                    return {

                        ...task,

                        completed:
                            completedTask

                    };
                }


                return task;

            }
        );


    saveTasks(tasks);


    refreshUI();


    if (completedTask) {

        showToast(
            "🎉 Task completed!",
            "success"
        );

    } else {

        showToast(
            "Task marked as active.",
            "success"
        );

    }

}


// ==========================================
// 11. FILTER BUTTONS
// ==========================================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                currentFilter =
                    this.dataset.filter;


                refreshUI();

            }
        );

    }
);


// ==========================================
// 12. SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value.trim();


            refreshUI();

        }
    );

}


// ==========================================
// 13. SORT
// ==========================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;


            refreshUI();

        }
    );

}


// ==========================================
// 14. CLEAR COMPLETED TASKS
// ==========================================

if (clearCompletedButton) {

    clearCompletedButton.addEventListener(
        "click",
        function () {

            const completedCount =
                tasks.filter(
                    task =>
                        task.completed
                ).length;


            // Nothing completed
            if (completedCount === 0) {

                showToast(
                    "No completed tasks to clear.",
                    "warning"
                );

                return;
            }


            // Confirmation
            const confirmed =
                confirm(
                    `Clear ${completedCount} completed task(s)?`
                );


            if (!confirmed) {
                return;
            }


            // Remove completed tasks
            tasks =
                tasks.filter(
                    task =>
                        !task.completed
                );


            // Save
            saveTasks(tasks);


            // Refresh
            refreshUI();


            showToast(
                "Completed tasks cleared.",
                "success"
            );

        }
    );

}


// ==========================================
// 15. DARK / LIGHT MODE
// ==========================================

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            themeToggle.textContent =
                isDark
                    ? "☀️"
                    : "🌙";


            localStorage.setItem(
                "week2_theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


// ==========================================
// 16. LOAD SAVED THEME
// ==========================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "week2_theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "☀️";

        }

    } else {

        document.body.classList.remove(
            "dark"
        );


        if (themeToggle) {

            themeToggle.textContent =
                "🌙";

        }

    }

}


// ==========================================
// 17. ERROR MESSAGE
// ==========================================

function showError(message) {

    if (!errorMessage) {
        return;
    }


    errorMessage.textContent =
        message;


    errorMessage.style.display =
        "block";


    if (taskInput) {
        taskInput.focus();
    }

}


function clearError() {

    if (!errorMessage) {
        return;
    }


    errorMessage.textContent = "";


    errorMessage.style.display =
        "none";

}


// ==========================================
// 18. KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {


        // Ctrl + K
        // Focus search

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();


            if (searchInput) {

                searchInput.focus();

            }

        }


        // Escape
        // Clear search

        if (
            event.key === "Escape"
        ) {

            if (
                document.activeElement ===
                searchInput
            ) {

                searchInput.value = "";

                currentSearch = "";

                refreshUI();

            }

        }


        // Ctrl + Enter
        // Add task

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            if (
                document.activeElement ===
                taskInput
            ) {

                taskForm.requestSubmit();

            }

        }

    }
);


// ==========================================
// 19. START APPLICATION
// ==========================================

initApp();