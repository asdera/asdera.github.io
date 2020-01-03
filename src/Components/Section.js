import React from "react";
import Navbar from "./Navbar";
import Landing from "./landing";
import "./Section.css";

export default function Section({ title, subtitle, segment, id }) {
  return (
    <div className={"section section-" + segment}>
      
      {id === "landing" ? (
        <Landing 

        />
      ) : (
        <div className="section-content" id={id}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      )}
      <Navbar />
    </div>
  );
}


