import Config from '@/config.json';
import { state } from './State';

export default class API {
    static async get(endpoint) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'GET',
            headers: createHeaders()
        }).then((response) => response.json());
    }

    static async post(endpoint, body) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(body)
        }).then((response) => response.json());
    }

    static async put(endpoint, body) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'PUT',
            headers: createHeaders(),
            body: JSON.stringify(body)
        }).then((response) => response.json());
    }

    static async delete(endpoint) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'DELETE',
            headers: createHeaders()
        }).then((response) => response.json());
    }

    static OpenLogin() {
        const url = Config.authUrl + '/login?app=' + Config.authAppId;
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

    static RefreshInfo(id) {
        API.get('/user/' + id)
            .then((res) => {
                state.user = res.data;
                $cookies.set('user', res.data);
                state.user = res.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
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
