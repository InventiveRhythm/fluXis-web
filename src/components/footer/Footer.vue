<script setup>
import { RouterLink } from 'vue-router'

function toggleBlur() {
    config.blur = !config.blur;
    saveConfig();

    if (config.blur)
        enableBlur();
    else
        disableBlur();
}
</script>

<template>
    <div class="footer">
        <div class="socials">
            <a href="https://github.com/TeamFluXis" target="_blank">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://discord.gg/29hMftpNq9" target="_blank">
                <i class="fab fa-discord"></i>
            </a>
            <a href="https://twitter.com/fluXisGame" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com/@fluXisGame" target="_blank">
                <i class="fab fa-youtube"></i>
            </a>
        </div>
        <div class="links">
            <RouterLink to="/wiki/legal/terms">Terms</RouterLink>
            <RouterLink to="/wiki/legal/privacy">Privacy</RouterLink>
        </div>
        <span>
            Copyright © 2022-2023 <a href="https://flux.moe" target="_blank">Flustix</a>
        </span>
        <div @click="toggleBlur" class="blur-disable">Toggle Blur</div>
    </div>
</template>

<style lang="scss">
.footer {
    width: 100%;
    height: 100px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: default;
    position: absolute;
    bottom: 0;

    .socials, .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        a {
            padding: 5px 10px;
        }
    }

    .socials {
        a i {
            font-size: 16px;
        }
    }

    a {
        &:hover {
            color: var(--highlight);
        }
    }

    .links {
        font-size: 12px;
    }

    .blur-disable {
        cursor: pointer;
    }
}
</style>