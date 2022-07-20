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

export { notifySuccess, notifyError, api, numberOfProps };
