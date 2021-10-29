// @ts-nocheck

import { BaseComponent } from 'https://symbiotejs.github.io/symbiote.js/core/BaseComponent.js';
import { AppRouter } from 'https://symbiotejs.github.io/symbiote.js/core/AppRouter.js';
import marked from './libs/marked.js';
import { clrz } from './libs/clrz.js';

AppRouter.createRouterData('R', {
  home: {
    default: true,
    title: 'Symbiఠte.js',
    md: 'https://symbiotejs.github.io/symbiote.js/README.md',
    gh: 'https://github.com/symbiotejs/symbiote.js/blob/main/README.md',
  },
  templates: {
    title: 'Symbiఠte.js | Templates',
    md: './md/Templates.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Templates.md',
  },
  lifecycle: {
    title: 'Symbiఠte.js | Lifecycle',
    md: './md/Lifecycle.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Lifecycle.md',
  },
  context: {
    title: 'Symbiఠte.js | Data context',
    md: './md/Component_data_context.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Component_data_context.md',
  },
  attributes: {
    title: 'Symbiఠte.js | Attributes',
    md: './md/Attribute_binding.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Attribute_binding.md',
  },
  extending: {
    title: 'Symbiఠte.js | Extending',
    md: './md/Extending.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Extending.md',
  },
  naming: {
    title: 'Symbiఠte.js | Naming',
    md: './md/Naming_collisions.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Naming_collisions.md',
  },
  error: {
    title: 'Ups...',
    isError: true,
  },
});

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
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
    </svg>
    <a set="@href: ghPath; textContent: ghPath" target="_blank"></a>
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
<nav set="onclick: navClicked">
  <div class="inner">
    <a href="?home">Symbiఠte.js</a>
    <a href="?templates">Templates</a>
    <a href="?lifecycle">Lifecycle</a>
    <a href="?context">Data context</a>
    <a href="?attributes">Attributes</a>
    <a href="?extending">Extending</a>
    <a href="?naming">Naming</a>
    <a href="https://github.com/symbiotejs/symbiote.js" target="_blank">GitHub</a>
  </div> 
</nav>
<div class="vid">ఠ</div>
`;

AppShell.reg('app-shell');