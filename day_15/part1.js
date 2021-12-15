const input = require('./input.json');

const end = { x: input[0].length - 1, y: input.length - 1 };
const getNext = (point, done) => [
	{ x: point.x - 1, y: point.y },
	{ x: point.x + 1, y: point.y },
	{ x: point.x, y: point.y - 1 },
	{ x: point.x, y: point.y + 1 },
]
	.filter(({ x, y }) => x >= 0 && x < input[0].length && y >= 0 && y < input.length)
	.filter(({ x, y }) => !done.find((point) => point.x === x && point.y === y));

const done = [];
const queue = [{ point: { x: 0, y: 0 }, risk: 0 }];
const risks = {};

while (queue.length) {
	const { point, risk } = queue.shift();

	for ({ x, y } of getNext(point, done)) {
		const existing = queue.find(({ point }) => point.x === x && point.y === y);
		const newRisk = risk + Number(input[y][x]);

		if (existing && existing.risk > newRisk) {
			existing.risk = newRisk;
			existing.from = point;
		} else if (!existing) {
			queue.push({ point: { x, y }, from: point, risk: newRisk })
		}
	}

	queue.sort((a, b) => a.risk - b.risk);
	done.push(point);
	risks[`${point.x},${point.y}`] = risk;
}

const result = risks[`${end.x},${end.y}`];
console.log(result);
