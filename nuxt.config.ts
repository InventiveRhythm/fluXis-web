// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    srcDir: 'src',
    devtools: { enabled: true },
    modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/mdc'],
    experimental: {
        asyncContext: true
    },
    app: {
        pageTransition: {
            name: 'fade'
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
    devServer: {
        port: 2432
    },
    vite: {
        $server: {
            build: {
                rollupOptions: {
                    output: {
                        preserveModules: true
                    }
                }
            }
        }
    }
});
