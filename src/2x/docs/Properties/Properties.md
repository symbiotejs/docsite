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

For this purpose, use the `+` property prefix for the property name. 

> Note, that computed property will try to compute it's value on any component change. But it doesn't try to **render** changes in case of the final value has not been changed.

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

With Symbiote.js you don't need any external state management library. It's easy to connect, but you really just don't need it in most cases.

All components created with Symbiote.js are present in some data context. Some of properties in that context are local and accessible for certain component only. Some of data could be received form the one of the parent components in document tree. Some of data could be received from the abstract data layers using unique keys. You can organize your application data flow with a high level of flexibility. Let's clarify what does it mean.


