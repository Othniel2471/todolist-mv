import './styles/main.scss';
import Todo from './modules/display.js';
import removeCheckedItems from './modules/clearCompleted.js';

const deleteCompleted = document.querySelector('.clear');
const refreshList = document.querySelector('#reload');

Todo.initialize();
window.addEventListener('DomContentLoaded', () => {
  Todo.editItem();
});

refreshList.addEventListener('click', () => {
  Todo.todoLists = [];
  localStorage.removeItem('todoLists');
  window.location.reload();
});

deleteCompleted.addEventListener('click', () => {
  removeCheckedItems(Todo);
  window.location.reload();
});
