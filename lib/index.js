/*
 * The MIT License (MIT)
 * Copyright © 2016 Dennis Bruner
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict'

const request = require('request')

const VULTR_API = 'https://api.vultr.com/'
const ENDPOINTS = {
  // Account
  '/v1/account/info': {
    name: 'getAccountInfo',
    apiKey: true,
    method: 'get'
  },

  // Application
  '/v1/app/list': {
    name: 'getAppList',
    method: 'get'
  },

  // API Key
  '/v1/auth/info': {
    name: 'getAuthInfo',
    apiKey: true,
    method: 'get'
  },

  // Backup
  '/v1/backup/list': {
    name: 'getBackupList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },

  // Block Storage
  '/v1/block/attach': {
    name: 'attachBlock',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'attach_to_SUBID']
  },
  '/v1/block/create': {
    name: 'createBlock',
    apiKey: true,
    method: 'post',
    parameter: ['DCID', 'size_gb', 'label']
  },
  '/v1/block/delete': {
    name: 'deleteBlock',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/block/detach': {
    name: 'detachBlock',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/block/list': {
    name: 'getBlockList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/block/resize': {
    name: 'resizeBlock',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'size_gb']
  },

  // DNS
  '/v1/dns/create_domain': {
    name: 'createDnsDomain',
    apiKey: true,
    method: 'post',
    parameter: ['domain', 'serverip']
  },
  '/v1/dns/create_record': {
    name: 'createDnsRecord',
    apiKey: true,
    method: 'post',
    parameter: ['domain', 'name', 'type', 'data', 'ttl', 'priority']
  },
  '/v1/dns/delete_domain': {
    name: 'deleteDnsDomain',
    apiKey: true,
    method: 'post',
    parameter: ['domain']
  },
  '/v1/dns/delete_record': {
    name: 'deleteDnsRecord',
    apiKey: true,
    method: 'post',
    parameter: ['domain', 'RECORDID']
  },
  '/v1/dns/list': {
    name: 'getDnsDomainList',
    apiKey: true,
    method: 'get'
  },
  '/v1/dns/records': {
    name: 'getDnsRecordList',
    apiKey: true,
    method: 'get',
    parameter: ['domain']
  },
  '/v1/dns/update_record': {
    name: 'updateDnsRecord',
    apiKey: true,
    method: 'post',
    parameter: ['domain', 'RECORDID', 'name', 'data', 'ttl', 'priority']
  },

  // ISO Image
  '/v1/iso/create_from_url': {
    name: 'createImageFromUrl',
    apiKey: true,
    method: 'post',
    parameter: ['url']
  },
  '/v1/iso/list': {
    name: 'getImageList',
    apiKey: true,
    method: 'get'
  },

  // Operating System
  '/v1/os/list': {
    name: 'getOSList',
    method: 'get'
  },

  // Plans
  '/v1/plans/list': {
    name: 'getPlanList',
    method: 'get'
  },
  '/v1/plans/list_vc2': {
    name: 'getPlanListVC2',
    method: 'get'
  },
  '/v1/plans/list_vdc2': {
    name: 'getPlanListVCDC2',
    method: 'get'
  },

  // Regions
  '/v1/regions/availability': {
    name: 'getRegionAvailability',
    method: 'get',
    parameter: ['DCID']
  },
  '/v1/regions/list': {
    name: 'getRegionList',
    method: 'get',
    parameter: ['availability']
  },

  // Reserved IP
  '/v1/reservedip/attach': {
    name: 'attachReservedIP',
    apiKey: true,
    method: 'post',
    parameter: ['ip_addresss', 'attach_SUBID']
  },
  '/v1/reservedip/convert': {
    name: 'convertReservedIP',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip_address', 'label']
  },
  '/v1/reservedip/create': {
    name: 'createReservedIP',
    apiKey: true,
    method: 'post',
    parameter: ['DCID', 'ip_type', 'label']
  },
  '/v1/reservedip/destroy': {
    name: 'destroyReservedIP',
    apiKey: true,
    method: 'post',
    parameter: ['ip_address']
  },
  '/v1/reservedip/detach': {
    name: 'detachReservedIP',
    apiKey: true,
    method: 'post',
    parameter: ['ip_address', 'detach_SUBID']
  },
  '/v1/reservedip/list': {
    name: 'getReservedIPList',
    apiKey: true,
    method: 'get'
  },

  // Server
  '/v1/server/app_change': {
    name: 'changeServerApp',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'APPID']
  },
  '/v1/server/app_change_list': {
    name: 'getAppChangeList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/backup_disable': {
    name: 'disableServerBackup',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/backup_enable': {
    name: 'enableServerBackup',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/backup_get_schedule': {
    name: 'getServerBackupSchedule',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/backup_set_schedule': {
    name: 'setServerBackupSchedule',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'cron_type', 'hour', 'dow', 'dom']
  },
  '/v1/server/bandwidth': {
    name: 'getServerBandwidth',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/create': {
    name: 'createServer',
    apiKey: true,
    method: 'post'
    // Too many parameters, use an object instead
  },
  '/v1/server/create_ipv4': {
    name: 'createServerIPv4',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'reboot']
  },
  '/v1/server/destroy': {
    name: 'destroyServer',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/destroy_ipv4': {
    name: 'destroyServerIPv4',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip']
  },
  '/v1/server/firewall_group_set': {
    name: 'setServerFirewallGroup',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'FIREWALLGROUPID']
  },
  '/v1/server/get_app_info': {
    name: 'getServerAppInfo',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/get_user_data': {
    name: 'getServerUserData',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/halt': {
    name: 'haltServer',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/ipv6_enable': {
    name: 'enableServerIPv6',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/iso_attach': {
    name: 'attachServerISO',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ISOID']
  },
  '/v1/server/iso_detach': {
    name: 'detachServerISO',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/iso_status': {
    name: 'getServerISOInfo',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/label_set': {
    name: 'setServerLabel',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'label']
  },
  '/v1/server/list': {
    name: 'getServerList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID', 'tag']
  },
  '/v1/server/list_ipv4': {
    name: 'getServerIPv4Info',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/list_ipv6': {
    name: 'getServerIPv6Ifno',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/neighbours': {
    name: 'getServerNeighbours',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/os_change': {
    name: 'changeServerOS',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'OSID']
  },
  '/v1/server/os_change_list': {
    name: 'getServerOSList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/reboot': {
    name: 'rebootServer',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/reinstall': {
    name: 'reinstallServer',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/restore_backup': {
    name: 'restoreServerBackup',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'BACKUPID']
  },
  '/v1/server/restore_snapshot': {
    name: 'restoreServerSnapshot',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'SNAPSHOTID']
  },
  '/v1/server/reverse_default_ipv4': {
    name: 'setDefaultReverseDnsEntryIPv4',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip']
  },
  '/v1/server/reverse_delete_ipv6': {
    name: 'setDefaultReverseDnsEntryIPv6',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip']
  },
  '/v1/server/reverse_list_ipv6': {
    name: 'getReverseDnsEntryIPv6',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },
  '/v1/server/reverse_set_ipv4': {
    name: 'setReverseDnsEntryIPv4',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip', 'entry']
  },
  '/v1/server/reverse_set_ipv6': {
    name: 'setReverseDnsEntryIPv6',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'ip', 'entry']
  },
  '/v1/server/set_user_data': {
    name: 'setServerUserData',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'userdata']
  },
  '/v1/server/start': {
    name: 'startServer',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID']
  },
  '/v1/server/upgrade_plan': {
    name: 'upgradeServerPlan',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'VPSPLANID']
  },
  '/v1/server/upgrade_plan_list': {
    name: 'getServerUpgradePlanList',
    apiKey: true,
    method: 'get',
    parameter: ['SUBID']
  },

  // Snapshot
  '/v1/snapshot/create': {
    name: 'createSnapshot',
    apiKey: true,
    method: 'post',
    parameter: ['SUBID', 'description']
  },
  '/v1/snapshot/destroy': {
    name: 'destroySnapshot',
    apiKey: true,
    method: 'post',
    parameter: ['SNAPSHOTID']
  },
  '/v1/snapshot/list': {
    name: 'getSnapshotList',
    apiKey: true,
    method: 'get'
  },

  // SSH Key
  '/v1/sshkey/create': {
    name: 'createSSHKey',
    apiKey: true,
    method: 'post',
    parameter: ['name', 'ssh_key']
  },
  '/v1/sshkey/destroy': {
    name: 'destroySSHKey',
    apiKey: true,
    method: 'post',
    parameter: ['SSHKEYID']
  },
  '/v1/sshkey/list': {
    name: 'getSSHKeyList',
    apiKey: true,
    method: 'get'
  },
  '/v1/sshkey/update': {
    name: 'updateSSHKey',
    apiKey: true,
    method: 'post',
    parameter: ['SSHKEYID', 'name', 'ssh_key']
  },

  // Startup Script
  '/v1/startupscript/create': {
    name: 'createStartupScript',
    apiKey: true,
    method: 'post',
    parameter: ['name', 'script', 'type']
  },
  '/v1/startupscript/destroy': {
    name: 'destroyStartupScript',
    apiKey: true,
    method: 'post',
    parameter: ['SCRIPTID']
  },
  '/v1/startupscript/list': {
    name: 'getStartupScriptList',
    apiKey: true,
    method: 'get'
  },
  '/v1/startupscript/update': {
    name: 'updateStartupScript',
    apiKey: true,
    method: 'post',
    parameter: ['SCRIPTID', 'name', 'script']
  },

  // User Management
  '/v1/user/create': {
    name: 'createUser',
    apiKey: true,
    method: 'post',
    parameter: ['email', 'name', 'password', 'api_enabled', 'acls']
  },
  '/v1/user/delete': {
    name: 'deleteUser',
    apiKey: true,
    method: 'post',
    parameter: ['USERID']
  },
  '/v1/user/list': {
    name: 'getUserList',
    apiKey: true,
    method: 'get'
  },
  '/v1/user/update': {
    name: 'updateUser',
    apiKey: true,
    method: 'post',
    parameter: ['USERID', 'email', 'name', 'password', 'api_enabled', 'acls']
  }
}

Object.keys(ENDPOINTS).forEach(function (url) {
  let endpoint = ENDPOINTS[url]
  module.exports[endpoint.name] = function () {
    let params = Array.prototype.slice.call(arguments)

    if (endpoint.apiKey && !params.length) {
      return Promise.reject(new Error('This function requires an api key'))
    }

    return new Promise(function (resolve, reject) {
      // Create request options
      let options = {
        url,
        baseUrl: VULTR_API,
        method: endpoint.method,
        headers: endpoint.apiKey ? { 'API-Key': params[0] } : {}
      }

      // Add additional data if available
      if (endpoint.apiKey && params.length > 1 || !endpoint.apiKey && params.length) {
        let data = endpoint.apiKey ? params.slice(1) : params
        let dataObject = {}
        if (typeof data[0] === 'object') {
          dataObject = data[0]
        } else if (endpoint.parameter) {
          for (let i = 0; i < endpoint.parameter.length; i++) {
            if (data.length < i) break
            dataObject[endpoint.parameter[i]] = data[i]
          }
        }

        endpoint.method === 'get'
          ? options.qs = dataObject
          : options.form = dataObject
      }

      // Make request
      request(options, function (err, res) {
        if (err) return reject(err)

        // Always reject if statusCode is not 200
        if (res.statusCode !== 200) {
          return reject({
            statusCode: res.statusCode,
            error: new Error(res.body)
          })
        }

        // Check if server responded with data
        if (res.body) {
          resolve(JSON.parse(res.body))
        } else {
          resolve()
        }
      })
    })
  }
})
