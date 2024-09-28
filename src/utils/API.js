import Config from '@/config.json';
import { state } from './State';

export default class API {
    static async PerformGet(endpoint) {
        return perform(endpoint, 'GET');
    }

    static async PerformPost(endpoint, body) {
        return perform(endpoint, 'POST', body);
    }

    static async PerformPatch(endpoint, body) {
        return perform(endpoint, 'PATCH', body);
    }

    static async PerformPut(endpoint, body) {
        return perform(endpoint, 'PUT', body);
    }

    static async PerformDelete(endpoint, body = {}) {
        return perform(endpoint, 'DELETE', body);
    }

    static OpenLogin() {
        const url = Config.APIUrl + '/login?app=' + Config.AuthAppId;
        const params = 'width=600,height=600,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no';

        const popup = window.open(url, 'Login', params);

        const interval = setInterval(() => {
            popup.postMessage('', `${window.location.protocol}//${window.location.host}/`);
        }, 200);

        window.addEventListener('message', (event) => {
            if (popup && !popup.closed && event.data.token) {
                clearInterval(interval);
                popup.close();

                const token = event.data.token;
                console.log('Got token from auth!');
                $cookies.set('token', token);
                this.RefreshInfo(event.data.user);
            }
        });

        window.addEventListener('beforeunload', (_) => {
            if (popup && !popup.closed) {
                popup.close();
            }
        });
    }

    static async RefreshInfo(id) {
        await API.PerformGet('/user/' + id)
            .then((res) => {
                state.user = res.data;
                $cookies.set('user', res.data);
                state.user = res.data;
            }).catch((err) => {
                console.error(err);
            });
    }
}

async function perform(endpoint, method, body = {}) {
    var data = {
        method: method,
        headers: createHeaders()
    };

    if (method != 'GET')
        data = Object.assign(data, { body: JSON.stringify(body) })

    return fetch(Config.APIUrl + endpoint, data).then((response) => response.json());
}

function createHeaders() {
    var headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    if ($cookies.get('token')) {
        headers.Authorization = $cookies.get('token');
    }

    return headers;
}
