<script setup lang="ts">
import type { APIGroup } from '~/models/other/APIGroup';
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const props = defineProps<{
    user: APIUser;
}>();

const defaultGroup: APIGroup = {
    id: 'member',
    name: 'Member',
    tag: '',
    color: '#AA99FF',
    members: []
};

function OpenEdit() {}

function Share() {
    utils.CopyAndShare(window.location.href, `${formatting.NameWithApostrophe(props.user.username)} profile - fluXis`);
}
</script>

<template>
    <div class="overlap-grid h-96 w-full overflow-hidden xl:aspect-header xl:h-auto xl:rounded-3xl">
        <LoadingImage class="h-full object-cover md:h-inherit xl:aspect-header xl:h-auto" :src="Assets.Banner(user)" />
        <div class="bg-dark-2/50"></div>
        <div class="flex flex-col items-center justify-center py-5 md:py-0">
            <div class="flex w-full max-w-[1200px] flex-col items-center justify-center gap-5 md:px-10">
                <div class="flex flex-col items-center gap-3 self-stretch md:h-32 md:flex-row">
                    <LoadingImage class="size-24 rounded-3xl object-cover md:size-32" :src="Assets.Avatar(user)" />
                    <div class="flex flex-1 flex-col items-center justify-center gap-1 leading-none">
                        <div class="flex w-full flex-col items-center justify-between gap-1 md:flex-row">
                            <div class="flex gap-3" v-if="user.groups.length > 0">
                                <UserHeaderGroup :group="group" v-for="group in user.groups" />
                            </div>
                            <UserHeaderGroup :group="defaultGroup" v-else />
                            <div class="text-base" v-if="user.online">Currently Online</div>
                            <div class="text-base" v-else-if="user.lastlogin">
                                <span class="opacity-80">Last online</span>
                                {{ formatting.TimeAgo(user.lastlogin) }}
                            </div>
                        </div>
                        <div class="flex w-full items-center justify-center gap-3 md:justify-start">
                            <ClubTag class="text-3xl" :club="user.club" />
                            <p class="text-3xl md:text-5xl">{{ user.displayname || user.username }}</p>
                        </div>
                        <div v-if="user.username || user.pronouns" class="flex w-full items-center justify-center gap-3 md:justify-start">
                            <p class="text-xl opacity-80 md:text-2xl" v-if="user.displayname">{{ user.username }}</p>
                            <p class="text-xl opacity-60 md:text-xl" v-if="user.pronouns">{{ user.pronouns }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex w-full flex-col items-center justify-between gap-1 md:h-12 md:flex-row md:gap-3">
                    <div class="flex h-full gap-1 md:gap-3">
                        <RouterLink to="/rankings/overall">
                            <UserHeaderButton>
                                <i class="fas fa-globe-americas w-5"></i>
                                #{{ user.stats.global }}
                            </UserHeaderButton>
                        </RouterLink>
                        <RouterLink :to="'/rankings/country/' + user.country">
                            <UserHeaderButton v-if="user.country">
                                <Icon class="rounded-sm" :name="`flag:${user.country}-1x1`" />
                                #{{ user.stats.country }}
                            </UserHeaderButton>
                        </RouterLink>
                    </div>
                    <div class="flex h-full gap-1 md:gap-3">
                        <UserHeaderButton class="!p-3.5" aria-label="share" @click="Share">
                            <i class="fas fa-share-nodes w-5"></i>
                        </UserHeaderButton>
                        <UserHeaderButton @click="OpenEdit" v-if="API.CurrentUser.value?.id == user.id">
                            <i class="fas fa-pencil w-5"></i>
                            Edit
                        </UserHeaderButton>
                        <template v-else>
                            <UserHeaderButton class="!bg-primary text-dark-2" @click="" v-if="user.following">
                                <i class="fas fa-heart w-5"></i>
                                Following
                            </UserHeaderButton>
                            <UserHeaderButton @click="" v-else>
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
