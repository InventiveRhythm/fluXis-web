<script setup>
import Config from "@/config.json";
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { registerEvent } from '@/utils/Events';
import Utils from "@/utils/Utils";
import API from "../../utils/API";

const router = useRouter();

registerEvent('user-overlay', (status) => {
    if (status)
        document.getElementById('user-overlay').classList.remove('hidden');
    else
        document.getElementById('user-overlay').classList.add('hidden');
});

function userClick() {
    if (Utils.globalReact.user) {
        router.push('/u/' + Utils.globalReact.user.id);
    }
    else {
        openLogin();
    }

    Utils.closeUserOverlay();
}

function openLogin() {
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

            API.get('/account').then((res) => {
                Utils.globalReact.user = res.data;
                $cookies.set('user', res.data);
                Utils.globalReact.user = res.data;
            }).catch((err) => {
                console.error(err);
            });
		};
    });

	window.addEventListener("beforeunload", (_) => {
		if (popup && !popup.closed) {
			popup.close();
		};
	});
}

function getRoleTag(roleid) {
    switch (roleid) {
        case 1:
            return "featured-artist";
        case 2:
            return "purifier";
        case 3:
            return "moderator";
        case 4:
            return "admin";
        case 5:
            return "fluxel";
        default:
            return "";
    }
}

function getRoleIcon() {
    switch (Utils.globalReact.user.role) {
        case 1: // featured artist
            return "fas fa-star";
        case 2: // purifier
            return "fas fa-diamond";
        case 3: // moderator
            return "fas fa-shield-halved";
        case 4: // admin
            return "fas fa-user-shield";
        case 5: // fluxel
            return "fas fa-user-astronaut";
        default:
            return "";
    }
}

function getColor() {
    if (Utils.globalReact.user)
        return "--color: var(--tag-role-" + getRoleTag(Utils.globalReact.user.role) + ")";

    return "";
}
</script>

<template>
    <div class="hidden" id="user-overlay">
        <div class="dim" @click="Utils.closeUserOverlay"></div>
        <div class="width-wrapper">
            <div class="wrapper">
                <div class="overlay-content">
                    <div class="user" :onclick=userClick>
                        <img v-if="Utils.globalReact.user" :src="Config.apiUrl + '/assets/banner/' + Utils.globalReact.user.id" alt="" class="banner">
                        <img v-else :src="Config.apiUrl + '/assets/banner/-1'" alt="" class="banner">
                        <div class="banner-dim"></div>
                        <div class="info" :style=getColor()>
                            <img v-if="Utils.globalReact.user" :src="Config.apiUrl + '/assets/avatar/' + Utils.globalReact.user.id" alt="" class="avatar">
                            <img v-else :src="Config.apiUrl + '/assets/avatar/-1'" alt="" class="avatar">

                            <div class="name-flex">
                                <i v-if="Utils.globalReact.user" :class=getRoleIcon()></i>

                                <p v-if="Utils.globalReact.user && Utils.globalReact.user.displayname" class="name">{{ Utils.globalReact.user.displayname }}</p>
                                <p v-else-if="Utils.globalReact.user" class="name">{{ Utils.globalReact.user.username }}</p>
                                <p v-else class="name">Not Logged in</p>
                            </div>

                            <p v-if="Utils.globalReact.user && Utils.globalReact.user.displayname" class="username">{{ Utils.globalReact.user.username }}</p>
                        </div>
                    </div>
                    <div class="links" v-if="Utils.globalReact.user">
                        <RouterLink class="link" to="/logout">
                            Log out
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#user-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: all;
    opacity: 1;
    transition: all .2s;

    .dim {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
    }

    .width-wrapper {
        width: 100vw;
        position: relative;
        margin: 0 auto;

        @media screen and (max-width: 1540px) {
            width: 100%;
        }
    }

    .wrapper {
        position: absolute;
        right: 0;
        // margin: 20px;
        margin-top: 80px;

        .overlay-content {
            width: 300px;
            background-color: var(--bg);
            border-radius: 0 0 0 20px;
            padding: 15px 10px 10px 10px;
            transition: transform .2s;
            box-shadow: var(--box-shadow);
            position: relative;
            z-index: 80;

            .user {
                height: 150px;
                border-radius: 10px;
                overflow: hidden;
                display: grid;
                cursor: pointer;
                text-shadow: var(--text-shadow-2);

                > * {
                    position: relative;
                    grid-area: 1 / 1;
                    width: 100%;
                    height: inherit;
                }

                .banner {
                    object-fit: cover;
                }

                .banner-dim {
                    background-color: var(--bg-secondary);
                    opacity: .5;
                    transition: 200ms;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 81;

                    .avatar {
                        width: 60px;
                        height: 60px;
                        object-fit: cover;
                        margin-bottom: 5px;
                        border-radius: 5px;
                        box-shadow: var(--box-shadow-5);
                    }

                    .name-flex {
                        display: flex;
                        align-items: center;
                        color: var(--color);
                        gap: 5px;
                        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));
                    }

                    .username {
                        font-size: 12px;
                        color: var(--text-color-secondary);
                        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .25));
                    }
                }

                &:hover {
                    .banner-dim {
                        opacity: .4;
                        transition: 50ms;
                    }
                }
            }

            .links {
                display: flex;
                flex-direction: column;
                margin-top: 10px;
                background-color: var(--bg-secondary);
                border-radius: var(--border);
                overflow: hidden;

                .link {
                    padding: 5px 10px;
                    transition: background-color .3s;

                    &:hover {
                        background-color: var(--bg-hover);
                    }
                }
            }
        }
    }

    &.hidden {
        pointer-events: none;
        opacity: 0;

        .wrapper .overlay-content {
            transform: translateY(-10px);
        }
    }
}
</style>