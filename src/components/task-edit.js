import {AbstractComponent} from './absctract-component.js';

export class TaskEdit extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive, isDate}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite || false;
    this._isArchive = isArchive || false;
    this._isRepeat = Object.values(this._repeatingDays).some((it) => it) || null;
    this._isDate = isDate;
    this._subscribeOnEvents();
  }

  _getColors() {
    return [`black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`];
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${this._isRepeat ? `card--repeat` : ``}">
          <form class="card__form" method="get">
            <div class="card__inner">
              <div class="card__control">
                 <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                <button type="button" class="card__btn archive ${this._isArchive ? `card__btn--archive` : ``}">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites card__btn--disabled"
                >
                  favorites
                </button>
              </div>
  
              <div class="card__color-bar">
                <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>
  
              <div class="card__textarea-wrap">
                <label>
                  <textarea
                    class="card__text"
                    placeholder="Start typing your text here..."
                    name="text"
                  >${this._description}</textarea>
                </label>
              </div>
  
              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates">
                    <button class="card__date-deadline-toggle" type="button">
                      date: 
                      <span class="card__date-status">${this._isDate ? `yes` : `no`}</span>
                    </button>
  
                    <fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder=""
                          name="date"
                          value="${this._dueDate.toDateString()}"
                        />
                      </label>
                    </fieldset>
  
                    <button class="card__repeat-toggle" type="button">
                      repeat:<span class="card__repeat-status">${this._isRepeat ? `yes` : `no`}</span>
                    </button>
  
                    <fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${Object.keys(this._repeatingDays).map((day) => (`
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${day}-4"
                            name="repeat"
                            value="${day}"
                            ${this._repeatingDays[day] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-${day}-4"
                            >${day}</label
                          >
                        `)).join(``)}
                      </div>
                    </fieldset>
                  </div>
  
                  <div class="card__hashtag">
                    <div class="card__hashtag-list">
                      ${(Array.from(this._tags).map((tag) => (`
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input" 
                          />
                          <p class="card__hashtag-name">
                           #${tag}
                          </p>
                        <button type="button" class="card__hashtag-name">#${tag}</button>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`.trim()))).join(``)}
                    </div>
  
                    <label>
                      <input
                        type="text"
                        class="card__hashtag-input"
                        name="hashtag-input"
                        placeholder="Type new hashtag here"
                      />
                    </label>
                  </div>
                </div>
  
                <div class="card__colors-inner">
                  <h3 class="card__colors-title">Color</h3>
                  <div class="card__colors-wrap">
                      ${this._getColors().map((color) => `<input
                        type="radio"
                        id="color-${color}-4"
                        class="card__color-input card__color-input--${color} visually-hidden"
                        name="color"
                        value="${color}"
                        ${(color === this._color) ? `checked` : ``}
                      />
                      <label
                        for="color-${color}-4"
                        class="card__color card__color--${color}"
                        >yellow</label
                      >`).join(``)}
                  </div>
                </div>
              </div>
  
              <div class="card__status-btns">
                <button class="card__save" type="submit">save</button>
                <button class="card__delete" type="button">delete</button>
              </div>
            </div>
          </form>
        </article>`;
  }

  // _changeColoronWave() {
  //   this.getElement()
  //   .querySelectorAll(`.card__color-input`).forEach((element) => {
  //     const cardEdit = this.getElement();
  //     console.log(1, cardEdit);
  //     element.addEventListener(`click`, (evt) => {
  //       cardEdit.classList.add(`card--${evt.target.defaultValue}`);
  //       console.log(23, evt.target.defaultValue);
  //     });
  //   });
  // }

  _subscribeOnEvents() {
    this.getElement()
    .querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        this.getElement().querySelector(`.card__hashtag-list`).insertAdjacentHTML(`beforeend`, `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`);
        evt.target.value = ``;
      }
    });

    this.getElement()
    .querySelectorAll(`.card__hashtag-delete`).forEach((element) => {
      element.addEventListener(`click`, () => {
        this.getElement().querySelector(`.card__hashtag-inner`).remove();
      });
    });

    this.getElement().querySelector(`.card__colors-wrap`).addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`card__color-input`)) {
        return;
      }
      this.getElement().classList.remove(`card--${this._color}`);
      this._color = evt.target.value;
      this.getElement().classList.add(`card--${evt.target.value}`);
    });

    this.getElement()
    .querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, (evt) => {
      const dateStatus = this.getElement().querySelector(`.card__date-status`);
      const dateDeadline = this.getElement().querySelector(`.card__date-deadline`);
      const dateInput = this.getElement().querySelector(`.card__date`);
      if (evt.target.firstElementChild.innerHTML === `yes`) {
        dateStatus.textContent = `no`;
        dateInput.value = ``;
        dateDeadline.classList.add(`visually-hidden`);
      } else {
        dateStatus.textContent = `yes`;
        dateDeadline.classList.remove(`visually-hidden`);
      }
    });

    this.getElement()
    .querySelector(`.card__repeat-toggle`).addEventListener(`click`, (evt) => {
      const repeatStatus = this.getElement().querySelector(`.card__repeat-status`);
      const repeatDays = this.getElement().querySelector(`.card__repeat-days`);
      if (evt.target.firstElementChild.innerHTML === `yes`) {
        repeatStatus.textContent = `no`;
        repeatDays.classList.add(`visually-hidden`);
      } else {
        repeatStatus.textContent = `yes`;
        repeatDays.classList.remove(`visually-hidden`);
      }
    });
  }
}

