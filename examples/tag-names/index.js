import Symbiote from '@symbiotejs/symbiote';

class Com1 extends Symbiote {}
Com1.template = `<button>Component 1</button>`;

class Com2 extends Symbiote {}
Com2.template = `<button>Component 2</button>`;

class MyApp extends Symbiote {}
MyApp.template = `
  <${Com1.is}></${Com1.is}>
  <${Com2.is}></${Com2.is}>
`;

MyApp.reg('my-app');