const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#fff',
            black: '#000',
            transparent: 'transparent',
            red: '#f55',
            gold: '#d4af37',
            silver: '#c0c0c0',
            bronze: '#cd7f32',
            'highlight': 'hsl(240, 100%, 70%)',
            'dark': {
                'text': "#fff",
                '1': 'hsl(240, 10%, 10%)',
                '2': 'hsl(240, 10%, 15%)',
                '3': 'hsl(240, 10%, 20%)',
                '4': 'hsl(240, 10%, 25%)',
                '5': 'hsl(240, 10%, 30%)',
                '6': 'hsl(240, 10%, 35%)'
            },
            'light': {
                'text': "hsl(240, 10%, 15%)",
                '1': 'hsl(240, 10%, 90%)',
                '2': 'hsl(240, 10%, 85%)',
                '3': 'hsl(240, 10%, 80%)',
                '4': 'hsl(240, 10%, 75%)',
                '5': 'hsl(240, 10%, 70%)',
                '6': 'hsl(240, 10%, 65%)'
            },
            'accent': {
                '1': '#3650eb',
                '2': '#4846d5',
                '3': '#533ec3',
                '4': '#5f30a7'
            },
            'group': {
                'moderators': '#73d173',
                'purifier': '#55b2ff',
            }
        },
        extend: {
            width: {
                'panel': 620,
                'content': 1280 // matches with the xl viewport
            },
            dropShadow: {
                'text': '0 2px 2px rgba(0, 0, 0, 0.2)',
            },
            boxShadow: {
                'normal': '0 4px 10px rgba(0, 0, 0, 0.2)'
            },
            aspectRatio: {
                header: '3/1'
            },
            gridRow: {
                '1': '1'
            },
            gridColumn: {
                '1': '1'
            },
            fontSize: {
                '2xs': '0.625rem'
            },
            height: {
                'inherit': 'inherit'
            },
            fontFamily: {
                'rank': "YoureGone"
            },
            transitionDuration: {
                '50': '50ms'
            }
        }
    },
    plugins: [
        plugin(function ({ addComponents , theme }) {
            addComponents({
                '.section-gradient': {
                    background: `linear-gradient(90deg, rgba(0, 0, 0) 0%, rgba(0, 0, 0) 20%, transparent 100%)`
                },
                '.section-gradient-custom': {
                    background: `linear-gradient(90deg, var(--section-gradient-col) 0%, var(--section-gradient-col) 20%, transparent 100%)`
                },
                '.keymode-gradient': {
                    background: `linear-gradient(90deg, var(--tag-keymode-min) 0%, var(--tag-keymode-max) 100%)`
                }
            })
        })
    ]
}