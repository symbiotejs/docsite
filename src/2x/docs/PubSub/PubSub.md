# PubSub

`PubSub` - is a main Symbiote.js entity to manipulate application data. It implements simple and well known [Publication-subscribe]() pattern and represents all you need to organize data-flow inside your components and outside of them. It is integrated to the `Symbiote` base class, but also can be used separately:
```js
import { PubSub } from '@symbiotejs/symbiote';

let myDataCtx = PubSub.registerCtx({
  myProp: 'some value',
  myOtherProp: 'some other value',
});
```

## Static methods

### PubSub.registerCtx()

Use to create and register the `PubSub` instance.

Syntax:
```js
registerCtx(schema)
registerCtx(schema, id)

// > PubSub instance
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `schema` | `Object<string, *>` | required | Property map |
| `id` | `String \| Symbol`  | optional | Context ID |

Example:
```js
let myDataCtx = PubSub.registerCtx({
  myProp: 'some value',
  myOtherProp: 'some other value',
}, 'MY_CTX_ID');
```

### PubSub.getCtx()

Use to get PubSub object from registry.

Syntax:
```js
getCtx(id)

// > PubSub instance
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `id` | `String \| Symbol`  | required | Context ID |

Example:
```js
let myDataCtx = PubSub.getCtx('MY_CTX_ID');
```

### PubSub.deleteCtx()

Use to remove `PubSub` object from the registry and to clear memory.

Syntax:
```js
deleteCtx(id)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `id` | `String \| Symbol`  | required | Context ID |

Example:
```js
PubSub.deleteCtx('MY_CTX_ID');
```

## Instance methods

### pub()

Use to publish new the new property value.

Syntax:
```js
pub(propertyKey, newValue)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyKey` | `String`  | required | Property name |
| `newValue` | `*`  | required | Property value |

Example:
```js
myDataCtx.pub('propertyName', 'newValue');
```

### multiPub()

Use to publish multiple changes at once.

Syntax:
```js
multiPub(propertyMap)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyMap` | `Object<string, *>`  | required | Key/value update map |

Example:
```js
myDataCtx.multiPub({
  propertyName: 'new value',
  otherPropertyName: 'other new value',
});
```

### sub()

Use to subscribe on property changes.

Syntax:
```js
sub(propertyName, handler)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyName` | `String`  | required | Property name |
| `handler` | `(newValue) => void`  | required | Property update handler |

Example:
```js
myDataCtx.sub('propertyName', (newValue) => {
  console.log(newValue);
});
```
### read()

Use to read the property value.

Syntax:
```js
read(propertyName)

// > *
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyName` | `String`  | required | Property name |

Example:
```js
myDataCtx.read('propertyName');
```

### has()

Use to check that property exists.

Syntax:
```js
has(propertyName)

// > true / false
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyName` | `String`  | required | Property name |

Example:
```js
myDataCtx.has('propertyName');
```

### add()

Use to add a new property into the existing `PubSub` object.

Syntax:
```js
add(propertyName, initValue)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyName` | `String`  | required | Property name |
| `initValue` | `*`  | required | Initial property value |

Example:
```js
myDataCtx.add('propertyName', 'init value');
```

### notify()

Use for the manual invocation of the all subscription handlers for the property.

Syntax:
```js
notify(propertyName)
```

| Argument | Type | ? | Description |
|:--|:--|:--|:--|
| `propertyName` | `String`  | required | Property name |

Example:
```js
myDataCtx.notify('propertyName');
```
