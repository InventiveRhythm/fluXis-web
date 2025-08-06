<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const props = defineProps<{
    user: APIUser;
}>();

const { data: followers } = await API.PerformGet<APIUser[]>(`/user/${props.user.id}/followers`);
</script>

<template>
    <div class="flex w-full flex-col justify-center gap-2" v-if="followers">
        <p class="text-left text-xl">
            Followers <span class="ml-1 text-sm opacity-80">{{ followers?.length }}</span>
        </p>
        <div class="flex flex-col items-center gap-2 py-2" v-if="followers.length == 0">
            <i class="fa fa-user-group"></i>
            <p>No followers</p>
        </div>
        <div class="flex w-full flex-col gap-2">
            <NuxtLink class="flex w-full flex-row items-center gap-2" :to="`/u/${u.id}`" v-for="u in followers.slice(0, 3)">
                <LoadingImage class="size-8 rounded-md object-cover" :src="Assets.Avatar(u)" />
                <p class="text-sm">{{ u.username }}</p>
            </NuxtLink>
            <div class="flex flex-row items-center gap-3" v-if="followers.length > 3">
                <p class="mt-1 text-sm leading-none">+{{ followers.length - 3 }} more</p>
                <div class="flex flex-row">
                    <NuxtLink :to="`/u/${u.id}`" class="h-8 w-4 flex-shrink-0" v-for="u in followers.slice(3, 8)">
                        <LoadingImage class="size-8 min-w-8 rounded-full bg-dark-1 object-cover outline outline-2 outline-dark-1" :src="Assets.Avatar(u)" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
