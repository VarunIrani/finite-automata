import React, { Component } from 'react';
import { Modal, Button, Row, Col, DropdownButton, Dropdown, Form, Container } from 'react-bootstrap';
import globals from '../../globals';
import { LineType } from './Transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class SettingsModal extends Component {
	constructor() {
		super();
		this.changeLineType = this.changeLineType.bind(this);
		this.changeValue = this.changeValue.bind(this);
		this.deleteTransition = this.deleteTransition.bind(this);
	}

	changeLineType(value, i) {
		if (value === LineType.CURVE) {
			globals.selectedState.transitions[i].lineType = LineType.CURVE;
		} else {
			globals.selectedState.transitions[i].lineType = LineType.LINE;
		}
		this.setState({});
	}

	changeValue(value, i) {
		if (value.length === 0) {
			globals.selectedState.transitions[i].value = 'ε';
		} else {
			globals.selectedState.transitions[i].value = value;
		}
	}

	deleteTransition(i) {
		let toBeRemoved = globals.selectedState.transitions.filter((e) => e.index === i);
		let index = globals.selectedState.transitions.indexOf(toBeRemoved[0]);
		globals.selectedState.transitions.splice(index, 1);
		globals.selectedState.fromTo.splice(index, 1);

		this.setState({});
	}

	render() {
		return (
			<Modal.Dialog style={{ zIndex: 9999 }}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Container fluid>
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
														<Form>
															<Form.Control
																defaultValue={t.value}
																placeholder="Value"
																aria-label="Value"
																aria-describedby="transition-value"
																onChange={(e) => {
																	this.changeValue(e.target.value, t.index);
																}}
															/>
														</Form>
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
																	this.deleteTransition(t.index);
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
															<DropdownButton variant="dark" id="line-type-dropdown" title={t.lineType}>
																<Dropdown.Item as="button">
																	<div
																		onClick={(e) => {
																			this.changeLineType(e.target.textContent, t.index);
																		}}
																	>
																		Curve
																	</div>
																</Dropdown.Item>
																<Dropdown.Item as="button">
																	<div
																		onClick={(e) => {
																			this.changeLineType(e.target.textContent, t.index);
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
																	this.deleteTransition(t.index);
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
							<Row>
								<p>No settings available. Please create transitions.</p>
							</Row>
						)}
					</Container>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={this.props.toggleSettings}>
						Close
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}
