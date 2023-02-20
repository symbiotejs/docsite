import { DOCS } from '../data/nav.js';
import head from './head.htm.js';
import header from './header.htm.js';
import footer from './footer.htm.js';

let menuHtml = '';

DOCS.forEach((docDesc) => {
  menuHtml += /*html*/ `<a href="${docDesc.link}">${docDesc.menuItem}</a>`;
});

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
${head('../')}
<body>
  <data-nav-point location="docs" hidden></data-nav-point>
  <header>${header}</header>
  <main>
    <nav>${menuHtml}</nav>
    <article>{{CONTENT}}</article>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;
