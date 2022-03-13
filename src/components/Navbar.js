import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

import { Jumbotron, Avatar } from "../exports";
import { user } from "../exports/expTempDB";
import { LogoBlack } from "../exports/expImages";
import { LoginContext } from "../contexts/AuthContext";

export default function Navbar() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const signGoogleOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLogin ? (
        <>
          <nav className="z-10 px-20 py-4 w-full fixed flex bg-gradient-to-b from-brand-white justify-between items-center shadow-xl">
            <Link to="/">
              <img src={LogoBlack} alt="" />
            </Link>
            <div className="flex items-center space-x-3">
              <span>Welcome Back, {user.fullname}!</span>
              <Avatar logout={signGoogleOut} />
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
