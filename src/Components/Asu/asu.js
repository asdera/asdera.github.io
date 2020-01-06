import Alphabet from "./alphabet";

class Asu {
    constructor(p5, pix, display) {
        this.nodes = [];
        this.connections = [];
        this.letters = [];
        this.pix = pix;
        this.mdel = -5;
        this.next = {
            x: 2,
            y: 2,
            colour: "white"
        }
        this.display = display;

        for (var i = 0; i <= p5.width; i += this.pix) {
            var row = [];
            for (var j = 0; j <= p5.height; j += this.pix) {
                // console.log(new Node(i, j))
                row.push(this.Node(i+this.display.x, j+this.display.y));
            }
            this.nodes.push(row);
        }
    }

    update(p5) {
        p5.blendMode(p5.LIGHTEST);
        this.letItGo(p5, p5.color(255, 0, 0), p5.PI/6);
        this.letItGo(p5, p5.color(0, 255, 0), 5*p5.PI/6);
        this.letItGo(p5, p5.color(0, 0, 255), 3*p5.PI/2);
        p5.blendMode(p5.BLEND);

        this.connections = this.connections.filter(x => x.reverse);
        this.letters = this.letters.filter(x => !x.erase);

        // p5.push();
        // p5.strokeWeight(3);
        // p5.stroke(this.next.colour);
        // p5.line(this.nodes[this.next.x][this.next.y].x - this.pix / 2, this.nodes[this.next.x][this.next.y].y, this.nodes[this.next.x][this.next.y].x - this.pix / 2, this.nodes[this.next.x][this.next.y + 4].y)
        // p5.pop();

        // if (this.f % 15 === 0) {
        //     if (this.next.colour === "white") {
        //         this.next.colour = p5.random(["purple", "blue", "magenta", "hotpink", "indigo", "navy"]);
        //     } else {
        //         this.next.colour = "white";
        //     }
        // }
    }

    Node(i, j) {
        
        var me = {};
        me.x = i;
        me.y = j;
        me.ox = i;
        me.oy = j;
        me.min = 2;
        me.max = 50;
        me.r = 0;
        me.grow = 0;
        me.reverse = 1;
        me.s = 1;
        me.d = 0.15;
        me.colour = 0;
        // this.cursor = function() {
        //     var dis = dist(this.ox, this.oy, mouseX, mouseY) / this.pix / 6;
        //     // var ang = atan2(mouseY - this.oy, mouseX - this.ox);
        //     var ang = atan2(this.oy - mouseY, this.ox - mouseX);
        //     this.x = this.ox + cos(ang) * exp(-dis * dis / 2) * this.pix / 2;
        //     this.y = this.oy + sin(ang) * exp(-dis * dis / 2) * this.pix / 2;
        // }
        return me;
    }

    Connection(i, j, ii, jj, c = 0, letter = null) {
        var me = {};
        me.a = this.nodes[i][j];
        me.b = this.nodes[ii][jj];
        me.ij = [i, j, ii, jj];
        me.a.colour = c;
        me.b.colour = c;
        me.control = 0;
        me.reach = 0;
        me.thick = 0;
        me.s = 0.025;
        me.t = 50;
        me.f = me.t;
        me.m = (jj - j) / (ii - i);
        me.p = -1 / me.m;
        me.check = [0.8, 0.7, 0.6];
        me.reverse = 0;
        me.colour = c;
        me.letter = letter;
        me.a.letter = me.letter;
        me.b.letter = me.letter;
        return me;
    }

    letItGo(p5, rain, zed=0) {
        for (var i = 0; i < this.connections.length; i++) {
            p5.push();
            var c = this.connections[i];
            var pa = c.a;
            var pb = c.b;
            var control;
            var reach;
            var offset;
            
            if (zed !== 0) {
                var dis = p5.dist(c.letter.x, c.letter.y, (p5.mouseX-this.display.x), (p5.mouseY-this.display.y)) / this.pix * 0.4;
                var ang = p5.atan2(c.letter.y - (p5.mouseY-this.display.y), c.letter.x - (p5.mouseX-this.display.x)) + zed;
                var str = (p5.exp(-dis * dis * 0.2) - p5.exp(-dis * dis * 32)) * 0.4;
                var x = p5.cos(ang) * str * this.pix;
                var y = p5.sin(ang) * str * this.pix;
                var a = p5.cos(ang*2+str) * str * p5.PI/8;
                p5.translate(this.display.x + c.letter.x, this.display.y + c.letter.y);
                p5.rotate(a);
                p5.translate(x - c.letter.x - this.display.x, y - c.letter.y - this.display.y);
            }
            p5.fill(rain);

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
            } else if ((c.f > 0 && c.reverse === 1) || (c.f <= c.t && c.reverse === this.mdel)) {
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
                if (c.reverse === this.mdel) {
                    c.f -= this.mdel;
                    pa.reverse = this.mdel;
                    pb.reverse = this.mdel;
                } else {
                    c.f--;
                    pa.reverse = 1;
                    pb.reverse = 1;
                }
            }

            // print(c.p, c.m);
            var sign = p5.abs(c.p) / c.p;
            sign = isNaN(sign) ? 1 : sign;
            offset = {
                x: sign * p5.sqrt(1 / (c.p ** 2 + 1)),
                y: p5.sqrt(1 / (c.m ** 2 + 1)),
            }

            // print(offset)

            if (c.f <= c.t * c.check[2]) {

                // strokeWeight(1);
                p5.beginShape();

                p5.vertex(pa.x + pa.r * offset.x, pa.y + pa.r * offset.y);
                p5.quadraticVertex((pa.x + pb.x) / 2 - (pb.r + pa.r) / 2 * (1 - c.thick) * offset.x, (pa.y + pb.y) / 2 - (pb.r + pa.r) / 2 * (1 - c.thick) * offset.y, pb.x + pb.r * offset.x, pb.y + pb.r * offset.y);
                p5.vertex(pb.x - pb.r * offset.x, pb.y - pb.r * offset.y);
                p5.quadraticVertex((pa.x + pb.x) / 2 + (pb.r + pa.r) / 2 * (1 - c.thick) * offset.x, (pa.y + pb.y) / 2 + (pb.r + pa.r) / 2 * (1 - c.thick) * offset.y, pa.x - pa.r * offset.x, pa.y - pa.r * offset.y);
                p5.endShape(p5.CLOSE);

            } else {
                // strokeWeight(1);
                var n = [pb, pa];

                for (var j = 0; j < 2; j++) {
                    // ellipse(n[j].x + n[j].r * offset.x, n[j].y + n[j].r * offset.y, 10);
                    p5.beginShape();
                    control = {
                        x: n[j].x + (n[(j + 1) % 2].x - n[j].x) * c.control,
                        y: n[j].y + (n[(j + 1) % 2].y - n[j].y) * c.control
                    }
                    reach = {
                        x: n[j].x + (n[(j + 1) % 2].x - n[j].x) * c.reach,
                        y: n[j].y + (n[(j + 1) % 2].y - n[j].y) * c.reach
                    }
                    p5.vertex(n[j].x + n[j].r * offset.x, n[j].y + n[j].r * offset.y);
                    p5.quadraticVertex(control.x, control.y, reach.x, reach.y);
                    p5.quadraticVertex(control.x, control.y, n[j].x - n[j].r * offset.x, n[j].y - n[j].r * offset.y);
                    p5.endShape(p5.CLOSE);
                }
            }


            p5.ellipse(pa.x, pa.y, pa.r * 2);
            p5.ellipse(pb.x, pb.y, pb.r * 2);
            p5.pop();
        }

        for (i = 0; i < this.nodes.length; i++) {
            var row = this.nodes[i];
            for (j = 0; j < row.length; j++) {
                var node = row[j];
                // node.cursor();
                if (node.grow) {
                    node.r += node.grow > 0 ? node.s * node.grow * node.reverse : node.d * node.grow * node.reverse;
                    node.grow = 0;
                }
            }
        }
    }

    Letter(p5, lines, c = 0, t = true) {
        var me = {};
        // console.log(lines);
        me.strokes = lines;
        me.connections = [];
        me.erase = false;
        me.react = this;
        me.next = {
            x: this.next.x,
            y: this.next.y
        };
        
        // print(me, lines, c, t)
        
        me.x = (me.next.x + (p5.min(me.strokes.map(x => x[0]).concat(me.strokes.map(x => x[2]))) + p5.max(me.strokes.map(x => x[0]).concat(me.strokes.map(x => x[2])))) / 2) * me.react.pix;
        me.y = (me.next.y + (p5.min(me.strokes.map(y => y[1]).concat(me.strokes.map(y => y[3]))) + p5.max(me.strokes.map(y => y[1]).concat(me.strokes.map(y => y[3])))) / 2) * me.react.pix;

        for (var i = 0; i < lines.length; i++) {
            me.connections.push(this.Connection(lines[i][0] + me.next.x, lines[i][1] + me.next.y, lines[i][2] + me.next.x, lines[i][3] + me.next.y, c, me));
        }

        this.connections = this.connections.concat(me.connections);

        me.type = function() {
            this.react.next.x += c === null ? 2 : p5.max(this.strokes.map(x => x[0]).concat(this.strokes.map(x => x[2]))) + 1;
            for (var i = 0; i < this.connections.length; i++) {
                // console.log(this)
                this.connections[i].reverse = 1;
            }
        }

        me.del = function() {
            this.react.next.x = this.next.x;
            this.react.next.y = this.next.y;
            for (var i = 0; i < this.connections.length; i++) {
                this.connections[i].reverse = this.mdel;
            }
            this.erase = true;
        }

        if (t) {
            me.type();
        }

        // me.react.letters.push(this);
        return me;
    }

    wordo(p5, s) {
        for (var i = 0; i < s.length; i++) {
            // print(s[i])
            if (s[i] === " ") {
                this.letters.push(this.Letter(p5, [], null, true));
            } else {
                this.letters.push(this.Letter(p5, Alphabet[s[i]], "black", true));
            }
        }
    }
}

export default Asu;