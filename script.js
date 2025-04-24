const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const filterButtons = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");



let tasks = [];

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const span = document.createElement("span");
        span.textContent = task.text;

        const finishBtn = document.createElement("button");
        finishBtn.textContent = "✓";
        finishBtn.classList.add("tick");
        finishBtn.addEventListener("click", () => toggleTask(index));

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.classList.add("cross");
        delBtn.addEventListener("click", () => deleteTask(index));

        li.appendChild(span);
        li.appendChild(finishBtn);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks(getCurrentFilter());
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(getCurrentFilter());
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks(getCurrentFilter());
}

function updateCounter() {
    const count = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${count} task${count !== 1 ? 's' : ''} remaining`;
}

function getCurrentFilter() {
    const active = document.querySelector(".filter.active");
    return active.id.replace("filter-", "");
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks(getCurrentFilter());
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter.active").classList.remove("active");
        btn.classList.add("active");
        renderTasks(getCurrentFilter());
    });
});

clearCompletedBtn.addEventListener("click", clearCompleted);


renderTasks();
