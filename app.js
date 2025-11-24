// Завантажуємо дані з LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const list = document.getElementById("todo-list");
const counterAll = document.getElementById("counter-all");
const counterLeft = document.getElementById("counter-left");

// Додаємо нове завдання
function newTodo() {
    const text = prompt("Введіть нову справу:");
    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        done: false
    });

    save();
    render();
    updateCounter();
}

// Рендер одного елемента
function renderTodo(todo) {
    return `
        <li data-id="${todo.id}">
            <input type="checkbox" ${todo.done ? "checked" : ""}>
            <label>${todo.text}</label>
            <button class="delete">✖</button>
        </li>`;
}

// Повний рендер списку
function render() {
    list.innerHTML = todos.map(renderTodo).join("");
}

// Лічильники
function updateCounter() {
    counterAll.textContent = todos.length;
    counterLeft.textContent = todos.filter(t => !t.done).length;
}

// Видалення
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    save();
    render();
    updateCounter();
}

// Перемикання стану
function checkTodo(id) {
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
    save();
    render();
    updateCounter();
}

// Обробка кліків
list.addEventListener("click", function(e) {
    const id = Number(e.target.closest("li").dataset.id);

    if (e.target.classList.contains("delete")) {
        deleteTodo(id);
    }

    if (e.target.type === "checkbox") {
        checkTodo(id);
    }
});

// Зберегти в LocalStorage
function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Ініціалізація
render();
updateCounter();
