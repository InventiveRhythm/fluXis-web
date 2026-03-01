export default class Format {
    static Accuracy(accuracy: number): string {
        return `${accuracy.toFixed(2)}%`;
    }

    static Decimal(decimal: number): string {
        return (Math.round(decimal * 100) / 100).toFixed(2);
    }

    static Score(score: number): string {
        if (!score) return '---,---';

        return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static Number(num: number, digits = 1): string {
        const lookup: any = [
            { value: 1, symbol: '' },
            { value: 1e3, symbol: 'k' },
            { value: 1e6, symbol: 'M' }
        ];

        const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast((item: any) => num >= item.value);

        if (item) return (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol);

        return '0';
    }

    static NameWithApostrophe(name: string): string {
        name = name + "'";

        if (name.endsWith('s') || name.endsWith('x')) return name;

        return name + 's';
    }

    static Date(secs: number): string {
        return new Date(secs * 1000).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    static Duration(duration: number): string {
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        let ret = '';

        if (hrs > 0) ret += '' + hrs + ':' + (mins < 10 ? '0' : '');

        ret += '' + mins + ':' + (secs < 10 ? '0' : '');
        ret += '' + secs;

        return ret;
    }

    static TimeAgo(secs: number, short: boolean = false): string {
        let formatted = this.Seconds(Date.now() / 1000 - secs, short);
        if (!short && formatted !== 'just now') return formatted + ' ago';

        return formatted;
    }

    static Seconds(secs: number, short: boolean = false): string {
        let months = Math.floor(secs / 2592000);
        let days = Math.floor(secs / 86400);
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60);
        let seconds = Math.floor(secs % 60);

        if (short) {
            if (months > 0) return months + 'm';
            if (days > 0) return days + 'd';
            if (hours > 0) return hours + 'h';
            if (minutes > 0) return minutes + 'min';
            if (seconds >= 30) return seconds + 's';
        } else {
            if (months > 0) return months > 1 ? months + ' months ' : months + ' month ';
            if (days > 0) return days > 1 ? days + ' days ' : days + ' day ';
            if (hours > 0) return hours > 1 ? hours + ' hours ' : hours + ' hour ';
            if (minutes > 0) return minutes > 1 ? minutes + ' minutes ' : minutes + ' minute ';
            if (seconds >= 30) return seconds > 1 ? seconds + ' seconds' : seconds + ' second';
        }

        return 'just now';
    }
}

export { FormatAccuracy, FormatDecimal, FormatScore, FormatNumber, NameWithApostrophe };
