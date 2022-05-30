## List rendering

### Using `repeat` attribute

To create the dynamic list inside your component, use `repeat` HTML attribute for the list container element in your template:
```js
MyComponent.template = /*html*/ `
<div repeat="userList">
  <div>{{firstName}}</div>
  <div>{{secondName}}</div>
</div>`;
```
The attribute value should point to the certain key in component's data context:
```js
class MyComponent extends BaseComponent {

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

Of course, you can use any type of data context. 
For example, inherited:
```js
MyComponent.template = /*html*/ `
<div repeat="*userList">
  ...item template
</div>`
```
Or named:
```js
MyComponent.template = /*html*/ `
<div repeat="APP/userList">
  ...item template
</div>`;
```
More details about data context types, you can find in the "Data context" section.

### List items

All list items in the resulting list - are Symbiote components.
That means they have all described APIs accessible and you can interact with them same way.
All items are wrapped with a corresponding custom element.
So, if you don't need to have an extra container for your styling purposes, use `display: contents` CSS property for such containers. 
This property will be added to each item by default, if you don't set the custom tag names for your list items.

To create custom named tag for your list items, use `repeat-item-tag` attribute:
```js
MyComponent.template = /*html*/ `
<div repeat="userList" repeat-item-tag="user-card">
  <div>{{firstName}}</div>
  <div>{{secondName}}</div>
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
class UserCard extends BaseComponent {

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

UserCard.reg('user-card');
```
Now, this component will be used as the list item.

### List item template

Each item will be created with a template, taken from container initial inner contents.
Meant this part:
```html
<div>{{firstName}}</div>
<div>{{secondName}}</div>
```
Note, that data binding keys will be connected with a fields of each data entry, not the parent component itself.

### Data types and structure

The source data for the lists could be an `Array` or `Object` collections. 
Each item descriptor should have a flat structure, the same as the standard Symbiote `Data` storage.
Nested properties are not supported by design.

In case of `Object` data collection, all item keys will be reflected for the each item with the `_KEY_` property:
```js
class MyComponent extends BaseComponent {

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

MyComponent.template = /*html*/ `
<div repeat="userList" repeat-item-tag="user-card">
  <div>{{_KEY_}}</div>
  <div>{{firstName}}</div>
  <div>{{secondName}}</div>
</div>`;
```

### Dynamic updates

To update your list, set the new data collection in the Symbiote data context:
```js
class MyComponent extends BaseComponent {

  init$ = {
    userList: null,
  };

  async initCallback() {
    this.$.userList = await (await window.fetch('https://<MY-DATA-ENDPOINT>.io')).json();
  }

}
```

If data collection size is constant, you can use the complete data for the initial item rendering, and then to provide changes only:
```js
class MyComponent extends BaseComponent {

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