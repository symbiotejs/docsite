import head from './head.htm.js';
import header from './header.htm.js';
import footer from './footer.htm.js';
import { md2html } from '../../lib/processMarkdown.js';
import CFG from '../../project.cfg.js';

let homeMd = await (await fetch('https://raw.githubusercontent.com/symbiotejs/symbiote.js/main/README.md')).text();
let homeHtml = await md2html(homeMd);
let exampleAppPath = `https://esm.sh/@uploadcare/blocks@${CFG.uploaderExampleVersion}/solutions/file-uploader/regular/?bundle`;
let exampleAppCssPath = './css/uploader/index.css';

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
${head('./')}
<body>
  <data-nav-point location="home" hidden></data-nav-point>
  <script src="${exampleAppPath}" type="module"></script>
  <header>${header}</header>
  <main>
    <column-el>
      <promo-el use-bg>
        <div promo>
          <div>Light</div>
          <div>Fast</div>
          <div>Modern</div>
          <div>Flexible</div>
          <div>Powerful</div>
        </div>
        <div example center>
          <div>Symbiote.js application example</div>
          <div>File uploader widget</div>
          <div>↓</div>
          <div>&nbsp;</div>
          <lr-file-uploader-regular css-src="${exampleAppCssPath}"></lr-file-uploader-regular>
          <div>&nbsp;</div>
          <div>↑</div>
          <div>Powered by</div>
          <div><a href="https://uploadcare.com/">Uploadcare &copy;</a></div>
        </div>
      </promo-el>
      <article>${homeHtml}</article>
    </column-el>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;