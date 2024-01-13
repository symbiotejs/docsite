import { Symbiote } from './lib.js';

import { rootCss, shadowCss } from './styles.js';
import TPL from './template.js';

import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html as htm } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { dracula } from 'thememirror';

const symUrl = 'https://cdn.jsdelivr.net/npm/@symbiotejs/symbiote/core/index.js/+esm';
const langExtensions = {js: javascript, htm, css};
const defaultResultUrl = URL.createObjectURL(new Blob([
  /*html*/ `<h2>⏳ Wait a bit...</h2>`
], {
  type: 'text/html',
}));

export class LiveCode extends Symbiote {

  /** @type {Object<string, EditorView>} */
  editors = {
    htm: null,
    js: null,
    css: null,
  }

  init$ = {
    html: '',
    js: '',
    css: '',
    resultUrl: defaultResultUrl,
    openSeparate: () => {
      window.open(this.$.resultUrl);
    },
    onReload: () => {
      this.renderResult();
    },
    onTab: (e) => {
      let tabName = e.target.getAttribute('tab');
      if (tabName) {
        Object.values(this.ref).forEach((el) => {
          el.removeAttribute('current');
        });
        e.target.setAttribute('current', '');
        this.ref[tabName].setAttribute('current', '');
      }
    },
  }

  renderResult() {
    if (this._resultTimeout) {
      window.clearTimeout(this._resultTimeout);
    }
    this._resultTimeout = window.setTimeout(() => {
      let htmlDoc = this.editors.htm.state.doc.toString();

      // css:
      let cssDoc = this.editors.css.state.doc.toString();
      let cssBlob = new Blob([cssDoc], {
        type: 'text/css',
      });
      let cssUrl = URL.createObjectURL(cssBlob);
      
      htmlDoc = /*html*/ `<link rel="stylesheet" href="${cssUrl}">` + htmlDoc;

      // js:
      let jsDoc = this.editors.js.state.doc.toString();
      let jsBlob = new Blob([jsDoc], {
        type: 'text/javascript',
      });
      let jsUrl = URL.createObjectURL(jsBlob);
      let importMap = `<script type="importmap">{"imports":{"symbiote":"${symUrl}"}}</script>`;
      htmlDoc = importMap + /*html*/ `<script src="${jsUrl}" type="module"></script>` + htmlDoc;

      this.$.resultUrl = URL.createObjectURL(new Blob([htmlDoc], {
        type: 'text/html',
      }));
      this.setAttribute('resolved', '');
      this._resultTimeout = null;
    }, 300);
  }

  /**
   * 
   * @param {'htm' | 'js' | 'css'} type 
   * @param {String} url 
   * @param {Boolean} typing 
   * @returns 
   */
  initSrc(type, url, typing = false) {
    if (!url) {
      return;
    }
    window.fetch(url).then(async (resp) => {
      resp.text().then((code) => {
        this.editors[type] = new EditorView({
          doc: '',
          extensions: [
            basicSetup,
            this.updListener,
            langExtensions[type](),
            dracula,
          ],
          parent: this.ref[type],
        });
        if (typing) {
          let chars = code.split('');
          chars.forEach((char, idx) => {
            // let timeout = (char === ' ' || char === '\n') ? 300 : 100;
            window.setTimeout(() => {
              let transaction = this.editors[type].state.update({
                changes: {
                  from: idx, 
                  insert: char,
                }
              });
              this.ref.scrollTo.scrollIntoView({
                // behavior: 'smooth',
              });
              this.editors[type].dispatch(transaction);
              
            }, idx * 30);
          });
        } else {
          let transaction = this.editors[type].state.update({
            changes: {
              from: 0, 
              insert: code,
            }});
          this.editors[type].dispatch(transaction);
        }
        // this.renderResult();
      });
    });
  }

  renderCallback() {
    this.updListener = EditorView.updateListener.of((upd) => {
      if (!upd.docChanged) {
        return;
      }
      if (this.updTimeout) {
        window.clearTimeout(this.updTimeout);
      }
      this.updTimeout = window.setTimeout(() => {
        this.renderResult();
      }, 300);
    });

    this.sub('js', (url) => {
      this.initSrc('js', url, true);
    });
    this.sub('html', (url) => {
      this.initSrc('htm', url);
    });
    this.sub('css', (url) => {
      this.initSrc('css', url);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (let key in this.editors) {
      this.editors[key]?.destroy();
    }
  }
}

LiveCode.bindAttributes({
  html: 'html',
  js: 'js',
  css: 'css',
});

LiveCode.rootStyles = rootCss;
LiveCode.shadowStyles = shadowCss;
LiveCode.template = TPL;

LiveCode.reg('live-code');