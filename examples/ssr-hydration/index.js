import Symbiote from '@symbiotejs/symbiote';

class MyApp extends Symbiote {
  ssrMode = true;

  init$ = {
    heading: 'Some heading after hydration',
    text: 'Some text after hydration...',

    onUpdate: () => {
      this.notify('heading');
      this.notify('text');
    },
  }

}

MyApp.reg('my-app');