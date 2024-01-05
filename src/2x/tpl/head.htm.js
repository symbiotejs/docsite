import logo from '../../svg/logo/index.svg.js';

let b64Logo = btoa(logo(72));

/**
 * 
 * @param {String} [base] 
 * @param {String} [script] 
 * @returns 
 */
export default function(base = './', script = '') {
  return /*html*/ `
  <head>
    <base href="${base}">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Symbiote.js</title>
    <meta name="description" content="Symbiote.js - ultralight and ultra-powerful library to create widgets, organize micro-frontends, build reusable embeddable components and libraries.">
    <meta name="keywords" content="Symbiote.js, web-components, javascript framework, javascript library, application state management, custom elements, micro frontends, widget development, DOM API, js, js documentation"/>
    <meta property="og:description" content="Symbiote.js - ultralight and ultra-powerful library to create widgets, organize micro-frontends, build reusable embeddable components and libraries.">
    <meta property="og:title" content="Symbiote.js">
    <meta name="twitter:title" content="Symbiote.js">
    <link rel="icon" href="data:image/svg+xml;base64,${b64Logo}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./2x/css/index.css">
    ${script ? script : ''}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2RZEGMKNNR"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-2RZEGMKNNR');
    </script>
  </head>
  `;
};
