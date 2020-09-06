import React from "react";
import { Container } from "react-bootstrap";
import p5 from "p5";
import globals from "../../globals";
import State from "./State";
import SettingsModal from "./SettingsModal";

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
    };
    this.newSketch = this.newSketch.bind(this);
    this.addState = this.addState.bind(this);
    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);
    this.mousePressed = this.mousePressed.bind(this);
    this.mouseReleased = this.mouseReleased.bind(this);
    this.doubleClicked = this.doubleClicked.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.deleteState = this.deleteState.bind(this);
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
    );
    states.push(newState);
    this.setState(
      { numStates: this.state.numStates + 1, states },
    );
  }

  componentDidMount() {
    new p5(this.sketch);
  }

  setup = (p5) => {
    const c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.parent("sketch-holder");

    c.position(0, 0);
    p5.angleMode(p5.DEGREES);
    this.setState({ p5 });
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

  mousePressed = (p5) => {
    this.state.states.forEach((state) => {
      state.pressed(this.state.states);
    });
  };

  mouseReleased = (p5) => {
    this.state.states.forEach((state) => {
      state.released();
    });
    this.setState({ showSettingsModal: globals.showSettings });
  };

  doubleClicked = (p5) => {
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
    p5.mousePressed = () => this.mousePressed(p5);
    p5.mouseReleased = () => this.mouseReleased(p5);
    p5.doubleClicked = () => this.doubleClicked(p5);
  };

  toggleSettings() {
    this.setState({ showSettingsModal: !this.state.showSettingsModal });
    globals.showSettings = false;
  }

  deleteState(i) {
    let tempStates = this.state.states;
    let toBeRemoved = tempStates.filter((e) => e.index === i)[0];
    let transitionIndices = [];
    let otherStates = tempStates.filter((e) => e.index !== i);
    otherStates.forEach(
      (other) => {
        for (let i = 0; i < other.fromTo.length; i++) {
          if (other.fromTo[i].to === toBeRemoved.index) {
            transitionIndices.push({ state: other, index: i });
            break;
          }
        }
      },
    );
    transitionIndices.forEach((ti) => {
      this.settings.deleteTransition(ti.state, ti.index);
    });
    for (let i = toBeRemoved.index; i < otherStates.length; i++) {
      otherStates[i].index -= 1;
    }
    this.setState(
      {
        states: otherStates,
        showSettingsModal: !this.state.showSettingsModal,
        deletedCount: this.state.deletedCount + 1,
      },
    );
    globals.showSettings = false;
  }

  render() {
    let modalTitle = "";
    if (this.state.showSettingsModal) {
      modalTitle = globals.selectedState.stateType + " State " +
        globals.selectedState.name;
    }
    return (
      <div>
        <Container id="sketch-holder" />
        {this.state.showSettingsModal
          ? (
            <SettingsModal
              ref={(node) => this.settings = node}
              title={modalTitle}
              toggleSettings={this.toggleSettings}
              deleteState={this.deleteState}
            />
          )
          : null}
      </div>
    );
  }
}

export default Sketch;
