const { template, rules } = require('./input.json');

let polymer = template;
for (i in Array.from({ length: 10 })) {
	let newPolymer = ''

	for (l in polymer.split('').slice(0, -1)) {
		const pair = `${polymer[l]}${polymer[Number(l) + 1]}`;

		newPolymer += `${pair[0]}${rules[pair]}`;
	}

	polymer = newPolymer + polymer[polymer.length - 1];
}

const quantities = polymer.split('').reduce((group, letter) => ({
	...group,
	[letter]: (group[letter] || 0) + 1,
}), {});
const result = Math.max(...Object.values(quantities)) - Math.min(...Object.values(quantities));
console.log(result);
