import { md2html } from '../../../lib/processMarkdown.js';

let closeBtn = /*html*/ `<div close-panel><a href="#home" close>Close [x]</a></div>`;

/**
 * 
 * @param {String} path 
 */
async function md(path) {
  let mdTxt = (await import(path)).default;
  return await md2html(mdTxt);
}

export default /*html*/ `
<section id="new">
  ${closeBtn}
  <section-inner>${await md('../md/new.md.js')}</section-inner>
</section>

<section id="philosophy">
  ${closeBtn}
  <section-inner clr-5>${await md('../md/philosophy.md.js')}</section-inner>
</section>

<section id="live">
  ${closeBtn}
  <section-inner clr-2>${await md('../md/live.md.js')}</section-inner>
</section>

<section id="biome">
  ${closeBtn}
  <section-inner>${await md('../md/biome.md.js')}</section-inner>
</section>

<section id="community">
  ${closeBtn}
  <section-inner>${await md('../md/community.md.js')}</section-inner>
</section>

<section id="sponsorship">
  ${closeBtn}
  <section-inner>${await md('../md/sponsorship.md.js')}</section-inner>
</section>

<section id="solution">
  ${closeBtn}
  <section-inner>${await md('../md/solution.md.js')}</section-inner>
</section>
`;