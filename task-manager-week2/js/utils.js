// ==========================================
// TASKFLOW - UTILITY FUNCTIONS
// ==========================================


// ==========================================
// 1. GENERATE UNIQUE ID
// ==========================================

function generateId() {

    return Date.now() +
        Math.floor(Math.random() * 1000);

}


// ==========================================
// 2. ESCAPE HTML
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// 3. VALIDATE TASK
// ==========================================

function validateTaskText(text) {

    const trimmedText =
        text.trim();


    if (trimmedText === "") {

        return {
            valid: false,
            message: "Please enter a task."
        };
    }


    if (trimmedText.length < 3) {

        return {
            valid: false,
            message:
                "Task must contain at least 3 characters."
        };
    }


    if (trimmedText.length > 200) {

        return {
            valid: false,
            message:
                "Task cannot exceed 200 characters."
        };
    }


    return {
        valid: true,
        message: ""
    };
}


// ==========================================
// 4. CREATE TASK OBJECT
// ==========================================

function createTask(
    text,
    priority = "medium",
    category = "personal",
    dueDate = ""
) {

    return {

        id: generateId(),

        text: text.trim(),

        completed: false,

        priority: priority,

        category: category,

        dueDate: dueDate,

        createdAt:
            new Date().toISOString()

    };
}