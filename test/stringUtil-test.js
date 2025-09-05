#!/usr/bin/env node

const { stringUtil } = require("../index.js");
const jsonUnitTest = require("json-unit-test");

// setFunction is not tested

const dataToBeTested = [
  {
    name_of_unit_test: "Test of toggleEndian",
    tests: [
      {
        name_of_test: 1,
        function_name: "toggleEndian",
        input: [],
        output_expected: "",
      },
      {
        name_of_test: 2,
        function_name: "toggleEndian",
        input: ["a5"],
        output_expected: "a5",
      },
      {
        name_of_test: 3,
        function_name: "toggleEndian",
        input: ["ab45cd"],
        output_expected: "cd45ab",
      },
      {
        name_of_test: 4,
        function_name: "toggleEndian",
        input: [
          "7616a0bd72a437cc0bfa56476583f1b40d8656d0e20dd113db5268e0ccb7b23f",
        ],
        output_expected:
          "3fb2b7cce06852db13d10de2d056860db4f183654756fa0bcc37a472bda01676",
      },
      {
        name_of_test: 5,
        function_name: "toggleEndian",
        input: ["abcdef", "34", "78"],
        output_expected: "7834efcdab",
      },
      {
        name_of_test: 6,
        function_name: "toggleEndian",
        input: ["abcdef", "14"],
        output_expected: "14efcdab",
      },
    ],
  },
  {
    name_of_unit_test: "Test of concatenationForLists",
    tests: [
      {
        name_of_test: 1,
        function_name: "concatenationForLists",
        input: [],
        output_expected: "",
      },
      {
        name_of_test: 2,
        function_name: "concatenationForLists",
        input: ["Bonjour"],
        output_expected: "Bonjour",
      },
      {
        name_of_test: 3,
        function_name: "concatenationForLists",
        input: ["Bonjour", " ", "monsieur", "."],
        output_expected: "Bonjour monsieur.",
      },
    ],
  },
  {
    name_of_unit_test: "Test of hash256UTF8HexForLists",
    tests: [
      {
        name_of_test: 1,
        function_name: "hash256UTF8HexForLists",
        input: [],
        output_expected:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
      {
        name_of_test: 2,
        function_name: "hash256UTF8HexForLists",
        input: ["Bonjour"],
        output_expected:
          "9172e8eec99f144f72eca9a568759580edadb2cfd154857f07e657569493bc44",
      },
      {
        name_of_test: 3,
        function_name: "hash256UTF8HexForLists",
        input: ["Bonjour", " ", "monsieur", "."],
        output_expected:
          "802a5e46377c26aaf03d8f5d9399ed1149be1c0693a33a1f2b89038d230e4976",
      },
      {
        name_of_test: 4,
        function_name: "hash256UTF8HexForLists",
        input: [
          "9172e8eec99f144f72eca9a568759580edadb2cfd154857f07e657569493bc44",
        ],
        output_expected:
          "11e9a949ab811e7357ec1a75e50d88f4445af2de3d482490b7d8d4f309f4cb48",
      },
      {
        name_of_test: 5,
        function_name: "hash256UTF8HexForLists",
        input: ["abcd1234"],
        output_expected:
          "e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae",
      },
      {
        name_of_test: 6,
        function_name: "hash256UTF8HexForLists",
        input: ["coucou"],
        output_expected:
          "110812f67fa1e1f0117f6f3d70241c1a42a7b07711a93c2477cc516d9042f9db",
      },
    ],
  },
  {
    name_of_unit_test: "Test of sha256",
    tests: [
      {
        name_of_test: 1,
        function_name: "sha256",
        input: [],
        output_expected:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
      {
        name_of_test: 2,
        function_name: "sha256",
        input: [
          "9172e8eec99f144f72eca9a568759580edadb2cfd154857f07e657569493bc44",
        ],
        output_expected:
          "a2bfa99e6720a40aa2a955bcc486a7e682981e6856a8e0858cf592e0c7983a48",
      },
      {
        name_of_test: 3,
        function_name: "sha256",
        input: [
          "9172e8eec99f144f72eca9a568759580edadb2cfd154857f07e657569493bc44",
          "a2bfa99e6720a40aa2a955bcc486a7e682981e6856a8e0858cf592e0c7983a48",
        ],
        output_expected:
          "4dd1c86d6ebd39c3a7a673048bb8265dcad8656a427b9a87d103af0bfe5e93ef",
      },
      {
        name_of_test: 1,
        function_name: "sha256",
        input: ["abcd1234"],
        output_expected:
          "777907d54b6a4502bd654cb4ae81c5f727013b5e3b93cd8b53d721344269d3b0",
      },
    ],
  },
  {
    name_of_unit_test: "Test of append",
    tests: [
      {
        name_of_test: 1,
        function_name: "append",
        input: ["ab", "cd"],
        output_expected: "cdab",
      },
    ],
  },
  {
    name_of_unit_test: "Test of prepend",
    tests: [
      {
        name_of_test: 1,
        function_name: "prepend",
        input: ["ab", "cd"],
        output_expected: "abcd",
      },
    ],
  },
  {
    name_of_unit_test: "Test of push",
    tests: [
      {
        name_of_test: 1,
        function_name: "push",
        input: ["ab"],
        output_expected: "ab",
      },
      {
        name_of_test: 2,
        function_name: "push",
        input: ["ab", "cd"],
        output_expected: "ab",
      },
    ],
  },
  {
    name_of_unit_test: "Test of sha256MerkletreeRoot",
    tests: [
      {
        name_of_test: 1,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
        ],
        output_expected:
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
      },
      {
        name_of_test: 2,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
          "3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33",
        ],
        output_expected:
          "077f65e3d65c948550c70a3bebd564963b212a6ffc634930265cac3d3d4af417",
      },
      {
        name_of_test: 3,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
          "3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33",
          "e50b65117490c8439388b1f3be9be6ea3b093dca756bc3d28ebd91f32d93e27e",
        ],
        output_expected:
          "17418b3cbad6407aabf70ec21069b3e40dc7f6e0dab7df9b6a98913e9813421e",
      },
      {
        name_of_test: 4,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
          "3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33",
          "e50b65117490c8439388b1f3be9be6ea3b093dca756bc3d28ebd91f32d93e27e",
          "3efb972a7a9976babea9dbfa3e9a4f621034343e0e023650ce90c562ae3e3f41",
        ],
        output_expected:
          "464de608507b663ec7132d024c89a518abcd64f5c0193939f18385240a9dd288",
      },
      {
        name_of_test: 5,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0",
          "3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33",
          "e50b65117490c8439388b1f3be9be6ea3b093dca756bc3d28ebd91f32d93e27e",
          "3efb972a7a9976babea9dbfa3e9a4f621034343e0e023650ce90c562ae3e3f41",
          "8dca45836930f76f4654f8a8bf08110265b336f5c456d746da30baf487ec17cf",
        ],
        output_expected:
          "5ff3f2eadade9cf78bd23732cd71a0cc151d82403f0bb8ecf5a5bba3363e8794",
      },
      {
        name_of_test: 6,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0 3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33",
          "e50b65117490c8439388b1f3be9be6ea3b093dca756bc3d28ebd91f32d93e27e",
          "3efb972a7a9976babea9dbfa3e9a4f621034343e0e023650ce90c562ae3e3f41",
          "8dca45836930f76f4654f8a8bf08110265b336f5c456d746da30baf487ec17cf",
        ],
        output_expected:
          "5ff3f2eadade9cf78bd23732cd71a0cc151d82403f0bb8ecf5a5bba3363e8794",
      },
      {
        name_of_test: 7,
        function_name: "sha256MerkletreeRoot",
        input: [
          "15a4cf30a3e508af938d15ca13b1a8d941c6b5f3d8835578b4439eb88089f9b0 3901c2bd0ce4fe6d9da66b9808e6b7a57ffcf947a3ae598f682e3235df361f33 e50b65117490c8439388b1f3be9be6ea3b093dca756bc3d28ebd91f32d93e27e 3efb972a7a9976babea9dbfa3e9a4f621034343e0e023650ce90c562ae3e3f41 8dca45836930f76f4654f8a8bf08110265b336f5c456d746da30baf487ec17cf",
        ],
        output_expected:
          "5ff3f2eadade9cf78bd23732cd71a0cc151d82403f0bb8ecf5a5bba3363e8794",
      },
    ],
  },
];

const functionsToBeTested = {
  toggleEndian: stringUtil.toggleEndian,
  concatenationForLists: stringUtil.concatenationForLists,
  hash256UTF8HexForLists: stringUtil.hash256UTF8HexForLists,
  sha256: stringUtil.sha256,
  append: stringUtil.append,
  prepend: stringUtil.prepend,
  push: stringUtil.push,
  sha256MerkletreeRoot: stringUtil.sha256MerkletreeRoot,
};
jsonUnitTest.unitTest({
  dataToBeTested: dataToBeTested,
  functionsToBeTested: functionsToBeTested,
});
