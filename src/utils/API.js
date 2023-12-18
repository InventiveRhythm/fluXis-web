import Config from '@/config.json';

export default class API {
    static async get(endpoint) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'GET',
            headers: createHeaders(),
        }).then(response => response.json());
    }

    static async post(endpoint, body) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async put(endpoint, body) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'PUT',
            headers: createHeaders(),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async delete(endpoint) {
        return fetch(Config.apiUrl + endpoint, {
            method: 'DELETE',
            headers: createHeaders(),
        }).then(response => response.json());
    }
}

function createHeaders() {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if ($cookies.get('token')) {
        headers.Authorization = $cookies.get('token');
    }

    return headers;
}