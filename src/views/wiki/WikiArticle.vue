<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { marked, type RendererObject } from 'marked';

import MarkdownView from '@/components/markdown/MarkdownView.vue';

import { StartLoading, StopLoading } from '@/utils/Loading';
import Utils from '@/utils/Utils';

const route = useRoute();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(2).join('/').toLowerCase() || 'home';

const pathArray = path.split('/').map(p => {
    let words = p.replace('-', ' ').replace('_', ' ').split(' ');

    words.forEach((word, index) => {
        words[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });

    return {
        link: p,
        title: words.join(' ')
    };
});

const react = reactive<{
    article: string
    contents: {
        link: string
        title: string
        isH3: boolean
    }[]
    path: {
        link: string
        title: string
    }[]
}>({
    article: '',
    contents: [],
    path: pathArray
});

StartLoading();
Utils.SetTitle('/' + path);

const lang = 'en';

fetch('/fluxis-wiki/' + path + '/' + lang + '.md')
    .then(response => response.text())
    .then(render);

function render(data: string) {
    if (!data) return render('We couldn\'t find the page you were looking for.\n\n[Go back to the wiki home page](/wiki/home)');

    let title = data.match(/# (.*)/);
    if (title) {
        Utils.SetTitle(title[1] + ' - wiki');
        react.path[react.path.length - 1].title = title[1];
    }

    let sections = data.split('\n').filter(line => line.startsWith('## ') || line.startsWith('### '));
    if (sections) {
        react.contents = sections.map(section => {
            const link = section.replace(/#/g, '').toLowerCase().trim().replace(/\W+/g, '-');
            const title = section.replace(/#/g, '').trim();

            return {
                link: link,
                title: title,
                isH3: section.startsWith('### ')
            };
        });
    }

    const config: RendererObject = {
        link: (link) => {
            if (link.href.startsWith('/')) {
                return `<RouterLink to="${link.href}">${link.text}</RouterLink>`;
            }

            return false;
        }
    };

    marked.use({ renderer: config });

    react.article = marked.parse(data).toString();
    StopLoading();
}

function edit() {
    const repo = 'https://github.com/InventiveRhythm/fluXis-wiki';

    const path = route.path.split('/').slice(2).join('/').toLowerCase();
    const url = repo + '/edit/main/' + path + '/en.md';

    window.open(url, '_blank');
}
</script>

<template>
    <div class="w-full bg-dark-2 rounded-3xl rounded-t-none xl:rounded-t-3xl p-3 pt-4 xl:pt-3">
        <div class="w-full flex flex-row mb-2 gap-2">
            <div
                class="flex flex-row items-center flex-1 px-4 py-2 text-sm text-left bg-dark-3 rounded-lg rounded-t-xl md:rounded-tr-lg">
                <p>
                    <router-link class="hover:text-highlight" to="/wiki/home">Home</router-link>
                    <span v-for="section in react.path">
                        <i class="fa fa-chevron-right text-xs mx-2"></i>
                        <router-link class="hover:text-highlight" :to="'/wiki/' + section.link">{{ section.title
                            }}</router-link>
                    </span>
                </p>
            </div>
            <a @click="edit"
               class="hidden md:block px-4 py-2 text-sm text-right bg-primary rounded-lg rounded-tr-xl text-dark-2">
                <i class="fa fa-github mr-1"></i>
                Edit this page
            </a>
        </div>
        <div class="w-full flex flex-row text-left gap-2">
            <div class="hidden lg:block w-60 bg-dark-3 rounded-lg rounded-bl-xl p-4">
                <p class="mb-1 text-sm opacity-80">Contents</p>
                <a class="text-sm mb-1 hover:text-highlight" v-for="content in react.contents"
                   :href="'#' + content.link">
                    <p :class="{ 'pl-4': content.isH3 }">{{ content.title }}</p>
                </a>
            </div>
            <div class="flex-1 max-w-full overflow-scroll p-6 bg-dark-3 text-sm rounded-lg rounded-br-xl">
                <MarkdownView v-if="react.article" :content="react.article" />
            </div>
        </div>
    </div>
</template>