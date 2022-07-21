import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Deconnexion } from "@services/services";

import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbFolderPlus, TbFolderX } from "react-icons/tb";

import logo from "@assets/fsc_ro10.png";

import ExportContext from "../contexts/Context";

import "@styles/NavBar.css";

function NavBar() {
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const navigate = useNavigate();
  return (
    <nav>
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
      <div>
        <div
          role="button"
          tabIndex="0"
          className="button-para button-nav"
          onClick={() => navigate("/liste_des_matchs")}
        >
          <p className="button-nav_desktop">Placer un pari</p>
          <p className="button-nav_mobil">
            <RiMoneyDollarCircleLine />
          </p>
        </div>
        <div
          role="button"
          tabIndex="0"
          className="button-para button-nav"
          onClick={() => navigate("/recapitulatif")}
        >
          <p className="button-nav_desktop">Récap des paris</p>
          <p className="button-nav_mobil">
            <IoList />
          </p>
        </div>
        <div
          role="button"
          tabIndex="0"
          className="button-para button-admin button-nav"
          onClick={() => navigate("/backoffice/creation")}
        >
          <p className="button-nav_desktop">Création</p>
          <p className="button-nav_mobil">
            <TbFolderPlus />
          </p>
        </div>
        <div
          role="button"
          tabIndex="0"
          className="button-para button-admin button-nav"
          onClick={() => navigate("/backoffice/finalisation")}
        >
          <p className="button-nav_desktop">Validation</p>
          <p className="button-nav_mobil">
            <TbFolderX />
          </p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
