import Symbiote, { html, PubSub } from '@symbiotejs/symbiote';

let routes = [
  {
    route: 'home',
    title: 'Home',
    options: {
      timestamp: Date.now(),
    },
  },
  {
    route: 'user',
    title: 'User',
    options: {
      timestamp: Date.now(),
    },
  },
  {
    route: 'settings',
    title: 'Settings',
    options: {
      timestamp: Date.now(),
    },
  },
];

const router = PubSub.registerCtx(routes[0], 'R');

class AppShell extends Symbiote {
  init$ = {
    routes: structuredClone(routes),

    '+optionsJson': () => {
      return JSON.stringify(this.$['R/options'], undefined, 2);
    },
    '+sectionHtml': () => {
      let sec = this.$['R/route'];
      return `<${sec}-section></${sec}-section>`;
    },

    onNav: (e) => {
      let route = e.target.getAttribute('route');
      if (route) {
        let routeDescriptor = routes.find((desc) => {
          return desc.route === route;
        });
        if (routeDescriptor) {
          routeDescriptor.options.timestamp = Date.now();
          router.multiPub(routeDescriptor);
          this.notify('+optionsJson');
          this.notify('+sectionHtml');
        }
      }
    },
  }
}

AppShell.template = html`
  <h1>Section title: {{R/title}}</h1>
  <h2>Current route: {{R/route}}</h2>
  <label>Navigation panel:</label>
  <nav itemize="routes">
    <button ${{onclick: '^onNav', '@route': 'route'}}>{{title}}</button>
  </nav>
  <label>Route options:</label>
  <code>{{+optionsJson}}</code>
  <label>Wrapper element for the current section:</label>
  <div class="viewport" ${{
    innerHTML: '+sectionHtml',
    '@inner-html': '+sectionHtml', 
  }}></div>
`;

AppShell.reg('app-shell');