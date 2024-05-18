document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');


  loadTasks();


  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
          addTask(taskText);
          taskInput.value = '';
      }
  });


  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          const taskText = taskInput.value.trim();
          if (taskText !== '') {
              addTask(taskText);
              taskInput.value = '';
          }
      }
  });

  function addTask(taskText, isCompleted = false) {
      const li = document.createElement('li');
      if (isCompleted) {
          li.classList.add('completed');
      }

      const taskTextInput = document.createElement('input');
      taskTextInput.type = 'text';
      taskTextInput.value = taskText;
      taskTextInput.disabled = true;

      const actions = document.createElement('div');
      actions.classList.add('actions');

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit');
      editButton.addEventListener('click', () => editTask(li, taskTextInput));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => deleteTask(li));

      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.classList.add('complete');
      completeButton.addEventListener('click', () => toggleCompleteTask(li));

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      actions.appendChild(completeButton);

      li.appendChild(taskTextInput);
      li.appendChild(actions);
      taskList.appendChild(li);

      saveTasks();
  }

  function editTask(li, taskTextInput) {
      if (taskTextInput.disabled) {
          taskTextInput.disabled = false;
          taskTextInput.focus();
      } else {
          taskTextInput.disabled = true;
          saveTasks();
      }
  }

  function deleteTask(li) {
      taskList.removeChild(li);
      saveTasks();
  }

  function toggleCompleteTask(li) {
      li.classList.toggle('completed');
      saveTasks();
  }

  function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach(li => {
          tasks.push({
              text: li.querySelector('input[type="text"]').value,
              completed: li.classList.contains('completed')
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
  }
});
