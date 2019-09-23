import {AbstractComponent} from './absctract-component.js';

export class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._onFilter = this._onFilter.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  getTemplate() {
    return `<section class="main__filter filter container">
    ${this._filters.map(({title, count}) => `<input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${title === `All` ? `checked` : ``}
    ${count > 0 ? `` : `disabled`}
    />
    <label for="filter__${title}" class="filter__label"
      >${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
    >`).join(``)}
    </section>`.trim();
  }
}
