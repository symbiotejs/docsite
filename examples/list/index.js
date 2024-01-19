import Symbiote, { html } from '@symbiotejs/symbiote';

// Item element:
class ListItem extends Symbiote {

  init$ = {
    remove: () => {
      this.remove();
    },
  };

  get checked() {
    return this.ref.checkbox.checked;
  }

  clear() {
    this.$.text = '';
  };

  renderCallback() {
    this.ref.edit.focus();
  }

}

ListItem.template = html`
  <input ref="checkbox" type="checkbox">
  <div 
    ref="edit" 
    contenteditable="true"
    ${{textContent: 'text'}}></div>
  <button ${{onclick: 'remove'}}>Remove Item</button>
`;

ListItem.reg('list-item');

// Application element:
class MyApp extends Symbiote {

  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
    addItem: () => {
      this.ref.list_wrapper.appendChild(new ListItem());
    },
    clearChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.clear();
        }
      });
    },
    removeChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.remove();
        }
      });
    },
  }

  renderCallback() {
    // Add first item:
    this.$.addItem();
  }
}

MyApp.template = html`
  <div ref="list_wrapper"></div>
  <div class="toolbar">
    <button ${{onclick: 'addItem'}}>Add Item</button>
    <button ${{onclick: 'clearChecked'}}>Clear Checked</button>
    <button ${{onclick: 'removeChecked'}}>Remove Checked</button>
  </div>
`;

MyApp.reg('my-app');