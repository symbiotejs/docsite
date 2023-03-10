export const js2 = /*md*/ `
This code defines a class \`MyApp\` which extends BaseComponent from the 
\`@symbiotejs/symbiote\` module.

The class has an \`init$\` object that sets initial values for four properties:

- \`first\` is set to the string 'FIRST'.
- \`attr\` is set to an empty string.
- \`*second\` is set to the string 'SECOND'.
- \`myctx/third\` is set to the string 'THIRD'.

The \`init$\` object also defines an \`onClick\` method that updates the value of \`first\` 
property to the current timestamp when the first \`<div>\` element is clicked.

The class has a static \`template\` property that defines an HTML template for the component 
using the Symbiote template syntax. The template defines four \`<div>\` elements, each of which 
displays the value of one of the four properties defined in the \`init$\` object.

The class also uses the \`bindAttributes()\` method to map an attribute named \`attr-test\` 
to the \`attr\` property, which means that if the \`attr-test\` attribute is set on an 
instance of the component, the value of that attribute will be stored in the \`attr\` property.

Finally, the class registers itself as a custom element with the name \`'my-app'\` using 
the \`reg()\` method from the \`BaseComponent\` class, which means that instances of the 
component can be created and inserted into the DOM using the \`<my-app>\` tag.
`;