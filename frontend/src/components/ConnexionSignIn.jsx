import React, { useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

function ConnexionLogIn() {
  const [infoCreate, setInfoCreate] = useState({});

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
  };

  return (
    <div className="connexion-sigin-container">
      <h2>Créer un compte</h2>
      <form
        className="connexion-fom-container"
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
            type="signin-email"
            name="email"
            id="signin-email"
            placeholder="Votre email"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="signin-password">
          <input
            type="signin-password"
            name="password"
            id="signin-password"
            placeholder="Mot de passe"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="signin-conf_password">
          <input
            type="signin-conf_password"
            name="conf_password"
            id="signin-conf_password"
            placeholder="Confirmer votre mot de passe"
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
