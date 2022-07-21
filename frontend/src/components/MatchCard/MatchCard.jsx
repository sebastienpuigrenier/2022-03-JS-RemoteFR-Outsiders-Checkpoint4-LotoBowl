import { api } from "@services/services";
import React, { useEffect, useState } from "react";

import "./MatchCard.css";

function MatchCard({
  journee,
  equipe1,
  equipe2,
  handleChange,
  handleChangeParis,
}) {
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
      <div className="pari-bloc">
        <div className="match-card-equipe">
          <div>{matchEquipe1.nom}</div>
          coaché par {matchEquipe1.coach}
        </div>
        <div className="vs">VS</div>
        <div>
          <div>{matchEquipe2.nom}</div>
          <div>coaché par {matchEquipe2.coach}</div>
        </div>
      </div>
      <ul className="match-card-field">
        <li>
          <input
            type="radio"
            id={`paris-V1-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="V1"
            onChange={handleChange}
          />
          <label htmlFor={`paris-V1-${matchId}`}>
            1 // {match.cote_v_equipe_1}
          </label>
        </li>
        <li>
          <input
            type="radio"
            id={`paris-E-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="E"
            onChange={handleChange}
          />
          <label htmlFor={`paris-E-${matchId}`}>
            N // {match.cote_egalite}
          </label>
        </li>

        <li>
          <input
            type="radio"
            id={`paris-V2-${matchId}`}
            name={`radio-paris-${matchId}`}
            value="V1"
            onChange={handleChange}
          />
          <label htmlFor={`paris-V2-${matchId}`}>
            2 // {match.cote_v_equipe_2}
          </label>
        </li>
      </ul>
      <label htmlFor="paris" className=" pari-bloc match-card-label">
        <input
          type="number"
          name={`paris-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
          id={`paris-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
          placeholder="1.000 po minimum"
          onChange={handleChangeParis}
        />
      </label>
    </div>
  );
}

export default MatchCard;
