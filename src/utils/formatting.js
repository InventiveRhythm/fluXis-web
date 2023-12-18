function formatAccuracy(accuracy) {
  return `${accuracy.toFixed(2)}%`;
}

function formatDecimal(decimal) {
  return (Math.round(decimal * 100) / 100).toFixed(2);
}

function formatScore(score) {
  if (!score) return "---,---";

  return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { formatAccuracy, formatDecimal, formatScore };