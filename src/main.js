import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {filter} from './components/filter.js';
import {sort} from './components/sort.js';
import {task} from './components/task.js';
import {form} from './components/form.js';
import {loadMore} from "./components/load-more.js";

const taskNumber = 3;

const main = document.querySelector(`.main`);
const menuWrapper = document.querySelector(`.main__control`);
const boardWrapper = document.createElement(`section`);
boardWrapper.className = `board container`;
const boardTasks = document.createElement(`div`);
boardTasks.className = `board__tasks`;

// функция для рендеринга компонента

const renderComponent = (wrapper, html) => {
  wrapper.insertAdjacentHTML(`beforeend`, html);
};

const renderTask = (number) => {
  const randomTasksArray = [];
  while (randomTasksArray.length < number) {
    randomTasksArray.push(task());
  }
  return randomTasksArray;
};

renderComponent(menuWrapper, menu());
renderComponent(main, search());
renderComponent(main, filter());
main.append(boardWrapper);
renderComponent(boardWrapper, sort());
renderComponent(boardTasks, form());
renderComponent(boardTasks, renderTask(taskNumber));
boardWrapper.append(boardTasks);
renderComponent(boardWrapper, loadMore());
