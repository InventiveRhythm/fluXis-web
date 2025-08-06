<script setup lang="ts">
import API from '~/utils/api';
import Assets from '~/utils/assets';
</script>

<template>
    <div class="flex items-center justify-between border-b-2 border-b-dark-3 px-4">
        <NuxtLink to="/" class="text-sm opacity-75 hover:opacity-100">
            <i class="fa fa-angle-left mr-1"></i>
            Exit Management
        </NuxtLink>
        <div class="flex flex-row gap-2 items-center" v-if="API.CurrentUser.value">
            <p class="text-sm">{{ API.CurrentUser.value.username }}</p>
            <LoadingImage class="size-8 rounded-md" :src="Assets.Avatar(API.CurrentUser.value)" />
        </div>
    </div>
</template>
