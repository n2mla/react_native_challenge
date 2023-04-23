export const sum = (numbers: number[]) => {
  return numbers.reduce((sum, num) => sum + num, 0);
}

export const multiple = (numbers: number[]) => {
  return numbers.reduce((sum, num) => sum * num, 1);
}

export const mean = (numbers: number[]) => {
  const total = numbers.reduce((sum, num) => sum + num, 1);
  return total / numbers.length;
}

export const median = (numbers: number[]) => {
  numbers.sort((a, b) => a - b);
  const middleIndex = Math.floor(numbers.length / 2);
  if (numbers.length % 2 !== 0) {
    return numbers[middleIndex];
  } else {
    return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
  }
}

export const deviation = (numbers: number[]) => {
  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
  const squaredDiffs = numbers.map(val => Math.pow(val - mean, 2));
  const sumOfSquaredDiffs = squaredDiffs.reduce((acc, val) => acc + val, 0);
  const variance = sumOfSquaredDiffs / numbers.length;
  const stdDev = Math.sqrt(variance);
  return stdDev;
}