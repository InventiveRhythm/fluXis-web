<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router';

import ErrorContainer from '@/components/status/ErrorContainer.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';

import IconTextBox from '@/components/IconTextBox.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import API from '@/utils/API'
import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils';

const react = reactive({
    loading: true,
    error: "",
    users: []
})

let offset = 0;
let name = "";
let schedule = null;

Load();

function Load() {
    if (schedule)
        clearTimeout(schedule);

    react.loading = true;

    API.get(`/users?offset=${offset}&name=${name}&with=creation,login`).then(res => {
        react.loading = false;

        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        react.users = res.data
    })
}

function OnInput(input) {
    if (react.loading)
        return

    if (schedule)
        clearTimeout(schedule);

    name = input;
    schedule = setTimeout(Load, 200)
}

</script>

<template>
    <div class="w-full flex flex-col gap-5">
        <IconTextBox icon="font" placeholder="Search..." :changed="OnInput" />
        <div>
            <LoadingContainer v-if="react.loading" />
            <ErrorContainer :text="react.error" v-else-if="react.error" />
            <div class="w-full flex flex-col gap-3" v-else>
                <div class="w-full h-auto flex flex-row items-center px-2 gap-3 text-sm">
                    <div class="w-9"></div>
                    <p class="flex-1">Username</p>
                    <p class="w-48">Club</p>
                    <p class="w-28">Last Login</p>
                    <p class="w-28">Creation</p>
                </div>
                <div class="flex flex-col rounded-xl overflow-hidden">
                    <RouterLink :to="`/u/${user.id}`" class="w-full h-12 flex flex-row items-center px-2 gap-3 text-sm bg-dark-2 odd:bg-dark-3"
                        v-for="user in react.users">
                        <div class="size-9">
                            <LoadingImage class="size-full object-cover rounded-md" :src="Assets.Avatar(user.id)" />
                        </div>
                        <p class="flex-1">{{ user.username }}</p>
                        <p class="w-48 line-clamp-1">{{ (user.club || {}).name || "-" }}</p>
                        <p class="w-28">{{ TimeUtils.formatDate(user.lastlogin) }}</p>
                        <p class="w-28">{{ TimeUtils.formatDate(user.created) }}</p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>