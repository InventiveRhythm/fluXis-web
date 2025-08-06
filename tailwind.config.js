/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app.vue', './{components,layouts,pages}/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#FFF',
            black: '#000',
            transparent: 'transparent',

            red: 'hsl(0, 100%, 66.66%)',
            orange: 'hsl(20, 100%, 66.66%)',
            yellow: 'hsl(40, 100%, 66.66%)',
            lime: 'hsl(80, 100%, 66.66%)',
            green: 'hsl(120, 100%, 66.66%)',
            aqua: 'hsl(160, 100%, 66.66%)',
            cyan: 'hsl(200, 100%, 66.66%)',
            blue: 'hsl(240, 100%, 66.66%)',
            purple: 'hsl(280, 100%, 66.66%)',
            pink: 'hsl(320, 100%, 66.66%)',

            gold: '#D4AF37',
            silver: '#C0C0C0',
            bronze: '#CD7F32',

            highlight: 'hsl(240, 60%, 70%)',
            primary: 'hsl(240, 66%, 66%)',
            secondary: 'hsl(284, 55%, 58%)',

            dark: {
                text: 'hsl(237, 62%, 93%)',
                foreground: 'hsl(240, 20%, 60%)',
                1: 'hsl(240, 20%, 12%)',
                2: 'hsl(240, 20%, 15%)',
                3: 'hsl(240, 20%, 18%)',
                4: 'hsl(240, 20%, 21%)',
                5: 'hsl(240, 20%, 24%)',
                6: 'hsl(240, 20%, 27%)'
            },
            vote: {
                up: '#43AFFC',
                down: '#FDC872'
            },
            status: {
                pure: '#55B2FF',
                impure: '#FF7B74',
                pending: '#F7B373',
                unsubmitted: '#888888'
            },
            mode: {
                1: '#333346',
                2: '#A53541',
                3: '#FF7A5A',
                4: '#62BAFE',
                5: '#61F984',
                6: '#E3BB45',
                7: '#EC3B8D',
                8: '#7AE9E9',
                9: '#F7C5BB',
                10: '#8C4451'
            },
            rank: {
                x: '#a9a9a9',
                ss: '#ffc14a',
                s: '#ce9b3d',
                aa: '#84ff70',
                a: '#69ca5a',
                b: '#70d7ff',
                c: '#ff70ff',
                d: '#ff686b'
            },
            social: {
                youtube: '#FF0000',
                spotify: '#1ED760',
                soundcloud: '#FF5500',
                twitter: '#1DA1F2'
            }
        },
        extend: {
            width: {
                panel: 620,
                content: 1280, // matches with the xl viewport,
                inherit: 'inherit'
            },
            dropShadow: {
                text: '0 2px 2px rgba(0, 0, 0, 0.2)'
            },
            boxShadow: {
                normal: '0 4px 10px rgba(0, 0, 0, 0.2)'
            },
            aspectRatio: {
                header: '3/1'
            },
            gridRow: {
                1: '1'
            },
            gridColumn: {
                1: '1'
            },
            fontSize: {
                '2xs': '0.625rem'
            },
            height: {
                inherit: 'inherit'
            },
            fontFamily: {
                rank: 'YoureGone',
                base: ['Renogare Soft', 'MOBO']
            },
            transitionDuration: {
                50: '50ms'
            },
            zIndex: {
                loading: '400'
            },
            lineHeight: {
                0: 0
            }
        }
    },
    plugins: [
        /* plugin(({ addComponents, theme }) => {
            addComponents({
                '.section-gradient': {
                    background: `linear-gradient(90deg, rgba(0, 0, 0) 0%, rgba(0, 0, 0) 20%, transparent 100%)`
                },
                '.section-gradient-custom': {
                    background: `linear-gradient(90deg, var(--section-gradient-col) 0%, var(--section-gradient-col) 20%, transparent 100%)`
                },
                '.keymode-gradient': {
                    background: `linear-gradient(90deg, var(--tag-keymode-min) 0%, var(--tag-keymode-max) 100%)`
                },
                '.home-graph-mask': {
                    'mask-image':
                        'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 98%)'
                }
            });
        }) */
    ],
    safelist: [
        {
            pattern: /bg-mode-+/
        },
        {
            pattern: /from-mode-+/
        },
        {
            pattern: /to-mode-+/
        },
        {
            pattern: /bg-status-+/
        },
        {
            pattern: /bg-rank-+/
        }
    ]
};
