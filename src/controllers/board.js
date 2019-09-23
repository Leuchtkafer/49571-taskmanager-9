import {Board} from '../components/board';
import {Sort} from '../components/sort';
import {TaskList} from '../components/tasks-list';
import {TaskListController} from '../controllers/task-list';
import {ButtonMore} from '../components/button-more';
import {unrender, render, Position} from '../utils';

const TASKS_IN_ROW = 10;

export class BoardController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;
    this._tasks = [];

    this._showedTasks = null;

    this._board = new Board();
    this._loadMoreButton = new ButtonMore();
    this._sort = new Sort();
    this._taskList = new TaskList();

    this._taskListController = new TaskListController(this._taskList.getElement(), this._onDataChange.bind(this));

    this._init();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    if (tasks !== this._tasks) {
      this._setTasks(tasks);
    }

    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    this._taskListController.createTask();
  }

  _init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderBoard() {
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    unrender(this._loadMoreButton.getElement());
    this._loadMoreButton.removeElement();
    if (this._showedTasks < this._tasks.length) {
      render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);
    }

    this._taskListController.setTasks(this._tasks.slice(0, this._showedTasks));

    this._loadMoreButton.getElement()
    .addEventListener(`click`, () => this._onLoadMoreButtonClick());
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    this._showedTasks = TASKS_IN_ROW;

    this._renderBoard();
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
    this._onDataChangeMain(this._tasks);

    this._renderBoard();
  }

  _onLoadMoreButtonClick() {
    this._taskListController.addTasks(this._tasks.slice(this._showedTasks, this._showedTasks + TASKS_IN_ROW));

    this._showedTasks += TASKS_IN_ROW;

    if (this._showedTasks >= this._tasks.length) {
      unrender(this._loadMoreButton.getElement());
      this._loadMoreButton.removeElement();
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._taskListController.setTasks(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._taskListController.setTasks(sortedByDateDownTasks);
        break;
      case `default`:
        this._taskListController.setTasks(this._tasks);
        break;
    }
  }
}
