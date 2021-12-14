const { template, rules } = require('./input.json');

const counter = template.split('').reduce((counter, letter) => ({
	...counter,
	[letter]: (counter[letter] || 0) + 1,
}), {});
let pairs = {};
for (i in template.split('')) {
	if (template[Number(i) + 1]) {
		const key = `${template[i]}${template[Number(i) + 1]}`;
		pairs[key] = (pairs[key] || 0) + 1;
	}
}

for (i in Array.from({ length: 40 })) {
	let newPairs = {};

	for ([pair, count] of Object.entries(pairs)) {
		const pair1 = pair[0] + rules[pair];
		const pair2 = rules[pair] + pair[1];

		newPairs[pair1] = (newPairs[pair1] || 0) + 1 * count;
		newPairs[pair2] = (newPairs[pair2] || 0) + 1 * count;

		counter[rules[pair]] = (counter[rules[pair]] || 0) + 1 * count;
	}

	pairs = newPairs;
}

const result = Math.max(...Object.values(counter)) - Math.min(...Object.values(counter));
console.log(result);
