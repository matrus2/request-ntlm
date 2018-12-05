import requestPromise = require('request-promise');

declare function del(options: requestNTLMOptions, params?: any): Promise<any>;

export function get(options: requestNTLMOptions, params?: any): Promise<any>;

export function post(options: requestNTLMOptions, params?: any): Promise<any>;

export function put(options: requestNTLMOptions, params?: any): Promise<any>;

export function patch(options: requestNTLMOptions, params?: any): Promise<any>;

export { del as delete }

export interface requestNTLMOptions extends requestPromise.OptionsWithUrl {
    username: string,
    password: string,
    workstation?: string,
    ntlm_domain?: string,
}


