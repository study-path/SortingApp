export function quickSort(numbers) {
  if (numbers.length <= 1) return numbers;
  const pivot = numbers[Math.floor(numbers.length / 2)];
  const left = numbers.filter((num) => num < pivot);
  const right = numbers.filter((num) => num > pivot);
  const equal = numbers.filter((num) => num === pivot);

  return [...quickSort(left), ...equal, ...quickSort(right)];
}
