import Symbiote, { applyStyles } from '@symbiotejs/symbiote';

const styles = {
  host: {
    'display': 'inline-block',
    'padding': '20px',
    'border': '1px solid currentColor',
  },
  first_name: {
    'color': '#f00',
    'font-size': '20px',
  },
  last_name: {
    'color': '#00f',
    'font-size': '18px',
  },
};

class StyledComponent extends Symbiote {

  constructor() {
    super(); 

    this.addTemplateProcessor((fr) => {
      /** @type {HTMLElement[]} */
      let cssElArr = [...fr.querySelectorAll('[css]')];
      cssElArr.forEach((el) => {
        let cssName = el.getAttribute('css');
        applyStyles(el, styles[cssName]);
      });
    });

    applyStyles(this, styles.host);
  }
}

class MyApp extends StyledComponent {}

MyApp.template = `
  <div css="first_name">{{firstName}}</div>
  <div css="last_name">{{lastName}}</div>
`;

MyApp.bindAttributes({
  'first-name': 'firstName',
  'last-name': 'lastName',
});

MyApp.reg('my-app');