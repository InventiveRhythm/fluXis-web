<script setup>
import Config from "@/config.json";
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let react = reactive({
    user: $cookies.get('user')
});

function userClick(e) {
    if (react.user) {
        router.push('/user/' + react.user.id);
    }
    else {
        router.push('/login');
    }

    closeUserOverlay();
}
</script>

<template>
    <div class="hidden" id="user-overlay">
        <div class="dim" onclick="closeUserOverlay()"></div>
        <div class="width-wrapper">
            <div class="wrapper">
                <div class="overlay-content">
                    <div class="user" :onclick=userClick>
                        <img v-if="react.user" :src="Config.apiUrl + '/assets/banner/' + react.user.id" alt="" class="banner">
                        <img v-else :src="Config.apiUrl + '/assets/banner/-1'" alt="" class="banner">
                        <div class="banner-dim"></div>
                        <div class="info">
                            <img v-if="react.user" :src="Config.apiUrl + '/assets/avatar/' + react.user.id" alt="" class="avatar">
                            <img v-else :src="Config.apiUrl + 'assets/avatar/-1'" alt="" class="avatar">

                            <p v-if="react.user" class="name">{{ react.user.username }}</p>
                            <p v-else class="name">Not Logged in</p>
                        </div>
                    </div>
                    <div class="links" v-if="react.user">
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
        background-color: rgba(0, 0, 0, 0.5);
    }

    .width-wrapper {
        width: 1500px;
        position: relative;
        margin: 0 auto;

        @media screen and (max-width: 1540px) {
            width: 100%;
        }
    }

    .wrapper {
        position: absolute;
        right: 0;
        margin: 20px;
        margin-top: 80px;

        .overlay-content {
            width: 300px;
            background-color: var(--bg);
            border-radius: 20px;
            padding: 10px;
            transition: transform .2s;

            .user {
                height: 150px;
                border-radius: 10px;
                overflow: hidden;
                display: grid;
                cursor: pointer;

                .banner {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    grid-row: 1;
                    grid-column: 1;
                }

                .banner-dim {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    grid-row: 1;
                    grid-column: 1;
                    transition: background-color .2s;
                }

                .info {
                    grid-row: 1;
                    grid-column: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .avatar {
                        width: 60px;
                        height: 60px;
                        object-fit: cover;
                        margin-bottom: 5px;
                        border-radius: 5px;
                    }
                }

                &:hover {
                    .banner-dim {
                        background-color: rgba(0, 0, 0, 0.4);
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
            transform: scale(1.1);
        }
    }
}
</style>