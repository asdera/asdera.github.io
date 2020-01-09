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
          dark={true}
          id="landing"
        />
        <Section
          title="Apps"
          subtitle={dummyText}
          dark={false}
          id="apps"
        />
        <Section
          title="Games"
          subtitle={dummyText}
          dark={true}
          id="games"
        />
        <Section
          title="About"
          subtitle={dummyText}
          dark={false}
          id="about"
        />
        <Section
          title="Secret"
          subtitle={dummyText}
          dark={true}
          id="secret"
        />
      </div>
    );
  }
}

export default App;
