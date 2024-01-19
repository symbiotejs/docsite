import { Symbiote, html } from './lib.js';

const ICONS = {
  reload: 'M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z',
  ext: 'M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z',
};

class IconUi extends Symbiote {
  init$ = {
    name: 'reload',
    '+path': () => {
      return ICONS[this.$.name];
    },
  }
}

IconUi.template = html`<svg 
  viewBox="0 0 24 24" 
  xmlns="http://www.w3.org/2000/svg">
  <path ${{'@d': '+path'}}></path>
</svg>`;

IconUi.bindAttributes({
  name: 'name',
});

IconUi.reg('icon-ui');

export default IconUi;