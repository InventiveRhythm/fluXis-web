export class APIResponse<T> {
    public status: number = 0;
    public message: string = '';
    public data?: T;
    public errors?: APIResponseErrors;

    public IsSuccess(): boolean {
        if (!this.status) return false;

        return this.status >= 200 && this.status < 300;
    }
}

export type APIResponseErrors = {
    [key: string]: any;
};