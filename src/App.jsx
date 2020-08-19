import React from 'react';
import MenuBar from './components/nav/MenuBar';
import Sketch from './components/sketch/Sketch';
import { Container, Row, Col } from 'react-bootstrap';
import ToolBar from './components/tools/ToolBar';

class App extends React.Component {
	render() {
		return (
			<div>
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
				<Container fluid style={{ padding: 0 }}>
					<Row>
						<Col sm="1" className="ml-3" style={{ paddingTop: '15%' }}>
							<ToolBar
								addState={(stateType) => {
									this.sketch.addState(stateType);
								}}
							/>
						</Col>
						<Col>
							<Sketch
								ref={(node) => {
									this.sketch = node;
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
