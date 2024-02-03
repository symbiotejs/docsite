import Symbiote, { html } from '@symbiotejs/symbiote';

// Dynamic list item component:
class TableRow extends Symbiote {

  renderCallback() {
    this.onclick = () => {
      this.classList.toggle('selected');
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

    generateTableData: () => {
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
  <button ${{onclick: 'generateTableData'}}>Generate data</button>
  <table itemize="tableData" item-tag="table-row"></table>
`;

TableApp.reg('table-app');