import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

export default function Home () {
    const history =useHistory();

    const handleClick = () => {
        history.push ("/order")
    }


  return (
  <div>
    <div className="home-banner">
      <div className="home-logo">
        <img src="/images/iteration-1-images/logo.svg" alt="Logo" />
        <p>KOD ACIKTIRIR <br /> PİZZA, DOYURUR</p>
      </div>
    </div>

    <div className="button-wrapper">
      <button className="aciktimButton" onClick={handleClick}>ACIKTIM</button>
    </div>
  </div>
);

};



