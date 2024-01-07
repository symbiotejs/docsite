import Symbiote from 'symbiote';

class MyApp extends Symbiote {
  processInnerHtml = true;

  init$ = {
    heading: 'Some heading after hydration',
    text: 'Some text after hydration...',

    onUpdate: () => {
      alert('Hello Symbiote.js!');
    },
  }

}

MyApp.reg('my-app');