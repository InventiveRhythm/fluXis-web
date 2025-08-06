import type { APIResponse } from './APIResponse';

export class APIError extends Error {
    public response: APIResponse<any>;

    constructor(res: APIResponse<any>) {
        super(res.message);
        this.response = res;
        this.name = 'APIError';
    }
}
