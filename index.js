const request = require('request-promise')
const requestNative = require('request')
const errors = require('request-promise/errors')
const ntlm = require('./lib/ntlm')
const Agent = require('agentkeepalive')

const startAuth = async options => {
  var type1msg = ntlm.createType1Message(options)
  options.headers = {
    ...options.headers,
    Connection: 'keep-alive',
    Authorization: type1msg
  }
  return request(options)
}

const requestComplete = async (authHeader, options, params, streamCallback) => {
  if (!authHeader) {
    throw Error('www-authenticate not found on response of second request')
  }
  const type2msg = ntlm.parseType2Message(authHeader)
  const type3msg = ntlm.createType3Message(type2msg, options)

  options.headers = {
    ...options.headers,
    Connection: 'keep-alive',
    Authorization: type3msg
  }

  if (typeof params === 'string') options.body = params
  else options.json = params
  return streamCallback ? requestNative(options).on('response', streamCallback) : request(options)
}

const makeRequest = method => async (options, params, streamCallback) => {
  const KeepAliveAgent =
    options.url.toLowerCase().indexOf('https://') === 0
      ? Agent.HttpsAgent
      : Agent

  options = {
    workstation: '',
    ntlm_domain: '',
    headers: {},
    method,
    agent: new KeepAliveAgent(),
    ...options
  }

  let authHeader = ''
  await startAuth(options).catch((e) => {
    if (e instanceof errors.StatusCodeError) {
      authHeader = e.response.headers['www-authenticate']
    } else {
      throw e
    }
  })

  return requestComplete(authHeader, options, params, streamCallback)
}

exports.get = makeRequest('get')
exports.post = makeRequest('post')
exports.put = makeRequest('put')
exports.patch = makeRequest('patch')
exports.delete = makeRequest('delete')
exports.options = makeRequest('options')
