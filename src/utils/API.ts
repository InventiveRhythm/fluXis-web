import Config from '@/config.json';
import { state } from './State';
import { APIResponse } from '@/api/models/APIResponse';
import type APIUser from '@/api/models/users/APIUser';
import Cookies from '@/utils/Cookies';

export default class API {
    static async PerformGet<T>(endpoint: string): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'GET');
    }

    static async PerformPost<T>(endpoint: string, body: any) {
        return perform<T>(endpoint, 'POST', body);
    }

    static async PerformPatch<T>(endpoint: string, body: any) {
        return perform<T>(endpoint, 'PATCH', body);
    }

    static async PerformPut<T>(endpoint: string, body: any) {
        return perform<T>(endpoint, 'PUT', body);
    }

    static async PerformDelete<T>(endpoint: string, body: any = {}) {
        return perform<T>(endpoint, 'DELETE', body);
    }

    static OpenLogin() {
        const url = Config.AuthUrl + '/login?app=' + Config.AuthAppId;
        const params = 'width=600,height=600,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no';

        const popup = window.open(url, 'Login', params);

        if (!popup)
            return;

        const interval = setInterval(() => {
            popup.postMessage('', `${window.location.protocol}//${window.location.host}/`);
        }, 200);

        window.addEventListener('message', (event) => {
            if (popup && !popup.closed && event.data.token) {
                clearInterval(interval);
                popup.close();

                const token = event.data.token;
                console.log('Got token from auth!');
                Cookies.Set('token', token);
                this.RefreshInfo(event.data.user);
            }
        });

        window.addEventListener('beforeunload', (_) => {
            if (popup && !popup.closed) {
                popup.close();
            }
        });
    }

    static Logout() {
        Cookies.Remove('user')
        Cookies.Remove('token')
        state.user = undefined
    }

    static async RefreshInfo(id: number) {
        await API.PerformGet<APIUser>('/user/' + id)
            .then((res) => {
                Cookies.Set('user', res.data);
                state.user = res.data;
            }).catch((err) => {
                console.error(err);
            });
    }
}

async function perform<T>(endpoint: string, method: string, body: any = {}): Promise<APIResponse<T>> {
    let data = {
        method: method,
        headers: createHeaders()
    };

    if (method != 'GET')
        data = Object.assign(data, { body: JSON.stringify(body) });

    const response = await fetch(Config.APIUrl + endpoint, data);

    if (response.status == 204) {
        const rsp = new APIResponse<T>();
        rsp.status = 204;
        return rsp;
    }

    let json = await response.json();
    let rsp = new APIResponse<T>();
    Object.assign(rsp, json);
    return rsp;
}

function createHeaders(): any {
    const headers: any = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    const auth = Cookies.Get('token');

    if (auth) {
        headers.Authorization = auth;
    }

    return headers;
}
