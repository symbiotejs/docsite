## Classic way NPM installation

`npm i @symbiotejs/symbiote`

## NPM installation from GitHub repo (good for raw module usage, if needed)

`npm i https://codeload.github.com/symbiotejs/symbiote.js/legacy.tar.gz/v1.1.2`

## Alternatives

We contider that `npm` ecosystem has a lot of historical disadvantages:

* Common folder in project structure for all types of dependencies.
* A lot of excess and unused contents in packages
* Large disk space consuption
* Not optimal for code sharing on granular ESM level
* No support for ESM modules from external URLs (CDN located code)
* Not good for direct publishing at all
* Not universal module path resolving for node and browsers
* Global namespaces for the packages
* Etc...

So we decided to support some alternative approaches.

### CURL

`mkdir -p symbiote && curl -L https://unpkg.com/@symbiotejs/symbiote@latest/build/symbiote.jsdoc.js --output symbiote/symbiote.js`

The `-L`-flag means that request should follow redirect from `@latest` to certain latest version, f.e. `1.1.2`.

`package.json` scripts section example:
```json
{
  "scripts": {
    "dir": "mkdir -p symbiote",
    "symbiote": "curl -L https://unpkg.com/@symbiotejs/symbiote@latest/build/symbiote.jsdoc.js --output symbiote/symbiote.js",
    "setup": "npm run dir && npm run symbiote"
  }
}
```
Then `npm run setup`

### Git submodule (good for raw module usage, if needed)

Initial submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Activation at the cloned host repository and getting updates: 

`git submodule update --init --recursive --remote`

Switch to the certain revision:

`cd symbiote && git checkout <VERSION TAG>`

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

### Direct connection from the CDN (suitable for tests and experiments):

```js
import { BaseComponent } from 'https://unpkg.com/@symbiotejs/symbiote@latest/build/symbiote.base.min.js';
```

> In this case, your type checking tools might lose the access to type declarations. Will update this soon.
