import React, { useEffect, useState } from "react";
import { api } from "@services/services";

import CalculGain from "@components/CalculGain";

import "@components/MatchCard/MatchCard.css";

function Recap() {
  const [listeJournee, setListeJournee] = useState([]);
  const [thisJournee, setThisJournee] = useState("");
  const [listeUsers, setListeUsers] = useState([]);
  const [thisUsers, setThisUsers] = useState("");
  const [parisToShow, setParisToShow] = useState({});
  const [listeParis, setListeParis] = useState([]);
  // const [totalDepense, setTotalDepense] = useState(0);
  // const [totalGain, setTotalGain] = useState(0);

  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeJournee(res.data);
    });
  }, []);
  /* eslint-enable */

  useEffect(() => {
    const ENDPOINT = "/browse_users";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeUsers(res.data);
    });
  }, []);
  /* eslint-enable */

  const handleChange = (e) => {
    setThisJournee(e.target.value);
    setParisToShow({
      ...parisToShow,
      journee_id: e.target.value,
    });
  };

  const handleChangeUser = (e) => {
    setThisUsers(e.target.value);
    setParisToShow({
      ...parisToShow,
      user_id: e.target.value,
    });
  };

  useEffect(() => {
    if (thisJournee === "" || thisUsers === "") {
      return;
    }

    const ENDPOINT = `/browse_by_journee_by_user/${thisJournee}/${thisUsers}`;

    api
      .get(ENDPOINT)
      .then((res) => {
        setListeParis(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [thisJournee, thisUsers]);
  return (
    <div className="match-list-container">
      <h1 className="title">Récapitulatif des paris</h1>
      <div className="match-recap-header">
        <div className="match-recap-header-select">
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
                // .filter((journee) => {
                //   return journee.is_closed;
                // })
                .map((journee) => {
                  return (
                    <option value={journee.id} id={journee.is_closed}>
                      {journee.numero} - {journee.nom}
                    </option>
                  );
                })}
            </select>
          </label>
        </div>
        <div className="match-recap-header-select">
          <h2>Choisir un utilisateur :</h2>
          <label htmlFor="utilisateur_id">
            <select
              className="select-menu"
              name="utilisateur_id"
              id="utilisateur_id"
              onChange={(e) => handleChangeUser(e)}
            >
              <option value="">--Choisir un utilisateur de la liste--</option>
              {listeUsers.map((user) => {
                return <option value={user.id}>{user.pseudo}</option>;
              })}
            </select>
          </label>
        </div>
      </div>
      {listeParis.map((pari) => {
        // setTotalDepense(totalDepense + parseFloat(pari.somme));
        return (
          <div className="match-card-container">
            <div>
              <div>
                {pari.nom_equipe1} coaché par {pari.coach_equipe1}
              </div>
              <div>VS</div>
              <div>
                {pari.nom_equipe2} coaché par {pari.coach_equipe2}
              </div>
            </div>
            <div className="match-recap-somme">
              <div>Somme dépensée :</div>
              <br />
              <div>{pari.somme} po</div>
            </div>
            <CalculGain
              journeeIsClosed={parseInt(pari.journeeisclosed)}
              somme={parseFloat(pari.somme)}
              tdEquipe1={parseFloat(pari.td_equipe_1)}
              tdEquipe2={parseFloat(pari.td_equipe_2)}
              pariEgalite={parseFloat(pari.pari_egalite)}
              pariVictoireE1={parseFloat(pari.pari_victoire_e1)}
              pariVictoireE2={parseFloat(pari.pari_victoire_e2)}
              coteEgalite={parseFloat(pari.cote_egalite)}
              coteVEquipe1={parseFloat(pari.cote_v_equipe_1)}
              coteVEquipe2={parseFloat(pari.cote_v_equipe_2)}
              // totalDepense={totalDepense}
              // totalGain={totalGain}
              // setTotalDepense={setTotalDepense}
              // setTotalGain={setTotalGain}
            />
          </div>
        );
      })}
      {/* <div className="match-card-container match-recap-recap">
        <div>Total Dépenses : {totalDepense} po</div>
        <div>Total Gains : {totalGain} po</div>
      </div> */}
    </div>
  );
}

export default Recap;
