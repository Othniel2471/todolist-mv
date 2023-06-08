function removeCheckedItems(Todo) {
  // Filter out the checked items
  const uncheckedItems = Todo.todoLists.filter((item) => !item.completed);

  // Update the index property of the remaining list objects
  uncheckedItems.forEach((item, index) => {
    item.index = index;
  });

  // Update the todoLists array with the unchecked items
  Todo.todoLists = uncheckedItems;

  // Update the display and local storage
  localStorage.setItem('todoLists', JSON.stringify(Todo.todoLists));
}

export default removeCheckedItems;
