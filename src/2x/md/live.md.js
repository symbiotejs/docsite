let uploaderCssSrc = '//cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.0/web/lr-file-uploader-regular.min.css';

let spinnerHtml = /*html*/ `<ims-photo-spinner></ims-photo-spinner>`;

let uploaderHtml = /*html*/ `
<lr-config
  ctx-name="uploader"
  pubkey="demopublickey"
  max-local-file-size-bytes="100000000"
  img-only="true"
  source-list="local, url, camera, dropbox">
</lr-config>

<accent-block>
  <lr-file-uploader-regular 
    ctx-name="uploader"
    css-src="${uploaderCssSrc}">
  </lr-file-uploader-regular>
</accent-block>

<lr-data-output
  ctx-name="uploader"
  use-console
  use-group
  use-event>
</lr-data-output>
`;

export default /*md*/ `
## Live example

This example contains two Symbiote applications. 

The first one, is the interactive animation sequence player (~7k):

${spinnerHtml}

This is how this player is inserted to the page (HTML-tag):
\`\`\`html
<ims-photo-spinner data="DATA_JSON_URL"></ims-photo-spinner>
\`\`\`

The next application is the file uploader widget with the image editor built in (~55kb):
${uploaderHtml}

Uploader HTML-code:
\`\`\`html
<lr-file-uploader-regular 
  css-src="${uploaderCssSrc}">
</lr-file-uploader-regular>
\`\`\`
These widgets are provided by different vendors, but they connected to the one common workflow. 
Symbiote.js allows to do it with ease. 

You can try to upload your own animation sequence (frame images) to the [Uploadcare](https://uploadcare.com/) CDN and see the result.

> Note, that files should have names applicable for proper sorting.

`;