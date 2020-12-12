import React from 'react';
import MenuBar from './components/nav/MenuBar';
import Sketch from './components/sketch/Sketch';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ToolBar from './components/tools/ToolBar';
import SimulationPlayer from './components/tools/SimulationPlayer';
import QRModal from './components/auth/QRModal';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			simulationData: null,
			loggedIn: JSON.parse(localStorage.getItem('user')) !== null,
			user: JSON.parse(localStorage.getItem('user')),
			inputSymbols: [ '0', '1' ],
			outputSymbols: [ '0', '1' ]
		};
		this.handleQRClose = this.handleQRClose.bind(this);
		this.changeInputSymbols = this.changeInputSymbols.bind(this);
		this.changeOutputSymbols = this.changeOutputSymbols.bind(this);
		this.setUser = this.setUser.bind(this);
	}

	handleQRClose() {
		this.setState({ loggedIn: !this.state.loggedIn });
	}

	setUser(user) {
		this.setState({ user });
		localStorage.setItem('user', JSON.stringify(user));
	}

	changeInputSymbols() {
		if (this.inputText.value.length > 0) {
			this.setState({ inputSymbols: this.inputText.value.replace(/ /g, '').split('').filter((e) => e !== ',') });
		} else {
			this.setState({ inputSymbols: [ '0', '1' ] });
		}
	}

	changeOutputSymbols() {
		if (this.outputText.value.length > 0) {
			this.setState({
				outputSymbols: this.outputText.value.replace(/ /g, '').split('').filter((e) => e !== ',')
			});
		} else {
			this.setState({ outputSymbols: [ '0', '1' ] });
		}
	}

	render() {
		return (
			<React.Fragment>
				<QRModal
					show={!this.state.loggedIn}
					handleQRClose={this.handleQRClose}
					setUser={(user) => this.setUser(user)}
				/>
				<Sketch
					ref={(node) => {
						this.sketch = node;
					}}
					inputSymbols={this.state.inputSymbols}
					outputSymbols={this.state.outputSymbols}
					setSimulationData={(simulationData) => {
						this.setState({ simulationData });
					}}
				/>
				<Container fluid style={{ padding: 0 }}>
					<Row>
						<Col>
							<MenuBar
								newSketch={() => {
									this.sketch.newSketch();
								}}
								toggleSimulation={(machineType) => {
									this.sketch.toggleSimulation(machineType);
								}}
								user={this.state.user}
								logout={() => {
									localStorage.setItem('user', JSON.stringify(null));
									window.location.reload();
								}}
							/>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row>
						<Col sm="1" style={{ zIndex: 999, position: 'absolute', top: 80 }}>
							<ToolBar
								addState={(stateType) => {
									this.sketch.addState(stateType);
								}}
							/>
						</Col>
						<Col sm="2" style={{ zIndex: 999, position: 'absolute', top: 80, left: 120 }}>
							<Row>
								<Form.Label>Input Alphabet</Form.Label>
								<Form.Control
									defaultValue="0, 1"
									ref={(n) => (this.inputText = n)}
									aria-label="Input Alphabet"
									aria-describedby="input-alphabet"
									placeholder="Input Alphabet"
									// value={this.state.outputSymbols.join(',')}
									onChange={this.changeInputSymbols}
								/>
							</Row>
							<Row className="mt-2">
								<Form.Label>Output Alphabet</Form.Label>
								<Form.Control
									defaultValue="0, 1"
									ref={(n) => (this.outputText = n)}
									aria-label="Output Alphabet"
									aria-describedby="output-alphabet"
									placeholder="Output Alphabet"
									// value={this.state.outputSymbols.join(',')}
									onChange={this.changeOutputSymbols}
								/>
							</Row>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row>
						<Col sm="3" style={{ zIndex: 999, position: 'absolute', top: 80, right: 20 }}>
							<SimulationPlayer
								simulationData={this.state.simulationData}
								setTestCase={(index) => {
									// TODO: Why is this a string??!!!
									const machineType = this.state.simulationData.machine_type;
									if (machineType === 'MEALY' || machineType === 'MOORE') {
										this.sketch.showFAWithOutputTest({
											testString: this.state.simulationData.test_strings[index],
											testCaseNumber: index,
											testCase: this.state.simulationData.transitions[index].transition,
											output: this.state.simulationData.transitions[index].result,
											machineType
										});
									} else {
										this.sketch.showFAWithoutOutputTest({
											testString: this.state.simulationData.test_strings[index],
											testCaseNumber: index,
											testCase: this.state.simulationData.transitions[index][index]
										});
									}
								}}
							/>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}

export default App;
