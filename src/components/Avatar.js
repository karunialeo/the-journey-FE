import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

import {
  AddJourneyIcon,
  BookmarkIcon,
  LogoutIcon,
  UserIcon,
  UserLeo,
} from "../exports/expImages";

export default function Avatar(props) {
  return (
    <Menu as="div" className="relative z-10">
      <div>
        <Menu.Button>
          <span className="sr-only">Open user menu</span>
          <img
            src={props.image}
            alt="user"
            className="max-h-14 w-14 object-cover rounded-full border-2 border-brand-blue"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <Link
              to="/profile"
              className="px-4 py-3 flex items-center hover:bg-gray-100"
            >
              <img src={UserIcon} className="w-5 mr-2" alt="drink" />
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/journey/add"
              className="px-4 py-3 flex items-center hover:bg-gray-100"
            >
              <img src={AddJourneyIcon} className="w-5 mr-2" alt="topping" />
              Add Journey
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/bookmarks"
              className="px-4 py-3 flex items-center hover:bg-gray-100"
            >
              <img src={BookmarkIcon} className="w-5 mr-2" alt="profile" />
              Bookmarks
            </Link>
          </Menu.Item>
          <hr />
          <Menu.Item onClick={props.logout}>
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <img src={LogoutIcon} className="w-5 mr-2" alt="logout" />
              Logout
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
