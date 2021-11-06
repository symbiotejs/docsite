## Installation

We contider that `npm` ecosystem has a lot of disadvantages:

* Common folder in project structure for all types of dependencies
* A lot of excess and unused contents in packages
* Large disk space consuption
* Not optimal for code sharing on granular ESM level
* No support for ESM modules from external URLs (CDN located code)
* Not good for direct publishing at all
* Not universal module path resolving for node and browsers
* Etc...

So we decided to support some alternative approaches.

## Git submodule (recommended)

Initial submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Activation and getting updates: 

`git submodule update --init --recursive --remote`

Getting certain revision:

`cd symbiote && git checkout v1.0.0`

`package.json` scripts section example:
```json
{
  "scripts": {
    "git-modules": "git submodule update --init --recursive --remote",
    "sym-version": "cd symbiote && git checkout v1.0.0 && cd ..",
    "setup": "npm run git-modules && npm run sym-version"
  }
}
```
Then run `npm run setup`

> Git-module approach allows you to put your dependency to any path in project structure you prefer, select branches and versions, create your own branches and use git tooling to manage code more flexible.

## CURL
`mkdir -p symbiote && curl https://uc-jsdk.web.app/build/symbiote.js --output symbiote/symbiote.js`

> The provided path is temporary. We building our own CDN solution for effective ESM-module sharing. Keep tuned for future updates!

## Direct CDN usage

```js
import { BaseComponent } from 'https://uc-jsdk.web.app/build/symbiote.js';
```

> In this case, your type checking tools might lose the access to type declarations. Will update this soon.

## NPM

To be updated...