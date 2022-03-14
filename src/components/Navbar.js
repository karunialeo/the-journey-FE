import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/AuthContext";

import { Jumbotron, Avatar } from "../exports";
import { LogoBlack } from "../exports/expImages";

export default function Navbar() {
  const [state, dispatch] = useContext(UserContext);
  const [isLogin, setIsLogin] = useContext(LoginContext);

  let navigate = useNavigate();

  const signGoogleOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLogin ? (
        <>
          <nav className="z-10 px-20 py-4 w-full fixed flex bg-brand-white bg-opacity-80 justify-between items-center shadow-xl">
            <Link to="/">
              <img src={LogoBlack} alt="" />
            </Link>
            <div className="flex items-center space-x-3">
              <span>Welcome Back, {state.user.fullname}!</span>
              <Avatar logout={signGoogleOut} image={state.user.image} />
            </div>
          </nav>
          <div className="h-20"></div>
        </>
      ) : (
        <Jumbotron />
      )}
    </>
  );
}
