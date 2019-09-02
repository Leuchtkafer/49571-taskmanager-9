import {AbstractComponent} from './absctract-component.js';

export class ButtonMore extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
