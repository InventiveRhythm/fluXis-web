import en from '~/assets/localization/en.json';

interface LocaleData {
    [key: string]: any;
}

const English = en as LocaleData;

function Localize(key: string, ...args: any[]): string {
    const locale = 'en';

    let str = find(key, locale);
    args.forEach((arg) => (str = str.replace('%s', arg)));
    return str;
}

function find(key: string, loc: string): string {
    let dict: LocaleData | undefined;

    switch (loc) {
        default:
            dict = English;
            break;
    }

    let str = '';

    if (dict) str = dict[key];

    if (!str) {
        if (loc != 'en') return find(key, 'en');

        console.error(`Localization for ${key} is missing!`);
        str = key;
    }

    return str;
}

export { Localize };
