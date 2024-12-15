<script setup lang="ts">
import { reactive } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    type ChartOptions,
    type ChartData,
    Filler
} from 'chart.js';

import type APIOnlineUserStat from '@/api/models/stats/APIOnlineUserStat';

import API from '@/utils/API';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler);

const react = reactive<{
    data?: ChartData<'line'>,
    options: ChartOptions<'line'>
}>({
    options: {
        responsive: false,
        maintainAspectRatio: false,
        layout: {
            padding: 0
        },
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            }
        }
    }
});

API.PerformGet<APIOnlineUserStat[]>('/stats/users/online').then(data => {
    if (!data.data) return;

    const current = new Date();
    const max = 12 * 60 * 60 * 1000;

    data.data.sort((a, b) => a.time - b.time);

    const dates = data.data.map(date => {
        const d = new Date(0);
        d.setUTCSeconds(date.time);
        return d;
    });

    let idx = 0;
    const peaks: any = {};
    const cur: any = {};

    dates.forEach((date: Date) => {
        let key = `${date.getHours()}-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

        if (current.getTime() - date.getTime() > max)
            key = '!' + key;

        if (!cur[key]) {
            let lastVal = 0;
            const keys = Object.keys(cur);

            // get last value, if available
            if (keys.length > 0) {
                const last = keys[keys.length - 1];

                if (last != key) {
                    lastVal = cur[last];
                }
            }

            cur[key] = lastVal;
            peaks[key] = 0;
        }

        const change = data.data![idx];

        if (change.state)
            cur[key]++;
        else
            cur[key]--;

        peaks[key] = Math.max(cur[key], peaks[key]);
        idx++;
    });

    let list: any[] = Object.keys(peaks).map(key => {
        return {
            x: key,
            y: peaks[key]
        };
    });

    // remove all which start with !
    list = list.filter(x => !x.x.startsWith('!'));

    // replace last with current count
    const curKeys = Object.keys(cur);
    const lastKey = curKeys[curKeys.length - 1];
    list.pop();
    list.push({
        x: lastKey,
        y: cur[lastKey]
    });

    react.data = {
        labels: [],
        datasets: [
            {
                label: 'Online Users',
                data: list,
                fill: {
                    target: 'origin',
                    above: 'hsla(240, 66%, 66%, 25%)'
                },
                borderWidth: 3,
                borderColor: 'hsla(240, 66%, 66%, 50%)',
                tension: 0.4,
                pointStyle: false
            }
        ]
    };
});
</script>

<template>
    <Line width="320" height="80" v-if="react.data" :data="react.data" :options="react.options"></Line>
</template>