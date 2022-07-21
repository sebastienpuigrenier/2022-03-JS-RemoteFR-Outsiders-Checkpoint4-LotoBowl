import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const notifySuccess = (message) => {
  toast.success(`Bravo : ${message}`);
};

const notifyError = (message) => {
  toast.error(`Erreur : ${message}`);
};

const numberOfProps = (object) => {
  let count = 0;
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      count++;
    }
  }
  return count;
};

const Deconnexion = (navigate, setInfoUser) => {
  const ENDPOINTDECONNEXION = "/logout";
  api.post(ENDPOINTDECONNEXION).then((status) => {
    if (status.status === 200) {
      setInfoUser({});
      sessionStorage.removeItem(`pseudo`);
      sessionStorage.removeItem(`email`);
      sessionStorage.removeItem(`isadmin`);
      navigate("/");
      notifySuccess("Déconnexion réussie !");
    }
  });
};

export { notifySuccess, notifyError, api, numberOfProps, Deconnexion };
