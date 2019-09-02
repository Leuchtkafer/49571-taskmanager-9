import {menu} from './components/menu.js';
import {search} from './components/search.js';
import {makeFilter} from './components/make-filter.js';
import {sort} from './components/sort.js';
import {getTask, getFilter} from './data/data.js';
import {BoardController} from './components/board-cotroller.js';

const TASK_COUNT = 3;

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

function isArchiveTasksArray() {
  taskMocks.every((it) => {
    return it.isArchive === true;
  });
}

if (taskMocks.length === 0 || isArchiveTasksArray()) {
  renderComponent(boardWrapper, textNoTasks);
}

const boardController = new BoardController(boardTasks, taskMocks);
boardController.init();

