<script setup>
import { reactive } from 'vue';

import PanelOverlay from '../PanelOverlay.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import API from '@/utils/API';
import { registerEvent } from '@/utils/Events';
import { state } from '@/utils/State';

const react = reactive({
    open: false,
    name: "",
    club: null,
    error: ""
})

registerEvent('club-leave-overlay', club => {
    react.open = true;
    react.club = club;
    react.name = club.name;
    react.error = "";
});

function Perform() {
    API.delete(`/club/${react.club.id}/members/${state.user.id}`).then(async res => {
        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        await API.RefreshInfo(state.user.id);
        location.reload();
    })
}
</script>

<template>
    <PanelOverlay :title="`Are you sure you want to leave '${react.name}'?`" :error="react.error" :open="react.open" :voidclick="() => react.open = false">
        <div class="w-full flex justify-center">
            <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3 text-white text-center text-opacity-75 bg-dark-2 hover:text-dark-2 hover:bg-red" @click="Perform">Yes, leave.</RoundedButton>
        </div>
    </PanelOverlay>
</template>