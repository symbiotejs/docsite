import Symbiote, { html } from '@symbiotejs/symbiote';

// App Icons (SVG path map):
const ICONS = {
  star: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  ok: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
};

// Icon component:
class IconSvg extends Symbiote {
  init$ = {
    '@name': 'star',
    '+path': () => {
      return ICONS[this.$['@name']];
    },
  }
}

IconSvg.template = html`
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path ${{'@d': '+path'}}></path>
  </svg>
`;

IconSvg.reg('icon-svg');

// Application component:
class MyApp extends Symbiote {}

MyApp.template = /*html*/ `
  <h1><icon-svg name="star"></icon-svg> Heading</h1>
  <button><icon-svg name="ok"></icon-svg> Ok</button>
`;

MyApp.reg('my-app');