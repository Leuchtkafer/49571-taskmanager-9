import {SiteMenu} from './components/site-menu.js';
import {Search} from './components/search.js';
import {Statistic} from './components/statistic.js';
import {Filter} from './components/filter.js';
import {BoardController} from './controllers/board.js';
import {SearchController} from './controllers/search.js';
import {render, Position} from './utils.js';
import {allTasks, filters} from './data/data';

const main = document.querySelector(`.main`);
const menuWrapper = document.querySelector(`.main__control`);
const textNoTasks = `<p class="board__no-tasks">Congratulations, all tasks were completed! To create a new click on«add new task» button.</p>`;
const statistic = new Statistic();
const siteMenu = new SiteMenu();
const search = new Search();
const filter = new Filter(filters);
let taskMocks = allTasks;

const onDataChange = (tasks) => {
  taskMocks = tasks;
};

statistic.getElement().classList.add(`visually-hidden`);

render(menuWrapper, siteMenu.getElement(), Position.BEFOREEND);
render(main, menuWrapper, Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);
render(main, filter.getElement(), Position.BEFOREEND);
render(main, statistic.getElement(), Position.BEFOREEND);

function isArchiveTasksArray() {
  taskMocks.every((it) => {
    return it.isArchive === true;
  });
}

if (taskMocks.length === 0 || isArchiveTasksArray()) {
  render(main, textNoTasks);
}

const taskListController = new BoardController(main, onDataChange);
taskListController.show(taskMocks);

const onSearchBackButtonClick = () => {
  statistic.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  taskListController.show(taskMocks);
};
const searchController = new SearchController(main, search, onSearchBackButtonClick);

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
      statistic.hide();
      taskListController.show(taskMocks);
      break;
    case statisticId:
      taskListController.hide();
      statistic.show(taskMocks);
      break;
    case newTaskId:
      taskListController.createTask();
      siteMenu.getElement().querySelector(`#${tasksId}`).checked = true;
      break;
  }
});

search.getElement().addEventListener(`click`, () => {
  statistic.hide();
  taskListController.hide();
  searchController.show(taskMocks);
});
