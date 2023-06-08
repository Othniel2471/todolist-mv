import './styles/main.scss';
// import Todo, {  } from './modules/display.js';
import Todo from './modules/display.js';

Todo.initialize();
window.addEventListener('DomContentLoaded', () => {
  Todo.editItem();
});
