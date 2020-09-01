const STATE_RADIUS = 25;
const ARROW_SIZE = 10;

export default class Transition {
  constructor(p5, from, to, color, value) {
    this.p5 = p5;
    this.from = from;
    this.to = to;
    this.color = color;
    this.controlPoints = [];
    this.value = value;
  }

  getControlPoints(start, end) {
    const theta = 60;
    let orgStart = this.p5.createVector(this.from.x, this.from.y);
    let orgEnd = this.p5.createVector(
      this.to.x - orgStart.x,
      this.to.y - orgStart.y,
    );

    // Control Point 1
    this.p5.translate(orgStart.x, orgStart.y);
    end.setMag(orgEnd.mag() / 2);
    end.rotate(theta);
    this.controlPoints[0] = end;
    let a = this.p5.createVector(end.x, end.y);
    a.setMag(STATE_RADIUS);

    start = orgEnd;
    end = start;

    // Control Point 2
    this.p5.translate(start.x, start.y);
    end.setMag(orgEnd.mag() / 2);
    end.rotate(180 - theta);
    this.controlPoints[1] = end;
    let b = this.p5.createVector(end.x, end.y);
    b.setMag(STATE_RADIUS);

    this.controlPoints[2] = a;
    this.controlPoints[3] = b;
  }

  drawValue(d, s) {
    s.setMag(d / 1.5);
    s.rotate(-20);
    this.p5.push();
    this.p5.translate(s.x + this.from.x, s.y + this.from.y);
    this.p5.noStroke();
    this.p5.fill(this.color);
    this.p5.text(this.value, 0, 0);

    this.p5.pop();
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

    const s = this.p5.createVector(startCP.x, startCP.y);

    this.drawValue(d, s);

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
    const start = this.p5.createVector(this.from.x - STATE_RADIUS, this.from.y);
    this.p5.stroke(this.color);
    this.p5.noFill();
    let a = this.p5.createVector(
      -STATE_RADIUS * 3 + start.x,
      -STATE_RADIUS + start.y,
    );
    let b = this.p5.createVector(
      STATE_RADIUS * 4 + a.x,
      -STATE_RADIUS * 3 + a.y,
    );
    const end = this.p5.createVector(this.from.x, this.from.y - STATE_RADIUS);
    this.p5.bezier(start.x, start.y, a.x, a.y, b.x, b.y, end.x, end.y);
    let t = this.p5.createVector(
      -STATE_RADIUS * 2 + start.x,
      -STATE_RADIUS * 2 + start.y,
    );
    this.p5.fill(this.color);
    this.p5.noStroke();
    this.p5.text(this.value, t.x, t.y);

    this.p5.push();
    this.p5.translate(b.x, b.y);
    let arrow = this.p5.createVector(0, STATE_RADIUS * 3);
    this.p5.translate(arrow.x, arrow.y);
    this.p5.rotate(-arrow.heading());
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

  show() {
    if (this.from.index === this.to.index) {
      this.drawSelfLoop();
    } else {
      this.drawBezierWithArrow();
    }
  }
}
