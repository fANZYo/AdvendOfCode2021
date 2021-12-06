let input = require('./input.json');

const days = 256;

let fishes = input.reduce((fishes, fish) => ({
	...fishes,
	[fish]: (fishes[fish] || 0) + 1,
}), {});

Array.from({ length: days }, (_, i) => i).forEach((i) => {
	let fishTracker = { ...Object.values(Array(9).fill(0)) };

	Object.entries(fishes).forEach(([fish, count]) => {
		if (Number(fish) === 0) {
			fishTracker[6] += count;
			fishTracker[8] += count;
		} else {
			fishTracker[fish - 1] += count;
		}
	});

	fishes = fishTracker;
});

const result = Object.values(fishes).reduce((result, count) => result + count, 0);
console.log(result);
