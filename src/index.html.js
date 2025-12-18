import head from './2x/tpl/head.htm.js';
import sections from './2x/home/sections.js';

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
${head(undefined, '<script src="./2x/js/index.js" type="module"></script>')}
<body>
  <card-el clr-1 logo>
    <img src="./svg/logo/index.svg" alt="Symbiote.js">
  </card-el>

  <a href="https://rnd-pro.com/symbiote/">
    <card-el triple clr-1>
      <div>
        <h2>⚠️ This site is deprecated and no longer updated.</h2>
        <h3>Please go to our new site instead</h3>
        <h3>rnd-pro.com/symbiote</h3>
      </div>
    </card-el>
  </a>

  <a href="./1x/" target="_blank">
    <card-el clr-2 double>1.x version docs →</card-el>
  </a>

</body>
</html>`;
