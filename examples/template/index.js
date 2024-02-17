import Symbiote from '@symbiotejs/symbiote';

// Direct template rendering form a string:

const HTML = '<h2>{{text}}</h2>';

class MyApp extends Symbiote {

  init$ = {
    text: 'Hello world!',
  }

  initCallback() {
    this.render(HTML);
  }

}

MyApp.reg('my-app');