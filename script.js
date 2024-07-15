document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const totalTimeDisplay = document.getElementById('total-time');

    let totalTime = 0;

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const taskInput = document.getElementById('task');
        const timeInput = document.getElementById('time');
        
        const task = taskInput.value;
        const time = parseInt(timeInput.value);

        if (task.trim() === '' || isNaN(time) || time <= 0) {
            showAlert('Por favor, ingrese una tarea válida y el tiempo estimado.');
            return;
        }

        addTask(task, time);
        taskInput.value = '';
        timeInput.value = '';

        showAlert('Tarea agregada correctamente.');
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('task-item')) {
            event.target.classList.toggle('completed');
            updateTotalTime();
        } else if (event.target.classList.contains('delete-button')) {
            const li = event.target.parentElement;
            const time = parseInt(li.getAttribute('data-time'));
            totalTime -= time;
            taskList.removeChild(li);
            updateTotalTime();
            showAlert('Tarea eliminada correctamente.');
        }
    });

    function addTask(task, time) {
        const li = document.createElement('li');
        li.textContent = `${task} - ${time} minutos `;
        li.className = 'task-item';
        li.setAttribute('data-time', time);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-button';
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        totalTime += time;
        updateTotalTime();
    }

    function updateTotalTime() {
        totalTimeDisplay.textContent = `Tiempo total: ${totalTime} minutos`;
    }

    function showAlert(message) {
        const alert = document.createElement('p');
        alert.className = 'alert';
        alert.textContent = message;
        document.body.insertBefore(alert, document.body.firstChild);
        
        setTimeout(function() {
            alert.remove();
        }, 3000);
    }
});
