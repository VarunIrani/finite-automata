import React, {Component} from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {MachineType, StateType} from "../../enums";

class SimulationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valid: false,
			testStrings: [],
			errors: []
		}
		this.changeTestStrings = this.changeTestStrings.bind(this)
	}

	changeTestStrings(value) {
		const noSpaceValue = value.replace(/ /g, '');
		this.setState({testStrings: noSpaceValue.split(',')})
	}

	validate(machineType, alphabets) {
		const states = this.props.states
		let errors = []
		if (machineType === MachineType.DFA) {
			if (states.length === 0) {
				errors.push("There aren't any states in your diagram.")
			} else {
				let initialStateCount = 0;
				let count = 0;
				states.forEach(s => {
					if (s.stateType === StateType.INITIAL)
						initialStateCount += 1;
					s.transitions.forEach(t => {
						let value = t.value;
						value = value.replace(/ /g, '');
						if (value.includes(',') && value.includes(alphabets))
							count += value.split(',').length
						else {
							if (value.includes(alphabets))
								count += 1;
						}
					})
				})
				console.log(count)
				if (count !== alphabets.length * states.length) {
					errors.push("Incomplete transitions or not enough transitions.");
				}
				if (initialStateCount === 0)
					errors.push("There is no initial state. Please add one initial state.")
				else if (initialStateCount > 1)
					errors.push("There can be only one initial state.")
			}
		}
		if (errors.length === 0)
			this.setState({errors, valid: true})
		else
			this.setState({errors, valid: false})

	}

	simulate(machineType, alphabets) {
		let errors = [];
		if (this.state.testStrings.length === 0) {
			errors.push("Please enter at least one test string");
		}
		this.setState({errors})
	}

	render() {
		let machineType = "";
		switch (this.props.machineType) {
			case MachineType.DFA:
				machineType = "DFA"
				break
			case MachineType.NFA:
				machineType = "NFA"
				break
			default:
				break
		}
		return (
			<Modal.Dialog style={{zIndex: 9999}} hidden={this.props.show}>
				<Modal.Header>
					<Container className='px-0'>
						<Row>
							<Col className="text-left">
								<Modal.Title>
									Simulate {machineType}
								</Modal.Title>
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
						<Row className='mb-2'>
							<Form.Control
								placeholder="Test Strings"
								aria-label="Test Strings"
								aria-describedby="test-strings"
								onChange={(e) => {
									this.changeTestStrings(e.target.value);
								}}
							/>
						</Row>
						{this.state.errors.length ? this.state.errors.map((error, index) => <Row key={index}>
							<p className='text-danger'>{error}</p>
						</Row>) : this.state.valid ? <Row><p className='text-success'>
							Wow! No errors in diagram!
						</p></Row> : null}
					</Container>
				</Modal.Body>
				<Modal.Footer>
					{this.state.valid ?
						<Button variant="success" onClick={() => this.simulate(this.props.machineType, ["0", "1"])}>
							Simulate
						</Button> :
						<Button variant="success" onClick={() => this.validate(this.props.machineType, ["0", "1"])}>
							Validate
						</Button>
					}
					<Button variant="danger" onClick={() => {
						this.setState({
							valid: false,
							errors: []
						})
						this.props.toggleSimulation(null)
					}}>
						Close
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}

export default SimulationModal;