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
  <a href="./"><div logo><img width="90" src="./svg/logo/index.svg"></div></a>
  ${items.map((fName) => {
    return /*html*/ `<a ${fName === menuItem ? 'current ': ''}sub href="./2x/docs/${fName.replaceAll(' ', '_')}/">${fName}</a>`;
  }).join('')}
</nav>
  `;
} 