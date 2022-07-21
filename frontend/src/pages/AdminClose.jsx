import React, { useEffect, useState } from "react";
import {
  notifySuccess,
  notifyError,
  api,
  numberOfProps,
} from "@services/services";

import MatchResultCard from "@components/MatchCard/MatchResultCard";

// import "./AdminClose.css";

function AdminClose() {
  const [listeJournee, setListeJournee] = useState([]);
  const [thisJournee, setThisJournee] = useState(0);
  const listeMatch = [];
  const [matchs, setMatchs] = useState([]);
  const [resultats, setResultats] = useState([]);

  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeJournee(res.data);
    });
  }, []);
  /* eslint-enable */

  useEffect(() => {
    const ENDPOINT = `/view_matchs/${thisJournee}`;
    api
      .get(ENDPOINT)
      .then((res) => {
        setMatchs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [thisJournee]);

  const handleChange = (e) => {
    setThisJournee(e.target.value);
  };

  const handleChangeResultat = (e) => {
    setResultats({
      ...resultats,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numberOfProps(resultats) !== listeMatch.length * 4) {
      notifyError("Vous n'avez pas renseigné tous les matchs !");
      return;
    }

    for (let i = 0; i < listeMatch.length; i++) {
      const ENDPOINT = "/update_match";
      const updateMatch = {
        id: listeMatch[i],
        td_equipe_1: resultats[`td_e1-${listeMatch[i]}`],
        td_equipe_2: resultats[`td_e2-${listeMatch[i]}`],
        sorties_equipe_1: resultats[`sortie_e1-${listeMatch[i]}`],
        sorties_equipe_2: resultats[`sortie_e2-${listeMatch[i]}`],
      };
      api
        .post(ENDPOINT, updateMatch)
        .then(() => {
          notifySuccess("Le match a été mis à jour !");
        })
        .catch((err) => {
          notifyError("Une erreur s'est produite lors de l'enregistrement");
          console.error(err);
        });
    }

    const ENDPOINT = `/close_journee/${thisJournee}`;
    api
      .post(ENDPOINT)
      .then(() => {
        notifySuccess("La journée a été cloturée");
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de l'enregistrement");
        console.error(err);
      });
  };

  return (
    <div className="match-list-container">
      <h1 className="title">Finalisation des journées</h1>
      <form
        className="admincreation-match-form"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2>Choisir une journée :</h2>
        <label htmlFor="journee_id">
          <select
            className="select-menu"
            name="journee_id"
            id="journee_id"
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Choisir une journée de la liste--</option>
            {listeJournee
              .sort((a, b) => {
                const keyA = a.numero;
                const keyB = b.numero;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              })
              .filter((journee) => {
                return !journee.is_closed;
              })
              .map((journee) => {
                return (
                  <option value={journee.id}>
                    {journee.numero} - {journee.nom}
                  </option>
                );
              })}
          </select>
        </label>

        {matchs.map((match) => {
          listeMatch.push(match.id);
          return (
            <div>
              <MatchResultCard
                journee={match.journee_id}
                equipe1={match.equipe1_id}
                equipe2={match.equipe2_id}
                handleChange={handleChangeResultat}
              />
            </div>
          );
        })}
        <button className="button-para button-ok" type="submit">
          <p>Clore la journée et envoyer les résultats</p>
        </button>
      </form>
    </div>
  );
}

export default AdminClose;
