import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./Components/Navbar";
import Section from "./Components/Section";
import dummyText from "./DummyText";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Section
          title="Section 1"
          subtitle={dummyText}
          segment="dark"
          id="landing"
        />
        <Section
          title="Section 2"
          subtitle={dummyText}
          segment="apps"
          id="section2"
        />
        <Section
          title="Section 3"
          subtitle={dummyText}
          segment="dark"
          id="section3"
        />
        <Section
          title="Section 4"
          subtitle={dummyText}
          segment="about"
          id="section4"
        />
        <Section
          title="Section 5"
          subtitle={dummyText}
          segment="dark"
          id="section5"
        />
      </div>
    );
  }
}

export default App;
