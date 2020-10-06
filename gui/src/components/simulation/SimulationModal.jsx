import React, {Component} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import globals from "../../globals";
import {MachineType} from "../../enums";

class SimulationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false
    }
  }

  render() {
    let machineType = "";
    switch (this.props.machineType) {
      case MachineType.DFA:
        machineType = "DFA"
        break
      case MachineType.NFA:
        machineType = "NFA"
        break
      default:
        break
    }
    return (
      <Modal.Dialog style={{zIndex: 9999}}>
        <Modal.Header>
          <Container>
            <Row>
              <Col className="text-left">
                <Modal.Title>
                  Simulate {machineType}
                </Modal.Title>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            {this.state.valid ? "Simulate" : "Validate"}
          </Button>
          <Button variant="danger" onClick={() => this.props.toggleSimulation(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default SimulationModal;