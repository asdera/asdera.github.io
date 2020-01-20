import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./Navbar.css";

export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };



  render() {
    const navs = ["About", "Games", "Apps"]; // , "Contact"
    return (
      <nav className={"nav" + (this.props.landing ? " nav-landing" : "")} id="navbar">
        <div className="nav-content">
          {/* <img
            src={logo}
            className="nav-logo"
            alt="Logo"
            onClick={this.scrollToTop}
          /> */}
          <ul className="nav-items">
            {navs.map((value, index) => {
              return (
                <li className={"nav-item" + (this.props.dark ? " nav-dark" : " nav-light")} key={index}>
                  <Link
                    activeClass="active"
                    to={value.replace(/\s+/g, '-').toLowerCase()}
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    {value}
                  </Link>
                </li>
              )
            })}
            
            
          </ul>
        </div>
      </nav>
    );
  }
}
