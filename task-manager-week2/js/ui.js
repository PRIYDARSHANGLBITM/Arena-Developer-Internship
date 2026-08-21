// ==========================================
// TASKFLOW - UI MANAGEMENT
// ==========================================


// ==========================================
// 1. RENDER TASKS
// ==========================================

function renderTasks(
    tasks,
    currentFilter = "all",
    currentSearch = "",
    currentSort = "newest"
) {

    const taskList =
        document.getElementById("taskList");

    const emptyMessage =
        document.getElementById("emptyMessage");


    if (!taskList) {
        return;
    }


    // --------------------------------------
    // FILTER
    // --------------------------------------

    let filteredTasks = [...tasks];


    if (currentFilter === "active") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );
    }


    if (currentFilter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );
    }


    // --------------------------------------
    // SEARCH
    // --------------------------------------

    if (currentSearch.trim() !== "") {

        const search =
            currentSearch
                .trim()
                .toLowerCase();


        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.text
                        .toLowerCase()
                        .includes(search)
            );
    }


    // --------------------------------------
    // SORT
    // --------------------------------------

    filteredTasks =
        sortTasks(
            filteredTasks,
            currentSort
        );


    // --------------------------------------
    // CLEAR OLD TASKS
    // --------------------------------------

    taskList.innerHTML = "";


    // --------------------------------------
    // EMPTY STATE
    // --------------------------------------

    if (filteredTasks.length === 0) {

        if (emptyMessage) {

            emptyMessage.style.display =
                "block";
        }


        updateStats(tasks);

        updateProgress(tasks);

        updateTaskCount(0);

        return;
    }


    if (emptyMessage) {

        emptyMessage.style.display =
            "none";
    }


    // --------------------------------------
    // CREATE TASK CARDS
    // --------------------------------------

    filteredTasks.forEach(
        function (task) {

            const li =
                document.createElement("li");


            li.className =
                "task-item";


            if (task.completed) {

                li.classList.add(
                    "completed"
                );
            }


            // --------------------------------
            // TASK CARD HTML
            // --------------------------------

            li.innerHTML = `

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    data-action="complete"
                    data-id="${task.id}"
                    aria-label="Mark task as complete"
                >


                <div class="task-content">

                    <span class="task-text">
                        ${escapeHTML(task.text)}
                    </span>


                    <div class="task-meta">

                        ${getPriorityBadge(task.priority)}

                        ${getCategoryBadge(task.category)}

                        ${getDueDateBadge(task.dueDate)}

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        class="edit-btn"
                        type="button"
                        data-action="edit"
                        data-id="${task.id}"
                        aria-label="Edit task"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        class="delete-btn"
                        type="button"
                        data-action="delete"
                        data-id="${task.id}"
                        aria-label="Delete task"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;


            taskList.appendChild(li);

        }
    );


    // --------------------------------------
    // UPDATE INFORMATION
    // --------------------------------------

    updateStats(tasks);

    updateProgress(tasks);

    updateTaskCount(
        filteredTasks.length
    );

};


// ==========================================
// 2. SORT TASKS
// ==========================================

function sortTasks(
    tasks,
    sortType
) {

    const sorted =
        [...tasks];


    // --------------------------------------
    // NEWEST
    // --------------------------------------

    if (sortType === "newest") {

        sorted.sort(
            (a, b) =>
                Number(b.id) -
                Number(a.id)
        );
    }


    // --------------------------------------
    // OLDEST
    // --------------------------------------

    else if (sortType === "oldest") {

        sorted.sort(
            (a, b) =>
                Number(a.id) -
                Number(b.id)
        );
    }


    // --------------------------------------
    // PRIORITY
    // --------------------------------------

    else if (sortType === "priority") {

        const priorityOrder = {

            high: 1,

            medium: 2,

            low: 3

        };


        sorted.sort(
            (a, b) => {

                const aPriority =
                    priorityOrder[
                        a.priority
                    ] || 2;


                const bPriority =
                    priorityOrder[
                        b.priority
                    ] || 2;


                return (
                    aPriority -
                    bPriority
                );
            }
        );
    }


    // --------------------------------------
    // DUE DATE
    // --------------------------------------

    else if (sortType === "dueDate") {

        sorted.sort(
            (a, b) => {

                if (!a.dueDate) {
                    return 1;
                }

                if (!b.dueDate) {
                    return -1;
                }

                return (
                    new Date(a.dueDate) -
                    new Date(b.dueDate)
                );
            }
        );
    }


    // --------------------------------------
    // ALPHABETICAL
    // --------------------------------------

    else if (
        sortType === "alphabetical"
    ) {

        sorted.sort(
            (a, b) =>
                a.text.localeCompare(
                    b.text
                )
        );
    }


    return sorted;
}


// ==========================================
// 3. UPDATE STATISTICS
// ==========================================

function updateStats(tasks) {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    const totalElement =
        document.getElementById(
            "totalTasks"
        );


    const activeElement =
        document.getElementById(
            "activeTasks"
        );


    const completedElement =
        document.getElementById(
            "completedTasks"
        );


    if (totalElement) {

        totalElement.textContent =
            total;
    }


    if (activeElement) {

        activeElement.textContent =
            active;
    }


    if (completedElement) {

        completedElement.textContent =
            completed;
    }
}


// ==========================================
// 4. UPDATE PROGRESS
// ==========================================

function updateProgress(tasks) {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );
    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;


        progressBar.setAttribute(
            "aria-valuenow",
            percentage
        );
    }


    if (progressText) {

        progressText.textContent =
            `${percentage}% completed`;
    }
}


// ==========================================
// 5. UPDATE FILTER COUNTS
// ==========================================

function updateFilterCounts(tasks) {

    const total =
        tasks.length;


    const active =
        tasks.filter(
            task => !task.completed
        ).length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function (button) {

            const filter =
                button.dataset.filter;


            const count =
                button.querySelector(
                    "span"
                );


            if (!count) {
                return;
            }


            if (filter === "all") {

                count.textContent =
                    total;
            }


            else if (
                filter === "active"
            ) {

                count.textContent =
                    active;
            }


            else if (
                filter === "completed"
            ) {

                count.textContent =
                    completed;
            }

        }
    );
}


// ==========================================
// 6. UPDATE ACTIVE FILTER
// ==========================================

function updateFilterButtons(
    currentFilter
) {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        function (button) {

            if (
                button.dataset.filter ===
                currentFilter
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );
            }

        }
    );
}


// ==========================================
// 7. UPDATE TASK COUNT
// ==========================================

function updateTaskCount(count) {

    const element =
        document.getElementById(
            "taskCountLabel"
        );


    if (!element) {
        return;
    }


    if (count === 1) {

        element.textContent =
            "1 task";

    } else {

        element.textContent =
            `${count} tasks`;
    }
}


// ==========================================
// 8. UPDATE EMPTY MESSAGE
// ==========================================

function updateEmptyMessage(
    currentFilter,
    currentSearch
) {

    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    if (!emptyMessage) {
        return;
    }


    const heading =
        emptyMessage.querySelector(
            "h3"
        );


    const paragraph =
        emptyMessage.querySelector(
            "p"
        );


    if (
        currentSearch &&
        currentSearch.trim() !== ""
    ) {

        if (heading) {

            heading.textContent =
                "No matching tasks";
        }


        if (paragraph) {

            paragraph.textContent =
                "Try a different search term.";
        }


        return;
    }


    if (
        currentFilter === "completed"
    ) {

        if (heading) {

            heading.textContent =
                "No completed tasks";
        }


        if (paragraph) {

            paragraph.textContent =
                "Complete a task and it will appear here.";
        }


        return;
    }


    if (
        currentFilter === "active"
    ) {

        if (heading) {

            heading.textContent =
                "No active tasks";
        }


        if (paragraph) {

            paragraph.textContent =
                "Great job! You have no pending tasks.";
        }


        return;
    }


    if (heading) {

        heading.textContent =
            "No tasks yet";
    }


    if (paragraph) {

        paragraph.textContent =
            "Add your first task and start organizing your day.";
    }
}


// ==========================================
// 9. PRIORITY BADGE
// ==========================================

function getPriorityBadge(priority) {

    if (!priority) {

        return "";
    }


    const priorityData = {

        high: {
            icon: "🔴",
            text: "High"
        },

        medium: {
            icon: "🟡",
            text: "Medium"
        },

        low: {
            icon: "🟢",
            text: "Low"
        }

    };


    const data =
        priorityData[
            priority
        ] || priorityData.medium;


    return `
        <span
            class="task-badge priority-${priority}"
        >
            ${data.icon} ${data.text}
        </span>
    `;
}


// ==========================================
// 10. CATEGORY BADGE
// ==========================================

function getCategoryBadge(category) {

    if (!category) {

        return "";
    }


    const categoryData = {

        personal: {
            icon: "👤",
            text: "Personal"
        },

        work: {
            icon: "💼",
            text: "Work"
        },

        study: {
            icon: "📚",
            text: "Study"
        },

        shopping: {
            icon: "🛒",
            text: "Shopping"
        },

        health: {
            icon: "❤️",
            text: "Health"
        }

    };


    const data =
        categoryData[
            category
        ];


    if (!data) {

        return "";
    }


    return `
        <span class="task-badge category-badge">
            ${data.icon} ${data.text}
        </span>
    `;
}


// ==========================================
// 11. DUE DATE BADGE
// ==========================================

function getDueDateBadge(dueDate) {

    if (!dueDate) {

        return "";
    }


    const date =
        new Date(
            dueDate + "T00:00:00"
        );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const tomorrow =
        new Date(today);


    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    let label =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short"
            }
        );


    let className =
        "date-badge";


    /*
        Overdue
    */

    if (date < today) {

        label =
            `⚠️ Overdue • ${label}`;

        className +=
            " overdue";

    }


    /*
        Today
    */

    else if (
        date.getTime() ===
        today.getTime()
    ) {

        label =
            `📅 Today`;

        className +=
            " today";

    }


    /*
        Tomorrow
    */

    else if (
        date.getTime() ===
        tomorrow.getTime()
    ) {

        label =
            `📅 Tomorrow`;

        className +=
            " tomorrow";

    }


    /*
        Future date
    */

    else {

        label =
            `📅 ${label}`;
    }


    return `
        <span class="${className}">
            ${label}
        </span>
    `;
}


// ==========================================
// 12. TOAST NOTIFICATION
// ==========================================

function showToast(
    message,
    type = "success"
) {

    /*
        Create container if missing
    */

    let container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.id =
            "toastContainer";


        container.className =
            "toast-container";


        document.body.appendChild(
            container
        );
    }


    /*
        Create toast
    */

    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast toast-${type}`;


    const icons = {

        success: "✅",

        error: "❌",

        warning: "⚠️",

        info: "ℹ️"

    };


    toast.innerHTML = `

        <span class="toast-icon">
            ${icons[type] || "ℹ️"}
        </span>

        <span class="toast-message">
            ${escapeHTML(message)}
        </span>

    `;


    container.appendChild(
        toast
    );


    /*
        Remove after 3 seconds
    */

    setTimeout(
        function () {

            toast.classList.add(
                "toast-hide"
            );


            setTimeout(
                function () {

                    toast.remove();

                },
                300
            );

        },
        3000
    );
}