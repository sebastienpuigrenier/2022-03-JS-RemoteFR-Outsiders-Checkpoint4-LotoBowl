import React from "react";

import ConnexionLogIn from "@components/ConnexionLogIn";
import ConnexionSignIn from "@components/ConnexionSignIn";

import "./Connexion.css";

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
