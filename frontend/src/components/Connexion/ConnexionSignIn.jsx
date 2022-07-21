import React, { useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

import { IoCloseCircle, IoAddCircle } from "react-icons/io5";

function ConnexionLogIn() {
  const [infoCreate, setInfoCreate] = useState({});
  const [displayLogIn, setDisplayLogIn] = useState(false);

  const handleShowLogIn = () => {
    setDisplayLogIn(!displayLogIn);
  };

  const handleChange = (e) => {
    setInfoCreate({
      ...infoCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ENDPOINT = "/create_user";
    api
      .post(ENDPOINT, infoCreate)
      .then((res) => {
        notifySuccess(`Nouvel utilisateur créé : ${res.data.pseudo}`);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la connexion.");
        console.error(err.response.data);
      });
    e.target.reset();
    handleShowLogIn();
  };

  return (
    <div className="connexion-sigin-container">
      <div
        className="connexion-bar"
        onClick={handleShowLogIn}
        role="button"
        tabIndex="0"
      >
        <h2>Créer un compte</h2>
        <div className="connexion-plus_icon">
          <IoAddCircle className={`${displayLogIn ? "display_none" : ""}`} />
          <IoCloseCircle className={`${!displayLogIn ? "display_none" : ""}`} />
        </div>
      </div>
      <form
        className={`connexion-form-container ${
          !displayLogIn ? "display_none" : ""
        }`}
        action="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="signin-pseudo">
          <input
            type="text"
            name="pseudo"
            id="signin-pseudo"
            placeholder="Votre pseudo"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="signin-email">
          <input
            type="email"
            name="email"
            id="signin-email"
            placeholder="Votre email"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="signin-password">
          <input
            type="password"
            name="password"
            id="signin-password"
            placeholder="Mot de passe"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="signin-conf_password">
          <input
            type="password"
            name="conf_password"
            id="signin-conf_password"
            placeholder="Confirmer votre mot de passe"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button
          id="sign-in"
          className="button-para button-ok-demi"
          type="submit"
          required
        >
          <p>S'inscrire</p>
        </button>
      </form>
    </div>
  );
}

export default ConnexionLogIn;
