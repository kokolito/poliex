const crypto = require("crypto");

const merkletreePoliex = require("./merkletreePoliex");

function set(list) {
  const command = list[0];
  const param = list[1];

  let listOfCommand = command.split(" ");
  let valueToSave;
  if (listOfCommand[1] == "--value") {
    valueToSave = listOfCommand[2];
  } else if (listOfCommand[1] == "--transform") {
    valueToSave = this[listOfCommand[2]]([param]);
  } else {
    valueToSave = param;
  }
  this._privateFunctionToSaveValues({
    varName: listOfCommand[0],
    value: valueToSave,
  });

  return param;
}

function toggleEndian(list) {
  function toggleEndian_aux(str) {
    let stringToggled = "";
    for (let i = str.length - 2; i >= 0; i = i - 2) {
      stringToggled += str.slice(i, i + 2);
    }
    return stringToggled;
  }
  return toggleEndian_aux(concatenationForLists(list));
}

const concatenationForLists = (list) => {
  return list.join("");
};

const hash256UTF8HexForLists = (list) => {
  return crypto
    .createHash("sha256")
    .update(concatenationForLists(list))
    .digest("hex");
};

const sha256 = (list) => {
  return crypto
    .createHash("sha256")
    .update(concatenationForLists(list), "hex")
    .digest("hex");
};

const append = (list) => {
  return list[1] + list[0];
};

const prepend = (list) => {
  return list[0] + list[1];
};

const push = (list) => {
  return list[0];
};

const sha256MerkletreeRoot = (list) => {
  let fullList = [];
  for (elem of list) {
    fullList = fullList.concat(elem.split(" "));
  }
  const mt = merkletreePoliex._getMerkleTreeProofs({
    listOfLeaves: fullList,
    nameOfFunction: "sha256",
    implementation: "implementationWithLinkedTree",
    functionsForTreeFactory: { sha256: sha256 },
  });
  return mt.root;
};

module.exports = {
  set,
  toggleEndian,
  concatenationForLists,
  hash256UTF8HexForLists,
  sha256,
  append,
  prepend,
  push,
  sha256MerkletreeRoot,
};
