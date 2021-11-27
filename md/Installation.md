## Installation

We contider that `npm` ecosystem has a lot of disadvantages:

* Common folder in project structure for all types of dependencies
* A lot of excess and unused contents in packages
* Large disk space consuption
* Not optimal for code sharing on granular ESM level
* No support for ESM modules from external URLs (CDN located code)
* Not good for direct publishing at all
* Not universal module path resolving for node and browsers
* Common global namespace for all packages
* Etc...

So we decided to support some alternative approaches.

## CURL (recommended)

`mkdir -p symbiote && curl https://raw.githubusercontent.com/symbiotejs/symbiote.js/v1.1.1/build/symbiote.jsdoc.js --output symbiote/symbiote.js`

`package.json` scripts section example:
```json
{
  "scripts": {
    "dir": "mkdir -p symbiote",
    "symbiote": "curl https://raw.githubusercontent.com/symbiotejs/symbiote.js/v1.1.1/build/symbiote.jsdoc.js --output symbiote/symbiote.js",
    "setup": "npm run dir && npm run symbiote"
  }
}
```
Then `npm run setup`

## Git submodule

Initial submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Activation at the cloned host repository and getting updates: 

`git submodule update --init --recursive --remote`

Switch to the certain revision:

`cd symbiote && git checkout v1.1.1`

`package.json` scripts section example:
```json
{
  "scripts": {
    "git-modules": "git submodule update --init --recursive --remote",
    "sym-version": "cd symbiote && git checkout v1.1.1 && cd ..",
    "setup": "npm run git-modules && npm run sym-version && npm i"
  }
}
```
Then `npm run setup`

> Git-module approach allows you to put your dependency to any path in project structure you prefer, select branches and versions, create your own branches and use git tooling to manage code more flexible.

## Direct connection from the web:

```js
import { BaseComponent } from 'https://symbiotejs.github.io/symbiote.js/build/symbiote.base.min.js';
```

> In this case, your type checking tools might lose the access to type declarations. Will update this soon.

## NPM

To be updated...