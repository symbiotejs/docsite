import Symbiote from 'symbiote';

function nestedDataGen(idx) {
  let data = [];
  for (let i = 0; i < 3; i++) {
    data.push({
      nestedName: 'Nested: ' + (i + 1),
      nestedText: Date.now(),
      nestedData: [
        {
          nestedName: '111',
          nestedText: Date.now(),
        },
        {
          nestedName: '222',
          nestedText: Date.now(),
        },
      ],
    });
  }
  return data;
}

// Dynamic list wrapper component:
class NestApp extends Symbiote {
  
  processInnerHtml = true;

  init$ = {
    data: [],
    buttonActionName: 'Generate',
    generateData: () => {
      this.set$({
        buttonActionName: 'Update',
      });
      let data = [];
      for (let i = 0; i < 3; i++) {
        data.push({
          name: i + 1,
          nestedData: nestedDataGen(i),
        });
      }
      this.$.data = data;
    },
  }
}

NestApp.reg('nest-app');