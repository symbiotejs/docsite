import Symbiote from '@symbiotejs/symbiote';

class MyTable extends Symbiote {
  init$ = {
    tableData: [],
    select: (e) => {
      e.target?.closest('table-row')?.classList.toggle('selected');
    },
  }
}

MyTable.template = /*html*/ `
  <table-css 
    bind="onclick: select"
    itemize="tableData" 
    item-tag="table-row">
    <td-css>{{rowNumber}}</td-css>
    <td-css>{{date}}</td-css>
  </table-css>
`;

MyTable.reg('my-table');
