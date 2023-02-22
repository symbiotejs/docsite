import { NAV } from '../data/nav.js';
import logo from '../svg/logo/index.svg.js';

let menuHtml = '';
for (let section in NAV) {
  let desc = NAV[section];
  menuHtml += /*html*/ `<a href="${desc.link}">${desc.menuItem}</a>`;
}

export default /*html*/ `
<div logo>
  ${logo(60)}
</div>
<menu>${menuHtml}</menu>
`;