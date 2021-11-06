// @ts-nocheck

import { BaseComponent } from 'https://symbiotejs.github.io/symbiote.js/core/BaseComponent.js';
import { AppRouter } from 'https://symbiotejs.github.io/symbiote.js/core/AppRouter.js';
import marked from './libs/marked.js';
import { clrz } from './libs/clrz.js';

AppRouter.createRouterData('R', {
  home: {
    default: true,
    title: 'Symbiote.js',
    md: 'https://symbiotejs.github.io/symbiote.js/README.md',
    gh: 'https://github.com/symbiotejs/symbiote.js/blob/main/README.md',
  },
  installation: {
    title: 'Symbiote.js | Installation',
    md: './md/Installation.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Installation.md',
  },
  templates: {
    title: 'Symbiote.js | Templates',
    md: './md/Templates.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Templates.md',
  },
  lifecycle: {
    title: 'Symbiote.js | Lifecycle',
    md: './md/Lifecycle.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Lifecycle.md',
  },
  context: {
    title: 'Symbiote.js | Data context',
    md: './md/Component_data_context.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Component_data_context.md',
  },
  attributes: {
    title: 'Symbiote.js | Attributes',
    md: './md/Attribute_binding.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Attribute_binding.md',
  },
  extending: {
    title: 'Symbiote.js | Extending',
    md: './md/Extending.md',
    gh: 'https://github.com/symbiotejs/docsite/blob/main/md/Extending.md',
  },
  naming: {
    title: 'Symbiote.js | Naming',
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
<nav set="onclick: navClicked" tabindex="0">
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
<div class="vid">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1000"
    height="1000"
    viewBox="0 0 1000 1000">
      <path
        style="fill:currentColor;"
        d="M 500 0 A 500 500 0 0 0 0 500 A 500 500 0 0 0 500 1000 A 500 500 0 0 0 1000 500 A 500 500 0 0 0 500 0 z M 499.19336 73.65625 L 500 73.65625 C 553.5395 73.65625 606.56361 83.280711 656.47266 101.99023 C 678.21673 109.43289 665.83203 130.49219 665.83203 130.49219 C 638.83942 180.29775 609.61033 230.4172 550.09375 284.78906 C 530.64026 299.92437 511.99837 307.49414 494.16602 307.49414 C 482.81817 307.49414 471.47091 301.916 460.12305 290.76367 C 448.77519 279.21304 437.22383 262.08773 425.4707 239.38477 C 413.31226 217.0801 400.54615 200.34961 387.17188 189.19727 C 374.20289 177.64661 360.62623 171.87305 346.44141 171.87305 C 329.82489 171.87305 317.26089 176.05371 308.75 184.41797 C 300.64439 192.38392 296.5918 204.53314 296.5918 220.86328 C 296.5918 248.34581 309.96631 274.43446 336.71484 299.12891 C 356.0629 316.44079 378.70425 330.82006 404.63672 342.26758 C 421.60728 349.18978 413.96388 360.76376 404.93945 362.43359 C 346.84555 379.43451 299.78623 411.70446 263.76367 459.24414 C 221.2092 515.40411 199.93164 578.53439 199.93164 648.63477 C 200.74776 710.33356 215.65785 768.39388 243.26562 817.72656 C 254.43856 838.89522 234.21171 850.87457 218.50195 836.27539 C 119.88697 755.31319 60.953652 634.55494 60.953125 505.13867 C 60.95295 390.83994 107.09897 281.21016 189.26172 200.31445 C 271.42442 119.41871 382.8909 73.866325 499.19336 73.65625 z M 738.35742 149.99023 C 744.5051 150.13816 751.87889 152.31668 760.31836 157.67773 C 872.12331 238.55566 939.04692 367.31456 939.04688 505.13867 C 939.0463 639.61345 875.39175 764.94239 769.37305 845.87305 C 762.56492 852.84073 739.43835 851.08718 754.55078 828.71875 C 788.66523 771.9667 799.74167 699.26463 800.06836 646.8418 C 800.06836 571.16523 776.85049 505.0485 728.2168 448.49023 C 684.46028 396.81485 628.69229 365.30376 560.91602 353.95508 C 555.06011 352.91284 552.75256 343.54515 562.42773 337.11328 C 626.89139 293.06204 685.74828 217.70175 708.89844 176.94727 C 711.34012 172.65993 714.83647 167.15298 718.57812 160.8125 C 721.27028 155.13392 728.11129 149.74369 738.35742 149.99023 z M 500.85352 400.09766 C 570.56179 399.69936 628.51673 422.60018 674.71875 468.80273 C 738.23735 532.89547 767.5712 652.21273 721.38672 745.66211 C 681.81406 817.74624 598.03671 868.31756 500.85352 870.94531 C 372.96998 869.41028 249.47644 756.02505 257.07812 631.90625 C 257.07812 566.98372 280.38099 512.2187 326.98828 467.60938 C 374.00084 422.60174 431.9558 400.09766 500.85352 400.09766 z M 500.24609 542.88672 C 479.17148 542.88672 461.33816 550.25518 446.74805 564.99219 C 432.15794 579.3309 424.66113 596.85689 424.25586 617.56836 C 424.25586 638.27985 431.55052 656.00321 446.14062 670.74023 C 461.136 685.07895 479.17148 692.24805 500.24609 692.24805 C 521.72596 692.24805 539.75951 685.07895 554.34961 670.74023 C 569.34501 656.00321 576.84375 638.27985 576.84375 617.56836 C 576.84375 596.85689 569.34501 579.3309 554.34961 564.99219 C 539.35423 550.25518 521.32067 542.88672 500.24609 542.88672 z " />
  </svg>
</div>
`;

AppShell.reg('app-shell');