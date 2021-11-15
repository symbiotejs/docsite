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

`mkdir -p symbiote && curl https://symbiotejs.github.io/symbiote.js/build/symbiote.jsdoc.js --output symbiote/symbiote.js`

> The provided path is temporary. We building our own CDN solution for more effective ESM-module sharing. Keep tuned for future updates!

## Git submodule

Initial submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Activation at the cloned host repository and getting updates: 

`git submodule update --init --recursive --remote`

Switch to the certain revision:

`cd symbiote && git checkout v1.0.0`

`package.json` scripts section example:
```json
{
  "scripts": {
    "git-modules": "git submodule update --init --recursive --remote",
    "sym-version": "cd symbiote && git checkout v1.0.0 && cd ..",
    "setup": "npm run git-modules && npm run sym-version && npm i"
  }
}
```
Then `npm run setup`

> Git-module approach allows you to put your dependency to any path in project structure you prefer, select branches and versions, create your own branches and use git tooling to manage code more flexible.

## Direct CDN usage

```js
import { BaseComponent } from 'https://uc-jsdk.web.app/build/symbiote.js';
```

> In this case, your type checking tools might lose the access to type declarations. Will update this soon.

## NPM

To be updated...