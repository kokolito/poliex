#!/usr/bin/env node

const poliex = require("../index.js");
const { coucou, stampmany } = require("poliex-data-for-testing");
const { getHashes } = require("./data/dataProducer.js");
const jsonUnitTest = require("json-unit-test");
const { stringUtil } = require("../index.js");

const funConcatenation = stringUtil.concatenationForLists;
const funHash256 = stringUtil.sha256;

const createDataToBeTestedSecond = () => {
  let differentTests = ["sha256", "concatenation"];
  let result = [];
  for (let i = 0; i < differentTests.length; i++) {
    let nameOfFunction = differentTests[0];
    let fun;
    if (nameOfFunction === "sha256") {
      fun = funHash256;
    } else if (nameOfFunction === "concatenation") {
      fun = funConcatenation;
    }
    const h = getHashes(fun);
    result = result.concat([
      {
        name_of_unit_test: `Test of reduce with ${nameOfFunction}`,
        tests: [
          {
            name_of_test: "1",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction],
              listOfLeavesToKeep: [],
            },
            output_expected: h.hOfEmptyList,
          },
          {
            name_of_test: "2",
            function_name: "reduce",
            input: {
              tree: h.data_1,
              listOfLeavesToKeep: [],
            },
            output_expected: h.data_1,
          },
          {
            name_of_test: "3",
            function_name: "reduce",
            input: {
              tree: h.data_1,
              listOfLeavesToKeep: [h.data_1],
            },
            output_expected: h.data_1,
          },
          {
            name_of_test: "4",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction, h.data_1],
              listOfLeavesToKeep: [h.data_1, h.data_2],
            },
            output_expected: [nameOfFunction, h.data_1],
          },
          {
            name_of_test: "5",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction, h.data_1],
              listOfLeavesToKeep: [],
            },
            output_expected: h.h_1,
          },
          {
            name_of_test: "6",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction, h.data_1, h.data_2],
              listOfLeavesToKeep: [h.data_1],
            },
            output_expected: [nameOfFunction, h.data_1, h.data_2],
          },
          {
            name_of_test: "7",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction, h.data_1, h.data_2],
              listOfLeavesToKeep: [h.data_2],
            },
            output_expected: [nameOfFunction, h.data_1, h.data_2],
          },
          {
            name_of_test: "8",
            function_name: "reduce",
            input: {
              tree: [nameOfFunction, h.data_1, h.data_2],
              listOfLeavesToKeep: [h.data_1, h.data_2],
            },
            output_expected: [nameOfFunction, h.data_1, h.data_2],
          },
          {
            name_of_test: "9",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [],
            },
            output_expected: h.h_1_2_3_4_5,
          },
          {
            name_of_test: "10",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_1],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, [nameOfFunction, h.data_1, h.data_2], h.h_3_4],
              h.data_5,
            ],
          },
          {
            name_of_test: "11",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_2],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, [nameOfFunction, h.data_1, h.data_2], h.h_3_4],
              h.data_5,
            ],
          },
          {
            name_of_test: "12",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_3],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, h.h_1_2, [nameOfFunction, h.data_3, h.data_4]],
              h.data_5,
            ],
          },
          {
            name_of_test: "13",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_4],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, h.h_1_2, [nameOfFunction, h.data_3, h.data_4]],
              h.data_5,
            ],
          },
          {
            name_of_test: "14",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_5],
            },
            output_expected: [nameOfFunction, h.h_1_2_3_4, h.data_5],
          },
          {
            name_of_test: "15",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_1, h.data_5],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, [nameOfFunction, h.data_1, h.data_2], h.h_3_4],
              h.data_5,
            ],
          },
          {
            name_of_test: "16",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [h.data_1, h.data_4, h.data_5],
            },
            output_expected: [
              nameOfFunction,
              [
                nameOfFunction,
                [nameOfFunction, h.data_1, h.data_2],
                [nameOfFunction, h.data_3, h.data_4],
              ],
              h.data_5,
            ],
          },
          {
            name_of_test: "17",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [
                h.data_1,
                h.data_2,
                h.data_3,
                h.data_4,
                h.data_5,
              ],
            },
            output_expected: [
              nameOfFunction,
              [
                nameOfFunction,
                [nameOfFunction, h.data_1, h.data_2],
                [nameOfFunction, h.data_3, h.data_4],
              ],
              h.data_5,
            ],
          },
          {
            name_of_test: "18",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
              listOfLeavesToKeep: [],
            },
            output_expected: h.h_1_2_3_4_5,
          },
          {
            name_of_test: "19",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
              ],
              listOfLeavesToKeep: [h.data_1],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, [nameOfFunction, h.data_1, h.data_2], h.h_3_4],
              [nameOfFunction, [nameOfFunction, h.data_1, h.data_2], h.h_3_4],
            ],
          },
          {
            name_of_test: "20",
            function_name: "reduce",
            input: {
              tree: [
                nameOfFunction,
                [nameOfFunction, h.data_1, h.data_2, h.data_3],
                [nameOfFunction, h.data_1, h.data_2],
                [nameOfFunction, h.data_2, h.data_3, h.data_4],
              ],
              listOfLeavesToKeep: [h.data_1],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, h.data_1, h.data_2, h.data_3],
              [nameOfFunction, h.data_1, h.data_2],
              fun([h.data_2, h.data_3, h.data_4]),
            ],
          },
        ],
      },
      {
        name_of_unit_test: `Test of getRoot with ${nameOfFunction}`,
        tests: [
          {
            name_of_test: "1",
            function_name: "getRoot",
            input: {
              tree: [nameOfFunction],
            },
            output_expected: h.hOfEmptyList,
          },
          {
            name_of_test: "2",
            function_name: "getRoot",
            input: {
              tree: h.data_1,
            },
            output_expected: h.data_1,
          },
          {
            name_of_test: "3",
            function_name: "getRoot",
            input: {
              tree: [nameOfFunction, h.data_1],
            },
            output_expected: h.h_1,
          },
          {
            name_of_test: "4",
            function_name: "getRoot",
            input: {
              tree: [nameOfFunction, [nameOfFunction, h.data_1]],
            },
            output_expected: h.hh_1,
          },
          {
            name_of_test: "5",
            function_name: "getRoot",
            input: {
              tree: [nameOfFunction, h.data_1, h.data_2],
            },
            output_expected: h.h_1_2,
          },
          {
            name_of_test: "6",
            function_name: "getRoot",
            input: {
              tree: [
                nameOfFunction,
                [
                  nameOfFunction,
                  [nameOfFunction, h.data_1, h.data_2],
                  [nameOfFunction, h.data_3, h.data_4],
                ],
                h.data_5,
              ],
            },
            output_expected: h.h_1_2_3_4_5,
          },
        ],
      },
      {
        name_of_unit_test: `Test of concat with ${nameOfFunction}`,
        tests: [
          {
            name_of_test: "1",
            function_name: "concat",
            input: {
              tree: [nameOfFunction],
              treeToAdd: h.data_1,
            },
            output_expected: [nameOfFunction],
          },
          {
            name_of_test: "2",
            function_name: "concat",
            input: {
              tree: [nameOfFunction, h.data_1],
              treeToAdd: h.data_1,
            },
            output_expected: [nameOfFunction, h.data_1],
          },
          {
            name_of_test: "3",
            function_name: "concat",
            input: {
              tree: h.h_1,
              treeToAdd: [nameOfFunction, h.data_1],
            },
            output_expected: [nameOfFunction, h.data_1],
          },
          {
            name_of_test: "4",
            function_name: "concat",
            input: {
              tree: h.h_1,
              treeToAdd: [nameOfFunction, h.data_2],
            },
            output_expected: h.h_1,
          },
          {
            name_of_test: "5",
            function_name: "concat",
            input: {
              tree: [
                nameOfFunction,
                h.h_1_2,
                [nameOfFunction, h.data_3, h.data_4],
              ],
              treeToAdd: [nameOfFunction, h.data_1, h.data_2],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, h.data_1, h.data_2],
              [nameOfFunction, h.data_3, h.data_4],
            ],
          },
          {
            name_of_test: "6",
            function_name: "concat",
            input: {
              tree: [
                nameOfFunction,
                h.h_1_2,
                [nameOfFunction, h.data_3, h.data_4],
              ],
              treeToAdd: h.h_1_2,
            },
            output_expected: [
              nameOfFunction,
              h.h_1_2,
              [nameOfFunction, h.data_3, h.data_4],
            ],
          },
          {
            name_of_test: "7",
            function_name: "concat",
            input: {
              tree: [nameOfFunction, h.h_1_2, h.h_1_2],
              treeToAdd: [nameOfFunction, h.data_1, h.data_2],
            },
            output_expected: [
              nameOfFunction,
              [nameOfFunction, h.data_1, h.data_2],
              [nameOfFunction, h.data_1, h.data_2],
            ],
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
  reduce: myTree.reduce,
  getRoot: myTree.getRoot,
  concat: myTree.concat,
};
jsonUnitTest.unitTest({
  dataToBeTested: createDataToBeTestedSecond(),
  functionsToBeTested: functionsToBeTested,
});

// getDataFromList
// getDataFromTree

const dataToBeTested_getDataFromList_getDataFromTree = [
  {
    name_of_unit_test: "Test of getDataFromList",
    tests: [
      {
        name_of_test: "1",
        function_name: "getDataFromList",
        input: {
          proof: coucou.coucou_proof_902051_transformed,
        },
        output_expected: coucou.coucou_proof_902051_transformed_data,
      },
      {
        name_of_test: "2",
        function_name: "getDataFromList",
        input: {
          proof: coucou.coucou_proof_902051_compressed,
        },
        output_expected: coucou.coucou_proof_902051_compressed_data,
      },
      {
        name_of_test: "3",
        function_name: "getDataFromList",
        input: {
          proof: coucou.coucou_proof_902056_transformed,
        },
        output_expected: coucou.coucou_proof_902056_transformed_data,
      },
      {
        name_of_test: "4",
        function_name: "getDataFromList",
        input: {
          proof: coucou.coucou_proof_902056_compressed,
        },
        output_expected: coucou.coucou_proof_902056_compressed_data,
      },
      {
        name_of_test: "5",
        function_name: "getDataFromList",
        input: {
          proof: stampmany.stampmany_one_proof_transformed,
        },
        output_expected: stampmany.stampmany_one_proof_transformed_data,
      },
      {
        name_of_test: "6",
        function_name: "getDataFromList",
        input: {
          proof: stampmany.stampmany_five_proof_transformed,
        },
        output_expected: stampmany.stampmany_five_proof_transformed_data,
      },
    ],
  },
  {
    name_of_unit_test: "Test of getDataFromTree",
    tests: [
      {
        name_of_test: "1",
        function_name: "getDataFromTree",
        input: {
          proof: coucou.coucou_proof_902051_transformed_tree,
        },
        output_expected: coucou.coucou_proof_902051_transformed_data,
      },
      {
        name_of_test: "2",
        function_name: "getDataFromTree",
        input: {
          proof: coucou.coucou_proof_902051_compressed_tree,
        },
        output_expected: coucou.coucou_proof_902051_compressed_data,
      },
      {
        name_of_test: "3",
        function_name: "getDataFromTree",
        input: {
          proof: coucou.coucou_proof_902056_transformed_tree,
        },
        output_expected: coucou.coucou_proof_902056_transformed_data,
      },
      {
        name_of_test: "4",
        function_name: "getDataFromTree",
        input: {
          proof: coucou.coucou_proof_902056_compressed_tree,
        },
        output_expected: coucou.coucou_proof_902056_compressed_data,
      },
      {
        name_of_test: "5",
        function_name: "getDataFromTree",
        input: {
          proof: stampmany.stampmany_one_proof_transformed_tree,
        },
        output_expected: stampmany.stampmany_one_proof_transformed_data,
      },
      {
        name_of_test: "6",
        function_name: "getDataFromTree",
        input: {
          proof: stampmany.stampmany_five_proof_transformed_tree,
        },
        output_expected: stampmany.stampmany_five_proof_transformed_data,
      },
    ],
  },
];

const anotherTree = poliex.treeFactory({
  sha256MerkletreeRoot: stringUtil.sha256MerkletreeRoot,
  push: stringUtil.push,
  append: stringUtil.append,
  prepend: stringUtil.prepend,
  sha256: stringUtil.sha256,
  toggleEndian: stringUtil.toggleEndian,
  set: stringUtil.set,
});

functionsToBeTested_getDataFromList_getDataFromTree = {
  getDataFromList: anotherTree.getDataFromList,
  getDataFromTree: anotherTree.getDataFromTree,
};

jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_getDataFromList_getDataFromTree,
  functionsToBeTested: functionsToBeTested_getDataFromList_getDataFromTree,
});

//

const dataToBeTested_withNumbers = [
  {
    name_of_unit_test: "Test with numbers",
    tests: [
      {
        name_of_test: "1",
        function_name: "reduce",
        input: {
          tree: ["+", 1, 2, ["+", 10, 20]],
          listOfLeavesToKeep: [],
        },
        output_expected: 33,
      },
      {
        name_of_test: "1",
        function_name: "reduce",
        input: {
          tree: ["+", 1, 2, ["*", 10, 20]],
          listOfLeavesToKeep: [],
        },
        output_expected: 203,
      },
    ],
  },
];

const treeForMath = poliex.treeFactory({
  "+": (list) => {
    function binaryPlus(total, num) {
      return total + num;
    }
    return list.reduce(binaryPlus, 0);
  },
  "*": (list) => {
    function binaryTime(total, num) {
      return total * num;
    }
    return list.reduce(binaryTime, 1);
  },
});

jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested_withNumbers,
  functionsToBeTested: {
    reduce: treeForMath.reduce,
  },
});
