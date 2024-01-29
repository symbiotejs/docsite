// First, get polyfill to make customizable built-in elements work in Safari:
import {} from 'https://cdn.jsdelivr.net/npm/@ungap/custom-elements/+esm';
import Symbiote, { html, css } from '@symbiotejs/symbiote';

// Create custom <option> element class:
class OptItem extends HTMLOptionElement {
  // You can add some custom logic here:
  set text(val) {
    super.textContent = val;
  }
}
window.customElements.define('option-item', OptItem, { extends: 'option'});

class MyApp extends Symbiote {

  init$ = {
    options: [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' },
    ],
    selectedValue: '1',
  
    onChange: (e) => {
      this.$.selectedValue = e.target.value;
    },
  };

}

MyApp.template = html`
  <h3>Selected value: {{selectedValue}}</h3>

  <select ${{ 
    onchange: 'onChange', 
    itemize: 'options',
    // This will create an <option> tags for the list items:
    'item-tag': 'option-item',
   }}></select>
`;

MyApp.reg('my-app');
