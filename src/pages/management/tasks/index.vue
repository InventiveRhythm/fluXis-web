<script setup lang="ts">
import API from '~/utils/api';

definePageMeta({
    layout: 'management',
    pageTransition: false
});

type Task = {
    name: string;
    interval: string;
    next: string;
};

const { data: tasks } = await API.PerformGet<{ count: number; tasks: Task[] }>('/tasks');
</script>

<template>
    <div class="grid border-collapse grid-cols-3">
        <div class="border-2 border-dark-4 p-2" v-for="task in tasks?.tasks" :key="task.name">
            <div class="flex flex-row justify-between">
                <p>{{ task.name }}</p>
                <p class="items-center text-sm opacity-80" v-if="task.interval">
                    <i class="fa fa-clock-rotate-left mr-1"></i>
                    {{ formatting.ReadableTimeSpan(task.interval) }}
                </p>
            </div>
            <p class="text-sm opacity-80">{{ formatting.DateTime(task.next) }}</p>
        </div>
    </div>
</template>
