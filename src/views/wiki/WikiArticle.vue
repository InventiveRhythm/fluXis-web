<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { marked } from 'marked';
import { startLoading, stopLoading } from '../../utils/Loading';

const route = useRoute();
const router = useRouter();

const pathSplit = route.path.split('/');
const path = pathSplit.slice(2).join('/').toLowerCase();

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
setTitle("/" + path);

fetch('/fluxis-wiki/' + path + '.md')
    .then(response => response.text())
    .then(render);

function render(data) {
    if (!data) return render("We couldn't find the page you were looking for.\n\n[Go back to the wiki home page](/wiki/home)");

    let title = data.match(/# (.*)/);
    if (title) {
        setTitle(title[1] + " - wiki");
        react.path[react.path.length - 1].title = title[1];
    }

    let sections = data.split("\n").filter(line => line.startsWith("## "));
    if (sections) {
        react.contents = sections.map(section => {
            let link = section.replace("## ", '').toLowerCase().replaceAll(" ", '-');
            let title = section.replace("## ", '');

            return {
                link: link,
                title: title
            }
        });
    }

    data = marked.parse(data);
    react.article = data;
    stopLoading();
    setTimeout(replaceLinks, 100);
}

function replaceLinks() {
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
            <a onclick="alert('The wiki isn\'t open-source yet!')">
                <div class="edit">
                <!-- <a :href="'https://github.com/TeamFluXis/fluXis-wiki/' + path" target="_blank"> -->
                    <i class="fa fa-github"></i>
                    Edit this page
                </div>
            </a>
        </div>
        <div class="wiki-content">
            <div class="nav">
                <h3>Contents</h3>
                <a v-for="content in react.contents" :href="'#' + content.link">
                    <p>{{ content.title }}</p>
                </a>
            </div>
            <div class="article">
                <div v-if="react.article" v-html="react.article"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.wiki {
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
            opacity: .6;
            cursor: not-allowed;

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
            }
        }

        .article {
            width: 100%;
            padding: 0 20px 20px 20px;
            font-size: 14px;
            line-height: 1.5;
            background-color: var(--bg-triary);
            border-radius: 10px 10px 20px 10px;

            h1,
            h2 {
                margin-top: 20px;
                border-bottom: 1px solid rgba($color: #ffffff, $alpha: .4);
            }

            h3,
            h4 {
                font-size: 20px;
                margin-top: 15px;
            }

            h5,
            h6 {
                margin-top: 10px;
            }

            p {
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
                font-family: monospace;
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
        }
    } 
}

@media screen and (max-width: 600px) {
    .wiki {
        .wiki-header {
            flex-direction: column;

            .wiki-path {
                margin-bottom: 10px;
            }

            .edit {
                width: 100%;
                text-align: center;
            }
        }
    } 
}
</style>