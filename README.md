# vultr-promise

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-yellowgreen.svg)](http://standardjs.com/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

A promise based [vultr](https://vultr.com) api wrapper

**BEWARE: This module is experimental and may change in the future, use at your own risk!**

## Example
```javascript
const vultr = require('vultr-promise')

const API_KEY = 'YOUR_API_KEY_HERE'

vultr.createServer(API_KEY, {
  DCID: 9, // Frankfurt, Germany
  VPSPLANID: 29, // $5 plan
  OSID: 215, // Ubuntu 16.04 x64
  enable_ipv6: 'yes',
  hostname: 'myvps',
  SSHKEYID: '577fb3487211e'
}).then(function (response) {
  console.log('Created VPS with SUBID', response.SUBID)
}).catch(console.error)
```

## License
[MIT](LICENSE.md)
