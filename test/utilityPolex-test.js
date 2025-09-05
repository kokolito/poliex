#!/usr/bin/env node

const poliex = require("../index.js");
const jsonUnitTest = require("json-unit-test");
const { coucou, stampmany } = require("poliex-data-for-testing");

// const input = stampmany.stampmany_five_proof_transformed;
// const output = poliex.createTree(input);
// console.log(JSON.stringify(output, null, 2));

const dataToBeTested = [
  {
    name_of_unit_test: "Test of deepCopy",
    tests: [
      {
        name_of_test: "1",
        function_name: "deepCopy",
        input: {
          tree: "data_1",
        },
        output_expected: "data_1",
      },
      {
        name_of_test: "2",
        function_name: "deepCopy",
        input: {
          tree: ["function_1", "data_1"],
        },
        output_expected: ["function_1", "data_1"],
      },
      {
        name_of_test: "3",
        function_name: "deepCopy",
        input: {
          tree: ["function_1", "data_1", "data_2"],
        },
        output_expected: ["function_1", "data_1", "data_2"],
      },
      {
        name_of_test: "4",
        function_name: "deepCopy",
        input: {
          tree: [
            "function_1",
            ["function_2", "data_1", "data_2"],
            ["function_3", "data_3", "data_4"],
          ],
        },
        output_expected: [
          "function_1",
          ["function_2", "data_1", "data_2"],
          ["function_3", "data_3", "data_4"],
        ],
      },
      {
        name_of_test: "5",
        function_name: "deepCopy",
        input: {
          tree: [
            "function_1",
            [
              "function_2",
              "data_1",
              "data_2",
              ["function_2", "data_1", "data_2"],
            ],
            [
              "function_3",
              "data_3",
              "data_4",
              ["function_2", "data_1", "data_2"],
            ],
            "data_5",
          ],
        },
        output_expected: [
          "function_1",
          [
            "function_2",
            "data_1",
            "data_2",
            ["function_2", "data_1", "data_2"],
          ],
          [
            "function_3",
            "data_3",
            "data_4",
            ["function_2", "data_1", "data_2"],
          ],
          "data_5",
        ],
      },
    ],
  },
  {
    name_of_unit_test: "Test of isLeaf",
    tests: [
      {
        name_of_test: "1",
        function_name: "isLeaf",
        input: {
          leaf: "data_1",
          tree: "data_1",
        },
        output_expected: true,
      },
      {
        name_of_test: "2",
        function_name: "isLeaf",
        input: {
          leaf: "data_2",
          tree: "data_1",
        },
        output_expected: false,
      },
      {
        name_of_test: "3",
        function_name: "isLeaf",
        input: {
          leaf: "data_1",
          tree: ["function_1"],
        },
        output_expected: false,
      },
      {
        name_of_test: "4",
        function_name: "isLeaf",
        input: {
          leaf: "function_1",
          tree: ["function_1"],
        },
        output_expected: false,
      },
      {
        name_of_test: "5",
        function_name: "isLeaf",
        input: {
          leaf: "function_1",
          tree: ["function_1", "data_1"],
        },
        output_expected: false,
      },
      {
        name_of_test: "6",
        function_name: "isLeaf",
        input: {
          leaf: "data_1",
          tree: ["function_1", "data_1"],
        },
        output_expected: true,
      },
      {
        name_of_test: "7",
        function_name: "isLeaf",
        input: {
          leaf: "data_2",
          tree: ["function_1", "data_1"],
        },
        output_expected: false,
      },
      {
        name_of_test: "8",
        function_name: "isLeaf",
        input: {
          leaf: "function_2",
          tree: [
            "function_1",
            ["function_2", ["function_3", "data_1", "data_2"], "data_3"],
            "data_4",
          ],
        },
        output_expected: false,
      },
      {
        name_of_test: "9",
        function_name: "isLeaf",
        input: {
          leaf: "data_1",
          tree: [
            "function_1",
            ["function_2", ["function_3", "data_1", "data_2"], "data_3"],
            "data_4",
          ],
        },
        output_expected: true,
      },
      {
        name_of_test: "10",
        function_name: "isLeaf",
        input: {
          leaf: "data_4",
          tree: [
            "function_1",
            ["function_2", ["function_3", "data_1", "data_2"], "data_3"],
            "data_4",
          ],
        },
        output_expected: true,
      },
      {
        name_of_test: "11",
        function_name: "isLeaf",
        input: {
          leaf: "data_5",
          tree: [
            "function_1",
            ["function_2", ["function_3", "data_1", "data_2"], "data_3"],
            "data_4",
          ],
        },
        output_expected: false,
      },
    ],
  },
  {
    name_of_unit_test: "Test of createTree",
    tests: [
      {
        name_of_test: "1",
        function_name: "createTree",
        input: coucou.coucou_proof_902051_transformed,
        output_expected: coucou.coucou_proof_902051_transformed_tree,
      },
      {
        name_of_test: "2",
        function_name: "createTree",
        input: coucou.coucou_proof_902051_compressed,
        output_expected: coucou.coucou_proof_902051_compressed_tree,
      },
      {
        name_of_test: "3",
        function_name: "createTree",
        input: coucou.coucou_proof_902056_transformed,
        output_expected: coucou.coucou_proof_902056_transformed_tree,
      },
      {
        name_of_test: "4",
        function_name: "createTree",
        input: coucou.coucou_proof_902056_compressed,
        output_expected: coucou.coucou_proof_902056_compressed_tree,
      },
      {
        name_of_test: "5",
        function_name: "createTree",
        input: stampmany.stampmany_one_proof_transformed,
        output_expected: stampmany.stampmany_one_proof_transformed_tree,
      },
      {
        name_of_test: "6",
        function_name: "createTree",
        input: stampmany.stampmany_five_proof_transformed,
        output_expected: stampmany.stampmany_five_proof_transformed_tree,
      },
    ],
  },
  {
    name_of_unit_test: "Test of flattenTree",
    tests: [
      {
        name_of_test: "1",
        function_name: "flattenTree",
        input: coucou.coucou_proof_902051_transformed_tree,
        output_expected: coucou.coucou_proof_902051_transformed,
      },
      {
        name_of_test: "2",
        function_name: "flattenTree",
        input: coucou.coucou_proof_902051_compressed_tree,
        output_expected: coucou.coucou_proof_902051_compressed,
      },
      {
        name_of_test: "3",
        function_name: "flattenTree",
        input: coucou.coucou_proof_902056_transformed_tree,
        output_expected: coucou.coucou_proof_902056_transformed,
      },
      {
        name_of_test: "4",
        function_name: "flattenTree",
        input: coucou.coucou_proof_902056_compressed_tree,
        output_expected: coucou.coucou_proof_902056_compressed,
      },
      {
        name_of_test: "5",
        function_name: "flattenTree",
        input: stampmany.stampmany_one_proof_transformed_tree,
        output_expected: stampmany.stampmany_one_proof_transformed,
      },
      {
        name_of_test: "6",
        function_name: "flattenTree",
        input: stampmany.stampmany_five_proof_transformed_tree,
        output_expected: stampmany.stampmany_five_proof_transformed,
      },
    ],
  },
];

const functionsToBeTested = {
  deepCopy: poliex.deepCopy,
  isLeaf: poliex.isLeaf,
  createTree: poliex.createTree,
  flattenTree: poliex.flattenTree,
};
jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested,
  functionsToBeTested: functionsToBeTested,
});
