export function bubbleSort(numbers) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let z = 0; z < numbers.length - 1; z++) {
      if (numbers[z] > numbers[z + 1]) {
        let el = numbers[z];
        numbers[z] = numbers[z + 1];
        numbers[z + 1] = el;
      }
    }
  }
  return numbers;
}
