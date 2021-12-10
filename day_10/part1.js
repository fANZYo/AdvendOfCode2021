const input = require('./input.json');

const scoreMap = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};
const closingMap = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

const errors = input.map((line) => {
	const queue = [];

	return line.split('').find((char) => {
		if (['(', '[', '{', '<'].includes(char)) {
			queue.push(char);
			return false;
		} else if (queue.length > 0 && char === closingMap[queue[queue.length - 1]]) {
			queue.pop();
			return false;
		} else {
			return true;
		}
	});
});

const scores = errors.filter((char) => char).reduce((grouped, char) => ({
	...grouped,
	[char]: (grouped[char] || 0) + 1,
}), {});
const result = Object.entries(scores).reduce((total, [char, amount]) => total + (amount * scoreMap[char]), 0)
console.log(result);
