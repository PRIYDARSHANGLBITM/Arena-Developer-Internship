const STORAGE_KEY = "week2_tasks";


function saveTasks(tasks) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save tasks:",
            error
        );

        return false;
    }
}


function loadTasks() {

    try {

        const savedTasks =
            localStorage.getItem(STORAGE_KEY);


        // No saved data

        if (!savedTasks) {

            return [];
        }


        const tasks =
            JSON.parse(savedTasks);


        // Make sure saved data is an array

        if (!Array.isArray(tasks)) {

            return [];
        }


        return tasks;

    } catch (error) {

        console.error(
            "Unable to load tasks:",
            error
        );

        return [];
    }
}



function clearStoredTasks() {

    try {

        localStorage.removeItem(
            STORAGE_KEY
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to clear tasks:",
            error
        );

        return false;
    }
}