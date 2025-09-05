// arg.tree
const deepCopy = (arg) => {
  const x = arg.tree;
  if (!Array.isArray(x)) {
    return x;
  } else {
    const keysOfX = Object.keys(x);
    const copyOfX = [];
    for (let key of keysOfX) {
      copyOfX[key] = deepCopy({ tree: x[key] });
    }
    return copyOfX;
  }
};

// arg.leaf
// arg.tree
const isLeaf = (arg) => {
  const leaf = arg.leaf;
  const tree = arg.tree;
  if (!Array.isArray(tree)) {
    return leaf === tree;
  } else {
    for (let i = 1; i < tree.length; i++) {
      let subTree = tree[i];
      if (!Array.isArray(subTree)) {
        if (leaf === subTree) {
          return true;
        }
      } else if (
        isLeaf({
          leaf: leaf,
          tree: subTree,
        })
      ) {
        return true;
      }
    }
  }
  return false;
};

const createTree = (lines) => {
  const listOfWords = lines[0].split(" ");
  let newProof = [listOfWords[0], listOfWords.splice(1).join(" ")];

  for (let i = 1; i < lines.length; i++) {
    const listOfWords = lines[i].split(" ");
    const buf = [];
    buf[0] = listOfWords[0];
    if (listOfWords.length >= 2) {
      buf[1] = listOfWords.splice(1).join(" ");
    }
    buf.push(newProof);
    newProof = buf;
  }
  return newProof;
};

const flattenTree = (arg) => {
  flattenTree_aux = (tree, result) => {
    if (Array.isArray(tree)) {
      let listOfLines = [];
      if (tree.length == 2 && Array.isArray(tree[1])) {
        listOfLines[0] = tree[0];
      } else if (
        (tree.length == 2 && !Array.isArray(tree[1])) ||
        tree.length == 3
      ) {
        listOfLines[0] = tree[0] + " " + tree[1];
      }
      flattenTree_aux(tree[tree.length - 1], result);
      for (let i = 0; i < listOfLines.length; i++) {
        result.push(listOfLines[i]);
      }
    } else {
    }
  };
  const result = [];
  flattenTree_aux(arg, result);
  return result;
};

module.exports = {
  deepCopy,
  isLeaf,
  createTree,
  flattenTree,
};
