let uploaderCssSrc = './2x/css/uploader/index.css';

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

This example contains two embedded Symbiote applications. 

### 1. Photo-360 player (~7k)

${spinnerHtml}

HTML code example:
\`\`\`html
<ims-photo-spinner data="DATA_JSON_URL"></ims-photo-spinner>
\`\`\`

### 2. File uploader with the image editor built in (~55kb)
${uploaderHtml}

HTML code example:
\`\`\`html
<lr-file-uploader-regular css-src="${uploaderCssSrc}"></lr-file-uploader-regular>
\`\`\`

These widgets are provided by different vendors, but they connected to the one common workflow. 
Symbiote.js allows you to do it with ease and the high level of flexibility.

You can try to upload your own animation sequence (frame images) to the [Uploadcare](https://uploadcare.com/) CDN and see the result.

> Note, that files should have names applicable for proper sorting.

`;