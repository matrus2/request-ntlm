[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
![npm type definitions](https://img.shields.io/npm/types/chalk.svg)

# Request-NTLM-promise

Ntlm authentication _promise_ wrapper for the Request module. It authenticates each request via NTLM protocol.

The core of this reposotory comes from [request-ntlm](https://github.com/colynb/request-ntlm) which was improved by [request-ntlm-continued](https://github.com/FrankyBoy/request-ntlm). Here you can find complete refactor of both with ability to use promises.

## Usage

#### Install from npm
```
$ npm install request-ntlm-promise
```
#### Import
```
const ntlm = require('request-ntlm-promise');
// Typescript
import * as Request from 'request-ntlm-promise';
```
#### Choose method
##### `reqntlm.get(options, json)`
##### `reqntlm.post(options, json)`
##### `reqntlm.patch(options, json)`
##### `reqntlm.put(options, json)`
##### `reqntlm.delete(options, json)`

#### Possible parameters

##### `options`
- `username`: username;
- `password`: password;
- `ntlm_domain`: domain either http or https; 
- `url`: complete path to the resource;
- `workstation`: workstation;
- other options, which should be passed to Request module e.g. default headers.
##### `params`
This can be `string` or `object`

### Example
```javascript
const ntlm = require('request-ntlm-promise');
const URL = 'http://yourdomain.com'
const options = {
  username: 'username',
  password: 'password',
  ntlm_domain: URL,
  url: `${URL}/path/to/resource`
};
const json = {
  // whatever object you want to submit
};

ntlm.post(options, json).then(console.log)

// or use async/await
const data = await ntlm.post(options, json)
console.log(data)
```

