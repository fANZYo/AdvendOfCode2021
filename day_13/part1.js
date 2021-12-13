const input = require('./input.json');

const foldLeft = (dots, fold) => {
	const left = dots.filter((dot) => dot.x < fold)
	const right = dots
		.filter((dot) => dot.x > fold)
		.map((dot) => ({ x: Math.abs(dot.x - 2 * fold), y: dot.y }));

	return [
		...left,
		...right,
	].filter((dot, i, dots) => !dots.slice(i + 1).find((d) => dot.y === d.y && dot.x === d.x));
};

const [ ,fold] = input.folds[0].split('=');
const result = foldLeft(input.dots, Number(fold)).length;
console.log(result);
