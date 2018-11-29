const data = require('./.vuepress/mdFiles.json');  

const sideBarData = data.map(item => {
	let children = [];
	if(item.children) {
		children = item.children.map(child => `/${item.name}/${child.name.replace('.md', '')}`)
		children = children.filter(i => i !== `/${item.name}/Readme`);
	} 
	const itemInfo = item.children.find(i => i.name === 'Readme.md');
	return {
		title: itemInfo.meta.attributes.title,
		children
	}
}).filter(i => i.title !== 'Readme.md');

const navData = data.map(item => {
	const itemInfo = item.children.find(i => i.name === 'Readme.md');
	return { text: itemInfo.meta.attributes.title, link: `/${item.name}/`};
}).filter(i => i.text !== 'Readme.md');

console.log('SIDE BAR DATA', JSON.stringify(sideBarData), JSON.stringify(navData));

module.exports = { sideBarData, navData };