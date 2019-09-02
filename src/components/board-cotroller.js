import {Board} from './board';
import {TaskList} from './tasks-list';
import {Task} from './task';
import {TaskEdit} from './task-edit';
import {ButtonMore} from './button-more';
import {render, Position} from '../utils';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._buttonMore = new ButtonMore();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._buttonMore.getElement(), Position.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }
}
