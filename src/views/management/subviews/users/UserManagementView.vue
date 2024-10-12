<script setup>
import { reactive } from 'vue';

import ErrorContainer from '@/components/status/ErrorContainer.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';

import Dropdown from '@/components/ui/dropdown/Dropdown.vue';
import IconTextBox from '@/components/IconTextBox.vue';

import UserManagementEntry from './components/UserManagementEntry.vue';

import API from '@/utils/API';

const react = reactive({
    loading: true,
    sorting: 'create-asc',
    error: '',
    users: [],
});

const sortList = [
    {
        id: 'create-asc',
        title: 'Created (Ascending)',
    }, {
        id: 'create-dec',
        title: 'Created (Decending)',
    },
];

let offset = 0;
let name = '';
let schedule = null;

Load();

function Load() {
    if (schedule)
        clearTimeout(schedule);

    react.loading = true;

    API.PerformGet(`/users?offset=${ offset }&name=${ name }&sort=${ react.sorting }&with=creation,login,flags`).
        then(res => {
            react.loading = false;

            if (res.status != 200) {
                react.error = res.message;
                return;
            }

            react.users = res.data;
        });
}

function OnInput(input) {
    if (react.loading)
        return;

    if (schedule)
        clearTimeout(schedule);

    name = input;
    schedule = setTimeout(Load, 200);
}

function UpdateSorting(sort) {
    console.log('setting sort to', sort);
    react.sorting = sort;
    Load();
}
</script>

<template>
    <div class="w-full flex flex-col gap-5">
        <div class="flex flex-row gap-2">
            <IconTextBox class="flex-1" icon="font" placeholder="Search..." :changed="OnInput" />
            <Dropdown class="w-64 h-full" :items="sortList" :current="react.sorting" :selected="UpdateSorting" />
        </div>
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
                    <UserManagementEntry :user="user" v-for="user in react.users" />
                </div>
            </div>
        </div>
    </div>
</template>