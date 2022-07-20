import React from "react";

import ConnexionLogIn from "@components/Connexion/ConnexionLogIn";
import ConnexionSignIn from "@components/Connexion/ConnexionSignIn";

import "@styles/Connexion.css";

function Connexion() {
  return (
    <>
      <h1>Bienvenu !</h1>
      <ConnexionLogIn />
      <ConnexionSignIn />
    </>
  );
}

export default Connexion;
