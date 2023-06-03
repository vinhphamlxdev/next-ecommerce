import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8080",
});

export const AuthorizationHeader = (token: string) => {
  if (token) {
    axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosAuth.defaults.headers.common["Authorization"];
  }
};
