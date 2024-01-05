import Symbiote, { html } from 'symbiote';

// Dynamic list item component:
class TableRow extends Symbiote {
  init$ = {
    rowNum: 0,
    randomNum: 0,
    date: 0,
  }

  initCallback() {
    this.selected = false;
    this.onclick = () => {
      this.selected = !this.selected;
      this.selected 
        ? this.setAttribute('selected', '') 
        : this.removeAttribute('selected');
    };
  }
}

TableRow.template = `
  <td>{{rowNum}}</td>
  <td>Random number: {{randomNum}}</td>
  <td>{{date}}</td>
`;
TableRow.reg('table-row');

// Dynamic list wrapper component:
class TableApp extends Symbiote {
  init$ = {
    tableData: [],
    buttonActionName: 'Generate',
    generateTableData: () => {
      this.set$({
        buttonActionName: 'Update',
      });
      let data = [];
      for (let i = 0; i < 1000; i++) {
        data.push({
          rowNum: i + 1,
          randomNum: Math.random() * 100,
          date: Date.now(),
        });
      }
      this.$.tableData = data;
    },
  }
}

TableApp.template = html`
<button ${{onclick: 'generateTableData'}}>{{buttonActionName}} table data</button>
<table itemize="tableData" item-tag="table-row"></table>
`;

TableApp.reg('table-app');