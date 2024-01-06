import Symbiote from 'symbiote';

class MyCom extends Symbiote {}

MyCom.template = `
  <h2>{{--heading}}</h2>
  <div>{{--text}}</div>
`;

MyCom.reg('my-com');