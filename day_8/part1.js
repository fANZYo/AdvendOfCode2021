const input = require('./input.json');

const digitLengthMap = {
	1: 2,
	4: 4,
	7: 3,
	8: 7,
};

const isUniqDigit = (digit) => Object.values(digitLengthMap).includes(digit.length);
const result = input.reduce((result, [_, output]) => result + output.split(' ').filter(isUniqDigit).length, 0);
console.log(result);
