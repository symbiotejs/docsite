import Symbiote from 'symbiote';

// App Icons (SVG path map):
const ICON_SET = {
  star: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  ok: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
};

// SVG template:
function getSvg(iconName) {
  return `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="${ICON_SET[iconName] || ICON_SET.star}"></path>
    </svg>
  `.trim();
}

// Application Base class with "icon" attribute support:
class AppBase extends Symbiote {
  constructor() {
    super();
    this.addTemplateProcessor((/** @type {DocumentFragment} */ fr) => {
      [...fr.querySelectorAll('[icon]')].forEach((el) => {
        let iconKey = el.getAttribute('icon');
        let icon = document.createElement('icon-el');
        icon.innerHTML = getSvg(iconKey);
        el.prepend(icon);
      });
    });
  }
}

// Application component:
class MyCom extends AppBase {}

MyCom.template = `
  <h1 icon="star">Header</h1>
  <button icon="ok">Button</button>
`;

MyCom.reg('my-com');