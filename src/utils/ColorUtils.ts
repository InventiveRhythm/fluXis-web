import * as chroma from 'chroma.ts';

const colors: { [val: number]: string } = {
    '-1': '#888888',
    '0': '#3355FF',
    '5': '#3489FF',
    '10': '#35BCFF',
    '15': '#33FFDD',
    '20': '#55FF33',
    '25': '#FEFF33',
    '30': '#FF3333'
};

function DarkenColor(color: string, amount: number) {
    const scalar = Math.max(1, 1 + amount);
    const col: chroma.Color = chroma.color(color);
    const [r, g, b] = col.rgb();
    
    return chroma.color([
        r / scalar,
        g / scalar,
        b / scalar,
        col.alpha()
    ]);
}

function GetRatingColor(rating: number) {
    if (rating <= 0) return colors['-1'];

    if (rating >= 30) return colors['30'];

    // interpolate between two colors
    const lower = Math.floor(rating / 5) * 5;
    const upper = lower + 5;

    const lowerColor = colors[lower];
    const upperColor = colors[upper];

    const ratio = (rating - lower) / 5;
    return InterpolateColors(lowerColor, upperColor, ratio);
}

function InterpolateColors(color1: string, color2: string, ratio: number) {
    const col1 = chroma.color(color1);
    const col2 = chroma.color(color2);
    return chroma.mix(col1, col2, ratio, 'hsv');
}

export { GetRatingColor, DarkenColor };
