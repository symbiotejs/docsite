export const js2 = /*md*/ `
This code example demonstrates how to create a custom web component using 
Symbiote.js. The code imports the \`BaseComponent\` class from the \`'@symbiotejs/symbiote'\` 
module.

The \`MyComponent\` class extends the \`BaseComponent\` class and defines an \`init$\` 
object to initialize the component's state. The \`init$\` object contains two 
properties: \`count\` and \`increment\`. The \`count\` property is initialized to \`0\`, and 
the \`increment\` property is a function that increments the \`count\` property when called.

The \`MyComponent\` class also sets the component's HTML template using the static
template property. The template uses the \`{{...}}\` syntax to bind the value 
of the \`count\` property to an h2 element and the \`set\` attribute for the increment function as the 
click event handler for a button element.

Finally, the \`reg\` method is called to register the component with the name 
'my-component', which can be used in the HTML markup of the web page to instantiate 
the component.

Overall, this code example demonstrates how to create a custom web component with 
Symbiote.js by defining its state and HTML template, and registering it as a custom 
element.
`;