const fs = require('fs');
const fm = require('front-matter')
const path = require('path');
const dirTree = require("directory-tree");
const fileTree = dirTree(path.join(__dirname, '../'), {extensions:/\.md/});

function getMeta(path, cb) {
  console.log('Extracting from Path: ', path);
  const meta = fm(fs.readFileSync(path, 'utf8'));
  return meta;
}

const getFilteredTree = ({name, path, children}) => 
   ({ name, path, ...(children ? {children: children.filter(item => item.name !== '.vuepress' ? getFilteredTree(item) : null )} : {meta : getMeta(path)}) })

const generateData = () => fs.writeFile(`${__dirname}/mdFiles.json`, JSON.stringify(getFilteredTree(fileTree).children), 'utf8', () => console.log('Done'));

module.exports = generateData;