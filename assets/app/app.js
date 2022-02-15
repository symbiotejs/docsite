// @ts-nocheck

import { BaseComponent, AppRouter } from 'https://unpkg.com/@symbiotejs/symbiote@1.4.7/build/symbiote.min.js';
import marked from './libs/marked.js';
import { clrz } from './libs/clrz.js';
import { SITE_STRUCT } from './struct.js';
import { SVG_LOGO, SVG_GH } from './svg.js';

AppRouter.createRouterData('R', SITE_STRUCT);

class MdSection extends BaseComponent {
  init$ = {
    mdPath: '',
    ghPath: '',
    mdHtml: '',
  }

  set md(mdPath) {
    this.$.mdPath = mdPath;
    window.fetch(mdPath).then(async (resp) => {
      let mdTxt = await resp.text();
      this.$.mdHtml = marked(mdTxt);
      [...this.ref.md.querySelectorAll('code')].forEach((code) => {
        code.innerHTML = clrz(code.textContent);
      });
      window.requestAnimationFrame(() => {
        this.scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }

  set gh(ghPath) {
    this.$.ghPath = ghPath;
  }
}

MdSection.template = /*html*/ `
<div class="wrapper">
  <div class="heading">
    ${SVG_GH}
    <a set="@href: ghPath;" target="_blank">{{ghPath}}</a>
  </div>
  <div ref="md" class="md" set="innerHTML: mdHtml"></div>
</div>
`;
MdSection.reg('md-section');

class AppShell extends BaseComponent {
  init$ = {
    navClicked: (e) => {
      let a = e.target.closest('a:not([target])');
      if (a) {
        e.preventDefault();
        let route = a.getAttribute('href')?.replace('?', '');
        if (route) {
          AppRouter.applyRoute(route);
        }
      } 
    },
  }

  initCallback() {
    this._routeMap = Object.create(null);

    this.sub('R/route', (route) => {
      if (!this._routeMap[route]) {
        let md = new MdSection();
        this.appendChild(md);
        window.setTimeout(() => {
          md.md = this.$['R/options'].md;
          md.gh = this.$['R/options'].gh;
        });
        this._routeMap[route] = md;
      } else {
        this._routeMap[route].scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }
}

AppShell.template = /*html*/ `
<nav set="onclick: navClicked" tabindex="0">
  <div class="inner">${Object.keys(SITE_STRUCT).map((item) => {
      return SITE_STRUCT[item].menu ? /*html*/ `<a href="?${item}">${SITE_STRUCT[item].menu}</a>` : '';
    }).join('')}
    <a href="https://github.com/symbiotejs/symbiote.js" target="_blank">GitHub</a>
  </div>
</nav>
<div class="vid">${SVG_LOGO}</div>
`;

AppShell.reg('app-shell');