import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./landing";
import Sketch from 'react-p5'
import "./Section.css";
import Asu from "./Asu/asu";
import Projects from "./projects";

export default class Section extends Component {
  constructor(props) {
      super(props);
      this.state = { dark: this.props.dark };
      this.handleClick = this.handleClick.bind(this);
      this.lighting = this.lighting.bind(this);
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth/2, window.innerHeight).parent(canvasParentRef)
    // p5.resizeCanvas(500, 500);
    p5.canvas.style.width = "100%";
    p5.canvas.style.height = "100%";
    var squeeze = p5.min(p5.width*0.7, p5.height*0.5);
    this.pix = squeeze/20;
    this.display = {
        x: p5.width/2-this.pix*(this.props.id.length === 4 ? 7.5 : 9.5),
        y: p5.height*0.1,
    }
    

    this.p5 = p5;
    this.title = new Asu(p5, this.pix, this.display, false);

    this.f = 0;
    
    this.bColor = {
      "about": p5.color(60, 10, 10),
      "games": p5.color(10, 60, 10),
      "apps": p5.color(10, 10, 60), 
      "secret": p5.color(100, 100, 100)
    }[this.props.id]

    this.color = {
      "about": p5.color(248, 102, 175),
      "games": p5.color(102, 248, 175),
      "apps": p5.color(102, 175, 248), 
      "secret": p5.color(200, 200, 200)
    }[this.props.id]
    
    console.log(this.color, this.props.id);

    this.flash = 1;
    this.select = 0;
    this.x = 50
    this.y = 50
    this.dark = this.state.dark;
      
  }

  draw = p5 => {
    p5.background(this.dark ? this.bColor : this.color);
    this.f++;
    
    if (this.f === 30) {
        this.title.wordo(p5, this.props.title);
    }

    this.title.update(p5, this.dark, this.dark ? 255 : 0);

    p5.noFill();
    p5.stroke(this.dark ? this.color : this.bColor);
    p5.strokeWeight(12);
    p5.line(this.display.x, this.display.y + this.pix*7, this.display.x + 2*(p5.width/2 - this.display.x), this.display.y + this.pix*7);
  
    p5.push();
    p5.noStroke();
    var dent = this.pix*2/3
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
    if (this.p5.abs(this.display.y + this.pix*7 - this.p5.mouseY) < 6) {
      this.dark = !this.dark;
      this.lighting(this.dark);
    }
  }

  lighting(d) {
    this.setState({
      dark: d
    })
  }



  render() {
    const colour = this.state.dark ? "colour-dark" : "colour-light";
    return (
      <div className={"section section-" + this.props.id}>
        
        {this.props.id === "landing" ? (
          <>
            <Landing 
              dark = {this.state.dark}
              lighting = {this.lighting}
            />
          </>
        ) : (
          <div className="section-container" id={this.props.id}>
            <div className="section-half section-details" onClick={this.handleClick}>
              <Sketch setup={this.setup} draw={this.draw} preload={this.preload} windowResized={this.windowResized}/>
              <div className="section-info">
                <h1 className={colour}>{this.props.title}</h1>
                <p className={colour}>
                  {this.props.subtitle}
                  {this.props.id === "about" && <a href={'https://asdera.github.io/Resume/AW%20RESUME.pdf'}>Resume.</a>}
                </p>
                <div className="section-drop">
                  <img src={"/images/" + this.props.id + "Me" + (this.state.dark ? "Dark" : "") + ".png"} alt=""/>
                </div>
              </div>
              <Navbar dark = {this.state.dark}/>
            </div>
            <div className="section-half section-content">
              {Projects[this.props.id] && (Projects[this.props.id].map((project, index) => {
                return (
                  <div className="project" key={index} id={project.id}>
                    <div className={"project-fade project-" + colour}>
                      <div className="project-inner">
                        <div className={colour + " project-title"}>
                          <h1>{project.name}</h1>
                        </div>
                        <div className={colour + " project-info"}>
                          {index}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }))}
            </div>
          </div>
        )}
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
}


