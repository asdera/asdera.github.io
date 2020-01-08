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
          title="Landing"
          subtitle={dummyText}
          segment="dark"
          dark={true}
          id="landing"
        />
        <Section
          title="Apps"
          subtitle={dummyText}
          segment="about"
          id="apps"
        />
        <Section
          title="Games"
          subtitle={dummyText}
          segment="dark"
          id="games"
        />
        <Section
          title="About"
          subtitle={dummyText}
          segment="about"
          id="about"
        />
        <Section
          title="Secret"
          subtitle={dummyText}
          segment="dark"
          id="secret"
        />
      </div>
    );
  }
}

export default App;
