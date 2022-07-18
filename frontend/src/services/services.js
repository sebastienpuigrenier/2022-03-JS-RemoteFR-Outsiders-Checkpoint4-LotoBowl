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

export { notifySuccess, notifyError, api };
