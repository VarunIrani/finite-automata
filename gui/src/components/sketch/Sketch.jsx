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
    p5.push()
    const l = 40 - this.state.testString.length
    p5.textSize(l);
    p5.translate(-l * 2, 0);
    if (this.state.currentIndex === -1)
      p5.fill("#000")
    this.state.testString.forEach((char, i) => {
      if (this.state.currentIndex !== -1) {
        if (i === this.state.currentIndex)
          p5.fill("#3575ff");
        else
          p5.fill("#000");
      }
      p5.text(char, p5.width / 3 + (i * 20), 100);
    })
    p5.pop()
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

  setTestCase(testCaseData) {
    this.setState({currentIndex: -1})

    const time = 1000
    const initial = this.state.states.filter((s) => s.stateType === StateType.INITIAL)[0];
    const rest = this.state.states.filter((s) => s.stateType !== StateType.INITIAL);
    rest.forEach((r) => {
      r.color = 255
    })

    initial.color = "#ff6868"
    const states = this.state.states
    const data = testCaseData.testCase
    const testCaseNumber = testCaseData.testCaseNumber
    const resultText = document.querySelector(`#result-${testCaseNumber}`)

    this.setState({testString: [...testCaseData.testString]})
    let d;

    if (data.transition.map(t => t["N"]).indexOf("N") === -1)
      d = data.transition.length;
    else
      d = data.transition.map(t => t["N"]).indexOf("N")

    let lastTransition = data.transition[d - 1];
    const lastState = states.filter((s) => {
      let lastStates = Object.values(lastTransition)[0];
      if (lastStates.includes(",")) {
        const transitions = lastStates.split(",")
        const lastStateName = transitions[transitions.length - 1]
        return s.name === lastStateName;
      } else {
        return s.name === lastStates
      }
    })[0];

    if (data.transition.filter(t => Object.keys(t)[0] === "N").length < 1)
      data.transition.push({"N": "N"})

    setTimeout(function () {
      data.transition.forEach((t, i) => {
        let state = [], rest;
        if (Object.values(t)[0].includes(",")) {
          const temp = Object.values(t)[0].split(",");
          temp.forEach(tr => {
            state.push(states.filter((s) => s.name === tr)[0]);
          })
          rest = states.filter((s) => !temp.includes(s.name))
        } else {
          state = states.filter((s) => s.name === Object.values(t)[0]);
          rest = states.filter((s) => s.name !== Object.values(t)[0]);
        }
        if (Object.keys(t).includes("N")) {
          clearColors(states, i)
        } else {
          setColor(state, rest, i);
        }
      })
    }, time);

    const setColor = function (state, rest, i) {
      setTimeout(function () {
        this.setState({currentIndex: i})
        state.forEach(s => {
          if (s !== undefined) {
            if (s.stateType === StateType.FINAL) {
              s.color = "#01d6a4"
            } else {
              s.color = "#ff6868"
            }
          }
        })
        rest.forEach((r) => {
          r.color = 255
        })
      }.bind(this), time * i);
    }.bind(this)

    function clearColors(states, i) {
      setTimeout(function () {
        states.forEach(s => {
          if (s !== undefined)
            s.color = 255
        })
        if (lastState === undefined) {
          if (!resultText.classList.contains("text-danger"))
            resultText.classList.add("text-danger")
          resultText.innerHTML = "Rejected"
        } else {
          if (lastState.stateType === StateType.FINAL) {
            if (!resultText.classList.contains("text-success"))
              resultText.classList.add("text-success")
            resultText.innerHTML = "Accepted"
          } else {
            if (!resultText.classList.contains("text-danger"))
              resultText.classList.add("text-danger")
            resultText.innerHTML = "Rejected"
          }
        }
      }, time * i);
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
