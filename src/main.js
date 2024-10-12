import { createApp } from 'vue';

import router from './router';
import App from './App.vue';

import API from '@/utils/API';
import { state } from '@/utils/State';

import * as Sentry from '@sentry/vue';

import './assets/main.scss';
import './assets/tailwind.css';

const environment = import.meta.env?.PROD ? 'prod' : 'dev';
console.log('currently running in', environment);

const app = createApp(App);

if (environment === 'prod') {
    Sentry.init({
        app,
        environment,
        dsn: 'https://4f0469931eec0da18117e388f7414866@sentry.flux.moe/4',
        integrations: [
            Sentry.browserTracingIntegration({ router }),
            Sentry.replayIntegration(),
        ],
        enableTracing: true,
        tracesSampleRate: 1,
        tracePropagationTargets: [],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1,
    });
}

app.use(router);
app.mount('#app');

if (state.user)
    API.RefreshInfo(state.user?.id);
