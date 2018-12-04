import requestPromise = require('request-promise');
import request = require('request');

declare function del(options: requestNTLMOptions, params?: any): request.Response;

export function get(options: requestNTLMOptions, params?: any): request.Response;

export function post(options: requestNTLMOptions, params?: any): request.Response;

export function put(options: requestNTLMOptions, params?: any): request.Response;

export function patch(options: requestNTLMOptions, params?: any): request.Response;

export { del as delete }

export interface requestNTLMOptions extends requestPromise.OptionsWithUrl {
    username: string,
    password: string,
    workstation?: string,
    ntlm_domain?: string,
}


