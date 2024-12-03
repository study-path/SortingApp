import { performance } from "perf_hooks";

export function bubbleSort(numbers) {
  const start = performance.now();
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let z = 0; z < numbers.length - 1; z++) {
      if (numbers[z] > numbers[z + 1]) {
        let el = numbers[z];
        numbers[z] = numbers[z + 1];
        numbers[z + 1] = el;
      }
    }
  }
  const end = performance.now();
  let timePerformance = end - start;

  console.log(`Time taken to execute add function is ${timePerformance}ms.`);

  return {
    time: timePerformance,
    numbers: numbers,
  };
}
