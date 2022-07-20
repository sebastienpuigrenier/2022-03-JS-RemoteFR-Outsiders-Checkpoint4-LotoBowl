import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

function AdminCreationJournee() {
  const [listeJournee, setListeJournee] = useState([]);
  const [newJournee, setNewJournee] = useState({});

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
    setNewJournee({
      ...newJournee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ENDPOINT = "/create_journee";
    api
      .post(ENDPOINT, newJournee)
      .then((res) => {
        notifySuccess(
          `La journée ${res.data.numero} - ${res.data.nom} a été créée avec succès`
        );
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la création.");
        console.error(err.response.data);
      });
  };

  return (
    <div className="admincreation-journee">
      <div className="admincreation-journee-liste_journee">
        <h1>Gestion des journées !</h1>
        Liste des journées existantes :
        <ul>
          {listeJournee.map((journee) => {
            return (
              <li>
                {`Journée ${journee.numero} : ${journee.nom}${
                  journee.is_closed ? " - fermée" : ""
                }`}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="admincreation-journee-creation">
        <h1>Création d'une nouvelle journée :</h1>
        <form
          className="admincreation-journee-form"
          action="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="numero">
            <input
              type="number"
              name="numero"
              id="numero"
              placeholder="n° journee"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="nom">
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="nom de la journée"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button type="submit">Créer la journée !</button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreationJournee;
