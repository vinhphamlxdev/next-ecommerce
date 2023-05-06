import axios from "axios";

export const axioAuth = axios.create({
  baseURL: "http://localhost:8080",
});

export const AuthorizationHeader = (token: string) => {
  if (token) {
    axioAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axioAuth.defaults.headers.common["Authorization"];
  }
};
