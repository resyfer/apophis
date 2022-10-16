/**
 * @returns A random number.
 *
 * @description Usage is like this:
 *
 * ```ts
 *  let num = getRandomNum(10) // Gives a random number between 0-10 (inclusive)
 * ```
 *
 * or
 *
 * ```ts
 *  let num = getRandomNum(10, 5) // Gives a random number between 5-10 (inclusive)
 * ```
 */
declare function getRandomNum(high: number, low?: number): number;
export { getRandomNum };
