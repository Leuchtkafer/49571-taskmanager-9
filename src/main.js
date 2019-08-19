import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {makeFilter} from './components/make-filter.js';
import {sort} from './components/sort.js';
import {makeTask} from './components/make-task.js';
import {form} from './components/form.js';
import {buttonMore} from "./components/button-more.js";
import {getTask, getFilter} from "./data/data.js";

const TASK_INITIAL_COUNT = 7;
const TASK_MAX_COUNT = 8;

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
    randomTasksArray.push(makeTask(getTask()));
  }
  return randomTasksArray;
};

const allTasks = [form(), renderTask(TASK_INITIAL_COUNT)];

renderComponent(menuWrapper, menu());
renderComponent(main, search());
renderComponent(main, makeFilter(getFilter()));
main.append(boardWrapper);
renderComponent(boardWrapper, sort());
renderComponent(boardTasks, allTasks);
boardWrapper.append(boardTasks);
renderComponent(boardWrapper, buttonMore());

const loadMore = document.querySelector(`.load-more`);

const loadMoreTasks = () => {
  const allRandomTasks = document.querySelectorAll(`.card`);
  if (allRandomTasks.length < 32) {
    renderComponent(boardTasks, renderTask(TASK_MAX_COUNT));
  } else {
    loadMore.style.display = `none`;
  }
};

loadMore.addEventListener(`click`, loadMoreTasks);

