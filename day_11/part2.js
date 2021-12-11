const input = require('./input.json');

const grid = input.map((row) => row.split('').map(Number));

const getAdjacents = (point) => {
	return [
		{ x: point.x - 1, y: point.y - 1 },
		{ x: point.x - 1, y: point.y },
		{ x: point.x - 1, y: point.y + 1 },
		{ x: point.x, y: point.y - 1 },
		{ x: point.x, y: point.y + 1 },
		{ x: point.x + 1, y: point.y - 1 },
		{ x: point.x + 1, y: point.y },
		{ x: point.x + 1, y: point.y + 1 },
	].filter((adjacent) => !(
		(adjacent.x < 0 || adjacent.x > grid.length - 1)
		|| (adjacent.y < 0 || adjacent.y > grid[0].length - 1)
	));
};

const areAllFlashing = () => grid.flat().every((octopus) => octopus === 0);

let flashCount = 0;
let counter = 1;
while(true) {
	let queue = [];

	grid.forEach((row, y) => {
		grid.forEach((col, x) => {
			grid[y][x] += 1;

			if (grid[y][x] > 9) {
				queue.push({ x, y });
			}
		});
	});

	for ({ x, y } of queue) {
		flashCount += 1;

		for (adjacent of getAdjacents({ x, y })) {
			grid[adjacent.y][adjacent.x] += 1;

			if (
				grid[adjacent.y][adjacent.x] > 9
				&& !queue.find((point) => point.x === adjacent.x && point.y === adjacent.y)
			) {
				queue.push(adjacent);
			}
		}
	}

	queue.forEach(({ x, y }) => (grid[y][x] = 0));

	if (areAllFlashing()) {
		console.log(counter);
		break;
	}

	queue = [];
	counter += 1;
}
