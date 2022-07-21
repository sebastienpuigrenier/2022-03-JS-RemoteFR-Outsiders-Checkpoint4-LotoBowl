import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";

function AdminCreationJournee({ update, handleUpdate }) {
  const [listeJournee, setListeJournee] = useState([]);
  const [newJournee, setNewJournee] = useState({});
  useEffect(() => {
    const ENDPOINT = "/browse_journee";
    /* eslint-disable */
    api.get(ENDPOINT).then((res) => {
      setListeJournee(res.data);
    });
  }, [update]);
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
        /* eslint-disable */
        /* eslint-enable */
        e.target.reset();
        handleUpdate();
      })
      .catch((err) => {
        notifyError("Une erreur s'est produite lors de la création.");
        console.error(err);
      });
  };
  return (
    <>
      <h1 className="title">Gestion des journées !</h1>
      <div className="admincreation-journee">
        <div className="admincreation-journee-liste_journee">
          <h2>Liste des journées existantes :</h2>
          <div className="admincreation-ul-container">
            <ul className="scroll4">
              {listeJournee.length < 1
                ? "Aucune journée enregistrée"
                : listeJournee
                    .sort((a, b) => {
                      const keyA = a.numero;
                      const keyB = b.numero;
                      if (keyA < keyB) return 1;
                      if (keyA > keyB) return -1;
                      return 0;
                    })
                    .map((journee) => {
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
        </div>
        <div className="admincreation-journee-creation">
          <h2>Création d'une nouvelle journée :</h2>
          <form
            className="admincreation-journee-form"
            action="post"
            onSubmit={(e) => handleSubmit(e)}
            onClick={handleUpdate}
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
            <button className="button-para button-ok-demi" type="submit">
              <p>Créer la journée !</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminCreationJournee;
