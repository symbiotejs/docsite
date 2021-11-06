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

Submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Getting updates: 

`git submodule update --init --recursive --remote`

Getting certain revision:

`cd symbiote && git checkout v1.0.0`

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