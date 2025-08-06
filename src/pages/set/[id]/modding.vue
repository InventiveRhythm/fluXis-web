<script setup lang="ts">
import type { APIResponseErrors } from '~/models/APIResponse';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import { APIMapSetStatus } from '~/models/maps/APIMapSetStatus';
import { APIModdingActionType, type APIModdingAction } from '~/models/maps/APIModdingAction';
import API from '~/utils/api';
import Assets from '~/utils/assets';
import Markdown from '~/utils/markdown';

const comment = ref<InstanceType<typeof HTMLTextAreaElement>>();
const commentType = ref<APIModdingActionType>(APIModdingActionType.Approve);
const commentError = ref<APIResponseErrors>();
const error = computed(() => commentError.value?.content || commentError.value?._request);

/* const rateBase = ref<InstanceType<typeof HTMLInputElement>>();
const rateRead = ref<InstanceType<typeof HTMLInputElement>>();
const rateTrack = ref<InstanceType<typeof HTMLInputElement>>();
const ratePercept = ref<InstanceType<typeof HTMLInputElement>>();
const rateResult = ref<number>(); */

const props = defineProps<{
    mapset: APIMapSet;
}>();

const { data: actions } = await API.PerformGet<APIModdingAction[]>(`/mapset/${props.mapset.id}/modding`);

function IsLast(action: APIModdingAction) {
    // spacing issue
    if (action.type >= APIModdingActionType.Submitted) return true;

    const idx = actions?.indexOf(action);
    return idx == (actions?.length ?? 0) - 1;
}

nextTick(() => {
    UpdateCommentArea();
});

function UpdateCommentArea() {
    if (!comment.value) return;
    commentError.value = {};

    comment.value.style.height = `auto`;
    comment.value.style.height = `${comment.value.scrollHeight}px`;
}

async function PostComment() {
    if (!comment.value) return;

    const { data, error } = await API.PerformPost<APIModdingAction>(`/mapset/${props.mapset.id}/modding`, {
        type: commentType.value,
        content: comment.value.value
    });

    if (error) {
        commentError.value = error;
        return;
    } else if (data) {
        comment.value.value = '';
        actions?.unshift(data);
    }
}
</script>

<template>
    <div class="flex w-full flex-col gap-4 pt-2">
        <div
            class="flex w-full flex-col gap-1 rounded-lg bg-dark-2 px-3 py-2"
            v-if="mapset.status == APIMapSetStatus.Pending && utils.IsPurifier(API.CurrentUser.value)"
        >
            <p class="text-sm opacity-80" :class="{ 'text-red !opacity-100': error }">{{ error || 'New Comment' }}</p>
            <textarea
                ref="comment"
                class="w-full resize-none overflow-hidden rounded-md bg-dark-2 placeholder:text-dark-foreground focus:outline-none"
                @input="UpdateCommentArea"
                placeholder="Type here..."
                name="comment"
                rows="1"
            />
            <div class="mt-1 flex flex-row items-center justify-between">
                <div class="flex flex-row gap-2 *:rounded-full *:px-2 *:py-0.5 *:text-xs">
                    <div
                        @click="commentType = APIModdingActionType.Note"
                        :class="{ 'bg-cyan !text-dark-2': commentType == APIModdingActionType.Note }"
                        class="text-cyan"
                    >
                        <i class="fa fa-note-sticky"></i>
                        Note
                    </div>
                    <div
                        @click="commentType = APIModdingActionType.Approve"
                        :class="{ 'bg-green !text-dark-2': commentType == APIModdingActionType.Approve }"
                        class="text-green"
                    >
                        <i class="fa fa-check"></i>
                        Approve
                    </div>
                    <div
                        @click="commentType = APIModdingActionType.Deny"
                        :class="{ 'bg-red !text-dark-2': commentType == APIModdingActionType.Deny }"
                        class="text-red"
                    >
                        <i class="fa fa-xmark"></i>
                        Deny
                    </div>
                </div>
                <Button @click="PostComment" class="bg-highlight px-3 py-0.5 text-sm text-dark-2">Post</Button>
            </div>
        </div>
        <div class="flex w-full flex-row gap-3" v-for="action in actions">
            <div class="flex h-full w-8 flex-col items-center justify-center gap-2">
                <div class="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-dark-2 *:text-sm">
                    <i class="fa-solid fa-note-sticky text-cyan" v-if="action.type == APIModdingActionType.Note"></i>
                    <i class="fa-solid fa-xmark text-red" v-else-if="action.type == APIModdingActionType.Deny"></i>
                    <i class="fa-solid fa-check text-green" v-else-if="action.type == APIModdingActionType.Approve"></i>
                    <i class="fa-solid fa-angles-right text-pink" v-else-if="action.type == APIModdingActionType.Submitted"></i>
                    <i class="fa-solid fa-arrows-rotate text-yellow" v-else-if="action.type == APIModdingActionType.Update"></i>
                </div>
                <div v-if="!IsLast(action)" class="h-full w-1 rounded-sm bg-dark-3"></div>
            </div>
            <template v-if="action.type < APIModdingActionType.Submitted">
                <div class="flex flex-1 flex-col gap-2 rounded-lg bg-dark-2 p-4">
                    <div class="flex flex-row items-center gap-2">
                        <LoadingImage class="size-5 rounded-full" :src="Assets.Avatar(action.user)" />
                        <p class="text-xs">
                            {{ action.user.username }}
                            <span class="ml-1 text-2xs opacity-80">{{ formatting.Date(action.time) }}</span>
                        </p>
                    </div>
                    <MDC :value="Markdown.Render(action.content!)" class="comment-content text-sm"></MDC>
                </div>
            </template>
            <template v-else-if="action.type == APIModdingActionType.Submitted">
                <div class="flex h-full flex-1 flex-row items-center gap-2">
                    <LoadingImage class="size-6 rounded-full" :src="Assets.Avatar(action.user)" />
                    <p class="text-sm text-dark-text/80">
                        <span class="text-dark-text">{{ action.user.username }}</span>
                        submitted the mapset to the queue
                        <span class="ml-1 text-xs opacity-60">{{ formatting.Date(action.time) }}</span>
                    </p>
                </div>
            </template>
            <template v-else-if="action.type == APIModdingActionType.Update">
                <div class="flex h-full flex-1 flex-row items-center gap-2">
                    <LoadingImage class="size-6 rounded-full" :src="Assets.Avatar(action.user)" />
                    <p class="text-sm text-dark-text/80">
                        <span class="text-dark-text">{{ action.user.username }}</span>
                        updated the mapset
                        <span class="ml-1 text-xs opacity-60">{{ formatting.Date(action.time) }}</span>
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
.comment-content {
    ul,
    ol {
        @apply list-disc list-inside;
    }
}
</style>
