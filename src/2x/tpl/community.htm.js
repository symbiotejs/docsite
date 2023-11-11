import head from './head.htm.js';
import header from './header.htm.js';
import footer from './footer.htm.js';
import fs from 'fs';
import { md2html } from '../../../lib/processMarkdown.js';

let comMd = fs.readFileSync('./src/1x/md/Community.md').toString();
let comHtml = await md2html(comMd);

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
${head('../')}
<body>
  <data-nav-point location="community" hidden></data-nav-point>
  <header>${header}</header>
  <main>
    <column-el>
      <article>${comHtml}</article>
    </column-el>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;