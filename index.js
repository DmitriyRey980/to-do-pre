et items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// загрузка задач
function loadTasks() {
	const tasksFromStorage = localStorage.getItem("tasks");

	if (tasksFromStorage) {
		return JSON.parse(tasksFromStorage);
	}

	return items;
}

// создание элемента
function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	// удаление
	deleteButton.addEventListener("click", () => {
		clone.remove();

		items = getTasksFromDOM();
		saveTasks(items);
	});

	// копирование
	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);

		listElement.prepend(newItem);

		items = getTasksFromDOM();
		saveTasks(items);
	});

	// редактирование
	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");

		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

// получить задачи из DOM
function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];

	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	});

	return tasks;
}

// сохранить задачи
function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === запуск ===

items = loadTasks();

items.forEach((item) => {
	const newItem = createItem(item);
	listElement.append(newItem);
});

// === добавление задачи ===

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const item = inputElement.value;

	const newItem = createItem(item);
	listElement.prepend(newItem);

	items = getTasksFromDOM();
	saveTasks(items);

	inputElement.value = "";
});
