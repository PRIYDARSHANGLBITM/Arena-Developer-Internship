function renderTasks(tasks, currentFilter) {

    const taskList =
        document.getElementById("taskList");

    const emptyMessage =
        document.getElementById("emptyMessage");

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(task => !task.completed);

    } else if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(task => task.completed);
    }


    taskList.innerHTML = "";


    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

        updateStats(tasks);

        return;
    }


    emptyMessage.style.display = "none";


    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                data-action="complete"
                data-id="${task.id}"
            >

            <span class="task-text">
                ${escapeHTML(task.text)}
            </span>

            <div class="task-actions">

                <button
                    class="edit-btn"
                    data-action="edit"
                    data-id="${task.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-id="${task.id}"
                >
                    Delete
                </button>

            </div>
        `;


        taskList.appendChild(li);

    });


    updateStats(tasks);
}


function updateStats(tasks) {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const active =
        total - completed;


    document.getElementById("totalTasks")
        .textContent = total;

    document.getElementById("activeTasks")
        .textContent = active;

    document.getElementById("completedTasks")
        .textContent = completed;
}