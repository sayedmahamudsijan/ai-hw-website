document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const todoList = document.getElementById("todo-list");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const leftDiv = document.createElement("div");
      leftDiv.className = "todo-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      checkbox.addEventListener("change", () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderTodos();
      });

      const span = document.createElement("span");
      span.textContent = todo.text;
      if (todo.completed) {
        span.classList.add("completed");
      }

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.appendChild(leftDiv);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  addTodoBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task === "") return;

    todos.push({ text: task, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = "";
  });

  renderTodos();
});