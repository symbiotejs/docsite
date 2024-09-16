import { NAV } from '../data/nav.js';

let menuHtml = '';
for (let section in NAV) {
  let desc = NAV[section];
  menuHtml += /*html*/ `<a href="${desc.link}">${desc.menuItem}</a>`;
}

export default /*html*/ `
<a href="./">
  <div logo><img width="60" src="../svg/logo/index.svg"></div>
</a>
<menu>${menuHtml}</menu>
`;