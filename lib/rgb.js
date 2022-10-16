import { getRandomNum } from "./random.js";
function getRandomRgb() {
    return {
        r: getRandomNum(255),
        g: getRandomNum(255),
        b: getRandomNum(255),
    };
}
export { getRandomRgb };
