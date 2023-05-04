const languageTree = require('./language-tree.json');
function findLanguage(node, languageName, path = '') {
  
  if (node.name.toLowerCase().includes(languageName.toLowerCase())) {
    return path + node.name;
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const childPath = path + node.name + ' > ';
    const result = findLanguage(child, languageName, childPath);
    
    if (result !== null) {
      return result;
    }
  }
  return null;
}

const languageName = 'Tachelhit';
const result = findLanguage(languageTree, languageName);

if (result !== null) {
  console.log(`Path to ${languageName}: ${result}`);
} else {
  console.log(`Language ${languageName} not found`);
}