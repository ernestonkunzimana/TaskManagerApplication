document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from local storage on page load
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');

        // Create a new list item
        const newTask = document.createElement('li');
        newTask.innerHTML = `<span>${taskText}</span>
                            <button onclick="deleteTask(this)">Delete</button>
                            <button onclick="toggleImportant(this)">Prioritize</button>
                            <button onclick="editTask(this)">Edit</button>`;

        // Check if the task is important
        if (taskList.firstChild && taskList.firstChild.classList.contains('task-important')) {
            taskList.insertBefore(newTask, taskList.firstChild);
        } else {
            taskList.appendChild(newTask);
        }

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }
}

function deleteTask(button) {
    const taskList = document.getElementById('task-list');
    const taskItem = button.parentNode;
    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasks();
}

function toggleImportant(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('task-important');

    // Save tasks to local storage
    saveTasks();
}

function editTask(button) {
    const taskItem = button.parentNode;
    const taskTextElement = taskItem.querySelector('span');
    const newTaskText = prompt('Edit task:', taskTextElement.innerText);

    if (newTaskText !== null) {
        taskTextElement.innerText = newTaskText;

        // Save tasks to local storage
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];

    // Iterate through each task and save to array
    taskList.childNodes.forEach(task => {
        const taskText = task.querySelector('span').innerText;
        const isImportant = task.classList.contains('task-important');

        tasks.push({ text: taskText, important: isImportant });
    });

    // Save array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Populate task list from saved tasks
    savedTasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `<span>${task.text}</span>
                            <button onclick="deleteTask(this)">Delete</button>
                            <button onclick="toggleImportant(this)">Prioritize</button>
                            <button onclick="editTask(this)">Edit</button>`;

        if (task.important) {
            newTask.classList.add('task-important');
        }

        taskList.appendChild(newTask);
    });
}

// Enable adding a task by pressing Enter key
document.getElementById('task-input').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
