const STATE_RADIUS = 25;
const ARROW_SIZE = 10;

export default class Transition {
  constructor(p5, from, to, color) {
    this.p5 = p5;
    this.from = from;
    this.to = to;
    this.color = color;
    this.controlPoints = [];
  }

  getControlPoints(start, end) {
    const theta = 45;
    let orgStart = this.p5.createVector(this.from.x, this.from.y);
    let orgEnd = this.p5.createVector(
      this.to.x - orgStart.x,
      this.to.y - orgStart.y,
    );

    // Control Point 1
    this.p5.translate(orgStart.x, orgStart.y);
    end.setMag(orgEnd.mag() / 3);
    end.rotate(theta);
    this.controlPoints[0] = end;
    let a = this.p5.createVector(end.x, end.y);
    a.setMag(STATE_RADIUS);

    start = orgEnd;
    end = start;

    // Control Point 2
    this.p5.translate(start.x, start.y);
    end.setMag(orgEnd.mag() / 3);
    end.rotate(180 - theta);
    this.controlPoints[1] = end;
    let b = this.p5.createVector(end.x, end.y);
    b.setMag(STATE_RADIUS);

    this.controlPoints[2] = a;
    this.controlPoints[3] = b;
  }

  drawBezierWithArrow() {
    const start = this.p5.createVector(this.from.x, this.from.y);
    const end = this.p5.createVector(this.to.x - start.x, this.to.y - start.y);
    this.p5.push();
    this.p5.stroke(this.color);
    this.p5.strokeWeight(2);
    this.p5.fill(this.color);
    this.getControlPoints(start, end);
    this.p5.pop();

    const startCP = this.controlPoints[0];
    const endCP = this.controlPoints[1];
    const a = this.controlPoints[2];
    const b = this.controlPoints[3];

    this.p5.noFill();
    this.p5.stroke(this.color);
    this.p5.strokeWeight(2);

    this.p5.bezier(
      a.x + this.from.x,
      a.y + this.from.y,
      startCP.x + this.from.x,
      startCP.y + this.from.y,
      endCP.x + this.to.x,
      endCP.y + this.to.y,
      b.x + this.to.x,
      b.y + this.to.y,
    );

    const d = this.p5.dist(this.from.x, this.from.y, this.to.x, this.to.y);

    startCP.setMag(d / 1.2);
    startCP.rotate(-33);
    endCP.setMag(STATE_RADIUS);

    let sx = startCP.x + this.from.x;
    let sy = startCP.y + this.from.y;

    // this.p5.circle(sx, sy, 10);
    this.p5.push();
    this.p5.translate(sx, sy, 10);
    let x = endCP.x + this.to.x;
    let y = endCP.y + this.to.y;
    let v = this.p5.createVector(x - sx, y - sy);
    // this.p5.line(0, 0, v.x, v.y);
    this.p5.fill(this.color);
    this.p5.translate(v.x, v.y);
    this.p5.rotate(180 + v.heading());
    this.p5.triangle(
      ARROW_SIZE,
      ARROW_SIZE / 2,
      ARROW_SIZE,
      -ARROW_SIZE / 2,
      0,
      0,
    );
    this.p5.pop();
  }

  drawSelfLoop() {
    console.log("Self Loop Time");
  }

  show() {
    if (this.from.index === this.to.index) {
      this.drawSelfLoop();
    } else {
      this.drawBezierWithArrow();
    }
  }
}
