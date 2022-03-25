import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_URL ||
    "https://the-journey-app.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};

export const checkUser = async (email) => {
  const form = {
    email,
  };
  // Configuration
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Data body
  const body = JSON.stringify(form);

  const response = await API.post("/user", body, config);

  return response;
};
