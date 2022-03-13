import React, { Component, useContext, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/Firebase";

import { LoginContext, RegisteredContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { ModalContext } from "../../contexts/ModalContext";

import {
  GoogleIcon,
  LoginLeafIcon,
  LoginPinIcon,
} from "../../exports/expImages";

export default function RegisterModal() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [registered, setRegistered] = useContext(RegisteredContext);
  const [open, setOpen] = useContext(ModalContext);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const { fullname, email, phone, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLogin(true);
          } else {
            setIsLogin(false);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(this.state.form);

      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-8 py-10 font-['Product-Sans-Regular'] relative">
      <img src={LoginPinIcon} alt="pin" className="absolute top-0 left-0" />
      <img src={LoginLeafIcon} alt="pin" className="absolute top-0 right-0" />
      <div>
        <h2 className="mt-4 text-center text-3xl font-bold text-brand-red">
          Sign Up
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="font-bold">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={fullname}
              onChange={handleChange}
              className="mt-2 appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              className="mt-2 appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={handleChange}
              className="mt-2 appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              className="mt-2 appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div className="text-center space-y-3">
          <div>
            <p className="text-left font-bold">Or</p>
            <button className="flex justify-center items-center space-x-2 w-full text-center py-2 px-4 font-bold rounded-md border border-gray-700 text-gray-700 bg-white">
              <img src={GoogleIcon} alt="google" className="h-6" />
              <p>Sign In With Google</p>
            </button>
          </div>
          <button className="w-full text-center py-2 px-4 font-bold rounded-md text-white bg-brand-blue">
            Sign Up
          </button>
          <p className="text-sm text-brand-darkGray">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setRegistered(!registered)}
              className="font-bold"
            >
              Click Here
            </button>
          </p>
        </div>
      </form>
    </section>
  );
}
