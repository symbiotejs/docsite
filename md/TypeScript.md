## TypeScript

We love TypeScript, but not for it's syntax or transpilation workflow. We believe that type security and type checking is very important for modern web development, but...

* we don't want to lose the ability to run our raw code in browser or node runtime directly
* we don't want to lose the ability to share our ESM source modules to any external JavaScript projects
* we don't want to have an extra dependency from Source Maps
* we don't want to lose the ability to debug our raw code without any additional transpilation setup
* we don't want to have any excess project rebuilds during development

So, we use [JSDoc](https://devdocs.io/jsdoc) type annotations for TypeScript static analysis support.