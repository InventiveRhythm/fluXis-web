const axios = require("axios");

module.exports = {
    async apiGet(path, headers = {}, token = "") {
        let h = Object.assign({
            "Content-Type": "application/json",
            "Authorization": token
        }, headers);

        try {
            const ax = await axios.get(path, {
                baseURL: "https://api.fluxis.foxes4life.net",
                headers: h
            });
            return ax.data;
        } catch (ex) {
            return {};
        }
    },

    async apiPost(path, data, token) {
        try {
            const ax = await axios.post(path, data, {
                baseURL: "https://api.fluxis.foxes4life.net",
                method: "POST",
                headers: {
                    Authorization: token
                }
            });
            return ax.data;
        } catch (ex) {
            return {};
        }
    }
}