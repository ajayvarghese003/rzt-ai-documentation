const data = require('./.vuepress/mdFiles.json');  

const sideBarData = data.map(item => {
	let children = [];
	if(item.children) {
		children = item.children.map(child => `/${item.name}/${child.name.replace('.md', '')}`)
		children = children.filter(i => i !== `/${item.name}/Readme`);
		console.log('ITEM NAME', children);
	} 
	return {
		title: item.name,
		children
	}
}).filter(i => i.title !== 'Readme.md');

const navData = data.map(item => ({ text: item.name, link: `/${item.name}/`})).filter(i => i.text !== 'Readme.md');

console.log('SIDE BAR DATA', JSON.stringify(sideBarData), JSON.stringify(navData));

module.exports = { sideBarData, navData };