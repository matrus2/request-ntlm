/* global describe it */
const request = require('../index')
const nock = require('nock')
const assert = require('assert')

describe('request-ntlm-promise', function () {
  it('successfully execute a request - https and json object as param', async () => {
    const options = {
      username: 'username',
      password: 'password',
      ntlm_domain: 'https://www.google.com',
      workstation: 'workstation',
      url: 'https://www.google.com/search?q=ntlm',
      headers: {}
    }

    nock(options.ntlm_domain)
      .get('/search?q=ntlm')
      .reply(401, '', {
        'www-authenticate':
          'NTLM TlRMTVNTUAACAAAAKAAoADAAAAAHggEAfPyj3n1GAoQAAAAAAAAA\n' +
          'AAAAAABYAAAASQBuAHQAZQByAG4AZQB0AC4AaQBjAGIAYwAuAGMAbwBtAC4AYwBuAA=='
      })
      .get('/search?q=ntlm')
      .reply(200, 'test')

    request.get(options, {}).then(data => {
      assert.strictEqual('test', data)
    })
  })
  it('successfully execute a request - http and string as param', async () => {
    const options = {
      username: 'username',
      password: 'password',
      ntlm_domain: 'http://www.google.com',
      workstation: 'workstation',
      url: 'http://www.google.com/search?q=ntlm',
      headers: {}
    }

    nock(options.ntlm_domain)
      .get('/search?q=ntlm')
      .reply(401, '', {
        'www-authenticate':
          'NTLM TlRMTVNTUAACAAAAKAAoADAAAAAHggEAfPyj3n1GAoQAAAAAAAAA\n' +
          'AAAAAABYAAAASQBuAHQAZQByAG4AZQB0AC4AaQBjAGIAYwAuAGMAbwBtAC4AYwBuAA=='
      })
      .get('/search?q=ntlm')
      .reply(200, 'test')

    request.get(options, '').then(data => {
      assert.strictEqual('test', data)
    })
  })
  it('www-authenticate not found error', async () => {
    const options = {
      username: 'username',
      password: 'password',
      ntlm_domain: 'https://www.google.com',
      workstation: 'workstation',
      url: 'https://www.google.com/search?q=ntlm',
      headers: {}
    }
    nock(options.ntlm_domain)
      .get('/search?q=ntlm')
      .reply(401)

    request.get(options, {}).catch(e => {
      assert.strictEqual(
        e.message,
        'www-authenticate not found on response of second request'
      )
    })
  })
})
