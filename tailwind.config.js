const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ './index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
    theme: {
        colors: {
            white: '#fff',
            black: '#000',
            transparent: 'transparent',
            red: '#f55',
            gold: '#d4af37',
            silver: '#c0c0c0',
            bronze: '#cd7f32',
            'highlight': 'hsl(240, 60%, 70%)',
            'primary': 'hsl(240, 66%, 66%)',
            'secondary': 'hsl(284, 55%, 58%)',
            'dark': {
                'text': 'hsl(237, 62%, 93%)',
                '1': 'hsl(240, 20%, 12%)',
                '2': 'hsl(240, 20%, 15%)',
                '3': 'hsl(240, 20%, 18%)',
                '4': 'hsl(240, 20%, 21%)',
                '5': 'hsl(240, 20%, 24%)',
                '6': 'hsl(240, 20%, 27%)',
            },
            'group': {
                'moderators': '#73d173',
                'purifier': '#55b2ff',
            },
            'vote': {
                'up': '#43AFFC',
                'down': '#FDC872',
            },
            mode: {
                '4': '#62bafe',
                '5': '#61f984',
                '6': '#e3bb45',
                '7': '#ec3b8d',
                '8': '#7ae9e9',
            },
        },
        extend: {
            width: {
                'panel': 620,
                'content': 1280, // matches with the xl viewport,
                'inherit': 'inherit',
            },
            dropShadow: {
                'text': '0 2px 2px rgba(0, 0, 0, 0.2)',
            },
            boxShadow: {
                'normal': '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
            aspectRatio: {
                header: '3/1',
            },
            gridRow: {
                '1': '1',
            },
            gridColumn: {
                '1': '1',
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            height: {
                'inherit': 'inherit',
            },
            fontFamily: {
                'rank': 'YoureGone',
            },
            transitionDuration: {
                '50': '50ms',
            },
            zIndex: {
                'loading': '400',
            },
        },
    },
    plugins: [
        plugin(({ addComponents, theme }) => {
            addComponents({
                '.section-gradient': {
                    background: `linear-gradient(90deg, rgba(0, 0, 0) 0%, rgba(0, 0, 0) 20%, transparent 100%)`,
                },
                '.section-gradient-custom': {
                    background: `linear-gradient(90deg, var(--section-gradient-col) 0%, var(--section-gradient-col) 20%, transparent 100%)`,
                },
                '.keymode-gradient': {
                    background: `linear-gradient(90deg, var(--tag-keymode-min) 0%, var(--tag-keymode-max) 100%)`,
                },
                '.home-graph-mask': {
                    'mask-image': 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 98%)'
                }
            });
        }),
    ],
    safelist: [
        {
            pattern: /bg-mode-+/,
        },
    ],
};