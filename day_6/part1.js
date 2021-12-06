let input = require('./input.json');

const days = 80;

let fishes = [...input];
Array.from({ length: days }, (_, i) => i).forEach((i) => {
	let fishTracker = [];

	fishes.forEach((fish, index) => {
		if (fish === 0) {
			fishTracker.push(6);
			fishTracker.push(8);
		} else {
			fishTracker.push(fish - 1);
		}
	});

	fishes = fishTracker;
});

const result = fishes.length;
console.log(result);
