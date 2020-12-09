const MachineTypes = {
	DFA: 0,
	NFA: 1,
	MEALY: 2,
	MOORE: 3
};

const Results = {
	REJECTED: false,
	ACCEPTED: true
};

const StateType = {
	INITIAL: 0,
	TRANSITIONAL: 1,
	FINAL: 2,
	DEAD: 3
};

// * DFA Body Example
const dfa_front_end_body = {
	machine_name: "Varun's DFA",
	machine_type: MachineTypes.DFA,
	alphabet_count: 2,
	alphabets: [ '0', '1' ],
	state_count: 3,
	test_strings: [ '0010', '01', '000' ],
	states: [
		{
			name: 'A',
			type: StateType.INITIAL,
			transitions: [ { '0': 'B' }, { '1': 'C' } ]
		},
		{
			name: 'B',
			type: StateType.TRANSITIONAL,
			transitions: [ { '0': 'B' }, { '1': 'C' } ]
		},
		{
			name: 'C',
			type: StateType.FINAL,
			transitions: [ { '0': 'C' }, { '1': 'C' } ]
		}
	]
};

// * DFA Result
const dfa_result = {
	machine_name: "Varun's DFA",
	machine_type: MachineTypes.DFA,
	alphabet_count: 2,
	alphabets: [ 0, 1 ],
	state_count: 3,
	test_strings: [ '0010', '01', '000' ],
	transitions: [
		{ 0: { 0: 'B', 0: 'B', 1: 'C', 0: 'C' }, result: Results.ACCEPTED },
		{ 1: { 0: 'B', 1: 'C' }, result: Results.ACCEPTED },
		{ 2: { 0: 'B', 0: 'B', 0: 'B' }, result: Results.REJECTED }
	]
};

// * NFA Body Example
const nfa_front_end_body = {
	machine_name: "Varun's NFA",
	machine_type: MachineTypes.NFA,
	alphabet_count: 2,
	alphabets: [ 0, 1 ],
	state_count: 3,
	test_strings: [ '0010', '01', '000' ],
	states: [
		{
			name: 'A',
			type: StateType.INITIAL,
			transitions: [ { 0: 'B,C', 1: '$$' } ]
		},
		{
			name: 'B',
			type: StateType.TRANSITIONAL,
			transitions: [ { 0: 'B' }, { 1: 'C' } ]
		},
		{
			name: 'C',
			type: StateType.FINAL,
			transitions: [ { 0: '$$' }, { 1: 'C' } ]
		}
	]
};

const nfa_result = {
	machine_name: "Varun's NFA",
	machine_type: 1,
	alphabet_count: 2,
	alphabets: [ 0, 1 ],
	state_count: 3,
	test_strings: [ '0010', '01', '000' ],
	transitions: [
		{ 0: { '0': 'B,C', '0': 'B', '1': 'C', '0': '$$' }, result: 'Rejected' },
		{ 1: { '0': 'B,C', '1': 'C' }, result: 'Accepted' },
		{ 2: { '0': 'B,C', '0': 'B', '0': 'B' }, result: 'Rejected' }
	]
};

// * Mealy Body Example
const mealy_body = {
	machine_name: "Varun's Mealy",
	machine_type: MachineTypes.MEALY,
	input_alpha_count: 2,
	input_alpha: [ 'a', 'b' ],
	output_alpha_count: 2,
	output_alpha: [ '0', '1' ],
	state_count: 3,
	test_strings: [ 'aababab', 'ababab', 'abababa' ],
	states: [
		{
			name: 'A',
			type: StateType.INITIAL,
			transitions: [
				{
					input: 'a',
					output: 0,
					state: 'B'
				},
				{
					input: 'b',
					output: 0,
					state: 'C'
				}
			]
		},
		{
			name: 'B',
			type: StateType.TRANSITIONAL,
			transitions: [
				{
					input: 'a',
					output: 1,
					state: 'B'
				},
				{
					input: 'b',
					output: 0,
					state: 'C'
				}
			]
		},
		{
			name: 'C',
			type: StateType.TRANSITIONAL,
			transitions: [
				{
					input: 'a',
					output: 0,
					state: 'B'
				},
				{
					input: 'b',
					output: 1,
					state: 'C'
				}
			]
		}
	]
};

// * MEALY RESULT & MOORE RESULT
const mealy_result = {
	machine_name: "Varun's Mealy",
	machine_type: MachineTypes.MEALY,
	input_alpha_count: 2,
	input_alpha: [ 'a', 'b' ],
	output_alpha_count: 2,
	output_alpha: [ '0', '1' ],
	state_count: 3,
	test_strings: [ 'aababab', 'ababab', 'abababa' ],
	transitions: [
		{ 0: { 0: 'B', 0: 'B', 1: 'C', 0: 'C' }, result: 'output_string' },
		{ 1: { 0: 'B', 1: 'C' }, result: 'output_string' },
		{ 2: { 0: 'B', 0: 'B', 0: 'B' }, result: 'output_string' }
	]
};

// * Moore Body Example
const moore_body = {
	machine_name: "Varun's Moore",
	machine_type: MachineTypes.MOORE,
	input_alpha_count: 2,
	input_alpha: [ 'a', 'b' ],
	output_alpha_count: 2,
	output_alpha: [ '0', '1' ],
	state_count: 3,
	test_strings: [ 'aababab', 'ababab', 'abababa' ],
	states: [
		{
			name: 'A',
			output: 0,
			type: StateType.INITIAL,
			transitions: [
				{
					input: 'a',
					state: 'B'
				},
				{
					input: 'b',
					state: 'C'
				}
			]
		},
		{
			name: 'B',
			output: 1,
			type: StateType.TRANSITIONAL,
			transitions: [
				{
					input: 'a',
					state: 'B'
				},
				{
					input: 'b',
					state: 'C'
				}
			]
		},
		{
			name: 'C',
			output: 0,
			type: StateType.TRANSITIONAL,
			transitions: [
				{
					input: 'a',
					state: 'B'
				},
				{
					input: 'b',
					state: 'C'
				}
			]
		}
	]
};
