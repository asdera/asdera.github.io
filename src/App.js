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
          more={false}
          id="landing"
        />
        <Section
          title="About"
          subtitle={siteText.about}
          dark={false}
          more={false}
          id="about"
        />
        <Section
          title="Games"
          subtitle={siteText.games}
          dark={true}
          more={false}
          id="games"
        />
        <Section
          title="Apps"
          subtitle={siteText.apps}
          dark={false}
          more={false}
          id="apps"
        />
        <Section
          title="Contact"
          subtitle={siteText.contact}
          dark={true}
          more={true}
          id="contact"
        />
      </div>
    );
  }
}

export default App;
