import Color from '@/assets/lib/color';

const colors = {
    '-1': '#888888',
    '0': '#3355FF',
    '5': '#3489FF',
    '10': '#35BCFF',
    '15': '#33FFDD',
    '20': '#55FF33',
    '25': '#FEFF33',
    '30': '#FF3333'
};

function DarkenColor(color, amount) {
    const scalar = Math.max(1, 1 + amount);
    const col: Color = new Color(color);

    const r = col.srgb.red / scalar;
    const g = col.srgb.green / scalar;
    const b = col.srgb.blue / scalar;

    return new Color('srgb', [r, g, b]);
}

function GetRatingColor(rating) {
    if (rating <= 0)
        return colors['-1'];

    if (rating >= 30)
        return colors['30'];

    // interpolate between two colors
    const lower = Math.floor(rating / 5) * 5;
    const upper = lower + 5;

    const lowerColor = colors[lower];
    const upperColor = colors[upper];

    const ratio = (rating - lower) / 5;
    return InterpolateColors(lowerColor, upperColor, ratio);
}

function InterpolateColors(color1, color2, ratio) {
    const col1 = new Color(color1);
    const col2 = new Color(color2);

    return col1.range(col2)(ratio);
}

export { GetRatingColor, DarkenColor };