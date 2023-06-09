function removeCheckedItems(Todo) {
  // Filter out the checked items
  const uncheckedItems = Todo.todoLists.filter((item) => !item.completed);

  uncheckedItems.forEach((item, index) => {
    item.index = index + 1;
  });

  Todo.todoLists = uncheckedItems;

  localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
}

export default removeCheckedItems;
