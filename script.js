const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {

    let completed = tasks.filter(task => task.completed).length;

    let remaining = tasks.length - completed;

    taskCount.textContent = "Total Tasks: " + tasks.length;

    completedCount.textContent = "Completed: " + completed;

    remainingCount.textContent = "Remaining: " + remaining;
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;

    });

    filteredTasks.forEach(task => {

        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        const taskContent = document.createElement("div");

        taskContent.className = "task-content";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            tasks[originalIndex].completed = checkbox.checked;

            saveTasks();

            renderTasks();

        });

        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        taskContent.appendChild(checkbox);

        taskContent.appendChild(span);

        const deleteBtn = document.createElement("button");

        deleteBtn.className = "delete-btn";

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            tasks.splice(originalIndex,1);

            saveTasks();

            renderTasks();

        });

        li.appendChild(taskContent);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateStats();

}

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:text,

        completed:false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});

allBtn.addEventListener("click", function(){

    currentFilter = "all";

    renderTasks();

});

activeBtn.addEventListener("click", function(){

    currentFilter = "active";

    renderTasks();

});

completedBtn.addEventListener("click", function(){

    currentFilter = "completed";

    renderTasks();

});
const themeToggle = document.getElementById("themeToggle");

let darkMode = localStorage.getItem("darkMode") === "true";

function applyTheme(){

    if(darkMode){

        document.body.classList.remove("day");

        document.body.classList.add("night");

        themeToggle.textContent="☀️ Day Mode";

    }

    else{

        document.body.classList.remove("night");

        document.body.classList.add("day");

        themeToggle.textContent="🌙 Night Mode";

    }

}


themeToggle.addEventListener("click",function(){

    darkMode = !darkMode;

    localStorage.setItem("darkMode",darkMode);

    applyTheme();

});

applyTheme();
renderTasks();