function Box(body, colour, colour2) {
  this.body = body;
  this.colour = (colour === undefined) ? "black" : colour;
  this.colour2 = (colour2 === undefined) ? "indigo" : colour2;
  this.destroy = false;
  World.add(world, this.body);

  this.show = function() {
    pos = this.body.position;
    this.draw();
    if (!Matter.Bounds.contains(bounds, pos)) {
      this.rip();
    }
    if (this.add) {
      this.add(pos);
    }
  }

  this.draw = function() {
    pos = this.body.position;
    push();
    stroke(this.colour2)
    fill(this.colour);
    strokeWeight(10);
    beginShape();
    for (var i in this.body.vertices) {
      vertexi = this.body.vertices[i];
      vertex(vertexi.x, vertexi.y);
    }
    endShape(CLOSE);
    pop();
  }

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }

  this.point = function(vert, offx, offy) {
    offx = (offx === undefined) ? 0 : offx;
    offy = (offy === undefined) ? 0 : offy;
    vertex(vert.x + cos(degrees(this.body.angle)) * offx + cos(degrees(this.body.angle) + 90) * offy, vert.y + sin(degrees(this.body.angle)) * offx + sin(degrees(this.body.angle) + 90) * offy);
  }
}

function Pin(pin) {
  this.pin = pin;
  World.add(world, this.pin);
}