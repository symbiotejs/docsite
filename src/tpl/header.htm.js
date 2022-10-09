import { NAV } from '../data/nav.js';
import logoMin from '../svg/logo-min/index.svg.js';

let menuHtml = '';
for (let section in NAV) {
  let desc = NAV[section];
  menuHtml += /*html*/ `<a href="${desc.link}">${desc.menuItem}</a>`;
}

export default /*html*/ `
${logoMin}
<menu>${menuHtml}</menu>
`;