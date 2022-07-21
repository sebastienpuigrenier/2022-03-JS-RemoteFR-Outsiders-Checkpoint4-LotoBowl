import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

function AdminCreationMatch(update) {
  const [newMatch, setNewMatch] = useState({});
  const [listeJournee, setListeJournee] = useState([]);
  const [listeEquipe, setListeEquipe] = useState([]);
  const [resumeJournee, setResumeJournee] = useState({});
  const [resumeEquipe1, setResumeEquipe1] = useState({});
  const [resumeEquipe2, setResumeEquipe2] = useState({});

  // Need to refactor the 2 useEffect in one !!!

  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeJournee(res.data);
    });
  }, [update]);
  /* eslint-enable */

  useEffect(() => {
    const ENDPOINT = "/browse_team";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeEquipe(res.data);
    });
  }, [update]);
  /* eslint-enable */

  useEffect(() => {
    if (
      newMatch.journee_id === undefined ||
      newMatch.equipe1_id === undefined ||
      newMatch.equipe2_id === undefined
    ) {
      return;
    }
    const ENDPOINTJOURNEE = `/browse_one_journee/${newMatch.journee_id}`;
    const ENDPOINTEQUIPE1 = `/browse_one_team/${newMatch.equipe1_id}`;
    const ENDPOINTEQUIPE2 = `/browse_one_team/${newMatch.equipe2_id}`;

    const promiseJournee = api.get(ENDPOINTJOURNEE);
    const promiseequipe1 = api.get(ENDPOINTEQUIPE1);
    const promiseequipe2 = api.get(ENDPOINTEQUIPE2);

    Promise.all([promiseJournee, promiseequipe1, promiseequipe2])
      .then((data) => {
        setResumeJournee(data[0].data[0]);
        setResumeEquipe1(data[1].data[0]);
        setResumeEquipe2(data[2].data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [newMatch]);

  const handleChange = (e) => {
    setNewMatch({
      ...newMatch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cote1 = 0;
    let cote2 = 0;
    let coteN = 0;
    switch (true) {
      case parseFloat(resumeEquipe1.cote_actuelle) -
        parseFloat(resumeEquipe2.cote_actuelle) >
        0.5:
        cote1 =
          parseFloat(resumeEquipe1.cote_actuelle) +
          parseFloat(resumeEquipe2.cote_actuelle);
        cote2 = parseFloat(resumeEquipe2.cote_actuelle);
        coteN = parseFloat(
          0.6 +
            (parseFloat(resumeEquipe1.cote_actuelle) +
              parseFloat(resumeEquipe2.cote_actuelle)) /
              2
        );
        break;
      case parseFloat(resumeEquipe2.cote_actuelle) -
        parseFloat(resumeEquipe1.cote_actuelle) >
        0.5:
        cote1 = parseFloat(resumeEquipe1.cote_actuelle);
        cote2 =
          parseFloat(resumeEquipe1.cote_actuelle) +
          parseFloat(resumeEquipe2.cote_actuelle);
        coteN = parseFloat(
          0.6 +
            (parseFloat(resumeEquipe1.cote_actuelle) +
              parseFloat(resumeEquipe2.cote_actuelle)) /
              2
        );
        break;
      default:
        cote1 = parseFloat(resumeEquipe1.cote_actuelle);
        cote2 = parseFloat(resumeEquipe2.cote_actuelle);
        coteN = parseFloat(
          0.6 +
            (parseFloat(resumeEquipe1.cote_actuelle) +
              parseFloat(resumeEquipe2.cote_actuelle)) /
              2
        );
    }
    /* eslint-disable */
    const matchToCreate = {
      id:
        newMatch.journee_id +
        "-" +
        newMatch.equipe1_id +
        "-" +
        newMatch.equipe2_id,
      equipe1_id: newMatch.equipe1_id,
      equipe2_id: newMatch.equipe2_id,
      journee_id: newMatch.journee_id,
      cote_v_equipe_1: cote1,
      cote_v_equipe_2: cote2,
      cote_egalite: coteN,
    };
    /* eslint-enable */
    const ENDPOINT = "create_match";
    api
      .post(ENDPOINT, matchToCreate)
      .then(() => {
        notifySuccess("Le match a été créé avec succès");
      })
      .catch((err) => {
        notifyError(
          "Un problème est survenu a la création du match. Vérfiez que le match n'existe pas déjà."
        );
        console.error(err);
      });
  };
  return (
    <div className="admincreation-match">
      <h2>Création d'un nouveau Match !</h2>
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
            {listeJournee.map((journee) => {
              return (
                <option value={journee.id}>
                  {journee.numero} - {journee.nom}
                </option>
              );
            })}
          </select>
        </label>
        <h2>Choisir une équipe</h2>
        <label htmlFor="equipe1_id">
          <select
            name="equipe1_id"
            id="equipe1_id"
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Choisir une équipe de la liste--</option>
            {listeEquipe
              // .filter((equipe) => {
              //   return equipe.id !== newMatch.equipe2_id;
              // })
              .map((equipe) => {
                return (
                  <option value={equipe.id}>
                    {equipe.nom} - {equipe.coach}
                  </option>
                );
              })}
          </select>
        </label>
        <p>VS</p>
        <h2>Choisir une équipe</h2>
        <label htmlFor="equipe2_id">
          <select
            name="equipe2_id"
            id="equipe2_id"
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Choisir une équipe de la liste--</option>
            {listeEquipe
              // .filter((equipe) => {
              //   return equipe.id !== newMatch.equipe1_id;
              // })
              .map((equipe) => {
                return (
                  <option value={equipe.id}>
                    {equipe.nom} - {equipe.coach}
                  </option>
                );
              })}
          </select>
        </label>
        <br />
        <button
          disabled={
            newMatch.equipe1_id === undefined ||
            newMatch.equipe2_id === undefined ||
            newMatch.journee_id === undefined ||
            newMatch.equipe1_id === newMatch.equipe2_id
              ? "disabled"
              : ""
          }
          type="submit"
        >
          Créer la journée !
        </button>
      </form>
      <h2>Résumé du match qui va être créé</h2>
      {resumeJournee.nom} - {resumeEquipe1.nom} vs {resumeEquipe2.nom}
      <br />
      {resumeEquipe1.cote_actuelle} vs {resumeEquipe2.cote_actuelle}
    </div>
  );
}

export default AdminCreationMatch;
