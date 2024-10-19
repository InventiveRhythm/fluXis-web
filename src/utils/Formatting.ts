function FormatAccuracy(accuracy: number) {
    return `${accuracy.toFixed(2)}%`;
}

function FormatDecimal(decimal: number) {
    return (Math.round(decimal * 100) / 100).toFixed(2);
}

function FormatScore(score: number) {
    if (!score) return '---,---';

    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function FormatNumber(num: number, digits = 1) {
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

function NameWithApostrophe(name: string) {
    name = name + "'";

    if (name.endsWith('s') || name.endsWith('x')) return name;

    return name + 's';
}

export { FormatAccuracy, FormatDecimal, FormatScore, FormatNumber, NameWithApostrophe };
