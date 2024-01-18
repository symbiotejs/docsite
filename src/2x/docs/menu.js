import logo from '../../svg/logo/index.svg.js';

let items = [
  'Get started',
  'Templates',
  'Properties',
  'Context',
  'List items',
  'Flags',
  'Lifecycle',
  'Attributes',
  'PubSub',
  'Styling',
  'Routing',
  // 'Types',
  // 'Tips & Tricks',
];

/**
 * 
 * @param {String} menuItem 
 * @returns 
 */
export default function menu(menuItem) {
  return /*html*/ `
<nav>
  <a href="./"><div logo>${logo(90)}</div></a>
  ${items.map((fName) => {
    return /*html*/ `<a ${fName === menuItem ? 'current ': ''}sub href="./2x/docs/${fName.replaceAll(' ', '_')}/">${fName}</a>`;
  }).join('')}
</nav>
  `;
} 