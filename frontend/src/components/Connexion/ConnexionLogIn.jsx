import React, { useState, useContext } from "react";
import { notifySuccess, notifyError, api } from "@services/services";
import { useNavigate } from "react-router-dom";

import { IoCloseCircle, IoAddCircle } from "react-icons/io5";
import ExportContext from "../../contexts/Context";

function ConnexionLogIn() {
  const navigate = useNavigate();
  const { setInfoUser } = useContext(ExportContext.Context);
  const [infoConnexion, setInfoConnexion] = useState({});
  const [displayLogIn, setDisplayLogIn] = useState(false);

  const handleShowLogIn = () => {
    setDisplayLogIn(!displayLogIn);
  };

  const handleChange = (e) => {
    setInfoConnexion({
      ...infoConnexion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ENDPOINT = "/login";
    api
      .post(ENDPOINT, infoConnexion)
      .then((res) => {
        setInfoUser({
          pseudo: res.data.pseudo,
          email: res.data.email,
          isadmin: res.data.isadmin,
        });
        sessionStorage.setItem(`pseudo`, res.data.pseudo);
        sessionStorage.setItem(`email`, res.data.email);
        sessionStorage.setItem(`isadmin`, res.data.isadmin);
        notifySuccess(`Vous êtes connecté en tant que ${res.data.pseudo}`);
        navigate("/");
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la connexion.");
        console.error(err.response.data);
      });
  };

  return (
    <div className="connexion-login-container">
      <div
        className="connexion-bar"
        onClick={handleShowLogIn}
        role="button"
        tabIndex="0"
      >
        <h2>Déjà membre ?</h2>
        <div className="connexion-plus_icon">
          <IoAddCircle className={`${displayLogIn ? "display_none" : ""}`} />
          <IoCloseCircle className={`${!displayLogIn ? "display_none" : ""}`} />
        </div>
      </div>
      <form
        className={`connexion-form-container ${
          !displayLogIn ? "display_none" : ""
        }`}
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button
          id="sign-in"
          className="button-validation"
          type="submit"
          required
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default ConnexionLogIn;
