import React from "react";

import ConnexionLogIn from "@components/Connexion/ConnexionLogIn";
import ConnexionSignIn from "@components/Connexion/ConnexionSignIn";

import "@styles/Connexion.css";

function Connexion() {
  return (
    <div className="connexion-container">
      <h1>Bienvenu !</h1>
      <div className="connexion-forms-container">
        <ConnexionLogIn />
        <ConnexionSignIn />
      </div>
    </div>
  );
}

export default Connexion;
