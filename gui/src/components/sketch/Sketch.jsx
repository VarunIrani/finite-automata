import React from 'react';
import {Container} from 'react-bootstrap';
import p5 from 'p5';
import globals from '../../globals';
import State from './State';
import SettingsModal from './SettingsModal';
import SimulationModal from "../simulation/SimulationModal";
import {StateType} from "../../enums";

const LETTERS = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map((letter) => letter.toLowerCase()));
})();

// noinspection JSPotentiallyInvalidConstructorUsage
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
    }
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
    this.setTestCase = this.setTestCase.bind(this);
  }

  newSketch() {
    this.setState({states: [], numStates: 0});
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
    this.setState({numStates: this.state.numStates + 1, states});
  }

  componentDidMount() {
    new p5(this.sketch);
  }

  setup = (p5) => {
    const c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.parent('sketch-holder');
    c.position(0, 0);
    p5.angleMode(p5.DEGREES);
    this.setState({p5});
  };

  draw = (p5) => {
    p5.background(255);
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
    this.setState({showSettingsModal: globals.showSettings});
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
    this.setState({showSettingsModal: !this.state.showSettingsModal});
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
    this.setState({hideSimulation: !this.state.hideSimulation, machineType})
    globals.showSimulation = this.state.hideSimulation
  }

  setSimulationData(data) {
    this.props.setSimulationData(data);
  }

  setTestCase(data) {
    const initial = this.state.states.filter((s) => s.stateType === StateType.INITIAL)[0];
    const rest = this.state.states.filter((s) => s.stateType !== StateType.INITIAL);
    rest.forEach((r) => {
      r.color = 255
    })
    initial.color = "#ff6868"
    const states = this.state.states

    if (!data.transition.includes({"N": "N"})) {
      data.transition.push({"N": "N"})
    }

    setTimeout(() => {
      data.transition.forEach((t, i) => {
        const state = states.filter((s) => s.name === Object.values(t)[0])[0];
        const rest = states.filter((s) => s.name !== Object.values(t)[0]);
        if (Object.keys(t)[0] === "N") {
          clearColors(states, i)
        } else {
          setColor(state, rest, i);
        }
      })
    }, 1000);

    function clearColors(states, i) {
      setTimeout(() => {
        states.forEach(s => {
          s.color = 255
        })
        console.log("DONE")
      }, 1000 * i);
    }

    function setColor(state, rest, i) {
      setTimeout(() => {
        if (state.stateType === StateType.FINAL) {
          state.color = "#01d6a4"
        } else {
          state.color = "#ff6868"
        }
        rest.forEach((r) => {
          r.color = 255
        })
      }, 1000 * i);
    }
  }

  render() {
    let modalTitle = '';
    if (this.state.showSettingsModal) {
      modalTitle = ' State ';
    }
    return (
      <div>
        <Container id="sketch-holder"/>
        {this.state.showSettingsModal ? (
          <SettingsModal
            ref={(node) => (this.settings = node)}
            title={modalTitle}
            toggleSettings={this.toggleSettings}
            deleteState={this.deleteState}
          />
        ) : null}
        <SimulationModal machineType={this.state.machineType}
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
