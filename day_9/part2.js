const input = require('./input.json');

const limits = { y: input.length - 1, x: input[0].length - 1 };

const getAdjacents = (position) => {
	const { x, y } = position;
	return [
		{ x, y: y - 1 },
		{ x, y: y + 1 },
		{ x: x - 1, y },
		{ x: x + 1, y }
	].filter((point) => input[point.y]?.[point.x]);
};

const lowestPoints = [];
input.map((string) => string.split('').map(Number)).forEach((row, y) => {
	row.forEach((height, x) => {
		const adjacents = getAdjacents({ x, y });

		adjacents.every((point) => input[point.y][point.x] > height) && lowestPoints.push({ x, y });
	});
});

const getBasin = (lowestPoint, baseBasin = []) => {
	return [lowestPoint].reduce((basin, { x, y }) => {
		const adjacents = getAdjacents({ x, y })
			.filter((point) => input[point.y][point.x] > input[y][x] && input[point.y][point.x] < 9)

		return [
			...basin,
			lowestPoint,
			...adjacents.flatMap((point) => getBasin(point, basin)),
		]
	}, baseBasin);
};

const duplicates = (point, i, basin) => !basin.slice(i + 1).find(({ x, y }) => point.x === x && point.y === y);
const result = lowestPoints
	.map((point) => getBasin(point).filter(duplicates).length)
	.filter((length, i, lengths) => !lengths.slice(i + 1).find((l) => l === length))
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((total, num) => total * num);

console.log(result);
