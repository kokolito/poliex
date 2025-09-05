const utilityPoliex = require("./source/utilityPoliex.js");
const popolPoliex = require("./source/popolPoliex.js");
const merkletreePoliex = require("./source/merkletreePoliex.js");
const stringUtil = require("./source/stringUtil.js");

function treeFactory(functionsForTreeFactory) {
  const objectCreatedByTreeFactory = {
    // arg.tree
    // arg.listOfLeavesToKeep
    reduce: (arg) => {
      return popolPoliex._reduce({
        tree: arg.tree,
        listOfLeavesToKeep: arg.listOfLeavesToKeep,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.tree
    getRoot: (arg) => {
      return popolPoliex._getRoot({
        tree: arg.tree,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.tree
    // arg.treeToAdd
    concat: (arg) => {
      return popolPoliex._concat({
        tree: arg.tree,
        treeToAdd: arg.treeToAdd,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.proof
    getDataFromList: (arg) => {
      return popolPoliex._getDataFromList({
        proof: arg.proof,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.proof
    getDataFromTree: (arg) => {
      return popolPoliex._getDataFromTree({
        proof: arg.proof,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.listOfLeaves
    // arg.nameOfFunction
    // arg.implementation
    getMerkleTreeProofs: (arg) => {
      return merkletreePoliex._getMerkleTreeProofs({
        listOfLeaves: arg.listOfLeaves,
        nameOfFunction: arg.nameOfFunction,
        implementation: arg.implementation,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },

    // arg.listOfLeaves
    // arg.proofs
    checkMerkleTreeProofs: (arg) => {
      return merkletreePoliex._checkMerkleTreeProofs({
        listOfLeaves: arg.listOfLeaves,
        proofs: arg.proofs,
        functionsForTreeFactory: functionsForTreeFactory,
      });
    },
  };
  return objectCreatedByTreeFactory;
}

module.exports = {
  //
  deepCopy: utilityPoliex.deepCopy,
  isLeaf: utilityPoliex.isLeaf,
  createTree: utilityPoliex.createTree,
  flattenTree: utilityPoliex.flattenTree,
  //
  _reduce: popolPoliex._reduce,
  _getRoot: popolPoliex._getRoot,
  _concat: popolPoliex._concat,
  _getDataFromList: popolPoliex._getDataFromList,
  _getDataFromTree: popolPoliex._getDataFromTree,
  //
  _getMerkleTreeProofs: merkletreePoliex._getMerkleTreeProofs,
  _checkMerkleTreeProofs: merkletreePoliex._checkMerkleTreeProofs,
  _implementationWithLinkedTree_createStructure:
    merkletreePoliex._implementationWithLinkedTree_createStructure,
  _implementationWithLinkedTree_createDictionary:
    merkletreePoliex._implementationWithLinkedTree_createDictionary,
  _implementationWithArrays_createStructure:
    merkletreePoliex._implementationWithArrays_createStructure,
  _implementationWithArrays_createDictionary:
    merkletreePoliex._implementationWithArrays_createDictionary,
  flattenMerkletree: merkletreePoliex.flattenMerkletree,
  flattenMerkletreeDictionary: merkletreePoliex.flattenMerkletreeDictionary,
  //
  stringUtil: stringUtil,
  //
  treeFactory,
  timestampTree: treeFactory({
    sha256MerkletreeRoot: stringUtil.sha256MerkletreeRoot,
    push: stringUtil.push,
    append: stringUtil.append,
    prepend: stringUtil.prepend,
    sha256: stringUtil.sha256,
    toggleEndian: stringUtil.toggleEndian,
    set: stringUtil.set,
  }),
};
