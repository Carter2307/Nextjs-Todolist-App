/**
 * Generate Rando unique string number
 * @param length
 * @return String
 */
export function genUniqueNumber(length: number): string {
  const min: number = 1;
  const max: number = 10;
  let numbers = new Set();
  while (numbers.size < length) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).join("");
}
