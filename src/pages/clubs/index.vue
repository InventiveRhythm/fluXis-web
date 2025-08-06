<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import API from '~/utils/api';

const { data: clubs } = await API.PerformGet<APIClub[]>('/clubs');

useHead({ title: 'club listing' });
</script>

<template>
    <div class="w-fit-mobile flex flex-col gap-5">
        <div class="flex flex-row gap-2">
            <IconTextbox class="flex-grow" placeholder="Search... (not working)" icon="search" />
            <div
                class="flex size-14 items-center justify-center rounded-xl bg-dark-2 transition-transform active:scale-90"
                v-if="API.CurrentUser.value && !API.CurrentUser.value.club?.id"
            >
                <i class="fa fa-plus text-2xl"></i>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" v-if="clubs">
            <ClubListCard :club="club" v-for="club in clubs" />
        </div>
    </div>
</template>
