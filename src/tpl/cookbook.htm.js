import head from './head.htm.js';
import header from './header.htm.js';
import footer from './footer.htm.js';

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
${head('../')}
<body>
  <script src="./js/show-code/index.js" type="module"></script>
  <data-nav-point location="cookbook" hidden></data-nav-point>
  <header>${header}</header>
  <main>
    <show-code 
      html="https://raw.githubusercontent.com/symbiotejs/examples/main/dynamic-list/dynamic-list_ref.html"
      js="https://raw.githubusercontent.com/symbiotejs/examples/main/dynamic-list/dynamic-list_ref.js"
      css="">
    </show-code>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;