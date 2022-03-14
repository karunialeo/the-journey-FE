import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { globalTitle } from "../App";
import { RegisteredContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";
import { LogoWhite } from "../exports/expImages";
import { LoginModal, Modal, RegisterModal } from "../exports";

export default function Jumbotron() {
  const [open, setOpen] = useContext(ModalContext);
  const [registered, setRegistered] = useContext(RegisteredContext);

  return (
    <>
      <header className="relative">
        <div className="bg-jumbotron h-96 brightness-75 w-full bg-cover"></div>
        <div className="absolute px-2 md:px-20 top-0 py-4 w-full h-full">
          <nav className="flex justify-between items-center">
            <Link to="/">
              <img src={LogoWhite} alt="" />
            </Link>
            <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
              <button
                onClick={() => {
                  setOpen(!open);
                  setRegistered(true);
                }}
                className="text-white px-5 md:px-7 py-1 border border-white rounded-lg hover:bg-white hover:text-brand-blue duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setOpen(!open);
                  setRegistered(false);
                }}
                className="text-white px-5 md:px-7 py-1 bg-brand-blue border border-brand-blue rounded-lg hover:bg-blue-700 hover:border-blue-700 duration-200"
              >
                Sign Up
              </button>
            </div>
          </nav>

          <div className="text-white  pt-10">
            <h1 className="font-['Avenir-Roman'] text-3xl md:text-7xl mb-5">
              The Journey
              <br />
              you ever dreamed of.
            </h1>
            <p className="font-['Avenir-Book'] text-lg md:text-2xl">
              We made a tool so you can easily keep &#38; share your travel
              memories.
              <br />
              But there is a lot more
            </p>
          </div>
        </div>
      </header>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        children={registered ? <LoginModal /> : <RegisterModal />}
      />
    </>
  );
}
