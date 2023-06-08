
export const InputField = document.querySelector('.addtodo');

class Todo {
  static todoLists = [];

  static inputField;

  static index;

  static completed

  static listContainer;

  static i = 0;

  constructor(index, completed, description) {
    this.index = index;
    this.complete = completed;
    this.description = description;
  }

  static initialize = () => {
    Todo.inputField = document.querySelector('.addtodo');
    Todo.listContainer = document.querySelector('.todolist');

    const inv = new Todo();
    inv.showItem();

    window.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('todoLists')) {
        const fullList = JSON.parse(localStorage.getItem('todoLists'));
        inv.displayList(fullList);
      }
    });
  }

   addItem = () => {
     let { index } = Todo;
     index = Todo.i;
     const { completed } = Todo;
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
    // const todos = JSON.parse(localStorage.getItem('todoLists'));
    const listContainer = document.querySelector('.todolist');
    const displayTodos = todo.map((list) => {
      const { index, completed, description } = list;
      return `<div class="list" data-id="${index}">
      <div class="content">
          <input class="box check-btn" type="checkbox" name="" data-check="${completed}">
          <input class="edit-btn" type="text" name="" id="" value="${description}">
      </div>
      <i class="fa-solid fa-ellipsis-vertical icon delete-btn"></i>
   </div>`;
    }).join('');

    listContainer.innerHTML = displayTodos;

    // select elements
    const elements = document.querySelectorAll('.list');
    elements.forEach((element) => {
      const deleteBtn = element.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', this.deleteItem);
    });
  }

  deleteItem = (e) => {
    const element = e.target.closest('.list');
    const index = Array.from(Todo.listContainer.children).indexOf(element);
    Todo.todoLists.splice(index, 1);

    // Update the index property of the remaining list objects
    Todo.todoLists.forEach((list, i) => {
      list.index = i;
    });

    this.displayList(Todo.todoLists); // Update the displayed list after deleting

    // Update local storage
    localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
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
