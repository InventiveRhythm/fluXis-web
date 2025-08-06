<script setup lang="ts">
import * as chroma from 'chroma.ts';

const { color = '#ffffff' } = defineProps<{
    color?: string;
}>();

const emit = defineEmits<{
    (e: 'input', color: string): void;
}>();

const value = ref(color);
const hsv = ref(chroma.color(color).hsv());
const opened = ref(false);

const dragH = ref(false);
const dragSV = ref(false);

const huebar = ref<InstanceType<typeof HTMLDivElement>>();
const svSquare = ref<InstanceType<typeof HTMLDivElement>>();

function MoveHue(e: MouseEvent) {
    if (!dragH.value) return;

    const node = e.target as HTMLElement;
    const rect = huebar.value?.getBoundingClientRect();

    if (!node || !rect) return;

    hsv.value[0] = Math.min(Math.max((e.clientX - rect.x) / rect.width, 0), 1) * 360;
}

function MoveSatVal(e: MouseEvent) {
    if (!dragSV.value) return;

    const node = e.target as HTMLElement;
    const rect = svSquare.value?.getBoundingClientRect();

    if (!node || !rect) return;

    hsv.value[1] = Math.min(Math.max((e.clientX - rect.x) / rect.width, 0), 1);
    hsv.value[2] = Math.min(Math.max(1 - (e.clientY - rect.y) / rect.height, 0), 1);
}

function InputHex() {
    const inp = window.prompt('Enter new hex color', value.value);
    if (!inp) return;

    try {
        hsv.value = chroma.color(inp).hsv();
    } catch (ex: any) {
        alert(ex.message);
    }
}

function BlockClick(e: MouseEvent) {
    e.stopPropagation();
}

watch(
    hsv,
    (v) => {
        const c = chroma.color(v, 'hsv');
        value.value = c.hex();
    },
    { deep: true, immediate: true }
);

watch(value, (v) => emit('input', v));
defineExpose({ value });
</script>

<template>
    <div class="relative" :style="{ backgroundColor: value }" @click="opened = !opened">
        <Transition name="picker-fade">
            <div
                class="absolute top-full mt-2 flex w-80 origin-top-left flex-col gap-2 rounded-lg bg-dark-2 p-2 drop-shadow-lg transition-all"
                @click="BlockClick"
                v-if="opened"
            >
                <div class="flex w-full flex-row items-center justify-end">
                    <i class="fa fa-times size-4 text-center leading-none opacity-75 hover:opacity-100" @click="opened = false"></i>
                </div>
                <div
                    ref="svSquare"
                    class="relative h-36 w-full overflow-hidden rounded-md"
                    @mousemove="MoveSatVal"
                    @mousedown="
                        (e) => {
                            dragSV = true;
                            MoveSatVal(e);
                        }
                    "
                    @mouseup="dragSV = false"
                    :style="{
                        background: `linear-gradient(90deg, hsl(${hsv[0]}, 0%, 100%), hsl(${hsv[0]}, 100%, 50%))`
                    }"
                >
                    <div class="absolute left-0 top-0 size-full" :style="{ background: `linear-gradient(hsla(0, 100%, 100%, 0%), hsl(0, 100%, 0%))` }">
                        <div
                            ref="marker"
                            class="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dark-text shadow-inner"
                            :class="{ '!border-dark-2': hsv[2] > 0.5 }"
                            :style="{
                                backgroundColor: value,
                                left: `${hsv[1] * 100}%`,
                                top: `${(1 - hsv[2]) * 100}%`
                            }"
                        ></div>
                    </div>
                </div>
                <div
                    class="h-8 w-full rounded-md"
                    ref="huebar"
                    @mousemove="MoveHue"
                    @mousedown="
                        (e) => {
                            dragH = true;
                            MoveHue(e);
                        }
                    "
                    @mouseup="dragH = false"
                    :style="{
                        background:
                            'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))'
                    }"
                ></div>
                <div class="flex flex-row items-center justify-between text-sm">
                    <p @click="InputHex">{{ value }}</p>
                    <p>{{ hsv[0].toFixed(0) }}° {{ (hsv[1] * 100).toFixed(0) }}% {{ (hsv[2] * 100).toFixed(0) }}%</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style>
.picker-fade-leave-to,
.picker-fade-enter-from {
    opacity: 0;
    scale: 0.98;
}
</style>
