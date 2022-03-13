import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { LoginProvider, RegisteredProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { UserProvider } from "./contexts/UserContext";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LoginProvider>
        <Router>
          <App />
        </Router>
      </LoginProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
