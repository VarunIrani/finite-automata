const MachineTypes = {
  DFA: 0,
  NFA: 1,
};

const Results = {
  REJECTED: false,
  ACCEPTED: true,
};

const StateType = {
  INITIAL: 0,
  TRANSITIONAL: 1,
  FINAL: 2,
  DEAD: 3,
};

// * DFA Body Example
const dfa_front_end_body = {
  machine_name: "Varun's DFA",
  machine_type: MachineTypes.DFA,
  alphabet_count: 2,
  alphabets: ["0", "1"],
  state_count: 3,
  test_strings: ["0010", "01", "000"],
  states: [{
    name: "A",
    type: StateType.INITIAL,
    transitions: [{ "0": "B" }, { "1": "C" }],
  }, {
    name: "B",
    type: StateType.TRANSITIONAL,
    transitions: [{ "0": "B" }, { "1": "C" }],
  }, {
    name: "C",
    type: StateType.FINAL,
    transitions: [{ "0": "C" }, { "1": "C" }],
  }],
};

// * DFA Result
const dfa_result = {
  machine_name: "Varun's DFA",
  machine_type: MachineTypes.DFA,
  alphabet_count: 2,
  alphabets: [0, 1],
  state_count: 3,
  test_strings: ["0010", "01", "000"],
  transitions: [
    { 0: { 0: "B", 0: "B", 1: "C", 0: "C" }, result: Results.ACCEPTED },
    { 1: { 0: "B", 1: "C" }, result: Results.ACCEPTED },
    { 2: { 0: "B", 0: "B", 0: "B" }, result: Results.REJECTED },
  ],
};

// * NFA Body Example
const nfa_front_end_body = {
  machine_name: "Varun's NFA",
  machine_type: MachineTypes.NFA,
  alphabet_count: 2,
  alphabets: [0, 1],
  state_count: 3,
  test_strings: ["0010", "01", "000"],
  states: [{
    name: "A",
    type: StateType.INITIAL,
    transitions: [{ 0: "B,C", 1: "$$" }],
  }, {
    name: "B",
    type: StateType.TRANSITIONAL,
    transitions: [{ 0: "B" }, { 1: "C" }],
  }, {
    name: "C",
    type: StateType.FINAL,
    transitions: [{ 0: "$$" }, { 1: "C" }],
  }],
};
