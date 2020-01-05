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

    x = 50
    y = 50
    colors;
    f;
    select;
    cursor;
    dark = false;
    mode=0;
    j;

    setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
        // p5.resizeCanvas(500, 500);
        p5.canvas.style.width = "100%";
        p5.canvas.style.height = "100%";
        
        this.colors = [
            p5.color(255, 0, 0),
            p5.color(0, 255, 0),
            p5.color(0, 0, 255),
            p5.color(0, 255, 255),
            p5.color(255, 0, 255),
            p5.color(255, 255, 0),
        ];
        
        this.f = 1;
        this.select = 0;
    }

    draw = p5 => {
        p5.blendMode(p5.BLEND);
        p5.background(this.dark ? 0 : 255);
       
        p5.noStroke();
        p5.textSize(40);
        p5.textAlign(p5.CENTER);
        p5.fill(this.dark ? 255 : 0);
        p5.text("Andrew Wang", p5.width/2, p5.height/3);
        
        p5.blendMode(this.dark ? p5.MULTIPLY : p5.ADD);
        p5.noStroke();
        p5.fill(255, 255, 0);
        p5.ellipse(p5.mouseX, p5.mouseY, 64)

        if (this.f > 0) {
            
            p5.blendMode(this.dark ? p5.ADD : p5.MULTIPLY);
    
            p5.noFill();
            p5.strokeWeight(12);
            this.lineWave(p5);
            // circleWave();
            this.f--;
        } else {
            p5.blendMode(p5.BLEND);
            p5.noFill();
            p5.stroke(this.dark ? 255 : 0);
            p5.strokeWeight(12);
            p5.line(0, p5.height/2, p5.width, p5.height/2);
        }

    }

    handleClick() {
        this.dark = !this.dark;
        if (this.f === 0) {
            this.f = 180;
        }
    }

    lineWave(p5) {
        var a = [0, 0, 1, 2][this.select];
        var b = [1, 3, 3, 3][this.select];
    
        for (var i = a; i < 6; i+=b) {
            p5.stroke(this.colors[i]);
            p5.beginShape();
            for(var w = -20; w <= p5.width + 40; w += 20) {
                var h = p5.height / 2;
                h += 80 * p5.sin(w * 0.004 + (this.f-40) * 0.01 + i * p5.PI / 3) * p5.pow(p5.abs(p5.sin(w * 0.0008 + (this.f-40) * 0.015)), 60);
                p5.curveVertex(w, h);
            }    
            p5.endShape();
        }
    }
    
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