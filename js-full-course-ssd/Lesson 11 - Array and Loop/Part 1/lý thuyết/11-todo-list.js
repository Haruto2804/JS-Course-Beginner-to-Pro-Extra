const inputTodoListElement1 = document.querySelector('.input-Todo-List1');
const addBtnElement1 = document.querySelector('.addBtn1');
const inputTodoListElement2 = document.querySelector('.input-Todo-List2');
const addBtnElement2 = document.querySelector('.addBtn2');
const result = document.querySelector('.toDoListResult');
console.log(result)
// khởi tạo 1 mảng
let myTodoList = [];
//Todo List Practice 1
addBtnElement1.addEventListener('click', ()=> {
  addTodoList();
  inputTodoListElement1.value = '';
})
function addTodoList () {
  myTodoList.push(inputTodoListElement1.value);
  console.log(myTodoList);
}
//Todo List Practice 1

//Todo List Practice 2
let toDo = '';
addBtnElement2.addEventListener('click', ()=> {
  myTodoList.push(inputTodoListElement2.value);
  addTodoListHTML();
  inputTodoListElement2.value = '';
})
function addTodoListHTML () {
  let toDo = '';
  let todoHTML ='';
  for(let i =0;i<myTodoList.length;i++) {
    toDo = myTodoList[i];
    todoHTML += toDo + '<br>';
  }
  result.innerHTML = `<p>${todoHTML}</p><br>`;
}
//Todo List Practice 2

