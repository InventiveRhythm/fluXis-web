<script setup lang="ts">
import type IconTextbox from '~/components/icon-textbox.vue';
import type { APIResponseErrors } from '~/models/APIResponse';
import type APIClub from '~/models/clubs/APIClub';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const imageAccept = ['image/png', 'image/jpeg'];
const imageAcceptString = imageAccept.join(', ');
const club = ref<APIClub>();
const loading = ref<boolean>(false);
const error = ref<APIResponseErrors>();

const name = ref<string>();
const colorStart = ref<string>();
const colorEnd = ref<string>();
const iconString = ref<string>();
const bannerString = ref<string>();

function Open(c: APIClub) {
    club.value = c;
    name.value = c.name;

    colorStart.value = c.colors[0].color;
    colorEnd.value = c.colors[1].color;
}

function UpdateColor(v: string, end: boolean) {
    if (end) colorEnd.value = v;
    else colorStart.value = v;
}

async function Perform() {
    if (loading.value || !club.value || !name.value) return;

    loading.value = true;

    const { error: err } = await API.PerformPatch<APIClub>(`/clubs/${club.value?.id}`, {
        name: name.value,
        icon: GetAssetB64(iconString.value),
        banner: GetAssetB64(bannerString.value),
        'color-start': colorStart.value,
        'color-end': colorEnd.value
    });

    loading.value = false;

    if (err) {
        error.value = err;
        return;
    }

    location.reload();
}

function GetAssetB64(input?: string) {
    if (!input) return '';
    return input.split(',')[1];
}

defineExpose({ Open });
</script>

<template>
    <Panel title="Edit Club" :open="club != null" :error="error?._request" @close="club = undefined" icon="fa fa-pencil">
        <IconTextbox v-model="name" icon="font" placeholder="Name" maxlength="32" />
        <div class="flex flex-row gap-4" v-if="club">
            <label for="icon" class="overlap-grid group size-32">
                <img class="size-32 rounded-xl object-cover" :src="iconString || Assets.ClubIcon(club)" alt="club icon" />
                <ClickToChange />
            </label>
            <input
                ref="icon"
                class="hidden"
                type="file"
                id="icon"
                :accept="imageAcceptString"
                @change="(e) => utils.GetBase64FromInput(e.target as HTMLInputElement, imageAccept, (v) => (iconString = v))"
            />
            <label for="banner" class="overlap-grid group h-32 flex-grow">
                <img class="h-full w-full rounded-xl object-cover" :src="bannerString || Assets.ClubBanner(club)" alt="club banner" />
                <ClickToChange />
            </label>
            <input
                ref="banner"
                class="hidden"
                type="file"
                id="banner"
                :accept="imageAcceptString"
                @change="(e) => utils.GetBase64FromInput(e.target as HTMLInputElement, imageAccept, (v) => (bannerString = v))"
            />
        </div>
        <div class="flex gap-2" v-if="club">
            <ColorPicker :color="colorStart" class="size-12 rounded-lg border-none" @input="(v) => UpdateColor(v, false)" />
            <div
                class="h-12 flex-1 rounded-lg"
                :style="{
                    background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`
                }"
            ></div>
            <ColorPicker :color="colorEnd" class="size-12 rounded-lg border-none" @input="(v) => UpdateColor(v, true)" />
        </div>
        <div class="flex flex-row justify-end">
            <Button class="bg-highlight px-5 py-2 text-dark-2" :class="{ 'opacity-50': loading }" @click="Perform">Save & Update</Button>
        </div>
    </Panel>
</template>
