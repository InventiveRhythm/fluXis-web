<script setup>
import { reactive } from 'vue';

import PanelOverlay from '@/overlays/PanelOverlay.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import API from '@/utils/API';
import { registerEvent } from '@/utils/Events';

const react = reactive({
    open: false,
    club: {},
    user: {},
    error: ""
})

registerEvent('club-kick-overlay', (ev) => {
    react.open = true;
    react.club = ev.club;
    react.user = ev.user;
    react.error = "";
});

function Perform() {
    API.PerformDelete(`/club/${react.club.id}/members/${react.user.id}`).then(async res => {
        if (res.status != 204) {
            react.error = res.message;
            return;
        }

        location.reload();
    })
}
</script>

<template>
    <PanelOverlay :title="`Are you sure you want to kick ${react.user.username}?`" :error="react.error" :open="react.open" :voidclick="() => react.open = false">
        <div class="w-full flex justify-center">
            <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3 text-white text-center text-opacity-75 bg-dark-2 hover:text-dark-2 hover:bg-red" @click="Perform">Yes, do it.</RoundedButton>
        </div>
    </PanelOverlay>
</template>