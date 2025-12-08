import { marked, type RendererObject } from 'marked';
import ParsedMarkdown from '~/models/markdown/ParsedMarkdown';
import ParsedSection from '~/models/markdown/ParsedSection';
import ParsedSubSection from '~/models/markdown/ParsedSubSection';
import ParsedImage from '~/models/markdown/ParsedImage';
import Sanitizer from './sanitize';

export default class Markdown {
    static FootnoteRegex = /\[\^(\d{1,2})\]/g;
    static BlockquoteRegex = /\{: \.(\w+) \}/g;
    static ImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

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
                
                if (!data.images) {
                    data.images = [];
                }
                
                data.images.push(new ParsedImage(
                    src,
                    alt,
                    index + 1
                ));
            });
        });

        return data;
    }

    static async Render(md: string, sanitize: boolean = true): Promise<string> {
        md = md.replaceAll('<', '&lt;');

        const config: RendererObject = {
            heading: (head) => {
                if (head.depth == 2 || head.depth == 3)
                    return `<MarkdownHeader text="${head.text.replace(/\"/g, '&quot;')}" :level="${head.depth}"></MarkdownHeader>`;

                return false;
            },
            link: (link) => {
                if (link.href.startsWith('/')) {
                    return `<NuxtLink to="${link.href}">${link.text}</NuxtLink>`;
                }

                return false;
            },
            code: (code) => {
                const text = code.text;
                const lines = text.split('\n');
                return `<MarkdownCodeBlock lang="${code.lang}"><span>${lines.join('</span><span>')}</span></MarkdownCodeBlock>`;
            },
            blockquote: (block) => {
                let content = block.text;
                let type = 'tip';

                const matches = [...content.matchAll(Markdown.BlockquoteRegex)];

                if (matches.length > 0) {
                    const match = matches[0];
                    type = match[1];
                    content = content.replace(match[0], '').trim();
                }

                return `<MarkdownBlockquote type="${type}">${content}</MarkdownBlockquote>`;
            },
            image: (image) => {
                const escapedAlt = image.text.replace(/\"/g, '&quot;');
                const escapedHref = image.href.replace(/\"/g, '&quot;');
                return `<img src="${escapedHref}" alt="${escapedAlt}"></MarkdownImage>`;
            }
        };

        marked.use({ renderer: config });
        let html = marked.parse(md).toString();

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

                html = html.replace(raw, `<MarkdownFootnote :num="${num}"></MarkdownFootnote>`);
            });
        }

        return sanitize ? Sanitizer.Sanitize(html) : html;
    }
}
