const listContainer = document.querySelector('.todolist');

const tasks = [
  {
    index: 0,
    description: 'one',
    completed: false,
  },
  {
    index: 1,
    description: 'jump outta space',
    completed: false,
  },
  {
    index: 2,
    description: 'watch fast x',
    completed: false,
  },
  {
    index: 3,
    description: 'get some sleep',
    completed: false,
  },
];

const displayTask = (tasks) => {
  const displaytTaskDem = tasks.map((item) => `
  <div class="list" draggable="true">
    <div class="content">
        <input class="box" type="checkbox" name="" id="">
        <input type="text" name="" id="" value="${item.description}">
    </div>
    <i class="fa-solid fa-ellipsis-vertical icon"></i>
</div>`).join('');

  listContainer.innerHTML = displaytTaskDem;
};

export default displayTask(tasks);
