const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  counter.textContent = `Total Tasks: ${tasks.length}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text} (${task.date || "No date"})</span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) return;

  tasks.push({ text, date, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();
