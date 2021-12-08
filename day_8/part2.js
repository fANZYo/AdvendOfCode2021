const input = require('./input.json');

const getMaskedSegments = (base, test) => base.filter((char) => !test.includes(char));
const hasSameSegments = (base, test) => base.length === test.length && base.every((char) => test.includes(char));

const getEncoding = (patterns) => patterns.split(' ').sort((a, b) => a.length - b.length)
	.reduce((encoding, pattern) => {
		const letters = pattern.split('');

		if (letters.length === 2) {
			return { ...encoding, 1: letters };
		} else if (letters.length === 3) {
			return { ...encoding, 7: letters };
		} else if (letters.length === 4) {
			return { ...encoding, 4: letters };
		} else if (letters.length === 7) {
			return { ...encoding, 8: letters };
		} else if (letters.length === 5 && getMaskedSegments(letters, encoding[1]).length === 3) {
			return { ...encoding, 3: letters };
		} else if (letters.length === 5 && getMaskedSegments(letters, encoding[4]).length === 2) {
			return { ...encoding, 5: letters };
		} else if (letters.length === 5) {
			return { ...encoding, 2: letters };
		} else if (getMaskedSegments(letters, encoding[3]).length === 1) {
			return { ...encoding, 9: letters };
		} else if (getMaskedSegments(letters, encoding[5]).length === 1) {
			return { ...encoding, 6: letters };
		} else {
			return { ...encoding, 0: letters };
		}
	}, {});

const outputs = input.map(([pattern, display]) => {
	const encoding = getEncoding(pattern);

	return display.split(' ')
		.reduce((numbers, segments) => {
			const letters = segments.split('');
			const number = Object.keys(encoding).find((number) => hasSameSegments(encoding[number], letters));

			return Number(String(numbers).concat(number));
		},'');
});

const result = outputs.reduce((sum, output) => sum + output);
console.log(result);
