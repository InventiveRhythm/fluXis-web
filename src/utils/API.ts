import type { CookieRef } from '#app';
import { APIError } from '~/models/APIError';
import { APIResponse, type APIResponseErrors } from '~/models/APIResponse';
import type { Result } from '~/models/ResultStates';
import APIUser from '~/models/users/APIUser';

export default class API {
    static APIUrl = 'http://localhost:2434';
    static AssetsUrl = 'https://assets.flux.moe';
    static AuthUrl = 'https://auth.flux.moe';
    static AuthAppID = 0;

    static SteamDownload = 'https://store.steampowered.com/app/3440100';

    static TokenCookie: CookieRef<string | undefined>;
    static CurrentUser: CookieRef<APIUser | undefined>;

    static Setup(dev: boolean = false) {
        this.APIUrl = dev ? 'http://localhost:2434' : 'https://fluxis.flux.moe/api';
        this.AssetsUrl = dev ? 'http://localhost:2434/assets' : 'https://assets.flux.moe';
        this.AuthAppID = dev ? 0 : 2;

        this.TokenCookie = useCookie('token', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60
        });

        this.CurrentUser = useCookie('user', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60
        });
    }

    static async PerformGet<T, E = APIResponseErrors>(endpoint: string): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'GET');
    }

    static async PerformPost<T, E = APIResponseErrors>(endpoint: string, body: any): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'POST', body);
    }

    static async PerformPatch<T, E = APIResponseErrors>(endpoint: string, body: any): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'PATCH', body);
    }

    static async PerformPut<T, E = APIResponseErrors>(endpoint: string, body: any = {}): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'PUT', body);
    }

    static async PerformDelete<T, E = APIResponseErrors>(endpoint: string, body: any = {}): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'DELETE', body);
    }

    static OpenLogin() {
        const url = this.AuthUrl + '/login?app=' + this.AuthAppID;
        const params = 'width=600,height=600,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no';

        const popup = window.open(url, 'Login', params);

        if (!popup) return;

        const interval = setInterval(() => {
            popup.postMessage('', `${window.location.protocol}//${window.location.host}/`);
        }, 200);

        window.addEventListener('message', (event) => {
            if (popup && !popup.closed && event.data.token) {
                clearInterval(interval);
                popup.close();

                const token = event.data.token;
                this.TokenCookie.value = token;
                this.RefreshInfo();
            }
        });

        window.addEventListener('beforeunload', (_) => {
            if (popup && !popup.closed) {
                popup.close();
            }
        });
    }

    static Logout() {
        this.TokenCookie.value = undefined;
        this.CurrentUser.value = undefined;
    }

    static async RefreshInfo() {
        const { data: user, error } = await API.PerformGet<APIUser>(`/users/@me`);

        if (error) {
            if (error._status == 401)
                this.CurrentUser.value = undefined;    

            return;
        }

        this.CurrentUser.value = user;
    }
}

async function tryPerform<T, E = APIResponseErrors>(endpoint: string, method: string, body: any = {}): Promise<Result<T, E>> {
    try {
        const res = await perform<T>(endpoint, method, body);

        if (!res.IsSuccess() || !res.data) throw new APIError(res);

        return { data: res.data, error: null };
    } catch (ex: any) {
        if (ex instanceof APIError) {
            let err = ex.response.errors;
            if (!err) err = { _request: ex.message };

            err._status = ex.response.status;
            return { data: null, error: err as E };
        }

        return { data: null, error: { _request: ex?.message } as E };
    }
}

async function perform<T>(endpoint: string, method: string, body: any = {}): Promise<APIResponse<T>> {
    const rsp = new APIResponse<T>();

    try {
        var opt = {
            baseURL: API.APIUrl,
            headers: createHeaders(),
            body: undefined,
            method: method as any // ts can be really stupid sometimes
        };

        if (method != 'GET' && body) opt.body = body;

        let { data, error } = await useFetch<T>(endpoint, opt);

        if (error.value) {
            if (error.value?.data) data.value = error.value.data;
            else throw error.value;
        }

        if (error.value?.statusCode == 204) rsp.status = 204;
        else Object.assign(rsp, data.value);
    } catch (ex: any) {
        console.error(ex);

        rsp.status = 500;
        rsp.message = ex?.message || 'Unknown error';
    }

    return rsp;
}

function createHeaders(): any {
    const headers: any = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    const auth = API.TokenCookie.value;
    if (auth) headers.Authorization = auth;

    return headers;
}
