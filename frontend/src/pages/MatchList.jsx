import React, { useEffect, useState, useContext } from "react";
import {
  notifySuccess,
  notifyError,
  api,
  numberOfProps,
} from "@services/services";

import MatchCard from "@components/MatchCard";

import ExportContext from "../contexts/Context";

// import "./MatchList.css";

function MatchList() {
  const { infoUser } = useContext(ExportContext.Context);
  const [matchs, setMatchs] = useState([]);
  const [thisJournee, setThisJournee] = useState(0);
  const [listeJournee, setListeJournee] = useState([]);
  const listeParis = [];
  const [listeSommes, setListeSommes] = useState({});
  const [listeChoix, setListeChoix] = useState({});

  // Need to refactor the 2 useEffect in one !!!

  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api
      .get(ENDPOINT)
      .then((res) => {
        setListeJournee(res.data)
      })
  }, []);
  /* eslint-enable */

  const handleChange = (e) => {
    setThisJournee(e.target.value);
  };

  const handleChangeRadio = (e) => {
    setListeChoix({
      ...listeChoix,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeParis = (e) => {
    setListeSommes({ ...listeSommes, [e.target.name]: e.target.value });
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      numberOfProps(listeParis) !== listeParis.length ||
      numberOfProps(listeSommes) !== listeParis.length
    ) {
      notifyError("Vous n'avez pas parié correctement sur tous les matchs !");
      return;
    }

    for (let i = 0; i < listeParis.length; i++) {
      const ENDPOINT = "/new_bet";
      const newParis = {
        email: infoUser.email,
        match_id: listeParis[i],
        somme: listeSommes[`paris-${listeParis[i]}`],
        pari_victoire_e1:
          listeChoix[`radio-paris-${listeParis[i]}`] === "V1" ? 1 : 0,
        pari_victoire_e2:
          listeChoix[`radio-paris-${listeParis[i]}`] === "V2" ? 1 : 0,
        pari_egalite:
          listeChoix[`radio-paris-${listeParis[i]}`] === "E" ? 1 : 0,
      };
      api
        .post(ENDPOINT, newParis)
        .then(() => {
          notifySuccess("L'ensemble des paris ont été enregistré !");
        })
        .catch((err) => {
          notifyError("Une erreur s'est produite lors de l'enregistrement");
          console.error(err);
        });
    }
  };
  return (
    <>
      <form
        className="admincreation-match-form"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2>Choisir une journée :</h2>
        <label htmlFor="journee_id">
          <select
            name="journee_id"
            id="journee_id"
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Choisir une journée de la liste--</option>
            {listeJournee
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
          listeParis.push(match.id);
          return (
            <div>
              <MatchCard
                journee={match.journee_id}
                equipe1={match.equipe1_id}
                equipe2={match.equipe2_id}
                handleChange={handleChangeRadio}
              />
              <label htmlFor="paris">
                <input
                  type="number"
                  name={`paris-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
                  id={`paris-${match.journee_id}-${match.equipe1_id}-${match.equipe2_id}`}
                  placeholder="1.000 po minimum"
                  onChange={(e) => handleChangeParis(e)}
                />
              </label>
            </div>
          );
        })}
        <button type="submit">Valider mes paris</button>
      </form>
      <div>To deleted if not needed</div>
    </>
  );
}

export default MatchList;
