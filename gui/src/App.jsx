import React from 'react';
import MenuBar from './components/nav/MenuBar';
import Sketch from './components/sketch/Sketch';
import { Container, Row, Col } from 'react-bootstrap';
import ToolBar from './components/tools/ToolBar';
import SimulationPlayer from './components/tools/SimulationPlayer';
import QRModal from './components/auth/QRModal';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			simulationData: null,
			loggedIn: false
		};
		this.handleQRClose = this.handleQRClose.bind(this);
	}

	handleQRClose() {
		this.setState({ loggedIn: !this.state.loggedIn });
	}

	render() {
		return (
			<React.Fragment>
				<QRModal show={!this.state.loggedIn} handleQRClose={this.handleQRClose} />
				<Sketch
					ref={(node) => {
						this.sketch = node;
					}}
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
					</Row>
				</Container>
				<Container fluid>
					<Row>
						<Col sm="3" style={{ zIndex: 999, position: 'absolute', top: 80, right: 20 }}>
							<SimulationPlayer
								simulationData={this.state.simulationData}
								setTestCase={(index) => {
									this.sketch.setTestCase({
										testString: this.state.simulationData.test_strings[index],
										testCaseNumber: index,
										testCase: this.state.simulationData.transitions[index][index]
									});
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
