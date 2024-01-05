import Symbiote, { html } from 'symbiote';

// Item element:
class ListItem extends Symbiote {

  init$ = {
    text: '',
    remove: () => {
      this.remove();
    },
  };

  get checked() {
    return this.ref.checkbox.checked;
  }

  clear = () => {
    this.$.text = '';
  };

  initCallback() {
    this.ref.edit.focus();
  }

}

ListItem.template = html`
  <input ref="checkbox" type="checkbox">
  <div ref="edit" contenteditable="true">{{text}}</div>
  <button ${{onclick: 'remove'}}>Remove Item</button>
`;
ListItem.reg('list-item');

// Application element:
class MyApp extends Symbiote {

  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
    heading: 'List heading:',
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

  initCallback() {
    // Add first item:
    this.$.addItem();
  }
}

MyApp.template = html`
  <h2>{{heading}}</h2>
  <div ref="list_wrapper"></div>
  <div class="toolbar">
    <button ${{onclick: 'addItem'}}>Add Item</button>
    <button ${{onclick: 'clearChecked'}}>Clear Checked</button>
    <button ${{onclick: 'removeChecked'}}>Remove Checked</button>
  </div>
`;
MyApp.reg('my-app');