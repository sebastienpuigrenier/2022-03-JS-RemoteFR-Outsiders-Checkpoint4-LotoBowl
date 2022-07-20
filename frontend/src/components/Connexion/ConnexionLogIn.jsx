import React, { useState, useContext } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

import ExportContext from "../../contexts/Context";

function ConnexionLogIn() {
  const { setInfoUser } = useContext(ExportContext.Context);
  const [infoConnexion, setInfoConnexion] = useState({});

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
        });
        sessionStorage.setItem(`pseudo`, res.data.pseudo);
        sessionStorage.setItem(`email`, res.data.email);
        notifySuccess(`Vous êtes connecté en tant que ${res.data.pseudo}`);
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la connexion.");
        console.error(err.response.data);
      });
  };

  return (
    <div className="connexion-login-container">
      <h2>Déjà membre ?</h2>
      <form
        className="connexion-form-container"
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
          id="log-in"
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
