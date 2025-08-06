<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';
import type APIUserMaps from '~/models/users/APIUserMaps';
import API from '~/utils/api';

const props = defineProps<{
    user: APIUser;
}>();

const { data: maps } = await API.PerformGet<APIUserMaps>(`/user/${props.user.id}/maps`);
</script>

<template>
    <div class="flex flex-col gap-5" v-if="maps">
        <UserPageSection title="Pure" replacement="This user has no pure maps." :empty="maps.ranked.length === 0">
            <UserWrapList>
                <MapCard v-for="map in maps.ranked" :mapset="map" />
            </UserWrapList>
        </UserPageSection>
        <UserPageSection title="Impure/Unsubmitted" replacement="This user has no impure/unsubmitted maps." :empty="maps.unranked.length === 0">
            <UserWrapList>
                <MapCard v-for="map in maps.unranked" :mapset="map" />
            </UserWrapList>
        </UserPageSection>
        <UserPageSection title="Guest Difficulties" replacement="This user has no guest difficulties." :empty="maps.guest_diffs.length === 0">
            <UserWrapList>
                <MapCard v-for="map in maps.guest_diffs" :mapset="map" />
            </UserWrapList>
        </UserPageSection>
    </div>
</template>
