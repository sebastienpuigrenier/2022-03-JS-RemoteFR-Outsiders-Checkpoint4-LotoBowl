import React from "react";

function ConnexionLogIn() {
  return (
    <div className="connexion-sigin-container">
      <h2>Créer un compte</h2>
      <form className="connexion-fom-container" action="post">
        <label htmlFor="signin-pseudo">
          <input
            type="text"
            name="signin-pseudo"
            id="signin-pseudo"
            placeholder="Votre pseudo"
          />
        </label>
        <label htmlFor="signin-email">
          <input
            type="signin-email"
            name="signin-email"
            id="signin-email"
            placeholder="Votre email"
          />
        </label>
        <label htmlFor="signin-password">
          <input
            type="signin-password"
            name="signin-password"
            id="signin-password"
            placeholder="Mot de passe"
          />
        </label>
        <label htmlFor="signin-conf_password">
          <input
            type="signin-conf_password"
            name="signin-conf_password"
            id="signin-conf_password"
            placeholder="Confirmer votre mot de passe"
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
