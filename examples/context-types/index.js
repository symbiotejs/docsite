import Symbiote, { html } from 'symbiote';

class MyApp extends Symbiote {

  init$ = {
    first: 'FIRST',
    attr: '',
    '*second': 'SECOND',
    'myctx/third': 'THIRD',
    onClick: () => {
      this.$.first = Date.now();
    },
  };

}

MyApp.template = html`
  <div ${{onclick: 'onClick'}}>{{first}}</div>
  <div>{{attr}}</div>
  <div>{{*second}}</div>
  <div>{{myctx/third}}</div>
`;

MyApp.bindAttributes({
  'attr-test': 'attr',
});

MyApp.reg('my-app');