// Global Variables
let newTodo;
let todos = [];

// DOM elements and classes
const button = document.querySelector('.inputBtn');
const clearBtn = document.querySelector('.clearBtn');
const list = document.querySelector('.todoList');
const input = document.getElementById('todoInput');
const allDivs = document.querySelectorAll('.aDiv');

allDivs.forEach((div) => {
	div.classList.add('colour');
});
// Event Listeners
const inputValue = input.addEventListener(
	'change',
	(e) =>
		(newTodo = {
			id: randomIdGenerator(),
			todo: e.target.value,
			isComplete: false,
		}),
);

button.addEventListener('click', () => {
	if (localStorage.getItem('todoList')) {
		todos = JSON.parse(localStorage.getItem('todoList'));
		todos.push(newTodo);
	} else {
		todos.push(newTodo);
	}
	addToStorage();
});

clearBtn.addEventListener('click', () => {
	localStorage.clear();
	todos = new Array();
	displayTodos();
});

// Render and store items
const addToStorage = () => {
	localStorage.setItem('todoList', JSON.stringify(todos));
	displayTodos();
};

const displayTodos = () => {
	const getFromStorage = localStorage.getItem('todoList');
	const storedTodos = JSON.parse(getFromStorage);
	if (storedTodos && storedTodos[0]) {
		list.innerHTML = storedTodos.map(
			(item) =>
				`<div>
				${item.todo}
				<button class='remove' onclick='removeTodo(${item.id})'>
					Remove
				</button>
			</div>`,
		);
	} else {
		list.innerHTML = `<div>No todos currently</div>`;
	}
};

const removeTodo = (id) => {
	let currentTodos = JSON.parse(localStorage.getItem('todoList'));
	let filitered = currentTodos.filter((item) => item.id !== id);
	localStorage.setItem('todoList', JSON.stringify(filitered));
	displayTodos();
};

// Generate a random ID
const randomIdGenerator = () => Math.floor(Math.random() * 100000);
// Display todos on page load
displayTodos();

const addItem = () => {
	localStorage.setItem('item', 'asfasdfsdf');
};
addItem();

setTimeout(() => {
	localStorage.removeItem('item');
}, 6000);
