<script setup>
import Config from "@/config.json";
import { reactive } from 'vue';
import Axios from 'axios';

let username = '';
let password = '';

var react = reactive({
    error: ""
});

const onLogin = async () => {
    if (username.length > 0 && password.length > 0) {
        try {
            let ax = await Axios.get(Config.apiUrl + '/account/login', {
                headers: {
                    'Content-Type': 'application/json',
                    Username: username,
                    Password: password
                }
            });

            let data = ax.data;

            if (data.status != 200) {
                react.error = data.message;
            } else {
                $cookies.set('user', data.data);
                // $cookies.set('token', data.data.token);
                location = '/';
            }
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
        <div class="login-form">
            <h3>Login to fluXis</h3>
            <p class="error" v-if="react.error">{{ react.error }}</p>
            <input class="username" type="text" v-model="username" placeholder="Username"/>
            <input class="password" type="password" v-model="password" placeholder="Password"/>
            <div class="btns">
                <div class="login-btn" @click="onLogin">Login</div>
            </div>
        </div>
        <div class="register-box">
            <h4>Don't have an account?</h4>
            <p>Download fluXis to create an account!</p>
            <div class="btns">
                <a href="https://dl.flux.moe/fluXis/updater.zip">
                    <div class="login-btn register-btn">Download</div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">   
.box {
    border-radius: 20px;
    margin: 100px 0;
    background-color: var(--bg-secondary);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    text-align: left;

    .login-form {
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

    .username {
        margin-top: 10px;
    }

    .register-box {
        border-radius: 20px;
        padding: 20px;
        background-color: var(--bg-triary);

        p {
            font-size: 12px;
            color: var(--text-color-secondary);
        }
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
    color: white;
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
    color: white;
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
    color: white;
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

.register-btn {
    background-color: var(--bg-quaternary);
    margin-top: 10px;
}
</style>