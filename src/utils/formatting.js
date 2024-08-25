function formatAccuracy(accuracy) {
    return `${accuracy.toFixed(2)}%`;
}

function formatDecimal(decimal) {
    return (Math.round(decimal * 100) / 100).toFixed(2);
}

function formatScore(score) {
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

export { formatAccuracy, formatDecimal, formatScore, FormatNumber };
