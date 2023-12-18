<script setup>
import Config from "@/config.json";
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let react = reactive({
    user: $cookies.get('user')
});

function userClick() {
    if (react.user) {
        router.push('/u/' + react.user.id);
    }
    else {
        router.push('/login');
    }

    closeUserOverlay();
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
    switch (react.user.role) {
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
    if (react.user)
        return "--color: var(--tag-role-" + getRoleTag(react.user.role) + ")";

    return "";
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
                        <div class="info" :style=getColor()>
                            <img v-if="react.user" :src="Config.apiUrl + '/assets/avatar/' + react.user.id" alt="" class="avatar">
                            <img v-else :src="Config.apiUrl + '/assets/avatar/-1'" alt="" class="avatar">

                            <div class="name-flex">
                                <i v-if="react.user" :class=getRoleIcon()></i>

                                <p v-if="react.user && react.user.displayname" class="name">{{ react.user.displayname }}</p>
                                <p v-else-if="react.user" class="name">{{ react.user.username }}</p>
                                <p v-else class="name">Not Logged in</p>
                            </div>

                            <p v-if="react.user && react.user.displayname" class="username">{{ react.user.username }}</p>
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
                        box-shadow: var(--box-shadow-5);
                    }

                    .name-flex {
                        display: flex;
                        align-items: center;
                        color: var(--color);
                        gap: 5px;
                    }

                    .username {
                        font-size: 12px;
                        color: var(--text-color-secondary);
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
            transform: translateY(-10px);
        }
    }
}
</style>