# Routing

Symbiote.js has a built-in solution for the SPA routing based on standard [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

Let's create the simple application example, to see how it works:

```js
import Symbiote, { html, AppRouter } from '@symbiotejs/symbiote';

// Describe your application routing map:
let routingMap = {
  home: {
    title: 'Homepage',
    default: true,
  },
  section: {
    title: 'Section',
  },
  error: {
    title: 'Error...',
    error: true,
  },
};

// Create the named PubSub instance, connected to the History API:
AppRouter.initRoutingCtx('R', routingMap);

// Use router in your component:
class AppShell extends Symbiote {

  renderCallback() {
    // Subscribe on route change and render the application sections:
    this.sub('R/route', (route) => {
      this.ref.viewport.innerHTML = `<${route}-section></${route}-section>`;
    });
  }

}

// Create the menu:
let menuHtml = Object.keys(routingMap).map((key) => {
  return /*html*/ `<a href="./${key}">${routingMap[key].title}</a>`;
}).join('');

// Use the menu and the routing data in the template:
AppShell.template = html`
  <menu>${menuHtml}</menu>
  <h1>{{R/title}}</h1>
  <div ref="viewport"></div>
`;

AppShell.reg('app-shell');
```

## Static methods

### AppRouter.initRoutingCtx()

Syntax:
```js
initRoutingCtx(id, routingMap)

// > PubSub instance
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `id` | `String`  | required | Context ID |
| `routingMap` | `Object<string, RouteDescriptor>`  | required | Routing map |

`RouteDescriptor` type description:
| Property | Type | ? | Description |
|:--|:--|:--|:--|
| `title` | `String`  | optional | Page title |
| `default` | `Boolean`  | optional | Default route |
| `error` | `Boolean`  | optional | Error route |

Example:
```js
AppRouter.initRoutingCtx('ROUTER_CTX_NAME', {
  home: {
    title: 'Homepage',
    default: true,
  },
  // ...
  error: {
    title: 'Error...',
    error: true,
  },
});
```

### AppRouter.applyRoute()

Use `applyRoute` to change application route and apply additional routing data:

Syntax:
```js
applyRoute(routeName, options)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `routeName` | `String`  | required | Route name |
| `options` | `Object<string, String \| Number \| Boolean>`  | optional | Additional options |

Example:
```js
AppRouter.applyRoute('my_section', {
  first_option: 1,
  second_option: true,
});
```
This will set your browser address bar to:
`<APP_URL>?my_section&first_option=1&second_option`

### AppRouter.setSeparator()

Sometimes, you need to set custom format for the URL-string, for example to avoid options removal by some external URL-parser.

Use `setSeparator` to set custom symbol for the request parameters separation.

Syntax:
```js
setSeparator(separator)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `separator` | `String`  | required | Separator symbol/s |

Example:
```js
AppRouter.setSeparator('@');
```

The default separator symbol is: `&`

### AppRouter.setDefaultTitle()

Use to set the default page title for the cases, when the route title is not set.

Syntax:
```js
setDefaultTitle(title)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `title` | `String`  | required | Default page title |

Example:
```js
AppRouter.setDefaultTitle('My super app!');
```

### AppRouter.setRoutingMap()

Use to update the routing map and add the new routes.

Syntax:
```js
setRoutingMap(routingMap)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `routingMap` | `Object<string, RouteDescriptor>`  | required | Routing map |

Example:
```js
AppRouter.setRoutingMap({
  new_route: {
    title: 'New section',
  }
});
```