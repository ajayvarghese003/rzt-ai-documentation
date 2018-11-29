const {sideBarData, navData } = require('./../sideBar.js');
const generateData = require('./generateData');
const data = require('./mdFiles.json');  

// generateData();


module.exports = {
    title: 'Razorthink AI',
    description: "Razorthink AI Documentation",
    themeConfig:{
        logo: 'https://guide.razorthink.com/images/Slash.svg',
        // nav: true,
        // nav: [
        //     { text: 'Concepts', link: '/Concepts/' },
        //     { text: 'Usecase', link: '/Usecase/' },
        // ],
        nav: navData,
        // sidebar: 'auto',
        sidebar: sideBarData.map(d => ({ ...d, collapsable: false})),
    },
    plugins: [
      generateData()
    ]
}