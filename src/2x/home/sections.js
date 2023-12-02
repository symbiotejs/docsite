import { md } from '../../../lib/index.js';

let closeBtn = /*html*/ `<div close-panel><a href="#home" close>Close [x]</a></div>`;

export default /*html*/ `
<section id="new">
  ${closeBtn}
  <section-inner>${await md('../src/2x/md/new.md.js')}</section-inner>
</section>

<section id="philosophy">
  ${closeBtn}
  <section-inner clr-5>${await md('../src/2x/md/philosophy.md.js')}</section-inner>
</section>

<section id="live">
  ${closeBtn}
  <section-inner clr-2>${await md('../src/2x/md/live.md.js')}</section-inner>
</section>

<section id="biome">
  ${closeBtn}
  <section-inner>${await md('../src/2x/md/biome.md.js')}</section-inner>
</section>

<section id="community">
  ${closeBtn}
  <section-inner>${await md('../src/2x/md/community.md.js')}</section-inner>
</section>

<section id="sponsorship">
  ${closeBtn}
  <section-inner clr-3>${await md('../src/2x/md/sponsorship.md.js')}</section-inner>
</section>

<section id="solution">
  ${closeBtn}
  <section-inner>${await md('../src/2x/md/solution.md.js')}</section-inner>
</section>
`;