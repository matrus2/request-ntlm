import requestPromise = require('request-promise');
import { Response } from 'request';

declare function del(options: requestNTLMOptions, params?: any, streamCallback?: (resp: Response) => void): Promise<any>;

export function get(options: requestNTLMOptions, params?: any, streamCallback?: (resp: Response) => void): Promise<any>;

export function post(options: requestNTLMOptions, params?: any, streamCallback?: (resp: Response) => void): Promise<any>;

export function put(options: requestNTLMOptions, params?: any, streamCallback?: (resp: Response) => void): Promise<any>;

export function patch(options: requestNTLMOptions, params?: any, streamCallback?: (resp: Response) => void): Promise<any>;

export { del as delete }

export interface requestNTLMOptions extends requestPromise.OptionsWithUrl {
    username: string,
    password: string,
    workstation?: string,
    ntlm_domain?: string,
}


