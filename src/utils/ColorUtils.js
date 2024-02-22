import Color from "https://colorjs.io/dist/color.js";

const colors = {
    "-1": '#888888',
    "0": '#3355FF',
    "5": '#3489FF',
    "10": '#35BCFF',
    "15": '#33FFDD',
    "20": '#55FF33',
    "25": '#FEFF33',
    "30": '#FF3333',
}

function darkenColor(color, amount) {
    var scalar = Math.max(1, 1 + amount);
    var col = new Color(color);

    var r = col.srgb.red / scalar;
    var g = col.srgb.green / scalar;
    var b = col.srgb.blue / scalar;

    console.log(r, g, b);
    return new Color("srgb", [r, g, b]);
}

function getRatingColor(rating) {
    if (rating <= 0)
        return colors["-1"];

    if (rating >= 30)
        return colors["30"];

    // interpolate between two colors
    let lower = Math.floor(rating / 5) * 5;
    let upper = lower + 5;

    let lowerColor = colors[lower];
    let upperColor = colors[upper];

    let ratio = (rating - lower) / 5;
    return interpolateColors(lowerColor, upperColor, ratio);
}

function interpolateColors(color1, color2, ratio) {
    var col1 = new Color(color1);
    var col2 = new Color(color2);

    return col1.range(col2)(ratio);
}

export { getRatingColor, darkenColor };