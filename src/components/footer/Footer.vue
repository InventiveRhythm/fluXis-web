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
        <div class="links">
            <RouterLink to="/wiki/legal/terms">Terms</RouterLink>
            <RouterLink to="/wiki/legal/privacy">Privacy</RouterLink>
            <a href="https://github.com/TeamFluXis/fluXis" target="_blank">GitHub</a>
            <a href="https://discord.gg/29hMftpNq9" target="_blank">Discord</a>
            <a href="https://twitter.com/fluXisGame" target="_blank">Tweeter</a>
            <a href="https://youtube.com/@fluXisGame" target="_blank">YouTube</a>
        </div>
        TeamFluXis 2023
        <div @click="toggleBlur" class="blur-disable">Toggle Blur</div>
    </div>
</template>

<style lang="scss">
.footer {
    width: 100%;
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: default;

    .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 5px;
    }

    a {
        padding: 5px 10px;

        &:hover {
            color: var(--accent-primary);
        }
    }

    .blur-disable {
        cursor: pointer;
    }
}
</style>