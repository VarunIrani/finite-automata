import Transition from './Transition';

export const StateType = {
	INITIAL: 'INITIAL',
	FINAL: 'FINAL',
	NORMAL: 'NORMAL'
};

const SELECT_COLOR = '#454ade';
const CONNECTING_COLOR = '#454ade';
const CONNECTION_COLOR = '#f18701';
const SUCCESS_COLOR = '#00916e';

let fromTo = [];

export default class State {
	constructor(p5, x, y, d, name, index, stateType) {
		this.p5 = p5;
		this.index = index;
		this.stateType = stateType;
		this.dragging = false; // Is the object being dragged?
		this.rollover = false; // Is the mouse over the ellipse?
		this.connecting = false;
		this.connected = false;
		this.transitions = [];
		this.intersecting = false;
		this.x = x;
		this.y = y;
		this.r = this.p5.int(d / 2);
		this.name = name;
		this.offsetX = 0;
		this.offsetY = 0;
	}

	setP5(p5) {
		this.p5 = p5;
	}

	over() {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		const d = this.p5.int(this.p5.dist(this.x, this.y, mouseX, mouseY));
		// Is mouse over the object
		if (d < this.r) {
			this.rollover = true;
		} else {
			this.rollover = false;
		}
	}

	doubleClicked() {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		const d = this.p5.int(this.p5.dist(this.x, this.y, mouseX, mouseY));
		// Is mouse over the object
		if (d < this.r) {
			this.connecting = true;
		}
	}

	edgeIntersects(other) {
		const d = this.p5.dist(this.x, this.y, other.x, other.y);
		if (d < this.r + other.r) {
			this.intersecting = true;
			return true;
		} else {
			this.intersecting = false;
			return false;
		}
	}

	update() {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		// Adjust location if being dragged
		if (this.dragging) {
			this.x = mouseX + this.offsetX;
			this.y = mouseY + this.offsetY;
		}
	}

	showTransitions() {
		this.transitions.forEach((transition) => {
			transition.show();
		});
	}

	connect() {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		this.p5.strokeWeight(2);
		this.p5.stroke(CONNECTING_COLOR);
		// Draw State Connections
		if (this.connecting) {
			let base = this.p5.createVector(this.x, this.y);
			let vec = this.p5.createVector(mouseX - base.x, mouseY - base.y);
			if (this.transitions.length) {
				this.showTransitions();
			}
			this.drawArrow(base, vec, CONNECTING_COLOR, true, false);
		} else if (this.connected) {
			this.showTransitions();
		}
	}

	drawArrow(base, vec, color, rotating, varyingMag) {
		this.p5.push();
		this.p5.stroke(color);
		this.p5.strokeWeight(2);
		this.p5.fill(color);
		this.p5.translate(base.x, base.y);
		if (varyingMag) {
			vec.setMag(vec.mag() - this.r);
		}
		this.p5.line(0, 0, vec.x, vec.y);
		let arrowSize = 10;
		if (rotating) {
			this.p5.rotate(vec.heading());
		}
		this.p5.translate(vec.mag() - arrowSize, 0);
		this.p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		this.p5.pop();
	}

	show() {
		this.p5.strokeWeight(2);
		// Different fill based on state
		this.p5.stroke(0);
		this.p5.fill(255);
		if (this.rollover || this.dragging) {
			this.p5.stroke(SELECT_COLOR);
		}
		if (this.stateType === StateType.NORMAL) {
			this.p5.circle(this.x, this.y, this.r * 2);
		} else if (this.stateType === StateType.FINAL) {
			this.p5.circle(this.x, this.y, this.r * 2);
			this.p5.circle(this.x, this.y, this.r * 1.7);
		} else if (this.stateType === StateType.INITIAL) {
			this.p5.circle(this.x, this.y, this.r * 2);
			let base = this.p5.createVector(this.x - this.r * 3, this.y);
			let vec = this.p5.createVector(this.x - this.r - base.x, this.y - base.y);
			// Custom arrow for INITIAL State
			if (this.rollover || this.dragging) {
				this.drawArrow(base, vec, SELECT_COLOR, false, false);
			} else {
				this.drawArrow(base, vec, 0, false, false);
			}
		}
		// Draw the state name
		this.p5.textSize(this.r * 0.7);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.noStroke();
		this.rollover || this.dragging ? this.p5.fill(SELECT_COLOR) : this.p5.fill(0);
		this.p5.text(this.name, this.x, this.y);
	}

	pressed(states) {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		let d = this.p5.int(this.p5.dist(this.x, this.y, mouseX, mouseY));
		if (!this.dragging) {
			// Did I click on the circle?
			if (d < this.r) {
				let indices = [];
				let topState;
				for (let i = 0; i < states.length; i++) {
					if (i !== this.index) {
						if (this.edgeIntersects(states[i])) {
							indices.push(i);
							indices.push(this.index);
						}
					}
				}
				topState = this.p5.max(indices);
				if (topState !== Number.NEGATIVE_INFINITY && states[topState].rollover) {
					states[topState].dragging = true;
					// If so, keep track of relative location of click to corner of circle
					states[topState].offsetX = states[topState].x - mouseX;
					states[topState].offsetY = states[topState].y - mouseY;
				} else {
					this.dragging = true;
					// If so, keep track of relative location of click to corner of circle
					this.offsetX = this.x - mouseX;
					this.offsetY = this.y - mouseY;
				}
			}
		} else if (this.connecting) {
			for (let i = 0; i < states.length; i++) {
				let connectingState = states[i];
				d = this.p5.int(this.p5.dist(connectingState.x, connectingState.y, mouseX, mouseY));
				if (d < connectingState.r) {
					if (fromTo.indexOf({ from: this.index, to: connectingState.index }) === -1) {
						if (this.index === connectingState.index) {
							this.transitions.push(new Transition(this.p5, this, this, CONNECTION_COLOR));
							fromTo.push({ from: this.index, to: this.index });
						}
						this.transitions.push(new Transition(this.p5, this, connectingState, CONNECTION_COLOR));
						fromTo.push({ from: this.index, to: connectingState.index });
					}
					this.connected = true;
					this.connecting = false;
				} else {
					this.connecting = false;
				}
			}
		} else {
			if (d < this.r) {
				console.log('Clicked on state', this.name);
			}
		}
	}

	released() {
		// Quit dragging
		this.dragging = false;
	}
}
