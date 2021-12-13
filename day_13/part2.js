const input = require('./input.json');

const foldUp = (dots, fold) => {
	const top = dots.filter((dot) => dot.y < fold)
	const bottom = dots
		.filter((dot) => dot.y > fold)
		.map((dot) => ({ x: dot.x, y: Math.abs(dot.y - 2 * fold) }));

	return [...top, ...bottom]
		.filter((dot, i, dots) => !dots.slice(i + 1).find((d) => dot.y === d.y && dot.x === d.x));
};

const foldLeft = (dots, fold) => {
	const left = dots.filter((dot) => dot.x < fold)
	const right = dots
		.filter((dot) => dot.x > fold)
		.map((dot) => ({ x: Math.abs(dot.x - 2 * fold), y: dot.y }));

	return [...left, ...right]
		.filter((dot, i, dots) => !dots.slice(i + 1).find((d) => dot.y === d.y && dot.x === d.x));
};

const foldMap = { x: foldLeft, y: foldUp };

const dots = input.folds.reduce((dots, foldLine) => {
	const [axes, fold] = foldLine.split('=');
	return foldMap[axes](dots, Number(fold));
}, input.dots);

const xMax = Math.max(...dots.map((dot) => dot.x));
const yMax = Math.max(...dots.map((dot) => dot.y));

let code = '';
for (y in Array.from({ length: yMax + 1 })) {
	for (x in Array.from({ length: xMax + 1 })) {
		if (dots.find((dot) => dot.y === Number(y) && dot.x === Number(x))) {
			code += '#';
		} else {
			code += '.';
		}
	}
	code += '\n';
}

console.log(code);
