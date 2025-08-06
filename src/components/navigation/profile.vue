<script setup lang="ts">
import API from '~/utils/api';
import Assets from '~/utils/assets';

function Click() {
    state.overlays.navuser = !state.overlays.navuser;
}
</script>

<template>
    <div @click="Click" class="flex size-24 items-center justify-center rounded-bl-3xl bg-dark-3 transition-colors hover:bg-dark-4">
        <LoadingImage
            class="size-16 rounded-lg object-cover"
            :src="API.CurrentUser.value ? Assets.Avatar(API.CurrentUser.value) : 'https://assets.flux.moe/avatar/default'"
        />
    </div>
</template>
