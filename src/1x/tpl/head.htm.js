/**
 * 
 * @param {String} [base] 
 * @returns 
 */
export default function(base = './') {
  return /*html*/ `
  <head>
    <base href="${base}">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Symbiote.js</title>
    <meta name="description" content="Symbiote.js - ultralight and ultrapowerful library to create widgets, organise micro-frontends, build reusable embeddable components and libraries.">
    <meta name="keywords" content="Symbiote.js, web-components, javascript framework, javascript library, application state management, custom element, micro frontends, widget development, DOM API, js, js documentation"/>
    <meta property="og:description" content="Symbiote.js - ultralight and ultrapowerful library to create widgets, organise micro-frontends, build reusable embeddable components and libraries.">
    <meta property="og:title" content="Symbiote.js">
    <meta name="twitter:title" content="Symbiote.js">
    <link rel="icon" href="../svg/logo/index.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/index.css">
    <script src="./js/index.js" type="module"></script>
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
