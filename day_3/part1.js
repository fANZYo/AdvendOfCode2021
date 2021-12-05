const getMostCommonBit = (position, binaries) => {
	const onesCount = binaries.filter((binary) => binary[position] === '1').length;

	return onesCount >= binaries.length - onesCount
		? 1
		: 0;
};

const gamaBinary = Array.from(input[0]).map((_, index) => getMostCommonBit(index, input));
const epsilonBinary = gamaBinary.map((bit) => (bit + 1) % 2);

const gamaValue = parseInt(gamaBinary.join(''), 2);
const epsilonValue = parseInt(epsilonBinary.join(''), 2);

const result = gamaValue * epsilonValue;
