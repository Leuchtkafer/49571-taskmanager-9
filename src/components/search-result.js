import {AbstractComponent} from './absctract-component';

export class SearchResult extends AbstractComponent {
  getTemplate() {
    return `<section class="result container">
      <button class="result__back">back</button>
    </section>`;
  }
}
