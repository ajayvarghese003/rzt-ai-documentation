const dirTree = require("directory-tree");
const path = require('path');
module.exports = (options, ctx) => {
	const filteredTree = dirTree(path.join(__dirname, '/docs'), { extensions: /\.md/ });
	console.log('__dirname', path.join(__dirname, '/docs', filteredTree));
	// console.log('FILTERED TREE', filteredTree);
	return {
	  a: true
	}
};