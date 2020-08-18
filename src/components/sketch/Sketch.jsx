import React from 'react';
import { Container } from 'react-bootstrap';
import p5 from 'p5'

class Sketch extends React.Component {
	render() {
		return <Container style={{ paddingLeft: 0, paddingRight: 0 }} fluid id="sketch-holder" />;
	}
}

const setup = (p5) => {
  const c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
  c.parent("sketch-holder");
  p5.angleMode(p5.DEGREES);
};

const draw = (p5) => {
  p5.background(20);
};

const windowResized = (p5) => {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
};

const sketch = (p5) => {
  p5.setup = () => setup(p5);
  p5.draw = () => draw(p5);
  p5.windowResized = () => windowResized(p5);
};

new p5(sketch);

export default Sketch;
