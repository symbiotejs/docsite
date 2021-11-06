## TypeScript

We love TypeScript, but not for it's syntax or transpilation workflow. We believe that type security and type checking tools are very important for modern web development, but...

* We don't want to lose the ability to run our raw code in browser or node runtime directly
* We don't want to lose the ability to share our ESM source modules to any external JavaScript projects
* We don't want to have an extra dependency from Source Maps
* We don't want to lose the ability to debug or test our raw code without any additional transpilation setup
* We don't want to have any excess project rebuilds during development
* We don't want to fight the own TypeScript [issues](https://github.com/microsoft/TypeScript/issues)

So, we use [JSDoc type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for TypeScript static analysis support.

> We planning to add some additional instructions for TypeScript developers in the near future.