import Symbiote from 'symbiote';

// Direct template rendering form a string:

const HTML = '<div>{{text}}</div>';

class MyApp extends Symbiote {

  init$ = {
    text: 'Hello world!',
  }

  initCallback() {
    this.render(HTML, true);
  }

}

MyApp.reg('my-app');