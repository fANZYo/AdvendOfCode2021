const input = require('./input.json');

const graph = input.reduce((graph, connection) => {
	const [a, b] = connection.split('-');

	return {
		...graph,
		[a]: (graph[a] || []).concat(b),
		[b]: (graph[b] || []).concat(a),
	};
}, {});

const queue = [['start']];
const paths = [];

while(queue.length) {
	const path = queue.shift();
	const node = path[path.length - 1];

	if (node === 'end') {
		paths.push(path);
		continue;
	}

	for (child of graph[node]) {
		const twice = path
			.filter((node) => node.toLowerCase() === node)
			.filter((node, i, path) => path.slice(i + 1).includes(node)).length >= 1;

		if ((!path.includes(child) || child.toLowerCase() !== child)
			|| (path.includes(child) && !twice && !['start', 'end'].includes(child))) {
			queue.push(path.concat(child));
		}

	}
}
console.log(paths.length);
