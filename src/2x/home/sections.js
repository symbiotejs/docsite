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

<section id="playground">
  ${closeBtn}
  <section-inner clr-4>
    <h2>Basics</h2>
    <ul>
      <li><a href="./2x/playground/basic/" target="_blank">Basic example</a></li>
      <li><a href="./2x/playground/tag-names/" target="_blank">Tag names</a></li>
    </ul>

    <h2>Templates</h2>
    <ul>
      <li><a href="./2x/playground/template/" target="_blank">Manual template rendering</a></li>
      <li><a href="./2x/playground/template-processor/" target="_blank">Template processor</a></li>
      <li><a href="./2x/playground/external-template/" target="_blank">External template</a></li>
    </ul>

    <h2>Data contexts</h2>
    <ul>
      <li><a href="./2x/playground/data-context/" target="_blank">Data context</a></li>
      <li><a href="./2x/playground/context-types/" target="_blank">Context types</a></li>
      <li><a href="./2x/playground/css-data/" target="_blank">CSS Data</a></li>
    </ul>

    <h2>Lists</h2>
    <ul>
      <li><a href="./2x/playground/dynamic-list/" target="_blank">Dynamic list rendering</a></li>
      <li><a href="./2x/playground/list/" target="_blank">Alternative list rendering</a></li>
      <li><a href="./2x/playground/nested-list/" target="_blank">Nested list</a></li>
    </ul>

    <h2>Misc</h2>
    <ul>
      <li><a href="./2x/playground/l10n/" target="_blank">Localization</a></li>
      <li><a href="./2x/playground/ssr-hydration/" target="_blank">SSR + hydration</a></li>
      <!-- <li><a href="./2x/playground/ssr-css/" target="_blank">SSR + CSS Data</a></li> -->
    </ul>
  </section-inner>
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