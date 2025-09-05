const utilityPoliex = require("./utilityPoliex.js");

// arg.tree
// arg.listOfLeavesToKeep
// arg.functionsForTreeFactory
const _reduce = (arg) => {
  const reduceAuxiliary = (tree, listOfLeavesToKeep) => {
    if (!Array.isArray(tree)) {
      return tree;
    } else {
      let listOfReducedSubTrees = [];
      for (let i = 1; i < tree.length; i++) {
        listOfReducedSubTrees.push(
          reduceAuxiliary(tree[i], listOfLeavesToKeep)
        );
      }
      let youHaveToApplyFun = true;
      for (
        let i = 0;
        i < listOfReducedSubTrees.length && youHaveToApplyFun;
        i++
      ) {
        if (
          Array.isArray(listOfReducedSubTrees[i]) ||
          listOfLeavesToKeep.includes(listOfReducedSubTrees[i])
        ) {
          youHaveToApplyFun = false;
        }
      }
      if (youHaveToApplyFun === true) {
        return arg.functionsForTreeFactory[tree[0]](listOfReducedSubTrees);
      } else {
        listOfReducedSubTrees.unshift(tree[0]);
        return listOfReducedSubTrees;
      }
    }
  };
  return reduceAuxiliary(arg.tree, arg.listOfLeavesToKeep);
};

// arg.tree
// arg.functionsForTreeFactory
const _getRoot = (arg) => {
  return _reduce({
    tree: arg.tree,
    listOfLeavesToKeep: [],
    functionsForTreeFactory: arg.functionsForTreeFactory,
  });
};

// arg.tree
// arg.treeToAdd
// arg.functionsForTreeFactory
const _concat = (arg) => {
  const tree = utilityPoliex.deepCopy({ tree: arg.tree });
  const treeToAdd = utilityPoliex.deepCopy({
    tree: arg.treeToAdd,
  });
  const replaceLeafByTree = (leaf, tree, treeToAdd) => {
    if (!Array.isArray(tree)) {
      if (tree === leaf) {
        tree = treeToAdd;
      }
    } else {
      for (let i = 1; i < tree.length; i++) {
        if (!Array.isArray(tree[i])) {
          if (leaf === tree[i]) {
            tree[i] = treeToAdd;
          }
        } else {
          replaceLeafByTree(leaf, tree[i], treeToAdd);
        }
      }
    }
    return tree;
  };
  return replaceLeafByTree(
    _getRoot({
      tree: treeToAdd,
      functionsForTreeFactory: arg.functionsForTreeFactory,
    }),
    tree,
    treeToAdd
  );
};

// arg.proof
// arg.functionsForTreeFactory
const _getDataFromList = (arg) => {
  // const _getDataFromList_2 = (arg) => {
  const proof = arg.proof;

  const result = {};
  // arg.varName
  // arg.value
  function _privateFunctionToSaveValues(arg) {
    varName = arg.varName;
    value = arg.value;
    result[varName] = value;
  }
  const myFun = {
    ...arg.functionsForTreeFactory,
    _privateFunctionToSaveValues,
  };

  let currentHash;

  const steps = proof;
  for (const step of steps) {
    const listOfWords = step.split(" ");
    if (listOfWords.length == 1) {
      const method = listOfWords[0];
      currentHash = myFun[method]([currentHash]);
    } else {
      const method = listOfWords[0];
      const theRest = listOfWords.slice(1).join(" ");
      currentHash = myFun[method]([theRest, currentHash]);
    }
  }
  return result;
};

// arg.proof
// arg.functionsForTreeFactory
const _getDataFromTree = (arg) => {
  const proof = arg.proof;

  const result = {};
  // arg.varName
  // arg.value
  function _privateFunctionToSaveValues(arg) {
    varName = arg.varName;
    value = arg.value;
    result[varName] = value;
  }
  const myFun = {
    ...arg.functionsForTreeFactory,
    _privateFunctionToSaveValues,
  };

  _reduce({
    tree: proof,
    listOfLeavesToKeep: [],
    functionsForTreeFactory: myFun,
  });

  return result;
};

module.exports = {
  _reduce,
  _getRoot,
  _concat,
  _getDataFromList,
  _getDataFromTree,
};
