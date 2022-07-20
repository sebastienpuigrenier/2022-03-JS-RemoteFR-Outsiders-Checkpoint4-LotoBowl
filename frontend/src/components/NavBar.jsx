import React from "react";

import { CgProfile } from "react-icons/cg";
import logo from "@assets/fsc_ro10.png";

import "@styles/NavBar.css";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img
          className="navbar-logo-img"
          src={logo}
          alt="logo - retour à la home"
        />
      </div>
      <h2>Fil Sanguinaire Choletais - LotoBowl</h2>
      <CgProfile className="navbar-profil" />
    </div>
  );
}

export default NavBar;
