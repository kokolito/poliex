#!/usr/bin/env node

const poliex = require("../index.js");
const { getHashes } = require("./data/dataProducer.js");
const jsonUnitTest = require("json-unit-test");
const { stringUtil } = require("../index.js");
const util = require("util");
const crypto = require("crypto");
const merkletreejs = require("merkletreejs");
const { merkletree } = require("poliex-data-for-testing");
const assert = require("assert");

const funConcatenation = stringUtil.concatenationForLists;

const funHash256 = stringUtil.sha256;

// createListOfRandomHex

// arg.sizeOfList
// arg.sizeOfRandomHex
const createListOfRandomHex = (arg) => {
  const { randomBytes } = require("crypto");
  let result = [];
  for (let i = 0; i < arg.sizeOfList; i++) {
    result[i] = randomBytes(arg.sizeOfRandomHex / 2).toString("hex");
  }
  return result;
};

{
  // Test 1: Check if the returned list has the correct number of items.
  const listSize = 5;
  const hexLength = 8;
  const hexList = createListOfRandomHex({
    sizeOfList: listSize,
    sizeOfRandomHex: hexLength,
  });
  assert.strictEqual(
    hexList.length,
    listSize,
    "Test 1: List should have the correct size."
  );
  // Test 2: Check if each item in the list has the correct length.
  hexList.forEach((item) => {
    assert.strictEqual(
      item.length,
      hexLength,
      "Test 2: Each item in the list should have the correct length."
    );
  });
  // Test 3: Check if each item contains only valid hex characters.
  const hexRegex = /^[0-9a-f]+$/;
  hexList.forEach((item) => {
    assert.ok(
      hexRegex.test(item),
      "Test 3: Each item should contain only valid hex characters."
    );
  });
  // Test 4: Check with sizeOfList = 0.
  const emptyList = createListOfRandomHex({
    sizeOfList: 0,
    sizeOfRandomHex: 5,
  });
  assert.strictEqual(
    emptyList.length,
    0,
    "Test 4: An empty list should be returned for a size of 0."
  );
}

const dataToBeTested_createListOfRandomHex = [
  {
    name_of_unit_test: "Test of createListOfRandomHex",
    tests: [
      {
        name_of_test: 1,
        function_name: "createListOfRandomHex",
        input: {
          sizeOfList: 0,
          sizeOfRandomHex: 0,
        },
      },
      {
        name_of_test: 1,
        function_name: "createListOfRandomHex",
        input: {
          sizeOfList: 0,
          sizeOfRandomHex: 10,
        },
      },
      {
        name_of_test: 1,
        function_name: "createListOfRandomHex",
        input: {
          sizeOfList: 5,
          sizeOfRandomHex: 0,
        },
      },
      {
        name_of_test: 1,
        function_name: "createListOfRandomHex",
        input: {
          sizeOfList: 5,
          sizeOfRandomHex: 10,
        },
      },
    ],
  },
];

const functionsToBeTested_createListOfRandomHex = {
  createListOfRandomHex: createListOfRandomHex,
};
jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_createListOfRandomHex,
  functionsToBeTested: functionsToBeTested_createListOfRandomHex,
  testOutputEquality: false,
});

// END OF createListOfRandomHex

// testSpeed

let doWeTestTheSpeed = false;
let isGoingImplementationWithLinkedTree = false;
let isGoingImplementationWithArrays = false;
let isGoingMerkletreejs = false;
let isGoingOtherTest = false;

// doWeTestTheSpeed = true;
isGoingImplementationWithLinkedTree = true;
isGoingImplementationWithArrays = true;
isGoingMerkletreejs = true;
isGoingOtherTest = true;

const testSpeed = () => {
  const myTree = poliex.treeFactory({
    sha256: funHash256,
    concatenation: funConcatenation,
  });
  let listOfHexStrings = createListOfRandomHex({
    sizeOfList: 1_000,
    sizeOfRandomHex: 64,
  });

  if (isGoingImplementationWithLinkedTree) {
    let start = Date.now();
    const listOfLeafLinkedNodes =
      poliex._implementationWithLinkedTree_createStructure({
        listOfLeaves: listOfHexStrings,
        nameOfFunction: "sha256",
        functionsForTreeFactory: {
          sha256: funHash256,
          concatenation: funConcatenation,
        },
      });
    let end = Date.now();
    console.log(
      `Execution time _implementationWithLinkedTree_createStructure: ${
        end - start
      } ms`
    );
    start = Date.now();
    const proofs = poliex._implementationWithLinkedTree_createDictionary({
      listOfLeafLinkedNodes: listOfLeafLinkedNodes,
      nameOfFunction: "sha256",
    });
    end = Date.now();
    console.log(
      `Execution time _implementationWithLinkedTree_createDictionary: ${
        end - start
      } ms`
    );
    // console.log(myTree.getRoot({tree: proofs[Object.keys(proofs)[0]]}))
    // console.log(proofs)
  }

  if (isGoingImplementationWithArrays) {
    let start = Date.now();
    const table = poliex._implementationWithArrays_createStructure({
      listOfLeaves: listOfHexStrings,
      nameOfFunction: "sha256",
      functionsForTreeFactory: {
        sha256: funHash256,
        concatenation: funConcatenation,
      },
    });
    let end = Date.now();
    console.log(
      `Execution time _implementationWithArrays_createStructure: ${
        end - start
      } ms`
    );
    start = Date.now();
    const proofs = poliex._implementationWithArrays_createDictionary({
      table: table,
      nameOfFunction: "sha256",
    });
    end = Date.now();
    console.log(
      `Execution time _implementationWithArrays_createDictionary: ${
        end - start
      } ms`
    );
  }

  if (isGoingMerkletreejs) {
    let start = Date.now();
    const poliex = new merkletreejs.MerkleTree(listOfHexStrings, (data) =>
      crypto.createHash("sha256").update(data).digest()
    );
    let end = Date.now();
    console.log(`Execution time merkleTreejs: ${end - start} ms`);
    start = Date.now();
    const proofs = poliex.getProofs();
    end = Date.now();
    console.log(`Execution time getProofs: ${end - start} ms`);
    // console.log(poliex.getRoot().toString('hex'))
    // console.log(poliex.getLeaves())
    // console.log(proofs)
  }
  if (isGoingOtherTest) {
    start = Date.now();
    for (let i = 0; i < 100000; i++) {
      poliex.deepCopy(listOfHexStrings);
    }
    end = Date.now();
    console.log(`Execution time isGoingOtherTest: ${end - start} ms`);
  }
};
if (doWeTestTheSpeed) {
  testSpeed();
}

// getMerkleTreeProofs

const dataToBeTested_testOf_getMerkleTreeProofs = [
  {
    name_of_unit_test: "Test of testOf_getMerkleTreeProofs",
    tests: [
      {
        name_of_test: "1",
        function_name: "testOf_getMerkleTreeProofs",
        input: "",
        output_expected: true,
      },
    ],
  },
];

const testOf_getMerkleTreeProofs = () => {
  const myTree = poliex.treeFactory({
    sha256: funHash256,
    concatenation: funConcatenation,
  });
  for (let i = 0; i <= 16; i++) {
    let listOfHexStrings = createListOfRandomHex({
      sizeOfList: i,
      sizeOfRandomHex: 64,
    });
    listOfHexStrings = listOfHexStrings.filter(
      (x, i) => i === listOfHexStrings.indexOf(x)
    );
    if (
      !util.isDeepStrictEqual(
        myTree.getMerkleTreeProofs({
          listOfLeaves: listOfHexStrings,
          implementation: "implementationWithLinkedTree",
          nameOfFunction: "sha256",
        }),
        myTree.getMerkleTreeProofs({
          listOfLeaves: listOfHexStrings,
          implementation: "implementationWithArrays",
          nameOfFunction: "sha256",
        })
      )
    ) {
      return false;
    }
    listOfHexStrings = listOfHexStrings.concat(listOfHexStrings);
    if (
      !util.isDeepStrictEqual(
        myTree.getMerkleTreeProofs({
          listOfLeaves: listOfHexStrings,
          implementation: "implementationWithLinkedTree",
          nameOfFunction: "concatenation",
        }),
        myTree.getMerkleTreeProofs({
          listOfLeaves: listOfHexStrings,
          implementation: "implementationWithArrays",
          nameOfFunction: "concatenation",
        })
      )
    ) {
      return false;
    }
  }
  return true;
};

jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_testOf_getMerkleTreeProofs,
  functionsToBeTested: {
    testOf_getMerkleTreeProofs: testOf_getMerkleTreeProofs,
  },
});

// getMerkleTreeProofs
// checkMerkleTreeProofs

const createDataToBeTested_getMerkleTreeProofs_checkMerkleTreeProofs = () => {
  let differentTests = [
    {
      nameOfFunction: "sha256",
      implementation: "implementationWithLinkedTree",
    },
    {
      nameOfFunction: "concatenation",
      implementation: "implementationWithLinkedTree",
    },
    {
      nameOfFunction: "sha256",
      implementation: "implementationWithArrays",
    },
    {
      nameOfFunction: "concatenation",
      implementation: "implementationWithArrays",
    },
  ];
  let result = [];
  for (let i = 0; i < differentTests.length; i++) {
    let nameOfFunction = differentTests[i].nameOfFunction;
    let implementation = differentTests[i].implementation;
    let fun;
    if (nameOfFunction === "sha256") {
      fun = funHash256;
    } else if (nameOfFunction === "concatenation") {
      fun = funConcatenation;
    }
    const h = getHashes(fun);
    result = result.concat([
      {
        name_of_unit_test: `Test of getMerkleTreeProofs, implementation: ${implementation}, function: ${nameOfFunction}`,
        tests: [
          {
            name_of_test: "1",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: null,
              proofs: {},
            },
          },
          {
            name_of_test: "2",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: h.data_1,
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: h.data_1,
              },
            },
          },
          {
            name_of_test: "3",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: [nameOfFunction, h.data_1, h.data_2],
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: [nameOfFunction, h.data_1, h.data_2],
                [h.data_2]: [nameOfFunction, h.data_1, h.data_2],
              },
            },
          },
          {
            name_of_test: "4",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2, h.data_3, h.data_4],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  h.h_3_4,
                ],
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  h.h_3_4,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  h.h_3_4,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  h.h_1_2,
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                [h.data_4]: [
                  nameOfFunction,
                  h.h_1_2,
                  [nameOfFunction, h.data_3, h.data_4],
                ],
              },
            },
          },
          {
            name_of_test: "5",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2, h.data_3, h.data_4, h.data_5],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                  h.data_5,
                ],
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                  h.data_5,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                  h.data_5,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                  h.data_5,
                ],
                [h.data_4]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                  h.data_5,
                ],
                [h.data_5]: [nameOfFunction, h.h_1_2_3_4, h.data_5],
              },
            },
          },
          {
            name_of_test: "6",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [
                h.data_1,
                h.data_2,
                h.data_3,
                h.data_4,
                h.data_5,
                h.data_6,
                h.data_7,
                h.data_8,
                h.data_9,
                h.data_10,
                h.data_11,
                h.data_12,
                h.data_13,
                h.data_14,
                h.data_15,
                h.data_16,
              ],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_1, h.data_2],
                      h.h_3_4,
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_1, h.data_2],
                      h.h_3_4,
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_1, h.data_2],
                      h.h_3_4,
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_1_2,
                      [nameOfFunction, h.data_3, h.data_4],
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_4]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_1_2,
                      [nameOfFunction, h.data_3, h.data_4],
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_5]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_5, h.data_6],
                      h.h_7_8,
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_6]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_5, h.data_6],
                      h.h_7_8,
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_7]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      h.h_5_6,
                      [nameOfFunction, h.data_7, h.data_8],
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_8]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      h.h_5_6,
                      [nameOfFunction, h.data_7, h.data_8],
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_9]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_9, h.data_10],
                      h.h_11_12,
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_10]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_9, h.data_10],
                      h.h_11_12,
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_11]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_9_10,
                      [nameOfFunction, h.data_11, h.data_12],
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_12]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_9_10,
                      [nameOfFunction, h.data_11, h.data_12],
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_13]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_13, h.data_14],
                      h.h_15_16,
                    ],
                  ],
                ],
                [h.data_14]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_13, h.data_14],
                      h.h_15_16,
                    ],
                  ],
                ],
                [h.data_15]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      h.h_13_14,
                      [nameOfFunction, h.data_15, h.data_16],
                    ],
                  ],
                ],
                [h.data_16]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      h.h_13_14,
                      [nameOfFunction, h.data_15, h.data_16],
                    ],
                  ],
                ],
              },
            },
          },
          {
            name_of_test: "7",
            function_name: "getMerkleTreeProofs",
            input: {
              listOfLeaves: [
                h.data_1,
                h.data_2,
                h.data_3,
                h.data_4,
                h.data_1,
                h.data_2,
                h.data_3,
                h.data_4,
              ],
              implementation: implementation,
              nameOfFunction: nameOfFunction,
            },
            output_expected: {
              root: myTree.reduce({
                tree: [
                  nameOfFunction,
                  h.h_1_2_3_4,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                ],
                listOfLeavesToKeep: [],
              }),
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  h.h_1_2_3_4,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                ],
                [h.data_2]: [
                  nameOfFunction,
                  h.h_1_2_3_4,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                ],
                [h.data_3]: [
                  nameOfFunction,
                  h.h_1_2_3_4,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                ],
                [h.data_4]: [
                  nameOfFunction,
                  h.h_1_2_3_4,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        name_of_unit_test: `Test of getMerkleTreeProofs, implementation: ${implementation}, function: ${nameOfFunction}`,
        tests: [
          {
            name_of_test: "1",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [],
              proofs: {},
            },
            output_expected: true,
          },
          {
            name_of_test: "2",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1],
              proofs: {
                [h.data_1]: h.data_1,
              },
            },
            output_expected: true,
          },
          {
            name_of_test: "3",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2],
              proofs: {
                [h.data_1]: h.data_1,
              },
            },
            output_expected: false,
          },
          {
            name_of_test: "4",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2],
              proofs: {
                [h.data_1]: [nameOfFunction, h.data_1, h.data_2],
                [h.data_2]: [nameOfFunction, h.data_1, h.data_2],
              },
            },
            output_expected: true,
          },
          {
            name_of_test: "5",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1],
              proofs: {
                [h.data_1]: [nameOfFunction, h.data_1, h.data_2],
                [h.data_2]: [nameOfFunction, h.data_1, h.data_2],
              },
            },
            output_expected: false,
          },
          {
            name_of_test: "6",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2, h.data_3, h.data_4],
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  h.h_3_4,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  h.h_3_4,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  h.h_1_2,
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                [h.data_4]: [
                  nameOfFunction,
                  h.h_1_2,
                  [nameOfFunction, h.data_3, h.data_4],
                ],
              },
            },
            output_expected: true,
          },
          {
            name_of_test: "7",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [h.data_1, h.data_2, h.data_3, h.data_4, h.data_5],
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                  h.data_5,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [nameOfFunction, h.data_1, h.data_2],
                    h.h_3_4,
                  ],
                  h.data_5,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                  h.data_5,
                ],
                [h.data_4]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2,
                    [nameOfFunction, h.data_3, h.data_4],
                  ],
                  h.data_5,
                ],
                [h.data_5]: [nameOfFunction, h.h_1_2_3_4, h.data_5],
              },
            },
            output_expected: true,
          },
          {
            name_of_test: "8",
            function_name: "checkMerkleTreeProofs",
            input: {
              listOfLeaves: [
                h.data_1,
                h.data_2,
                h.data_3,
                h.data_4,
                h.data_5,
                h.data_6,
                h.data_7,
                h.data_8,
                h.data_9,
                h.data_10,
                h.data_11,
                h.data_12,
                h.data_13,
                h.data_14,
                h.data_15,
                h.data_16,
              ],
              proofs: {
                [h.data_1]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_1, h.data_2],
                      h.h_3_4,
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_2]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_1, h.data_2],
                      h.h_3_4,
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_3]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_1_2,
                      [nameOfFunction, h.data_3, h.data_4],
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_4]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_1_2,
                      [nameOfFunction, h.data_3, h.data_4],
                    ],
                    h.h_5_6_7_8,
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_5]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_5, h.data_6],
                      h.h_7_8,
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_6]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_5, h.data_6],
                      h.h_7_8,
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_7]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      h.h_5_6,
                      [nameOfFunction, h.data_7, h.data_8],
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_8]: [
                  nameOfFunction,
                  [
                    nameOfFunction,
                    h.h_1_2_3_4,
                    [
                      nameOfFunction,
                      h.h_5_6,
                      [nameOfFunction, h.data_7, h.data_8],
                    ],
                  ],
                  h.h_9_10_11_12_13_14_15_16,
                ],
                [h.data_9]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_9, h.data_10],
                      h.h_11_12,
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_10]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_9, h.data_10],
                      h.h_11_12,
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_11]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_9_10,
                      [nameOfFunction, h.data_11, h.data_12],
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_12]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    [
                      nameOfFunction,
                      h.h_9_10,
                      [nameOfFunction, h.data_11, h.data_12],
                    ],
                    h.h_13_14_15_16,
                  ],
                ],
                [h.data_13]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_13, h.data_14],
                      h.h_15_16,
                    ],
                  ],
                ],
                [h.data_14]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      [nameOfFunction, h.data_13, h.data_14],
                      h.h_15_16,
                    ],
                  ],
                ],
                [h.data_15]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      h.h_13_14,
                      [nameOfFunction, h.data_15, h.data_16],
                    ],
                  ],
                ],
                [h.data_16]: [
                  nameOfFunction,
                  h.h_1_2_3_4_5_6_7_8,
                  [
                    nameOfFunction,
                    h.h_9_10_11_12,
                    [
                      nameOfFunction,
                      h.h_13_14,
                      [nameOfFunction, h.data_15, h.data_16],
                    ],
                  ],
                ],
              },
            },
            output_expected: true,
          },
        ],
      },
    ]);
  }
  return result;
};

const myTree = poliex.treeFactory({
  sha256: funHash256,
  concatenation: funConcatenation,
});
const functionsToBeTested = {
  getMerkleTreeProofs: myTree.getMerkleTreeProofs,
  checkMerkleTreeProofs: myTree.checkMerkleTreeProofs,
};
jsonUnitTest.unitTest({
  dataToBeTested:
    createDataToBeTested_getMerkleTreeProofs_checkMerkleTreeProofs(),
  functionsToBeTested: functionsToBeTested,
});

// flattenMerkletree

const dataToBeTested_flattenMerkletree = [
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "1",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf5hashes.proofs[
              "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873"
            ],
          hash: "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf5hashes_result.proofs[
            "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873"
          ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "2",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf5hashes.proofs[
              "203d698fcc30e70f09db1e9079522fbf600a25f06652ce2aa3af2307b15a0d99"
            ],
          hash: "203d698fcc30e70f09db1e9079522fbf600a25f06652ce2aa3af2307b15a0d99",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf5hashes_result.proofs[
            "203d698fcc30e70f09db1e9079522fbf600a25f06652ce2aa3af2307b15a0d99"
          ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "3",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf5hashes.proofs[
              "e05b6eb3ff1d6679c66680ee77858b96ca33a50624cdce2edd364058762e0cd6"
            ],
          hash: "e05b6eb3ff1d6679c66680ee77858b96ca33a50624cdce2edd364058762e0cd6",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf5hashes_result.proofs[
            "e05b6eb3ff1d6679c66680ee77858b96ca33a50624cdce2edd364058762e0cd6"
          ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "4",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf5hashes.proofs[
              "ab05aebbb82a166df195ca4a8837bd64ba0055e3dd200ecd8d1de812a2751380"
            ],
          hash: "ab05aebbb82a166df195ca4a8837bd64ba0055e3dd200ecd8d1de812a2751380",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf5hashes_result.proofs[
            "ab05aebbb82a166df195ca4a8837bd64ba0055e3dd200ecd8d1de812a2751380"
          ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "5",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf5hashes.proofs[
              "9c511e7b314bd10b22c1a86c2c01ead815c75350ebf6b2543ca215a3d7c23424"
            ],
          hash: "9c511e7b314bd10b22c1a86c2c01ead815c75350ebf6b2543ca215a3d7c23424",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf5hashes_result.proofs[
            "9c511e7b314bd10b22c1a86c2c01ead815c75350ebf6b2543ca215a3d7c23424"
          ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletree",
    tests: [
      {
        name_of_test: "6",
        function_name: "flattenMerkletree",
        input: {
          merkletree:
            merkletree.dictOf1hash.proofs[
              "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873"
            ],
          hash: "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873",
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected:
          merkletree.dictOf1hash_result.proofs[
            "8ac1b16b189a80e79f531ec92e3eaa09aa2c9453001883f5cc2da21497bfe873"
          ],
      },
    ],
  },
];

functionsToBeTested_flattenMerkletree = {
  flattenMerkletree: poliex.flattenMerkletree,
};

jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_flattenMerkletree,
  functionsToBeTested: functionsToBeTested_flattenMerkletree,
});

// flattenMerkletreeDictionary

const dataToBeTested_flattenMerkletreeDictionary = [
  {
    name_of_unit_test: "Test of flattenMerkletreeDictionary",
    tests: [
      {
        name_of_test: "1",
        function_name: "flattenMerkletreeDictionary",
        input: {
          merkletreeDictionary: merkletree.dictOf5hashes,
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected: merkletree.dictOf5hashes_result,
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenMerkletreeDictionary",
    tests: [
      {
        name_of_test: "2",
        function_name: "flattenMerkletreeDictionary",
        input: {
          merkletreeDictionary: merkletree.dictOf1hash,
          secondLine: "set hashesGiven",
          lastLine: "set rootCalculated",
        },
        output_expected: merkletree.dictOf1hash_result,
      },
    ],
  },
];

functionsToBeTested_flattenMerkletreeDictionary = {
  flattenMerkletreeDictionary: poliex.flattenMerkletreeDictionary,
};

jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_flattenMerkletreeDictionary,
  functionsToBeTested: functionsToBeTested_flattenMerkletreeDictionary,
});
