import { StateType } from '../../enums';

export const showFAWithoutOutputTest = (testCaseData, sketch) => {
	sketch.setState({ currentIndex: -1 });

	const time = 1000;
	const initial = sketch.state.states.filter(
		(s) => s.stateType === StateType.INITIAL || s.stateType === StateType.INITIAL_FINAL
	)[0];
	const rest = sketch.state.states.filter(
		(s) => s.stateType !== StateType.INITIAL && s.stateType !== StateType.INITIAL_FINAL
	);
	rest.forEach((r) => {
		r.color = 255;
	});

	initial.color = '#ff6868';
	const states = sketch.state.states;
	const data = testCaseData.testCase;
	const testCaseNumber = testCaseData.testCaseNumber;
	const resultText = document.querySelector(`#result-${testCaseNumber}`);

	sketch.setState({ testString: [ ...testCaseData.testString ].reverse() });
	let d;

	if (data.transition.map((t) => t['N']).indexOf('N') === -1) d = data.transition.length;
	else d = data.transition.map((t) => t['N']).indexOf('N');

	let lastTransition = data.transition[d - 1];
	const lastState = states.filter((s) => {
		let lastStates = Object.values(lastTransition)[0];
		if (lastStates.includes(',')) {
			const transitions = lastStates.split(',');
			const lastStateName = transitions[transitions.length - 1];
			return s.name === lastStateName;
		} else {
			return s.name === lastStates;
		}
	})[0];

	if (data.transition.filter((t) => Object.keys(t)[0] === 'N').length < 1) data.transition.push({ N: 'N' });

	setTimeout(function() {
		data.transition.forEach((t, i) => {
			let state = [],
				rest;
			if (Object.values(t)[0].includes(',')) {
				const temp = Object.values(t)[0].split(',');
				temp.forEach((tr) => {
					state.push(states.filter((s) => s.name === tr)[0]);
				});
				rest = states.filter((s) => !temp.includes(s.name));
			} else {
				state = states.filter((s) => s.name === Object.values(t)[0]);
				rest = states.filter((s) => s.name !== Object.values(t)[0]);
			}
			if (Object.keys(t).includes('N')) {
				clearColors(states, i);
			} else {
				setColor(state, rest, i);
			}
		});
	}, time);

	const setColor = function(state, rest, i) {
		setTimeout(
			function() {
				sketch.setState({ currentIndex: i });
				state.forEach((s) => {
					if (s !== undefined) {
						if (s.stateType === StateType.FINAL || s.stateType === StateType.INITIAL_FINAL) {
							s.color = '#01d6a4';
						} else {
							s.color = '#ff6868';
						}
					}
				});
				rest.forEach((r) => {
					r.color = 255;
				});
			}.bind(sketch),
			time * i
		);
	}.bind(sketch);

	function clearColors(states, i) {
		setTimeout(function() {
			states.forEach((s) => {
				if (s !== undefined) s.color = 255;
			});
			if (lastState === undefined) {
				if (!resultText.classList.contains('text-danger')) resultText.classList.add('text-danger');
			} else {
				if (lastState.stateType === StateType.FINAL || lastState.stateType === StateType.INITIAL_FINAL) {
					if (!resultText.classList.contains('text-success')) resultText.classList.add('text-success');
				} else {
					if (!resultText.classList.contains('text-danger')) resultText.classList.add('text-danger');
				}
			}
			resultText.innerHTML = data.result;
		}, time * i);
	}
};

export const showFAWithOutputTest = (testCaseData, sketch) => {
	// TODO: Mealy and moore simulation
	sketch.setState({ currentIndex: -1 });
	const time = 1000;
	const initial = sketch.state.states.filter((s) => s.stateType === StateType.INITIAL)[0];
	const rest = sketch.state.states.filter((s) => s.stateType !== StateType.INITIAL);
	rest.forEach((r) => {
		r.color = 255;
	});

	initial.color = '#adaaff';

	const states = sketch.state.states;
	const data = testCaseData.testCase;
	const testCaseNumber = testCaseData.testCaseNumber;
	const resultText = document.querySelector(`#result-${testCaseNumber}`);
	const result = testCaseData.output;
	if (testCaseData.machineType === 'MEALY') resultText.innerHTML = '';
	else resultText.innerHTML = result.charAt(0);

	sketch.setState({ testString: [ ...testCaseData.testString ].reverse() });
	let d;

	if (data.map((t) => t['N']).indexOf('N') === -1) d = data.length;
	else d = data.map((t) => t['N']).indexOf('N');

	let lastTransition = data[d - 1];
	const lastState = states.filter((s) => {
		let lastStates = Object.values(lastTransition)[0];
		if (lastStates.includes(',')) {
			const transitions = lastStates.split(',');
			const lastStateName = transitions[transitions.length - 1];
			return s.name === lastStateName;
		} else {
			return s.name === lastStates;
		}
	})[0];

	if (data.filter((t) => Object.keys(t)[0] === 'N').length < 1) data.push({ N: 'N' });

	setTimeout(function() {
		data.forEach((t, i) => {
			let state = [],
				rest;
			if (Object.values(t)[0].includes(',')) {
				const temp = Object.values(t)[0].split(',');
				temp.forEach((tr) => {
					state.push(states.filter((s) => s.name === tr)[0]);
				});
				rest = states.filter((s) => !temp.includes(s.name));
			} else {
				state = states.filter((s) => {
					if (s.name.includes('/')) return s.name.split('/')[0] === Object.values(t)[0];
					else return s.name === Object.values(t)[0];
				});
				rest = states.filter((s) => {
					if (s.name.includes('/')) return s.name.split('/')[0] !== Object.values(t)[0];
					else return s.name !== Object.values(t)[0];
				});
			}
			if (Object.keys(t).includes('N')) {
				clearColors(states, i);
			} else {
				setColor(state, rest, i);
			}
		});
	}, time);

	const setColor = function(state, rest, i) {
		setTimeout(
			function() {
				sketch.setState({ currentIndex: i });
				resultText.innerHTML += result.charAt(i);
				state.forEach((s) => {
					if (s !== undefined) {
						s.color = '#adaaff';
					}
				});
				rest.forEach((r) => {
					r.color = 255;
				});
			}.bind(sketch),
			time * i
		);
	}.bind(sketch);

	function clearColors(states, i) {
		setTimeout(function() {
			states.forEach((s) => {
				if (s !== undefined) s.color = 255;
			});
		}, time * i);
	}
};
