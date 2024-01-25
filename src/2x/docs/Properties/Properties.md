# Properties

### Property initialization

To initiate the component properties, use `init$` property map:
```js
class MyComponent extends Symbiote {

  init$ = {
    myProp: 'some value',
    someOtherProp: 123,
    oneMoreProp: true,
  }

}
```
The `init$`-map should be a plane object, that provide access to all values by the top-level keys.
Access to the some nested property values are not allowed regarding the performance purposes.

### Get access to the actual property value

To get access to the any property value, use `$`-interface which is implemented as a standard JavaScript `Proxy`-object:
```js
class MyComponent extends Symbiote {

  init$ = {
    time: Date.now(),
  }

  renderCallback() {
    // To write the new value:
    this.$.time = Date.now();

    // To read current value:
    console.log(this.$.time);
  }

}
```

### Making multiple changes

To change multiple property values at once, you can use the `set$` method:
```js
class MyComponent extends Symbiote {

  init$ = {
    firstProp: 'some value',
    secondProp: 'some value',
  }

  renderCallback() {
    this.set$({
      firstProp: 'new value',
      secondProp: 'new value',
    });
  }

}
``` 

### Property subscription

To subscribe on some property changes, use the `sub` method:
```js
class MyComponent extends Symbiote {

  init$ = {
    myProp: 'some value',
  }

  renderCallback() {

    this.sub('myProp', (newVal) => {
      console.log(newVal);
      // do something...
    });

    // This will invoke the subscription callback:
    this.$.myProp = 'Changed value';

  }

}
``` 

If needed, you can trigger the change manually, using `notify` method:
```js
class MyComponent extends Symbiote {

  init$ = {
    myProp: 'some value',
  }

  renderCallback() {
    this.notify('myProp');
  }

}
```

### Computed properties

Some of your properties can compute their values automatically:
```js
class MyComponent extends Symbiote {

  init$ = {
    a: 1,
    b: 1,
    '+sum': () => this.$.a + this.$.b;
  }

}

MyComponent.template = html`<div>{{+sum}}</div>`;
```

For this purpose, use the `+` prefix for the property name. 

> Note, that computed property will try to compute it's new value on any other property change. But it doesn't make any **excess render** in case of the final value has not been changed.

Also, to trigger the change manually, use the `notify` method:
```js
class MyComponent extends Symbiote {

  init$ = {
    '+computedText': () => this.textContent + '!';
  }

  renderCallback() {
    this.textContent = 'Hello';
    this.notify('+computedText');
  }

}
```

### Property context and tokens

Symbiote-component is able to interact with different types of properties, not with the own local properties only. The certain type of that interaction could be set by context tokens:
- `^` - allows to get direct access to the upper level component property or handler
- `*` - allows to share properties between components in the same workflow-context
- `/` - allows to get access to some abstract named data context
- `--` - allows to initiate property with the value recieved from CSS variable values
- `@` - allows to initiate the state property and bind it to the attribute value

> More details about context types and the related tokens you can find in the [Context](./2x/docs/Context/) section.


