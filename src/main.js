import {SiteMenu} from './components/site-menu.js';
import {Search} from './components/search.js';
import {Statistics} from './components/statistics.js';
import {Filter} from './components/filter.js';
import {getTask} from './data/data.js';
import {BoardController} from './controllers/board.js';
import {SearchController} from './controllers/search.js';
import {render, Position} from './utils.js';

const TASK_COUNT = 3;

const main = document.querySelector(`.main`);
const menuWrapper = document.querySelector(`.main__control`);
const textNoTasks = `<p class="board__no-tasks">Congratulations, all tasks were completed! To create a new click on«add new task» button.</p>`;
const statistics = new Statistics();
const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter();
let taskMocks = new Array(TASK_COUNT)
.fill(``)
.map(getTask);

const onDataChange = (tasks) => {
  taskMocks = tasks;
};

statistics.getElement().classList.add(`visually-hidden`);

render(menuWrapper, siteMenu.getElement(), Position.BEFOREEND);
render(main, menuWrapper, Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);
render(main, filter.getElement(), Position.BEFOREEND);
render(main, statistics.getElement(), Position.BEFOREEND);

function isArchiveTasksArray() {
  taskMocks.every((it) => {
    return it.isArchive === true;
  });
}

if (taskMocks.length === 0 || isArchiveTasksArray()) {
  render(main, textNoTasks);
}

const taskListController = new BoardController(main, onDataChange);

const onSearchBackButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  taskListController.show(taskMocks);
};
const searchController = new SearchController(main, search, onSearchBackButtonClick);

taskListController.show(taskMocks);


siteMenu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const tasksId = `control__task`;
  const statisticId = `control__statistic`;
  const newTaskId = `control__new-task`;

  switch (evt.target.id) {
    case tasksId:
      statistics.getElement().classList.add(`visually-hidden`);
      taskListController.show(taskMocks);
      break;
    case statisticId:
      taskListController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
    case newTaskId:
      taskListController.createTask();
      siteMenu.getElement().querySelector(`#${tasksId}`).checked = true;
      break;
  }
});

search.getElement().addEventListener(`click`, () => {
  statistics.getElement().classList.add(`visually-hidden`);
  taskListController.hide();
  searchController.show(taskMocks);
});

