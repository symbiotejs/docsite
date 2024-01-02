# Lifecycle

Symbiote-component - is an extension of a native Custom Element, so it has all regular native [lifecycle stages](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks):
- `constructor()`
- `connectedCallback()`
- `disconnectedCallback()`
- `adoptedCallback()`
- `attributeChangedCallback(name, oldValue, newValue)`

### Additional lifecycle callbacks

- `initCallback()` - component data context is initialized after the DOM connection.
- `renderCallback()` - initial template rendering is finished. All DOM-elements are ready for interaction.
- `destroyCallback()` - component ready to be destroyed and removed from memory.

`renderCallback()` - is a most regular and convenient place to describe component's logic:
```javascript
class MyComponent extends BaseComponent {
 
  renderCallback() {
    // You have an access to data and to the all DOM API methods here
  }

}
```


If you DO NOT planning to permanently remove your component from DOM and destroy it - set `readyToDestroy` property:
```javascript
class MyComponent extends BaseComponent {

  readyToDestroy = false;
  
}
```
Otherwise, component will be destroyed in case of DOM detachment, if you will not return it back with a synchronous DOM API call.

Than means, that you able to take Symbiote component from the one place in DOM and move it to another place **synchronously** (f.e. for the list ordering), without any additional action from your side.
