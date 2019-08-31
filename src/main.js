import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {makeFilter} from './components/make-filter.js';
import {sort} from './components/sort.js';
import {buttonMore} from "./components/button-more.js";
import {getTask, getFilter} from "./data/data.js";
import {Task} from "./components/task.js";
import {TaskEdit} from "./components/task-edit.js";
import {render, Position} from './utils.js';

const TASK_COUNT = 0;

const main = document.querySelector(`.main`);
const menuWrapper = document.querySelector(`.main__control`);
const boardWrapper = document.createElement(`section`);
boardWrapper.className = `board container`;
const boardTasks = document.createElement(`div`);
boardTasks.className = `board__tasks`;
const textNoTasks = `<p class="board__no-tasks">Congratulations, all tasks were completed! To create a new click on«add new task» button.</p>`;

const renderComponent = (wrapper, html) => {
  wrapper.insertAdjacentHTML(`beforeend`, html);
};

renderComponent(menuWrapper, menu());
renderComponent(main, search());
renderComponent(main, makeFilter(getFilter()));
main.append(boardWrapper);
renderComponent(boardWrapper, sort());
boardWrapper.append(boardTasks);

const taskMocks = new Array(TASK_COUNT)
.fill(``)
.map(getTask);

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      boardTasks.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
  .querySelector(`.card__btn--edit`)
  .addEventListener(`click`, () => {
    boardTasks.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`)
  .addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`)
  .addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement()
  .querySelector(`.card__save`)
  .addEventListener(`click`, () => {
    boardTasks.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(boardTasks, task.getElement(), Position.BEFOREEND);
};

function isArchiveTasksArray() {
  taskMocks.every((it) => {
    return it.isArchive === true;
  });
}

if (taskMocks.length === 0 || isArchiveTasksArray()) {
  renderComponent(boardWrapper, textNoTasks);
}

taskMocks.forEach((taskMock) => renderTask(taskMock));

renderComponent(boardWrapper, buttonMore());

