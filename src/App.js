import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./Components/Navbar";
import Section from "./Components/Section";
import siteText from "./siteText";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Section
          title="Landing"
          subtitle={siteText.landing}
          dark={true}
          id="landing"
        />
        <Section
          title="About"
          subtitle={siteText.about}
          dark={false}
          id="about"
        />
        <Section
          title="Games"
          subtitle={siteText.games}
          dark={true}
          id="games"
        />
        <Section
          title="Apps"
          subtitle={siteText.apps}
          dark={false}
          id="apps"
        />
        <Section
          title="Secret"
          subtitle={siteText.secret}
          dark={true}
          id="secret"
        />
      </div>
    );
  }
}

export default App;
