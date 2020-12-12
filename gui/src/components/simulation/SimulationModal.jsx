import axios from 'axios';
import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { FAWithoutOutput, FAWithOutput } from '../../enums';
import { validateFAWithoutOutput, validateFAWithOutput } from './validations';

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

	validate(machineType, inputAlphabets, outputAlphabets) {
		let result;
		if (machineType === FAWithoutOutput.DFA || machineType === FAWithoutOutput.NFA)
			result = validateFAWithoutOutput(machineType, inputAlphabets, this.props.states);
		else if (machineType === FAWithOutput.MEALY || machineType === FAWithOutput.MOORE)
			result = validateFAWithOutput(machineType, inputAlphabets, outputAlphabets, this.props.states);
		this.setState({ ...result });
	}

	prepareTestCases() {
		document.querySelectorAll(`.result`).forEach((e) => (e.innerHTML = ''));
		let errors = [];
		if (this.state.testStrings.length === 0) {
			errors.push('Please enter at least one test string');
		}
		let machineData = this.state.machineData;
		machineData.test_strings = this.state.testStrings;
		let route = '';
		if (machineData.machine_type === FAWithOutput.MEALY) {
			route = 'mealy-diagram';
			// TODO: Revert once deployed
			machineData.machine_type = 0;
		} else if (machineData.machine_type === FAWithOutput.MOORE) {
			route = 'moore-diagram';
			// TODO: Revert once deployed
			machineData.machine_type = 1;
		} else route = 'diagram';
		if (errors.length === 0) {
			axios({
				method: 'POST',
				url: `https://fasim.herokuapp.com/${route}`,
				data: JSON.stringify(machineData),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((r) => {
					this.props.setSimulationData(r.data);
					this.close.click();
				})
				.catch((e) => e);
		}
		this.setState({ errors });
	}

	render() {
		let machineType = '';
		switch (this.props.machineType) {
			case FAWithoutOutput.DFA:
				machineType = 'DFA';
				break;
			case FAWithoutOutput.NFA:
				machineType = 'NFA';
				break;
			case FAWithOutput.MEALY:
				machineType = 'Mealy Machine';
				break;
			case FAWithOutput.MOORE:
				machineType = 'Moore Machine';
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
						<Button
							variant="success"
							onClick={() => {
								this.validate(
									this.props.machineType,
									this.props.inputSymbols,
									this.props.outputSymbols
								);
							}}
						>
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
