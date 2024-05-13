# List rendering

### Using `itemize` API

To create the dynamic list inside your component, use `itemize` HTML attribute for the list container element in your template:
```js
MyComponent.template = html`
<div itemize="userList">
  <template>
    <div>First name: {{firstName}}</div>
    <div>Second name: {{secondName}}</div>
  </template>
</div>`;
```

The `itemize` attribute value should point to the certain key in component's data context:
```js
class MyComponent extends Symbiote {

  init$ = {
    userList: [
      {
        firstName: 'John',
        secondName: 'Snow',
      },
      {
        firstName: 'Peter',
        secondName: 'Sand',
      },
    ],
  };

}
```

Of course, you can use any type of data context token or the computed list property.

For example, inherited:
```js
MyComponent.template = html`
<div itemize="^userList">
  ...item template
</div>`
```
Or named:
```js
MyComponent.template = html`
<div itemize="APP/userList">
  ...item template
</div>`;
```
> More details about data context types, you can find in the [**Context** section](./2x/docs/Context/).

Computed list example: 
```js
class MyComponent extends Symbiote {
  init$ = {
    rawData: [
      {
        date: Date.now(),
        isVisible: true,
      },
      {
        date: Date.now(),
        isVisible: false,
      },
    ],

    '+userList': () => this.$.data.filter((item) => {
      return item.isVisible;
    }),
  };
}

MyComponent.template = html`
  <div itemize="+userList"> ... </div>
`;
```

> More details about computed properties you can find [here](./2x/docs/Properties/).

### List items

By default, all the resulting list items - are Symbiote-components.
That means they have all described APIs accessible and you can interact with them same way.
All items are wrapped with a corresponding custom element.
So, if you don't need to have an extra container for your styling purposes, use `display: contents` CSS property for such containers.
This property will be added to each item by default, if you don't set the custom tag names for your list items.

To create custom named tag for your list items, use `item-tag` attribute:
```js
MyComponent.template = html`
<div itemize="userList" item-tag="user-card">
  <template>
    <div>{{firstName}}</div>
    <div>{{secondName}}</div>
  </template>
</div>`;
```

In this case, you can use that tag as the CSS selector:
```css
user-card {
  display: flex;
}
```

If you planning to add some additional functionality for the each list item, you can pre-define your list item component:
```js
class UserCard extends Symbiote {

  init$ = {
    firstName: '',
    secondName: '',
  };

  initCallback() {
    this.onclick = () => {
      alert(`Hello ${this.$.firstName} ${this.$.secondName}!`);
    };
  }
}

UserCard.template = html`
  <div>{{firstName}}</div>
  <div>{{secondName}}</div>
`;

UserCard.reg('user-card');
```

Now, this component can be used as the list item in the other component:
```js
html`
  <div itemize="listData" item-tag="user-card"></div>
`;
```

### List item template

By default, each item will be created with a template, taken from container initial inner contents:
```js
html`
  <div ${{itemize: 'listDate', 'item-tag': 'my-list-item'}}>
    <div>{{firstName}}</div>
    <div>{{secondName}}</div>
  </div>
`;
```
> Note, that data binding keys will be connected with a fields of each data entry, not the parent component itself.

We recommend to wrap item template into the `template` tag each time when you use this approach:
```js
html`
  <div ${{itemize: 'listDate', 'item-tag': 'my-list-item'}}>
    <template>
      <div>{{firstName}}</div>
      <div>{{secondName}}</div>
    </template>
  </div>
`;
```
> It helps browser to ignore some specific tag behavior before the template will be copied as a item contents.

> When you using an external component as a list item, template wrapping is not necessary.

### Possible data types and structure

The source data for the lists could be an `Array` or `Object` collections. 
Each item descriptor should have a flat structure, like the any standard Symbiote state initiator object.

In case of `Object` data collection, all item keys will be reflected for the each item with the `_KEY_` property:
```js
class MyComponent extends Symbiote {

  init$ = {
    userList: {
      id1: {
        firstName: 'John',
        secondName: 'Snow',
      },
      id2: {
        firstName: 'Peter',
        secondName: 'Sand',
      },
    },
  };

}

MyComponent.template = html`
  <div itemize="userList" item-tag="user-card">
    <div>ID: {{_KEY_}}</div>
    <div>{{firstName}}</div>
    <div>{{secondName}}</div>
  </div>
`;
```

### Dynamic updates

To update your list, just set the new data collection:
```js
class MyComponent extends Symbiote {

  init$ = {
    userList: [],
  };

  async initCallback() {
    this.$.userList = await (await window.fetch('https://<MY-DATA-ENDPOINT>.io')).json();
  }

}
```

If data collection size is constant, you can use the complete data for the initial item rendering, and then to provide changes only:
```js
class MyComponent extends Symbiote {

  init$ = {
    userList: [
      // Initial full data:
      {
        firstName: 'John',
        secondName: 'Snow',
      },
      {
        firstName: 'Peter',
        secondName: 'Sand',
      },

    ],
  };

  initCallback() {
    this.$.userList = [
      // Updates only:
      {
        secondName: '<SOME FIXED DATA>',
      },
      {
        secondName: '<SOME FIXED DATA>',
      },
    ];
  }

}
```

The `null` or `false` in list data value will clear the entire list.

### Custom items

Symbiote.js allows to use any custom component as a list item, including raw web-components designed for the maximum performance for the big amount of data.
```js
// Create lightweight web-component for each table row:
class TableRow extends HTMLElement {

  set rowData(data) {
    data.forEach((cellContent, idx) => {
      if (!this.children[idx]) {
        this.appendChild(document.createElement('td'));
      }
      this.children[idx].textContent = cellContent;
    });
  }

}

window.customElements.define('table-row', TableRow);

// Than render big dynamic table with Symbiote:
class MyTable extends Symbiote {

  init$ = {
    tableData: [],
  }

  initCallback() {
    window.setInterval(() => {
      let data = [];
      for (let i = 0; i < 10000; i++) {
        let rowData = [
          i + 1,
          Date.now(),
        ];
        
        data.push({rowData});
      }
      this.$.tableData = data;
      
    }, 1000);
  }

}

MyTable.rootStyles = css`
  table-row {
    display: table-row;
  }
  td {
    border: 1px solid currentColor;
  }
`;

MyTable.template = html`
  <h1>Hello table!</h1>
  <table ${{itemize: 'tableData', 'item-tag': 'table-row'}}></table>
`;

MyTable.reg('my-table');
```

> Symbiote.js `itemize` API could be used as a convenient benchmarking tool. You can test your components for performance by adding bunch of them into the large lists and analyzing the result.