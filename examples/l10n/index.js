import Symbiote, { html, PubSub } from '@symbiotejs/symbiote';

// Create localization map:
let lMap = {
  EN: {
    users: 'Users',
    comments: 'Comments',
    likes: 'Likes',
  },
  ES: {
    users: 'Usuarios',
    comments: 'Comentarios',
    likes: 'Gustos',
  },
};

// Create localization context and set the default locale:
let l10nCtx = PubSub.registerCtx(lMap.EN, 'L10N');

// Then, you can use localized strings in your components and templates:
class MyApp extends Symbiote {

  init$ = {
    numberOfUsers: 10,
    numberOfComments: 2,
    numberOfLikes: 12,

    onLangSelect: (e) => {
      l10nCtx.multiPub(lMap[e.target.value]);
    },
  }

}

MyApp.template = html`
  <select ${{onchange: 'onLangSelect'}}>
    <option>EN</option>
    <option>ES</option>
  </select>
  <div>{{L10N/users}} - {{numberOfUsers}}</div>
  <div>{{L10N/comments}} - {{numberOfComments}}</div>
  <div>{{L10N/likes}} - {{numberOfLikes}}</div>
`;

MyApp.reg('my-app');

