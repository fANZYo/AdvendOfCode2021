const input = require('./input.json');

const limits = { y: input.length - 1, x: input[0].length - 1 };

const getAdjacents = (position) => {
	const { x, y } = position;
	return [
		{ y: y - 1, x },
		{ y: y + 1, x },
		{ x: x - 1, y },
		{ x: x + 1, y }
	].filter((point) => input[point.y]?.[point.x]);
};

const lowestPoints = [];
input.map((string) => string.split('').map(Number)).forEach((row, y) => {
	row.forEach((height, x) => {
		const adjacents = getAdjacents({ x, y });

		adjacents.every((point) => input[point.y][point.x] > height) && lowestPoints.push(height);
	});
});

const result = lowestPoints.reduce((sum, height) => sum + height + 1, 0);
console.log(result)
