import { BaseComponent } from 'https://symbiotejs.github.io/symbiote.js/core/BaseComponent.js';
import { AppRouter } from 'https://symbiotejs.github.io/symbiote.js/core/AppRouter.js';
import marked from './libs/marked.js';
import { clrz } from './libs/clrz.js';

AppRouter.createRouterData('R', {
  home: {
    default: true,
    md: 'https://symbiotejs.github.io/symbiote.js/README.md',
  },
  templates: {
    md: './md/Templates.md',
  },
  lifecycle: {
    md: './md/Lifecycle.md',
  },
  context: {
    md: './md/Component_data_context.md',
  },
  attributes: {
    md: './md/Attribute_binding.md',
  },
  extending: {
    md: './md/Extending.md',
  },
  naming: {
    md: './md/Naming_collisions.md',
  },
  error: {
    isError: true,
  },
});

class MdSection extends BaseComponent {
  init$ = {
    mdHtml: '',
  }

  set md(mdPath) {
    window.fetch(mdPath).then(async (resp) => {
      let mdTxt = await resp.text();
      this.$.mdHtml = marked(mdTxt);
      [...this.ref.md.querySelectorAll('code')].forEach((code) => {
        code.innerHTML = clrz(code.textContent);
      });
    });
  }
}

MdSection.template = /*html*/ `
<div ref="md" class="md" set="innerHTML: mdHtml"></div>
`;
MdSection.reg('md-section');

class AppShell extends BaseComponent {
  init$ = {
    navClicked: (e) => {
      e.preventDefault();
      // @ts-ignore
      let route = e.target.getAttribute('href').replace('?', '');
      if (route) {
        AppRouter.applyRoute(route);
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
        });
        this._routeMap[route] = md;
        window.requestAnimationFrame(() => {
          md.scrollIntoView({
            behavior: 'smooth',
          });
        });
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
  </div> 
</nav>
<div class="vid">ఠ</div>
`;

AppShell.reg('app-shell');