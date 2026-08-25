export default class ParsedImage {
    src: string;
    alt: string;
    lineNumber: number;

    constructor(src: string, alt: string, lineNumber: number) {
        this.src = src
        this.alt = alt
        this.lineNumber = lineNumber
    }
}