import { performance } from "perf_hooks";

export function quickSort(numbers) {
  const start = performance.now();

  numbers = sort(numbers);

  const end = performance.now();
  let timePerformance = end - start;

  console.log(`Time taken to execute add function is ${timePerformance}ms.`);

  return {
    time: timePerformance,
    numbers: numbers,
  };
}

function sort(numbers) {
  if (numbers.length <= 1) {
    return numbers;
  }
  const pivot = numbers[Math.floor(numbers.length / 2)];

  const left = [];
  const right = [];
  const equal = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < pivot) {
      left.push(numbers[i]);
    } else if (numbers[i] > pivot) {
      right.push(numbers[i]);
    } else equal.push(numbers[i]);
  }
  return [...sort(left), ...equal, ...sort(right)];
}
