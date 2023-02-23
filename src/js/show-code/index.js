import { BaseComponent } from 'https://symbiotejs.github.io/symbiote.js/core/BaseComponent.js';

import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';

export class ShowCode extends BaseComponent {
  init$ = {
    htmlSrc: 'HTML',
    jsSrc: 'JS',
    html: '',
    js: '',
    resultHtml: /*html*/ `<h3>Loading...</h3>`,
  }

  initCallback() {
    this.updListener = EditorView.updateListener.of((upd) => {
      if (!upd.transactions.length) {
        return;
      }
      if (this.updTimeout) {
        window.clearTimeout(this.updTimeout);
      }
      this.updTimeout = window.setTimeout(() => {
        let htmlDoc = this.htmlEditor.state.doc.toString();
        let jsDoc = this.jsEditor.state.doc.toString();
        let jsBlob = new Blob([jsDoc], {
          type: 'text/javascript',
        });
        let url = URL.createObjectURL(jsBlob);
        htmlDoc = /*html*/ `<script src="${url}" type="module"></script>` + htmlDoc;
        this.$.resultHtml = htmlDoc;
      }, 300);
    });

    this.sub('js', (url) => {
      if (!url) {
        return;
      }
      window.fetch(url).then(async (resp) => {
        resp.text().then((code) => {
          this.jsEditor = new EditorView({
            doc: code,
            extensions: [basicSetup, javascript(), this.updListener],
            parent: this.ref.jsCont,
          });
        });
      });
    });
    this.sub('html', (url) => {
      if (!url) {
        return;
      }
      window.fetch(url).then(async (resp) => {
        resp.text().then((code) => {
          this.htmlEditor = new EditorView({
            doc: code,
            extensions: [basicSetup, html(), this.updListener],
            parent: this.ref.htmlCont,
          });
        });
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.htmlEditor) {
      this.htmlEditor.destroy();
    }
    if (this.jsEditor) {
      this.jsEditor.destroy();
    }
  }
}

ShowCode.bindAttributes({
  html: 'html',
  js: 'js',
});

ShowCode.rootStyles = /*css*/ `
show-code iframe {
  width: 100%;
  min-height: 50vh;
  background-color: #fff;
}
`;

ShowCode.template = /*html*/ `
<h2>HTML</h2>
<div ref="htmlCont"></div>

<h2>JS</h2>
<div ref="jsCont"></div>

<h2>Result:</h2>
<iframe set="@srcdoc: resultHtml"></iframe>
`;

ShowCode.reg('show-code');