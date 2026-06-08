import ParsedMarkdown from '~/models/markdown/ParsedMarkdown';
import ParsedSection from '~/models/markdown/ParsedSection';
import ParsedSubSection from '~/models/markdown/ParsedSubSection';

export default class Markdown {
    static FootnoteRegex = /\[\^(\d{1,2})\]/g;
    static BlockquoteRegex = /\{: \.(\w+) \}/g;

    static Clean(md: string) {
        return md.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }

    static Parse(md: string): ParsedMarkdown {
        const data = new ParsedMarkdown(md);

        data.raw.split('\n').forEach((line) => {
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
                const last = data.sections[data.sections.length - 1]!;
                const text = line.slice(4);
                const id = line
                    .slice(4)
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w]+/g, '-');
                last.subs.push(new ParsedSubSection(text, id));
            }
        });

        return data;
    }
}
