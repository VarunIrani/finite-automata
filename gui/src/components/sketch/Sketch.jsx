import p5 from 'p5';
import React from 'react';
import { Container } from 'react-bootstrap';
import globals from '../../globals';
import SimulationModal from '../simulation/SimulationModal';
import SettingsModal from './SettingsModal';
import State from './State';
import { showFAWithoutOutputTest, showFAWithOutputTest } from '../simulation/simulations';

const LETTERS = (() => {
	const caps = [ ...Array(26) ].map((val, i) => String.fromCharCode(i + 65));
	return caps.concat(caps.map((letter) => letter.toLowerCase()));
})();

class Sketch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			states: [],
			numStates: 0,
			p5: null,
			showSettingsModal: false,
			deletedCount: 0,
			hideSimulation: true,
			machineType: null,
			testString: [],
			currentIndex: -1
		};
		this.newSketch = this.newSketch.bind(this);
		this.addState = this.addState.bind(this);
		this.setup = this.setup.bind(this);
		this.draw = this.draw.bind(this);
		this.mousePressed = this.mousePressed.bind(this);
		this.mouseReleased = this.mouseReleased.bind(this);
		this.doubleClicked = this.doubleClicked.bind(this);
		this.toggleSettings = this.toggleSettings.bind(this);
		this.toggleSimulation = this.toggleSimulation.bind(this);
		this.setSimulationData = this.setSimulationData.bind(this);
		this.deleteState = this.deleteState.bind(this);
		this.setTestCase = this.showFAWithoutOutputTest.bind(this);
	}

	newSketch() {
		this.setState({ states: [], numStates: 0 });
	}

	addState(stateType) {
		let states = this.state.states;
		const p5 = this.state.p5;
		let newState = new State(
			p5,
			p5.width / 2,
			p5.height / 2,
			50,
			LETTERS[this.state.numStates],
			this.state.numStates - this.state.deletedCount,
			stateType,
			255
		);
		states.push(newState);
		this.setState({ numStates: this.state.numStates + 1, states });
	}

	componentDidMount() {
		new p5(this.sketch);
	}

	setup = (p5) => {
		const c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
		c.parent('sketch-holder');
		c.position(0, 0);
		p5.angleMode(p5.DEGREES);
		this.setState({ p5 });
	};

	draw = (p5) => {
		p5.background(255);
		p5.push();
		const t = 32;
		p5.textSize(t);
		if (this.state.currentIndex === -1) p5.fill('#000');
		// this.setState({ testString: this.state.testString.reverse() });
		for (let i = this.state.testString.length - 1; i >= 0; i--) {
			let char = this.state.testString[i];
			if (this.state.currentIndex !== -1) {
				if (i === this.state.testString.length - this.state.currentIndex - 1) p5.fill('#3575ff');
				else p5.fill('#000');
			}
			p5.text(char, p5.width / 1.4 - i * 20, 100);
		}
		p5.pop();
		this.state.states.forEach((state) => {
			state.setP5(p5);
			state.connect();
			state.over();
			state.update();
			state.show();
		});
	};

	mousePressed = () => {
		this.state.states.forEach((state) => {
			state.pressed(this.state.states);
		});
	};

	mouseReleased = () => {
		this.state.states.forEach((state) => {
			state.released();
		});
		this.setState({ showSettingsModal: globals.showSettings });
	};

	doubleClicked = () => {
		this.state.states.forEach((state) => {
			state.doubleClicked();
		});
	};

	windowResized = (p5) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
	};

	sketch = (p5) => {
		p5.setup = () => this.setup(p5);
		p5.draw = () => this.draw(p5);
		p5.windowResized = () => this.windowResized(p5);
		p5.mousePressed = () => this.mousePressed();
		p5.mouseReleased = () => this.mouseReleased();
		p5.doubleClicked = () => this.doubleClicked();
	};

	toggleSettings() {
		this.setState({ showSettingsModal: !this.state.showSettingsModal });
		globals.showSettings = false;
	}

	deleteState(i) {
		let tempStates = this.state.states;
		let toBeRemoved = tempStates.filter((e) => e.index === i)[0];
		let otherStates = tempStates.filter((e) => e.index !== i);
		otherStates.forEach((other) => {
			for (let i = 0; i < other.transitions.length; i++) {
				if (other.transitions[i].to.index === toBeRemoved.index) {
					other.transitions.splice(i, 1);
					break;
				}
			}
		});
		for (let i = toBeRemoved.index; i < otherStates.length; i++) {
			otherStates[i].index -= 1;
		}
		this.setState({
			states: otherStates,
			showSettingsModal: !this.state.showSettingsModal,
			deletedCount: this.state.deletedCount + 1
		});
		globals.showSettings = false;
	}

	toggleSimulation(machineType) {
		this.setState({ hideSimulation: !this.state.hideSimulation, machineType });
		globals.showSimulation = this.state.hideSimulation;
	}

	setSimulationData(data) {
		this.props.setSimulationData(data);
	}

	showFAWithoutOutputTest(testCaseData) {
		showFAWithoutOutputTest(testCaseData, this);
	}

	showFAWithOutputTest(testCaseData) {
		showFAWithOutputTest(testCaseData, this);
	}

	render() {
		let modalTitle = '';
		if (this.state.showSettingsModal) {
			modalTitle = ' State ';
		}
		return (
			<div>
				<Container id="sketch-holder" />
				{this.state.showSettingsModal ? (
					<SettingsModal
						ref={(node) => (this.settings = node)}
						title={modalTitle}
						toggleSettings={this.toggleSettings}
						deleteState={this.deleteState}
					/>
				) : null}
				<SimulationModal
					machineType={this.state.machineType}
					states={this.state.states}
					show={this.state.hideSimulation}
					toggleSimulation={(machineType) => this.toggleSimulation(machineType)}
					setSimulationData={(data) => this.setSimulationData(data)}
				/>
			</div>
		);
	}
}

export default Sketch;
