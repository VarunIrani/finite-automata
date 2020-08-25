import React from "react";
import { Container } from "react-bootstrap";
import p5 from "p5";
import State from "./State";

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      numStates: 0,
      p5: null,
    };
    this.newSketch = this.newSketch.bind(this);
    this.addState = this.addState.bind(this);
    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);
    this.mousePressed = this.mousePressed.bind(this);
    this.mouseReleased = this.mouseReleased.bind(this);
    this.doubleClicked = this.doubleClicked.bind(this);
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
      "S" + this.state.numStates,
      this.state.numStates,
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

  render() {
    return <Container id="sketch-holder" />;
  }
}

export default Sketch;
