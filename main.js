const padding = 50;
const num = 500;

let points = [];
let hull = [];
let index;

function turn(c, a, b) {
  s = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
  return (s > 0) - (s < 0);
}

function setup() {
  let C = createCanvas(windowWidth, windowHeight);

  C.parent("parrent");

  for (let i = 0; i < num; i++)
    points.push(
      createVector(
        random() * (width - 2 * padding) + padding,
        random() * (height - 2 * padding) + padding
      )
    );

  let bottomLeft = points.shift();
  points.forEach((x, i) => {
    if (x.x < bottomLeft.x || (x.x == bottomLeft.x && x.y < bottomLeft.y)) {
      x = [bottomLeft, (bottomLeft = x)][0];
    }
  });

  points.sort((p1, p2) => {
    const t = turn(bottomLeft, p1, p2);
    return t > 0 || (t == 0 && (p1.x < p2.x || (p1.x == p2.x && p1.y > p2.y)))
      ? -1
      : 1;
  });

  hull.push(points[points.length - 1]);
  hull.push(bottomLeft);
  index = 0;
  //  frameRate(60);
}

function draw() {
  background(51, 20);

  strokeWeight(1);
  noFill();
  stroke(255, 10);
  beginShape();
  for (v of hull) {
    vertex(v.x, height - v.y);
  }

  for (let i = index; i < num - 1; i++)
    vertex(points[i].x, height - points[i].y);

  endShape(CLOSE);

  noStroke();
  fill(0, 255, 0);

  for (let i = index; i < num - 1; i++)
    ellipse(points[i].x, height - points[i].y, 1, 1);

  strokeWeight(2);
  noFill();
  stroke(190, 0, 190);
  beginShape();
  for (v of hull) {
    vertex(v.x, height - v.y);
  }
  endShape(CLOSE);

  noStroke();
  fill(190, 100, 255);
  for (v of hull) {
    ellipse(v.x, height - v.y, 2, 2);
  }

  if (points.length == index) {
    return;
  }

  strokeWeight(2);

  if (hull.length >= 2 && turn(hull[hull.length - 2], hull[hull.length - 1], points[index]) < 0) {
    stroke(255, 0, 0);
    line(
      hull[hull.length - 1].x,
      height - hull[hull.length - 1].y,
      points[index].x,
      height - points[index].y
    );
    hull.pop();
    return;
  }

  stroke(0, 0, 255);
  line(
    hull[hull.length - 1].x,
    height - hull[hull.length - 1].y,
    points[index].x,
    height - points[index].y
  );
  hull.push(points[index]);
  index++;
}
