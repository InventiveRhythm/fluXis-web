<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~/utils/api';

const noDescPlaceholder = "No description provided.";
const descMaxHeight = "400px";

const props = defineProps<{
    mapset: APIMapSet;
}>();

const textarea = ref<InstanceType<typeof HTMLTextAreaElement>>();
const description = ref('');
const isFetching = ref(true);
const isSaving = ref(false);
const fetchError = ref<string | null>(null);
const isEditing = ref(false);

try {
    const { data } = await API.PerformGet<string>(`/mapsets/${props.mapset.id}/description`);
    description.value = data ?? '';
} catch {
    fetchError.value = 'Failed to load description.';
} finally {
    isFetching.value = false;
}

const canEdit = computed(
    () =>
        utils.IsModerator(API.CurrentUser.value) ||
        API.CurrentUser.value?.id === props.mapset.creator.id
);

function StartEditing() {
    isEditing.value = true;
    nextTick(() => UpdateTextArea());
}

function UpdateTextArea() {
    if (!textarea.value) return;
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}

async function SaveDescription() {
    if (!textarea.value) return;
    const newValue = textarea.value.value;
    isSaving.value = true;
    try {
        await API.PerformPatch<string | null>(
            `/mapsets/${props.mapset.id}/description`,
            { content: newValue || "" }
        );
        description.value = newValue;
    } catch {
        console.error('Failed to save description.');
    } finally {
        isSaving.value = false;
        isEditing.value = false;
    }
}

function CancelEditing() {
    isEditing.value = false;
}
</script>

<template>
    <div class="flex w-full flex-col gap-2">
        <div class="flex flex-row justify-end -mt-7">
            <Button v-if="canEdit && !isEditing" @click="StartEditing" class="bg-dark-3 px-3 py-0.5 text-xs">Edit</Button>
        </div>

        <div v-if="fetchError" class="text-sm text-red">{{ fetchError }}</div>

        <template v-else-if="canEdit && isEditing">
            <textarea
                ref="textarea"
                class="w-full resize-none overflow-hidden rounded-md bg-dark-2 px-3 py-2 placeholder:text-dark-foreground focus:outline-none"
                :style="{ maxHeight: descMaxHeight }"
                @input="UpdateTextArea"
                :value="description"
                placeholder="Enter description..."
                rows="1"
            />
            <div class="flex flex-row justify-end gap-2">
                <Button @click="CancelEditing" class="bg-dark-3 px-3 py-0.5 text-sm" :disabled="isSaving">Cancel</Button>
                <Button @click="SaveDescription" class="bg-highlight px-3 py-0.5 text-sm text-dark-2" :disabled="isSaving">Save</Button>
            </div>
        </template>

        <template v-else>
            <p class="text-sm opacity-80 whitespace-pre-wrap" :style="{ maxHeight: descMaxHeight, overflowY: 'auto' }">
                {{ description || noDescPlaceholder }}
            </p>
        </template>
    </div>
</template>