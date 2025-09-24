const nameInputElement = document.querySelector('.nameInput');
const dateInputElement = document.querySelector('.dateInput');
const addBtnElement = document.querySelector('.addBtn');
const displayElement = document.querySelector('.display-Grid');
const deleteAllElement = document.querySelector('.deleteAllBtn');
deleteAllElement.addEventListener('click',deleteAll);
addBtnElement.addEventListener('click', ()=> {
  if((dateInputElement.value === '' && nameInputElement.value === '') || nameInputElement.value === '') {
    alert('Please enter your todo!');
    return;
  }
  addTodoList();
  renderTodoList();
  nameInputElement.value = '';
  dateInputElement.value = '';
})

renderTodoList();
handleBDeleteBtn();
function addTodoList() {
  const todo = {
    name: nameInputElement.value,
    date: dateInputElement.value
  };

  // 1. Lấy dữ liệu từ Local Storage
  const todoJSON = localStorage.getItem('todo');
  let todoData = [];

  // 2. Kiểm tra xem có dữ liệu không
  if (todoJSON) {
    // Nếu có, parse (chuyển đổi) dữ liệu JSON thành mảng JavaScript
    todoData = JSON.parse(todoJSON);
  }

  // 3. Thêm todo mới vào mảng
  todoData.push(todo);
  // 4. Lưu mảng đã cập nhật vào Local Storage
  localStorage.setItem('todo', JSON.stringify(todoData));
  console.log('Save completed!');
}
function renderTodoList () {
  const todoJSON = localStorage.getItem('todo');
  const todoData = JSON.parse(todoJSON);
  let html = '';
  for(let i = 0 ; i<todoData.length;i++) {
    const todoValue = todoData[i];
    html += `
    <p class = "todo-name">${todoValue.name}</p>
    <p class = "todo-date">${todoValue.date}</p>
    <button onclick = "
    deleteTodo(${i});
    "class = "deleteBtn">Delete</button>
    `
  }
  displayElement.innerHTML = html;
}
function deleteTodo(index) {
  const todoJSON = localStorage.getItem('todo');
  let todoData = JSON.parse(todoJSON);

  todoData.splice(index, 1);
  localStorage.setItem('todo', JSON.stringify(todoData));
  renderTodoList();
}

function deleteAll () {
  const todoJSON = localStorage.getItem('todo');
  let todoData = JSON.parse(todoJSON);
  todoData = [];
  localStorage.setItem('todo',JSON.stringify(todoData));
  renderTodoList();
}
