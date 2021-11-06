## TypeScript

We love TypeScript, but not for it's syntax or transpilation workflow. We believe that type security and type checking tools are very important for modern web development, but...

* We don't want to lose the ability to run our raw code in browser or node runtime directly
* We don't want to lose the ability to share our ESM source modules to any external JavaScript projects
* We don't want to have an extra dependency from Source Maps
* We don't want to lose the ability to debug or test our raw code without any additional transpilation setup
* We don't want to have any excess project rebuilds during development
* We don't want to fight the own TypeScript [issues](https://github.com/microsoft/TypeScript/issues)

So, we use [JSDoc](https://devdocs.io/jsdoc) type annotations for TypeScript static analysis support.