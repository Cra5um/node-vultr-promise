# vultr-promise

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-yellowgreen.svg)](http://standardjs.com/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

__This project is outdated! I will update it after i finish my other projects.__

A promise based [vultr](https://vultr.com) api wrapper

 - [Example](#example)
 - [Methods](#methods)
 - [License](#license)

## Example
```javascript
const vultr = require('vultr-promise')

const API_KEY = 'YOUR_API_KEY_HERE'

vultr.createServer(API_KEY, {
  DCID: 9, // Frankfurt, Germany
  VPSPLANID: 201, // $5 VC2 - 1024 MB, 25 GB SSD
  OSID: 215, // Ubuntu 16.04 x64
  enable_ipv6: 'yes',
  hostname: 'myvps',
  SSHKEYID: '577fb3487211e'
}).then(function (response) {
  console.log('Created VPS with SUBID', response.SUBID)
}).catch(console.error)
```

## Methods

[Official Vultr API documentaion](https://www.vultr.com/api/)

- __Account `/v1/account/`__
  - getAccountInfo
- __Application `/v1/app/`__
  - getAppList
- __API Key `/v1/auth/`__
  - getAuthInfo
- __Backup `/v1/backup/`__
  - getBackupList
- __Block Storage `/v1/block/`__
  - attachBlock
  - createBlock
  - deleteBlock
  - detachBlock
  - getBlockList
  - resizeBlock
- __DNS `/v1/dns/`__
  - createDnsDomain
  - createDnsRecord
  - deleteDnsDomain
  - deleteDnsRecord
  - getDnsDomainList
  - getDnsRecordList
  - updateDnsRecord
- __Firewall `/v1/firewall/`__
  - createFirewallGroup
  - deleteFireallGroup
  - getFirewallGroupList
  - getFirewallGroupDescription
  - createFirewallRule
  - deleteFirewallRule
  - getFirewallRuleList
- __ISO Image `/v1/iso/`__
  - createImageFromUrl
  - getImageList
- __Operating System `/v1/os/`__
  - getOSList
- __Plans `/v1/plans/`__
  - getPlanList
  - getPlanListVC2
  - getPlanListVCDC2
- __Regions `/v1/regions/`__
  - getRegionAvailability
  - getRegionList
- __Reserved IP `/v1/reservedip/`__
  - attachReservedIP
  - convertReservedIP
  - createReservedIP
  - destroyReservedIP
  - detachReservedIP
  - getReservedIPList
- __Server `/v1/server/`__
  - changeServerApp
  - getAppChangeList
  - disableServerBackup
  - enableServerBackup
  - getServerBackupSchedule
  - getServerBandwidth
  - createServer
  - createServerIPv4
  - destroyServer
  - destroyServerIPv4
  - setServerFirewallGroup
  - getServerAppInfo
  - getServerUserData
  - haltServer
  - enableServerIPv6
  - attachServerISO
  - detachServerISO
  - getServerISOInfo
  - setServerLabel
  - getServerList
  - getServerIPv4Info
  - getServerIPv6Info
  - getServerNeighbours
  - changeServerOS
  - getServerOSList
  - rebootServer
  - reinstallServer
  - restoreServerBackup
  - restoreServerSnapshot
  - setDefaultReverseDnsEntryIPv4
  - setDefaultReverseDnsEntryIPv6
  - getReverseDnsEntryIPv6
  - setReverseDnsEntryIPv4
  - setReverseDnsEntryIPv6
  - setServerUserData
  - startServer
  - upgradeServerPlan
  - getServerUpgradePlanList
- __Snapshot `/v1/snapshot/`__
  - createSnapshot
  - destroySnapshot
  - getSnapshotList
- __SSH Key `/v1/sshkey/`__
  - createSSHKey
  - destroySSHKey
  - getSSHKeyList
  - updateSSHKey
- __Startup Script `/v1/startupscript/`__
  - createStartupScript
  - destroyStartupScript
  - getStartupScriptList
  - updateStartupScript
- __User Management `/v1/user`__
  - createUser
  - deleteUser
  - getUserList
  - updateUser

Any method that requires an API key needs to have the API key as the first argument.

## License
[MIT](LICENSE.md)
