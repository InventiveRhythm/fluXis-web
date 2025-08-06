<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';
import Assets from '~/utils/assets';

const imageAccept = 'image/png, image/jpeg';
const club = ref<APIClub>();

function Open(c: APIClub) {
    club.value = c;
}

function UpdateIcon() {}
function UpdateBanner() {}

defineExpose({ Open });
</script>

<template>
    <Panel title="Edit Club" :open="club != null" @close="club = undefined">
        <IconTextbox icon="font" placeholder="Name" maxlength="16" />
        <div class="flex flex-row gap-4" v-if="club">
            <label for="icon">
                <img class="size-32 rounded-xl object-cover" :src="Assets.ClubIcon(club)" alt="club icon" />
            </label>
            <input ref="icon" class="hidden" type="file" id="icon" :accept="imageAccept" @change="UpdateIcon" />
            <label for="banner" class="flex-grow">
                <img class="h-32 w-full rounded-xl object-cover" :src="Assets.ClubBanner(club)" alt="club banner" />
            </label>
            <input ref="banner" class="hidden" type="file" id="banner" :accept="imageAccept" @change="UpdateBanner" />
        </div>
    </Panel>
</template>
