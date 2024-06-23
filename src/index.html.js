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

  <a href="#new">
    <card-el triple>
      <div>
        <h2>Symbiote.js 2.3.x is out now!</h2>
        <h3>What's new?</h3>
      </div>
    </card-el>
  </a>

  <a href="./2x/docs/Get_started/">
    <card-el clr-2>Docs</card-el>
  </a>

  <a href="#philosophy">
    <card-el clr-5>Philosophy</card-el>
  </a>
  
  <a href="#live">
    <card-el double clr-2>Live example</card-el>
  </a>
  
  <a href="#playground">
    <card-el clr-4>Playground</card-el>
  </a>

  <a href="#biome">
    <card-el>Biome</card-el>
  </a>

  <a href="https://chat.openai.com/g/g-7GbkxAPqG-symbiote-ai"  target="_blank">
    <card-el double clr-5>Symbiote AI  →</card-el>
  </a>

  <a href="#community">
    <card-el>Community</card-el>
  </a>

  <a href="#sponsorship">
    <card-el double clr-3>Sponsorship</card-el>
  </a>

  <a href="https://rnd-pro.com/" target="_blank">
    <card-el triple>Request solution</card-el>
  </a>

  <a href="./1x/" target="_blank">
    <card-el>Go to 1.x →</card-el>
  </a>

  <a href="https://github.com/symbiotejs/symbiote.js" target="_blank">
    <card-el clr-2>GitHub →</card-el>
  </a>

  ${sections}
</body>
</html>`;
