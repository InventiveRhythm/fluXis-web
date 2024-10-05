<script setup>
import { RouterLink } from 'vue-router';

import UserHeaderGroup from './header/UserHeaderGroup.vue';
import UserHeaderButton from './header/UserHeaderButton.vue';

import ClubTag from '../../../components/ClubTag.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';
import { emitEvent } from '@/utils/Events';
import { state } from '@/utils/State';

// used for people without a group
// e.g. normal users
// the header kinda looks dumb without a group tag so we use this
const defaultGroup = {
    id: "member",
    name: "Member",
    color: "#AA99FF"
};

const props = defineProps({
    user: Object
});

function OpenEdit() {
    emitEvent('user-edit-overlay', props.user);
}
</script>

<template>
    <div class="w-full md:h-96 xl:h-auto xl:aspect-header xl:rounded-3xl overflow-hidden overlap-grid">
        <LoadingImage class="object-cover h-full md:h-inherit xl:h-auto xl:aspect-header"
            :src="Assets.Banner(user)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-col items-center justify-center py-5 md:py-0">
            <div class="w-full max-w-[1200px] md:px-10 flex flex-col items-center justify-center gap-5">
                <div class="flex flex-col md:flex-row md:h-32 items-center self-stretch gap-3">
                    <div class="size-32">
                        <LoadingImage class="size-full rounded-3xl shadow-normal object-cover"
                            :src="Assets.Avatar(user)" />
                    </div>
                    <div class="flex-1 flex flex-col justify-center items-center gap-1 leading-none drop-shadow-text">
                        <div class="w-full flex flex-col md:flex-row gap-3 justify-between items-center">
                            <div class="flex gap-3" v-if="user.groups.length > 0">
                                <UserHeaderGroup :group="group" v-for="group in user.groups" />
                            </div>
                            <UserHeaderGroup :group="defaultGroup" v-else />
                            <div class="text-base" v-if="user.online">
                                Currently Online
                            </div>
                            <div class="text-base" v-else-if="user.lastlogin">
                                <span class="opacity-80">Last online</span>
                                {{ user.lastloginString }}
                            </div>
                        </div>
                        <div class="w-full flex justify-center md:justify-start items-center gap-3">
                            <ClubTag class="text-3xl" :club="user.club" />
                            <p class="text-5xl" v-if="!user.displayname">{{ user.username }}</p>
                            <p class="text-5xl" v-if="user.displayname">{{ user.displayname }}</p>
                        </div>
                        <div v-if="user.username || user.pronouns"
                            class="w-full flex justify-center md:justify-start items-center gap-3">
                            <p class="text-2xl opacity-80" v-if="user.displayname">{{ user.username }}</p>
                            <p class="text-xl opacity-60" v-if="user.pronouns">{{ user.pronouns }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full md:h-12 flex flex-col md:flex-row gap-3 justify-between items-center drop-shadow-text">
                    <div class="flex h-full gap-3">
                        <RouterLink to="/rankings/overall">
                            <UserHeaderButton>
                                <i class="fas fa-globe-americas w-5"></i>
                                #{{ user.stats.global }}
                            </UserHeaderButton>
                        </RouterLink>
                        <RouterLink :to="'/rankings/country/' + user.country">
                            <UserHeaderButton v-if="user.country">
                                <span :class="'fi fi-' + user.country + ' flag sizwe-5'"></span>
                                #{{ user.stats.country }}
                            </UserHeaderButton>
                        </RouterLink>
                    </div>
                    <div class="flex h-full gap-3">
                        <!-- The arbitrary padding needed to make the button a circle -->
                        <UserHeaderButton class="!px-[14px]" onclick="alert('Not implemented yet.')">
                            <i class="fas fa-share-nodes w-5"></i>
                        </UserHeaderButton>
                        <UserHeaderButton :onclick="OpenEdit" v-if="state.user && state.user.id == user.id">
                            <i class="fas fa-pencil w-5"></i>
                            Edit
                        </UserHeaderButton>
                        <template v-else>
                            <UserHeaderButton class="!bg-accent-2 text-dark-2" onclick="alert('Not implemented yet.')" v-if="user.following">
                                <i class="fas fa-heart w-5"></i>
                                Following
                            </UserHeaderButton>
                            <UserHeaderButton onclick="alert('Not implemented yet.')" v-else>
                                <i class="fas fa-heart w-5"></i>
                                Follow
                            </UserHeaderButton>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>