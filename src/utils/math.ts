export const roundTo1Decimal = (x: number) => {
  return Math.floor((x + Number.EPSILON) * 10) / 10;
};
