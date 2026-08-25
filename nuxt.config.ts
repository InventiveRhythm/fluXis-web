// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-06-08',
    devtools: { enabled: true },
    modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', '@comark/nuxt'],
    srcDir: 'src',
    app: {
        pageTransition: {
            name: 'fade',
            mode: 'out-in',
            type: 'transition'
        },
        layoutTransition: {
            name: 'layout'
        },
        head: {
            title: 'fluXis',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            meta: [{ name: 'darkreader', content: 'meow' }],
            script: [{ src: 'https://kit.fontawesome.com/560d9e0b95.js', crossorigin: 'anonymous' }]
        }
    },
    vite: {
        optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit']
        }
    },
    experimental: {
        asyncContext: true
    },
    devServer: {
        port: 2432
    }
});
