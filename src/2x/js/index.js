
import {} from 'https://jam-do.github.io/interactive-media-spots/web/ims-photo-spinner.js';
import * as LR from "https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.0/web/lr-file-uploader-regular.min.js";
import SPINNER_DATA from './spinner-data.js';

LR.registerBlocks(LR);

class CardEl extends HTMLElement {
  static count = 0;
  constructor() {
    super();
    CardEl.count++;
    this.setAttribute('n' + CardEl.count, '');
  }
}
window.customElements.define('card-el', CardEl);

window.onload = () => {
  let uploaderOutputEl = document.querySelector('lr-data-output');
  let spinner = document.querySelector('ims-photo-spinner');
  
  let updateSpinner = () => {
    let blob = new Blob([JSON.stringify(SPINNER_DATA)], {
      type: 'text/json',
    });
    let url = URL.createObjectURL(blob);
    spinner.setAttribute('data', url);
  };
  updateSpinner();

  uploaderOutputEl.addEventListener('lr-data-output', (e) => {
    if (e.detail?.data?.files?.length) {
      let nameMap = {};
      let sequence = [];
      e.detail?.data?.files.forEach((file) => {
        let name = file.name.split('.')[0];
        nameMap[name] = file.cdnUrl + '-/preview/1920x1080/-/quality/smart_retina/-/format/auto/';
      });
      Object.keys(nameMap).sort().forEach((key) => {
        sequence.push(nameMap[key]);
      });
      console.log(sequence);
      SPINNER_DATA.src = sequence;
      SPINNER_DATA.startFrame = 1;
      updateSpinner();
    }
  });
};


