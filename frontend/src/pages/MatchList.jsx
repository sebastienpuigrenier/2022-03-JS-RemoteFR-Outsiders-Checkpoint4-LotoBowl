import React, { useEffect, useState, useContext } from "react";
import {
  notifySuccess,
  notifyError,
  api,
  numberOfProps,
} from "@services/services";

import MatchCard from "@components/MatchCard/MatchCard";

import "@styles/MatchList.css";

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
  // const [update, setUpdate] = useState(false);

  // Need to refactor the 2 useEffect in one !!!

  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeJournee(res.data);
    });
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
      api.post(ENDPOINT, newParis).catch((err) => {
        notifyError("Une erreur s'est produite lors de l'enregistrement");
        console.error(err);
      });
    }
    notifySuccess("L'ensemble des paris ont été enregistré !");
    e.target.reset();
    setMatchs([]);
  };
  return (
    <div className="match-list-container">
      <h1 className="title">Placer un pari !</h1>
      <div className="match-list-regles">
        <h2>Rappel des règles des paris :</h2>
        <ul className="match-list-ul">
          <li className="match-list-li">
            Vous devez parier sur tous les matchs d'une journée
          </li>
          <li className="match-list-li">
            Vous devez parier au minimum 1.000 po par match
          </li>
          <li className="match-list-li">
            Les sommes parier seront prélevées dans votre trésorerie d'équipe
          </li>
          <li className="match-list-li">
            Vous devez avoir les fonds nécessaires dans votre trésorerie
          </li>
        </ul>
      </div>
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
            <option value="">-- Choisir une journée de la liste --</option>
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
          listeParis.push(match.id);
          return (
            <MatchCard
              journee={match.journee_id}
              equipe1={match.equipe1_id}
              equipe2={match.equipe2_id}
              handleChange={handleChangeRadio}
              handleChangeParis={handleChangeParis}
            />
          );
        })}
        <button className="button-para button-ok" type="submit">
          <p>Valider mes paris</p>
        </button>
      </form>
    </div>
  );
}

export default MatchList;
