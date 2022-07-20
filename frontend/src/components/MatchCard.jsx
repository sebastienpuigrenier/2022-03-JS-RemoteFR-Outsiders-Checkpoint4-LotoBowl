import { api } from "@services/services";
import React, { useEffect, useState } from "react";

// import "./MatchCard.css";

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
    <div>
      <h2>{journee.nom}</h2>
      {matchEquipe1.nom} coaché par {matchEquipe1.coach} VS {matchEquipe2.nom}{" "}
      coaché par {matchEquipe2.coach}
      <fieldset>
        <legend>Choisissez un résultat:</legend>
        <div>
          <input
            type="radio"
            id={`paris-V1-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="V1"
            onChange={handleChange}
          />
          <label htmlFor={`paris-V1-${matchId}`}>
            1 / {match.cote_v_equipe_1}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id={`paris-E-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="E"
            onChange={handleChange}
          />
          <label htmlFor={`paris-E-${matchId}`}>
            N- / {match.cote_egalite}
          </label>
        </div>

        <div>
          <input
            type="radio"
            id={`paris-V2-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="V1"
            onChange={handleChange}
          />
          <label htmlFor={`paris-V2-${matchId}`}>
            2 / {match.cote_v_equipe_2}
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default MatchCard;
