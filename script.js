
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render all tasks
  function rendertasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn" data-index="${index}">&times;</button>
      `;
      taskList.appendChild(li);
    });
  }

  // Add a new task
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
      tasks.push({ text: taskText });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      input.value = '';
      input.focus(); // Keep focus on input
      rendertasks();
    }
  });

  // Delete a task
  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = parseInt(e.target.dataset.index, 10);
      if (!isNaN(index) && index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        rendertasks();
      }
    }
  });

  // Initial render
  rendertasks();
});
if (Notification.permission === 'granted') {
  new Notification('Timedown Complete!', {
    body: 'Your countdown has finished.',
    icon: 'icon.png'
  });
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Timedown Complete!', { body: 'Finished!' });
    }
  });
} 

