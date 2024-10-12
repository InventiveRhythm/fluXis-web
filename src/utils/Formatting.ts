function FormatAccuracy(accuracy) {
    return `${accuracy.toFixed(2)}%`;
}

function FormatDecimal(decimal) {
    return (Math.round(decimal * 100) / 100).toFixed(2);
}

function FormatScore(score) {
    if (!score) return '---,---';

    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function FormatNumber(num, digits = 1) {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' }
    ];

    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);

    if (item)
        return (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol);

    return '0';
}

export { FormatAccuracy, FormatDecimal, FormatScore, FormatNumber };
