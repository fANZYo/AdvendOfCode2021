const input = require('./input.json');

const scoreMap = { ')': 1, ']': 2, '}': 3, '>': 4 };
const closingMap = { '(': ')', '[': ']', '{': '}', '<': '>' };

const incompletes = input.map((line) => {
	const queue = [];

	const isIncomplete = !line.split('').find((char) => {
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

	return isIncomplete
		? queue.map((char) => closingMap[char]).reverse()
		: null;
});

const scores = incompletes
	.filter((value) => value)
	.map((string) => string.reduce((score, char) => 5 * score + scoreMap[char], 0))
	.sort((a, b) => a - b);

const result = scores[Math.floor(scores.length / 2)];
console.log(result);
