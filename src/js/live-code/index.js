import { BaseComponent } from 'https://esm.sh/@symbiotejs/symbiote';

import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

const langExtensions = {js: javascript, html, css};
const defaultResultUrl = URL.createObjectURL(new Blob([
  /*html*/ `<h2>Loading...</h2>`
], {
  type: 'text/html',
}));

export class LiveCode extends BaseComponent {

  /** @type {Object<string, EditorView>} */
  editors = {
    html: null,
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
  }

  renderResult() {
    if (this._resultTimeout) {
      window.clearTimeout(this._resultTimeout);
    }
    this._resultTimeout = window.setTimeout(() => {
      let htmlDoc = this.editors.html.state.doc.toString();

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
      htmlDoc = /*html*/ `<script src="${jsUrl}" type="module"></script>` + htmlDoc;

      this.$.resultUrl = URL.createObjectURL(new Blob([htmlDoc], {
        type: 'text/html',
      }));

      this._resultTimeout = null;
    }, 300);
  }

  /**
   * 
   * @param {'html' | 'js' | 'css'} type 
   * @param {String} url 
   * @returns 
   */
  initSrc(type, url) {
    if (!url) {
      return;
    }
    window.fetch(url).then(async (resp) => {
      resp.text().then((code) => {
        this.editors[type] = new EditorView({
          doc: code,
          extensions: [
            basicSetup,
            this.updListener,
            langExtensions[type](),
          ],
          parent: this.ref[type],
        });
        this.renderResult();
      });
    });
  }

  initCallback() {
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
      this.initSrc('js', url);
    });
    this.sub('html', (url) => {
      this.initSrc('html', url);
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

LiveCode.shadowStyles = /*css*/ `
iframe {
  display: block;
  width: 100%;
  height: 300px;
  background-color: #fff;
}
button {
  display: block;
  height: 40px;
  margin-top: 20px;
  padding-left: .5em;
  padding-right: .5em;
}
`;

LiveCode.template = /*html*/ `
<slot name="html-description"></slot>
<h2>HTML</h2>
<div ref="html"></div>

<slot name="js-description"></slot>
<h2>JS</h2>
<div ref="js"></div>

<slot name="css-description"></slot>
<h2>CSS</h2>
<div ref="css"></div>

<slot name="result-description"></slot>
<h2>Result:</h2>
<iframe set="@src: resultUrl"></iframe>

<button set="onclick: openSeparate">Open result in the tab ↗</button>
`;

LiveCode.reg('live-code');