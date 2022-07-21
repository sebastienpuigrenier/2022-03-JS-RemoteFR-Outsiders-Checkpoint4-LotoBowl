import React, { useEffect, useState } from "react";

// import "./CalculGain.css";

function CalculGain({
  somme,
  tdEquipe1,
  tdEquipe2,
  pariEgalite,
  pariVictoireE1,
  pariVictoireE2,
  coteEgalite,
  coteVEquipe1,
  coteVEquipe2,
  totalDepense,
  totalGain,
  setTotalDepense,
  setTotalGain,
}) {
  const [gain, setGain] = useState(0);
  const [firstLog, setFirstLog] = useState(true);
  useEffect(() => {
    switch (true) {
      case tdEquipe1 === tdEquipe2 && pariEgalite === 1:
        setGain(somme * coteEgalite);
        break;
      case tdEquipe1 > tdEquipe2 && pariVictoireE1 === 1:
        setGain(somme * coteVEquipe1);
        break;
      case tdEquipe1 < tdEquipe2 && pariVictoireE2 === 1:
        setGain(somme * coteVEquipe2);
        break;
      default:
        setGain(0);
    }
  }, []);

  useEffect(() => {
    if (firstLog) {
      setFirstLog(false);
      return;
    }
    setTotalGain(totalGain + gain);
    setTotalDepense(totalDepense + somme);
  }, [gain]);

  return (
    <>
      <div>Gain :</div>
      <div>{gain}</div>
      <div>
        {gain > 0 ? "Bien Joué" : "Désolé, l'argent reste à la banque !"}
      </div>
    </>
  );
}

export default CalculGain;
