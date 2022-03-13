import "./assets/styles/App.css";
import { Routes, Route } from "react-router-dom";
import {
  AddJourney,
  Bookmarks,
  Home,
  JourneyDetails,
  LoginModal,
  Navbar,
  Profile,
  RegisterModal,
} from "./exports";
import Modal from "./components/modals";
import { useContext } from "react";
import { RegisteredProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";

import UserRoute from "./privateRoutes/UserRoute";

function App() {
  return (
    <>
      <ModalProvider>
        <RegisteredProvider>
          <Navbar />
          <Modal />
        </RegisteredProvider>
      </ModalProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/journey/:id" element={<JourneyDetails />} />
        <Route exact path="/" element={<UserRoute />}>
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/journey/add" element={<AddJourney />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

export const globalTitle = "The Journey ";
