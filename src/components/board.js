import {AbstractComponent} from './absctract-component.js';

export class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
