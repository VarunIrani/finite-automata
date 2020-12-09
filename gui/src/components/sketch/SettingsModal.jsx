import React, { Component } from 'react';
import { Modal, Button, Row, Col, DropdownButton, Dropdown, Form, Container } from 'react-bootstrap';
import globals from '../../globals';
import { LineType, StateType } from '../../enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class SettingsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stateName: globals.selectedState.name
		};
		this.changeLineType = this.changeLineType.bind(this);
		this.changeStateType = this.changeStateType.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.changeStateName = this.changeStateName.bind(this);
		this.deleteTransition = this.deleteTransition.bind(this);
	}

	changeLineType(value, i) {
		globals.selectedState.transitions[i].lineType = value;
		this.setState({});
	}

	changeStateType(value) {
		globals.selectedState.stateType = value;
		this.setState({});
	}

	changeValue(value, i) {
		if (value.length === 0) {
			globals.selectedState.transitions[i].value = 'ε';
		} else {
			globals.selectedState.transitions[i].value = value.toString();
		}
	}

	deleteTransition(state, i) {
		let toBeRemoved = state.transitions.filter((e) => e.index === i);
		let index = state.transitions.indexOf(toBeRemoved[0]);
		state.transitions.splice(index, 1);
		this.setState({});
	}

	changeStateName(value) {
		if (value.length > 0 && value.length <= 3) {
			globals.selectedState.name = value;
			this.setState({});
		}
	}

	render() {
		let stateType = '';
		switch (globals.selectedState.stateType) {
			case StateType.NORMAL:
				stateType = 'Normal';
				break;
			case StateType.INITIAL:
				stateType = 'Initial';
				break;
			case StateType.FINAL:
				stateType = 'Final';
				break;
			case StateType.INITIAL_FINAL:
				stateType = 'Initial Final';
				break;
			default:
				break;
		}
		return (
			<Modal.Dialog style={{ zIndex: 9999 }}>
				<Modal.Header className="px-0">
					<Container>
						<Row>
							<Col className="text-left">
								<Modal.Title>
									{stateType} {this.props.title} {globals.selectedState.name}
								</Modal.Title>
							</Col>
							<Col className="text-right">
								<Button
									variant="danger"
									onClick={() => {
										this.props.deleteState(globals.selectedState.index);
									}}
								>
									Delete State
								</Button>
							</Col>
						</Row>
					</Container>
				</Modal.Header>

				<Modal.Body>
					<Container fluid>
						<Row>
							<h5 className="pb-2">General</h5>
						</Row>
						<Row>
							<Col lg="3" className="text-left my-auto px-0">
								<h6>State Name</h6>
							</Col>
							<Col lg="3" className="my-auto text-left">
								<Form.Control
									defaultValue={globals.selectedState.name}
									placeholder="State Name"
									aria-label="State Name"
									aria-describedby="state-name"
									onChange={(e) => {
										this.changeStateName(e.target.value);
									}}
								/>
							</Col>
							<Col lg="6" />
						</Row>
						<Row className="mt-3 mb-3">
							<Col lg="3" className="text-left my-auto px-0">
								<h6>State Type</h6>
							</Col>
							<Col lg="3" className="my-auto text-left">
								<DropdownButton variant="dark" id="state-type-dropdown" title={stateType}>
									<Dropdown.Item as="button">
										<div
											onClick={() => {
												this.changeStateType(StateType.INITIAL);
											}}
										>
											Initial
										</div>
									</Dropdown.Item>
									<Dropdown.Item as="button">
										<div
											onClick={() => {
												this.changeStateType(StateType.NORMAL);
											}}
										>
											Normal
										</div>
									</Dropdown.Item>
									<Dropdown.Item as="button">
										<div
											onClick={() => {
												this.changeStateType(StateType.FINAL);
											}}
										>
											Final
										</div>
									</Dropdown.Item>
									<Dropdown.Item as="button">
										<div
											onClick={() => {
												this.changeStateType(StateType.INITIAL_FINAL);
											}}
										>
											Initial Final
										</div>
									</Dropdown.Item>
								</DropdownButton>
							</Col>
							<Col lg="6" />
						</Row>
						{globals.selectedState.transitions.length ? (
							<div>
								<Row>
									<h5 className="pb-2">Transitions</h5>
								</Row>
								<Row>
									<Col className="text-left">
										<h6>Description</h6>
									</Col>
									<Col className="text-left">
										<h6>Value</h6>
									</Col>
									<Col className="text-left">
										<h6>Line Type</h6>
									</Col>
								</Row>
								{globals.selectedState.transitions.map((t) => {
									return (
										<Row className="mb-3" key={t.index}>
											<Col className="text-left my-auto">
												<h6 className="my-auto">{t.from.name + ' to ' + t.to.name}</h6>
											</Col>
											<Col className="text-left">
												<Row>
													<Col>
														<Form.Control
															defaultValue={t.value}
															placeholder="Value"
															aria-label="Value"
															aria-describedby="transition-value"
															onChange={(e) => {
																this.changeValue(e.target.value, t.index);
															}}
														/>
													</Col>
												</Row>
											</Col>
											{t.from.index === t.to.index ? (
												<Col className="text-left">
													<Row>
														<Col lg="6" />
														<Col lg="6" className="text-right">
															<Button
																variant="danger"
																onClick={() => {
																	this.deleteTransition(
																		globals.selectedState,
																		t.index
																	);
																}}
															>
																<FontAwesomeIcon icon={faTrash} />
															</Button>
														</Col>
													</Row>
												</Col>
											) : (
												<Col className="text-left">
													<Row>
														<Col lg="6">
															<DropdownButton
																variant="dark"
																id="line-type-dropdown"
																title={t.lineType}
															>
																<Dropdown.Item as="button">
																	<div
																		onClick={() => {
																			this.changeLineType(
																				LineType.CURVE,
																				t.index
																			);
																		}}
																	>
																		Curve
																	</div>
																</Dropdown.Item>
																<Dropdown.Item as="button">
																	<div
																		onClick={() => {
																			this.changeLineType(LineType.LINE, t.index);
																		}}
																	>
																		Line
																	</div>
																</Dropdown.Item>
															</DropdownButton>
														</Col>
														<Col lg="6" className="text-right">
															<Button
																variant="danger"
																onClick={() => {
																	this.deleteTransition(
																		globals.selectedState,
																		t.index
																	);
																}}
															>
																<FontAwesomeIcon icon={faTrash} />
															</Button>
														</Col>
													</Row>
												</Col>
											)}
										</Row>
									);
								})}
							</div>
						) : (
							<div>
								<Row>
									<h5 className="pb-2">Transitions</h5>
								</Row>
								<Row>
									<p>No settings available. Please create transitions.</p>
								</Row>
							</div>
						)}
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={this.props.toggleSettings}>
						Done
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}
