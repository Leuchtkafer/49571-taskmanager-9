import {createElement} from '../utils.js';

export class AbstractComponent {
  constructor() {
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
  removeElement() {
    this._element = null;
  }
}
