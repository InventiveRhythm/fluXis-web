import { marked, type RendererObject, type Tokens } from 'marked';
import ParsedMarkdown from '~/models/markdown/ParsedMarkdown';
import ParsedSection from '~/models/markdown/ParsedSection';
import ParsedSubSection from '~/models/markdown/ParsedSubSection';
import ParsedImage from '~/models/markdown/ParsedImage';
import Sanitizer from './sanitize';

export class MarkdownTagFilter {
    mode: 'blacklist' | 'whitelist';
    tags: string[];

    constructor(mode: 'blacklist' | 'whitelist', tags: string[]) {
        this.mode = mode;
        this.tags = tags;
    }

    isAllowed(tag: string): boolean {
        return this.mode === 'blacklist'
            ? !this.tags.includes(tag)
            : this.tags.includes(tag);
    }

    isBlocked(tag: string): boolean {
        return !this.isAllowed(tag);
    }
}

export default class Markdown {
    static FootnoteRegex = /\[\^(\d{1,2})\]/g;
    static BlockquoteRegex = /\{: \.(\w+) \}/g;
    static ImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    static GithubAlertRegex = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n?/i;

    static AllowedImageDomains: string[] = [
        'flux.moe',
        'catbox.moe',
        'imgur.com',
        "singlecolorimage.com"
    ];

    static CustomTags: Record<string, { inline?: boolean; render: (inner: string, attr?: string) => string }> = {
        center: { render: (inner) => `<div class="text-center">${inner}</div>` },
        spoiler: { render: (inner, attr) => `<details><summary>${attr || 'Spoiler'}</summary>${inner}</details>` },
        color: { inline: true, render: (inner, attr) => `<span data-color="${attr || 'inherit'}">${inner}</span>` },
    };

    static GithubAlertIcons: Record<string, string> = {
        note: 'fa-circle-info',
        tip: 'fa-lightbulb',
        important: 'fa-flag',
        warning: 'fa-triangle-exclamation',
        caution: 'fa-ban',
    };

    static isImageAllowed(url: string): boolean {
        try {
            if (url.startsWith('/')) {
                return true;
            }

            if (url.startsWith('//')) {
                return true;
            }

            const urlObj = new URL(url, window?.location?.href || '');
            const hostname = urlObj.hostname;

            const currentDomain = window?.location?.hostname || '';
            if (hostname === currentDomain || hostname.endsWith('.' + currentDomain)) {
                return true;
            }

            return this.AllowedImageDomains.some(domain => {
                return hostname === domain || hostname.endsWith('.' + domain);
            });
        } catch {
            return false;
        }
    }

    static Parse(md: string): ParsedMarkdown {
        const data = new ParsedMarkdown(md);
        data.images = [];
        const lines = md.split('\n');

        lines.forEach((line, index) => {
            if (line.startsWith('## ')) {
                const text = line.slice(3);
                const id = line
                    .slice(3)
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w]+/g, '-');
                data.sections.push(new ParsedSection(text, id));
            }

            if (line.startsWith('### ')) {
                const last = data.sections[data.sections.length - 1];
                const text = line.slice(4);
                const id = line
                    .slice(4)
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w]+/g, '-');
                last.subs.push(new ParsedSubSection(text, id));
            }

            const imageMatches = [...line.matchAll(Markdown.ImageRegex)];
            imageMatches.forEach((match) => {
                const alt = match[1];
                const src = match[2];
                
                if (this.isImageAllowed(src)) {
                    if (!data.images) {
                        data.images = [];
                    }
                    
                    data.images.push(new ParsedImage(
                        src,
                        alt,
                        index + 1
                    ));
                }
            });
        });

        return data;
    }

    static async Render(md: string, sanitize: boolean = true, filter: MarkdownTagFilter = new MarkdownTagFilter('blacklist', [])): Promise<string> {
        md = md.replaceAll('<', '&lt;');

        const extracted_customtags: Array<{ placeholder: string; tag: string | null; inner: string; attr?: string }> = [];

        // extract custom tags
        for (const [tag, def] of Object.entries(Markdown.CustomTags)) {
            // bbcode style
            const regex = new RegExp(`\\[${tag}(?:=([^\\]]+))?\\]([\\s\\S]*?)\\[\\/${tag}\\]`, 'gi');

            if (def.inline) {
                md = md.replace(regex, (_, attr, inner) => {
                    if (filter.isBlocked(tag)) return inner;
                    return def.render(inner, attr);
                });
            } else {
                md = md.replace(regex, (_, attr, inner) => {
                    if (filter.isBlocked(tag)) {
                        const placeholder = `CUSTOM_TAG_${tag.toUpperCase()}_${extracted_customtags.length}`;
                        extracted_customtags.push({ placeholder, tag: null, inner, attr });
                        return placeholder;
                    }
                    const placeholder = `CUSTOM_TAG_${tag.toUpperCase()}_${extracted_customtags.length}`;
                    extracted_customtags.push({ placeholder, tag, inner, attr });
                    return placeholder;
                });
            }
        }

        // we need to recurse nested lists
        const renderList = (list: Tokens.List): string => {
            const tag = list.ordered ? 'ol' : 'ul';

            const items = list.items.map(item => {
                let content = '';

                item.tokens?.forEach(token => {
                    if (token.type === 'list') {
                        content += renderList(token as Tokens.List);
                    } else if (token.type === 'text') {
                        content += (token as Tokens.Text).text;
                    }
                });

                return `<li>${content}</li>`;
            }).join('\n');

            return `<${tag}>${items}</${tag}>`;
        };

        const config: RendererObject = {
            heading: (head) => {
                if (filter.isBlocked(`h${head.depth}`)) return head.text;

                return `<h${head.depth}>${head.text}</h${head.depth}>`;
            },
            list: (list) => {
                if (filter.isBlocked(list.ordered ? 'ol' : 'ul')) return list.raw;
                return renderList(list);
            },
            link: (link) => {
                if (filter.isBlocked('a')) return link.raw;
                
                if (link.href.startsWith('/')) {
                    return `<NuxtLink to="${link.href}">${link.text}</NuxtLink>`;
                }

                return false;
            },
            code: (code) => {
                if (filter.isBlocked('code')) return code.text;

                const lines = code.text.split('\n');
                return `<pre><code class="language-${code.lang}">${lines.join('\n')}</code></pre>`;
            },
            blockquote: (block) => {
                if (filter.isBlocked('blockquote')) return block.text;

                let content = block.text;
                let type = 'tip';

                // github style for codeblocks: [!NOTE], [!WARNING], etc
                const githubAlertMatch = content.match(Markdown.GithubAlertRegex);
                if (githubAlertMatch) {
                    type = githubAlertMatch[1].toLowerCase();
                    content = content.replace(Markdown.GithubAlertRegex, '').trim();
                } else {
                    // normal {: .class }
                    const matches = [...content.matchAll(Markdown.BlockquoteRegex)];
                    if (matches.length > 0) {
                        const match = matches[0];
                        type = match[1];
                        content = content.replace(match[0], '').trim();
                    }
                }

                const label = githubAlertMatch
                ? `<span class="blockquote-label"><i class="fa-solid ${this.GithubAlertIcons[type]}"></i> ${type.toUpperCase()}</span>`
                : '';

                return `<blockquote class="blockquote-${type}">${label}${content}</blockquote>`;
            },
            image: (image) => {
                if (filter.isBlocked('img') || !this.isImageAllowed(image.href)) return '';

                const escapedAlt = image.text.replace(/\"/g, '&quot;');
                const escapedHref = image.href.replace(/\"/g, '&quot;');
                return `<img src="${escapedHref}" alt="${escapedAlt}"></MarkdownImage>`;
            }
        };

        marked.use({ renderer: config });
        let html = marked.parse(md).toString();

        // replace the placeholders with html
        for (const { placeholder, tag, inner, attr } of extracted_customtags) {
            const innerHtml = await Markdown.Render(inner, false, filter);
            const final = tag ? Markdown.CustomTags[tag].render(innerHtml, attr) : innerHtml;
            html = html.replace(new RegExp(`<p>\\s*${placeholder}\\s*<\\/p>|${placeholder}`), final);
        }

        // footnote stuff
        const matches = [...html.matchAll(Markdown.FootnoteRegex)];

        /* IMPORTANT THING:
        for this to work properly all footnotes have to be in one paragraph

        PROPER WAY:
        # References
        [^1]: [text](url)
        [^2]: [text](url)
        [^3]: [text](url)


        NOT LIKE THIS:
        # References
        [^1]: [text](url)

        [^2]: [text](url)

        [^3]: [text](url)
        */

        if (matches) {
            const one = matches.filter((m) => m[1] == '1');
            const last = one[one.length - 1];
            const refIdx = matches.lastIndexOf(last);

            const article = matches.slice(0, refIdx);
            const refs = matches.slice(refIdx).reverse(); // yes this reverse is needed.

            let idx = 0;

            refs.forEach((ref) => {
                let first = idx == 0;
                let last = idx == refs.length - 1;

                const raw = ref[0];
                const num = ref[1];

                const linkEnd = html.indexOf('</a>', ref.index);
                const str = html.substring(ref.index, linkEnd + 4);

                let anchor = str.replace(`${raw}: `, '');
                anchor = `<li id="note-${num}" class="!list-decimal">${anchor}</li>`;

                if (first) anchor += '</ol>';
                else if (last) anchor = '<ol>' + anchor;

                html = html.replace(str, anchor);
                idx++;
            });

            // we have to process the ones in the
            // article later since it moves the indexes
            article.forEach((m) => {
                const raw = m[0];
                const num = m[1];

                html = html.replace(raw, `<sup><a href="#note-${num}" class="footnote-ref">[${num}]</a></sup>`);
            });
        }

        let finalHtml = sanitize ? Sanitizer.Sanitize(html) : html;

        // important because style attr is blocked inside the sanitization
        finalHtml = html.replace(/data-color="([^"]+)"/g, 'style="color:$1"');

        return finalHtml;
    }
}