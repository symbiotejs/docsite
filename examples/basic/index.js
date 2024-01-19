import Symbiote, { html } from '@symbiotejs/symbiote';

class MyComponent extends Symbiote {
  init$ = {
    count: 0,
    increment: () => {
      this.$.count++;
    },
  }
}

MyComponent.template = html`
  <h2>{{count}}</h2>
  <button ${{onclick: 'increment'}}>Click me!</button>
`;

MyComponent.reg('my-component');