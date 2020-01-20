import React, { Component } from "react";
import "./landing.css";
import Sketch from 'react-p5'
import Asu from "./Asu/asu";
import Navbar from "./Navbar";

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth, height: window.innerHeight };
        this.handleClick = this.handleClick.bind(this);
        this.dark = true;
    }


    preload = p5 => {
        this.mountains = p5.loadImage("/images/landingMe" + (this.dark ? "Dark" : "") + ".png");
        this.genera = p5.loadFont('/fonts/Genera-AltLight.ttf');
    }

    windowResized = p5 => {
    }
    
    setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
        // p5.resizeCanvas(500, 500);
        p5.canvas.style.width = "100%";
        p5.canvas.style.height = "100%";
        var squeeze = p5.min(p5.width*0.7, p5.height);
        this.pix = squeeze/25;

        this.display = {
            x: p5.width/2-this.pix*17.5,
            y: 0,
        }
        

        this.p5 = p5;
        this.title = new Asu(p5, this.pix, this.display);

        this.f = 0;
        this.colors = [
            p5.color(255, 0, 0),
            p5.color(0, 255, 0),
            p5.color(0, 0, 255),
            p5.color(0, 255, 255),
            p5.color(255, 0, 255),
            p5.color(255, 255, 0),
        ];
        
        this.flash = 1;
        this.select = 0;
        this.x = 50
        this.y = 50
        this.dark = true;
        this.andrew = "Andrew Wang".split("").reverse();
        p5.imageMode(p5.CENTER);
        p5.textFont(this.genera);
    }

    draw = p5 => {
        this.f++;
        
        if (this.f === 30) {
            this.title.wordo(p5, "Welcome,");
        } else if (this.f === 60) {
            this.title.wordo(p5, " I'm");
        }

        if (this.f % 5 === 0 && this.f > 80 && this.f <= 140) {
            this.title.delete();
        } else if (this.f % 5 === 0 && this.f > 155 && this.f <= 210) {
            this.title.wordo(p5, this.andrew.pop());
        } else if (this.f === 220) {
            if (this.flash === 0) {
                this.flash = 180;
            }
        }

        p5.push();
        p5.blendMode(p5.BLEND);
        p5.background(this.dark ? 0 : 255);
        var mount = 0.15;
        p5.image(this.mountains, p5.width/2, p5.max(p5.height*(1-mount), p5.height*(0.5-mount)+p5.mouseY), p5.height*mount*12, p5.height*mount*2);

        // p5.background(this.dark ? 0 : 255, 100);

        if (this.f > 220) {
            p5.noStroke();
            p5.textSize(48);
            p5.textAlign(p5.CENTER);
            p5.fill(this.dark ? 255 : 0, p5.min(255, (this.f-220)*2));
            p5.text("Computer Science and Math Enthusiast", p5.width/2, p5.height/3);
        }

        this.title.update(p5, this.dark);
       
        // p5.noStroke();
        // p5.textSize(40);
        // p5.textAlign(p5.CENTER);
        // p5.fill(this.dark ? 255 : 0);
        // p5.text("Andrew Wang", p5.width/2, p5.height/3);
        
        // p5.blendMode(this.dark ? p5.DARKEST : p5.LIGHTEST);
        // p5.noStroke();
        // p5.fill(255, 255, 0);
        // p5.ellipse(p5.mouseX, p5.mouseY, 64)

        if (this.flash > 0) {
            
            p5.blendMode(this.dark ? p5.LIGHTEST : p5.DARKEST);
    
            p5.noFill();
            p5.strokeWeight(12);
            this.lineWave(p5);
            // circleWave();
            this.flash--;
        } else {
            p5.blendMode(p5.BLEND);
            p5.noFill();
            p5.stroke(this.dark ? 255 : 0);
            p5.strokeWeight(12);
            p5.line(0, p5.height/2, p5.width*1.2, p5.height/2);
        }
        p5.pop();
        
        p5.push();
        p5.noStroke();
        var dent = this.pix*0.6;
        p5.fill(72, 18)
        p5.quad(0, 0, p5.width, 0, p5.width-dent, dent, dent, dent);
        p5.fill(72, 16)
        p5.quad(p5.width, 0, p5.width-dent, dent, p5.width-dent, p5.height-dent, p5.width, p5.height);
        p5.fill(72, 12)
        p5.quad(dent, p5.height-dent, 0, p5.height, p5.width, p5.height, p5.width-dent, p5.height-dent);
        p5.fill(72, 10)
        p5.quad(dent, p5.height-dent, 0, p5.height, 0, 0, dent, dent);
        p5.pop();
    }

    handleClick() {
        // console.log
        // this.title.delete(); 
        if (this.p5) {
            if (this.p5.abs(this.p5.height/2 - this.p5.mouseY) < 6) {
                this.dark = !this.dark;
                this.props.lighting(this.dark);
            }
            if (this.flash === 0) {
                this.flash = 180;
            }
        }
    }

    lineWave(p5) {
        var a = [0, 0, 1, 2][this.select];
        var b = [1, 3, 3, 3][this.select];
    
        for (var i = a; i < 6; i+=b) {
            p5.stroke(this.colors[i]);
            p5.beginShape();
            var sec = p5.width/100;
            for(var w = -90; w <= 2180; w += 80) {
                var h = p5.height / 2;
                h += 80 * p5.sin(w * 0.004 + (this.flash-40) * 0.01 + i * p5.PI / 3) * p5.pow(p5.abs(p5.sin(w * 0.0008 + (this.flash-40) * 0.015)), 60);
                p5.curveVertex(w*sec/20, h);
            }    
            p5.endShape();
        }
    }

    leaf(p5, x, y, r) {
        p5.push();

        p5.pop();
    }
    
    render() {    
        return (
            <>
                <Sketch setup={this.setup} draw={this.draw} preload={this.preload} windowResized={this.windowResized}/>
                <div className="section-content" id="landing">
                    <div id="top" onClick={this.handleClick}>
                        <div className="inner">
                            {/* <h1>Andrew Wang</h1> */}

                            {/* <p>subtitle</p>
                            <p>subtitle</p> */}
                        </div>
                    </div>
                    <div id="bottom" onClick={this.handleClick}>
                        <Navbar landing={true} dark={this.dark}/>
                    </div> 
                </div>
            </>
        );
    }
}