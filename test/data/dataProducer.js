const getHashes = (fun) => {
  let hashes = {
    data_1: "0c01",
    data_2: "0c02",
    data_3: "0c03",
    data_4: "0c04",
    data_5: "0c05",
    data_6: "0c06",
    data_7: "0c07",
    data_8: "0c08",
    data_9: "0c09",
    data_10: "0c10",
    data_11: "0c11",
    data_12: "0c12",
    data_13: "0c13",
    data_14: "0c14",
    data_15: "0c15",
    data_16: "0c16",
    hOfEmptyList: fun([]),
  };
  hashes["h_1"] = fun([hashes.data_1]);
  hashes["hh_1"] = fun([[hashes.h_1]]);
  hashes["h_2"] = fun([hashes.data_2]);
  hashes["h_3"] = fun([hashes.data_3]);
  hashes["h_4"] = fun([hashes.data_4]);
  hashes["h_5"] = fun([hashes.data_5]);
  hashes["h_6"] = fun([hashes.data_6]);
  hashes["h_7"] = fun([hashes.data_7]);
  hashes["h_8"] = fun([hashes.data_8]);
  hashes["h_9"] = fun([hashes.data_9]);
  hashes["h_10"] = fun([hashes.data_10]);
  hashes["h_11"] = fun([hashes.data_11]);
  hashes["h_12"] = fun([hashes.data_12]);
  hashes["h_13"] = fun([hashes.data_13]);
  hashes["h_14"] = fun([hashes.data_14]);
  hashes["h_16"] = fun([hashes.data_16]);
  hashes["h_1_2"] = fun([hashes.data_1, hashes.data_2]);
  hashes["h_3_4"] = fun([hashes.data_3, hashes.data_4]);
  hashes["h_5_6"] = fun([hashes.data_5, hashes.data_6]);
  hashes["h_7_8"] = fun([hashes.data_7, hashes.data_8]);
  hashes["h_9_10"] = fun([hashes.data_9, hashes.data_10]);
  hashes["h_11_12"] = fun([hashes.data_11, hashes.data_12]);
  hashes["h_13_14"] = fun([hashes.data_13, hashes.data_14]);
  hashes["h_15_16"] = fun([hashes.data_15, hashes.data_16]);
  hashes["h_1_2_3_4"] = fun([hashes.h_1_2, hashes.h_3_4]);
  hashes["h_5_6_7_8"] = fun([hashes.h_5_6, hashes.h_7_8]);
  hashes["h_9_10_11_12"] = fun([hashes.h_9_10, hashes.h_11_12]);
  hashes["h_13_14_15_16"] = fun([hashes.h_13_14, hashes.h_15_16]);
  hashes["h_1_2_3_4_5_6_7_8"] = fun([hashes.h_1_2_3_4, hashes.h_5_6_7_8]);
  hashes["h_9_10_11_12_13_14_15_16"] = fun([
    hashes.h_9_10_11_12,
    hashes.h_13_14_15_16,
  ]);
  hashes["h_1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16"] = fun([
    hashes.h_1_2_3_4_5_6_7_8,
    hashes.h_9_10_11_12_13_14_15_16,
  ]);
  hashes["h_1_2_3_4_5"] = fun([hashes.h_1_2_3_4, hashes.data_5]);
  return hashes;
};

module.exports = {
  getHashes,
};
