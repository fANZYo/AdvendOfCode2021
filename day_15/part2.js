const input = require('./input.json');

const end = { x: input[0].length * 5 - 1, y: input.length * 5 - 1 };
const getNext = (point, done) => [
	{ x: point.x - 1, y: point.y },
	{ x: point.x + 1, y: point.y },
	{ x: point.x, y: point.y - 1 },
	{ x: point.x, y: point.y + 1 },
]
	.filter(({ x, y }) =>
		(x >= 0 && x < input[0].length * 5)
		&& (y >= 0 && y < input.length * 5)
		&& !done[`${x},${y}`]
	);

const done = {};
const queue = [{ point: { x: 0, y: 0 }, risk: 0 }];

while (queue.length) {
	const { point, risk } = queue.shift();

	for ({ x, y } of getNext(point, done)) {
		const existing = queue.find(({ point }) => point.x === x && point.y === y);

		let val = input[y % input.length][x % input[0].length] + Math.floor(x / input[0].length) + Math.floor(y / input.length);
		while (val > 9) {
			val -= 9;
		}

		const newRisk = risk + val;

		if (existing && existing.risk > newRisk) {
			existing.risk = newRisk;
			existing.from = point;
		} else if (!existing) {
			queue.push({ point: { x, y }, from: point, risk: newRisk })
		}
	}

	queue.sort((a, b) => a.risk - b.risk);
	done[`${point.x},${point.y}`] = risk;
}

const result = done[`${end.x},${end.y}`];
console.log(result);
