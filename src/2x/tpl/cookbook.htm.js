import header from './header.htm.js';
import footer from './footer.htm.js';

export default /*html*/ `
<!DOCTYPE html>
<html lang="en">
{{HEAD}}
<body>
  <script src="./js/live-code/index.js" type="module"></script>
  <data-nav-point location="cookbook" hidden></data-nav-point>
  <header>${header}</header>
  <main>
    <column-el>
      <article>
        {{CONTENT}}
      </article>
    </column-el>
  </main>
  <footer>${footer}</footer>
</body>
</html>
`;