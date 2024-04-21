<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { reactive } from 'vue';

import FluXisText from '@/assets/images/logo-text.png';

import NavLink from './NavLink.vue';
import NavProfile from "./NavProfile.vue";

import Utils from '@/utils/Utils';
    
const router = useRouter();

let react = reactive({
    user: $cookies.get('user')
});

function onProfileClick(e) {
    if (e.button == 0) {
        Utils.openUserOverlay();
    }

    if (e.button == 2 && react.user) {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            router.push('/logout');
        }
    }
}
</script>

<template>
    <nav>
        <div class="nav-wrapper">
            <div class="mobile-spacer"></div>
            <div class="nav-links">
                <RouterLink to="/">
                    <div class="nav-title">
                        <img :src=FluXisText alt="fluXis">
                        <!-- <h1>fluXis</h1> -->
                    </div>
                </RouterLink>

                <NavLink to="/" text="Home" icon="home"
                    :dropdown="[
                        {
                            text: 'News',
                            to: '/news'
                        },
                        {
                            text: 'Team',
                            to: '/team'
                        },
                        {
                            text: 'Changelog',
                            to: '/changelog'
                        },
                        {
                            text: 'Download',
                            to: '/download'
                        }
                    ]"/>

                <NavLink to="/maps" text="Maps" icon="map"
                    :dropdown="[
                        {
                            text: 'Map Listing',
                            to: '/maps'
                        },
                        {
                            text: 'Featured Artists',
                            to: '/maps/artists'
                        }
                    ]"/>

                <NavLink to="/rankings/overall" text="Rankings" icon="trophy"
                    :dropdown="[
                        {
                            text: 'Overall Rating',
                            to: '/rankings/overall'
                        },
                        {
                            text: 'Potential Rating',
                            to: '/rankings/potential'
                        },
                        {
                            text: 'Most Played Maps',
                            to: '/rankings/mostPlayed'
                        },
                        {
                            text: 'Country Rankings',
                            to: '/rankings/country'
                        }
                    ]"/>

                <NavLink to="/wiki/Home" text="Wiki" icon="book"/>
            </div>
            <NavProfile/>
        </div>
    </nav>
</template>

<style lang="scss">
nav {
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    z-index: 100;

    .nav-wrapper {
        width: 100%;
        height: 80px;
        margin: 0 auto;
        display: flex;
        // border-radius: 0 0 20px 20px;
        transition: border-radius .3s;
        justify-content: space-between;
        align-items: center;
        background-color: var(--bg-secondary);
        box-shadow: var(--box-shadow-no-offset);
        position: relative;
        z-index: 100;

        @media screen and (max-width: 1540px) {
            width: 100%;
            border-radius: 0;
        }

        .nav-links {
            display: flex;
            align-items: center;
            z-index: inherit;
            padding: 0 10px;

            .nav-title {
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: var(--border);
                transition: background-color .3s;

                &:hover {
                    background-color: var(--bg-hover);
                }

                img {
                    height: 40px;
                    font-size: 40px;
                    display: flex;
                    align-items: center;
                }
            }
        }

        .mobile-spacer {
            width: 60px;
            display: none;
        }

        @media screen and (max-width: 700px) {
            .mobile-spacer {
                display: block;
            }

            .nav-user {
                .icon {
                    display: none;
                }
            }
        }
    }
}

</style>