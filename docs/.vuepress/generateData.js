const fs = require('fs');
const fm = require('front-matter')
const path = require('path');
const dirTree = require("directory-tree");
const fileTree = dirTree(path.join(__dirname, '../'), {extensions:/\.md/});

const getMeta = (path, cb) => {
  console.log('Extracting from Path: ', path);
  return fm(fs.readFileSync(path, 'utf8'));
}

const getFilteredTree = ({name, path, children}) => 
   ({ name, path, ...(children ? {children: children.map(item => getFilteredTree(item) )} : {meta : getMeta(path)}) })

const generateData = () => fs.writeFile(`${__dirname}/mdFiles.json`, JSON.stringify(getFilteredTree(fileTree).children.filter(i => !['Readme.md', ".vuepress"].includes(i.name))), 'utf8', () => console.log('Done'));

module.exports = generateData;