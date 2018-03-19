// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vertices = Matter.Vertices,
    Bounds = Matter.Bounds,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint

var engine;
var world;
var bottle;
var boxes;
var grounds;
var bounds;
var canvaswidth = 1800;
var canvasheight = 900;
var game = {};

function preload() {
}

function setup() {
	angleMode(DEGREES);
	setCanvas();
	game.startingPoint = {
	x: random(canvaswidth * 0.1, canvaswidth * 0.9),
	y: random(canvasheight * 0.2, canvasheight * 0.8)
	},
	game.finishingPoint = {
	x: random(canvaswidth * 0.1, canvaswidth * 0.9),
	y: random(canvasheight * 0.1, canvasheight * 0.8)
	}
	boxes = [];
	grounds = [];
	Body.create();
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	// a = new Box(Bodies.rectangle(1500, 300, 100, 100), "purple");
	// b = new Box(Bodies.rectangle(1400, 400, 100, 100), "purple");
	// c = new Box(Bodies.rectangle(1500, 500, 100, 100), "purple");
	// boxes.push(a, b, c)
	// bugger = Matter.Constraint.create({
	// 	bodyA: a.body,
	// 	bodyB: b.body,
	// 	length: 200,
	// 	stiffness: 1
	// });
	// bugger2 = Matter.Constraint.create({
	// 	bodyA: b.body,
	// 	bodyB: c.body,
	// 	length: 200,
	// 	stiffness: 1
	// });
	// bugger3 = Matter.Constraint.create({
	// 	bodyA: a.body,
	// 	bodyB: c.body,
	// 	length: 200,
	// 	stiffness: 1
	// });
	// World.add(world, bugger);
	// World.add(world, bugger2);
	// World.add(world, bugger3);
	// Matter.Composites.chain(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options)
	setLetters();
	setBoundaries();
}

function draw() {
  clear();
  // background(255, 100);
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxi = boxes[i];
    if (boxi.destroy) {
      boxes.splice(i,1)
    } else {
      boxi.show();
    }
  }
  for (var i = grounds.length - 1; i >= 0; i--) {
    groundi = grounds[i];
    if (groundi.destroy) {
      grounds.splice(i,1)
    } else {
      // groundi.show();
    }
  }
}

function clearWorld() {
  Matter.World.clear(world, false);
  setup();
}



