import { getRandomNum } from "./random.js";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function getRandomRgb(): RGB {
  return {
    r: getRandomNum(255),
    g: getRandomNum(255),
    b: getRandomNum(255),
  };
}

export { RGB, getRandomRgb };
