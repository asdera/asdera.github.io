import React, { Component } from "react";
import "./landing.css";
import Sketch from 'react-p5'

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { width: props.width, height: props.height };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: this.state.width, height: this.state.height });
    }

    windowResized = p5 => {
        console.log("hey")
       
    }

    nodes = [];
    connections = [];
    letters = [];
    pix = 30;
    mdel = -5;
    next = {
    x: 2,
    y: 2,
    colour: "white"
    }

    wrap;

    Node(i, j) {
        this.x = i;
        this.y = j;
        this.ox = i;
        this.oy = j;
        this.min = 2;
        this.max = 50;
        this.r = 0;
        this.grow = 0;
        this.reverse = 1;
        this.s = 1;
        this.d = 0.1;
        this.colour = 0;
        // this.cursor = function() {
        //     var dis = dist(this.ox, this.oy, mouseX, mouseY) / pix / 6;
        //     // var ang = atan2(mouseY - this.oy, mouseX - this.ox);
        //     var ang = atan2(this.oy - mouseY, this.ox - mouseX);
        //     this.x = this.ox + cos(ang) * exp(-dis * dis / 2) * pix / 2;
        //     this.y = this.oy + sin(ang) * exp(-dis * dis / 2) * pix / 2;
        // }
    }

    Connection(i, j, ii, jj, c = 0, letter = null) {
        this.a = nodes[i][j];
        this.b = nodes[ii][jj];
        this.ij = [i, j, ii, jj];
        this.a.colour = c;
        this.b.colour = c;
        this.control = 0;
        this.reach = 0;
        this.thick = 0;
        this.s = 0.025;
        this.t = 50;
        this.f = this.t;
        this.m = (jj - j) / (ii - i);
        this.p = -1 / this.m;
        this.check = [0.8, 0.7, 0.6];
        this.reverse = 0;
        this.colour = c;
        this.letter = letter;
        this.a.letter = this.letter;
        this.b.letter = this.letter;
    }

    setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
        // p5.resizeCanvas(500, 500);
        p5.canvas.style.width = "100%";
        p5.canvas.style.height = "100%";
        
        for (var i = 0; i <= width; i += pix) {
            var row = [];
            for (var j = 0; j <= height; j += pix) {
            row.push(new Node(i, j));
            }
            nodes.push(row);
        }

        warp = width / pix - 2;
        
        
        // connections.push(
        //   new Connection(2, 1, 3, 5),
        //   new Connection(2, 1, 1, 5),
        //   new Connection(1, 5, 2, 5),
        //   new Connection(2, 3, 2, 5)
        // );
        
        // letters.push(new Letter(alphabet["A"], "black", true));
        wordo("Andrew");
    }

    f = 0;

    draw = (p5, canvasParentRef) => {
        f++;
        
        background(0);
        stroke(0);
        fill(0);
        strokeWeight(0);
        keys();
        pause = true;
        
        // for (var i = 0; i < letters.length; i++) {
        //   ellipse(letters[i].x, letters[i].y, 50);
        // }

        blendMode(ADD);
        letItGo(color(255, 0, 0), PI/6);
        letItGo(color(0, 255, 0), 5*PI/6);
        letItGo(color(0, 0, 255), 3*PI/2);
        blendMode(BLEND);

        connections = connections.filter(x => x.reverse);
        letters = letters.filter(x => !x.erase);

        push();
        strokeWeight(3);
        stroke(next.colour);
        line(nodes[next.x][next.y].x - pix / 2, nodes[next.x][next.y].y, nodes[next.x][next.y].x - pix / 2, nodes[next.x][next.y + 4].y)
        pop();

        if (f % 15 == 0) {
            if (next.colour == "white") {
            next.colour = random(["purple", "blue", "magenta", "hotpink", "indigo", "navy"]);
            } else {
            next.colour = "white";
            }
        }
    }

    letItGo(rain, zed=0) {
        for (var i = 0; i < connections.length; i++) {
            push();
            var c = connections[i];
            var pa = c.a;
            var pb = c.b;
            var control;
            var reach;
            var offset;
            
            if (zed != 0) {
            var dis = dist(c.letter.x, c.letter.y, mouseX, mouseY) / pix * 0.3;
            var ang = atan2(c.letter.y - mouseY, c.letter.x - mouseX) + zed;
            var str = (exp(-dis * dis) - exp(-dis * dis * 32)) * 0.4;
            x = cos(ang) * str * pix;
            y = sin(ang) * str * pix;
            a = cos(ang*2+str) * str * PI/12;
            translate(c.letter.x, c.letter.y);
            rotate(a);
            translate(x - c.letter.x, y - c.letter.y);
            }
            fill(rain);

            // print(pb.r);

            if (c.f > c.t) {
            c.control = 0;
            c.reach = 0;
            c.thick = 0;
            c.s = 0.025;
            c.t = 50;
            c.f = c.t;
            c.reverse = 0;
            pa.r = 0;
            pb.r = 0;
            } else if ((c.f > 0 && c.reverse == 1) || (c.f <= c.t && c.reverse == mdel)) {
            if (c.f > c.t * c.check[0]) {
                pa.grow = 0.25 / (1 - c.check[0]);
                pb.grow = 0.25 / (1 - c.check[0]);
            } else if (c.f > c.t * c.check[1]) {
                c.reach += 0.5 / c.t / (c.check[0] - c.check[1]) * c.reverse;
                pa.grow = -0.75 / c.check[0];
                pb.grow = -0.75 / c.check[0];
            } else if (c.f > c.t * c.check[2]) {
                c.control += 0.25 / c.t / (c.check[1] - c.check[2]) * c.reverse;
                pa.grow = -0.75 / c.check[0];
                pb.grow = -0.75 / c.check[0];
            } else {
                c.thick += 2 / c.t / c.check[2] * c.reverse;
                pa.grow = -0.75 / c.check[0];
                pb.grow = -0.75 / c.check[0];
            }
            if (c.reverse == mdel) {
                c.f -= mdel;
                pa.reverse = mdel;
                pb.reverse = mdel;
            } else {
                c.f--;
                pa.reverse = 1;
                pb.reverse = 1;
            }
        }

        // print(c.p, c.m);
        var sign = abs(c.p) / c.p;
        sign = isNaN(sign) ? 1 : sign;
        offset = {
        x: sign * sqrt(1 / (c.p ** 2 + 1)),
        y: sqrt(1 / (c.m ** 2 + 1)),
        }

        // print(offset)

        if (c.f <= c.t * c.check[2]) {

        // strokeWeight(1);
        beginShape();

        vertex(pa.x + pa.r * offset.x, pa.y + pa.r * offset.y);
        quadraticVertex((pa.x + pb.x) / 2 - (pb.r + pa.r) / 2 * (1 - c.thick) * offset.x, (pa.y + pb.y) / 2 - (pb.r + pa.r) / 2 * (1 - c.thick) * offset.y, pb.x + pb.r * offset.x, pb.y + pb.r * offset.y);
        vertex(pb.x - pb.r * offset.x, pb.y - pb.r * offset.y);
        quadraticVertex((pa.x + pb.x) / 2 + (pb.r + pa.r) / 2 * (1 - c.thick) * offset.x, (pa.y + pb.y) / 2 + (pb.r + pa.r) / 2 * (1 - c.thick) * offset.y, pa.x - pa.r * offset.x, pa.y - pa.r * offset.y);
        endShape(CLOSE);

        } else {
        // strokeWeight(1);
        var n = [pb, pa];

        for (var j = 0; j < 2; j++) {
            // ellipse(n[j].x + n[j].r * offset.x, n[j].y + n[j].r * offset.y, 10);
            beginShape();
            control = {
            x: n[j].x + (n[(j + 1) % 2].x - n[j].x) * c.control,
            y: n[j].y + (n[(j + 1) % 2].y - n[j].y) * c.control
            }
            reach = {
            x: n[j].x + (n[(j + 1) % 2].x - n[j].x) * c.reach,
            y: n[j].y + (n[(j + 1) % 2].y - n[j].y) * c.reach
            }
            vertex(n[j].x + n[j].r * offset.x, n[j].y + n[j].r * offset.y);
            quadraticVertex(control.x, control.y, reach.x, reach.y);
            quadraticVertex(control.x, control.y, n[j].x - n[j].r * offset.x, n[j].y - n[j].r * offset.y);
            endShape(CLOSE);
        }
        }


        ellipse(pa.x, pa.y, pa.r * 2);
        ellipse(pb.x, pb.y, pb.r * 2);

        pop();
    }

    for (var i = 0; i < nodes.length; i++) {
        var row = nodes[i];
        for (var j = 0; j < row.length; j++) {
        var node = row[j];
        // node.cursor();
        if (node.grow) {
            node.r += node.grow > 0 ? node.s * node.grow * node.reverse : node.d * node.grow * node.reverse;
            node.grow = 0;
        }
        }
    }
    }

    function Letter(lines, c = 0, t = true) {
    this.strokes = lines;
    this.connections = [];
    this.erase = false;

    this.next = {
        x: next.x,
        y: next.y
    };
    
    print(this, lines, c, t)
    
    this.x = (this.next.x + (min(this.strokes.map(x => x[0]).concat(this.strokes.map(x => x[2]))) + max(this.strokes.map(x => x[0]).concat(this.strokes.map(x => x[2])))) / 2) * pix;
    this.y = (this.next.y + (min(this.strokes.map(y => y[1]).concat(this.strokes.map(y => y[3]))) + max(this.strokes.map(y => y[1]).concat(this.strokes.map(y => y[3])))) / 2) * pix;

    for (var i = 0; i < lines.length; i++) {
        this.connections.push(new Connection(lines[i][0] + next.x, lines[i][1] + next.y, lines[i][2] + next.x, lines[i][3] + next.y, c, this));
    }


    connections = connections.concat(this.connections);

    this.type = function() {
        next.x += c == null ? 2 : max(this.strokes.map(x => x[0]).concat(this.strokes.map(x => x[2]))) + 1;
        if (next.x >= warp || c == "return") {
        // if (nodes[0][next.y].y > height - pix * 5) {
        //   return;
        // }
        next.y += 5;
        next.x = 2;
        }
        for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].reverse = 1;
        }
    }

    this.del = function() {
        next.x = this.next.x;
        next.y = this.next.y;
        for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].reverse = mdel;
        }
        this.erase = true;
    }

    if (t) {
        this.type();
    }

    letters.push(this);
    }


    function keys() {
    if (keyIsDown(68)) {
        connections[0].reach -= 0.01
    }
    if (keyIsDown(83)) {
        connections[0].reach += 0.01
        connections[0].control += 0.005
    }
    if (keyIsDown(87)) {
        connections[0].reach -= 0.01
        connections[0].control -= 0.005
    }
    }

    function keyTyped() {

    if (next.y + 5 < height / pix) {
        if (keyCode == 13) {
        letters.push(new Letter([], "return", true));
        return;
        }
        if (key == " ") {
        letters.push(new Letter([], null, true));
        return;
        }
        var colour = "black"; //random(["purple", "blue", "magenta", "hotpink", "indigo", "navy"]);
        // print(key);
        // print(colour);

        if (alphabet[key]) {
        letters.push(new Letter(alphabet[key], colour, true));
        } else {
        print(key);
        }
    }
    }


    function keyPressed() {
    if ((keyCode == BACKSPACE || keyCode == DELETE) && letters.length) {
        letters[letters.length - 1].del();
    }
    // if (key == 13) {
    //   letters.push(new Letter([], "return", true));
    //   return;
    // }
    }

    function wordo(s) {
    for (var i = 0; i < s.length; i++) {
        print(s[i])
        letters.push(new Letter(alphabet[s[i]], "black", true));
    }
    }

    // x = 50
    // y = 50
    // colors;
    // f;
    // select;
    // cursor;
    // dark = false;
    // mode=0;

    // setup = (p5, canvasParentRef) => {
    //     p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    //     // p5.resizeCanvas(500, 500);
    //     p5.canvas.style.width = "100%";
    //     p5.canvas.style.height = "100%";
        
    //     this.colors = [
    //         p5.color(255, 0, 0),
    //         p5.color(0, 255, 0),
    //         p5.color(0, 0, 255),
    //         p5.color(0, 255, 255),
    //         p5.color(255, 0, 255),
    //         p5.color(255, 255, 0),
    //     ];
        
    //     this.f = 1;
    //     this.select = 0;
    // }

    // draw = p5 => {
    //     p5.blendMode(p5.BLEND);
    //     p5.background(this.dark ? 0 : 255);
       
    //     p5.noStroke();
    //     p5.textSize(40);
    //     p5.textAlign(p5.CENTER);
    //     p5.fill(this.dark ? 255 : 0);
    //     p5.text("Andrew Wang", p5.width/2, p5.height/3);
        
    //     p5.blendMode(this.dark ? p5.MULTIPLY : p5.ADD);
    //     p5.noStroke();
    //     p5.fill(255, 255, 0);
    //     p5.ellipse(p5.mouseX, p5.mouseY, 64)

    //     if (this.f > 0) {
            
    //         p5.blendMode(this.dark ? p5.ADD : p5.MULTIPLY);
    
    //         p5.noFill();
    //         p5.strokeWeight(12);
    //         this.lineWave(p5);
    //         // circleWave();
    //         this.f--;
    //     } else {
    //         p5.blendMode(p5.BLEND);
    //         p5.noFill();
    //         p5.stroke(this.dark ? 255 : 0);
    //         p5.strokeWeight(12);
    //         p5.line(0, p5.height/2, p5.width, p5.height/2);
    //     }

    // }

    // handleClick() {
    //     this.dark = !this.dark;
    //     if (this.f === 0) {
    //         this.f = 180;
    //     }
    // }

    // lineWave(p5) {
    //     var a = [0, 0, 1, 2][this.select];
    //     var b = [1, 3, 3, 3][this.select];
    
    //     for (var i = a; i < 6; i+=b) {
    //         p5.stroke(this.colors[i]);
    //         p5.beginShape();
    //         for(var w = -20; w <= p5.width + 40; w += 20) {
    //             var h = p5.height / 2;
    //             h += 80 * p5.sin(w * 0.004 + (this.f-40) * 0.01 + i * p5.PI / 3) * p5.pow(p5.abs(p5.sin(w * 0.0008 + (this.f-40) * 0.015)), 60);
    //             p5.curveVertex(w, h);
    //         }    
    //         p5.endShape();
    //     }
    // }
    
    render() {    
        return (
            <>
                <Sketch setup={this.setup} draw={this.draw} />
                <div className="section-content" id="landing">
                    <div id="top" onClick={this.handleClick}>
                        <div className="inner">
                            {/* <h1>Andrew Wang</h1> */}

                            {/* <p>subtitle</p>
                            <p>subtitle</p> */}
                        </div>
                    </div>
                    <div id="bottom" onClick={this.handleClick}>

                    </div> 
                </div>
            </>
        );
    }
}