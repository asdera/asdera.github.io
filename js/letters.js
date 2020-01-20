function setLetters() {
	letterSize = 20;

	capSize = 1.2;

	AVertices = [{x: 4 * letterSize * capSize, y: 0}, 
	{x: 8 * letterSize * capSize, y: 0}, 
	{x: 12 * letterSize * capSize, y: 15 * letterSize * capSize}, 
	{x: 0, y: 15 * letterSize * capSize}];
	ALetter = new Box(Bodies.fromVertices(160, 200, AVertices, { friction: 0.8}), "red");

	ALetter.size = letterSize * capSize;

 	ALetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[2]);
		this.point(points[2], this.size * -5, 0);
		this.point(points[2], this.size * -4, this.size * -1);
		this.point(points[2], this.size * -5, this.size * -5);
		this.point(points[3], this.size * 5, this.size * -5);
		this.point(points[3], this.size * 4, this.size * -1);
		this.point(points[3], this.size * 5, 0);
		this.point(points[3]);
	    endShape(CLOSE);
	    fill("gold");
	    beginShape();
		this.point(points[0], this.size * 1, this.size * 7);
		this.point(points[0], this.size * 0, this.size * 4);
		this.point(points[0], this.size * 1, this.size * 5);
		this.point(points[0], this.size * 2, this.size * 3);
		this.point(points[1], this.size * -1, this.size * 5);
		this.point(points[1], this.size * 0, this.size * 4);
		this.point(points[1], this.size * -1, this.size * 7);
	    endShape(CLOSE);
	    pop();
  	}

  	sVertices = [{x: 3 * letterSize, y: 0}, 
  	{x: 9 * letterSize, y: 0}, 
  	{x: 12 * letterSize, y: 1 * letterSize}, 
  	{x: 12 * letterSize, y: 14 * letterSize}, 
  	{x: 9 * letterSize, y: 15 * letterSize}, 
  	{x: 3 * letterSize, y: 15 * letterSize}, 
  	{x: 0, y: 14 * letterSize}, 
  	{x: 0, y: 1 * letterSize}];
	sLetter = new Box(Bodies.fromVertices(460, 200, sVertices, { friction: 0.8}), "red");

	sLetter.size = letterSize;

 	sLetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[2]);
		this.point(points[3]);
		this.point(points[3], 0, this.size * 4);
		this.point(points[2], 0, this.size * 3);
		this.point(points[1], 0, this.size * 3);
		this.point(points[1], 0, this.size * 6);
		this.point(points[2], 0, this.size * 6);
		this.point(points[3], 0, this.size * 6);
		this.point(points[4]);
		this.point(points[5]);
		this.point(points[6]);
		this.point(points[7]);
		this.point(points[7], 0, this.size * -4);
		this.point(points[6], 0, this.size * -3);
		this.point(points[5], 0, this.size * -3);
		this.point(points[5], 0, this.size * -6);
		this.point(points[6], 0, this.size * -6);
		this.point(points[7], 0, this.size * -6);
	    endShape(CLOSE);
	    fill(0, 0);
	    beginShape();
	    endShape(CLOSE);
	    pop();
  	}

  	dVertices = [{x: 0 * letterSize, y: 0}, 
  	{x: 9 * letterSize, y: 0}, 
  	{x: 12 * letterSize, y: 4 * letterSize}, 
  	{x: 12 * letterSize, y: 11 * letterSize}, 
  	{x: 9 * letterSize, y: 15 * letterSize}, 
  	{x: 0 * letterSize, y: 15 * letterSize}]
	dLetter = new Box(Bodies.fromVertices(760, 200, dVertices, { friction: 0.8}), "red");

	dLetter.size = letterSize;

 	dLetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[2]);
		this.point(points[3]);
		this.point(points[4]);
		this.point(points[5]);
	    beginContour();
		this.point(points[0], this.size * 3, this.size * 12);
		this.point(points[1], this.size * -2, this.size * 12);
		this.point(points[1], 0, this.size * 9);
	    this.point(points[1], 0, this.size * 6);
	    this.point(points[1], this.size * -2, this.size * 3);
	    this.point(points[0], this.size * 3, this.size * 3);
		endContour();
	    endShape(CLOSE);
	    pop();
  	}

  	eVertices = [{x: 0 * letterSize, y: 0}, 
  	{x: 12 * letterSize, y: 0}, 
  	{x: 12 * letterSize, y: 15 * letterSize}, 
  	{x: 0 * letterSize, y: 15 * letterSize}];
	eLetter = new Box(Bodies.fromVertices(1060, 200, eVertices, { friction: 0.8}), "red");

	eLetter.size = letterSize;

 	eLetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[1], 0, this.size * 6);
		this.point(points[1], this.size * -3, this.size * 3);
		this.point(points[0], this.size * 3, this.size * 3);
		this.point(points[0], this.size * 3, this.size * 6);
		this.point(points[1], this.size * -3, this.size * 6);
		this.point(points[1], this.size * -3, this.size * 9);
		this.point(points[0], this.size * 3, this.size * 9);
		this.point(points[0], this.size * 3, this.size * 12);
		this.point(points[1], this.size * -3, this.size * 12);
		this.point(points[1], 0, this.size * 9);
		this.point(points[2]);
		this.point(points[3]);
	    endShape(CLOSE);
	    fill(0, 0);
	    beginShape();
	    endShape(CLOSE);
	    pop();
  	}

  	rVertices = [{x: 0 * letterSize, y: 0}, 
  	{x: 12 * letterSize, y: 0},  
  	{x: 12 * letterSize, y: 15 * letterSize}, 
  	{x: 0 * letterSize, y: 15 * letterSize}]
	rLetter = new Box(Bodies.fromVertices(1360, 200, rVertices, { friction: 0.8}), "red");

	rLetter.size = letterSize;

 	rLetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[1]);
		this.point(points[1], 0, this.size * 9);
		this.point(points[1], this.size * -5, this.size * 9);
		this.point(points[2], this.size * -2, this.size * -2);
		this.point(points[1], 0, this.size * 11);
		this.point(points[2]);
		this.point(points[1], this.size * -4, this.size * 15);
		this.point(points[1], this.size * -9, this.size * 9);
		this.point(points[3], this.size * 3, this.size * -4);
		this.point(points[3], this.size * 6, 0);
		this.point(points[3], this.size * 3, 0);
		this.point(points[3]);
	    beginContour();
	    this.point(points[0], this.size * 3, this.size * 6);
	    this.point(points[1], this.size * -3, this.size * 6);
	    this.point(points[1], this.size * -3, this.size * 3);
	    this.point(points[0], this.size * 3, this.size * 3);
	    endContour();
	    endShape(CLOSE);
	    pop();
  	}

  	aVertices = [{x: 4 * letterSize, y: 0}, 
	{x: 8 * letterSize, y: 0}, 
	{x: 12 * letterSize, y: 15 * letterSize}, 
	{x: 0, y: 15 * letterSize}];
	aLetter = new Box(Bodies.fromVertices(1660, 200, aVertices, { friction: 0.8}), "red");

	aLetter.size = letterSize;

 	aLetter.draw = function() {
    	pos = this.body.position;
    	points = this.body.vertices;
	    push();
	    stroke(this.colour2);
	    fill(this.colour);
	    strokeWeight(10);
	    beginShape();
		this.point(points[0]);
		this.point(points[1]);
		this.point(points[2]);
		this.point(points[2], this.size * -5, 0);
		this.point(points[2], this.size * -4, this.size * -1);
		this.point(points[2], this.size * -5, this.size * -5);
		this.point(points[3], this.size * 5, this.size * -5);
		this.point(points[3], this.size * 4, this.size * -1);
		this.point(points[3], this.size * 5, 0);
		this.point(points[3]);
	    beginContour();
		this.point(points[1], this.size * -1, this.size * 7);
		this.point(points[0], this.size * 2, this.size * 3);
		this.point(points[0], this.size * 1, this.size * 7);
	    endContour();
	    endShape(CLOSE);
	    pop();
  	}

	boxes.push(ALetter, sLetter, dLetter, eLetter, rLetter, aLetter);
}