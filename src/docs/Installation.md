```json
{
  "title": "Symbiote.js | Installation"
}
```
## Classic way NPM installation

`npm i @symbiotejs/symbiote`

## Alternatives

### NPM installation from GitHub repo (good for raw module usage, if needed)

`npm i https://codeload.github.com/symbiotejs/symbiote.js/legacy.tar.gz/<VERSION_TAG>`

or, for the actual code snapshot:

`npm i https://github.com/symbiotejs/symbiote.js`

### Git submodule (good for the raw module usage, if needed)

Initial submodule connection:

`git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote`

Activation at the cloned host repository and getting updates: 

`git submodule update --init --recursive --remote`

Switch to the certain revision:

`cd symbiote && git checkout <VERSION_TAG>`
<br>
<br>
`package.json` scripts section example:
```json
{
  "scripts": {
    "git-modules": "git submodule update --init --recursive --remote",
    "sym-version": "cd symbiote && git checkout <VERSION_TAG> && cd ..",
    "setup": "npm run git-modules && npm run sym-version && npm i"
  }
}
```
Then `npm run setup`

### Direct connection from the CDN (suitable for tests and experiments, no type checking):

```js
import { BaseComponent } from 'https://unpkg.com/@symbiotejs/symbiote@latest/build/symbiote.min.js';
```

