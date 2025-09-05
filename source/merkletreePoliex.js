const utilityPoliex = require("./utilityPoliex.js");
const popolPoliex = require("./popolPoliex.js");

// arg.listOfLeaves
// arg.nameOfFunction
// arg.implementation
// arg.functionsForTreeFactory
const _getMerkleTreeProofs = (arg) => {
  function getOneValueOfObject(obj) {
    if (obj && typeof obj === "object") {
      const values = Object.values(obj);
      return values.length > 0 ? values[0] : null;
    }
    return null;
  }
  let proofsDictionary;
  if (arg.implementation === "implementationWithLinkedTree") {
    proofsDictionary = _implementationWithLinkedTree_createDictionary({
      listOfLeafLinkedNodes: _implementationWithLinkedTree_createStructure(
        //   objectCreatedByTreeFactory._implementationWithLinkedTree_createStructure(
        {
          listOfLeaves: arg.listOfLeaves,
          //   nameOfFunction: functionsForTreeFactory[arg.nameOfFunction],
          nameOfFunction: arg.nameOfFunction,
          functionsForTreeFactory: arg.functionsForTreeFactory,
        }
      ),
      nameOfFunction: arg.nameOfFunction,
    });
  } else if (arg.implementation === "implementationWithArrays") {
    proofsDictionary = _implementationWithArrays_createDictionary({
      table: _implementationWithArrays_createStructure(
        // objectCreatedByTreeFactory._implementationWithArrays_createStructure(
        {
          listOfLeaves: arg.listOfLeaves,
          //   nameOfFunction: functionsForTreeFactory[arg.nameOfFunction],
          nameOfFunction: arg.nameOfFunction,
          functionsForTreeFactory: arg.functionsForTreeFactory,
        }
      ),
      nameOfFunction: arg.nameOfFunction,
    });
  }
  const oneOfTheProofs = getOneValueOfObject(proofsDictionary);
  let root;
  if (oneOfTheProofs == null) {
    root = null;
  } else {
    root = popolPoliex._reduce({
      tree: oneOfTheProofs,
      listOfLeavesToKeep: [],
      functionsForTreeFactory: arg.functionsForTreeFactory,
    });
  }
  return {
    root: root,
    proofs: proofsDictionary,
  };
};

// arg.listOfLeaves
// arg.proofs
// arg.functionsForTreeFactory
const _checkMerkleTreeProofs = (arg) => {
  const listOfLeaves = arg.listOfLeaves;
  const proofs = arg.proofs;
  if (listOfLeaves.length !== Object.keys(proofs).length) {
    return false;
  } else if (listOfLeaves.length === 0) {
    return true;
  } else {
    const root = popolPoliex._getRoot({
      tree: proofs[listOfLeaves[0]],
      functionsForTreeFactory: arg.functionsForTreeFactory,
    });
    for (let i = 1; i < listOfLeaves.length; i++) {
      if (
        popolPoliex._getRoot({
          tree: proofs[listOfLeaves[i]],
          functionsForTreeFactory: arg.functionsForTreeFactory,
        }) !== root
      ) {
        return false;
      }
      if (
        !utilityPoliex.isLeaf({
          // !util.isLeaf({
          leaf: listOfLeaves[i],
          tree: proofs[listOfLeaves[i]],
        })
      ) {
        return false;
      }
    }
    return true;
  }
};

// arg.listOfLeaves
// arg.nameOfFunction
// arg.functionsForTreeFactory
const _implementationWithLinkedTree_createStructure = (arg) => {
  let listOfLeaves = arg.listOfLeaves;
  const nameOfFunction = arg.nameOfFunction;
  if (listOfLeaves.length === 0) {
    return [];
  } else if (listOfLeaves.length === 1) {
    return [
      {
        left: null,
        right: null,
        hash: listOfLeaves[0],
        father: null,
      },
    ];
  } else {
    let bufferList = [];
    let listOfLeafLinkedNodes = [];
    while (listOfLeaves.length != 0) {
      let indexOfMyList = 0;
      while (indexOfMyList <= listOfLeaves.length - 2) {
        let leftNode;
        let rightNode;
        if (typeof listOfLeaves[indexOfMyList] === "object") {
          leftNode = listOfLeaves[indexOfMyList];
        } else {
          leftNode = {
            left: null,
            right: null,
            hash: listOfLeaves[indexOfMyList],
          };
          listOfLeafLinkedNodes.push(leftNode);
        }
        if (typeof listOfLeaves[indexOfMyList + 1] === "object") {
          rightNode = listOfLeaves[indexOfMyList + 1];
        } else {
          rightNode = {
            left: null,
            right: null,
            hash: listOfLeaves[indexOfMyList + 1],
          };
          listOfLeafLinkedNodes.push(rightNode);
        }
        let node = {
          left: leftNode,
          right: rightNode,
          hash: arg.functionsForTreeFactory[nameOfFunction]([
            leftNode.hash,
            rightNode.hash,
          ]),
          father: null,
        };
        leftNode.father = node;
        rightNode.father = node;

        bufferList.push(node);
        indexOfMyList = indexOfMyList + 2;
      }
      if (indexOfMyList !== 0 && indexOfMyList + 1 === listOfLeaves.length) {
        bufferList.push(listOfLeaves[indexOfMyList]);
      }
      listOfLeaves = bufferList;
      bufferList = [];
    }
    return listOfLeafLinkedNodes;
  }
};

// arg.listOfLeafLinkedNodes
// arg.nameOfFunction
const _implementationWithLinkedTree_createDictionary = (arg) => {
  const listOfLeafLinkedNodes = arg.listOfLeafLinkedNodes;
  const nameOfFunction = arg.nameOfFunction;
  if (listOfLeafLinkedNodes.length === 0) {
    return {};
  } else {
    let dictionaryOfLeafs = {};
    for (let j = 0; j < listOfLeafLinkedNodes.length; j++) {
      // You can remove that if...else.
      // It'll be slower.
      // But the references will not be shared.
      if (j % 2 === 0) {
        let node = listOfLeafLinkedNodes[j];
        let treeConstructed = node.hash;
        while (node.father !== null) {
          if (node === node.father.left) {
            treeConstructed = [
              nameOfFunction,
              treeConstructed,
              node.father.right.hash,
            ];
          } else {
            treeConstructed = [
              nameOfFunction,
              node.father.left.hash,
              treeConstructed,
            ];
          }
          node = node.father;
        }
        dictionaryOfLeafs[listOfLeafLinkedNodes[j].hash] = treeConstructed;
      } else {
        dictionaryOfLeafs[listOfLeafLinkedNodes[j].hash] =
          dictionaryOfLeafs[listOfLeafLinkedNodes[j - 1].hash];
      }
    }
    return dictionaryOfLeafs;
  }
};

// arg.listOfLeaves
// arg.nameOfFunction
// arg.functionsForTreeFactory
const _implementationWithArrays_createStructure = (arg) => {
  const listOfLeaves = arg.listOfLeaves;
  const nameOfFunction = arg.nameOfFunction;
  if (listOfLeaves.length === 0) {
    return [[]];
  } else {
    const numberOfLines = Math.ceil(Math.log2(listOfLeaves.length)) + 1;
    const table = new Array(numberOfLines);
    table[0] = listOfLeaves;
    let nomberOfColumns = Math.ceil(listOfLeaves.length / 2);
    for (let i = 1; i < numberOfLines; i++) {
      table[i] = new Array(nomberOfColumns);
      for (let j = 0; j < nomberOfColumns; j++) {
        if (2 * j + 1 < table[i - 1].length) {
          table[i][j] = arg.functionsForTreeFactory[nameOfFunction]([
            table[i - 1][2 * j],
            table[i - 1][2 * j + 1],
          ]);
        } else {
          table[i][j] = table[i - 1][2 * j];
        }
      }
      nomberOfColumns = Math.ceil(nomberOfColumns / 2);
    }
    return table;
  }
};

//  arg.table
//  arg.nameOfFunction
const _implementationWithArrays_createDictionary = (arg) => {
  const table = arg.table;
  const nameOfFunction = arg.nameOfFunction;
  const dictionaryOfLeafs = {};
  for (let j = 0; j < table[0].length; j++) {
    // You can remove that if...else.
    // It'll be slower.
    // But the references will not be shared.
    if (j % 2 === 0) {
      let treeConstructed = table[0][j];
      let i = 0;
      while (i < table.length - 1) {
        const jindex = Math.floor(j / 2 ** i);
        if (jindex % 2 === 0) {
          if (jindex + 1 !== table[i].length) {
            treeConstructed = [
              nameOfFunction,
              treeConstructed,
              table[i][jindex + 1],
            ];
          }
        } else {
          treeConstructed = [
            nameOfFunction,
            table[i][jindex - 1],
            treeConstructed,
          ];
        }
        i++;
      }
      dictionaryOfLeafs[table[0][j]] = treeConstructed;
    } else {
      dictionaryOfLeafs[table[0][j]] = dictionaryOfLeafs[table[0][j - 1]];
    }
  }
  return dictionaryOfLeafs;
};

// arg.merkletree
// arg.hash
// arg.secondLine
// arg.lastLine
const flattenMerkletree = (arg) => {
  merkletree = arg.merkletree;
  hash = arg.hash;
  secondLine = arg.secondLine;
  lastLine = arg.lastLine;
  flattenMerkletree_aux = (tree, result) => {
    if (Array.isArray(tree)) {
      let listOfLines = [];
      let str = tree[0];
      if (str != "sha256") {
      } else {
        if (tree.length == 2) {
        } else if (tree.length == 3) {
          if (!Array.isArray(tree[1]) && !Array.isArray(tree[2])) {
            if (tree[1] == hash) {
              listOfLines.push(`push ${tree[1]}`);
              if (secondLine != null) {
                listOfLines.push(`${secondLine}`);
              }
              listOfLines.push(`append ${tree[2]}`);
              listOfLines.push(str);
            } else {
              listOfLines.push(`push ${tree[2]}`);
              if (secondLine != null) {
                listOfLines.push(`${secondLine}`);
              }
              listOfLines.push(`prepend ${tree[1]}`);
              listOfLines.push(str);
            }
          } else if (!Array.isArray(tree[1]) && Array.isArray(tree[2])) {
            listOfLines.push(`prepend ${tree[1]}`);
            listOfLines.push(str);
          } else if (Array.isArray(tree[1]) && !Array.isArray(tree[2])) {
            listOfLines.push(`append ${tree[2]}`);
            listOfLines.push(str);
          }
        } else if (tree.length == 4) {
        }
      }
      for (let i = 1; i < tree.length; i++) {
        flattenMerkletree_aux(tree[i], result);
      }
      for (let i = 0; i < listOfLines.length; i++) {
        result.push(listOfLines[i]);
      }
    } else {
    }
  };
  let result = [];
  if (Array.isArray(merkletree)) {
    flattenMerkletree_aux(merkletree, result);
    if (lastLine != null) {
      result.push(`${lastLine}`);
    }
  } else {
    result = [`push ${merkletree}`];
    if (secondLine != null) {
      result.push(`${secondLine}`);
    }
    if (lastLine != null) {
      result.push(`${lastLine}`);
    }
  }
  return result;
};

// arg.merkletreeDictionary
// arg.secondLine
// arg.lastLine
const flattenMerkletreeDictionary = (arg) => {
  merkletreeDictionary = arg.merkletreeDictionary;
  secondLine = arg.secondLine;
  lastLine = arg.lastLine;
  const result = {
    root: merkletreeDictionary.root,
    proofs: {},
  };
  for (hash in merkletreeDictionary.proofs) {
    result.proofs[hash] = flattenMerkletree({
      merkletree: merkletreeDictionary.proofs[hash],
      hash,
      secondLine,
      lastLine,
    });
  }
  return result;
};

module.exports = {
  _getMerkleTreeProofs,
  _checkMerkleTreeProofs,
  _implementationWithLinkedTree_createStructure,
  _implementationWithLinkedTree_createDictionary,
  _implementationWithArrays_createStructure,
  _implementationWithArrays_createDictionary,
  flattenMerkletree,
  flattenMerkletreeDictionary,
};
