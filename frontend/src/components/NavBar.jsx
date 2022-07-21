import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Deconnexion } from "@services/services";

import { CgProfile } from "react-icons/cg";
import {
  MdLogout,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { IoList } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbFolderPlus, TbFolderX } from "react-icons/tb";

import logo from "@assets/fsc_ro10.png";

import ExportContext from "../contexts/Context";

import "@styles/NavBar.css";

function NavBar() {
  const windowWidth = window.innerWidth;
  const { infoUser, setInfoUser, isVisible, handleShowMenu } = useContext(
    ExportContext.Context
  );
  const [style, setStyle] = useState("nav-menu-is-visible");
  const navigate = useNavigate();

  useEffect(() => {
    handleShowMenu(!(windowWidth < 950));
    switch (true) {
      case isVisible && windowWidth < 950:
        setStyle("nav-menu-is-visible");
        break;
      default:
        setStyle("");
    }
  }, []);

  return (
    <nav className={style}>
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
          {!(infoUser.pseudo === null || infoUser.pseudo === undefined) ? (
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
      <div
        className="navbar-arrow"
        onClick={() => handleShowMenu(!isVisible)}
        role="button"
        tabIndex={0}
      >
        {isVisible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      <div
        className={`navbar-buttons ${isVisible ? "" : "navbar-display-none"}`}
      >
        <div
          role="button"
          tabIndex="0"
          className="button-para button-nav"
          onClick={() => {
            navigate("/liste_des_matchs");
            handleShowMenu(!(windowWidth < 950));
          }}
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
          onClick={() => {
            navigate("/recapitulatif");
            handleShowMenu(!(windowWidth < 950));
          }}
        >
          <p className="button-nav_desktop">Récap des paris</p>
          <p className="button-nav_mobil">
            <IoList />
          </p>
        </div>
        <div
          className={`navbar-admin-menu ${
            infoUser.isadmin === 1 ? "" : "navbar-display-none"
          }`}
        >
          <div
            role="button"
            tabIndex="0"
            className="button-para button-admin button-nav"
            onClick={() => {
              navigate("/backoffice/creation");
              handleShowMenu(!(windowWidth < 950));
            }}
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
            onClick={() => {
              navigate("/backoffice/finalisation");
              handleShowMenu(!(windowWidth < 950));
            }}
          >
            <p className="button-nav_desktop">Validation</p>
            <p className="button-nav_mobil">
              <TbFolderX />
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
