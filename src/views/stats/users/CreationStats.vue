<script setup>
import { reactive } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js'

import API from '@/utils/API';
import Utils from '@/utils/Utils';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement)

ChartJS.defaults.font.family = 'Renogare Soft'
const react = reactive({
    data: undefined,
    options: {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
            title: {
                display: true,
                text: 'User Registrations'
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

API.PerformGet('/stats/users/creation')
    .then(data => {
        if (!data.data) return

        // the return data is a list of unix seconds
        // we need to convert it to a list of dates
        const dates = data.data.map(date => {
            const d = new Date(0)
            d.setUTCSeconds(date)
            return d
        })

        // then we get registrations per month and year
        const registrations = dates.reduce((acc, date) => {
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            const key = `${month} ${year}`

            if (!acc[key]) acc[key] = 0
            acc[key]++

            return acc
        }, {})

        // then we convert it to a list of objects
        const registrationsList = Object.keys(registrations).map(key => {
            return {
                x: key,
                y: registrations[key]
            }
        })

        // now we can create the chart
        react.data = {
            labels: Object.keys(registrations),
            datasets: [
                {
                    label: 'Registrations',
                    data: registrationsList,
                    fill: false,
                    borderColor: '#3650eb',
                    backgroundColor: '#3650eb',
                    tension: 0.1
                }
            ]
        }
    });

Utils.SetTitle("user registrations");
</script>

<template>
    <Line v-if="react.data" :data="react.data" :options="react.options"></Line>
</template>