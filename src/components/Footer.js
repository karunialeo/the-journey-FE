import React from "react";
import { LogoBlack } from "../exports/expImages";
export default function Footer() {
  return (
    <>
      <div className=" bg-gradient-to-t from-brand-darkGray pt-6 pb-12">
        <div className="mx-auto container flex flex-col items-center justify-center">
          <div>
            <img src={LogoBlack} alt="" />
          </div>
          <div className="text-black flex flex-col md:items-center">
            {/* <h1 className="text-2xl font-black py-6">
              The Journey you ever dreamed of.
            </h1> */}
            {/* <div className="my-6 text-base text-color f-f-l">
              <ul className="md:flex items-center">
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Home</li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Features
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Pricing
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Careers
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Help</li>
                <li className="cursor-pointer pt-4 lg:py-0">Privacy Policy</li>
              </ul>
            </div> */}
            <div className="text-sm text-color">
              <p>
                © {new Date().getFullYear()} The Journey. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
