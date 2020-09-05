import React from "react";
import {
  Container,
  Modal,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import p5 from "p5";
import globals from "../../globals";
import State from "./State";
import { LineType } from "./Transition";

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
    };
    this.newSketch = this.newSketch.bind(this);
    this.addState = this.addState.bind(this);
    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);
    this.mousePressed = this.mousePressed.bind(this);
    this.mouseReleased = this.mouseReleased.bind(this);
    this.doubleClicked = this.doubleClicked.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.changeLineType = this.changeLineType.bind(this);
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
      this.state.numStates,
      stateType,
    );
    states.push(newState);
    this.setState({ numStates: this.state.numStates + 1, states });
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

  changeLineType(value, i) {
    if (value === LineType.CURVE) {
      globals.selectedState.transitions[i].lineType = LineType.CURVE;
    } else {
      globals.selectedState.transitions[i].lineType = LineType.LINE;
    }
    this.setState({});
  }

  render() {
    let modalTitle = "";
    if (this.state.showSettingsModal) {
      modalTitle = globals.selectedState.stateType +
        " State " +
        globals.selectedState.name;
    }
    return (
      <div>
        <Container id="sketch-holder" />
        {this.state.showSettingsModal
          ? (
            <Modal.Dialog style={{ zIndex: 9999 }}>
              <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Container fluid>
                  {globals.selectedState.transitions.length
                    ? <>
                      <Row>
                        <h5 className="pb-2">Transitions</h5>
                      </Row>
                      <Row>
                        <Col
                          className="text-left"
                        >
                          <h6>Description</h6>
                        </Col>
                        <Col
                          className="text-left"
                        >
                          <h6>Value</h6>
                        </Col>
                        <Col
                          className="text-left"
                        >
                          <h6>Line Type</h6>
                        </Col>
                      </Row>
                      {globals.selectedState.transitions.map((t) => {
                        return <Row
                          className="mb-3"
                          key={t.index}
                        >
                          <Col
                            className="text-left my-auto"
                          >
                            <h6 className="my-auto">
                              {t.from.name + " to " + t.to.name}
                            </h6>
                          </Col>
                          <Col
                            className="text-left"
                          >
                            <Row>
                              <Col lg="8">
                                <FormControl
                                  value={t.value}
                                  placeholder="Value"
                                  aria-label="Value"
                                  aria-describedby="transition-value"
                                />
                              </Col>
                              <Col lg="4">
                                <Button>ε</Button>
                              </Col>
                            </Row>
                          </Col>
                          {t.from.index === t.to.index ? <Col></Col> : <Col
                            className="text-left"
                          >
                            <DropdownButton
                              variant="dark"
                              id="line-type-dropdown"
                              title={t.lineType}
                            >
                              <Dropdown.Item as="button">
                                <div
                                  onClick={(e) => {
                                    this.changeLineType(
                                      e.target.textContent,
                                      t.index,
                                    );
                                  }}
                                >
                                  Curve
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item as="button">
                                <div
                                  onClick={(e) => {
                                    this.changeLineType(
                                      e.target.textContent,
                                      t.index,
                                    );
                                  }}
                                >
                                  Line
                                </div>
                              </Dropdown.Item>
                            </DropdownButton>
                          </Col>}
                        </Row>;
                      })}
                    </>
                    : <Row>
                      <p>
                        No settings available. Please create transitions.
                      </p>
                    </Row>}
                </Container>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="danger" onClick={this.toggleSettings}>
                  Close
                </Button>
                <Button variant="success">Save changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          )
          : null}
      </div>
    );
  }
}

export default Sketch;
