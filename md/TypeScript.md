## TypeScript

We believe that type security, type checking and static analysis tools are very important for the modern web development, but...

* We don't want to lose the ability to run our raw code in browser or node runtime directly
* We don't want to lose the ability to share our ESM source modules to any external JavaScript project
* We don't want to have an extra dependency from Source Maps
* We don't want to lose the ability to debug or test our raw code without any additional transpilation setup
* We don't want to have any excess project rebuilds during development
* We don't want to fight the own TypeScript [issues](https://github.com/microsoft/TypeScript/issues)
* We want to have a types information while debugging in runtime, not at the static analysis only

So, we use [JSDoc type annotations](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) for TypeScript static analysis support during development. 

Also we provide type definitions ([*.d.ts files](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)) for the TypeScript projects in our packages.

Check the [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) page in TypeScript official documentation.