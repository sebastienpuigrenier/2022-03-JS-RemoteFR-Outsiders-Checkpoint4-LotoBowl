import { api } from "@services/services";
import React, { useEffect, useState } from "react";

import "./MatchCard.css";

function MatchCard({ journee, equipe1, equipe2, handleChange }) {
  const [match, setMatch] = useState({});
  const [matchEquipe1, setMatchEquipe1] = useState({});
  const [matchEquipe2, setMatchEquipe2] = useState({});

  const matchId = `${journee}-${equipe1}-${equipe2}`;

  useEffect(() => {
    const ENDPOINTMATCH = `/view_match/${matchId}`;
    const ENDPOINTEQUIPE1 = `/browse_one_team/${equipe1}`;
    const ENDPOINTEQUIPE2 = `/browse_one_team/${equipe2}`;

    const promisematch = api.get(ENDPOINTMATCH);
    const promiseequipe1 = api.get(ENDPOINTEQUIPE1);
    const promiseequipe2 = api.get(ENDPOINTEQUIPE2);

    Promise.all([promisematch, promiseequipe1, promiseequipe2])
      .then((data) => {
        setMatch(data[0].data[0]);
        setMatchEquipe1(data[1].data[0]);
        setMatchEquipe2(data[2].data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="match-card-container">
      <div className="match-card-equipe recap-equipe1-mobil">
        <div>{matchEquipe1.nom}</div>
        coaché par {matchEquipe1.coach}
      </div>
      <div>
        <h2>Score :</h2>
        <div className="input-table">
          <input
            className="input-resultat"
            type="number"
            name={`td_e1-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            id={`td_e1-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            placeholder="TD(s)"
            onChange={(e) => handleChange(e)}
          />
          <h2> - </h2>
          <input
            className="input-resultat"
            type="number"
            name={`td_e2-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            id={`td_e2-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            placeholder="TD(s)"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <h2>Sorties infligées :</h2>
        <div className="input-table">
          <input
            className="input-resultat"
            type="number"
            name={`sortie_e1-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            id={`sortie_e1-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            placeholder="Sortie(s)"
            onChange={(e) => handleChange(e)}
          />
          <h2> - </h2>
          <input
            className="input-resultat"
            type="number"
            name={`sortie_e2-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            id={`sortie_e2-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
            placeholder="Sortie(s)"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="match-card-equipe recap-equipe2-mobil">
        <div>{matchEquipe2.nom}</div>
        <div>coaché par {matchEquipe2.coach}</div>
      </div>
      <h2>{journee.nom}</h2>
    </div>
  );
}

export default MatchCard;
