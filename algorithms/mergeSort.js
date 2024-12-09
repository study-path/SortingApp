import { performance } from "perf_hooks";

export function mergeSort(numbers) {
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

  const mid = Math.floor(numbers.length / 2);
  const left = numbers.slice(0, mid);
  const right = numbers.slice(mid);

  const sortedLeft = sort(left);
  const sortedRight = sort(right);

  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
