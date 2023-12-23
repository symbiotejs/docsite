# PubSub

`PubSub` - is a main Symbiote.js entity to manipulate application data. It implements the Publication/Subscribe pattern and represents all you need to organize data-flow inside your components and outside of them.

Example:
```js
import { PubSub } from '@symbiotejs/symbiote';

let someCtx = PubSub.registerCtx({
  myProp: 'some value',
  myOtherProp: 'some other value',
});