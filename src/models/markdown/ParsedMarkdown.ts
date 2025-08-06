import type ParsedSection from "./ParsedSection"

export default class ParsedMarkdown {
    sections: ParsedSection[] = []
    raw: string

    constructor(raw: string) {
        this.raw = raw
    }
}