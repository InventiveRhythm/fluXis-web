<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import type APIUser from '~/models/users/APIUser';
import Assets from '~/utils/assets';
import Format from '~/utils/formatting';

defineProps<{
    club: APIClub;
    member: APIUser;
}>();

function OpenContext(e: MouseEvent) {}

function GetOnlineStatus(member: APIUser) {
    if (member.online) return 'online';

    if (!member.lastlogin) return '';

    return `last online ${Format.TimeAgo(member.lastlogin)}`;
}
</script>

<template>
    <RouterLink :to="`/u/${member.id}`" class="flex w-full flex-row items-center gap-2" @contextmenu.prevent="OpenContext">
        <div class="size-12">
            <LoadingImage :src="Assets.Avatar(member)" class="size-full rounded-lg object-cover" />
        </div>
        <div class="flex flex-col">
            <p>
                <i class="fa-solid fa-crown mr-1.5 text-gold" v-if="club.owner?.id == member.id"></i>
                <template v-if="member.displayname">
                    {{ member.displayname }}
                    <span class="text-sm opacity-80">
                        {{ member.username }}
                    </span>
                </template>
                <template v-else>
                    {{ member.username }}
                </template>
            </p>
            <p class="text-2xs">{{ GetOnlineStatus(member) }}</p>
        </div>
    </RouterLink>
</template>
