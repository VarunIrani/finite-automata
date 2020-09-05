import React from "react";
import MenuBar from "./components/nav/MenuBar";
import Sketch from "./components/sketch/Sketch";
import { Container, Row, Col } from "react-bootstrap";
import ToolBar from "./components/tools/ToolBar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Sketch
          ref={(node) => {
            this.sketch = node;
          }}
        />
        <Container fluid style={{ padding: 0 }}>
          <Row>
            <Col>
              <MenuBar
                newSketch={() => {
                  this.sketch.newSketch();
                }}
              />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col
              sm="1"
              style={{ zIndex: 999, position: "absolute", top: 80 }}
            >
              <ToolBar
                addState={(stateType) => {
                  this.sketch.addState(stateType);
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
