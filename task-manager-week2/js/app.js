// ==========================================
// TASK MANAGER - MAIN JAVASCRIPT
// ==========================================


// ------------------------------------------
// 1. Application State
// ------------------------------------------

let tasks = loadTasks();

let currentFilter = "all";


// ------------------------------------------
// 2. Select HTML Elements
// ------------------------------------------

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


// ------------------------------------------
// 3. ADD TASK
// ------------------------------------------

taskForm.addEventListener("submit", function (event) {

    // Page reload hone se rokta hai
    event.preventDefault();


    // Input ki value lena
    const text = taskInput.value.trim();


    // Validation
    if (text === "") {

        errorMessage.textContent =
            "Please enter a task.";

        return;
    }


    // Error message remove
    errorMessage.textContent = "";


    // New task object
    const newTask = {

        id: generateId(),

        text: text,

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    // Task array me add
    tasks.push(newTask);


    // localStorage me save
    saveTasks(tasks);


    // Input clear
    taskInput.value = "";


    // Screen update
    renderTasks(
        tasks,
        currentFilter
    );

});


// ------------------------------------------
// 4. DELETE + EDIT TASK
// ------------------------------------------

taskList.addEventListener("click", function (event) {

    const button =
        event.target.closest("button");


    // Agar button nahi hai
    if (!button) {
        return;
    }


    const action =
        button.dataset.action;


    const id =
        Number(button.dataset.id);


    // --------------------------------------
    // DELETE TASK
    // --------------------------------------

    if (action === "delete") {

        tasks =
            tasks.filter(
                task => task.id !== id
            );


        saveTasks(tasks);


        renderTasks(
            tasks,
            currentFilter
        );
    }


    // --------------------------------------
    // EDIT TASK
    // --------------------------------------

    if (action === "edit") {

        const task =
            tasks.find(
                task => task.id === id
            );


        if (!task) {
            return;
        }


        // User se new task lena
        const updatedText =
            prompt(
                "Edit your task:",
                task.text
            );


        // Cancel press kiya
        if (updatedText === null) {
            return;
        }


        // Empty task prevent
        if (updatedText.trim() === "") {

            alert(
                "Task cannot be empty."
            );

            return;
        }


        // Task update
        task.text =
            updatedText.trim();


        // Save
        saveTasks(tasks);


        // UI update
        renderTasks(
            tasks,
            currentFilter
        );
    }

});


// ------------------------------------------
// 5. COMPLETE / INCOMPLETE TASK
// ------------------------------------------

taskList.addEventListener(
    "change",
    function (event) {

        // Check karo checkbox hai ya nahi
        if (
            event.target.dataset.action !==
            "complete"
        ) {
            return;
        }


        const id =
            Number(
                event.target.dataset.id
            );


        // Task update
        tasks =
            tasks.map(function (task) {

                if (task.id === id) {

                    return {
                        ...task,

                        completed:
                            !task.completed
                    };
                }


                return task;

            });


        // Save
        saveTasks(tasks);


        // Screen update
        renderTasks(
            tasks,
            currentFilter
        );

    }
);


// ------------------------------------------
// 6. FILTER TASKS
// ------------------------------------------

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            // Sab buttons se active remove
            filterButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            // Current button active
            this.classList.add("active");


            // Filter value
            currentFilter =
                this.dataset.filter;


            // Tasks display
            renderTasks(
                tasks,
                currentFilter
            );

        }
    );

});


// ------------------------------------------
// 7. CLEAR COMPLETED TASKS
// ------------------------------------------

clearCompletedButton.addEventListener(
    "click",
    function () {

        tasks =
            tasks.filter(
                task => !task.completed
            );


        // Save
        saveTasks(tasks);


        // Update UI
        renderTasks(
            tasks,
            currentFilter
        );

    }
);


// ------------------------------------------
// 8. DARK / LIGHT MODE
// ------------------------------------------

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


        if (isDark) {

            themeToggle.textContent = "☀️";

        } else {

            themeToggle.textContent = "🌙";

        }

    }
);


// ------------------------------------------
// 9. LOAD TASKS WHEN PAGE OPENS
// ------------------------------------------

renderTasks(
    tasks,
    currentFilter
);