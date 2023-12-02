import logo from '../../svg/logo/index.svg.js';

let items = [
  'Get started',
  'Templates',
  'List items',
  'Lifecycle',
  'Properties',
  'Attributes',
  'Context',
  'Styling',
  'Routing',
  'Types',
  'Tips & Tricks',
];

/**
 * 
 * @param {Number} currentIdx 
 * @returns 
 */
export default function menu(currentIdx) {
  return /*html*/ `
<nav>
  <a href="./"><div logo>${logo(90)}</div></a>
  ${items.map((fName, idx) => {
    return /*html*/ `<a ${idx === currentIdx ? 'current ': ''}sub href="./2x/docs/${fName.replaceAll(' ', '_')}/">${fName}</a>`;
  }).join('')}
</nav>
  `;
} 