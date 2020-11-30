import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { MachineType, StateType } from '../../enums';
import axios from 'axios';

class SimulationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valid: false,
			testStrings: [],
			errors: [],
			machineData: null
		};

		this.changeTestStrings = this.changeTestStrings.bind(this);
	}

	changeTestStrings(value) {
		const noSpaceValue = value.replace(/ /g, '');
		this.setState({ testStrings: noSpaceValue.split(',') });
	}

	validate(machineType, alphabets) {
		const states = this.props.states;
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

		if (machineType === MachineType.DFA) {
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
		} else if (machineType === MachineType.NFA) {
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

		if (errors.length === 0) this.setState({ errors, valid: true, machineData });
		else this.setState({ errors, valid: false });
	}

	prepareTestCases() {
		let errors = [];
		if (this.state.testStrings.length === 0) {
			errors.push('Please enter at least one test string');
		}
		let machineData = this.state.machineData;
		machineData.test_strings = this.state.testStrings;
		if (errors.length === 0) {
			axios({
				method: 'POST',
				url: 'https://fasim.herokuapp.com/diagram',
				data: JSON.stringify(machineData),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((r) => {
					this.props.setSimulationData(r.data);
					this.close.click();
				})
				.catch((e) => console.log(e));
		}
		this.setState({ errors });
	}

	render() {
		let machineType = '';
		switch (this.props.machineType) {
			case MachineType.DFA:
				machineType = 'DFA';
				break;
			case MachineType.NFA:
				machineType = 'NFA';
				break;
			default:
				break;
		}
		return (
			<Modal.Dialog style={{ zIndex: 9999 }} hidden={this.props.show}>
				<Modal.Header>
					<Container className="px-0">
						<Row>
							<Col className="text-left">
								<Modal.Title>Simulate {machineType}</Modal.Title>
							</Col>
						</Row>
					</Container>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row>
							<h5 className="pb-2">Test Strings</h5>
						</Row>
						<Row>
							<p>Please enter comma separated test strings</p>
						</Row>
						<Row className="mb-2">
							<Form.Control
								disabled={!this.state.valid}
								placeholder="Test Strings"
								aria-label="Test Strings"
								aria-describedby="test-strings"
								onChange={(e) => {
									this.changeTestStrings(e.target.value);
								}}
							/>
						</Row>
						{this.state.errors.length ? (
							this.state.errors.map((error, index) => (
								<Row key={index}>
									<p className="text-danger">{error}</p>
								</Row>
							))
						) : this.state.valid ? (
							<Row>
								<p className="text-success">Wow! No errors in diagram!</p>
							</Row>
						) : null}
					</Container>
				</Modal.Body>
				<Modal.Footer>
					{this.state.valid ? (
						<Button variant="success" onClick={() => this.prepareTestCases()}>
							Prepare Test Cases
						</Button>
					) : (
						<Button variant="success" onClick={() => this.validate(this.props.machineType, [ '0', '1' ])}>
							Validate
						</Button>
					)}
					<Button
						variant="danger"
						ref={(node) => {
							this.close = node;
						}}
						onClick={() => {
							this.setState({
								valid: false,
								errors: []
							});
							this.props.toggleSimulation(null);
						}}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}

export default SimulationModal;
