import { FAWithoutOutput, FAWithOutput, StateType } from '../../enums';

export const validateFAWithoutOutput = (machineType, alphabets, states) => {
	let errors = [];
	let machineData = {};
	machineData.machine_name = 'Test Machine';
	machineData.machine_type = machineType;
	machineData.alphabet_count = alphabets.length;
	machineData.alphabets = alphabets;
	machineData.state_count = states.length;
	machineData.states = [];
	if (states.length === 0) {
		errors.push("There aren't any states in your diagram.");
	}

	let initialStateCount = 0;
	let finalStateCount = 0;
	let count = 0;

	states.forEach((s) => {
		if (s.stateType === StateType.INITIAL) initialStateCount += 1;
		if (s.stateType === StateType.FINAL) finalStateCount += 1;
		if (s.stateType === StateType.INITIAL_FINAL) {
			initialStateCount += 1;
			finalStateCount += 1;
		}
		s.transitions.forEach((t) => {
			let value = t.value;
			value = value.replace(/ /g, '');
			if (value.includes(',') && alphabets.every((a) => value.includes(a))) {
				count += value.split(',').length;
			} else {
				if (alphabets.some((a) => value.includes(a))) count += 1;
			}
		});
	});

	if (finalStateCount === 0) errors.push('There are no final states. Please add at least one final state.');

	if (initialStateCount === 0) errors.push('There is no initial state. Please add one initial state.');
	else if (initialStateCount > 1) errors.push('There can be only one initial state.');

	if (machineType === FAWithoutOutput.DFA) {
		if (count !== alphabets.length * states.length)
			errors.push('Incomplete transitions or not enough transitions.');
		else {
			states.forEach((s) => {
				machineData.states.push({
					name: s.name,
					type: s.stateType,
					transitions: s.transitions.map((t) => {
						let tr = {};
						if (t.value.includes(',')) {
							let v = t.value.replace(/ /g, '').split(',');
							v.forEach((e) => {
								tr[e] = t.to.name;
							});
						} else {
							tr[t.value] = t.to.name;
						}
						return tr;
					})
				});
			});
		}
	} else if (machineType === FAWithoutOutput.NFA) {
		if (count === 0) errors.push('Incomplete transitions or not enough transitions.');
		else {
			const noTransitionStates = states.filter((s) => s.transitions.length === 0);
			const withTransitionStates = states.filter((s) => s.transitions.length !== 0);
			noTransitionStates.forEach((s) => {
				machineData.states.push({
					name: s.name,
					type: s.stateType,
					transitions: [ ...Array(1) ].map((e) => {
						let tr = {};
						alphabets.forEach((a) => {
							tr[a] = '$$';
						});
						return tr;
					})
				});
			});
			withTransitionStates.forEach((s) => {
				machineData.states.push({
					name: s.name,
					type: s.stateType,
					transitions: [ ...Array(1) ].map((e) => {
						let tr = {};
						alphabets.forEach((a) => {
							tr[a] = '$$';
						});
						s.transitions.forEach((t) => {
							if (t.value.includes(',')) {
								let v = t.value.replace(/ /g, '').split(',');
								v.forEach((e) => {
									if (tr[e] !== '$$') {
										tr[e] += ',' + t.to.name;
									} else {
										tr[e] = t.to.name;
									}
								});
							} else {
								if (tr[t.value] !== '$$') {
									tr[t.value] += ',' + t.to.name;
								} else {
									tr[t.value] = t.to.name;
								}
							}
						});
						return tr;
					})
				});
			});
		}
	}
	let valid = false;
	if (errors.length === 0) valid = true;
	return { errors, valid, machineData };
};

export const validateFAWithOutput = (machineType, inputAlphabets, outputAlphabets, states) => {
	let errors = [];
	let machineData = {};
	machineData.machine_name = 'Test Machine';
	machineData.machine_type = machineType;
	machineData.input_alpha_count = inputAlphabets.length;
	machineData.input_alpha = inputAlphabets;
	machineData.output_alpha_count = outputAlphabets.length;
	machineData.output_alpha = outputAlphabets;
	machineData.state_count = states.length;
	machineData.states = [];

	if (states.length === 0) {
		errors.push("There aren't any states in your diagram.");
	}

	let initialStateCount = 0;
	let finalStateCount = 0;
	let count = 0;

	states.forEach((s) => {
		if (s.stateType === StateType.INITIAL) initialStateCount += 1;
		if (s.stateType === StateType.FINAL) finalStateCount += 1;
		if (s.stateType === StateType.INITIAL_FINAL) {
			initialStateCount += 1;
			finalStateCount += 1;
		}
		if (machineType === FAWithOutput.MEALY) {
			s.transitions.forEach((t) => {
				let value = t.value;
				value = value.replace(/ /g, '');
				if (value.includes(',')) {
					value.split(',').forEach((t) => {
						if (t.split('/').length === 2) {
							if (
								inputAlphabets.some((a) => t.split('/')[0].includes(a)) &&
								outputAlphabets.some((a) => t.split('/')[1].includes(a))
							)
								count += 1;
						}
					});
				} else {
					if (value.split('/').length === 2) {
						if (
							inputAlphabets.some((a) => value.split('/')[0].includes(a)) &&
							outputAlphabets.some((a) => value.split('/')[1].includes(a))
						)
							count += 1;
					}
				}
			});
		} else {
			if (!outputAlphabets.some((a) => s.name.includes(a)))
				errors.push(`State ${s.name} does not have an output`);
			s.transitions.forEach((t) => {
				let value = t.value;
				value = value.replace(/ /g, '');
				if (value.includes(',') && inputAlphabets.every((a) => value.includes(a))) {
					count += value.split(',').length;
				} else {
					if (inputAlphabets.some((a) => value.includes(a))) count += 1;
				}
			});
		}
	});

	if (finalStateCount > 0) errors.push('There should not be any final states. Please remove any final states.');

	if (initialStateCount === 0) errors.push('There is no initial state. Please add one initial state.');
	else if (initialStateCount > 1) errors.push('There can be only one initial state.');

	if (count !== inputAlphabets.length * states.length)
		errors.push('Incomplete transitions or not enough transitions.');
	else {
		let trs;
		if (machineType === FAWithOutput.MEALY) {
			states.forEach((s) => {
				trs = [];
				machineData.states.push({
					name: s.name,
					// TODO: Revert once deployed
					type: s.stateType - 1,
					transitions: s.transitions.map((t) => {
						let tr = {};
						if (t.value.includes(',')) {
							let v = t.value.replace(/ /g, '').split(',');
							v.forEach((e) => {
								tr = {};
								tr['state'] = t.to.name;
								tr['input'] = e.split('/')[0];
								tr['output'] = e.split('/')[1];
								trs.push(tr);
							});
							// return trs
						} else {
							tr['state'] = t.to.name;
							tr['input'] = t.value.split('/')[0];
							tr['output'] = t.value.split('/')[1];
							trs.push(tr);
						}
						return trs;
					})[0]
				});
			});
		} else {
			states.forEach((s) => {
				trs = [];
				machineData.states.push({
					name: s.name.split('/')[0],
					output: s.name.split('/')[1],
					// TODO: revert once deployed
					type: s.stateType - 1,
					transitions: s.transitions.map((t) => {
						let tr = {};
						if (t.value.includes(',')) {
							let v = t.value.replace(/ /g, '').split(',');
							v.forEach((e) => {
								tr = {};
								tr['state'] = t.to.name.split('/')[0];
								tr['input'] = e;
								trs.push(tr);
							});
						} else {
							tr['state'] = t.to.name.split('/')[0];
							tr['input'] = t.value;
							trs.push(tr);
						}
						return trs;
					})[0]
				});
			});
		}
	}
	let valid = false;
	if (errors.length === 0) valid = true;
	return { errors, valid, machineData };
};
