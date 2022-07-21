import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Deconnexion } from "@services/services";

import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import logo from "@assets/fsc_ro10.png";

import ExportContext from "../contexts/Context";

import "@styles/NavBar.css";

function NavBar() {
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img
          className="navbar-logo-img"
          src={logo}
          alt="logo - retour à la home"
          onClick={() => navigate("/")}
        />
      </div>
      <h2>Fil Sanguinaire Choletais - LotoBowl</h2>
      <div className="navbar-logo">
        {infoUser.pseudo !== undefined ? (
          <MdLogout
            className="navbar-profil"
            onClick={() => Deconnexion(navigate, setInfoUser)}
          />
        ) : (
          <CgProfile
            className="navbar-profil"
            onClick={() => navigate("/connexion")}
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
