import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/order");
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <div className="home-content">
          <div className="logo-container">
            <img 
              src="/images/iteration-1-images/logo.svg" 
              alt="Teknolojik Yemekler" 
              className="logo"
            />
          </div>
          <div className="slogan">
            <p className="slogan-line">KOD ACIKTIRIR</p>
            <p className="slogan-line">PİZZA, DOYURUR</p>
          </div>
          <div className="pizza-separator"></div>
          <div className="order-button-container">
            <button className="order-button" onClick={handleClick}>
              ACIKTIM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



