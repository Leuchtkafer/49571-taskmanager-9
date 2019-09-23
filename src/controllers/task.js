import {Task} from '../components/task';
import {TaskEdit} from '../components/task-edit';
import {render, Position} from '../utils';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class TaskController {
  constructor(container, data, mode, onChangeView, onDataChange) {
    this._container = container;

    this._data = data;
    this._taskView = new Task(this._data);
    this._taskEdit = new TaskEdit(this._data);

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.create(mode);

  }

  create(mode) {
    let renderPosition = Position.BEFOREEND;
    let currentView = this._taskView;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._taskEdit;
    }

    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.dueDate,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (mode === Mode.DEFAULT) {
          if (this._container.contains(this._taskEdit.getElement())) {
            this._container.replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
          }
        } else if (mode === Mode.ADDING) {
          this._container.removeChild(currentView.getElement());

          // Захотели создать карточку, но не стали ее сохранять
          this._onDataChange(null, null);
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskView.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
      this._container.replaceChild(this._taskEdit.getElement(), this._taskView.getElement());

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit
    .getElement()
    .querySelector(`.card__form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._container.replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    });

    this._taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));

      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        })
      };

      this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      this._onDataChange(null, this._data);
    });

    render(this._container, currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.contains(this._taskEdit.getElement())) {
      this._container.replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}
