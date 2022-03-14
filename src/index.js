import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { LoginProvider, RegisteredProvider } from "./contexts/AuthContext";
import { ContextProviders } from "./contexts/ContextProviders";
import { ModalProvider } from "./contexts/ModalContext";
import { UserProvider } from "./contexts/UserContext";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ContextProviders>
      <Router>
        <App />
      </Router>
    </ContextProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
