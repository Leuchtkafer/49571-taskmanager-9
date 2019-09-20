import {AbstractComponent} from './absctract-component.js';
import {filters} from '../data/data.js';

export class Filter extends AbstractComponent {
  getTemplate(isChecked = false, isDisabled = false) {
    return `<section class="main__filter filter container">
    ${filters.map((filter) => (
    `<input 
      type="radio" 
      id="filter__${filter.title}" 
      class="filter__input visually-hidden" 
      name="filter" 
      ${isChecked ? ` checked` : ``} 
      ${isDisabled || filter.amount <= 0 ? ` disabled` : ``} 
    >
    <label for="filter__${filter.title}" class="filter__label">
      ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span>
    </label>`.trim())).join(``)}
  </section>`;
  }
}
