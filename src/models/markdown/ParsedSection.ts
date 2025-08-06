import ParsedSubSection from "./ParsedSubSection";

export default class ParsedSection extends ParsedSubSection {
    subs: ParsedSubSection[] = []

    constructor(title: string, id: string) {
        super(title, id)
    }
}