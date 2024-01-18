import { html } from './lib.js';

export default html`
<div editors>
  <div toolbar ${{onclick: 'onTab'}}>
    <a href="./" logo><img height="32" width="32" src="./svg/logo/index.svg" alt="Symbiote.js"></a>
    <button tab="htm" ref="htmTab">HTML</button>
    <button tab="js" current ref="jsTab">JS</button>
    <button tab="css" ref="cssTab">CSS</button>
    <button ${{onclick: 'onSourceReload'}}>Reload</button>
  </div>
  <div code ref="htm"></div>
  <div code current ref="js"></div>
  <div code ref="css"></div>
  <div ref="scrollTo">&nbsp;</div>
</div>

<div viewport>
  <div toolbar>
    <button ${{onclick: 'onReload'}}>Reload</button>
    <button ${{onclick: 'openSeparate'}}>Open in new tab ↗</button>
  </div>
  <iframe ${{'@src': 'resultUrl'}}></iframe>
</div>
`;
