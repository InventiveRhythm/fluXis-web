import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

if (navigator.getEnvironmentIntegrity !== undefined) {
    replaceWebsite();
}
else {
    const app = createApp(App)
    app.use(VueCookies, { expireTimes: '7d' })
    app.use(router)
    app.mount('#app')
}

function replaceWebsite() {
    let body = "<h1>Hi there, Chromium user.</h1>";
    body += "<br>";
    body += '<p>It seems like the browser you are currently using supports the <a href="https://github.com/RupertBenWiser/Web-Environment-Integrity">Web Environment Integrity API</a>.</p>';
    body += "<br>";
    body += '<p>This user-hostile addition to chromium-based browsers that <a href="https://yewtu.be/watch?v=0i0Ho-x7s_U">works to undermine the free and open internet</a> and will not be supported.</p>';
    body += "<br>";
    body += '<p>For a better experience, please use a browser that respects your privacy and freedom, such as <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>.</p>';

    let div = document.createElement('div');
    div.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height:100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #ffffff; line-height: 1.5;';
    div.innerHTML = body;

    let style = document.createElement('style');
    style.innerHTML = 'a { color: var(--accent-primary); }';

    document.body.innerHTML = '';
    document.body.appendChild(div);
    document.body.appendChild(style);
}
