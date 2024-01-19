import Symbiote, { html } from '@symbiotejs/symbiote';

class MyApp extends Symbiote {

  init$ = {
    localCtxProp: 'LOCAL',
    attributeProp: 'Initial value...',
    'X/namedCtxProp': 'NAMED',
    '*sharedCtxProp': 'SHARED',

    onUpdate: () => {
      let updStr = ' updated... ';
      this.$.localCtxProp += updStr;
      this.$.attributeProp += updStr;
      this.$['X/namedCtxProp'] += updStr;
      this.$['*sharedCtxProp'] += updStr;
    },
  };

}

MyApp.template = html`
  <div>{{localCtxProp}}</div>
  <div>{{attributeProp}}</div>
  <div>{{X/namedCtxProp}}</div>
  <div>{{*sharedCtxProp}}</div>
  <button ${{onclick: 'onUpdate'}}>Update</button>
`;

MyApp.bindAttributes({
  'attr-test': 'attributeProp',
});

MyApp.reg('my-app');