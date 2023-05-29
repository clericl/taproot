export const calcZoom = (delta: number) => Math.log(360 / delta) / Math.LN2;

export const calcDelta = (zoom: number) =>
  360 / Math.pow(Math.E, zoom * Math.LN2);
