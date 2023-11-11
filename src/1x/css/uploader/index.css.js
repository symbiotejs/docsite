import CFG from '../../../../project.cfg.js';

export default /*css*/ `
@import 'https://esm.sh/@uploadcare/blocks@${CFG.uploaderExampleVersion}/web/file-uploader-regular.min.css';

:host {
  --cfg-pubkey: 'demopublickey';
}

lr-modal > dialog::backdrop {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
`;