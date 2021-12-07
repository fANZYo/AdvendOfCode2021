const input = require('./input.json');

const getMedian = (arr) => {
  const mid = Math.floor(arr.length / 2);
  const nums = arr.sort((a, b) => a - b);

  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const median = getMedian(input);

const result = input.reduce((result, position) => result + Math.abs(position - median), 0);
console.log(result);
