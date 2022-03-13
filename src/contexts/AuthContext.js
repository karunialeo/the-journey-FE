import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {children}
    </LoginContext.Provider>
  );
};

export const RegisteredContext = createContext();

export const RegisteredProvider = ({ children }) => {
  const [registered, setRegistered] = useState(true);

  return (
    <RegisteredContext.Provider value={[registered, setRegistered]}>
      {children}
    </RegisteredContext.Provider>
  );
};
