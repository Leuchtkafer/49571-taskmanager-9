export const makeFilter = (filters, isChecked = false, isDisabled = false) =>
  `<section class="main__filter filter container">
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
