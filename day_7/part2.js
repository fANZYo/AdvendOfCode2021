const input = require('./input.json');

const getFuelConsumption = (value) => value * (value + 1) / 2;
const crabs = input.sort((a, b) => a - b);
const min = crabs[0];
const max = crabs[crabs.length - 1];

let result = null;
for (let i = min; i <= max; i++) {
	const score = crabs.reduce((score, crab) => score + getFuelConsumption(Math.abs(crab - i)), 0);

	result = result === null || result > score
		? score
		: result;
}

console.log(result);
