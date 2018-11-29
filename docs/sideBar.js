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

// module.exports = [
// 	{
// 	  title: 'Concepts',
// 	  children: [
// 	    '/concepts/Blocks',
// 	    '/concepts/Recipe',
// 	    '/concepts/Pipeline',
// 	    // '/concepts/'
// 	  ]
// 	},
// 	{
// 	  title: 'Use Case',
// 	  children: [
// 	  	// '/usecase/',
//       	'/usecase/PoseDetection',
//       	'/usecase/ChurnDetection',
//       	'/usecase/CoAttention',
// 	  ]
// 	},
// ];		

// module.exports = [
// 	{
// 		"title":"concepts",
// 		"children":[
// 			"/concepts/Blocks",
// 			"/concepts/Pipeline",
// 			// "/concepts/README",
// 			"/concepts/Recipe",
// 			"/concepts/counter-app"
// 		]
// 	},{
// 		"title":"guide",
// 		"children":
// 		[
// 			// "/guide/README",
// 			"/guide/api",
// 			"/guide/guide"
// 		]
// 	},{
// 		"title":"usecase",
// 		"children":
// 		[
// 			"/usecase/ChurnDetection",
// 			"/usecase/CoAttention",
// 			"/usecase/PoseDetection",
// 			"/usecase/Readme"
// 		]
// 	}
// ];