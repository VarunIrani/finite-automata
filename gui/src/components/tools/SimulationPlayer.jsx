import React, {Component} from 'react';
import {Card, Row, Container, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

class SimulationPlayer extends Component {
  render() {
    const simData = this.props.simulationData;
    return (
      <Card bg='white' text='dark'>
        <Card.Header style={{backgroundColor: 'white'}}>
          <h5 className='my-auto'>Simulate Test Cases</h5>
        </Card.Header>
        <Card.Body>
          <Container>
            {simData === null ? <Row>
              <p className='my-auto'>No simulation cases available. Please click Simulate and select your type of
                diagram.</p>
            </Row> : <React.Fragment>
              {simData.test_strings.map((test, index) => <Row key={index}
                                                              className='justify-content-between align-items-center mb-3 px-3'>
                <p className='p-0 m-0 my-auto' style={{fontSize: 18}}><b>Test </b>{test}</p>
                <Button
                  variant="success">
                  <FontAwesomeIcon icon={faPlay}/>
                </Button>
              </Row>)}
            </React.Fragment>}
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default SimulationPlayer;