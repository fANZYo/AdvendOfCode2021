const getXPair = (path) => ({ from: path.from[0], to: path.to[0] });
const getYPair = (path) => ({ from: path.from[1], to: path.to[1] });
const getPathVector = (path) => {
	const xPair = getXPair(path);
	const yPair = getYPair(path);

	const xDiff = xPair.to - xPair.from;
	const yDiff = yPair.to - yPair.from;

	return Array.from(
		{ length: Math.max(Math.abs(xDiff), Math.abs(yDiff)) + 1 },
		(_, index) => ({
				x: xPair.from + (xDiff ? xDiff / Math.abs(xDiff) * index : 0),
				y: yPair.from + (yDiff ? yDiff / Math.abs(yDiff) * index : 0),
			}),
	);
};

const map = [];

input.forEach((path) => {
	getPathVector(path)
		.map((point) => {
			map[point.y] = map[point.y] || [];
			const location =  map[point.y][point.x];

			map[point.y][point.x] = location ? location + 1 : 1;
		});
});

const result = map.reduce((result, row) => result + row.reduce((count, loc) => count + (loc > 1 ? 1 : 0), 0), 0);
