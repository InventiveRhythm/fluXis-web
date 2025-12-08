import type ParsedImage from "./ParsedImage";
import type ParsedSection from "./ParsedSection"

export default class ParsedMarkdown {
    raw: string;
    sections: ParsedSection[];
    images?: Array<ParsedImage>;

    constructor(raw: string) {
        this.raw = raw;
        this.sections = [];
        this.images = [];
    }
}