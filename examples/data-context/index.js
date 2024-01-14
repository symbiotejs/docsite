import Symbiote from 'symbiote';

class CtxEl extends Symbiote {

  init$ = {
    '*time': 'Click me!',
  };

  initCallback() {
    this.onclick = () => {
      this.$['*time'] = Date.now();
    };
  }

}

CtxEl.template = '{{*time}}';
CtxEl.reg('ctx-el');
