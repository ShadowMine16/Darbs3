document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        const textNode = document.createTextNode(task);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Noņemt';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        li.appendChild(textNode);
        li.appendChild(deleteButton);
        return li;
    }

    addTaskButton.addEventListener('click', function() {
        const task = taskInput.value;
        if (task) {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();
});
