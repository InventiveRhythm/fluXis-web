import { state } from './State';

import en from '@/assets/localization/en.json'
import de from '@/assets/localization/de.json'

interface LocaleData {
    [key: string]: any;
}

const English = en as LocaleData;
const German = de as LocaleData;

function Localize(key: string, ...args: any[]): string {
    let str = find(key, state.locale);
    args.forEach(arg => str = str.replace("%s", arg))
    return str;
}

function find(key: string, loc: string): string {
    let dict: LocaleData | undefined;

    switch (loc) {
        case 'de':
            dict = German;
            break
        
        default:
            dict = English;
            break
    }

    let str = '';

    if (dict) str = dict[key];

    if (!str) {
        if (loc != 'en')
            return find(key, 'en');

        console.error(`localization ${key} is missing!`)
        str = key;
    }

    return str;
}

export { Localize };
