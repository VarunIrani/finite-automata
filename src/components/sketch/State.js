export const StateType = {
	INITIAL: 'INITIAL',
	FINAL: 'FINAL',
	NORMAL: 'NORMAL'
};

export default class State {
	constructor(p5, x, y, d, name, index, stateType) {
		this.p5 = p5;
		this.index = index;
		this.stateType = stateType;
		this.dragging = false; // Is the object being dragged?
		this.rollover = false; // Is the mouse over the ellipse?
		this.connecting = false;
		this.connected = false;
		this.connectedTo = [];
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

	intersects(other) {
		const d = this.p5.dist(this.x, this.y, other.x, other.y);
		if (d < this.r + other.r) {
			return true;
		} else {
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

	connect(states) {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		this.p5.strokeWeight(2);

		// Draw State Connections
		if (this.connecting) {
			this.p5.stroke('#4caf50');
			this.p5.line(this.x, this.y, mouseX, mouseY);
			this.p5.noFill();
		} else if (this.connected) {
			this.p5.stroke('#4caf50');
			// this.p5.line(this.x, this.y, connectingState.x, connectingState.y);
			this.connectedTo.forEach((connection) => {
				const connectingState = states[connection];
				let x1, x2, y1, y2, m, midX, midY;
				x1 = this.x;
				x2 = connectingState.x;
				y1 = this.y;
				y2 = connectingState.y;
				midX = (x1 + x2) / 2;
				midY = (y1 + y2) / 2;
				this.p5.stroke('#4caf50');
				const d = this.p5.dist(x1, y1, x2, y2);
				m = (y2 - y1) / (x2 - x1);
				let dy = this.p5.sqrt(this.p5.pow(d * 2, 2) / (this.p5.pow(m, 2) + 1));
				let dx = -m * dy;

				let x = midX + dx;
				let y = midY + dy;
				let flip = 1;
				if (connection === this.index) {
					flip = -1;
				} else {
					flip = 1;
				}

				this.p5.noFill();
				this.p5.curve(x, flip * y, x1, y1, x2, y2, x, flip * y);
			});
		}
	}

	drawArrow(base, vec, color) {
		this.p5.push();
		this.p5.stroke(color);
		this.p5.strokeWeight(2);
		this.p5.fill(color);
		this.p5.translate(base.x, base.y);
		this.p5.line(0, 0, vec.x - base.x, vec.y - base.y);
		const d = this.p5.dist(0, 0, vec.x - base.x, vec.y - base.y);
		let arrowSize = 7;
		this.p5.translate(d - arrowSize, 0);
		this.p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		this.p5.pop();
	}

	show() {
		this.p5.strokeWeight(1);

		// Different fill based on state
		this.p5.stroke(0);
		this.p5.fill(255);
		if (this.rollover || this.dragging) {
			this.p5.stroke('#4caf50');
		}
		if (this.stateType === StateType.NORMAL) this.p5.circle(this.x, this.y, this.r * 2);
		else if (this.stateType === StateType.FINAL) {
			this.p5.circle(this.x, this.y, this.r * 2);
			this.p5.circle(this.x, this.y, this.r * 1.7);
		} else if (this.stateType === StateType.INITIAL) {
			this.p5.circle(this.x, this.y, this.r * 2);
			let base = this.p5.createVector(this.x - this.r * 3, this.y);
			let vec = this.p5.createVector(this.x - this.r, this.y);
			this.drawArrow(base, vec, 0);
		}
		// Draw the state name
		this.p5.textSize(this.r * 0.7);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.noStroke();
		this.p5.fill(0);
		this.p5.text(this.name, this.x, this.y);
	}

	pressed(states) {
		const mouseX = this.p5.mouseX;
		const mouseY = this.p5.mouseY;
		let d = this.p5.int(this.p5.dist(this.x, this.y, mouseX, mouseY));
		// Did I click on the circle?
		if (!this.dragging) {
			if (d < this.r) {
				this.dragging = true;
				// If so, keep track of relative location of click to corner of circle
				this.offsetX = this.x - mouseX;
				this.offsetY = this.y - mouseY;
			}
		}
		if (this.connecting) {
			for (let i = 0; i < states.length; i++) {
				const connectingState = states[i];
				d = this.p5.int(this.p5.dist(connectingState.x, connectingState.y, mouseX, mouseY));
				if (d < connectingState.r) {
					console.log(`${this.name} -> ${connectingState.name}`);
					this.connectedTo.push(connectingState.index);
					this.connected = true;
				} else {
					this.connecting = false;
				}
			}
		}
	}

	released() {
		// Quit dragging
		this.dragging = false;
	}
}
