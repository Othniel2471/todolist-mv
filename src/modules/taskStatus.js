function checkItem(e, Todo) {
  const element = e.target.closest('.list');
  const index = Array.from(Todo.listContainer.children).indexOf(element);
  Todo.todoLists[index].completed = e.target.checked;
  const editBtn = element.querySelector('.edit-btn');
  if (Todo.todoLists[index].completed === false) {
    editBtn.classList.remove('checkActive');
  } else {
    editBtn.classList.add('checkActive');
  }
  localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
}

export default checkItem;
