import checkItem from './taskStatus.js';

export const InputField = document.querySelector('.addtodo');

class Todo {
  static todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];

  static inputField;

  static index;

  static completed

  static listContainer;

  static i = 1;

  constructor(index, completed, description) {
    this.index = index;
    this.completed = completed;
    this.description = description;
  }

  static initialize = () => {
    Todo.inputField = document.querySelector('.addtodo');
    Todo.listContainer = document.querySelector('.todolist');

    // Retrieve the saved state from localStorage
    const savedTodoLists = localStorage.getItem('todoLists');

    if (savedTodoLists) {
      // Parse the saved state back into a Todo array
      Todo.todoLists = JSON.parse(savedTodoLists);
    }

    const inv = new Todo();
    inv.showItem();

    window.addEventListener('DOMContentLoaded', () => {
      inv.displayList(Todo.todoLists);
    });
  };

   addItem = () => {
     const index = Todo.i;
     let { completed } = Todo;
     completed = false;
     const description = Todo.inputField.value;
     const listItems = new Todo(index, completed, description);

     if (localStorage.getItem('todoLists')) {
       Todo.todoLists = JSON.parse(localStorage.getItem('todoLists'));
     }
     Todo.todoLists.push(listItems);
     localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
   };

  clearField = () => {
    Todo.inputField.value = '';
  };

  displayList = (todo) => {
    const listContainer = document.querySelector('.todolist');
    const displayTodos = todo.map((list) => {
      const { index, completed, description } = list;
      const checkedAttribute = completed ? 'checked' : '';
      const checkActiveClass = completed ? 'checkActive' : '';
      return `<div class="list" data-id="${index}">
        <div class="content">
            <input class="box check-btn" type="checkbox" name="" data-check="${completed}" ${checkedAttribute}>
            <input class="edit-btn ${checkActiveClass}" type="text" name="" id="" value="${description}" readonly>
        </div>
        <i class="fa-solid fa-trash icon delete-btn"></i>
      </div>
     `;
    }).join('');

    listContainer.innerHTML = displayTodos;

    // select elements
    const elements = document.querySelectorAll('.list');
    elements.forEach((element) => {
      const deleteBtn = element.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', this.deleteItem);
      const editBtn = element.querySelector('.edit-btn');
      editBtn.addEventListener('click', this.editItem);
      const checkBtn = element.querySelector('.check-btn');
      checkBtn.addEventListener('change', (e) => {
        checkItem(e, Todo);
      });
    });
  }

  deleteItem = (e) => {
    const element = e.target.closest('.list');
    const index = Array.from(Todo.listContainer.children).indexOf(element);
    Todo.todoLists.splice(index, 1);

    // Update the index property of the remaining list objects
    Todo.todoLists.forEach((list, i) => {
      list.index = i + 1;
    });

    this.displayList(Todo.todoLists);

    // Update local storage
    localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
  };

  editItem = (e) => {
    const element = e.target.closest('.list');
    const index = Array.from(Todo.listContainer.children).indexOf(element);
    const input = element.querySelector('input[type="text"]');
    input.removeAttribute('readonly');
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        input.setAttribute('readonly', true);
        Todo.todoLists[index].description = input.value;
        localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
        this.displayList(Todo.todoLists);
      }
    });
  };

  displayItem = () => {
    this.addItem();
    const updatedList = localStorage.getItem('todoLists');
    const fullList = JSON.parse(updatedList);
    this.displayList(fullList);
    this.clearField();
  }

  showItem = () => {
    const InputField = document.querySelector('.addtodo');
    InputField.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.displayItem();
        Todo.i += 1;
      }
    });
  }
}

export default Todo;
