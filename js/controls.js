// mouse = {
// 	x: 0,
// 	y: 0,
// 	selected: false
// }

// function mousePressed() {
// 	boxes.push(new Box(Bodies.rectangle(mouseX, mouseY, 40, 40, { restitution: 1 })));
// 	boxes.push(new Box(Bodies.circle(mouseX, mouseY, 20, { restitution: 0.4 })));
// 	mouse.x = mouseX;
// 	mouse.y = mouseY;
// }

// function mouseReleased() {
// 	if (mouseButton == LEFT) {
// 		if (mouseX == mouse.x && mouseY == mouse.y) {
// 			boxes.push(new Box(Bodies.circle(mouseX, mouseY, 40, { restitution: 0.8}), "orange"));
// 		} else if (abs(mouseX - mouse.x) * abs(mouseY - mouse.y) > 1000){
// 			boxes.push(new Box(Bodies.rectangle(min(mouseX, mouse.x) + abs(mouseX - mouse.x) / 2, min(mouseY, mouse.y) + abs(mouseY - mouse.y) / 2, abs(mouseX - mouse.x), abs(mouseY - mouse.y), { restitution: 0.8}), "darkgreen"));
// 		}
// 	} else {
// 		for (var i = boxes.length - 1; i >= 0; i--) {
// 			boxi = boxes[i];
// 			if (Vertices.contains(boxi.body.vertices, {x: mouse.x, y: mouse.y})) {
// 				boxi.rip();
// 			}

// 		}
// 	}
// }

// function keyPressed() {
// }

// function keyIsDown() {
// }