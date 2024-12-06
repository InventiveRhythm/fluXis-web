import type { APIResponse } from "./APIResponse"

export class APIError extends Error {
    constructor(res: APIResponse<any>) {
        super(res.message)
        this.name = "APIError"
    }
}