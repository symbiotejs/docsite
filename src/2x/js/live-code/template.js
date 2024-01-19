import { html } from './lib.js';
import icon from './icon.js';

export default html`
<div editors>
  <div toolbar ${{onclick: 'onTab'}}>
    <a href="./" logo><img height="32" width="32" src="./svg/logo/index.svg" alt="Symbiote.js"></a>
    <button ${{onclick: 'onSourceReload'}} title="Reload source code"><icon-ui name="reload"></icon-ui></button>
    <button tab="htm" ref="htmTab">HTML</button>
    <button tab="js" current ref="jsTab">JS</button>
    <button tab="css" ref="cssTab">CSS</button>
  </div>
  <div code ref="htm"></div>
  <div code current ref="js"></div>
  <div code ref="css"></div>
  <div ref="scrollTo">&nbsp;</div>
</div>

<div viewport>
  <div toolbar>
    <button ${{onclick: 'onReload'}}  title="Reload document"><icon-ui name="reload"></icon-ui></button>
    <button ${{onclick: 'openSeparate'}} title="Open in new tab"><icon-ui name="ext"></icon-ui></button>
  </div>
  <iframe ${{'@src': 'resultUrl'}}></iframe>
</div>
`;
