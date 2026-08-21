const STORAGE_KEY = "week2_tasks";

function saveTasks(tasks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}

function loadTasks() {

    const savedTasks =
        localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
        return [];
    }

    return JSON.parse(savedTasks);
}