```json
{
  "title": "Symbiote.js | Data"
}
```
## Data

`Data` - is the base class (abstraction) for the data manipulation in Symbiote.js. It implements the [pub/sup](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern and provides an API for the reactive data lifecycle.

Creating `Data` instance:
```javascript
import { Data } from '@symbiotejs/symbiote';

const data = new Data();
```

Instance methods:
```javascript
// Adding some new data field and it's value:
data.add('myProp', 'some value...');

// Reading the data:
data.read('myProp'); // -> 'some value...'

// Publishing changes: 
data.pub('myProp', 'new value');

// or multiple changes:
data.multiPub({
  myProp: 'new value',
  myOtherProp: false,
});

// Subscription for property changes:
data.sub('myProp', (newVal) => {
  console.log(newVal);
}); // -> this will return the subscription object with the 'remove' method (memory cleaning)

// Manual notification for all subscriptions (with the current value):
data.notify('myProp');

// Deleting Data instance:
data.remove();
```

Static methods:
```javascript
// Register unnamed (local) Data instance with some initial data:
const data = Data.registerLocalCtx({
  firstProp: true,
  secondProp: 'SOME_VALUE',
  thirdProp: 123,
});

// Named data instance with some initial data:
Data.registerNamedCtx('MY_CTX_NAME', {
  firstProp: true,
  secondProp: 'SOME_VALUE',
  thirdProp: 123,
}); // -> Data instance

// Getting named Data instance:
Data.getNamedCtx('MY_CTX_NAME');

// Clear named Data instance:
Data.clearNamedCtx('MY_CTX_NAME');
```

Symbiote.js `BaseComponent` class provides an interface for the combined data context with the `Data` instances under the hood:

```javascript
import { BaseComponent } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {
  initCallback() {
    // Property change subscription:
    this.sub('propName', (value) => {
      console.log(value);
    });

    // Notification for all current subscriptions:
    this.notify('propName');

    // Checking for property exists:
    this.has('propName');

    // New property adding:
    this.add('nwePropName', 'SOME_VALUE');

    // Adding for multiple properties:
    this.add$({
      firstProp: 'SOME_VALUE',
      secondProp: true,
      thirdProp: 123,
    });

    // Publishing changes for multiple props:
    this.set$({
      firstProp: 'SOME_VALUE',
      secondProp: true,
      thirdProp: 123,
    });
  }
}
```