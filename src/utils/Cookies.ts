export default class Cookies {
    static Set(name: string, value: any) {
        const date = new Date();
        date.setTime(date.getTime() + (2 * 265 * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    static Get(cname: string): any {
        const name = cname + '=';
        const decoded = decodeURIComponent(document.cookie);
        const split = decoded.split(';');

        for (let i = 0; i < split.length; i++) {
            let s = split[i];

            while (s.charAt(0) == ' ')
                s = s.substring(1);

            if (s.indexOf(name) == 0) {
                const val = s.substring(name.length, s.length);

                if (val.startsWith('{'))
                    return JSON.parse(val);
                else
                    return val;
            }
        }

        return undefined;
    }

    static Remove(name: string) {
        this.Set(name, '');
    }
}