<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { Marked } from "marked";
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";
import { startLoading, stopLoading } from '../../utils/Loading';
import Utils from '@/utils/Utils';

const route = useRoute();
const router = useRouter();

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

const react = reactive({
    article: '',
    contents: [],
    path: pathArray
});

startLoading();
Utils.SetTitle("/" + path);

const lang = "en";

fetch('/fluxis-wiki/' + path + '/' + lang +  '.md')
    .then(response => response.text())
    .then(render);

function render(data) {
    if (!data) return render("We couldn't find the page you were looking for.\n\n[Go back to the wiki home page](/wiki/home)");

    let title = data.match(/# (.*)/);
    if (title) {
        Utils.SetTitle(title[1] + " - wiki");
        react.path[react.path.length - 1].title = title[1];
    }

    let sections = data.split("\n").filter(line => line.startsWith("## ") || line.startsWith("### "));
    if (sections) {
        react.contents = sections.map(section => {
            console.log(section);
            const link = section.replaceAll("#", '').toLowerCase().trim().replaceAll(" ", '-');
            const title = section.replaceAll("#", '').trim();

            return {
                link: link,
                title: title,
                isH3: section.startsWith("### ")
            }
        });
    }

    const marked = new Marked(
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
              const language = hljs.getLanguage(lang) ? lang : 'plaintext';
              return hljs.highlight(code, { language }).value;
            }
        })
    );

    data = marked.parse(data);
    react.article = data;
    stopLoading();
    setTimeout(postProcess, 100);
}

function postProcess() {
    const links = document.querySelectorAll('.article a');

    links.forEach(link => {
        const url = link.getAttribute('href');

        if (!url.startsWith('/') && !url.startsWith('#')) {
            link.setAttribute('target', '_blank');
            return;
        }

        link.addEventListener('click', event => {
            event.preventDefault();
            router.push(url);
        });
    });

    if (route.hash) {
        const h = document.getElementById(route.hash.split("#")[1]);
        
        if (h)
            h.scrollIntoView();
	};
}

function edit() {
    const repo = "https://github.com/InventiveRhythm/fluXis-wiki";

    const path = route.path.split('/').slice(2).join('/').toLowerCase();
    const url = repo + "/edit/main/" + path + ".md";

    window.open(url, '_blank');
}
</script>

<template>
    <div class="wiki">
        <div class="wiki-header">
            <div class="wiki-path">
                <p>
                    <router-link to="/wiki/home">Home</router-link>
                    <span v-for="section in react.path">
                        <!-- <i class="fa fa-chevron-right"></i> -->
                        <span> / </span>
                        <router-link :to="'/wiki/' + section.link">{{ section.title }}</router-link>
                    </span>
                </p>
            </div>
            <a @click="edit">
                <div class="edit">
                    <i class="fa fa-github"></i>
                    Edit this page
                </div>
            </a>
        </div>
        <div class="wiki-content">
            <div class="nav">
                <h3>Contents</h3>
                <a v-for="content in react.contents" :href="'#' + content.link">
                    <p :class="content.isH3 ? 'sub-section' : ''">{{ content.title }}</p>
                </a>
            </div>
            <div class="article">
                <div v-if="react.article" v-html="react.article"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">.wiki {
    width: 100%;
    background-color: var(--bg-secondary);
    border-radius: 30px;
    padding: 10px;

    .wiki-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;

        .wiki-path {
            width: 100%;
            padding: 10px 20px;
            font-size: 14px;
            text-align: left;
            background-color: var(--bg-triary);
            border-radius: 20px 10px 10px 10px;
            margin-right: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;

            i {
                margin: 0 5px;
            }

            a:hover {
                color: var(--highlight);
            }
        }

        .edit {
            padding: 10px 20px;
            font-size: 14px;
            text-align: right;
            background-color: var(--accent-secondary);
            border-radius: 10px 20px 10px 10px;
            word-wrap: normal;
            width: max-content;
            cursor: pointer;

            i {
                margin-right: 5px;
            }
        }
    }

    .wiki-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        text-align: left;

        .nav {
            width: 400px;
            margin-right: 10px;
            background-color: var(--bg-triary);
            border-radius: 10px 10px 10px 20px;
            padding: 20px;

            h3 {
                margin-bottom: 10px;
            }

            a {
                display: block;
                font-size: 14px;
                margin-bottom: 2px;

                &:hover {
                    color: var(--highlight);
                }

                .sub-section {
                    padding-left: 20px;
                }
            }
        }

        .article {
            width: 100%;
            padding: 0 20px 20px 20px;
            font-size: 14px;
            line-height: 1.5;
            background-color: var(--bg-triary);
            border-radius: 10px 10px 20px 10px;

            h1 {
                font-size: 1.875rem;
                line-height: 2.25rem;
            }

            h2 {
                font-size: 1.5rem;
                line-height: 2rem;
            }

            h3 {
                font-size: 1.25rem;
                line-height: 1.75rem;
            }

            h4 {
                font-size: 1.125rem;
                line-height: 1.75rem;
            }

            h1, h2 {
                margin-top: 20px;
                border-bottom: 1px solid rgba($color: #ffffff, $alpha: .4);
            }

            h3, h4 {
                margin-top: 15px;
            }

            h5, h6 {
                margin-top: 10px;
            }

            p {
                font-size: 0.875rem;
                line-height: 1.25rem;

                margin-top: 10px;

                code {
                    padding: 2px 5px;
                }
            }

            a {
                color: var(--highlight);
            }

            ul {
                margin-top: 10px;
                margin-left: 20px;

                code {
                    padding: 2px 5px;
                }
            }

            pre {
                background-color: var(--bg-secondary);
                padding: 10px;
                border-radius: 10px;
                margin-top: 10px;
                overflow-x: auto;
            }

            code {
                background-color: var(--bg-secondary);
                border-radius: 5px;
                
                span {
                    font-family: monospace;
                }
            }

            blockquote {
                margin-top: 10px;
                padding: 10px;
                background-color: var(--bg-secondary);
                border-left: 5px solid var(--highlight);
                border-radius: 10px;

                > p:first-child {
                    margin-top: 0;
                }
            }

            img {
                max-width: 100%;
                border-radius: 10px;
                margin-top: 10px;
            }

            table {
                margin-top: 10px;
                border-collapse: collapse;

                img {
                    margin-top: 0;
                }
                
                th, td {
                    border: 1px solid rgba($color: #ffffff, $alpha: .4);
                }

                th {
                    padding: 5px 20px;
                }

                td {
                    padding: 5px 10px;
                }
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .wiki {
        .wiki-content {
            flex-direction: column;

            .nav {
                display: none;
            }

            .article {
                border-radius: 10px 10px 20px 20px;
            }
        }
    } 
}

@media screen and (max-width: 600px) {
    .wiki {
        .wiki-header {
            flex-direction: column;

            .wiki-path {
                border-radius: 20px 20px 10px 10px;
            }

            .edit {
                display: none;
            }

            .article {
                border-radius: 10px 10px 20px 20px;
            }
        }
    } 
}
</style>