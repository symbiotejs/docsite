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

CtxEl.rootStyles = `
  ctx-el {
    display: inline-block;
    border: 1px solid #00f;
    padding: 20px;
    user-select: none;
  }
`;

CtxEl.template = '<span>{{*time}}</span><slot></slot>';
CtxEl.reg('ctx-el');
