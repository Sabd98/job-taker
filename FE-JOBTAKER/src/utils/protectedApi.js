// api/axios.js
import axios from "axios";
import store from "@/store";
import { URL_API } from "./url";

const api = axios.create({
  baseURL: URL_API,
});

api.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default api;
