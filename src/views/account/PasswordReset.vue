<script setup>
import Config from "@/config.json";
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

const route = useRoute();
const queryToken = route.query.token;
let password = '';
console.log(queryToken);

var react = reactive({
    error: queryToken ? '' : 'Token is missing'
});

const onClick = async () => {
    if (password.length > 0) {
        try {
            fetch(Config.apiUrl + '/account/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: queryToken
                },
                body: password
            }).then(res => res.json()).then((data) => {
                if (data.status === 200) {
                    window.location.href = '/login';
                } else {
                    react.error = data.message;
                }
            });
        } catch (error) {
            console.log(error);
            react.error = "Something went wrong...";
        }
    } else {
        react.error = "Please fill out all fields";
    }
}
</script>

<template>
    <div class="box">
        <div class="reset-form">
            <p class="error" v-if="react.error">{{ react.error }}</p>
            <input class="password" type="password" v-model="password" placeholder="Password" />
            <div class="btns">
                <div class="login-btn" @click="onClick">Change</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.box {
    border-radius: 20px;
    margin: 100px 0;
    background-color: var(--bg-secondary);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    text-align: left;
    
    .reset-form {
        padding: 40px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .error {
        color: #ff5555;
        font-size: 13px;
    }

    .password {
        margin-top: 10px;
    }
}

input {
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    background-color: var(--bg-triary);
    color: var(--text-color);
    transition: all .2s;
}

input:focus-visible {
    background-color: rgba(255, 255, 255, 0.2);
    outline: none;
}

.btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.btns p {
    width: 100px;
    height: 30px;
    background-color: var(--bg-triary);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    transition: all .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
}

.btns p:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

.login-btn {
    width: 100px;
    height: 30px;
    background-color: var(--bg-triary);
    color: var(--text-color);
    border: none;
    border-radius: 15px;
    transition: all .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
}

.login-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}
</style>