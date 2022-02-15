## Delayed rendering

In some cases, it's important to take control on rendering flow. For example, you want to render some specified template, taken from some external URL, for the certain place in your document (context). Sounds difficult... But, it's easy to do that with Symbiote: 

```javascript
import { BaseComponent } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {
  // Optional. This will stop default rendering flow if template is already set:
  pauseRender = true;

  async initCallback() {
    let template = await (await window.fetch(this.$['*templateUrl']).text());
    this.render(template);
  }
}
```