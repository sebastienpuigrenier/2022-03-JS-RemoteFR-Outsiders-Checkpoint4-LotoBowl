import React, { useEffect, useState } from "react";

// import "./CalculGain.css";

function CalculGain({
  journeeIsClosed,
  somme,
  tdEquipe1,
  tdEquipe2,
  pariEgalite,
  pariVictoireE1,
  pariVictoireE2,
  coteEgalite,
  coteVEquipe1,
  coteVEquipe2,
  // totalDepense,
  // totalGain,
  // setTotalDepense,
  // setTotalGain,
}) {
  const [gain, setGain] = useState(0);
  // const [firstLog, setFirstLog] = useState(true);
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState("");
  useEffect(() => {
    switch (true) {
      case journeeIsClosed === 0:
        setGain(0);
        setUpdate(!update);
        setMessage("La journée n'est pas cloturée");
        break;
      case tdEquipe1 === tdEquipe2 && pariEgalite === 1:
        setGain(somme * coteEgalite);
        setMessage("Bien Joué");
        break;
      case tdEquipe1 > tdEquipe2 && pariVictoireE1 === 1:
        setGain(somme * coteVEquipe1);
        setMessage("Bien Joué");
        break;
      case tdEquipe1 < tdEquipe2 && pariVictoireE2 === 1:
        setGain(somme * coteVEquipe2);
        setMessage("Bien Joué");
        break;
      default:
        setGain(0);
        setUpdate(!update);
        setMessage("Bien fait pour ta bourse !");
    }
  }, [journeeIsClosed]);

  // useEffect(() => {
  //   if (firstLog) {
  //     setFirstLog(false);
  //     return;
  //   }
  //   setTotalGain(totalGain + gain);
  //   setTotalDepense(totalDepense + somme);
  // }, [gain, update]);

  return (
    <>
      <div className="calcul-gain-gain">
        <div>Gain :</div>
        <br />
        <div>{gain} po</div>
      </div>
      <div className="calcul-gain-résumé">{message}</div>
    </>
  );
}

export default CalculGain;
