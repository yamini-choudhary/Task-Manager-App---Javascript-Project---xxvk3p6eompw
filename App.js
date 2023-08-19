const allBoxes = document.querySelectorAll(".box");
const allTasks = document.querySelectorAll(".task");

allTasks.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

allBoxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    const curTask = document.querySelector(".is-dragging");
    box.appendChild(curTask);
  });
});

// Adding new task
const form = document.querySelector("#add-form");
const input = document.querySelector("#todo-input");
const todoBox = document.querySelector("#to-do");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTaskText = input.value;

  if (!newTaskText) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerHTML = newTaskText;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });
  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });
  newTask.addEventListener("click", function (e) {
    openDescriptionModal(this);
  });
  todoBox.appendChild(newTask);
  input.value = "";
});

// Popup Modal Logic
for (task of allTasks) {
  task.addEventListener("click", function (e) {
    openDescriptionModal(this);
  });
}

let popup = document.getElementById("popup");

function openDescriptionModal(taskElement) {
  popup.classList.add("open-popup");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const saveDescriptionButton = document.getElementById("saveDescription");
  const closeButton = popup.querySelector(".close");

  const description = taskElement.getAttribute("data-description");
  taskDescriptionInput.value = description;

  saveDescriptionButton.addEventListener("click", () => {
    const newDescription = taskDescriptionInput.value.trim();
    taskElement.setAttribute("data-description", newDescription);
    taskElement.textContent = `${
      taskElement.textContent.split(" - ")[0]
    } - ${newDescription}`;
    popup.classList.remove("open-popup");
  });

  closeButton.addEventListener("click", () => {
    popup.classList.remove("open-popup");
  });

  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("open-popup");
    }
  });
}

